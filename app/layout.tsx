import type { Metadata, Viewport } from "next";
import { Playfair_Display, Jost, Rozha_One, Cinzel } from "next/font/google";
import { MotionConfig } from "framer-motion";
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

const rozha = Rozha_One({
  subsets: ["devanagari", "latin"],
  weight: ["400"],
  variable: "--font-rozha",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
});

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://virin-wedding-indo-version-1-0.vercel.app"),
  title: "Shubh Vivah | Vinayak & Ririn — 16th January 2027",
  description:
    "Royal Wedding Invitation of Vinayak & Ririn. Solemnized by sacred Vedic traditions at Mahi Resort, Patti, Punjab. ॥ श्री गणेशाय नमः ॥ Click to open our wedding patrika.",
  keywords: [
    "Vinayak & Ririn Wedding",
    "Shubh Vivah",
    "Royal Indian Wedding Invitation",
    "Mahi Resort Patti Punjab",
    "Vedic Wedding",
    "16 January 2027",
  ],
  authors: [{ name: "Vinayak & Ririn" }],
  openGraph: {
    title: "Shubh Vivah | Vinayak & Ririn — 16th January 2027",
    description:
      "Together with their families, joyfully request the honour of your royal presence at Mahi Resort, Patti, Punjab (13th – 16th Jan 2027). ॥ श्री गणेशाय नमः ॥",
    url: "https://virin-wedding-indo-version-1-0.vercel.app",
    siteName: "Vinayak & Ririn Royal Wedding",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Vinayak & Ririn Royal Wedding Invitation",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubh Vivah | Vinayak & Ririn — 16th January 2027",
    description:
      "Witness the royal union of Vinayak & Ririn at Mahi Resort, Patti, Punjab (13th – 16th Jan 2027).",
    images: ["/images/og-preview.jpg"],
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
    <html lang="en" className={`${display.variable} ${body.variable} ${rozha.variable} ${cinzel.variable}`}>
      <head>
        <link rel="preload" as="image" href="/images/couple-hero.webp" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/royal-wax-seal.webp" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/embossed-paper.webp" fetchPriority="high" />
      </head>
      <body className="font-body bg-[#FAF7F2] text-[#2C2225] antialiased selection:bg-amber-200 selection:text-amber-950">
        <MotionConfig reducedMotion="user">
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
