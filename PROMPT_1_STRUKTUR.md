# Eiscafé Dolce Vita - Website Projekt

## Projektkontext

Du baust eine moderne, animationsstarke Website für **Eiscafé Dolce Vita** in Friesenheim (Baden-Württemberg, Deutschland). Es ist die einzige Eisdiele im Dorf, hat herausragend gute Bewertungen (4,7 Sterne bei 332 Google-Bewertungen) und einen starken USP: 100% Bio-Milch, regionale Zutaten, ausgezeichnete Hygiene-Zertifikate, familiäre Atmosphäre.

Das Auftraggeber-Projekt läuft über die Agentur **Media Castle** (mediacastle, info@keanodecker.com).

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animationen:** GSAP + ScrollTrigger
- **Smooth Scroll:** Lenis
- **Sprache:** TypeScript
- **Deployment-Ready:** Vercel

Wichtig: Alle Komponenten mit Animationen müssen `"use client"` Direktive haben. Nutze den `useGSAP` Hook (`@gsap/react`) für saubere GSAP-Integration in React.

---

## Design-Direktive

### Stimmung
**Verspielt familiär, einladend, mit italienischen Akzenten** – warm und freundlich, aber nicht kindisch. Es soll Lust auf Eis machen, sobald jemand die Seite öffnet.

### Sprache
**Deutsch als Hauptsprache, mit italienischen Akzenten** an gezielten Stellen:
- "Dolce Vita" als wiederkehrendes Element
- Begrüßungen wie "Benvenuti" oder "Buon Appetito" sparsam einsetzen
- Produktnamen italienisch (Gelato, Sorbetto, Affogato)
- Aber: Alle wichtigen Infos (Öffnungszeiten, Adresse, etc.) auf Deutsch

### Farbpalette (Pastell, eis-typisch)
```
--vanille:    #FFF8E7  (Hintergrund hell)
--erdbeere:   #FFB5BA  (Akzent warm)
--mint:       #B5E5D4  (Akzent frisch)
--pistazie:   #C5D89A  (Akzent Bio/Regional)
--schokolade: #4A2C2A  (Text dunkel)
--creme:      #FAF3E3  (Sektion alternativ)
```

Nutze diese als Tailwind Custom Colors in `tailwind.config.ts`.

### Typografie
- **Headlines:** "Fraunces" (Google Fonts) – warme Serif mit Charakter
- **Body:** "DM Sans" (Google Fonts) – clean, modern, gut lesbar
- Headlines dürfen groß und großzügig sein – die Seite hat wenig Inhalt, also soll Typografie atmen

---

## Seitenstruktur

### Globales Layout

**Navigation (transparent am Anfang, wird beim Scrollen weiß/blur):**
- Logo links: "Dolce Vita" als Wortmarke in Fraunces (kein Logo-Bild vorhanden, mit Schriftzug arbeiten)
- Mitte/Rechts: Galerie | Speisekarte | Über uns | Kontakt
- Ganz rechts: Facebook-Icon (kleiner, dezenter Link)
- Mobile: Hamburger-Menü mit Fullscreen-Overlay

**Footer:**
- Kontaktblock (Adresse, Telefon, E-Mail, Öffnungszeiten)
- Facebook-Link
- Google-Maps-Embed
- "Website by Media Castle" als kleiner Credit
- Impressum & Datenschutz Links

---

### Homepage Sektionen (in dieser Reihenfolge)

#### 1. HERO
- **Vollbild-Bild:** Sonniger Tag, blauer Himmel, Menschen vor einer Eisdiele, fröhliche Atmosphäre
  - Platzhalter: Stockfoto via Unsplash (z.B. "ice cream shop summer people")
  - Bild leicht abgedunkelt für bessere Textlesbarkeit (z.B. dunkler Gradient von unten)
- **Großer Schriftzug zentral:** "Dolce Vita" in Fraunces, sehr groß
- **Untertitel:** "Eiscafé in Friesenheim" oder ähnlich, in DM Sans
- **Animation beim Laden:**
  - Schriftzug fadet/sliced rein mit GSAP (z.B. SplitText Effekt – Buchstaben einzeln nach oben)
  - Bild zoomt subtil rein (Ken-Burns-Effekt, sehr langsam)
- **Unten zentriert:** Google-Bewertungs-Badge
  - Format: "★★★★★ 4,7 / 332 Bewertungen auf Google"
  - Sterne in goldgelb, dezent gestaltet, halb-transparenter weißer Hintergrund mit Blur
  - Klickbar → öffnet Google-Maps-Eintrag in neuem Tab
