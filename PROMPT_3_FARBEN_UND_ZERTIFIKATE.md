# Prompt 3: Farben anpassen + Zertifikate-Sektion neu bauen

Es gibt zwei Aufgaben in diesem Prompt. Bitte beide nacheinander abarbeiten.

---

## Teil A: Farbpalette anpassen

Die aktuelle Palette ist mir zu cremig/warm. Ich möchte stattdessen eine **frischere, kräftigere Palette mit Weiß als Basis** und klaren Akzentfarben:

### Neue Farbpalette

```
--weiss:       #FFFFFF  (Haupt-Hintergrund, ersetzt das cremige Vanille)
--mint:        #6FCFB5  (Hauptakzent frisch – kräftiger als vorher)
--rot:         #E63946  (Akzent warm/kraftvoll – ersetzt Erdbeere-Pastell)
--creme-soft:  #FAF7F2  (nur sehr sparsam für alternative Sektionen, nicht dominant)
--schokolade:  #2B2118  (Text dunkel, etwas tiefer als vorher)
--mint-soft:   #E8F6F1  (sehr helle Mint-Variante für Hover/Backgrounds)
--rot-soft:    #FCE4E6  (sehr helle Rot-Variante für Hover/Backgrounds)
```

### Aufgaben

1. Aktualisiere `tailwind.config.ts` (bzw. die Tailwind v4 Config – `@theme` in CSS) mit diesen neuen Farben.
2. Ersetze in der **gesamten Website** alle Verwendungen der alten Pastell-Farben (vanille, erdbeere, pastell-mint, pistazie) durch die neuen Farben:
   - Hintergründe, die vorher `vanille` waren → `weiss`
   - Akzent-Pastell-Erdbeere → `rot` (sparsam, als Highlight)
   - Pastell-Mint → kräftiges `mint`
   - Pistazie → entweder durch `mint` ersetzen oder ganz entfernen
3. Behalte das Verhältnis: **Weiß dominiert (~80%), Mint als Hauptakzent (~15%), Rot als kraftvoller Highlight-Akzent (~5%)**
4. Buttons, Filter-Pills, Hover-States, CTA-Elemente entsprechend neu einfärben.
5. Prüfe, dass der Kontrast (Text auf Hintergrund) WCAG AA erfüllt – besonders Schokoladen-Text auf Weiß und auf Mint.

---

## Teil B: Zertifikate-Sektion komplett neu bauen

Die aktuelle Zertifikate-Sektion (3-Spalter mit Karten) wird **komplett ersetzt** durch eine neue Komponente.

### Komponente erstellen

**Dateipfad:** `components/sections/CertificatesSection.tsx`

**Stack-Anforderungen:**
- Next.js App Router
- TypeScript
- Tailwind CSS v4
- GSAP mit ScrollTrigger
- `next/image` für Bilder
- `"use client"` Direktive (wegen GSAP)
- Nutze den `useGSAP` Hook von `@gsap/react`

### Struktur

3 vollbildbreite Sections, jede `min-h-[80vh]`, die abwechselnd gespiegelt sind:

- **Section 1 (Biomilch):** Bild links / Text rechts (Standard-Layout)
- **Section 2 (Nachhaltigkeit):** Text links / Bild rechts → mit `md:flex-row-reverse`
- **Section 3 (Hygiene):** Bild links / Text rechts (Standard-Layout)

### Aufbau jeder Section

**Linke Hälfte** (`w-full md:w-1/2`):
- Vollflächiges Bild mit `next/image`
- Props: `fill`, `object-cover`, sinnvolles `sizes`-Attribut
- Leichtes dunkles Overlay: `bg-black/10` (absolut positioniert über dem Bild)

**Rechte Hälfte** (`w-full md:w-1/2`):
- Weißer Hintergrund (`bg-weiss`)
- Vertikal zentrierter Inhalt: `flex flex-col justify-center`
- Großzügiges Padding: `px-8 md:px-16 lg:px-24 py-16`
- Innen:
  - **Badge** (oben): Uppercase, kleiner, farbig (Mint-soft Background mit Mint-Text, oder Rot-soft mit Rot-Text), `rounded-full px-4 py-1.5 text-xs tracking-wider`
  - **H2-Überschrift:** Serif-Font (Fraunces), Größe `clamp(1.8rem, 3.5vw, 3rem)`, dunkler Schokolade-Ton, `mt-6 mb-4 leading-tight`
  - **Fließtext:** Body-Font (DM Sans), `text-base md:text-lg leading-relaxed text-schokolade/80 mb-8 max-w-prose`
  - **CTA-Button (optional, nur bei Section 1):** Pill-Style mit Border-Outline (kein gefüllter Button), `border border-schokolade text-schokolade hover:bg-schokolade hover:text-weiss transition-all rounded-full px-6 py-3`

