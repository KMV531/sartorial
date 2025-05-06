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
  title: "Sartorial - Elevate your style sith premium shirts",
  description:
    "Discover our collection of finely crafted shirts for every occasion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body className={`${poppins.className} antialiased`}>
          <Header />
          {children}
          <Toaster position="bottom-right" richColors />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
