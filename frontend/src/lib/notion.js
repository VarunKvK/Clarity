// /notion/notionService.js
import { Client } from "@notionhq/client";

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_SECRET });

export default async function getDatabaseItems(databaseId) {
  try {
    const response = await notion.databases.query({ database_id: databaseId });
    // const result= await notion.pages.retrieve({ database_id: databaseId })
    return response.results;
  } catch (error) {
    console.error("Error fetching database items:", error);
  }
}

// export default async function addItemToDatabase(databaseId, properties) {
//   try {
//     const response = await notion.pages.create({
//       parent: { database_id: databaseId },
//       properties,
//     });
//     console.log("New item added to Notion database:", response); // console for testing
//     return response;
//   } catch (error) {
//     console.error("Error adding item to Notion database:", error);
//   }
// }
