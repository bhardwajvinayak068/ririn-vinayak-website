import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import { MotionConfig } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Vinayak & Ririn | We're Getting Married",
  description:
    "Join Vinayak & Ririn on 16th January 2027 at Mahi Resort, Patti, Punjab.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body bg-cream text-ink antialiased">
        <MotionConfig reducedMotion="user">
          <SmoothScroll>{children}</SmoothScroll>
        </MotionConfig>
      </body>
    </html>
  );
}
