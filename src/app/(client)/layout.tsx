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
  title:
    "Sartorial - Premium Shirts, Shoes, Pullovers, Hats & Timeless Men's Fashion",
  description:
    "Explore Sartorial's exclusive collection of premium shirts, Shoes, Pullovers, Hats crafted for comfort, durability, and modern elegance. Elevate your wardrobe with timeless style.",
  keywords: [
    "mens shirts",
    "premium Pullovers",
    "fashion",
    "sustainable clothing",
    "Sartorial",
    "formal Hats",
    "casual Shoes",
    "modern menswear",
  ],
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`), // update to your actual domain
  openGraph: {
    title:
      "Sartorial - Premium Shirts, Shoes, Pullovers, Hats for Every Occasion",
    description:
      "Shop Sartorial's timeless, sustainable Shirts, Shoes, Pullovers, Hats built for comfort and style.",
    url: `${process.env.NEXT_PUBLIC_URL}`,
    siteName: "Sartorial",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL}/assets/bg-image.jpg`, // replace with actual OG image
        width: 1200,
        height: 630,
        alt: "Sartorial premium Shirts, Shoes, Pullovers, Hats collection",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sartorial - Elevate Your Style",
    description:
      "Discover premium, comfortable Shirts, Shoes, Pullovers, Hats for men, women, kids. Crafted with care. Designed to last.",
    images: [`${process.env.NEXT_PUBLIC_URL}/assets/bg-image.jpg`],
  },
  icons: {
    icon: "/assets/favicon.jpg",
    shortcut: "/assets/favicon-32x32.jpg",
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
        <head>
          {/* ✅ Explicit link fallback (optional, Next will auto inject from metadata too) */}
          <link rel="icon" href="/assets/favicon.jpg" type="image/jpg+xml" />
        </head>
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
