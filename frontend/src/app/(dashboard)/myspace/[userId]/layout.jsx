import "../../../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/mini_components/Sidebar";
import { cookies } from "next/headers";
import { currentUser } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";

export const metadata = {
  title: "Clarity",
  description: "Organize notes, PDFs, and study materials in one place with AI-powered insights",
};

export default async function RootLayout({ children }) {
  let defaultOpen = false;
  let userData = null;

  try {
    // Fetch cookies to determine sidebar state
    const cookieStore = await cookies();
    defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  } catch (error) {
    console.error("Error fetching cookies:", error);
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch the current logged-in user using Clerk
    const clerkUser = await currentUser();
    if (clerkUser) {
      const { emailAddress: clerkUserEmail } = clerkUser.emailAddresses[0];

      // Fetch user data from MongoDB
      userData = await User.findOne({ email: clerkUserEmail });
    }
  } catch (error) {
    console.error("Error fetching user data or connecting to the database:", error);
  }

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} dynamic>
      <html lang="en">
        <body className="bg-[#111111] text-white flex flex-col w-full items-center justify-center relative z-100">
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar userData={userData} />
            <SidebarTrigger className="absolute md:relative z-20"/>
            {children}
            <Toaster />
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
