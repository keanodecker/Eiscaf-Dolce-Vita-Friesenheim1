export interface OpeningDay {
  day: string;
  time: string;
  closed: boolean;
  /** Wochentag-Index nach JS Date.getDay() (0 = Sonntag, 1 = Montag, ...) — als Array, damit "Sonntag & Feiertage" Sonntag matcht. */
  weekday: number[];
  /** Strukturierte Öffnungszeit für Status-Berechnung (24h, "HH:MM"). */
  opens?: string;
  closes?: string;
}

export const siteConfig = {
  name: "Eiscafé Dolce Vita",
  shortName: "Dolce Vita",
  tagline: "Eiscafé in Friesenheim",
  url: "https://dolce-vita-friesenheim.de", // PLATZHALTER - durch echte Domain ersetzen
  description:
    "Familiäres Eiscafé in Friesenheim mit 100% Bio-Milch, regionalen Zutaten und ausgezeichneter Hygiene. 4,7 Sterne bei 332 Google-Bewertungen.",

  address: {
    street: "Hauptstraße 42",
    zip: "77948",
    city: "Friesenheim",
    country: "Deutschland",
    full: "Hauptstraße 42, 77948 Friesenheim",
  },

  coordinates: {
    lat: 48.3750143,
    lng: 7.8753382,
  },

  contact: {
    phone: "+49 152 02156548",
    phoneDisplay: "0152 02156548",
    phoneLink: "tel:+4915202156548",

    whatsapp: "+4915202156548",
    whatsappLink: "https://wa.me/4915202156548",

    email: "eiscafe.dolcevita.salinco@gmail.com",
    emailLink: "mailto:eiscafe.dolcevita.salinco@gmail.com",
  },

  social: {
    facebook:
      "https://www.facebook.com/Eiscafé-Dolce-Vita-Friesenheim-1696071923939466",
  },

  rating: {
    stars: 4.7,
    count: 332,
    googleMapsUrl: "https://maps.google.com/?cid=15056234374472547823",
  },

  openingHours: [
    { day: "Montag", time: "11:30 – 20:00 Uhr", closed: false, weekday: [1], opens: "11:30", closes: "20:00" },
    { day: "Dienstag", time: "11:30 – 20:00 Uhr", closed: false, weekday: [2], opens: "11:30", closes: "20:00" },
    { day: "Mittwoch", time: "Ruhetag", closed: true, weekday: [3] },
    { day: "Donnerstag", time: "11:30 – 20:00 Uhr", closed: false, weekday: [4], opens: "11:30", closes: "20:00" },
    { day: "Freitag", time: "11:30 – 20:00 Uhr", closed: false, weekday: [5], opens: "11:30", closes: "20:00" },
    { day: "Samstag", time: "14:00 – 20:00 Uhr", closed: false, weekday: [6], opens: "14:00", closes: "20:00" },
    { day: "Sonntag & Feiertage", time: "14:00 – 20:00 Uhr", closed: false, weekday: [0], opens: "14:00", closes: "20:00" },
  ] satisfies OpeningDay[],

  /**
   * Saisoneröffnung – Öffnungszeiten gelten ab diesem Datum.
   * Vor diesem Datum zeigt der SeasonBanner einen Hinweis an;
   * danach blendet er sich automatisch aus.
   */
  seasonOpenDate: "2026-03-30",

  /**
   * Google Maps Embed-URL für das iframe (ohne API-Key, mit Suchanfrage statt nur Koordinaten,
   * damit der Marker korrekt auf das Eiscafé fällt).
   */
  mapsEmbedSrc:
    "https://maps.google.com/maps?q=Eisdiele+Dolce+Vita+Hauptstra%C3%9Fe+42+77948+Friesenheim&t=&z=16&ie=UTF8&iwloc=&output=embed",

  agency: {
    name: "Media Castle",
    email: "info@keanodecker.com",
    url: "https://mediacastle.de", // PLATZHALTER - falls andere URL, anpassen
  },

  nav: [
    { label: "Galerie", href: "/galerie" },
    { label: "Speisekarte", href: "/speisekarte" },
    { label: "Über uns", href: "/ueber-uns" },
    { label: "Kontakt", href: "/kontakt" },
  ],
};

export type SiteConfig = typeof siteConfig;
