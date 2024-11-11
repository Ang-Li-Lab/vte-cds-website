import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderComp from "@/components/Header";
import FooterComp from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VTE Decision Aid",
  description:
    "Cancer Associated Venous Thromboembolism (VTE) Decision Aid Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-200 relative`}>
        <HeaderComp />
        <main className="absolute pt-20 pb-20 left-0 right-0 overflow-y-auto">
          {children}
        </main>
        <FooterComp />
      </body>
    </html>
  );
}
