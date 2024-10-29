import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "@/lib";
import Provider from "@/context/SessionProvider";
import { CartProvider } from "@/context/CartContext";

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
        <Provider>
          <CartProvider>
            {children}
            <ToastContainer />
          </CartProvider>
        </Provider>
      </body>
    </html>
  );
}
