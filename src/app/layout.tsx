import type { Metadata } from "next";
import { Figtree, Space_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers/app-providers";
import { OfflineStatusBanner } from "@/components/features/offline/offline-status-banner";
import { PwaRegister } from "@/components/features/offline/pwa-register";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const mono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://edusaathi.vercel.app"),
  title: "EduSaathi | AI Learning Assistant for Rural India",
  description:
    "AI-powered multilingual learning assistant with personalized quizzes, teacher analytics, offline support, and voice learning.",
  applicationName: "EduSaathi",
  keywords: [
    "education",
    "rural india",
    "ai tutor",
    "next.js",
    "firebase",
    "gemini",
  ],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col grain-bg">
        <AppProviders>
          <OfflineStatusBanner />
          {children}
          <PwaRegister />
        </AppProviders>
      </body>
    </html>
  );
}
