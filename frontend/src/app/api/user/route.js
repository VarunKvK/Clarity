import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req, res) {

  try {
    const clerkuser = await currentUser();

    if (!clerkuser) {
      return Response.json({ error: "Unauthorized" });
    }
    await connectToDatabase();

    const {imageUrl, firstName, lastName } = clerkuser;
    const emailAddress = clerkuser.emailAddresses[0].emailAddress;
    const username = (firstName && lastName) ? `${firstName} ${lastName}` : "Clarity_User";

    let user = await User.findOne({ email:emailAddress });
    if (user) {
      return Response.json({
        message: "User already exists in the database",
        user,
      });
    } else {
      user = await User.create({
        name:username,
        email:emailAddress,
        image:imageUrl,
        subscriptionLevel: "free",
      });
      return Response.json({
        message: "User created successfully",
        user,
      });
    }
  } catch (error) {
    return Response.json("You have an error:", error);
  }
}
