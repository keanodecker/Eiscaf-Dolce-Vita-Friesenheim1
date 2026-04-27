# Prompt 5: Pin-Scroll-Galerie auf der Homepage

Die aktuelle Galerie-Vorschau auf der Homepage (horizontal scrollbarer Container mit Filter-Pills) soll **komplett ersetzt** werden durch einen Pin-Scroll-Effekt mit GSAP.

---

## Konzept

Wenn der Nutzer beim Scrollen die Galerie-Sektion erreicht, "klebt" die Sektion am Bildschirm fest (pinned). Während der Nutzer weiter scrollt, scrollen die Bilder horizontal durch die sichtbare Fläche. Sobald alle 9 Bilder der aktiven Kategorie durchgescrollt sind, wird die Sektion entpinnt und die Seite scrollt normal weiter zur nächsten Sektion.

Der Filter (🍦 Eis | 🍰 Süßes | 🥤 Getränke) bleibt erhalten und ist während des Pin-Scrolls sichtbar/anklickbar. Beim Klick auf einen anderen Filter:
- Bilder werden ausgewechselt (smooth GSAP-Transition)
- Pin-Scroll-Position resettet auf den Anfang
- Nutzer kann erneut durch die neuen Bilder horizontal scrollen

---

## Stack & Komponente

**Datei:** `components/sections/PinnedGallerySection.tsx` (neue Komponente, alte Galerie-Komponente entfernen)

**Anforderungen:**
- Next.js App Router, TypeScript, Tailwind CSS v4
- GSAP + ScrollTrigger
- `"use client"` Direktive
- `useGSAP` Hook von `@gsap/react`
- Datenquelle: `data/galleryImages.ts` (existiert bereits)

---

## Layout

### Sektion-Struktur

```
┌─────────────────────────────────────────────┐
│  GALERIE VORSCHAU                           │   ← Badge oben, klein, uppercase
│                                             │
│              Einblicke                      │   ← große Headline (Fraunces)
│                                             │
│       [🍦 Eis]  [🍰 Süßes]  [🥤 Getränke]   │   ← Filter-Pills (sticky während Pin)
│                                             │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐                │
│  │ 1  │ │ 2  │ │ 3  │ │ 4  │  → → →         │   ← horizontaler Track
│  └────┘ └────┘ └────┘ └────┘                │      (3-4 Bilder sichtbar)
│                                             │
│           ─────────●────────                │   ← Progress-Bar (optional)
└─────────────────────────────────────────────┘
```

### Maße

- Sektion: `h-screen` (volle Viewport-Höhe wenn gepinnt)
- Bilder: ca. **22-25vw breit** auf Desktop (3-4 sichtbar gleichzeitig), `aspect-[4/5]`
- Mobile (`< 768px`): Bilder ca. **70vw breit** (1-1.5 sichtbar gleichzeitig)
- Gap zwischen Bildern: `gap-6 md:gap-8`
- Bild-Styling: `rounded-3xl overflow-hidden shadow-lg`

### Visuelle Details

- Hintergrund der Sektion: `bg-weiss` (weiß)
- Headline und Pills bleiben **oben sichtbar** während des Pin-Scrolls (nicht mitscrollend)
- Bilder haben dezenten Hover-Effekt: `hover:scale-105 transition-transform`
- Padding um den horizontalen Track: links/rechts `px-8 md:px-16`

---

## GSAP Pin-Scroll Implementierung

### Kern-Logik (Desktop)

```ts
// Beispielhafte Struktur, bitte sauber implementieren

useGSAP(() => {
  const ctx = gsap.context(() => {
    const track = trackRef.current;          // horizontaler Container der Bilder
    const section = sectionRef.current;       // ganze Sektion
    if (!track || !section) return;

    // Berechne wie weit horizontal gescrollt werden muss
    const scrollDistance = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${scrollDistance}`,   // Pin-Dauer = horizontale Distanz
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }, sectionRef);

  return () => ctx.revert();
}, [activeCategory]);   // Re-run wenn Filter wechselt!
```

### Wichtige Details

1. **Re-Initialisierung bei Filterwechsel:** `useGSAP` muss als Dependency `[activeCategory]` haben, damit beim Filterwechsel die Bilder-Breite und Scroll-Distanz neu berechnet werden. Vorher: `ctx.revert()` ausführen.

2. **`ScrollTrigger.refresh()` aufrufen** nach Filterwechsel, damit der Trigger die neuen Maße kennt.

3. **`invalidateOnRefresh: true`** sorgt dafür, dass bei Window-Resize die Werte neu berechnet werden.

4. **Filter-Pills positionieren:** Damit sie während des Pin-Scrolls sichtbar bleiben:
   - Headline + Pills in einem Container `position: sticky; top: 5vh` oder als absolut positioniertes Overlay innerhalb der gepinnten Sektion
   - Z-Index hoch genug, dass sie über den Bildern liegen
   - Hintergrund `bg-weiss/95 backdrop-blur-sm` damit sie sich abheben

### Mobile Verhalten (`< 768px`)

Auf Mobile ist Pin-Scroll oft holprig und schlecht für UX. Stattdessen:

- Standard horizontal scrollbarer Container mit `overflow-x-auto`
- `scroll-snap-type: x mandatory` und `scroll-snap-align: start` auf Bildern
- Filter-Pills oben, Bilder darunter zum manuellen Wischen
- **Kein Pin, kein ScrollTrigger** auf Mobile

Verwende `gsap.matchMedia()` für saubere Trennung:

```ts
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
  // Pin-Scroll Logik
});

