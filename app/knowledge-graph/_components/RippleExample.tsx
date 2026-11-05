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
      <div className="pui mb-6 grid grid-cols-4 gap-2 md:mb-8" role="tablist" aria-label="Worked example steps">
        {STEPS.map((s, k) => (
          <button key={s} role="tab" aria-selected={k === step} onClick={() => setStep(k)} className={clsx("group border-t pt-2.5 text-left text-[12px] transition-colors duration-500 sm:text-[13px]", k === step ? "border-white text-white" : k < step ? "border-white/40 text-white/55" : "border-white/15 text-white/45 hover:text-white/70")}>
            {s}
          </button>
        ))}
      </div>

      <div className="pui grain field-lake relative isolate overflow-hidden rounded-[18px] p-4 sm:p-6 lg:p-8">
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
          {/* catalyst + theme */}
          <div className="space-y-3 lg:col-span-4">
            <motion.div initial={reduce ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: EASE }} className={clsx("ui-card p-4 transition-colors duration-500", step === 0 && "border-black/30")}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[12px] text-[#8f8f8f]">Market catalyst, macro</span>
                <Pill>Input costs</Pill>
              </div>
              <p className="mt-2 text-[20px] font-semibold leading-[1.2] text-[#0d0d0d]">Sept U.S. Flash PMI Rekindles Factory Cost Pressure</p>
              <div className="mt-3 h-10"><Sparkline points={series(36, 21, -0.25, 1.8)} className="h-full w-full" /></div>
            </motion.div>

            <div className={clsx("ui-card p-4 transition-[opacity,border-color] duration-700", show(1) ? "opacity-100" : "opacity-55", step === 1 && "border-black/30")}>
              <p className="text-[12px] text-[#8f8f8f]">Industry theme</p>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <span className="text-[16px] font-semibold text-[#0d0d0d]">Industrial automation</span>
                <span className="text-[13px] tabular-nums text-[#5d5d5d]">+0.6%</span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[#5d5d5d]">Higher input costs pressure manufacturers’ margins, and strengthen the case for automation spend.</p>
            </div>
          </div>

          {/* ripple diagram */}
          <div className="relative hidden aspect-square w-full sm:block lg:col-span-4 lg:aspect-auto">
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
                    <circle cx={x} cy={y} r="7" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                    <text x={x} y={y + (t.a < 0 ? -18 : 26)} textAnchor="middle" fill="rgba(244,243,241,0.85)" fontSize="12">{t.label}</text>
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
                    <circle cx={x} cy={y} r="4.5" fill="#ffffff" />
                    <text x={x} y={y - 11} textAnchor="middle" fill="rgba(244,243,241,0.9)" fontSize="12">{c.tk}</text>
                  </g>
                );
              })}
              <circle cx={C.x} cy={C.y} r="10" fill="#ffffff" />
                            <text x={C.x} y={C.y + 40} textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="12">US flash PMI</text>
            </svg>
          </div>

          {/* ranked assets */}
          <div className="lg:col-span-4">
            <div className={clsx("ui-card h-full p-4 transition-[opacity,border-color] duration-700", show(2) ? "opacity-100" : "opacity-55", step >= 2 && "border-black/30")}>
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold">Ranked exposure</span>
                <span className="text-[12px] text-[#8f8f8f]">Weight</span>
              </div>
              <ol className="mt-3 divide-y divide-black/10 border-t border-black/10">
                {RANKED.map((r, k) => (
                  <li key={r.tk} className={clsx("flex items-center gap-3 py-2 transition-opacity duration-500", show(2) ? "opacity-100" : "opacity-40")} style={{ transitionDelay: `${k * 90}ms` }}>
                    <span className="w-3 text-[12px] tabular-nums text-[#8f8f8f]">{k + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-medium text-[#0d0d0d]">{r.name}</span>
                      <span className="block truncate text-[12px] text-[#8f8f8f]">{r.role}, {r.hop}</span>
                    </span>
                    <span className="w-4 text-center text-[13px] text-[#5d5d5d]" aria-label={r.dir === "+" ? "Tailwind" : r.dir === "−" ? "Headwind" : "Mixed"}>{r.dir}</span>
                    <span className="w-8 text-right text-[13px] tabular-nums text-[#0d0d0d]">{r.w.toFixed(2)}</span>
                  </li>
                ))}
              </ol>
              <AnimatePresence>
                {show(3) && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE }} className="mt-3 rounded-[10px] bg-[#f9f9f9] p-3">
                    <p className="text-[12px] text-[#8f8f8f]">Implication</p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-[#0d0d0d]">Automation suppliers screen as beneficiaries of renewed cost pressure; manufacturers without pricing power carry margin risk.</p>
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
