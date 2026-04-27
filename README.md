# Eiscafé Dolce Vita — Website

Moderne, animationsstarke Website für das **Eiscafé Dolce Vita** in Friesenheim.
Gebaut mit Next.js 14 (App Router), TypeScript, Tailwind CSS, GSAP und Lenis.

Auftraggeber-Projekt der Agentur **Media Castle**.

---

## Setup

```bash
npm install     # Dependencies installieren
npm run dev     # Entwicklungs-Server (http://localhost:3000)
npm run build   # Produktions-Build
npm run start   # Produktions-Server
npm run lint    # Linter
```

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS (custom colors + custom fonts)
- **Animationen:** GSAP 3 + ScrollTrigger via `@gsap/react` (`useGSAP` Hook)
- **Smooth Scroll:** Lenis (in `LenisProvider` an GSAP-Ticker gekoppelt)
- **Fonts:** Fraunces (Headlines) + DM Sans (Body) via `next/font/google`

---

## Projektstruktur

```
app/
  layout.tsx          # Root-Layout mit Fonts, Nav, Footer, Lenis, Schema.org JSON-LD
  page.tsx            # Homepage (5 Sektionen)
  globals.css         # Tailwind + Custom Utilities
  galerie/            # Komplette Galerie
  speisekarte/        # Speisekarte mit Kategorien
  ueber-uns/          # Über-uns-Story
  kontakt/            # Kontaktseite mit Formular
  impressum/          # Impressum (§ 5 TMG)
  datenschutz/        # Datenschutzerklärung (Platzhalter mit Hinweis)

components/
  Navigation.tsx      # Sticky-Nav mit Mobile-Overlay
  Footer.tsx          # Footer mit Kontakt + Öffnungszeiten
  PageHeader.tsx      # Wiederverwendbarer Header für Unterseiten
  SeasonBanner.tsx    # Saisoneröffnungs-Hinweis (auto-hide nach Datum)
  TodayBadge.tsx      # "Heute geöffnet bis 20:00 Uhr" – dynamisch
  providers/
    LenisProvider.tsx # Smooth-Scroll-Setup
  sections/
    Hero.tsx          # Vollbild-Hero, Ken-Burns, Letter-Reveal, Bewertungs-Badge
    GalleryPreview.tsx# Filter-Pills + horizontaler Slider
    About.tsx         # 2-Spalten Slide-in
    Certificates.tsx  # 3 Karten mit Stagger
    Contact.tsx       # Kontakt + WhatsApp + Maps + Wochentabelle

lib/
  siteConfig.ts       # Zentrale Konfigurationsdaten (echte Geschäftsdaten)
  openingStatus.ts    # Helper für "Heute geöffnet"-Berechnung
  galleryItems.ts     # Galerie-Bilder + Filter-Definitionen
```

---

## Echte Daten – integriert

Folgende echte Geschäftsdaten sind in `lib/siteConfig.ts` zentral hinterlegt
und werden überall (Footer, Hero, Kontakt, Impressum, Schema.org) referenziert:

| Feld          | Wert                                                                   |
| ------------- | ---------------------------------------------------------------------- |
| Adresse       | Hauptstraße 42, 77948 Friesenheim                                      |
| Koordinaten   | 48.3750143, 7.8753382                                                  |
| Telefon       | 0152 02156548 (`tel:+4915202156548`)                                   |
| WhatsApp      | https://wa.me/4915202156548                                            |
| E-Mail        | eiscafe.dolcevita.salinco@gmail.com                                    |
| Facebook      | facebook.com/Eiscafé-Dolce-Vita-Friesenheim-1696071923939466           |
| Bewertung     | 4,7 ★ / 332 Bewertungen — verlinkt auf Google Maps via cid             |
| Öffnungszeit. | Mo/Di/Do/Fr 11:30–20:00 · Mi Ruhetag · Sa/So 14:00–20:00               |
| Saisonstart   | 30.03.2026 (SeasonBanner blendet sich nach diesem Datum auto. aus)     |

