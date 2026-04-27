# Prompt 2: Echte Daten in die Website integrieren

## Ziel

Ersetze alle Platzhalter-Daten in der Website mit den echten Kontakt- und Geschäftsinformationen des Eiscafé Dolce Vita. Aktualisiere alle Stellen (Header, Footer, Kontakt-Sektion, eigene Kontaktseite, SEO-Tags, Schema.org Markup), an denen diese Daten vorkommen.

---

## Echte Daten

### Geschäftsinformationen

```ts
// In siteConfig.ts (oder vergleichbare zentrale Datei) eintragen

export const siteConfig = {
  name: "Eiscafé Dolce Vita",
  shortName: "Dolce Vita",
  tagline: "Eiscafé in Friesenheim",
  
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
    facebook: "https://www.facebook.com/Eiscafé-Dolce-Vita-Friesenheim-1696071923939466",
  },
  
  rating: {
    stars: 4.7,
    count: 332,
    googleMapsUrl: "https://maps.google.com/?cid=15056234374472547823",
  },
  
  openingHours: [
    { day: "Montag",            time: "11:30 – 20:00 Uhr", closed: false },
    { day: "Dienstag",          time: "11:30 – 20:00 Uhr", closed: false },
    { day: "Mittwoch",          time: "Ruhetag",            closed: true  },
    { day: "Donnerstag",        time: "11:30 – 20:00 Uhr", closed: false },
    { day: "Freitag",           time: "11:30 – 20:00 Uhr", closed: false },
    { day: "Samstag",           time: "14:00 – 20:00 Uhr", closed: false },
    { day: "Sonntag & Feiertage", time: "14:00 – 20:00 Uhr", closed: false },
  ],
  
  // Hinweis für späteren Saisonal-Wechsel:
  // Diese Öffnungszeiten gelten ab 30.03.2026 (Saisoneröffnung).
  
  agency: {
    name: "Media Castle",
    url: "https://mediacastle.de", // anpassen falls andere URL
  },
};
```

---

## Wo überall integrieren

### 1. Header / Navigation
- Logo-Bereich: "Dolce Vita" als Wortmarke (Schriftzug, kein Bild)
- Facebook-Icon rechts oben → Link zu `siteConfig.social.facebook`
- Klick aufs Logo → zurück zur Startseite

### 2. Hero-Sektion
- Großer Schriftzug: "Dolce Vita"
- Untertitel: "Eiscafé in Friesenheim"
- Google-Bewertungs-Badge unten:
  - Sterne (4,7 / 5)
  - Text: "4,7 / 5 · 332 Bewertungen auf Google"
  - Link: `siteConfig.rating.googleMapsUrl` (öffnet in neuem Tab, `target="_blank"` + `rel="noopener noreferrer"`)

### 3. Kontakt-Sektion auf der Homepage (am Ende)
- **Adresse-Block:**
  - "Hauptstraße 42"
  - "77948 Friesenheim"
- **Öffnungszeiten-Block:**
  - Tabelle/Liste aller 7 Tage
  - Mittwoch: "Ruhetag" visuell anders darstellen (z.B. ausgegraut oder dezent rot)
  - Optional: "Heute geöffnet bis 20:00 Uhr" / "Heute geschlossen" – dynamisch je nach aktuellem Wochentag berechnen
- **Kontaktbuttons (groß, gut tappbar auf Mobile):**
  - "Anrufen" → `tel:` Link
  - "WhatsApp" → wa.me Link (öffnet WhatsApp Web/App)
  - "E-Mail" → mailto Link
- **Google Maps Embed:**
  - Iframe mit Koordinaten 48.3750143, 7.8753382
  - Marker auf Eiscafé Dolce Vita
  - Höhe ca. 400px, abgerundete Ecken (rounded-2xl)
- **Großer CTA-Button:** "Route in Google Maps öffnen" → `siteConfig.rating.googleMapsUrl`

### 4. Footer
- Linke Spalte: Logo + kurzer Tagline
- Mittlere Spalte: Adresse + Telefon + E-Mail (jeweils klickbar)
- Rechte Spalte: Öffnungszeiten kompakt
- Unter allem: 
  - Facebook-Icon
  - Links zu Impressum & Datenschutz
  - "Website by Media Castle" als kleiner, dezenter Credit-Link

### 5. Eigene Kontaktseite (/kontakt)
- Großzügiger gestaltet als der Footer-Kontaktblock
- Alle Infos noch einmal übersichtlich
- Optional: einfaches Kontaktformular (Name, E-Mail, Nachricht) – kann erstmal als statisches Formular ohne Backend angelegt werden, mit Hinweis im Code, dass es noch ans CMS/Mailservice angebunden werden muss

