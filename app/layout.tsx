import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.waterloocountyrugby.com"),
  title: {
    default: "Waterloo County Rugby Club | Rugby in Waterloo Region, Ontario",
    template: "%s | Waterloo County RFC",
  },
  description:
    "Join Waterloo County Rugby Club — the heart of rugby union in the Waterloo Region. Fixtures, results, news, and membership for all ages and abilities.",
  keywords: ["rugby club waterloo ontario", "waterloo county rugby", "rugby union ontario", "kitchener waterloo rugby"],
  authors: [{ name: "Waterloo County Rugby Club" }],
  openGraph: {
    type: "website",
    siteName: "Waterloo County Rugby Club",
    locale: "en_CA",
    url: "https://www.waterloocountyrugby.com",
    images: [{ url: "/og-home.jpg", width: 1200, height: 630, alt: "Waterloo County Rugby Club" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@WaterlooCountyRFC",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="en-ca" href="https://www.waterloocountyrugby.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.waterloocountyrugby.com/" />
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Waterloo, Ontario, Canada" />
        <meta name="geo.position" content="43.4668;-80.5164" />
        <meta name="ICBM" content="43.4668, -80.5164" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsOrganization",
              "@id": "https://www.waterloocountyrugby.com/#organization",
              name: "Waterloo County Rugby Club",
              url: "https://www.waterloocountyrugby.com/",
              sport: "Rugby Union",
              description: "The heart of rugby union in the Waterloo Region, Ontario.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "80 Bluevale Street North",
                addressLocality: "Waterloo",
                addressRegion: "ON",
                postalCode: "N2J 3R5",
                addressCountry: "CA",
              },
              geo: { "@type": "GeoCoordinates", latitude: 43.475193, longitude: -80.5000229 },
              sameAs: [
                "https://www.facebook.com/WaterlooCountyRugby",
                "https://www.instagram.com/waterloocountyrugby/",
                "http://www.rugbyontario.com/",
                "http://www.rugbycanada.ca",
              ],
              memberOf: { "@type": "SportsOrganization", name: "Southwest Ontario Rugby Union (SWORU)" },
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${bebasNeue.variable} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