---

## Was noch vom Kunden gebraucht wird

### Pflicht (vor Live-Gang)
- [ ] **Inhaber-Name** für Impressum (Verantwortlicher nach § 55 RStV)
- [ ] **Umsatzsteuer-ID / Handelsregister-Eintrag** für Impressum (falls vorhanden)
- [ ] **Datenschutzerklärung** final prüfen lassen (z.B. via eRecht24-Generator),
      Hoster + tatsächlich genutzte Tools eintragen — `app/datenschutz/page.tsx`
- [ ] **Domain festlegen** und in `siteConfig.url` eintragen (aktuell:
      `https://dolce-vita-friesenheim.de`)
- [ ] **Formular-Backend** für `/kontakt` (Resend / Formspree / API-Route)

### Inhaltlich (nice-to-have, kann auch später)
- [ ] **Hero-Bild** – Eiscafé an einem sonnigen Tag mit Menschen
      (`components/sections/Hero.tsx`)
- [ ] **Über uns Bild & Text** — finale Sätze über Familie/Geschichte
      (`components/sections/About.tsx` + `app/ueber-uns/page.tsx`)
- [ ] **Galerie-Bilder** – echte Aufnahmen von Eis, Süßem, Getränken
      (`lib/galleryItems.ts`)
- [ ] **Speisekarte** – echte Sorten und Preise (`app/speisekarte/page.tsx`)
- [ ] **Bilder für Zertifikate** — Bio-Milch, Region, Hygiene
      (`components/sections/Certificates.tsx`)
- [ ] **OG-Image** – `public/og-image.jpg` für Social-Sharing-Vorschau
      (im Schema.org und Open Graph schon referenziert)

---

## Designsystem (Quick-Ref)

**Farben:**
- `vanille` `#FFF8E7` — Haupt-Hintergrund
- `creme` `#FAF3E3` — Alternativer Sektion-Hintergrund
- `erdbeere` `#FFB5BA`, `mint` `#B5E5D4`, `pistazie` `#C5D89A` — Akzente
- `schokolade` `#4A2C2A` — Text dunkel

**Typografie:**
- Headlines: `font-serif` → Fraunces
- Body: `font-sans` → DM Sans

**Utilities:**
- `.container-page` — zentriertes max-w-7xl mit Padding
- `.eyebrow` — kleiner Uppercase-Label
- `.btn-primary` / `.btn-ghost` — die zwei CTA-Stile
- `ease-soft-out` — Custom Cubic-Bezier für weiche Übergänge

---

## SEO & Local Business

- ✅ Meta-Title: "Eiscafé Dolce Vita – Hausgemachtes Bio-Eis in Friesenheim"
- ✅ Open Graph + Twitter Cards (locale `de_DE`)
- ✅ JSON-LD `IceCreamShop` mit:
  - Adresse, Geo-Koordinaten, Telefon, E-Mail
  - `aggregateRating` 4.7 / 332
  - `openingHoursSpecification` (Mi automatisch ausgenommen, Mo/Di/Do/Fr und Sa/So gruppiert)
  - `sameAs` Facebook, `hasMap` Google Maps URL
- ✅ Telefon-, WhatsApp-, Mail-Links nach `tel:` / `mailto:` / `wa.me` Standard,
      öffnen auf Mobile die jeweilige App
- ✅ `aria-label`/`aria-pressed`, semantisches HTML, Mittwoch-Ruhetag visuell hervorgehoben

---

## Deployment

Optimiert für **Vercel**: einfach das Repo verbinden, Build-Befehl `npm run build`,
Output-Verzeichnis `.next`. Keine zusätzlichen Env-Variablen nötig — alle Geschäftsdaten
zentral in `siteConfig.ts`.

---

Website by [Media Castle](mailto:info@keanodecker.com)
