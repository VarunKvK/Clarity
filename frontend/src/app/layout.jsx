import Navbar from "@/components/Navbar";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

export const metadata = {
  title: "Clarity",
  description: "Organize notes, PDFs, and study materials in one place with AI-powered insights",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#111111] text-white flex flex-col w-full items-center justify-center relative z-100">
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