---

## SEO & strukturierte Daten

### Meta-Tags (in `layout.tsx` oder per Page)

```tsx
export const metadata = {
  title: "Eiscafé Dolce Vita – Hausgemachtes Bio-Eis in Friesenheim",
  description: "Familiäres Eiscafé in Friesenheim mit 100% Bio-Milch, regionalen Zutaten und ausgezeichneter Hygiene. 4,7 Sterne bei 332 Google-Bewertungen.",
  openGraph: {
    title: "Eiscafé Dolce Vita Friesenheim",
    description: "Hausgemachtes Bio-Eis aus regionalen Zutaten – familiär, herzlich, in Friesenheim.",
    locale: "de_DE",
    type: "website",
  },
};
```

### Schema.org JSON-LD (für lokale Suchmaschinenoptimierung)

Im `<head>` der Homepage einbetten – das ist **wichtig für lokales Google-Ranking**:

```json
{
  "@context": "https://schema.org",
  "@type": "IceCreamShop",
  "name": "Eiscafé Dolce Vita",
  "image": "[URL zum Hauptbild]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Hauptstraße 42",
    "addressLocality": "Friesenheim",
    "postalCode": "77948",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.3750143,
    "longitude": 7.8753382
  },
  "telephone": "+4915202156548",
  "email": "eiscafe.dolcevita.salinco@gmail.com",
  "url": "[deine Website-URL]",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "332"
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Thursday","Friday"], "opens": "11:30", "closes": "20:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday","Sunday"], "opens": "14:00", "closes": "20:00" }
  ],
  "sameAs": [
    "https://www.facebook.com/Eiscafé-Dolce-Vita-Friesenheim-1696071923939466"
  ]
}
```

### Impressum (Pflichtangaben in Deutschland!)

Auf der `/impressum` Seite müssen mindestens stehen:
- Vollständiger Name des Inhabers (kommt später vom Kunden – Platzhalter "[Inhaber-Name]" lassen)
- Adresse: Hauptstraße 42, 77948 Friesenheim
- Telefon: 0152 02156548
- E-Mail: eiscafe.dolcevita.salinco@gmail.com
- Hinweis: "Umsatzsteuer-ID, Handelsregister-Eintrag etc. – ergänzen, sobald vom Kunden bekannt"

Auf der `/datenschutz` Seite Platzhalter-Datenschutzerklärung einbauen mit Hinweis im Code, dass der Kunde diese final prüfen lassen muss.

---

## Wichtige Detail-Hinweise

1. **Telefonnummer-Format:** International für `tel:` Links (`+4915202156548`), aber in der Anzeige deutsche Schreibweise (`0152 02156548`).

2. **WhatsApp-Link:** `https://wa.me/4915202156548` (ohne Pluszeichen, ohne Leerzeichen).

3. **E-Mail-Adresse:** Achtung, lange Adresse mit Punkten – immer copy/paste, nicht abtippen, sonst Tippfehler.

4. **Facebook-URL:** Enthält Sonderzeichen (é) – sicherstellen, dass URL-Encoding nicht kaputt geht. Bei Bedarf als `https://www.facebook.com/profile.php?id=1696071923939466` oder kurz testen.

5. **Mittwoch-Ruhetag:** Visuell hervorheben, damit Kunden nicht umsonst kommen.

6. **Saisonöffnung:** Die Öffnungszeiten gelten **ab 30.03.2026**. Falls die Seite vorher schon online geht, einen kleinen Banner/Hinweis einbauen: "Saisoneröffnung am 30. März 2026 – wir freuen uns auf euch!"

---

## Aufgabe

1. Lege/aktualisiere `siteConfig.ts` mit allen oben genannten Daten.
2. Ersetze alle Platzhalter in der Website durch Referenzen auf `siteConfig`.
3. Baue die Schema.org-Markup in die Homepage ein.
4. Aktualisiere Meta-Tags und Open Graph Tags.
5. Lege Impressum und Datenschutz mit Platzhalter-Inhalten an, wo eigene Daten noch fehlen.
6. Stelle sicher, dass alle Telefon-, E-Mail-, WhatsApp- und Facebook-Links auf Mobile korrekt funktionieren (öffnen die jeweilige App).
7. Gib mir am Ende eine Liste aller Stellen, die noch Inhalte vom Kunden brauchen (z.B. Inhaber-Name fürs Impressum, echte Bilder, Speisekarte-Inhalte, "Über uns"-Text).
