"use client";

import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { PlatformAsk } from "@/components/visual/scenes/PlatformAsk";
import { RippleGraph } from "@/components/visual/scenes/RippleGraph";
import { PlatformWatchlist } from "@/components/visual/scenes/PlatformWatchlist";
import { PlatformAccess } from "@/components/visual/scenes/PlatformAccess";
import { ArrowNE } from "@/components/ui/Layouts";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------- index: 50/50, live panel | linked rows ---------- */
const CAPS: { title: string; body: string; href: string; link: string; visual: React.ReactNode; field: string }[] = [
  {
    title: "Alfred",
    body: "Ask Alfred to investigate a company, analyze a portfolio, or pressure-test a thesis. Get comprehensive, source-backed analysis in minutes.",
    href: "/alfred",
    link: "Meet Alfred",
    visual: <PlatformAsk />,
    field: "field-mist",
  },
  {
    title: "Knowledge Graph",
    body: "A proprietary map of how companies, products, themes and markets connect, with weighted, evidence-backed relationships.",
    href: "/knowledge-graph",
    link: "Explore the Graph",
    visual: <RippleGraph w={560} h={400} seed={5} tags={[["AWS capacity", "Origin"], ["NVIDIA", "Supplier · 0.92"], ["TSMC", "Foundry · 0.81"], ["ASML", "3rd order"]]} />,
    field: "field-ink",
  },
  {
    title: "Insights",
    body: "Market developments, earnings intelligence and second-order effects across the companies and themes you follow.",
    href: "/insights",
    link: "See Insights",
    visual: <PlatformWatchlist />,
    field: "field-pine",
  },
  {
    title: "Security",
    body: "Independently audited controls, encryption and permission-aware access to connected sources.",
    href: "/security",
    link: "Review security",
    visual: <PlatformAccess />,
    field: "field-ink",
  },
];

const STEP = 9600;

/**
 * Platform overview as a 50/50: a live product panel on the left, the five capabilities as
 * linked rows on the right. Rows auto-advance while in view; hover or focus takes over.
 * Hover is rule colour + arrow only; nothing moves.
 */
export function Capabilities() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const running = inView && !held && !reduce;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % CAPS.length), STEP);
    return () => clearTimeout(t);
  }, [active, running]);

  const c = CAPS[active];
  return (
    <div ref={ref} className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="lg:sticky lg:top-[calc(var(--header-live)+32px)]">
        <div className="relative aspect-square w-full overflow-hidden rounded-[18px] border border-white/10 sm:aspect-[4/3]" aria-hidden="true">
          <AnimatePresence initial={false}>
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className={clsx("grain absolute inset-0 isolate flex items-center p-5 sm:p-8", c.field)}
            >
              <div className="w-full">{c.visual}</div>
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="t-small mt-4 text-paper/55">
          <span className="font-display font-medium text-paper/85">{c.title}.</span> Illustrative product view.
        </p>
      </div>

      <ul className="border-t border-white/20" onMouseLeave={() => setHeld(false)}>
        {CAPS.map((it, i) => {
          const on = i === active;
          return (
            <li key={it.title} className="relative">
              <span aria-hidden="true" className="absolute -top-px left-0 h-px bg-paper" style={{ width: on ? "100%" : "0%", transition: on && running ? `width ${STEP}ms linear` : "width 300ms ease" }} />
              <Link
                href={it.href}
                onMouseEnter={() => { setHeld(true); setActive(i); }}
                onFocus={() => { setHeld(true); setActive(i); }}
                onBlur={() => setHeld(false)}
                className="group grid grid-cols-[1fr_auto] items-start gap-x-6 gap-y-2 border-b border-white/20 py-6 transition-colors duration-300 hover:border-paper md:py-7"
              >
                <span className={clsx("font-display text-[22px] font-medium tracking-[-0.01em] transition-colors duration-500 md:text-[26px]", on ? "text-paper" : "text-paper/55")}>{it.title}</span>
                <ArrowNE className="mt-2.5 justify-self-end" />
                <span className={clsx("t-small col-span-2 max-w-[520px] transition-colors duration-500", on ? "text-paper/75" : "text-paper/50")}>{it.body}</span>
                <span className="col-span-2 font-display text-[14px] font-medium text-paper/80">
                  <span className="link-underline">{it.link}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