- **Scroll-Indikator** dezent unten (kleiner Pfeil oder Text "Mehr entdecken")

#### 2. GALERIE-VORSCHAU
- **Kleine Überschrift oben:** "GALERIE VORSCHAU" (Uppercase, Letter-Spacing, klein)
- **Hauptüberschrift:** "Einblicke" in großer Fraunces-Schrift, zentriert
- **Filter-Pills (zentriert unter Headline):**
  - 🍦 Eis | 🍰 Süßes | 🥤 Getränke
  - Pill-Design: weißer Hintergrund, dezenter Schatten, abgerundet (rounded-full)
  - Aktiver Filter: subtiler Pastell-Hintergrund (z.B. mint)
  - Smooth Transition beim Filterwechsel (GSAP)
- **Bildraster darunter:** 
  - Desktop: Horizontal scrollende Bildreihe (3-4 Bilder sichtbar) mit Drag/Swipe
  - Mobile: Horizontal scrollbar mit Snap
  - Bilder mit `rounded-2xl`, leichter Schatten beim Hover
  - Hover-Effekt: Bild zoomt leicht rein (scale 1.05)
- **Button unten zentriert:** "Zur kompletten Galerie →" → Link zu /galerie

#### 3. ÜBER UNS (kurz)
- **Layout:** Zweispaltig auf Desktop (Bild links, Text rechts), gestapelt auf Mobile
- **Bild:** Eine warme, persönliche Aufnahme (Inhaber, Team, Laden-Inneres)
  - Platzhalter: Stockfoto, gerne auch ein gemütliches Café-Interieur
- **Text:**
  - Kleine Überschrift: "ÜBER UNS"
  - Headline: "Familientradition trifft auf echte Leidenschaft" (oder ähnlich – Platzhaltertext)
  - 2-3 Sätze Lorem-ähnlicher Platzhalter, später vom Kunden gefüllt
  - Button: "Mehr über uns" → Link zu /ueber-uns
- **Animation:** Bild und Text sliden beim Scrollen aus jeweiliger Richtung rein (GSAP ScrollTrigger)

#### 4. ZERTIFIKATE / USPs (3-Spalter)
- **Überschrift:** "Was uns auszeichnet" oder "Unser Versprechen"
- **Drei Karten nebeneinander:**

  **Karte 1: 100% Bio-Milch**
  - Bild: Kuh auf grüner Wiese (Stockfoto-Platzhalter)
  - Titel: "100% Bio-Milch"
  - Kurztext: "Aus artgerechter Haltung – für puren Geschmack."
  
  **Karte 2: Nachhaltig & Regional**
  - Bild: Landschaft / Bauernhof aus der Region (Stockfoto)
  - Titel: "Nachhaltig & Regional"
  - Kurztext: "Unsere Milch kommt direkt aus der Region rund um Friesenheim."
  
  **Karte 3: Hygiene-Zertifikate**
  - Bild: Sauberes Profi-Eis-Equipment oder Hygiene-Zertifikat-Symbol
  - Titel: "Ausgezeichnete Hygiene"
  - Kurztext: "Mehrfach zertifiziert für höchste Sauberkeitsstandards."

- **Karten-Design:** Pastell-Hintergrund (z.B. abwechselnd mint/erdbeere/pistazie ganz subtil), abgerundet, mit dezentem Hover-Lift
- **Animation:** Karten erscheinen nacheinander (Stagger) beim Scrollen rein

#### 5. KONTAKT (Footer-ähnlich, am Ende der Homepage)
- **Überschrift:** "Komm vorbei!" oder "Besuch uns"
- **Zweispaltig:**
  - Links: Adresse, Telefon, Öffnungszeiten, E-Mail
  - Rechts: Google Maps Embed (Lat: 48.3750143, Lng: 7.8753382)
- **Großer CTA-Button:** "In Google Maps öffnen" → Link zum Maps-Eintrag

---

### Unterseiten (Routing aufbauen, Inhalte können Platzhalter sein)

- `/galerie` – Komplette Galerie mit allen Filterkategorien, Masonry-Layout oder Grid
- `/speisekarte` – Speisekarten-Übersicht (Kategorien, Preise – Platzhalter)
- `/ueber-uns` – Längere Über-uns-Story (Platzhalter)
- `/kontakt` – Vollständige Kontaktseite (Formular + alle Infos + Karte)
- `/impressum` – Impressum (leer, Platzhalter)
- `/datenschutz` – Datenschutzerklärung (leer, Platzhalter)

