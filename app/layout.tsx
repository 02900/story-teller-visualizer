import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StoreHydration } from "./components/StoreHydration";
import { ThemeSwitch } from "./components/ThemeSwitch";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Story Teller Visualizer",
  description: "A visual story telling experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="transition-colors">
        <StoreHydration />
        <ThemeSwitch />
        {children}
      </body>
    </html>
  );
}