### GSAP Scroll-Animation

**Standardverhalten (Desktop):**
- Beide Hälften sliden beim Scrollen rein
- Bild von links (`x: -100, opacity: 0` → `x: 0, opacity: 1`)
- Text von rechts (`x: 100, opacity: 0` → `x: 0, opacity: 1`)
- **Bei gespiegelter Section 2:** Richtung umkehren (Bild kommt von rechts, Text von links)
- ScrollTrigger-Konfiguration:
  ```ts
  scrub: 1.5,
  start: "top 75%",
  end: "top 25%",
  ```

**Mobile-Verhalten** (Breakpoint `< 768px`):
- `scrub: false`
- `once: true` (Animation läuft einmalig durch, kein Scrub)
- Trigger-Punkte etwas später: `start: "top 85%"`

**Accessibility:**
- Prüfe `window.matchMedia('(prefers-reduced-motion: reduce)').matches`
- Wenn aktiv: **keine Animation**, Elemente direkt sichtbar
- Verwende `gsap.matchMedia()` für saubere Handling von Desktop/Mobile/Reduced-Motion

**Cleanup:**
- Nutze `gsap.context()` für die Animationen
- Cleanup via `ctx.revert()` im useGSAP-Cleanup

**Performance:**
- `will-change-transform` als Tailwind-Klasse oder inline-Style auf beiden Hälften
- Vermeide Layout-Shifts durch korrekte Bildgrößen

### Inhalte der 3 Sections

#### Section 1: Biomilch
- **Bild:** `https://images.unsplash.com/photo-1500595046743-cd271d694d30` (Kühe auf Weide)
- **Alt-Text:** "Glückliche Kühe auf einer grünen Weide"
- **Badge:** "🥛 Zertifiziert" (Mint-Variante)
- **Titel:** "100% Biomilch"
- **Text:** "Wir verarbeiten ausschließlich zertifizierte Biomilch aus der Region. Unsere Partner-Höfe arbeiten nach strengen Bio-Richtlinien – für puren Geschmack und gutes Gewissen in jeder Kugel."
- **CTA-Button:** "Zur Speisekarte" → Link zu `/speisekarte`

#### Section 2: Nachhaltigkeit (gespiegelt)
- **Bild:** `https://images.unsplash.com/photo-1441974231531-c6227db76b6e` (Wald/Natur)
- **Alt-Text:** "Sonnendurchfluteter Wald, Symbol für Nachhaltigkeit"
- **Badge:** "🌿 Nachhaltig" (Mint-Variante)
- **Titel:** "Nachhaltig & Regional"
- **Text:** "Von der Verpackung bis zur Zutat – wir denken bei jedem Detail an unsere Umwelt. Kurze Lieferwege, biologisch abbaubare Materialien und Partner aus der Region rund um Friesenheim."
- **Kein CTA-Button**

#### Section 3: Hygiene
- **Bild:** `https://images.unsplash.com/photo-1556909114-f6e7ad7d3136` (Profiküche)
- **Alt-Text:** "Saubere Profiküche, Symbol für höchste Hygienestandards"
- **Badge:** "✅ Ausgezeichnet" (Rot-Variante – als kraftvoller Highlight-Akzent)
- **Titel:** "Ausgezeichnete Hygiene"
- **Text:** "Regelmäßige unabhängige Prüfungen bestätigen unsere höchsten Sauberkeitsstandards. Mehrfach zertifiziert – damit du dich auf jeden Löffel verlassen kannst."
- **Kein CTA-Button**

### Integration in die Homepage

- Ersetze die bisherige Zertifikate-Sektion (3-Spalter-Karten) auf der Homepage durch diese neue `<CertificatesSection />` Komponente.
- Position bleibt gleich: zwischen "Über uns" und "Kontakt".
- Die alte Komponente (3-Spalter) kann gelöscht werden, falls sie nicht woanders genutzt wird.

---

## Aufgabe-Reihenfolge

1. **Erst Teil A** (Farbpalette) komplett umsetzen und prüfen, dass die ganze Website noch sauber aussieht.
2. **Dann Teil B** (Zertifikate-Sektion) bauen – die neue Komponente nutzt direkt schon die neuen Farben.
3. Am Ende: Dev-Server kurz neu starten, prüfen, dass keine TypeScript-Fehler oder Build-Warnings auftreten.
4. Gib mir eine kurze Zusammenfassung, was geändert wurde, und ob irgendwo noch Stellen sind, wo alte Farben übersehen wurden.
