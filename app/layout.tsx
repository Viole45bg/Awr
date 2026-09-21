import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.connectwithawrteam.com"),
  title: "Alpha Wealth & Retirement Club AWR — Grow Wealth. Create Freedom.",
  description:
    "Join Alpha Wealth & Retirement Club to build long-term financial confidence. Access market insights, educational resources, and trading guidance for wealth growth, passive income, and retirement planning.",
  keywords: [
    "Alpha Wealth & Retirement Club",
    "AWR",
    "Grow Wealth",
    "Create Freedom",
    "financial freedom",
    "wealth building",
    "retirement planning",
    "passive income",
    "investment strategies",
    "trading guidance",
    "market insights",
    "financial education",
    "income growth freedom",
  ],
  authors: [{ name: "Alpha Wealth & Retirement Club" }],
  other: {
    "fb:app_id": "YOUR_APP_ID_HERE",
  },
  openGraph: {
    title: "Alpha Wealth & Retirement Club AWR — Grow Wealth. Create Freedom.",
    description:
      "Join AWR to build long-term financial confidence. Access market insights, educational resources, and trading guidance for wealth growth, passive income, and retirement planning.",
    url: "https://www.connectwithawrteam.com",
    siteName: "Alpha Wealth & Retirement Club",
    type: "website",
    images: [
      {
        url: "https://www.connectwithawrteam.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alpha Wealth & Retirement Club — Grow Wealth. Create Freedom. Income-Growth-Freedom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpha Wealth & Retirement Club AWR",
    description:
      "Join AWR to build long-term financial confidence. Access market insights, educational resources, and trading guidance for wealth growth, passive income, and retirement planning.",
    images: ["https://www.connectwithawrteam.com/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white overflow-x-hidden">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-white text-slate-900 min-h-screen m-0 p-0 overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
