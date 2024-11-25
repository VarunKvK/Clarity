import connectToDatabase from '@/lib/mongodb';
import { User } from '@/models/User';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const authorizationCode = searchParams.get("code");

    if (!authorizationCode) {
        return NextResponse.json({ error: "Authorization code not provided" }, { status: 400 });
    }

    try {
        // Exchange authorization code for an access token
        const response = await fetch("https://api.notion.com/v1/oauth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${Buffer.from(
                    `${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_CLIENT_SECRET}`
                ).toString("base64")}`,
            },
            body: JSON.stringify({
                grant_type: "authorization_code",
                code: authorizationCode,
                redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI // Ensure this matches your Notion settings
            })
        });

        const data = await response.json();

        // Debug: Log Notion response data
        console.log("Notion Response Data:", data);

        if (!response.ok) {
            return NextResponse.json({ error: data.error || "Failed to obtain access token" }, { status: response.status });
        }

        const { access_token } = data;

        const clerkuser = await currentUser();
        if (!clerkuser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        const emailAddress = clerkuser.emailAddresses[0].emailAddress;

        // Upsert user information with Notion token
        const user = await User.findOneAndUpdate(
            { email: emailAddress },
            {
                notionIntegrationStatus: true,
                notionAccessToken: access_token,
            },
            { new: true, upsert: true } // Ensure the record is created if it doesn't exist
        );

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_DEPLOYED_URL}/myspace/${user._id}`);
    } catch (error) {
        console.error("Token exchange error:", error);
        return NextResponse.json({ error: "Failed to complete authorization" }, { status: 500 });
    }
}
