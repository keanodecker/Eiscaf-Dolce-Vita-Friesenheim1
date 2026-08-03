export type GalleryCategory = "eis" | "suesses" | "getraenke";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
}

// PLATZHALTER - alle Bilder sind Unsplash-Stockfotos und müssen
// vor Live-Gang durch echte Aufnahmen aus dem Eiscafé ersetzt werden.
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
  { id: "drink-8", src: "https://images.unsplash.com/photo-1541658016709-82535e94bc69", alt: "Italienischer Aperitif mit Orangenscheibe", category: "getraenke" },
  { id: "drink-9", src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87", alt: "Italienische Kaffeespezialität mit Latte Art", category: "getraenke" },
];

export const galleryFilters: { id: GalleryCategory; label: string; emoji: string }[] = [
  { id: "eis", label: "Eis", emoji: "🍦" },
  { id: "suesses", label: "Süßes", emoji: "🍰" },
  { id: "getraenke", label: "Getränke", emoji: "🥤" },
];
