import "../../../globals.css";
import { Toaster } from "@/components/ui/toaster"
import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/mini_components/Sidebar"
import { cookies } from "next/headers";
import { currentUser } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";

export const metadata = {
  title: "Clarity",
  description: "Organize notes, PDFs, and study materials in one place with AI-powered insights",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  await connectToDatabase();

  const clerkUser = await currentUser();
  if (!clerkUser) {
    return <p>Unauthorized</p>;
  }

  const { emailAddress: clerkUserEmail } = clerkUser.emailAddresses[0];
  const userData = await User.findOne({ email: clerkUserEmail });
  // if (!userData) {
  //   console.log("User data not found in MongoDB");
  // } else {
  //   console.log("User data found:", userData);
  // }
  return (

    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} dynamic>
      <html lang="en">
        <body className="bg-[#111111] text-white flex flex-col w-full items-center justify-center relative z-100">
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar userData={userData}/>
            <SidebarTrigger />
            {children}
            <Toaster />
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>

  );
}
