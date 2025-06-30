import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

// --- SEO и OpenGraph мета-данные через generateMetadata ---

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL("https://evallume.com"),
    title: {
      default: "Evallume | Professional Aesthetic Equipment | USA",
      template: "%s | Evallume",
    },
    description: "Discover Evallume's advanced aesthetic devices for beauty professionals in the USA.",
    keywords: [
      "diode laser", "hair removal", "aesthetic equipment", "FDA certified",
      "Evallume", "professional laser USA", "laser for medspas",
      "beauty clinic technology", "laser hair removal USA"
    ],
    openGraph: {
      title: "Evallume | Professional Aesthetic Equipment | USA",
      description: "Discover Evallume's advanced aesthetic devices for beauty professionals in the USA.",
      url: "https://evallume.com",
      siteName: "Evallume",
      images: [
        {
          url: "/img/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Evallume - FDA Certified Aesthetic Devices for Medspas & Clinics"
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Evallume | Professional Aesthetic Equipment | USA",
      description: "Discover Evallume's advanced aesthetic devices for beauty professionals in the USA.",
      images: ["/img/og-image.jpg"],
      creator: "@your_twitter",
    },
    robots: "index, follow",
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
      ],
      apple: "/apple-touch-icon.png",
      shortcut: "/favicon.ico",
    },
    manifest: "/site.webmanifest",
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="font-sans">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RZRN267WK3"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RZRN267WK3');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-gradient-to-br from-[#e6dad1] via-[#bfcbd8] to-[#e6dad1] text-black">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
