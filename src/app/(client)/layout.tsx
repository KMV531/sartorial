import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sartorial - Premium Shirts & Timeless Men's Fashion",
  description:
    "Explore Sartorial's exclusive collection of premium shirts crafted for comfort, durability, and modern elegance. Elevate your wardrobe with timeless style.",
  keywords: [
    "mens shirts",
    "premium shirts",
    "fashion",
    "sustainable clothing",
    "Sartorial",
    "formal shirts",
    "casual shirts",
    "modern menswear",
  ],
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`), // update to your actual domain
  openGraph: {
    title: "Sartorial - Premium Shirts for Every Occasion",
    description:
      "Shop Sartorial's timeless, sustainable shirts built for comfort and style.",
    url: `${process.env.NEXT_PUBLIC_URL}`,
    siteName: "Sartorial",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL}/assets/placeholder_image.svg`, // replace with actual OG image
        width: 1200,
        height: 630,
        alt: "Sartorial premium shirts collection",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sartorial - Elevate Your Style",
    description:
      "Discover premium, comfortable shirts for men, women, kids. Crafted with care. Designed to last.",
    images: [`${process.env.NEXT_PUBLIC_URL}/assets/placeholder_image.svg`],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={`${poppins.className} antialiased bg-white text-black`}
        >
          <Header />
          {children}
          <Toaster position="bottom-right" richColors />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
