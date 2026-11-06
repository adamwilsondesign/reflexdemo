"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { MockPanel, Row } from "@/components/product/motion";
import { CalmGraph } from "./CalmGraph";

const EASE = [0.16, 1, 0.3, 1] as const;
const INTERVAL = 6000;

const STATES: { title: string; body: string; focus: string; path: string[]; names: string; rel: string; w: number; evidence: string }[] = [
  {
    title: "Companies",
    body: "Follow customers, suppliers, competitors and partners to see where a market event may travel next.",
    focus: "NVDA",
    path: ["NVDA", "TSM"],
    names: "NVIDIA → TSMC",
    rel: "Supplier",
    w: 0.9,
    evidence: "Filings, earnings calls",
  },
  {
    title: "Products and brands",
    body: "Connect the products and services behind a theme to the companies building and selling them.",
    focus: "HBM",
    path: ["HBM", "MU"],
    names: "HBM memory → Micron",
    rel: "Made by",
    w: 0.75,
    evidence: "Filings, press releases",
  },
  {
    title: "Themes and drivers",
    body: "Industry, financial and macro themes, including the relationships between them.",
    focus: "PWR",
    path: ["PWR", "VRT"],
    names: "Data center power → Vertiv",
    rel: "Beneficiary",
    w: 0.85,
    evidence: "Earnings calls, industry news",
  },
  {
    title: "Markets and geographies",
    body: "Trace relationships across regions and markets to uncover indirect exposure.",
    focus: "TW",
    path: ["NVDA", "TSM", "TW"],
    names: "NVIDIA → TSMC → Taiwan",
    rel: "Indirect exposure",
    w: 0.9,
    evidence: "Supplier link, domicile",
  },
];

/** "What the Graph maps": four states refocusing one calm, fixed-layout graph. */
export function GraphMaps() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const running = inView && !paused && !reduce;
  const s = STATES[active];

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % STATES.length), INTERVAL);
    return () => clearTimeout(t);
  }, [active, running]);

  return (
    <div ref={ref} className="grid-12 items-center gap-y-10" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="col-span-12 lg:col-span-5" role="tablist" aria-orientation="vertical" aria-label="What the Graph maps">
        {STATES.map((it, i) => {
          const on = i === active;
          return (
            <button
              key={it.title}
              role="tab"
              id={`kg-tab-${i}`}
              aria-selected={on}
              aria-controls="kg-panel"
              onClick={() => setActive(i)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              className="group relative block w-full border-t border-ink/12 py-6 text-left"
            >
              <span aria-hidden="true" className="absolute -top-px left-0 h-px bg-ink" style={{ width: on ? "100%" : "0%", transition: on && running ? `width ${INTERVAL}ms linear` : "width 300ms ease" }} />
              <span className={clsx("t-h3 block transition-opacity duration-500", on ? "opacity-100" : "opacity-45 group-hover:opacity-75")}>{it.title}</span>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.span initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.55, ease: EASE }} className="block overflow-hidden">
                    <span className="t-body block pt-4 text-ink/70">{it.body}</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
        <div className="border-t border-ink/12" />
      </div>

      <div className="col-span-12 lg:col-span-6 lg:col-start-7" id="kg-panel" role="tabpanel" aria-labelledby={`kg-tab-${active}`}>
        <div className="grain field-ink relative isolate flex h-[480px] flex-col overflow-hidden rounded-[18px] p-4 sm:h-[600px] sm:p-8">
          <div className="min-h-0 flex-1">
            <CalmGraph focus={s.focus} path={s.path} />
          </div>
          <div className="mx-auto mt-4 w-full max-w-[360px] shrink-0">
            <MockPanel stateKey={active} height={128}>
              <p className="text-[15px] font-semibold text-[#0d0d0d]">{s.names}</p>
              <div className="mt-2">
                <Row label={s.rel} value={s.w.toFixed(2)} />
                <Row label="Evidence" value={s.evidence} />
              </div>
            </MockPanel>
          </div>
        </div>
      </div>
    </div>
  );
}
