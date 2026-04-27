import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum gemäß § 5 TMG für das ${siteConfig.name} in ${siteConfig.address.city}.`,
};

export default function ImpressumPage() {
  return (
    <>
      <PageHeader eyebrow="Pflichtangabe" title="Impressum" />
      <section className="bg-weiss pb-24 md:pb-32">
        <div className="container-page max-w-3xl space-y-10 text-sm leading-relaxed text-schokolade/80">
          <div>
            <h2 className="font-serif text-2xl text-schokolade">Angaben gemäß § 5 TMG</h2>
            <p className="mt-4">
              {siteConfig.name}
              <br />
              {siteConfig.address.street}
              <br />
              {siteConfig.address.zip} {siteConfig.address.city}
              <br />
              {siteConfig.address.country}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-schokolade">Kontakt</h2>
            <p className="mt-4">
              Telefon:{" "}
              <a href={siteConfig.contact.phoneLink} className="underline-offset-4 hover:underline">
                {siteConfig.contact.phoneDisplay}
              </a>
              <br />
              E-Mail:{" "}
              <a href={siteConfig.contact.emailLink} className="break-all underline-offset-4 hover:underline">
                {siteConfig.contact.email}
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-schokolade">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            {/* PLATZHALTER - vom Kunden mit echtem Inhaber-Namen füllen */}
            <p className="mt-4">[Inhaber-Name]</p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-schokolade">Umsatzsteuer-ID / Handelsregister</h2>
            {/* PLATZHALTER - USt-ID, Handelsregister-Eintrag etc. ergänzen, sobald vom Kunden bekannt */}
            <p className="mt-4 text-schokolade/60">
              Umsatzsteuer-ID, Handelsregister-Eintrag etc. – ergänzen, sobald vom Kunden
              bekannt.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-schokolade">EU-Streitschlichtung</h2>
            <p className="mt-4">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung
              (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:underline"
              >
                ec.europa.eu/consumers/odr
              </a>
              .<br />
              Unsere E-Mail-Adresse findest du oben im Impressum.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-schokolade">
              Verbraucherstreitbeilegung
            </h2>
            <p className="mt-4">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
              einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

          <div className="border-t border-schokolade/10 pt-6 text-xs text-schokolade/60">
            Website by{" "}
            <a
              href={siteConfig.agency.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              {siteConfig.agency.name}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
