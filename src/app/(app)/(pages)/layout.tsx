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
import { metadata as presetMeta } from "@utils/meta";

const natsRegular = localFont({
  src: "../fonts/NATS-Regular.woff",
  variable: "--font-nats",
});
const kokoroRegular = localFont({
  src: "../fonts/Kokoro-Regular.ttf",
  variable: "--font-kokoro",
});

export const metadata: Metadata = presetMeta;

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
