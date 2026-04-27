# Prompt 6: Galerie vereinfachen – 5 Bilder pro Kategorie, kein Pin-Effekt

Die aktuelle Galerie-Vorschau auf der Homepage soll **vereinfacht** werden:
- **Kein Pin-Scroll**, kein horizontales Mit-Scrollen
- Pro Kategorie werden **5 Bilder** angezeigt
- Filter-Pills bleiben (🍦 Eis | 🍰 Süßes | 🥤 Getränke)
- Beim Klick auf einen Filter wechseln die Bilder smooth (GSAP fade/stagger)
- Nutzer scrollt einfach an der Sektion vorbei zur nächsten

---

## Aufgaben

### 1. Pin-Scroll komplett entfernen

In der Galerie-Komponente (`PinnedGallerySection.tsx` oder wie sie aktuell heißt):
- Alle ScrollTrigger-Pin-Logik entfernen
- Alle horizontalen Track-Animationen entfernen
- Komponente ggf. umbenennen zu `GalleryPreviewSection.tsx`

### 2. Datenquelle anpassen

In `data/galleryImages.ts`:
- Behalte alle Bilder drin (für die `/galerie`-Unterseite werden weiterhin alle 9 pro Kategorie genutzt)
- Auf der Homepage werden per `.slice(0, 5)` nur die ersten 5 Bilder pro Kategorie angezeigt

### 3. Neues Layout der Galerie-Sektion auf der Homepage

```
┌─────────────────────────────────────────────┐
│           GALERIE VORSCHAU                  │   (kleines Badge)
│                                             │
│              Einblicke                      │   (große Headline)
│                                             │
│   [🍦 Eis]  [🍰 Süßes]  [🥤 Getränke]       │   (Filter-Pills)
│                                             │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐         │
│  │ 1  │ │ 2  │ │ 3  │ │ 4  │ │ 5  │         │   (5 Bilder im Grid)
│  └────┘ └────┘ └────┘ └────┘ └────┘         │
│                                             │
│       [ Zur kompletten Galerie → ]          │
└─────────────────────────────────────────────┘
```

### 4. Konkrete Layout-Anforderungen

**Bilder-Grid:**
- Desktop (`md:` und größer): **5 Spalten nebeneinander** (`grid-cols-5`)
- Tablet (`sm:` bis `md:`): **3 Spalten** (`grid-cols-3`)
- Mobile (`< sm`): **2 Spalten** (`grid-cols-2`)
- Gap: `gap-4 md:gap-6`

**Bild-Styling:**
- `aspect-[4/5]` (Hochformat – wirkt frischer für Food-Fotos)
- `rounded-2xl overflow-hidden`
- Dezenter Schatten: `shadow-md hover:shadow-xl transition-shadow duration-300`
- Hover: leichter Scale-Effekt `hover:scale-[1.03] transition-transform duration-300`
- Bilder mit `next/image`, `fill`, `object-cover`, sinnvolles `sizes`-Attribut

**Container der Sektion:**
- Padding: `py-20 md:py-28 px-6 md:px-12`
- Hintergrund: `bg-weiss`
- Maximale Breite des Inhalts: `max-w-7xl mx-auto`

### 5. Filter-Verhalten

- Aktiver Filter: `bg-mint text-weiss` (kräftiges Mint, weißer Text)
- Inaktive Filter: `bg-weiss border border-schokolade/20 text-schokolade hover:bg-mint-soft`
- Beim Klick auf Filter:
  - State `activeCategory` ändert sich
  - Bilder fade-out (kurz, 0.2s)
  - Neue 5 Bilder werden gerendert
  - Bilder fade-in mit kleinem Stagger (jedes Bild 0.06s versetzt)
  - GSAP wird genutzt für smoothe Übergänge

### 6. Initial-Animation (Scroll-Reveal)

Beim ersten Scrollen in die Sektion:
- Headline + Pills fade-in von unten
- Bilder erscheinen mit Stagger (jedes Bild 0.08s versetzt, fade + slide-up)
- Trigger: `start: "top 75%"`, einmalig (`once: true`)
- Auf Mobile: gleiche Animation, etwas später getriggert

Verwende `useGSAP` Hook und `gsap.context()` für sauberes Cleanup.

### 7. CTA-Button unten

- Text: "Zur kompletten Galerie →"
- Pill-Style mit Border-Outline (kein gefüllter Button), passend zu den anderen CTAs der Seite
- Link: `/galerie`
- Zentriert, mit `mt-12` Abstand zum Bilder-Grid

---

## Bekannte Stolperfallen

1. **Alte ScrollTrigger-Instanzen:** Beim Entfernen der Pin-Logik unbedingt darauf achten, dass keine alten `ScrollTrigger.create()` Calls oder Pin-Reste übrig bleiben. Sauberer Cleanup über `gsap.context().revert()`.

2. **Filter-Reset:** Bei Filterwechsel sicherstellen, dass keine alten Animations-States hängen bleiben (z.B. `opacity: 0` von vorher). Notfalls `gsap.set(images, { clearProps: "all" })` vor neuer Animation.

3. **Mobile-Layout testen:** Bei 2 Spalten und 5 Bildern haben wir 2/2/1-Layout (letztes Bild allein in der Reihe). Falls das visuell stört, alternativ 4 Bilder auf Mobile zeigen mit `.slice(0, isMobile ? 4 : 5)` – aber erst probieren wie's mit 5 aussieht.

---

## Reihenfolge

1. Pin-Scroll-Logik entfernen
2. Neue einfache Komponente bauen (Grid-Layout)
3. Filter-Wechsel mit GSAP implementieren
4. Initial-Reveal-Animation hinzufügen
5. Lokal testen (Desktop + Mobile-View per DevTools)
6. `git add .`, `git commit -m "Refactor: Galerie als Grid mit 5 Bildern pro Kategorie"`, `git push`
7. Kurz Bescheid geben, dass es gepusht ist
