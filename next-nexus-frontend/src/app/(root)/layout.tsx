import "../globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Create Next Nexus App",
  description: "Generated by create next nexus app",
};

export const dynamic = "force-dynamic";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={lato.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
