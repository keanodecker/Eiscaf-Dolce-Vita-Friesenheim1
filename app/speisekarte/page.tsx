import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Speisekarte",
  description: "Unsere Eissorten, Becher, Süßes und Getränke im Eiscafé Dolce Vita.",
};

export default function SpeisekartePage() {
  return (
    <>
      <PageHeader
        eyebrow="Speisekarte"
        title="ERINNERUNG: Speisekarte vom Handy einfügen"
        intro="Die Speisekarte ist bereits als Bilder auf dem Handy heruntergeladen und muss hier noch eingefügt werden."
      />
      <section className="bg-weiss pb-24 md:pb-32">
        <div className="container-page">
          <p className="text-xs text-schokolade/50">
            * Inhalt folgt.
          </p>
        </div>
      </section>
    </>
  );
}
