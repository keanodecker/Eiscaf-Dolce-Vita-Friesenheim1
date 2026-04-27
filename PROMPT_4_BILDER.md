# Prompt 4: Provisorische Bilder einfügen

Zwei Aufgaben in diesem Prompt – beide mit Unsplash-Platzhaltern, die später durch echte Kundenbilder ersetzt werden.

---

## Teil A: Galerie-Vorschau auf der Homepage befüllen

Die Galerie-Vorschau-Sektion auf der Homepage soll mit echten (Platzhalter-)Bildern befüllt werden. Maximal **9 Bilder pro Kategorie**.

### Datenstruktur

Erstelle (falls noch nicht vorhanden) eine zentrale Datei für die Galerie-Daten:

**Pfad:** `data/galleryImages.ts`

```ts
export type GalleryCategory = "eis" | "suesses" | "getraenke";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
}

export const galleryImages: GalleryImage[] = [
  // === EIS (max. 9) ===
  { id: "eis-1", src: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57", alt: "Cremiges Schoko-Eis im Waffelbecher", category: "eis" },
  { id: "eis-2", src: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a", alt: "Erdbeer-Eiscreme mit frischen Beeren", category: "eis" },
  { id: "eis-3", src: "https://images.unsplash.com/photo-1488900128323-21503983a07e", alt: "Pistazieneis in der Waffel", category: "eis" },
  { id: "eis-4", src: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f", alt: "Vanille-Eiskugel mit Minze", category: "eis" },
  { id: "eis-5", src: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7", alt: "Bunter Eisbecher mit Streuseln", category: "eis" },
  { id: "eis-6", src: "https://images.unsplash.com/photo-1505394033641-40c6ad1178ea", alt: "Schokoladen-Eis mit Sauce", category: "eis" },
  { id: "eis-7", src: "https://images.unsplash.com/photo-1563805042-7684c019e1cb", alt: "Eis am Stiel handgemacht", category: "eis" },
  { id: "eis-8", src: "https://images.unsplash.com/photo-1586985288940-d6cce11ed379", alt: "Sorbet in der Waffeltüte", category: "eis" },
  { id: "eis-9", src: "https://images.unsplash.com/photo-1570197788417-0e82375c9371", alt: "Eis-Variation mit Früchten", category: "eis" },

  // === SÜSSES (max. 9) ===
  { id: "suess-1", src: "https://images.unsplash.com/photo-1551024506-0bccd828d307", alt: "Cremiges Tiramisu im Glas", category: "suesses" },
  { id: "suess-2", src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187", alt: "Hausgemachtes Schokoladendessert", category: "suesses" },
  { id: "suess-3", src: "https://images.unsplash.com/photo-1488477181946-6428a0291777", alt: "Erdbeer-Dessert mit Sahne", category: "suesses" },
  { id: "suess-4", src: "https://images.unsplash.com/photo-1464195244916-405fa0a82545", alt: "Italienische Cannoli mit Pistazien", category: "suesses" },
  { id: "suess-5", src: "https://images.unsplash.com/photo-1488477304112-4944851de03d", alt: "Panna Cotta mit Beerenkompott", category: "suesses" },
  { id: "suess-6", src: "https://images.unsplash.com/photo-1587314168485-3236d6710814", alt: "Schokoladen-Brownie mit Eis", category: "suesses" },
  { id: "suess-7", src: "https://images.unsplash.com/photo-1567022017-fc1e3da5b4c4", alt: "Cremiges Käsekuchenstück", category: "suesses" },
  { id: "suess-8", src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38", alt: "Macarons in Pastellfarben", category: "suesses" },
  { id: "suess-9", src: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d", alt: "Italienischer Affogato", category: "suesses" },

  // === GETRÄNKE (max. 9) ===
  { id: "drink-1", src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735", alt: "Cremiger Cappuccino mit Latte Art", category: "getraenke" },
  { id: "drink-2", src: "https://images.unsplash.com/photo-1572490122747-3968b75cc699", alt: "Eiskaffee mit Sahnehaube", category: "getraenke" },
  { id: "drink-3", src: "https://images.unsplash.com/photo-1437418747212-8d9709afab22", alt: "Italienischer Espresso", category: "getraenke" },
  { id: "drink-4", src: "https://images.unsplash.com/photo-1546039907-7fa05f864c02", alt: "Erdbeer-Milchshake", category: "getraenke" },
  { id: "drink-5", src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd", alt: "Frischer Smoothie mit Beeren", category: "getraenke" },
  { id: "drink-6", src: "https://images.unsplash.com/photo-1497636577773-f1231844b336", alt: "Limonade mit Minze und Zitrone", category: "getraenke" },
  { id: "drink-7", src: "https://images.unsplash.com/photo-1544145945-f90425340c7e", alt: "Heiße Schokolade mit Sahne", category: "getraenke" },
  { id: "drink-8", src: "https://images.unsplash.com/photo-1558122104-355edad709f6", alt: "Eistee mit Zitrone", category: "getraenke" },
  { id: "drink-9", src: "https://images.unsplash.com/photo-1481671703460-040cb8a2d909", alt: "Iced Latte mit Karamell", category: "getraenke" },
];
```

