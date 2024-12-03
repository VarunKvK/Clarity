import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const authorizationCode = searchParams.get("code");
  console.log("Authorization Code",authorizationCode)

  if (!authorizationCode) {
    return Response.json(
      { error: "Authorization code not provided" },
      { status: 400 }
    );
  }

  // Validate environment variables
  const clientId = process.env.NOTION_CLIENT_ID;
  const clientSecret = process.env.NOTION_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const deployedUrl = process.env.NEXT_PUBLIC_DEPLOYED_URL;

  if (!clientId || !clientSecret || !redirectUri || !deployedUrl) {
    console.error("Missing required environment variables");
    return Response.json(
      { error: "Server misconfiguration: Missing environment variables" },
      { status: 500 }
    );
  }

  try {
    // Exchange authorization code for an access token
    const response = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code: authorizationCode,
        redirect_uri: redirectUri,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Failed to exchange token:", data);
      return Response.json(
        { error: data.error || "Failed to obtain access token" },
        { status: response.status }
      );
    }

    const { access_token, duplicated_template_id } = data;
    console.log("Notion Response Data:", data)

    // Retrieve current user from Clerk
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const emailAddress = clerkUser.emailAddresses[0]?.emailAddress;
    if (!emailAddress) {
      console.error("No email address found for current user");
      return Response.json({ error: "Invalid user data" }, { status: 400 });
    }

    // Connect to MongoDB and update user data
    await connectToDatabase();

    const user = await User.findOneAndUpdate(
      { email: emailAddress },
      {
        notionIntegrationStatus: true,
        notionAccessToken: access_token,
        notionDatabaseId: duplicated_template_id,
      },
      { new: true, upsert: true } // Upsert ensures a record is created if it doesn't exist
    );

    if (!user) {
      console.error("Failed to update user data");
      return Response.json(
        { error: "Failed to save user data" },
        { status: 500 }
      );
    }

    // Redirect user to their space
    // return Response.redirect(`${process.env.NEXT_PUBLIC_DEPLOYED_URL}/myspace/${user._id}`);
    return Response.redirect(`http://localhost:3000//myspace/${user._id}`);
  } catch (error) {
    // Log detailed error for debugging
    console.error("Token exchange error:", error);
    return Response.json(
      { error: "Failed to complete authorization" },
      { status: 500 }
    );
  }
}
