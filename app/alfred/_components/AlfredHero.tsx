"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CardHeader, Pill, useTypewriter } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const PROMPTS = [
  {
    trail: ["Ecosystem", "AAPL"],
    text: "Map AAPL’s ecosystem and find the hidden beneficiaries.",
    result: "12 potential beneficiaries",
    tags: ["Hardware", "Software", "Supply chain"],
  },
  {
    trail: ["Earnings", "NFLX"],
    text: "What changed in NFLX management’s tone relative to the prior 4 earnings calls, and what does it signal?",
    result: "3 shifts in management tone",
    tags: ["Guidance", "Advertising", "Margins"],
  },
  {
    trail: ["Counter-thesis", "General"],
    text: "Stress-test my thesis: what breaks it, and what should I watch?",
    result: "2 key risks identified",
    tags: ["Valuation", "Demand", "Watch dates"],
  },
];

const ALERTS = [
  { type: "Market catalyst", title: "AI data center power buildout accelerates", touch: "VRT, ETN in your watchlist" },
  { type: "Earnings recap", title: "Guidance overshadowed a mixed Nike quarter", touch: "NKE and 4 peers you follow" },
];

/**
 * Hero product visual: Alfred's two modes in one loop.
 * On-demand: a prompt types, runs, and returns a result. Always-on: an alert arrives unprompted.
 */
export function AlfredHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<"typing" | "result" | "alert">(reduce ? "result" : "typing");

  const p = PROMPTS[i % PROMPTS.length];
  const typed = useTypewriter(p.text, { start: inView && phase === "typing", speed: 24, delay: 300 });
  const done = typed.length >= p.text.length;

  useEffect(() => {
    if (reduce || !inView) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing" && done) t = setTimeout(() => setPhase("result"), 700);
    else if (phase === "result") t = setTimeout(() => setPhase(i % 2 === 0 ? "alert" : "typing"), 2600);
    else if (phase === "alert") t = setTimeout(() => setPhase("typing"), 3400);
    return () => clearTimeout(t);
  }, [phase, done, inView, reduce, i]);

  // advance prompt when re-entering typing
  const prevPhase = useRef(phase);
  useEffect(() => {
    if (prevPhase.current !== "typing" && phase === "typing") setI((n) => n + 1);
    prevPhase.current = phase;
  }, [phase]);

  const alert = ALERTS[Math.floor(i / 2) % ALERTS.length];
  const alwaysOn = phase === "alert";

  return (
    <div ref={ref} className="pui relative isolate overflow-hidden rounded-[18px] p-1 sm:p-2">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-40" />
      {/* mode switch */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="relative flex rounded-[10px] border border-black/10 bg-white p-0.5 text-[13px]" aria-hidden="true">
          {["On-demand", "Always-on"].map((m, k) => {
            const on = (k === 1) === alwaysOn;
            return (
              <span key={m} className={clsx("relative z-10 px-3 py-1 transition-colors duration-500", on ? "font-medium text-[#0d0d0d]" : "text-[#8f8f8f]")}>
                {on && <motion.span layoutId="alfred-mode" className="absolute inset-0 -z-10 rounded-[8px] bg-[#f9f9f9]" transition={{ duration: 0.6, ease: EASE }} />}
                {m}
              </span>
            );
          })}
        </div>
        <span className="hidden items-center gap-1.5 text-[13px] text-white/75 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          Watching 42 names
        </span>
      </div>

      <div className="relative min-h-[360px] sm:min-h-[330px]">
        {/* prompt */}
        <motion.div
          animate={{ opacity: alwaysOn ? 0.5 : 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="ui-card relative z-10 p-4"
        >
          <CardHeader trail={p.trail.slice(-1)} />
          <p className="mt-3 min-h-[4.4em] text-[16px] leading-[1.45] text-[#0d0d0d] sm:min-h-[2.9em]">
            {phase === "typing" ? typed : p.text}
            {phase === "typing" && !done && <span className="animate-blink ml-0.5 inline-block h-[1em] w-px translate-y-[2px] bg-[#0d0d0d]" />}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[13px] text-[#8f8f8f]">
              {phase === "typing" ? (done ? "Resolving entities…" : "Drafting question") : "8 sources, cited"}
            </span>
            <span className={clsx("rounded-[10px] border bg-white px-3 py-1 text-[13px] font-medium text-[#0d0d0d] transition-colors duration-300", phase === "typing" && done ? "border-black/30" : "border-black/10")}>Ask</span>
          </div>
        </motion.div>

        {/* result */}
        <div className="relative mt-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {phase !== "typing" && (
              <motion.div
                key={"r" + i}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: alwaysOn ? 0.5 : 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="ui-card p-4"
              >
                <p className="text-[13px] text-[#8f8f8f]">Analysis complete</p>
                <p className="mt-1 text-[24px] font-semibold leading-tight text-[#0d0d0d]">{p.result}</p>
                <p className="mt-2 text-[13px] text-[#5d5d5d]">{p.tags.join(" · ")}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* always-on alert */}
        <AnimatePresence>
          {alwaysOn && (
            <motion.div
              key={"a" + i}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="absolute inset-x-3 top-14 z-20 sm:inset-x-8"
              role="status"
            >
              <div className="ui-card border-black/20 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-[13px] text-[#5d5d5d]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0d0d0d]" />
                    New insight
                  </span>
                  <Pill>{alert.type}</Pill>
                </div>
                <p className="mt-2 text-[18px] font-semibold leading-snug text-[#0d0d0d]">{alert.title}</p>
                <p className="mt-1.5 text-[13px] text-[#5d5d5d]">Touches {alert.touch}</p>
                <span className="mt-3 inline-block rounded-[10px] border border-black/10 bg-white px-3 py-1 text-[13px] font-medium text-[#0d0d0d]">Open in Alfred</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