---

## Animations-Direktive

**Globale Prinzipien:**
- Lenis Smooth Scroll global aktiviert
- Alle Sektionen haben subtile Reveal-Animationen beim Scrollen rein (Fade + Slide-up)
- Keine harten Cuts, alles soll weich wirken
- Performance: Animationen müssen auch auf Mittelklasse-Smartphones flüssig laufen

**Spezifische Effekte:**
- Hero-Bild: langsamer Ken-Burns-Zoom (10s+ Loop)
- Hero-Text: Buchstaben fliegen einzeln rein (SplitText oder manuell mit GSAP)
- Sektion-Headlines: Slide-up + Fade beim Scroll-Trigger
- Bilder in Galerie: Mask-Reveal (von unten nach oben)
- Karten in Zertifikate-Sektion: Stagger-Reveal (jede Karte 0.15s versetzt)
- Hover auf Buttons: leichte Skalierung + Farbwechsel (cubic-bezier easing)

---

## Bilder & Assets

Da noch keine echten Bilder vorhanden sind:
- Nutze Unsplash-Platzhalter via URL (z.B. `https://source.unsplash.com/...`) oder lokale Platzhalter
- Markiere alle Platzhalter klar mit Kommentar `// PLATZHALTER - durch echtes Bild ersetzen`
- Bildformate: WebP wo möglich, mit Fallbacks
- Lazy Loading für alle Bilder unterhalb des Folds

**Empfohlene Unsplash-Suchbegriffe für Platzhalter:**
- Hero: "ice cream shop summer crowd"
- Galerie Eis: "gelato cone", "ice cream sundae"
- Galerie Süßes: "dessert cake", "tiramisu"
- Galerie Getränke: "iced coffee", "milkshake"
- Über uns: "italian cafe interior cozy"
- Bio-Milch: "cow pasture green"
- Regional: "bavarian countryside farm"

---

## Wichtige technische Details

1. **Mobile First:** Die Seite wird zu 80%+ mobil aufgerufen. Jede Sektion muss auf Smartphone perfekt funktionieren, BEVOR Desktop-Polish kommt.
2. **Performance-Budget:** Lighthouse Score Mobile mindestens 85 Performance, 100 SEO.
3. **SEO:** Meta-Tags für jede Seite, Open Graph Tags, structured data für Local Business (LocalBusiness Schema mit Adresse, Öffnungszeiten, Bewertungen).
4. **Accessibility:** Alt-Texte für alle Bilder (Platzhalter okay), semantisches HTML, Tastaturnavigation funktioniert.

---

## Echte Daten zum Einbauen

```
Name: Eiscafé Dolce Vita
Standort: Friesenheim (Baden-Württemberg, Deutschland)
Google Maps Link: https://maps.google.com/?cid=15056234374472547823
Google Bewertung: 4,7 Sterne bei 332 Bewertungen
Koordinaten: 48.3750143, 7.8753382
```

Adresse, Telefon, E-Mail und exakte Öffnungszeiten kommen später vom Kunden – dafür Platzhalter einbauen, die leicht zu ersetzen sind (z.B. in einer zentralen `siteConfig.ts` Datei).

---

## Aufgabe für diesen Prompt

Bau die **komplette Grundstruktur** des Projekts auf:
1. Next.js Projekt initialisieren
2. Alle Dependencies installieren (Tailwind, GSAP, @gsap/react, Lenis, Fonts)
3. `tailwind.config.ts` mit Custom Colors und Fonts
4. Globales Layout mit Navigation und Footer
5. Homepage mit allen 5 Sektionen (mit Platzhalter-Bildern und Platzhalter-Text)
6. Routing für alle Unterseiten (leere Seiten mit Headline reichen)
7. Lenis Smooth Scroll global einbinden
8. Erste GSAP-Animationen für Hero und Sektion-Reveals einbauen
9. `siteConfig.ts` mit allen änderbaren Daten zentral

Animationen müssen funktionieren, müssen aber noch nicht perfekt poliert sein – Polish und Spezial-Effekte kommen im nächsten Prompt.

Am Ende: kurze README mit Befehlen (`npm run dev`, etc.) und einer Liste aller Stellen, die noch echten Inhalt brauchen.
