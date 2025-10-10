import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GardenPal Blog - Gardening Tips, Guides & Plant Care",
  description: "Expert gardening advice, plant care guides, and tips to help you grow a thriving garden. From beginners to experts, find everything you need to know about gardening.",
  keywords: ["gardening", "plants", "garden tips", "plant care", "gardening guide"],
  authors: [{ name: "GardenPal Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "GardenPal Blog",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "GardenPal Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GardenPal Blog",
    description: "Expert gardening advice and plant care guides",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
