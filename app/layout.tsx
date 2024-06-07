import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stripe project",
  description: "A metered billing project using Stripe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="w-full h-full">
        <body className={`${inter.className} w-full h-full bg-white`}>
          <Navbar />
          <div className="px-12">{children}</div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
