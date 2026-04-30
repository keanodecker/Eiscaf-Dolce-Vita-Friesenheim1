import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import TodayBadge from "@/components/TodayBadge";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Kontakt",
  description: `Adresse, Telefon, WhatsApp und Öffnungszeiten des ${siteConfig.name} in ${siteConfig.address.city}.`,
};

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="So erreichst du uns."
        intro="Reservierungen, Anfragen oder einfach Hallo sagen — ruf an, schreib uns auf WhatsApp oder per E-Mail. Wir antworten so schnell wir können."
      />
      <section className="bg-weiss pb-24 md:pb-32">
        <div className="container-page grid gap-14 md:grid-cols-2 md:gap-20">
          <div>
            <TodayBadge />

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="eyebrow">Adresse</p>
                <address className="mt-2 not-italic text-base leading-relaxed">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.zip} {siteConfig.address.city}
                </address>
              </div>
              <div>
                <p className="eyebrow">Telefon</p>
                <p className="mt-2 text-base">
                  <a href={siteConfig.contact.phoneLink} className="hover:text-schokolade/70">
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </p>
              </div>
              <div>
                <p className="eyebrow">WhatsApp</p>
                <p className="mt-2 text-base">
                  <a
                    href={siteConfig.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-schokolade/70"
                  >
                    Chat starten
                  </a>
                </p>
              </div>
              <div>
                <p className="eyebrow">E-Mail</p>
                <p className="mt-2 break-all text-base">
                  <a href={siteConfig.contact.emailLink} className="hover:text-schokolade/70">
                    {siteConfig.contact.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Schnell-Buttons */}
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-soft-out hover:scale-[1.03] hover:bg-[#1ebd5b]"
              >
                Auf WhatsApp schreiben
              </a>
            </div>

            {/* Öffnungszeiten */}
            <div className="mt-12">
              <p className="eyebrow">Öffnungszeiten</p>
              <ul className="mt-4 divide-y divide-schokolade/10 border-t border-schokolade/10">
                {siteConfig.openingHours.map((row) => (
                  <li
                    key={row.day}
                    className={[
                      "flex items-center justify-between py-3 text-sm",
                      row.closed ? "text-rose-500/80" : "",
                    ].join(" ")}
                  >
                    <span className={row.closed ? "" : "text-schokolade/80"}>{row.day}</span>
                    <span className={row.closed ? "font-medium" : ""}>{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontaktformular */}
            <form className="mt-14 space-y-5">
              <p className="eyebrow">Oder schreib uns hier</p>
              {/* PLATZHALTER - Formular-Backend (z.B. Resend, Formspree, Mail-Action) anbinden */}
              <div>
                <label htmlFor="name" className="block text-xs font-medium uppercase tracking-wider text-schokolade/70">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-2 w-full rounded-full border border-schokolade/15 bg-white px-5 py-3 text-sm focus:border-schokolade focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider text-schokolade/70">
                  E-Mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-full border border-schokolade/15 bg-white px-5 py-3 text-sm focus:border-schokolade focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wider text-schokolade/70">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-2 w-full rounded-3xl border border-schokolade/15 bg-white px-5 py-4 text-sm focus:border-schokolade focus:outline-none"
                />
              </div>
              <p className="text-xs text-schokolade/50">
                Hinweis: Das Formular ist aktuell statisch und muss noch ans CMS / einen
                Mailservice (z.B. Resend, Formspree) angebunden werden.
              </p>
              <button type="submit" className="btn-primary">
                Nachricht senden <span aria-hidden="true">→</span>
              </button>
            </form>
          </div>

          <div className="space-y-6 md:sticky md:top-28 md:self-start">
            <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-md md:h-[560px]">
              <iframe
                title="Google Maps – Eiscafé Dolce Vita"
                src={siteConfig.mapsEmbedSrc}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <a
              href={siteConfig.rating.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost w-full justify-center"
            >
              Route in Google Maps öffnen <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
