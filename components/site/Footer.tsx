"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "./Logo";
import { FOOTER } from "@/lib/nav";
import { openCookieSettings } from "./CookieConsent";

const AWARDS = [
  { src: "/awards/Benzinga.svg", alt: "Global FinTech Awards 2021 winner, Benzinga" },
  { src: "/awards/Swiss.svg", alt: "WealthBriefing Swiss Awards 2023 winner, Most Promising New Entrant" },
  { src: "/awards/TFA.svg", alt: "Tokyo Financial Award 2023 winner, Financial Innovation" },
  { src: "/awards/Singapore.svg", alt: "Global FinTech Hackcelerator 2023 winner, Singapore FinTech Festival" },
  { src: "/awards/US.svg", alt: "US FinTech Awards 2023 winner, Investment Tech of the Year" },
  { src: "/awards/FinSum.svg", alt: "Fin/Sum Impact Pitch 2024 NIKKEI Award, Grand Prize" },
];

const SOCIAL = [
  {
    label: "Reflexivity on X",
    href: "https://x.com/ReflexivityAi",
    icon: <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3zm-1.08 16.17h1.7L7.4 4.74H5.57l11.1 14.43z" fill="currentColor" />,
  },
  {
    label: "Reflexivity on LinkedIn",
    href: "https://www.linkedin.com/company/reflexivityai/",
    icon: <path d="M4.98 3.5a2.5 2.5 0 11-.01 5 2.5 2.5 0 01.01-5zM3 9.75h4v11.5H3V9.75zm6.5 0h3.83v1.57h.06c.53-1.01 1.84-2.07 3.79-2.07 4.05 0 4.8 2.67 4.8 6.13v5.87h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75v5.29h-4V9.75z" fill="currentColor" />,
  },
];

function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-3 ${className ?? ""}`}>
      {SOCIAL.map((s) => (
        <li key={s.href}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-[#fefefe]/80 transition-colors hover:border-white/40 hover:text-[#fefefe]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">{s.icon}</svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer id="newsletter" data-tone="dark" className="relative bg-chrome-panel text-[#fefefe]">
      <div className="container-x">
        {/* Newsletter (kept distinct from the demo request) */}
        <div className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between md:py-[42px]">
          <div>
            <p className="font-display text-[16px] font-medium text-[#b7b6b2]">Never miss an update</p>
            <p className="mt-2 max-w-[220px] font-serif text-[16px] leading-[27px] text-[#8e908c] md:max-w-[200px]">
              Sign up to our newsletter to receive the latest news.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="h-px w-full bg-white/[0.14]" />

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 pb-12 pt-[68px] sm:grid-cols-3 lg:grid-cols-[208px_repeat(5,1fr)] lg:gap-y-0 lg:pb-16">
          <div className="col-span-2 flex flex-col justify-between sm:col-span-3 lg:col-span-1 lg:row-span-1">
            <div>
              <Link href="/" aria-label="Reflexivity home" className="block w-fit text-[#fefefe]">
                <Logo size="sm" />
              </Link>
              <SocialLinks className="mt-6" />
            </div>
            <p className="mt-6 hidden font-serif text-[16px] leading-[27px] text-[#6e7176] lg:block">
              © 2026 Reflexivity.
              <br />
              All rights reserved.
            </p>
          </div>

          {FOOTER.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="font-display text-[16px] font-medium text-[#8e908c]">{col.title}</p>
              <ul className="mt-[18px] flex flex-col gap-[13px]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.cookie ? (
                      <button type="button" onClick={openCookieSettings} className="link-underline font-display text-[16px] font-medium text-[#fefefe]">
                        {l.label}
                      </button>
                    ) : l.external ? (
                      <a href={l.href} className="link-underline font-display text-[16px] font-medium text-[#fefefe]">
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className="link-underline font-display text-[16px] font-medium text-[#fefefe]">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <p className="col-span-2 font-serif text-[16px] leading-[27px] text-[#6e7176] sm:col-span-3 lg:hidden">
            © 2026 Reflexivity. All rights reserved.
          </p>
        </div>

        {/* Awards — same six badges as the live reflexivity.com footer */}
        <div className="border-t border-white/[0.14] py-10 md:py-12">
          <ul aria-label="Awards" className="grid grid-cols-3 items-center gap-x-6 gap-y-8 sm:grid-cols-6 lg:gap-x-10">
            {AWARDS.map((a) => (
              <li key={a.src} className="flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.src} alt={a.alt} width={95} height={125} loading="lazy" className="h-[84px] w-auto opacity-80 md:h-[104px]" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setState(valid ? "done" : "error");
      }}
      className={compact ? "w-full" : "w-full md:w-auto"}
      aria-label="Newsletter signup"
    >
      <AnimatePresence mode="wait" initial={false}>
        {state === "done" ? (
          <motion.p
            key="done"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex h-[41px] items-center gap-2 font-display text-[16px] font-medium text-[#f4f3f1]"
            role="status"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4 text-pine-300" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M3 8.5l3 3 7-7" />
            </svg>
            You&rsquo;re subscribed. Look out for the next issue.
          </motion.p>
        ) : (
          <motion.div key="form" className="flex flex-col gap-2">
            <div className="flex gap-3">
              <label htmlFor={compact ? "nl-email-c" : "nl-email"} className="sr-only">
                Work email
              </label>
              <input
                id={compact ? "nl-email-c" : "nl-email"}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error") setState("idle");
                }}
                aria-invalid={state === "error"}
                aria-describedby={state === "error" ? "nl-err" : undefined}
                className="h-[41px] w-full min-w-0 border border-white/20 bg-[#2b2d2d] px-[14px] font-['Geist',var(--font-sans)] text-[14px] text-[#f4f3f1] placeholder:text-[#b7b6b2]/70 focus:border-white/50 focus:outline-none md:w-[299px]"
              />
              <button
                type="submit"
                className="h-[41px] shrink-0 bg-[#f4f3f1] px-5 font-display text-[16px] font-medium text-[#09090b] transition-colors hover:bg-[#dcdad5]"
              >
                Subscribe
              </button>
            </div>
            {state === "error" && (
              <p id="nl-err" className="text-[13px] text-[#e7a59a]" role="alert">
                Enter a valid email address.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
