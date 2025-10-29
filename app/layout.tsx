import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kinh Tế Chính Trị Mác-Lênin | Website Học Tập",
  description: "Khám phá các nguyên lý cơ bản của chủ nghĩa Mác-Lênin về phân phối thu nhập và giá trị thặng dư. Công cụ tương tác để học tập kinh tế chính trị.",
  keywords: "Mác-Lênin, kinh tế chính trị, phân phối thu nhập, giá trị thặng dư, đường Lorenz, hệ số Gini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
