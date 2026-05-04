import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/storefront/Navbar";
import Footer from "@/components/storefront/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Luxe & Delicate — Handcrafted Bracelets",
    template: "%s | Luxe & Delicate",
  },
  description:
    "Discover handcrafted bracelets designed for everyday luxury. Beaded, charm, leather, and custom pieces made with care.",
  keywords: ["bracelets", "handmade jewelry", "artisan bracelets", "charm bracelets", "beaded bracelets"],
  openGraph: {
    type: "website",
    siteName: "Luxe & Delicate",
    title: "Luxe & Delicate — Handcrafted Bracelets",
    description: "Discover handcrafted bracelets designed for everyday luxury.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-ivory text-charcoal antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
