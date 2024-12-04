import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";
import { currentUser } from "@clerk/nextjs/server";
import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const initializeNotionClient = (accessToken) => new Client({ auth: accessToken });

// Helper function to clean text content
const cleanTextContent = (content) => {
    // Remove Markdown-style bold markers
    return content.replace(/\*\*/g, '');
};

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
            const headingContent = line.replace(/^##\s*/, "");
            blocks.push({
                type: "heading_2",
                heading_2: {
                    rich_text: [{ type: "text", text: { content: headingContent } }],
                },
            });
        } else {
            // Regular paragraph - check for inline ** markers
            const parts = line.split(/(\*\*.*?\*\*)/g);
            const richText = parts.map(part => {
                if (part.startsWith("**") && part.endsWith("**")) {
                    // Bold text part
                    return {
                        type: "text",
                        text: { content: part.slice(2, -2) }, // Remove ** markers
                        annotations: { bold: true },
                    };
                } else {
                    // Regular text part
                    return {
                        type: "text",
                        text: { content: part },
                        annotations: { bold: false },
                    };
                }
            }).filter(part => part.text.content !== ""); // Remove empty parts

            blocks.push({
                type: "paragraph",
                paragraph: {
                    rich_text: richText,
                },
            });
        }
    });

    return blocks;
};

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const slugId = searchParams.get('slugId');

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

    try {
        const notion = initializeNotionClient(user.notionAccessToken);

         // Retrieve child blocks for the user's main Notion page
         const childBlocks = await notion.blocks.children.list({
            block_id: user.notionDatabaseId,
        });

        const databaseBlock = childBlocks.results.find((block) => block.type === "child_database");

        if (!databaseBlock) {
            return NextResponse.json({
                error: "No child database found inside the specified page.",
            }, { status: 404 });
        }

        // First, query the database to find the page with matching slugId
        const databaseResponse = await notion.databases.query({
            database_id:  databaseBlock.id,
            filter: {
                property: "SlugId",
                rich_text: {
                    equals: slugId
                }
            }
        });

        if (!databaseResponse.results.length) {
            return NextResponse.json({ error: "Page not found" }, { status: 404 });
        }

        // Get the specific page ID
        const pageId = databaseResponse.results[0].id;

        // Fetch the page content
        const pageContent = await notion.blocks.children.list({
            block_id: pageId
        });

        // console.log("Notion response", pageContent.results);

        const processedContent = pageContent.results.map(block => {
            if (block.type === 'paragraph' && block.paragraph.rich_text.length > 0) {
                // Convert the block content to string and process it
                const textContent = block.paragraph.rich_text.map(text => text.text.content).join('\n');
                const processedBlocks = parseAndConvertToNotionBlocks(textContent);
                return processedBlocks[0]; // Take the first block as we're processing one at a time
            }
            return block;
        });

        return NextResponse.json({ 
            content: processedContent,
            properties: databaseResponse.results[0].properties 
        });

        // return NextResponse.json({ message: "Hello, world!" });
    } catch (error) {
        console.error("Error fetching Notion content:", error);
        return NextResponse.json(
            { error: "Failed to fetch content", details: error.message },
            { status: 500 }
        );
    }
}