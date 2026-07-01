import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Preloader } from "@/components/Preloader";
import { Navigation } from "@/components/Navigation";
import { NoiseOverlay } from "@/components/NoiseOverlay";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Forward Studio — Premium Creative Agency",
  description:
    "Forward Studio is a premium creative agency crafting cinematic brand experiences, digital products, and strategic narratives for visionary companies.",
  keywords: [
    "creative agency",
    "brand design",
    "digital experiences",
    "motion design",
    "Forward Studio",
  ],
  authors: [{ name: "Forward Studio" }],
  creator: "Forward Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Forward Studio — Premium Creative Agency",
    description:
      "Premium creative agency crafting cinematic brand experiences for visionary companies.",
    siteName: "Forward Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forward Studio — Premium Creative Agency",
    description:
      "Premium creative agency crafting cinematic brand experiences for visionary companies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Providers>
          <Preloader />
          <NoiseOverlay />
          <Navigation />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
