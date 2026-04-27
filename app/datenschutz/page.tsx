import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung des Eiscafé Dolce Vita in Friesenheim.",
};

export default function DatenschutzPage() {
  return (
    <>
      <PageHeader eyebrow="Pflichtangabe" title="Datenschutzerklärung" />
      <section className="bg-weiss pb-24 md:pb-32">
        <div className="container-page max-w-3xl space-y-10 text-sm leading-relaxed text-schokolade/80">
          <div className="rounded-2xl border border-amber-300/40 bg-amber-50 p-5 text-amber-900">
            <p className="text-xs font-medium uppercase tracking-wider">Hinweis</p>
            <p className="mt-2 text-sm">
              Diese Datenschutzerklärung ist ein Platzhalter und muss vor dem Live-Gang
              vom Kunden geprüft (idealerweise durch einen Anwalt oder einen Generator
              wie eRecht24) und um konkrete Tools/Hoster ergänzt werden.
            </p>
          </div>
          {/* PLATZHALTER - Vollständige Datenschutzerklärung einfügen (z.B. via eRecht24) */}
          <div>
            <h2 className="font-serif text-2xl text-schokolade">1. Datenschutz auf einen Blick</h2>
            <p className="mt-4">
              Diese Datenschutzerklärung klärt Sie über Art, Umfang und Zweck der
              Verarbeitung personenbezogener Daten auf dieser Website auf. [Platzhalter —
              vollständigen Text einfügen.]
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-schokolade">2. Verantwortlicher</h2>
            <p className="mt-4">
              Verantwortlich für die Datenverarbeitung auf dieser Website ist der Betreiber
              des Eiscafé Dolce Vita. [Platzhalter — Anschrift, Telefon, E-Mail.]
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-schokolade">3. Hosting & Auftragsverarbeitung</h2>
            <p className="mt-4">
              Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die
              personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf
              den Servern des Hosters gespeichert. [Platzhalter — Hoster nennen, AVV.]
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-schokolade">4. Google Maps</h2>
            <p className="mt-4">
              Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google
              Ireland Limited. [Platzhalter — vollständigen Hinweis einfügen.]
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-schokolade">5. Ihre Rechte</h2>
            <p className="mt-4">
              Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung und
              Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. [Platzhalter —
              vollständige Rechte aufführen.]
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
