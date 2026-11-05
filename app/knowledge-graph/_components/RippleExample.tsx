"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Pill, Sparkline, series } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = ["What happened", "Why it matters", "What else is affected", "The implication"];

const RANKED = [
  { name: "Rockwell Automation", tk: "ROK", role: "Factory automation", hop: "1st order", dir: "+", w: 0.86 },
  { name: "Siemens", tk: "SIE", role: "Automation and industrial software", hop: "1st order", dir: "+", w: 0.81 },
  { name: "Fanuc", tk: "6954", role: "Industrial robots", hop: "1st order", dir: "+", w: 0.74 },
  { name: "Eaton", tk: "ETN", role: "Electrical equipment", hop: "2nd order", dir: "±", w: 0.62 },
  { name: "Whirlpool", tk: "WHR", role: "Appliance manufacturing", hop: "2nd order", dir: "−", w: 0.55 },
];

// ripple diagram geometry (viewBox 0 0 400 400)
const C = { x: 200, y: 200 };
const THEMES = [
  { label: "Industrial automation", a: -60, r: 92 },
  { label: "Energy · cost pressure", a: 120, r: 92 },
];
const COS = (a: number) => Math.cos((a * Math.PI) / 180);
const SIN = (a: number) => Math.sin((a * Math.PI) / 180);
const COMPANIES = [
  { tk: "ROK", a: -95, r: 165, from: 0 },
  { tk: "SIE", a: -50, r: 168, from: 0 },
  { tk: "6954", a: -10, r: 160, from: 0 },
  { tk: "ETN", a: 70, r: 165, from: 1 },
  { tk: "WHR", a: 160, r: 162, from: 1 },
];

