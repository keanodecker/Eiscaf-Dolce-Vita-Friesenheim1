import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Die Geschichte hinter dem Eiscafé Dolce Vita in Friesenheim — Familie, Bio-Milch und Leidenschaft fürs Eis.",
};

export default function UeberUnsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Über uns"
        title="Unsere Geschichte."
        intro="Vom kleinen Familienbetrieb zum festen Treffpunkt im Dorf — mit einem klaren Anspruch: das beste Eis, ehrlich gemacht."
      />
      <section className="bg-weiss pb-24 md:pb-32">
        <div className="container-page space-y-20">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-md">
            {/* PLATZHALTER - durch echtes Bild von Inhaber/Team/Laden ersetzen */}
            <Image
              src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=2000&q=80"
              alt="Innenraum eines gemütlichen Cafés"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="grid gap-10 md:grid-cols-3 md:gap-16">
            <h2 className="font-serif text-3xl leading-tight md:col-span-1 md:text-5xl">
              Familientradition trifft auf echte Leidenschaft.
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-schokolade/80 md:col-span-2 md:text-lg">
              {/* PLATZHALTER - vom Kunden mit echtem Text füllen */}
              <p>
                Bei uns dreht sich alles um eines: ein Eis, das schmeckt, wie Eis schmecken
                soll. Cremig, ehrlich, ohne Schnickschnack — und mit Zutaten, hinter denen
                wir voll und ganz stehen.
              </p>
              <p>
                Unsere Bio-Milch beziehen wir aus der Region rund um Friesenheim. Kurze
                Wege, frische Qualität und der respektvolle Umgang mit den Tieren sind uns
                wichtiger als jeder Industriestandard.
              </p>
              <p>
                Komm vorbei, lerne uns kennen — und probier dich durch unsere Sorten. Wir
                freuen uns auf dich.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
