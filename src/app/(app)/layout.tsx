import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CartButton from "@/app/(app)/components/CartButton";
import Cart from "@/app/(app)/providers/Cart";
import SideCart from "@/app/(app)/components/SideCart";
import OpenCart from "@/app/(app)/components/OpenCart";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="en">
          <body className={`${geistSans.variable} ${geistMono.variable}`}>
            <Cart>
              <header style={{position: "fixed", top: 0, left: "50%", marginBottom: "100px"}}>
                {/*<CartButton/>*/}
                <OpenCart/>
                <SideCart/>
              </header>
              {children}
            </Cart>
          </body>
        </html>
  );
}
