// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Correct path for globals.css when app is at root
import { AuthProvider } from "@/context/AuthContext"; // Use @/ alias

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatApp - Real-time Messaging",
  description: "A real-time chat application built with Next.js App Router, Tailwind CSS, and Firebase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-gray-900">
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        {/* AuthProvider must be a client component, so it wraps children here */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}