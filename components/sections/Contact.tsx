"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/siteConfig";
import TodayBadge from "@/components/TodayBadge";

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-contact-text] > *", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
        },
      });

      gsap.from("[data-contact-map]", {
        x: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="kontakt" className="bg-creme-soft py-24 md:py-32">
      <div className="container-page grid gap-12 md:grid-cols-2 md:gap-20">
        <div data-contact-text>
          <p className="eyebrow">Buon Appetito</p>
          <h2 className="mt-4 font-serif text-5xl leading-tight md:text-7xl">
            Komm vorbei!
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-schokolade/80">
            Wir freuen uns auf deinen Besuch im Eiscafé Dolce Vita in Friesenheim.
          </p>

          <div className="mt-6">
            <TodayBadge />
          </div>

          {/* Adresse */}
          <div className="mt-10">
            <p className="eyebrow">Adresse</p>
            <address className="mt-3 not-italic text-base leading-relaxed">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.zip} {siteConfig.address.city}
            </address>
          </div>

          {/* Kontakt-Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={siteConfig.contact.phoneLink}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-schokolade px-5 py-3.5 text-sm font-medium text-weiss shadow-sm transition-all duration-300 ease-soft-out hover:scale-[1.02] hover:bg-schokolade/90 sm:flex-none"
              aria-label={`Anrufen: ${siteConfig.contact.phoneDisplay}`}
            >
              <PhoneIcon /> Anrufen
            </a>
            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-soft-out hover:scale-[1.02] hover:bg-[#1ebd5b] sm:flex-none"
              aria-label="WhatsApp-Chat öffnen"
            >
              <WhatsAppIcon /> WhatsApp
            </a>
            <a
              href={siteConfig.contact.emailLink}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-schokolade/20 bg-white/60 px-5 py-3.5 text-sm font-medium text-schokolade backdrop-blur-md transition-all duration-300 ease-soft-out hover:scale-[1.02] hover:bg-white sm:flex-none"
              aria-label={`E-Mail an ${siteConfig.contact.email}`}
            >
              <MailIcon /> E-Mail
            </a>
          </div>

          {/* Öffnungszeiten-Tabelle */}
          <div className="mt-10">
            <p className="eyebrow">Öffnungszeiten</p>
            <ul className="mt-4 divide-y divide-schokolade/10 border-t border-schokolade/10">
              {siteConfig.openingHours.map((row) => (
                <li
                  key={row.day}
                  className={[
                    "flex items-center justify-between py-2.5 text-sm",
                    row.closed ? "text-rose-500/80" : "text-schokolade",
                  ].join(" ")}
                >
                  <span className={row.closed ? "" : "text-schokolade/80"}>{row.day}</span>
                  <span className={row.closed ? "font-medium" : ""}>{row.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={siteConfig.rating.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-10"
          >
            Route in Google Maps öffnen <span aria-hidden="true">→</span>
          </a>
        </div>

        <div
          data-contact-map
          className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-lg md:sticky md:top-28 md:h-[640px]"
        >
          <iframe
            title="Google Maps – Standort Eiscafé Dolce Vita"
            src={siteConfig.mapsEmbedSrc}
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  );
}
