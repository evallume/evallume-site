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

        {/* Meta (Facebook) Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1076066877735308');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-gradient-to-br from-[#e6dad1] via-[#bfcbd8] to-[#e6dad1] text-black">
        {children}

        {/* Meta Pixel <noscript> для пользователей без JS */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1076066877735308&ev=PageView&noscript=1"
          />
        </noscript>

        <Analytics />
      </body>
    </html>
  );
}
