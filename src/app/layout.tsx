import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import Header from "@/components/header";

const myFont = localFont({
  src:'./fonts/minecraft.ttf'
})

export const metadata: Metadata = {
  title: {
    default: "nextShop",
    template: "%s | nextShop",
  },
  description: "create in saspert",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${myFont.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
