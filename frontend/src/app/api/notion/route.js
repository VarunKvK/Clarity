import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";
import { currentUser } from "@clerk/nextjs/server";
import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

/**
 * Helper: Initialize Notion client
 * @param {string} accessToken - Notion API access token
 * @returns {Client} - Notion client instance
 */
const initializeNotionClient = (accessToken) => new Client({ auth: accessToken });

/**
 * Helper: Parse AI content into Notion-compatible blocks
 * @param {string} content - AI-generated content
 * @returns {Array} - Array of Notion blocks
 */
const parseAndConvertToNotionBlocks = (content) => {
    const blocks = [];
    const lines = content.split("\n");
    let insideCodeBlock = false;
    let codeContent = "";
    let codeLanguage = "javascript";

    // Process content line by line
    lines.forEach((line) => {
        if (line.startsWith("```")) {
            if (insideCodeBlock) {
                // End of a code block
                blocks.push({
                    type: "code",
                    code: {
                        rich_text: [{ type: "text", text: { content: codeContent.trim() }, annotations: { code: true } }],
                        language: codeLanguage,
                    },
                });
                codeContent = "";
                insideCodeBlock = false;
            } else {
                // Start of a code block
                const parts = line.split(" ");
                codeLanguage = parts.length > 1 ? parts[1] : "javascript";
                insideCodeBlock = true;
            }
        } else if (insideCodeBlock) {
            codeContent += `${line}\n`;
        } else if (line.startsWith("##")) {
            // Heading level 2
            blocks.push({
                type: "heading_2",
                heading_2: {
                    rich_text: [{ type: "text", text: { content: line.replace(/^##\s*/, "") } }],
                },
            });
        } else if (line.startsWith("**") && line.endsWith("**")) {
            // Bold text
            blocks.push({
                type: "paragraph",
                paragraph: {
                    rich_text: [
                        {
                            type: "text",
                            text: { content: line.replace(/\*\*/g, "") },
                            annotations: { bold: true },
                        },
                    ],
                },
            });
        } else {
            // Regular paragraph
            blocks.push({
                type: "paragraph",
                paragraph: {
                    rich_text: [{ type: "text", text: { content: line } }],
                },
            });
        }
    });

    return blocks;
};

/**
 * Helper: Verify Notion integration
 * Ensures the user's Notion integration is valid and updates their status if invalid.
 * @param {Object} user - MongoDB user object
 * @param {Client} notion - Notion client instance
 * @throws Will throw an error if the database cannot be accessed
 */
const verifyNotionIntegration = async (user, notion) => {
    if (!user.notionIntegrationStatus || !user.notionAccessToken || !user.notionDatabaseId) {
        throw new Error("Notion integration not configured for this user.");
    }

    // Verify database ID
    try {
        await notion.pages.retrieve({ page_id: user.notionDatabaseId });
    } catch (err) {
        console.error("Notion database access error:", err.message);
        // Reset user's Notion integration status
        await User.findByIdAndUpdate(user._id, {
            notionIntegrationStatus: false,
            notionAccessToken: null,
            notionDatabaseId: null,
        });
        throw new Error("Failed to access the Notion database. Please reconnect your integration.");
    }
};

/**
 * Helper: Append blocks to a Notion page in chunks
 * Notion has a limit on the number of blocks that can be appended at once.
 * @param {Client} notion - Notion client instance
 * @param {string} pageId - Notion page ID
 * @param {Array} blocks - Array of Notion blocks to append
 */
const appendBlocksInChunks = async (notion, pageId, blocks) => {
    for (let i = 0; i < blocks.length; i += 100) {
        const chunk = blocks.slice(i, i + 100);
        await notion.blocks.children.append({
            block_id: pageId,
            children: chunk,
        });
    }
};

/**
 * GET Request: Fetch Notion pages for the authenticated user
 */
export async function GET(req, res) {
    try {
        // Retrieve the currently logged-in user via Clerk
        const clerkuser = await currentUser();
        if (!clerkuser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Connect to MongoDB and fetch user
        const emailAddress = clerkuser.emailAddresses[0].emailAddress;
        await connectToDatabase();
        const user = await User.findOne({ email: emailAddress });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Verify user's Notion integration
        if (!user.notionIntegrationStatus || !user.notionAccessToken || !user.notionDatabaseId) {
            return NextResponse.json({ message: "Please integrate Notion first" }, { status: 200 });
        }

        const notion = initializeNotionClient(user.notionAccessToken);

        // Retrieve child blocks for the user's main Notion page
        const childBlocks = await notion.blocks.children.list({
            block_id: user.notionDatabaseId,
        });

        // Find the first "child_database" block inside the user's page
        const databaseBlock = childBlocks.results.find((block) => block.type === "child_database");

        if (!databaseBlock) {
            return NextResponse.json({
                error: "No child database found inside the specified page.",
            }, { status: 404 });
        }

        // Query the found database
        const response = await notion.databases.query({
            database_id: databaseBlock.id,
            sorts: [
                {
                    property: "UploadDate",
                    direction: "descending",
                },
            ],
        });

        if (!response || !response.results) {
            return NextResponse.json({ pages: [] }, { status: 200 });
        }

        // Process and filter pages for the current user
        const userId = user._id.toString();
        const pages = await Promise.all(
            response.results.map(async (page) => {
                try {
                    const pageId = page.id;
                    const userIdFromNotion = page.properties?.UserId?.rich_text?.[0]?.text?.content;

                    if (userIdFromNotion === userId) {
                        const pageContent = await notion.blocks.children.list({
                            block_id: pageId,
                        });

                        return {
                            properties: page,
                            content: pageContent.results,
                        };
                    }
                    return null;
                } catch (error) {
                    console.error(`Error processing page ${page.id}:`, error);
                    return null;
                }
            })
        );

        // Filter out null results
        const filteredPages = pages.filter((page) => page !== null);
        return NextResponse.json({ pages: filteredPages });

    } catch (error) {
        console.error("Error fetching Notion pages:", error);
        return NextResponse.json(
            {
                error: "Failed to fetch Notion pages",
                details: error.message,
                pages: [],
            },
            { status: 500 }
        );
    }
}

// POST Request Handler
export async function POST(req) {
    try {
        // Authenticate user
        const clerkUser = await currentUser();
        if (!clerkUser) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Connect to MongoDB and fetch user
        await connectToDatabase();
        const emailAddress = clerkUser.emailAddresses[0].emailAddress;
        const user = await User.findOne({ email: emailAddress });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Initialize Notion client
        const notion = initializeNotionClient(user.notionAccessToken);

        // Verify Notion integration
        await verifyNotionIntegration(user, notion);

        // Parse request body
        const body = await req.json();
        const { task, aiContent, files, formattedDate } = body;

        if (!task || !aiContent || !files || !formattedDate) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Generate Notion blocks and title
        const notionBlocks = parseAndConvertToNotionBlocks(aiContent);
        const title = aiContent.split("\n")[0].replace(/^##\s*/, "").trim();
        const slugId = uuidv4();

        const childBlocks = await notion.blocks.children.list({
            block_id: user.notionDatabaseId, // This should be the parent page ID
        });
        
        const databaseBlock = childBlocks.results.find((block) => block.type === "child_database");
        
        if (!databaseBlock) {
            throw new Error("Database not found inside the specified page.");
        }
        
        const databaseId = databaseBlock.id; // Extract the database ID
        
        const page = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                SlugId: {
                    type: "rich_text",
                    rich_text: [{ type: "text", text: { content: slugId } }],
                },
                UserId: {
                    type: "rich_text",
                    rich_text: [{ type: "text", text: { content: user._id.toString() } }],
                },
                FileName: {
                    type: "title",
                    title: [{ type: "text", text: { content: files } }],
                },
                FileTitle: {
                    type: "rich_text",
                    rich_text: [{ type: "text", text: { content: title } }],
                },
                Type: {
                    type: "select",
                    select: { name: task },
                },
                UploadDate: {
                    date: {
                        start: formattedDate,
                    },
                },
            },
        });
        
        // Append blocks to the page
        await appendBlocksInChunks(notion, page.id, notionBlocks);

        return NextResponse.json({ message: "Content added successfully" });
    } catch (error) {
        console.error("Error adding content to Notion page:", error.message);
        return NextResponse.json(
            { error: "Failed to add content to Notion page", details: error.message },
            { status: 500 }
        );
    }
}
