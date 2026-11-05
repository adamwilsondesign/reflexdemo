"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AlfredGlyph, Pill, Sparkline, Stage, series } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const TAKEAWAYS = [
  { t: "Utility interconnect queues lengthen", tag: "Grid capacity" },
  { t: "Grid equipment orders strengthen", tag: "Electrical equipment" },
  { t: "Hyperscaler capex guidance rises", tag: "AI infrastructure" },
  { t: "Cooling and power supply tighten", tag: "Supply chain" },
  { t: "Key milestones to watch", tag: "Upcoming events" },
];

const RIPPLE = [
  { n: "Vertiv", r: "Power & cooling", h: "Direct", w: 0.91 },
  { n: "Eaton", r: "Electrical equipment", h: "Direct", w: 0.82 },
  { n: "Constellation", r: "Generation", h: "2nd order", w: 0.71 },
  { n: "Quanta Services", r: "Grid build-out", h: "2nd order", w: 0.6 },
];

/**
 * One complete Insight rendered as a single document. The active section (0–3) scrolls into
 * focus and the rest dim, so the visitor reads the whole path: catalyst → takeaways → ripple → follow-up.
 */
export function AnatomyDoc({ step }: { step: number }) {
  const reduce = useReducedMotion();
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [offsets, setOffsets] = useState<number[]>([0, 0, 0, 0]);

  useLayoutEffect(() => {
    const measure = () => setOffsets(refs.current.map((el) => (el ? el.offsetTop : 0)));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const sec = (i: number) => clsx("transition-opacity duration-700", i === step ? "opacity-100" : "opacity-30");

  return (
    <Stage field="pine" className="h-full w-full">
      <div className="absolute inset-x-4 top-4 bottom-0 overflow-hidden sm:inset-x-10 sm:top-8">
        <motion.div
          className="ui-card rounded-b-none p-5 sm:p-6"
          animate={{ y: -Math.max(0, (offsets[step] ?? 0) - 20) }}
          transition={reduce ? { duration: 0 } : { duration: 0.9, ease: EASE }}
        >
          {/* Headline */}
          <div ref={(el) => { refs.current[0] = el; }} className={sec(0)}>
            <div className="flex items-center justify-between">
              <span className="t-ui text-[10.5px] text-ink/50">Market catalyst · Data center power</span>
              <Pill tone="pine">Bullish</Pill>
            </div>
            <p className="mt-3 font-display text-[21px] font-semibold leading-tight text-ink sm:text-[24px]">AI data center power buildout accelerates</p>
            <p className="mt-2 text-[12.5px] leading-snug text-ink/60">Hyperscaler demand is pulling grid, cooling and generation spend forward, tightening supply across the power chain.</p>
            <div className="mt-3 h-14 text-pine-500">
              <Sparkline points={series(40, 5, 0.6, 2)} className="h-full w-full" fill="rgb(62 92 80 / 0.12)" />
            </div>
          </div>

          {/* Takeaways */}
          <div ref={(el) => { refs.current[1] = el; }} className={clsx("mt-6 border-t border-ink/8 pt-5", sec(1))}>
            <div className="flex items-center justify-between">
              <span className="font-display text-[15px] font-semibold text-ink">5 key takeaways</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink/40">Tagged to themes</span>
            </div>
            <ol className="mt-3 space-y-1.5">
              {TAKEAWAYS.map((x, i) => (
                <li key={x.t} className="flex items-center gap-3 rounded-md bg-white/70 px-3 py-2">
                  <span className="font-mono text-[10px] text-ink/40">{i + 1}</span>
                  <span className="min-w-0 flex-1 truncate font-display text-[12.5px] font-medium text-ink">{x.t}</span>
                  <span className="hidden shrink-0 rounded-full bg-pine-100 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.04em] text-pine-700 sm:inline">{x.tag}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Ripple */}
          <div ref={(el) => { refs.current[2] = el; }} className={clsx("mt-6 border-t border-ink/8 pt-5", sec(2))}>
            <div className="flex items-center justify-between">
              <span className="font-display text-[15px] font-semibold text-ink">Graph ripple effects</span>
              <Pill tone="lake">Ranked</Pill>
            </div>
            <ul className="mt-3 space-y-1.5">
              {RIPPLE.map((x, i) => (
                <li key={x.n} className="flex items-center gap-3 rounded-md bg-white/70 px-3 py-2">
                  <span className="w-[92px] shrink-0 truncate font-display text-[12.5px] font-semibold text-ink sm:w-[110px]">{x.n}</span>
                  <span className="min-w-0 flex-1 truncate text-[11.5px] text-ink/55">{x.r}</span>
                  <span className="hidden font-mono text-[9.5px] uppercase text-ink/40 sm:inline">{x.h}</span>
                  <span className="h-1 w-12 shrink-0 overflow-hidden rounded-full bg-ink/8">
                    <motion.span
                      className="block h-full bg-pine-500"
                      initial={false}
                      animate={{ width: step === 2 || reduce ? `${x.w * 100}%` : "0%" }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.9, ease: EASE }}
                    />
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/40">Exposure · US 62% · Europe 21% · Asia 17%</p>
          </div>

          {/* Ask Alfred */}
          <div ref={(el) => { refs.current[3] = el; }} className={clsx("mt-6 border-t border-ink/8 pt-5", sec(3))}>
            <span className="flex items-center gap-2 font-display text-[15px] font-semibold text-ink">
              <AlfredGlyph className="h-4 w-4 text-lake-700" /> Ask Alfred
            </span>
            <div className="mt-3 rounded-lg border border-ink/10 bg-white p-3 text-[12.5px] text-ink/80">Which of these names has the most exposure to US grid interconnect delays?</div>
            <p className="t-ui mt-3 text-[10px] text-ink/40">Suggested follow-ups</p>
            <ul className="mt-2 space-y-1.5 text-[12px] text-ink/70">
              <li className="flex justify-between rounded-md border border-ink/8 bg-white/60 px-3 py-2">Compare utility capex plans for 2026 <span aria-hidden="true">→</span></li>
              <li className="flex justify-between rounded-md border border-ink/8 bg-white/60 px-3 py-2">Summarize regional exposure for the cohort <span aria-hidden="true">→</span></li>
            </ul>
            <div className="h-40" />
          </div>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-pine-900/50 to-transparent" />
    </Stage>
  );
}
