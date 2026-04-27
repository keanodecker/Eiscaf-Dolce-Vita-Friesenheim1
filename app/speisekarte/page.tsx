import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Speisekarte",
  description: "Unsere Eissorten, Becher, Süßes und Getränke im Eiscafé Dolce Vita.",
};

// PLATZHALTER - vom Kunden mit echter Speisekarte füllen
const sections = [
  {
    title: "Gelato & Sorbetto",
    items: [
      { name: "Kugel Gelato", desc: "Klassische Sorten, hausgemacht.", price: "1,80 €" },
      { name: "Sorbetto", desc: "Vegan, mit echter Frucht.", price: "1,80 €" },
      { name: "Bambini-Becher", desc: "Kleine Portion für kleine Gäste.", price: "3,90 €" },
    ],
  },
  {
    title: "Eisbecher",
    items: [
      { name: "Coppa Italia", desc: "Drei Kugeln nach Wahl, Sahne, Soße.", price: "6,90 €" },
      { name: "Spaghetti-Eis", desc: "Der Klassiker, mit Erdbeersoße.", price: "7,50 €" },
      { name: "Affogato al Caffè", desc: "Vanille-Gelato mit heißem Espresso.", price: "5,50 €" },
    ],
  },
  {
    title: "Süßes",
    items: [
      { name: "Tiramisu", desc: "Hausgemacht, klassisch italienisch.", price: "4,50 €" },
      { name: "Kuchen des Tages", desc: "Wechselnd, frisch gebacken.", price: "ab 3,90 €" },
    ],
  },
  {
    title: "Getränke",
    items: [
      { name: "Espresso", desc: "Italienische Röstung.", price: "2,20 €" },
      { name: "Cappuccino", desc: "Mit Bio-Milch.", price: "3,20 €" },
      { name: "Milkshake", desc: "Erdbeere, Schokolade oder Vanille.", price: "4,50 €" },
    ],
  },
];

export default function SpeisekartePage() {
  return (
    <>
      <PageHeader
        eyebrow="Speisekarte"
        title="Unser Sortiment."
        intro="Eine Auswahl unserer Klassiker — saisonal ergänzt durch wechselnde Spezialitäten."
      />
      <section className="bg-weiss pb-24 md:pb-32">
        <div className="container-page space-y-16">
          {sections.map((sec) => (
            <div key={sec.title}>
              <h2 className="font-serif text-3xl text-schokolade md:text-5xl">{sec.title}</h2>
              <ul className="mt-8 divide-y divide-schokolade/10 border-t border-schokolade/10">
                {sec.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex flex-col gap-1 py-5 md:flex-row md:items-baseline md:justify-between md:gap-6"
                  >
                    <div>
                      <p className="font-serif text-xl">{item.name}</p>
                      <p className="text-sm text-schokolade/70">{item.desc}</p>
                    </div>
                    <p className="font-sans text-base text-schokolade/80">{item.price}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="text-xs text-schokolade/50">
            * Alle Preise inkl. MwSt. Änderungen vorbehalten.
          </p>
        </div>
      </section>
    </>
  );
}