### Komponente anpassen

Aktualisiere die Galerie-Vorschau-Komponente auf der Homepage:

1. Importiere `galleryImages` aus `data/galleryImages.ts`.
2. Aktiver Filter steht im State (Standard: `"eis"`).
3. Bilder werden nach aktivem Filter gefiltert: `galleryImages.filter(img => img.category === activeCategory)`.
4. Maximal 9 Bilder werden angezeigt (durch die Datenstruktur bereits begrenzt).
5. Filter-Pills wie gehabt: 🍦 Eis | 🍰 Süßes | 🥤 Getränke
6. Beim Filterwechsel: smoother GSAP-Übergang (Bilder fade-out, dann fade-in mit kurzem Stagger).

### Layout-Anforderungen

- **Desktop:** Horizontal scrollbar mit Drag/Swipe-Geste, ca. 4 Bilder gleichzeitig sichtbar
- **Mobile:** Horizontal scrollbar mit `scroll-snap-type: x mandatory` und `scroll-snap-align: start` auf Bildern
- Bilder: `aspect-square` oder `aspect-[4/5]`, `rounded-2xl`, dezenter Schatten beim Hover (`hover:shadow-xl`), leichter Scale-Hover (`hover:scale-105`)
- Bildhöhe ca. 320–400px
- Gap zwischen Bildern: `gap-4 md:gap-6`
- Bildgrößen-Optimierung mit `next/image` und sinnvollem `sizes`-Attribut

### Wichtig

- Auch die `/galerie`-Seite (komplette Galerie) soll dieselbe Datenquelle nutzen, dort aber alle Bilder pro Kategorie zeigen (Masonry oder Grid-Layout).
- Falls die `/galerie`-Seite noch leer ist: ein einfaches responsives Grid mit denselben Filter-Pills oben aufbauen.

---

## Teil B: Bilder in der Zertifikate-Sektion abrunden

Die neue Zertifikate-Sektion (`CertificatesSection.tsx`) hat aktuell vollflächige Bilder, die hart bis zum Rand gehen. Das passt nicht ganz zum verspielt-familiären Flair.

### Änderungen

In der Komponente `components/sections/CertificatesSection.tsx`:

1. **Bild-Container abrunden:**
   - Bild bekommt `rounded-3xl` (großzügig abgerundete Ecken, passt zum verspielten Stil)
   - `overflow-hidden` damit das Bild auch wirklich rund beschnitten ist
   - Dezenter Schatten: `shadow-xl` für etwas Tiefe

2. **Padding um das Bild herum:**
   - Damit das abgerundete Bild nicht direkt am Rand klebt: Container bekommt `p-6 md:p-10` Innenabstand
   - So „schwebt" das Bild visuell in der linken Hälfte

3. **Hintergrund der Bild-Hälfte:**
   - Die linke (bzw. bei Section 2 rechte) Hälfte bekommt einen sehr leichten farbigen Hintergrund:
     - Section 1 (Biomilch): `bg-mint-soft`
     - Section 2 (Nachhaltigkeit): `bg-mint-soft`
     - Section 3 (Hygiene): `bg-rot-soft`
   - Das gibt jeder Sektion einen subtilen Farbakzent, ohne aufdringlich zu sein

4. **Overlay anpassen:**
   - Das `bg-black/10` Overlay innerhalb des abgerundeten Bildes lassen, damit Konsistenz bleibt

### Beispiel-Struktur (für eine Section)

```tsx
<div className="w-full md:w-1/2 bg-mint-soft p-6 md:p-10 flex items-center justify-center">
  <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] rounded-3xl overflow-hidden shadow-xl will-change-transform">
    <Image
      src={imageSrc}
      alt={imageAlt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover"
    />
    <div className="absolute inset-0 bg-black/10" />
  </div>
</div>
```

### Animation bleibt erhalten

- Die GSAP-Slide-In-Animationen bleiben unverändert
- `will-change-transform` weiterhin auf dem animierten Element
- Auf Mobile wie gehabt: kein Scrub, einmalige Animation

---

## Aufgaben-Reihenfolge

1. Erst Teil A (Galerie-Daten + Komponenten-Update auf Homepage und `/galerie`).
2. Dann Teil B (Zertifikate-Bilder abrunden).
3. Server neu starten, prüfen dass keine TypeScript-Fehler oder Build-Warnings auftreten.
4. Kurze Zusammenfassung am Ende: Was wurde gemacht, gibt es Stellen wo Bilder noch nicht laden (z.B. wegen Unsplash-Hotlinking-Limits)?

### Hinweis zu Unsplash-Bildern

Falls Next.js das Laden externer Bilder blockt, muss in `next.config.js` (oder `.ts`) der Unsplash-Domain hinzugefügt werden:

```js
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
  ],
}
```

Falls noch nicht drin: bitte ergänzen.
