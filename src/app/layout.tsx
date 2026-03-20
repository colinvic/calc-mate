import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CalcMate - Master Calculus Step by Step",
  description: "An interactive calculus learning tool for Australian high school students. Build from foundations to mastery with adaptive practice.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
