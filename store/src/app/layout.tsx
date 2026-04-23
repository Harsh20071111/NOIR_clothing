import type { Metadata } from "next";
import { DM_Sans, Bebas_Neue } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "NOIR — Premium Streetwear",
  description:
    "Discover bold, premium streetwear crafted for the culture. Shop oversized tees, hoodies, joggers, and accessories.",
  keywords: [
    "streetwear",
    "fashion",
    "clothing",
    "oversized tees",
    "hoodies",
    "premium",
  ],
};

import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${dmSans.variable} ${bebasNeue.variable} h-full`}
      >
        <body className="min-h-full flex flex-col bg-background text-foreground" style={{ fontFamily: "var(--font-dm-sans)" }}>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