mm.add("(max-width: 767px)", () => {
  // Auf Mobile keine Animation, nur natives Scrollen
});
```

### Accessibility

- `prefers-reduced-motion: reduce` prüfen → wenn aktiv, kein Pin-Scroll, einfacher horizontaler Container mit Scroll
- Tastatur-Navigation: Bilder sollten per Tab erreichbar sein
- Alt-Texte aller Bilder beibehalten

---

## Filter-Verhalten

1. **Aktiver Filter:** Mint-Hintergrund (`bg-mint`), weißer Text
2. **Inaktive Filter:** Weißer Hintergrund mit Border, dunkler Text
3. **Klick auf Filter:**
   - State `activeCategory` ändert sich
   - Bilder fade-out (kurz, 0.3s)
   - Neue Bilder werden gerendert (aus `galleryImages.filter(...)`)
   - GSAP-Animation neu initialisiert (über `useGSAP` dependency)
   - ScrollTrigger refresht
   - Track scrollt zurück zum Anfang (`x: 0`)
   - Bilder fade-in mit Stagger

4. **Hochscrollen + Filterwechsel:** Wenn der Nutzer die Sektion bereits durchgescrollt hat und wieder hochscrollt, soll der Pin-Scroll-Effekt erneut funktionieren mit den neuen Bildern. Das ergibt sich automatisch aus der korrekten Re-Initialisierung.

---

## Optionale Polish-Elemente

- **Progress-Bar:** Dünner mint-farbener Balken am unteren Rand der Sektion, der den horizontalen Scroll-Fortschritt anzeigt (0% bis 100%)
- **Bildnummer-Anzeige:** Klein oben rechts, z.B. "3 / 9"
- **Smooth Transitions:** Beim Filterwechsel kein hartes Cut, sondern weicher Übergang

---

## Was entfernt werden muss

- Die alte Galerie-Vorschau-Komponente (horizontal-scroll mit Drag) wird komplett ersetzt
- Alle alten Imports und State-Variablen, die nicht mehr gebraucht werden, entfernen
- Datenquelle `data/galleryImages.ts` bleibt unverändert

---

## Aufgaben-Reihenfolge

1. Neue Komponente `PinnedGallerySection.tsx` erstellen
2. In Homepage (`app/page.tsx` o.ä.) die alte Galerie-Komponente durch die neue ersetzen
3. Lokal testen: 
   - Desktop bei 1920px, 1440px, 1280px Breite
   - Mobile-View bei 375px (iPhone) und 768px (Tablet)
   - Filterwechsel und erneuter Scroll-Durchlauf
4. Falls die `/galerie`-Unterseite noch existiert, dort den **alten** horizontal-scrollbaren Stil beibehalten (nur Homepage bekommt den Pin-Scroll)
5. Nach dem Fix: `git add .`, `git commit -m "Feat: Pin-Scroll-Galerie auf Homepage"` und `git push` ausführen
6. Mir kurz zusammenfassen: Was wurde geändert, gibt es bekannte Edge Cases?

---

## Bekannte Stolperfallen, auf die geachtet werden muss

1. **Pin-Scroll + Lenis Smooth Scroll:** Falls Lenis aktiv ist, muss ScrollTrigger mit Lenis verbunden werden via `lenis.on('scroll', ScrollTrigger.update)`. Falls schon konfiguriert: prüfen, ob es noch funktioniert.

2. **Layout-Shift beim Pin:** Wenn das Pin "anspringt", gibt es manchmal einen visuellen Sprung. Lösung: `anticipatePin: 1` in der ScrollTrigger-Config.

3. **Bilder breiter als gedacht:** Wenn der horizontale Track nicht breit genug ist, gibt's keinen Scroll. Sicherstellen, dass `track.scrollWidth > window.innerWidth` gilt – sonst Pin-Logik überspringen oder andere Visualisierung nutzen.

4. **Re-Run bei Filterwechsel:** Wenn `useGSAP` nicht korrekt mit `[activeCategory]` als Dependency läuft, hängen alte Animations-Instanzen rum und überlappen sich. Cleanup ist kritisch.
