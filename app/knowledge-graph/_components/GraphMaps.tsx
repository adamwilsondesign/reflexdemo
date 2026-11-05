"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { KnowledgeGraph } from "@/components/graphics/KnowledgeGraph";
import { PrecisionIcon, type IconName } from "@/components/ui/PrecisionIcon";

const EASE = [0.16, 1, 0.3, 1] as const;
const INTERVAL = 7000;

const STATES: {
  title: string;
  body: string;
  icon: IconName;
  focus: string;
  path: string[];
  rel: string;
  w: number;
  evidence: [string, string][];
}[] = [
  {
    title: "Companies",
    body: "Follow customers, suppliers, competitors and partners to see where a market event may travel next.",
    icon: "chain",
    focus: "NVDA",
    path: ["NVIDIA", "TSMC"],
    rel: "Supplier",
    w: 0.9,
    evidence: [["Annual report", "Supplier and manufacturing disclosures"], ["Earnings call", "Capacity and supply commentary"]],
  },
  {
    title: "Products and brands",
    body: "Connect the products and services behind a theme to the companies building and selling them.",
    icon: "cube",
    focus: "HBM",
    path: ["HBM memory", "Micron"],
    rel: "Made by",
    w: 0.75,
    evidence: [["Company filing", "Product line and segment detail"], ["Press release", "Supply agreement announcement"]],
  },
  {
    title: "Themes and drivers",
    body: "Industry, financial and macro themes, including the relationships between them.",
    icon: "orbit",
    focus: "PWR",
    path: ["Data center power", "Vertiv"],
    rel: "Beneficiary",
    w: 0.85,
    evidence: [["Earnings call", "Order growth tied to data center demand"], ["Industry news", "Power and cooling capacity build-out"]],
  },
  {
    title: "Markets and geographies",
    body: "Trace relationships across regions and markets to uncover indirect exposure.",
    icon: "rings",
    focus: "TW",
    path: ["NVIDIA", "TSMC", "Taiwan"],
    rel: "Indirect exposure",
    w: 0.9,
    evidence: [["Supplier link", "NVIDIA → TSMC, weight 0.90"], ["Domicile", "TSMC → Taiwan, weight 0.90"]],
  },
];

