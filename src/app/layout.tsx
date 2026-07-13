import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Prachhi Jain — IoT & Technology Professional",
  description:
    "IoT Support Executive specializing in Solar RMS monitoring, PM Surya Ghar portal sync, and DISCOM integration. 15+ years across academia, design, and IoT operations.",
  keywords: [
    "Prachhi Jain",
    "IoT",
    "Solar RMS",
    "PM Surya Ghar",
    "DISCOM",
    "MSEDCL",
    "Web Design",
  ],
  openGraph: {
    title: "Prachhi Jain — IoT & Technology Professional",
    description:
      "Solar RMS monitoring · PM Surya Ghar portal sync · DISCOM integration · 15+ years of impact",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col noise-overlay">{children}</body>
    </html>
  );
}
