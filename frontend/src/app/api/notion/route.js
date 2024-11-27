import connectToDatabase from "@/lib/mongodb";
import getDatabaseItems from "@/lib/notion";
import { User } from "@/models/User";
import { currentUser } from '@clerk/nextjs/server';
import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_CLIENT_SECRET });

// Utility function to parse aiContent into Notion-compatible blocks
const parseAndConvertToNotionBlocks = (content) => {
  const blocks = [];
  const lines = content.split('\n');
  let insideCodeBlock = false;
  let codeContent = '';
  let codeLanguage = 'javascript';

  lines.forEach((line) => {
      if (line.startsWith('```')) {
          if (insideCodeBlock) {
              blocks.push({
                  type: 'code',
                  code: {
                      rich_text: [{ type: 'text', text: { content: codeContent.trim() } }],
                      language: codeLanguage // Set to the detected language
                  }
              });
              codeContent = '';
              insideCodeBlock = false;
          } else {
              // Start of code block, check for language
              const parts = line.split(' '); // Split the line to extract language
              if (parts.length > 1) {
                  codeLanguage = parts[1]; // Set the language to the specified one
              }
              insideCodeBlock = true;
          }
      } else if (insideCodeBlock) {
          // Accumulate lines inside a code block
          codeContent += `${line}\n`;
      } else if (line.startsWith('##')) {
          // Heading 2 block
          blocks.push({
              type: 'heading_2',
              heading_2: {
                  rich_text: [{ type: 'text', text: { content: line.replace(/^##\s*/, '') } }]
              }
          });
      } else if (line.startsWith('**') && line.endsWith('**')) {
          // Bold paragraph
          blocks.push({
              type: 'paragraph',
              paragraph: {
                  rich_text: [
                      {
                          type: 'text',
                          text: { content: line.replace(/\*\*/g, '') },
                          annotations: { bold: true }
                      }
                  ]
              }
          });
      }else if (line.startsWith('* **') && line.endsWith('**')) {
        // Bold paragraph
        blocks.push({
            type: 'paragraph',
            paragraph: {
                rich_text: [
                    {
                        type: 'text',
                        text: { content: line.replace(/\*\*/g, '') },
                        annotations: { bold: true }
                    }
                ]
            }
        });
    }
       else {
          // Plain paragraph
          blocks.push({
              type: 'paragraph',
              paragraph: {
                  rich_text: [{ type: 'text', text: { content: line } }]
              }
          });
      }
  });

  return blocks;
};



// Console the Notion Output
export async function GET(req, res) {
    const clerkuser = await currentUser();
    if (!clerkuser) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const emailAddress = clerkuser.emailAddresses[0].emailAddress;

    await connectToDatabase();

    // Find the user in the database
    const user = await User.findOne({ email: emailAddress });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = user._id.toString(); // Get the userId for filtering

    const databaseId = user.notionDatabaseId;
    // const databaseId = process.env.NOTION_DATABASE_ID;
    try {
        const data = await getDatabaseItems(databaseId);

        // Fetch pages from Notion and filter them by UserId property
        const pages = await Promise.all(
            data.map(async (item) => {
                const pageId = item.id;

                const pageProperties = await notion.pages.retrieve({ page_id: pageId });

                const userIdFromNotion = pageProperties.properties?.UserId?.rich_text?.[0]?.text?.content;

                if (userIdFromNotion === userId) {
                    const pageContent = await notion?.blocks.children.list({
                        block_id: pageId,
                    });

                    return {
                        properties: pageProperties,
                        content: pageContent.results,
                    };
                }

                return null; // Skip pages not belonging to the user
            })
        );

        // Filter out null entries from the results
        const filteredPages = pages.filter((page) => page !== null);

        return Response.json({ pages: filteredPages });
    } catch (error) {
        console.error("Error fetching Notion pages:", error);
        return Response.json({ error: "Failed to fetch Notion pages" }, { status: 500 });
    }
}


export async function POST(req, res) {
    const clerkuser = await currentUser();
    if (!clerkuser) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const emailAddress = clerkuser.emailAddresses[0].emailAddress;
    let user = await User.findOne({ email:emailAddress });
    if (!user) {
        return Response.json({ message: "User not found" });
    }

    const { task, aiContent, files, formattedDate} = await req.json();
    const notionBlocks = parseAndConvertToNotionBlocks(aiContent);
    const title = aiContent.split('\n')[0].replace(/^##\s*/,'').trim();
    const slugId = uuidv4();
    
    try {
      // Create a new page in Notion
      const page = await notion?.pages.create({
            parent: { database_id: user.notionDatabaseId },
            properties: {
                SlugId: {
                    type: "rich_text",
                    rich_text: [{ type: "text", text: { content: slugId } }],
                },
                UserId: {
                    type: "rich_text",
                    rich_text: [{ type: "text", text: { content: user._id } }],
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

        // Parse and convert aiContent to Notion blocks

        // Append each block to the page
        for (let i = 0; i < notionBlocks.length; i += 100) {
            const chunk = notionBlocks.slice(i, i + 100); // Append in chunks of 100 to adhere to API limit

            await notion.blocks.children.append({
                block_id: page.id,
                children: chunk,
            });
        }

        return Response.json({ message: "Content added successfully", page });
    } catch (error) {
        console.error("Error adding content to Notion page:", error);
        return Response.json({ error: "Failed to add content to Notion page" });
    }
}
