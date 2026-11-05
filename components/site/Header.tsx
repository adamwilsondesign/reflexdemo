"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import { Logo } from "./Logo";
import { APP_URL, NAV, type NavGroup } from "@/lib/nav";

type Tone = "dark" | "light";
const EASE = [0.16, 1, 0.3, 1] as const;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 10 6"
      className={clsx("ml-[6px] h-[6px] w-[10px] transition-transform duration-300 ease-[var(--ease-out-expo)]", open && "rotate-180")}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path d="M1 1l4 4 4-4" />
    </svg>
  );
}

/** Reads the tone of the section directly under the header and inverts the nav, as in the Framer build. */
function useHeaderTone(headerRef: React.RefObject<HTMLElement | null>) {
  const [tone, setTone] = useState<Tone>("dark");
  const pathname = usePathname();
  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const h = headerRef.current?.getBoundingClientRect().bottom ?? 104;
      const els = document.elementsFromPoint(window.innerWidth / 2, h + 2);
      const sec = els.find((el) => (el as HTMLElement).closest?.("[data-tone]"));
      const t = (sec as HTMLElement | undefined)?.closest<HTMLElement>("[data-tone]")?.dataset.tone;
      // Paper / light sections -> dark nav.  Coloured / dark sections -> light nav.
      setTone(t === "dark" ? "light" : "dark");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    const t = setTimeout(read, 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [headerRef, pathname]);
  return tone;
}

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const toneFromScroll = useHeaderTone(headerRef);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Any open menu forces the dark chrome (matches Framer).
  const tone: Tone = open || mobileOpen ? "dark" : toneFromScroll;
  const dark = tone === "dark";

  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (mobileOpen) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const enter = useCallback((label: string | null) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  }, []);
  const leave = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  }, []);

  const activeGroup = NAV.find((g) => g.label === open && g.columns);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50"
      onMouseLeave={leave}
    >
      <AnnouncementBar dark={dark} />

      <div
        className={clsx(
          "relative transition-[background-color,color,box-shadow] duration-500 ease-[var(--ease-out-expo)]",
          dark
            ? "bg-[rgb(20,20,24)]/[0.92] text-chrome-text"
            : "bg-paper/[0.86] text-ink shadow-[0_1px_0_rgb(23_25_28/0.08)]",
          "backdrop-blur-xl backdrop-saturate-150",
        )}
      >
        <nav aria-label="Primary" className="container-x flex h-[68px] items-center justify-between">
          <Link href="/" aria-label="Reflexivity home" className={clsx("shrink-0 transition-colors", dark ? "text-[#f4f3f1]" : "text-ink")}>
            <Logo />
          </Link>

          {/* Desktop */}
          <ul className="hidden h-full items-center gap-[26px] whitespace-nowrap min-[1280px]:flex min-[1420px]:gap-[46px]">
            {NAV.map((g) => (
              <li key={g.label} className="relative flex h-full items-center" onMouseEnter={() => enter(g.columns ? g.label : null)}>
                {g.columns ? (
                  <button
                    type="button"
                    aria-expanded={open === g.label}
                    aria-controls="nav-panel"
                    onClick={() => setOpen((o) => (o === g.label ? null : g.label))}
                    onFocus={() => enter(g.label)}
                    className={clsx(
                      "relative flex h-full items-center font-display text-[16px] font-medium transition-colors duration-200",
                      open === g.label ? (dark ? "text-[#f4f3f1]" : "text-ink") : dark ? "text-chrome-text/90 hover:text-white" : "text-ink/85 hover:text-ink",
                    )}
                  >
                    {g.label}
                    <Chevron open={open === g.label} />
                    <span
                      className={clsx(
                        "absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                        open === g.label ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={g.href!}
                    onFocus={() => enter(null)}
                    className={clsx(
                      "group relative flex h-full items-center font-display text-[16px] font-medium transition-colors duration-200",
                      pathname === g.href ? (dark ? "text-white" : "text-ink") : dark ? "text-chrome-text/90 hover:text-white" : "text-ink/85 hover:text-ink",
                    )}
                  >
                    {g.label}
                    <span
                      className={clsx(
                        "absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                        pathname === g.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-5 whitespace-nowrap min-[1280px]:flex" onMouseEnter={() => enter(null)}>
            <Link
              href="/book-a-demo"
              data-cta="nav-demo"
              className={clsx(
                "inline-flex h-[35px] items-center px-5 font-display text-[16px] font-medium transition-colors duration-300",
                dark ? "bg-[#f4f3f1] text-[#080808] hover:bg-[#dcdad5]" : "bg-[#080808] text-[#f4f3f1] hover:bg-graphite",
              )}
            >
              Request a Demo
            </Link>
            <a
              href={APP_URL}
              className={clsx(
                "inline-flex h-[35px] items-center border px-5 font-display text-[16px] font-medium transition-colors duration-300",
                dark ? "border-[#f4f3f1] text-[#f4f3f1] hover:bg-white/10" : "border-ink text-ink hover:bg-ink/5",
              )}
            >
              Log in
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className={clsx("relative -mr-2 flex h-9 w-9 items-center justify-center min-[1280px]:hidden", dark ? "text-[#f4f3f1]" : "text-ink")}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className={clsx("absolute h-[1.5px] w-[18px] bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]", mobileOpen ? "rotate-45" : "-translate-y-[4px]")} />
            <span className={clsx("absolute h-[1.5px] w-[18px] bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]", mobileOpen ? "-rotate-45" : "translate-y-[4px]")} />
          </button>
        </nav>

        {/* Desktop mega panel */}
        <AnimatePresence>
          {activeGroup && (
            <motion.div
              id="nav-panel"
              key="panel"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0, transition: { duration: 0.35, ease: EASE } }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-x-0 top-full hidden overflow-hidden bg-chrome-panel min-[1280px]:block"
              onMouseEnter={() => enter(activeGroup.label)}
            >
              <PanelContent group={activeGroup} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scrim */}
      <AnimatePresence>
        {activeGroup && (
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none fixed inset-0 -z-10 hidden bg-ink/30 min-[1280px]:block"
          />
        )}
      </AnimatePresence>

      <MobileMenu open={mobileOpen} />
    </header>
  );
}

function PanelContent({ group }: { group: NavGroup }) {
  return (
    <motion.div
      key={group.label}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="container-x grid min-h-[220px] grid-cols-3 gap-8 pb-[48px] pt-[46px]"
    >
      {group.columns!.map((col, ci) => (
        <ul key={ci} className="flex flex-col gap-[30px]">
          {col.map((l, i) => (
            <motion.li
              key={l.href + l.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.06 + (ci * col.length + i) * 0.035 }}
            >
              <Link href={l.href} className="group block w-fit">
                <span className="flex items-center gap-2 font-display text-[16px] font-medium text-[#f4f3f1]">
                  {l.label}
                  <svg viewBox="0 0 12 12" className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                    <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" />
                  </svg>
                </span>
                <span className="mt-[6px] block font-display text-[14px] font-medium text-[#f4f3f1]/60 transition-colors group-hover:text-[#f4f3f1]/85">
                  {l.description}
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      ))}
      {group.featured ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}>
          <Link href={group.featured.href} className="group block">
            <div className="relative aspect-[16/9] w-full max-w-[384px] overflow-hidden bg-graphite">
              <Image
                src={group.featured.image}
                alt=""
                fill
                sizes="384px"
                className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
              />
            </div>
            <p className="mt-4 font-display text-[16px] font-medium uppercase text-[#8e908c]">{group.featured.eyebrow}</p>
            <p className="mt-[6px] font-display text-[16px] font-medium text-[#f4f3f1]">{group.featured.title}</p>
          </Link>
        </motion.div>
      ) : (
        <div />
      )}
    </motion.div>
  );
}

function MobileMenu({ open }: { open: boolean }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const id = useId();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          key="mm"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.4, ease: EASE } }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto bg-chrome-panel text-[#f4f3f1] min-[1280px]:hidden"
          data-lenis-prevent
        >
          <div className="container-x flex min-h-full flex-col pb-10 pt-4">
            <ul>
              {NAV.map((g, i) => (
                <motion.li
                  key={g.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.12 + i * 0.04 }}
                  className="border-b border-white/15"
                >
                  {g.columns ? (
                    <>
                      <button
                        type="button"
                        className="flex w-full items-center py-5 text-left font-display text-[18px] font-medium"
                        aria-expanded={expanded === g.label}
                        aria-controls={`${id}-${i}`}
                        onClick={() => setExpanded((e) => (e === g.label ? null : g.label))}
                      >
                        {g.label}
                        <Chevron open={expanded === g.label} />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded === g.label && (
                          <motion.div
                            id={`${id}-${i}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <ul className="flex flex-col gap-5 pb-6 pt-1">
                              {g.columns.flat().map((l) => (
                                <li key={l.href + l.label}>
                                  <Link href={l.href} className="block">
                                    <span className="block font-display text-[16px] font-medium">{l.label}</span>
                                    <span className="mt-1 block font-serif text-[16px] text-[#f4f3f1]/70">{l.description}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link href={g.href!} className="block py-5 font-display text-[18px] font-medium">
                      {g.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
              className="mt-auto grid grid-cols-2 gap-3 pt-10"
            >
              <Link href="/book-a-demo" className="flex h-12 items-center justify-center bg-[#f4f3f1] font-display text-[16px] font-medium text-[#080808]">
                Request a Demo
              </Link>
              <a href={APP_URL} className="flex h-12 items-center justify-center border border-[#f4f3f1] font-display text-[16px] font-medium">
                Log in
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AnnouncementBar({ dark }: { dark: boolean }) {
  return (
    <div
      className={clsx(
        "relative z-10 flex min-h-[36px] items-center justify-center px-5 py-[6px] text-center transition-colors duration-500 ease-[var(--ease-out-expo)]",
        dark ? "bg-white text-announce" : "bg-announce text-white",
      )}
    >
      <p className="font-display text-[13px] font-medium leading-[1.3] sm:text-[16px]">
        We raised $XXM at a $XXB Valuation to Help Investors Own their Intelligence.
        <Link href="/blog" className="ml-3 whitespace-nowrap underline-offset-4 hover:underline sm:ml-4">
          Learn More
        </Link>
      </p>
    </div>
  );
}
