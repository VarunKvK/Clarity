import getDatabaseItems from "@/lib/notion";
import { Client } from "@notionhq/client";

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_SECRET });

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
  const { task, aiContent, files } = await req.json();

  try {
    const page = await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        File_Name: {
          type: "title",
          title: [{ type: "text", text: { content: files } }],
        },
        Type: {
          type: "select",
          select: { name: task },
        },
        UploadDate: {
          date: {
            start: date,
          },
        },
      },
    });

    const pageId = page.id;

    const contentChunks = aiContent.match(/(.|[\r\n]){1,2000}/g);

    for (const chunk of contentChunks) {
      await notion.blocks.children.append({
        block_id: pageId,
        children: [
          {
            type: "paragraph",
            paragraph: {
              rich_text: [{ type: "text", text: { content: chunk } }],
            },
          },
        ],
      });
    }

    return Response.json({ message: "Content added successfully", page });
  } catch (error) {
    console.error("Error adding content to Notion page:", error);
    return Response.json({ error: "Failed to add content to Notion page" });
  }
}
