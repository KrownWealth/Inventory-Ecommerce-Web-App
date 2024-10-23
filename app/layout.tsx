import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer} from "@/lib";
import { Header, Footer } from "@/views";
import Provider from "@/context/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PriceSage",
  description: "Your Automatic Sales Percentage Generator",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
       <Provider session={session}>
      <body className={inter.className}>
     {children}
        <ToastContainer />
        </body>
        </Provider>
    </html>
  );
}
