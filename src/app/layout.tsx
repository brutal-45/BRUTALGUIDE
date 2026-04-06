import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BRUTALGUIDE - Complete Guide to Engineering Streams in Maharashtra",
  description: "Comprehensive guide to engineering branches in Maharashtra. Explore all engineering streams, compare salaries, find top colleges, and plan your career path. Degree & Diploma programs covered.",
  keywords: ["Engineering Guide", "Maharashtra Engineering", "Engineering Branches", "MHT-CET", "Engineering Colleges", "Career Guidance", "B.Tech", "Diploma Engineering", "BRUTALGUIDE"],
  authors: [{ name: "BRUTALGUIDE Team" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "BRUTALGUIDE - Complete Guide to Engineering Streams in Maharashtra",
    description: "Comprehensive guide to engineering branches in Maharashtra. Degree & Diploma programs covered.",
    url: "https://brutalguide.vercel.app",
    siteName: "BRUTALGUIDE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BRUTALGUIDE - Engineering Guide Maharashtra",
    description: "Complete guide to engineering streams in Maharashtra. Degree & Diploma programs covered.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
