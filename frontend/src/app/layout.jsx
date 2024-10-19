import "./globals.css";

export const metadata = {
  title: "Clarity",
  description: "Organize notes, PDFs, and study materials in one place with AI-powered insights",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#111111] text-white flex justify-center relative z-100">
        {children}
      </body>
    </html>
  );
}
