// /notion/notionService.js
import { Client } from "@notionhq/client";

// Initialize Notion client
const notion = new Client({ auth: "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"});
// const notion = new Client({ auth: process.env.NOTION_CLIENT_SECRET });

export default async function getDatabaseItems(databaseId) {
  try {
    // const response = await notion.databases.query({ database_id: databaseId });
    const result= await notion.pages.retrieve({ page_id: databaseId })
    console.log("Result",result)

    // return response.results;
    return result;
  } catch (error) {
    console.error("Error fetching database items:", error);
  }
}

