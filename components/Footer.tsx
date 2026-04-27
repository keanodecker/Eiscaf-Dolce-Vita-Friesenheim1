import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export default function Footer() {
  return (
    <footer className="bg-creme-soft text-schokolade">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-serif text-3xl">{siteConfig.shortName}</p>
            <p className="mt-3 max-w-xs text-sm text-schokolade/70">
              {siteConfig.tagline}. Bio-Milch, regionale Zutaten, familiäre Atmosphäre.
            </p>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-schokolade/70 transition-colors hover:text-schokolade"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.54V9.84c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.45 2.91h-2.33V22c4.78-.75 8.44-4.91 8.44-9.93z" />
              </svg>
              Folge uns auf Facebook
            </a>
          </div>

          <div className="space-y-6">
            <div>
              <p className="eyebrow">Kontakt</p>
              <address className="mt-3 not-italic text-sm leading-relaxed">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.zip} {siteConfig.address.city}
                <br />
                <a
                  href={siteConfig.contact.phoneLink}
                  className="mt-1 inline-block transition-colors hover:text-schokolade/70"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
                <br />
                <a
                  href={siteConfig.contact.emailLink}
                  className="break-all transition-colors hover:text-schokolade/70"
                >
                  {siteConfig.contact.email}
                </a>
              </address>
            </div>
          </div>

          <div>
            <p className="eyebrow">Öffnungszeiten</p>
            <ul className="mt-3 space-y-1 text-sm">
              {siteConfig.openingHours.map((row) => (
                <li
                  key={row.day}
                  className={[
                    "flex justify-between gap-4",
                    row.closed ? "text-schokolade/40" : "",
                  ].join(" ")}
                >
                  <span className="text-schokolade/70">{row.day}</span>
                  <span>{row.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-schokolade/10 pt-6 text-xs text-schokolade/60 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/impressum" className="transition-colors hover:text-schokolade">
              Impressum
            </Link>
            <Link href="/datenschutz" className="transition-colors hover:text-schokolade">
              Datenschutz
            </Link>
            <span>
              Website by{" "}
              <a
                href={siteConfig.agency.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:underline"
              >
                {siteConfig.agency.name}
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