/** "What the Graph maps": four states, each refocusing one persistent interactive graph. */
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
    <div ref={ref} className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-14" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="lg:col-span-5" role="tablist" aria-orientation="vertical" aria-label="What the Graph maps">
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
              className="group relative block w-full border-t border-ink/12 py-5 text-left md:py-6"
            >
              <span aria-hidden="true" className="absolute -top-px left-0 h-px bg-ink" style={{ width: on ? "100%" : "0%", transition: on && running ? `width ${INTERVAL}ms linear` : "width 300ms ease" }} />
              <span className="flex items-start gap-4">
                <PrecisionIcon name={it.icon} className={clsx("mt-0.5 h-6 w-6 shrink-0 transition-opacity duration-500", on ? "opacity-100" : "opacity-40")} />
                <span className="block">
                  <span className={clsx("t-h3 block transition-opacity duration-500", on ? "opacity-100" : "opacity-45 group-hover:opacity-75")}>{it.title}</span>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.span initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.55, ease: EASE }} className="block overflow-hidden">
                        <span className="t-body block pt-3 text-ink/70">{it.body}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </span>
            </button>
          );
        })}
        <div className="border-t border-ink/12" />
      </div>

      <div className="lg:col-span-7" id="kg-panel" role="tabpanel" aria-labelledby={`kg-tab-${active}`}>
        <div className="grain field-ink relative isolate overflow-hidden rounded-[18px] sm:h-[540px]">
          <div className="relative h-[340px] sm:absolute sm:inset-0 sm:h-auto">
            <KnowledgeGraph tone="dark" minor={60} focus={s.focus} showLegend={false} />
          </div>
          <p className="t-ui pointer-events-none absolute left-4 top-4 text-[10px] text-paper/45 sm:left-5 sm:top-5">Hover or tap a node</p>

          <div className="pointer-events-none relative min-h-[200px] px-3 pb-3 sm:absolute sm:min-h-0 sm:bottom-5 sm:right-5 sm:w-[320px] sm:p-0">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.5, ease: EASE }} className="rounded-[12px] border border-white/12 bg-[#1b1e23]/90 p-4 text-paper backdrop-blur-md">
                <p className="t-ui text-[9.5px] text-paper/45">Example relationship</p>
                <p className="mt-2 flex flex-wrap items-center gap-1.5 font-display text-[14.5px] font-semibold">
                  {s.path.map((p, k) => (
                    <span key={p} className="flex items-center gap-1.5">
                      {k > 0 && <span className="text-paper/35">→</span>}
                      {p}
                    </span>
                  ))}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-paper/55">{s.rel}</span>
                  <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                    <motion.span className="block h-full rounded-full bg-lake-300" initial={{ width: 0 }} animate={{ width: `${s.w * 100}%` }} transition={{ duration: 0.9, ease: EASE, delay: 0.15 }} />
                  </span>
                  <span className="font-mono text-[11px] text-paper/80">{s.w.toFixed(2)}</span>
                </div>
                <ul className="mt-3 space-y-1.5 border-t border-white/10 pt-3">
                  {s.evidence.map(([k, v]) => (
                    <li key={v} className="flex gap-2 text-[11.5px] leading-snug">
                      <span className="w-[92px] shrink-0 font-mono text-[9.5px] uppercase tracking-[0.04em] text-paper/45">{k}</span>
                      <span className="text-paper/75">{v}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <p className="t-small mt-3 text-ink/50">Illustrative relationships and weights.</p>
      </div>
    </div>
  );
}

/** Weight scale: what a relationship weight means, and what it does not. */
export function WeightExplainer() {
  const reduce = useReducedMotion();
  const marks = [
    { w: 0.3, label: "Sensitivity", ex: "Novo Nordisk → Rates" },
    { w: 0.6, label: "Theme exposure", ex: "Eaton → Industrial automation" },
    { w: 0.9, label: "Supplier", ex: "NVIDIA → TSMC" },
  ];
  return (
    <div className="grid gap-px overflow-hidden rounded-[16px] bg-ink/10 lg:grid-cols-12">
      <div className="bg-white p-6 md:p-9 lg:col-span-7">
        <p className="t-ui text-ink/50">Reading a relationship weight</p>
        <div className="relative mt-10 pb-2">
          <div className="h-[3px] w-full rounded-full bg-gradient-to-r from-lake-100 via-lake-300 to-lake-700" />
          <div className="mt-2 flex justify-between font-mono text-[10px] text-ink/40"><span>0.0 · weaker, thinner evidence</span><span>1.0 · stronger</span></div>
          {marks.map((m, i) => (
            <motion.div
              key={m.label}
              initial={reduce ? false : { opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.15 }}
              className="absolute -top-[30px] -translate-x-1/2"
              style={{ left: `${m.w * 100}%` }}
            >
              <span className="block whitespace-nowrap rounded-full bg-ink px-2 py-0.5 font-mono text-[10px] text-paper">{m.w.toFixed(2)}</span>
              <span className="mx-auto mt-1 block h-[14px] w-px bg-ink/40" />
            </motion.div>
          ))}
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
          {marks.map((m) => (
            <li key={m.label} className="rounded-[10px] border border-ink/10 bg-paper/60 p-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink/45">{m.label} · {m.w.toFixed(2)}</span>
              <span className="mt-1 block font-display text-[13.5px] font-semibold text-ink">{m.ex}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid gap-px bg-ink/10 lg:col-span-5">
        <div className="bg-white p-6 md:p-8">
          <p className="flex items-center gap-2 font-display text-[16px] font-semibold text-ink"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-pine-100 text-[11px] text-pine-700">✓</span>What a weight means</p>
          <p className="t-small mt-2.5 text-ink/70">How strong a connection is, relative to the other connections in the Graph, based on the evidence behind it: filings, transcripts, press releases and market events. You can open a relationship to see that evidence.</p>
        </div>
        <div className="bg-white p-6 md:p-8">
          <p className="flex items-center gap-2 font-display text-[16px] font-semibold text-ink"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f3e6d6] text-[11px] text-[#7a5326]">✕</span>What it does not mean</p>
          <p className="t-small mt-2.5 text-ink/70">It is not a forecast, a recommendation or a guaranteed causal effect. A high weight says two entities are closely connected, not that one will move the other by a set amount.</p>
        </div>
      </div>
    </div>
  );
}
