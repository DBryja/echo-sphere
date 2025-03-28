import React from "react";
import Head from "next/head";
import { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import "@globals/index.scss";

import Cart from "@/app/(app)/providers/Cart";
import Header from "@components/shared/header";

import { TransitionProvider } from "@providers/TransitionContext";
import LenisGsap from "@providers/LenisGsap";
import TransitionBox from "@components/pageTransition/TransitionBox";
import TransitionHandler from "@components/pageTransition/TransitionHandler";
import Footer from "@components/footer";
import ogImage from "/public/OgImage.png";

const natsRegular = localFont({
  src: "../fonts/NATS-Regular.woff",
  variable: "--font-nats",
});
const kokoroRegular = localFont({
  src: "../fonts/Kokoro-Regular.ttf",
  variable: "--font-kokoro",
});

export const metadata: Metadata = {
  title: "Echo Sphere - Music Revolutionaries",
  description: "We are a music label from Chicago, founded by former musicians who shared a vision to make music industry open to every creative soul.",
  openGraph: {
    title: "Echo Sphere - Music Revolutionaries",
    description: "We are a music label from Chicago, founded by former musicians who shared a vision to make music industry open to every creative soul.",
    url: "https://www.echo-sphere-next.vercel.app",
    siteName: "Echo Sphere",
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
        alt: "Echo Sphere - Music Revolutionaries"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Echo Sphere - Music Revolutionaries",
    description: "We are a music label from Chicago, founded by former musicians who shared a vision to make music industry open to every creative soul.",
    images: [ogImage.src]
  }
};

interface LayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: LayoutProps) {
  return (
    <TransitionProvider>
      <html lang="en">
      <Head>
        <link rel={"icon"}  href={"/favicon.ico"}/>
      </Head>
        <body
          className={`${natsRegular.variable} ${kokoroRegular.variable} bg-gray-300`}
        >
          <TransitionBox />
          <TransitionHandler />
          <Cart>
            <Header />
            <LenisGsap>
              <main>{children}</main>
              <Footer />
            </LenisGsap>
          </Cart>
        </body>
      </html>
    </TransitionProvider>
  );
}
