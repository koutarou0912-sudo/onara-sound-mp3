import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { LanguageProvider } from "../contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "おなら効果音フリー素材サイト - Onara Sound MP3",
  description: "数々のおならの音が惜しげもなく無料！商用利用・加工も可能な高品質おなら音源配布サイトです。",
  keywords: ["fart sounds", "onara", "mp3", "sound effects", "おなら", "効果音", "無料", "フリー素材"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100`}
      >
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7467503383087096"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
