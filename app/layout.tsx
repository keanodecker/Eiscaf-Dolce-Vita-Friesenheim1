import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/providers/LenisProvider";
import SeasonBanner from "@/components/SeasonBanner";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Eiscafé Dolce Vita – Hausgemachtes Bio-Eis in Friesenheim",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: "Eiscafé Dolce Vita Friesenheim",
    description:
      "Hausgemachtes Bio-Eis aus regionalen Zutaten – familiär, herzlich, in Friesenheim.",
    locale: "de_DE",
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Eiscafé Dolce Vita Friesenheim",
    description:
      "Hausgemachtes Bio-Eis aus regionalen Zutaten – familiär, herzlich, in Friesenheim.",
  },
  alternates: {
    canonical: "/",
  },
};

const dayMap: Record<number, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

function buildOpeningHoursSpec() {
  // Tage mit identischen opens/closes zusammenfassen
  const groups = new Map<string, string[]>();
  for (const d of siteConfig.openingHours) {
    if (d.closed || !d.opens || !d.closes) continue;
    const key = `${d.opens}-${d.closes}`;
    const dayNames = d.weekday.map((w) => dayMap[w]);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(...dayNames);
  }
  return Array.from(groups.entries()).map(([key, days]) => {
    const [opens, closes] = key.split("-");
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: days,
      opens,
      closes,
    };
  });
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "IceCreamShop",
    name: siteConfig.name,
    image: `${siteConfig.url}/og-image.jpg`, // PLATZHALTER - durch echtes Bild ersetzen, sobald vorhanden
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      postalCode: siteConfig.address.zip,
      addressLocality: siteConfig.address.city,
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.lat,
      longitude: siteConfig.coordinates.lng,
    },
    telephone: siteConfig.contact.phone.replace(/\s/g, ""),
    email: siteConfig.contact.email,
    url: siteConfig.url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.rating.stars.toString(),
      reviewCount: siteConfig.rating.count.toString(),
    },
    openingHoursSpecification: buildOpeningHoursSpec(),
    sameAs: [siteConfig.social.facebook],
    hasMap: siteConfig.rating.googleMapsUrl,
  };

  return (
    <html lang="de" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-weiss text-schokolade antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <LenisProvider>
          <SeasonBanner />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
