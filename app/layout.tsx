import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "@/lib";
import { Header, Footer } from "@/views";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PriceSage",
  description: "Your Automatic Sales Percentage Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      {children}
        <ToastContainer />
        </body>
    </html>
  );
}
