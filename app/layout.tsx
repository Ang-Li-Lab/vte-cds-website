import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

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
        {children}
      </body>
    </html>
  );
}
