import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";


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
  title: "Mテック講座販売アプリケーション",
  description: "プログラミング動画を販売するアプリケーションになります",
  keywords:"Mtech  Mテック プログラミング 寺内誠将 てらうちまこと KANOA プログラミング かのあ カノア エンジニア Mtech  KANOA Group",
  icons: {
    icon: "/favicon.ico", // ファビコンを指定（通常.ico形式）
    apple: "/mtech.jpg", // Appleデバイス用にmtech.jpgを指定
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
