import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(req,res){
    await connectToDatabase();

    try{
        const {email_address,plan}=await req.json();
        const user = await User.findOneAndUpdate(
            {email:email_address},
            {subscriptionLevel:plan},
        )
        if (!user) {
            return Response.json("User not found");
        }
        return Response.json({message:"User plan has been updated"})
    }catch(err){
        console.error("Error updating subscription:", err);
    }
}