import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Announcement } from "@/components/Announcement";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import logoImage from "../public/logo.png";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  weight: "400",
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "jcapturelab | Photography",
    template: "%s | jcapturelab",
  },
  description:
    "Portrait and event photography in Southwest Virginia: Radford, Roanoke, Blacksburg, Christiansburg, Martinsville. Sessions, rates, and booking.",
  icons: {
    icon: [{ url: "/cropped.png", type: "image/png", sizes: "any" }],
    apple: [{ url: "/cropped.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Announcement />
        <Header />
        <Link
          href="/"
          className="fixed bottom-4 right-4 z-40 rounded-lg border border-black/10 bg-[var(--surface)]/90 p-2 shadow-md backdrop-blur-sm transition-opacity hover:opacity-100 sm:bottom-5 sm:right-5"
          aria-label="Home"
        >
          <Image
            src={logoImage}
            alt="jcapturelab"
            width={logoImage.width}
            height={logoImage.height}
            className="h-auto w-[min(40vw,9.5rem)] object-contain"
            priority
            sizes="(max-width: 640px) 40vw, 9.5rem"
          />
        </Link>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
