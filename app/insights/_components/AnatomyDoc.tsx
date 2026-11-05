"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CardHeader, Pill, Sparkline, Stage, series } from "@/components/product/ui";

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
  const frame = useRef<HTMLDivElement>(null);
  const doc = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState<number[]>([0, 0, 0, 0]);
  const [maxY, setMaxY] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      setOffsets(refs.current.map((el) => (el ? el.offsetTop : 0)));
      setMaxY(Math.max(0, (doc.current?.offsetHeight ?? 0) - (frame.current?.offsetHeight ?? 0)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const sec = (i: number) => clsx("transition-opacity duration-700", i === step ? "opacity-100" : "opacity-30");

  return (
    <Stage field="pine" className="h-full w-full">
      <div ref={frame} className="absolute inset-x-4 top-4 bottom-0 overflow-hidden sm:inset-x-10 sm:top-8">
        <motion.div
          ref={doc}
          className="ui-card rounded-b-none p-4 sm:p-5"
          animate={{ y: -Math.min(maxY, Math.max(0, (offsets[step] ?? 0) - 20)) }}
          transition={reduce ? { duration: 0 } : { duration: 0.9, ease: EASE }}
        >
          {/* Headline */}
          <div ref={(el) => { refs.current[0] = el; }} className={sec(0)}>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12px] text-[#8f8f8f]">Market catalyst · Data center power</span>
              <Pill>Bullish</Pill>
            </div>
            <p className="mt-1.5 text-[22px] font-semibold leading-tight text-[#0d0d0d] sm:text-[24px]">AI data center power buildout accelerates</p>
            <p className="mt-2 text-[13px] leading-snug text-[#5d5d5d]">Hyperscaler demand is pulling grid, cooling and generation spend forward, tightening supply across the power chain.</p>
            <div className="mt-3 h-12">
              <Sparkline points={series(40, 5, 0.6, 2)} className="h-full w-full" />
            </div>
          </div>

          {/* Takeaways */}
          <div ref={(el) => { refs.current[1] = el; }} className={clsx("mt-5 border-t border-black/10 pt-4", sec(1))}>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold">5 key takeaways</span>
              <span className="text-[12px] text-[#8f8f8f]">Tagged to themes</span>
            </div>
            <ol className="mt-2 divide-y divide-black/10">
              {TAKEAWAYS.map((x, i) => (
                <li key={x.t} className="flex items-baseline gap-3 py-2 text-[13px]">
                  <span className="w-3 tabular-nums text-[#8f8f8f]">{i + 1}</span>
                  <span className="min-w-0 flex-1 truncate text-[#0d0d0d]">{x.t}</span>
                  <span className="hidden shrink-0 text-[12px] text-[#8f8f8f] sm:inline">{x.tag}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Ripple */}
          <div ref={(el) => { refs.current[2] = el; }} className={clsx("mt-5 border-t border-black/10 pt-4", sec(2))}>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold">Graph ripple effects</span>
              <span className="text-[12px] text-[#8f8f8f]">Ranked</span>
            </div>
            <ul className="mt-2 divide-y divide-black/10">
              {RIPPLE.map((x) => (
                <li key={x.n} className="flex items-baseline gap-3 py-2 text-[13px]">
                  <span className="w-[100px] shrink-0 truncate font-medium text-[#0d0d0d] sm:w-[120px]">{x.n}</span>
                  <span className="min-w-0 flex-1 truncate text-[#5d5d5d]">{x.r}</span>
                  <span className="hidden text-[12px] text-[#8f8f8f] sm:inline">{x.h}</span>
                  <span className="w-8 text-right tabular-nums text-[#0d0d0d]">{x.w.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ask Alfred */}
          <div ref={(el) => { refs.current[3] = el; }} className={clsx("mt-5 border-t border-black/10 pt-4", sec(3))}>
            <CardHeader title="Ask Alfred" />
            <p className="mt-3 rounded-[10px] bg-[#f9f9f9] px-3 py-2 text-[13px] text-[#0d0d0d]">Which of these names has the most exposure to US grid interconnect delays?</p>
            <p className="mt-2 text-[13px] text-[#8f8f8f]">Compare utility capex plans for 2026 →</p>
            <div className="h-6" />
          </div>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-pine-900/50 to-transparent" />
    </Stage>
  );
}
