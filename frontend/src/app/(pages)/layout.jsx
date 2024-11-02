import Navbar from "@/components/Navbar";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster"
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Clarity",
  description: "Organize notes, PDFs, and study materials in one place with AI-powered insights",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} dynamic>
    <html lang="en">
      <body className="bg-[#111111] text-white flex flex-col w-full items-center justify-center relative z-100">
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
