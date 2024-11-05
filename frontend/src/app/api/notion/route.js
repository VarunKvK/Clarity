import getDatabaseItems from "@/lib/notion";
import { Client } from "@notionhq/client";
import { v4 as uuidv4 } from "uuid";

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_SECRET });

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
    const databaseId = process.env.NOTION_DATABASE_ID;
    const data = await getDatabaseItems(databaseId);

    const pages = await Promise.all(
        data.map(async (item) => {
            const pageId = item.id;

            const pageProperties = await notion.pages.retrieve({ page_id: pageId });

            const pageContent = await notion.blocks.children.list({
                block_id: pageId,
            });

            return {
                properties: pageProperties,
                content: pageContent.results,
            };
        })
    );

    return Response.json({ pages });
}

export async function POST(req, res) {
    const { task, aiContent, files, formattedDate} = await req.json();
    const notionBlocks = parseAndConvertToNotionBlocks(aiContent);
    const title = aiContent.split('\n')[0].replace(/^##\s*/,'').trim();
    const slugId = uuidv4();
    
    try {
      // Create a new page in Notion
      const page = await notion.pages.create({
            parent: { database_id: process.env.NOTION_DATABASE_ID },
            properties: {
                SlugId: {
                    type: "rich_text",
                    rich_text: [{ type: "text", text: { content: slugId } }],
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
