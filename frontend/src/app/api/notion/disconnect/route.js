import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST() {
    try {
        const clerkuser = await currentUser();
        if (!clerkuser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();
        const emailAddress = clerkuser.emailAddresses[0].emailAddress;

        // Only update the integration status and access token
        // Keep the databaseId for future reconnection
        const updatedUser = await User.findOneAndUpdate(
            { email: emailAddress },
            {
                notionIntegrationStatus: false,
                notionAccessToken: null,
                // Don't nullify the databaseId
                // notionDatabaseId: remains unchanged
            },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true, 
            message: "Notion disconnected successfully" 
        });

    } catch (error) {
        console.error("Error disconnecting Notion:", error);
        return NextResponse.json({ 
            error: "Failed to disconnect Notion",
            details: error.message 
        }, { status: 500 });
    }
} 