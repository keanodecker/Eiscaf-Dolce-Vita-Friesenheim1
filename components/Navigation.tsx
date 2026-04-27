"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-soft-out",
          scrolled
            ? "bg-weiss/80 backdrop-blur-md shadow-[0_1px_0_0_rgba(74,44,42,0.08)]"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="container-page flex items-center justify-between py-5">
          <Link
            href="/"
            className="font-serif text-2xl tracking-tight text-schokolade md:text-3xl"
            aria-label={siteConfig.name}
          >
            {siteConfig.shortName}
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-sans text-sm text-schokolade/80 transition-colors hover:text-schokolade"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-schokolade/60 transition-colors hover:text-schokolade"
            >
              <FacebookIcon />
            </a>
          </nav>

          <button
            type="button"
            aria-label="Menü öffnen"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-[60] flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span
              className={[
                "absolute h-0.5 w-6 bg-schokolade transition-all duration-300 ease-soft-out",
                open ? "rotate-45" : "-translate-y-2",
              ].join(" ")}
            />
            <span
              className={[
                "absolute h-0.5 w-6 bg-schokolade transition-all duration-300 ease-soft-out",
                open ? "opacity-0" : "opacity-100",
              ].join(" ")}
            />
            <span
              className={[
                "absolute h-0.5 w-6 bg-schokolade transition-all duration-300 ease-soft-out",
                open ? "-rotate-45" : "translate-y-2",
              ].join(" ")}
            />
          </button>
        </div>
      </header>

      <div
        className={[
          "fixed inset-0 z-40 bg-weiss transition-all duration-500 ease-soft-out md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8 px-6">
          {siteConfig.nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-serif text-4xl text-schokolade transition-transform duration-500 ease-soft-out"
              style={{
                transitionDelay: open ? `${100 + i * 60}ms` : "0ms",
                transform: open ? "translateY(0)" : "translateY(20px)",
                opacity: open ? 1 : 0,
              }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-schokolade/70"
          >
            <FacebookIcon /> Facebook
          </a>
        </div>
      </div>
    </>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.54V9.84c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.45 2.91h-2.33V22c4.78-.75 8.44-4.91 8.44-9.93z" />
    </svg>
  );
}
