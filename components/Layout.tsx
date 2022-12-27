import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children }: Props) => (
  <div className="min-h-screen p-4 space-y-4 min-w-screen bg-gradient-radial text-slate-200">
    <Head>
      <title>Overview</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <div className="flex justify-center w-full text-sm font-semibold text-slate-300 hover:text-slate-200">
        <div className="w-1/3">
          <Link href="/">Home</Link>
        </div>
      </div>
    </header>
    <div className="flex justify-center">
      <div className="w-2/3">{children}</div>
    </div>
  </div>
);

export default Layout;
