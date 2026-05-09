import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { CartProvider } from "@/components/cart/cart-provider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elements | Premium Wellness Essentials",
  description:
    "Elements is a premium wellness and lifestyle destination for supplements, skincare, family care, and intentional daily rituals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-white font-sans text-zinc-900">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