/** Worked example: one macro catalyst, traced through themes to ranked, exposed assets. */
export function RippleExample() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? 3 : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % 4), step === 3 ? 6500 : 3200);
    return () => clearTimeout(t);
  }, [step, inView, reduce]);

  const show = (k: number) => step >= k;

  return (
    <div ref={ref}>
      {/* step rail */}
      <div className="mb-6 grid grid-cols-4 gap-2 md:mb-8" role="tablist" aria-label="Worked example steps">
        {STEPS.map((s, k) => (
          <button key={s} role="tab" aria-selected={k === step} onClick={() => setStep(k)} className="group text-left">
            <span className="block h-[2px] overflow-hidden rounded-full bg-white/15">
              <span className={clsx("block h-full bg-paper transition-[width] duration-700", k <= step ? "w-full" : "w-0")} />
            </span>
            <span className={clsx("mt-2.5 block font-mono text-[9.5px] uppercase tracking-[0.06em] transition-colors sm:text-[10.5px]", k === step ? "text-paper" : "text-paper/45 group-hover:text-paper/70")}>{s}</span>
          </button>
        ))}
      </div>

      <div className="grain field-lake relative isolate overflow-hidden rounded-[18px] p-4 sm:p-6 lg:p-8">
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
          {/* catalyst + theme */}
          <div className="space-y-3 lg:col-span-4">
            <motion.div initial={reduce ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: EASE }} className={clsx("ui-card p-5 transition-shadow duration-500", step === 0 && "ring-1 ring-lake-500/50")}>
              <div className="flex items-center justify-between gap-2">
                <span className="t-ui text-[10px] text-ink/50">Market catalyst · Macro</span>
                <Pill tone="warn">Input costs</Pill>
              </div>
              <p className="mt-3 font-display text-[21px] font-semibold leading-[1.15] tracking-[-0.01em] text-ink sm:text-[23px]">Sept U.S. Flash PMI Rekindles Factory Cost Pressure</p>
              <div className="mt-4 h-12 text-[#9a4b3c]"><Sparkline points={series(36, 21, -0.25, 1.8)} className="h-full w-full" fill="rgb(154 75 60 / 0.08)" /></div>
            </motion.div>

            <div className={clsx("ui-card p-4 transition-opacity duration-700", show(1) ? "opacity-100" : "opacity-55", step === 1 && "ring-1 ring-lake-500/50")}>
              <p className="t-ui text-[9.5px] text-ink/45">Industry theme</p>
              <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">
                <span className="font-display text-[16px] font-semibold text-ink">Industrial Automation</span>
                <span className="flex items-center gap-1.5">
                  <Pill>Neutral</Pill>
                  <span className="rounded-full bg-pine-100 px-2 py-1 font-mono text-[10.5px] text-pine-700">+0.6%</span>
                </span>
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-ink/60">Higher input costs pressure manufacturers’ margins, and strengthen the case for automation spend.</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Energy · cost pressure", "Reshoring", "Robotics"].map((t, k) => (
                  <span key={t} className={clsx("rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.04em]", k === 0 ? "bg-lake-100 text-lake-700" : "bg-ink/[0.05] text-ink/55")}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ripple diagram */}
          <div className="relative hidden aspect-square w-full rounded-[14px] bg-ink/[0.18] sm:block lg:col-span-4 lg:aspect-auto">
            <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
              {[92, 165].map((r, k) => (
                <circle key={r} cx={C.x} cy={C.y} r={r} fill="none" stroke="rgba(244,243,241,0.14)" strokeDasharray="2 5" opacity={show(k + 1) ? 1 : 0.4} style={{ transition: "opacity .8s" }} />
              ))}
              {!reduce && inView && (
                <motion.circle key={step} cx={C.x} cy={C.y} fill="none" stroke="rgba(244,243,241,0.5)" strokeWidth="1" initial={{ r: 10, opacity: 0.8 }} animate={{ r: 190, opacity: 0 }} transition={{ duration: 2.4, ease: "easeOut" }} />
              )}
              {THEMES.map((t, k) => {
                const x = C.x + COS(t.a) * t.r, y = C.y + SIN(t.a) * t.r;
                return (
                  <g key={t.label} opacity={show(1) ? 1 : 0} style={{ transition: `opacity .8s ${k * 0.15}s` }}>
                    <line x1={C.x} y1={C.y} x2={x} y2={y} stroke="rgba(213,222,230,0.6)" strokeWidth="1.2" />
                    <circle cx={x} cy={y} r="9" fill="none" stroke="#7d978c" strokeWidth="2.4" />
                    <text x={x} y={y + (t.a < 0 ? -18 : 26)} textAnchor="middle" fill="rgba(244,243,241,0.85)" fontSize="11" fontFamily="var(--font-archivo)">{t.label}</text>
                  </g>
                );
              })}
              {COMPANIES.map((c, k) => {
                const t = THEMES[c.from];
                const tx = C.x + COS(t.a) * t.r, ty = C.y + SIN(t.a) * t.r;
                const x = C.x + COS(c.a) * c.r, y = C.y + SIN(c.a) * c.r;
                return (
                  <g key={c.tk} opacity={show(2) ? 1 : 0} style={{ transition: `opacity .7s ${0.1 + k * 0.12}s` }}>
                    <line x1={tx} y1={ty} x2={x} y2={y} stroke="rgba(213,222,230,0.35)" strokeWidth="1" />
                    <circle cx={x} cy={y} r="5.5" fill="#f4f3f1" />
                    <text x={x} y={y - 11} textAnchor="middle" fill="rgba(244,243,241,0.9)" fontSize="11" fontFamily="var(--font-archivo)">{c.tk}</text>
                  </g>
                );
              })}
              <circle cx={C.x} cy={C.y} r="13" fill="#f4f3f1" />
              <circle cx={C.x} cy={C.y} r="22" fill="none" stroke="rgba(244,243,241,0.4)" />
              <text x={C.x} y={C.y + 40} textAnchor="middle" fill="rgba(244,243,241,0.7)" fontSize="10.5" fontFamily="var(--font-archivo)">US FLASH PMI</text>
            </svg>
          </div>

          {/* ranked assets */}
          <div className="lg:col-span-4">
            <div className={clsx("ui-card h-full p-4 transition-opacity duration-700 sm:p-5", show(2) ? "opacity-100" : "opacity-55", step >= 2 && "ring-1 ring-lake-500/50")}>
              <div className="flex items-center justify-between">
                <span className="t-ui text-[10px] text-ink/50">Ranked exposure</span>
                <Pill tone="lake">Graph</Pill>
              </div>
              <ol className="mt-3 space-y-1.5">
                {RANKED.map((r, k) => (
                  <li key={r.tk} className={clsx("flex items-center gap-2.5 rounded-md px-2.5 py-2 transition-all duration-500", show(2) ? "bg-ink/[0.035] opacity-100" : "opacity-40")} style={{ transitionDelay: `${k * 90}ms` }}>
                    <span className="w-3 font-mono text-[10px] text-ink/40">{k + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-[13px] font-semibold text-ink">{r.name}</span>
                      <span className="block truncate text-[10.5px] text-ink/50">{r.role} · {r.hop}</span>
                    </span>
                    <span className={clsx("flex h-5 w-5 shrink-0 items-center justify-center rounded font-mono text-[12px]", r.dir === "+" ? "bg-pine-100 text-pine-700" : r.dir === "−" ? "bg-[#f3e6d6] text-[#7a5326]" : "bg-ink/[0.06] text-ink/60")} aria-label={r.dir === "+" ? "Tailwind" : r.dir === "−" ? "Headwind" : "Mixed"}>{r.dir}</span>
                    <span className="h-1 w-10 overflow-hidden rounded-full bg-ink/8"><span className="block h-full bg-lake-500 transition-[width] duration-700" style={{ width: show(2) ? `${r.w * 100}%` : "0%" }} /></span>
                  </li>
                ))}
              </ol>
              <AnimatePresence>
                {show(3) && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE }} className="mt-3 rounded-lg border border-ink/10 bg-white p-3">
                    <p className="t-ui text-[9.5px] text-ink/40">Investment implication</p>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-ink/80">Automation suppliers screen as beneficiaries of renewed cost pressure; manufacturers without pricing power carry margin risk. Next: ask Alfred which holdings can pass costs through.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <p className="t-small mt-3 text-paper/55">Illustrative example. Rankings show relationship exposure, not a forecast or recommendation.</p>
    </div>
  );
}
