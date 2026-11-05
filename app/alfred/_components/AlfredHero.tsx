"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AlfredGlyph, CardHeader, Pill, useTypewriter } from "@/components/product/ui";

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
  const others = [PROMPTS[(i + 1) % PROMPTS.length], PROMPTS[(i + 2) % PROMPTS.length]];

  return (
    <div ref={ref} className="relative isolate overflow-hidden rounded-[18px] p-1 sm:p-2">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-40" />
      {/* mode switch */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="relative flex rounded-full bg-white/10 p-1 font-mono text-[10.5px] uppercase tracking-[0.06em] text-white/70 backdrop-blur" aria-hidden="true">
          {["On-demand", "Always-on"].map((m, k) => {
            const on = (k === 1) === alwaysOn;
            return (
              <span key={m} className={clsx("relative z-10 px-3 py-1.5 transition-colors duration-500", on && "text-ink")}>
                {on && <motion.span layoutId="alfred-mode" className="absolute inset-0 -z-10 rounded-full bg-paper" transition={{ duration: 0.6, ease: EASE }} />}
                {m}
              </span>
            );
          })}
        </div>
        <span className="t-ui hidden items-center gap-2 text-[10px] text-white/70 sm:flex">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-50" /><span className="relative h-2 w-2 rounded-full bg-white" /></span>
          Watching 42 names
        </span>
      </div>

      <div className="relative min-h-[380px] sm:min-h-[350px]">
        {/* front prompt card */}
        <motion.div
          animate={{ scale: alwaysOn ? 0.96 : 1, opacity: alwaysOn ? 0.55 : 1, y: alwaysOn ? 14 : 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="ui-card relative z-10 p-4 sm:p-5"
        >
          <CardHeader trail={p.trail} right={<span className="font-mono text-[14px] leading-none text-ink/35">•••</span>} />
          <p className="mt-4 min-h-[4.2em] font-display text-[16px] font-medium leading-snug text-ink sm:min-h-[2.8em] sm:text-[18px]">
            {phase === "typing" ? typed : p.text}
            {phase === "typing" && !done && <span className="animate-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-lake-700" />}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-ink/8 pt-3">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.05em] text-ink/50">
              {phase === "typing" ? (done ? "Resolving entities…" : "Drafting question") : "8 sources · cited"}
            </span>
            <span className={clsx("inline-flex items-center gap-2 rounded-md px-3.5 py-1.5 font-display text-[12.5px] font-medium text-white transition-colors duration-300", phase === "typing" && done ? "bg-lake-900" : "bg-lake-700")}>
              Ask Alfred
              <svg viewBox="0 0 14 12" className="h-2.5 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M0 6h12M7.5 1.5L12 6l-4.5 4.5" /></svg>
            </span>
          </div>
        </motion.div>

        {/* result / queued prompts */}
        <div className="relative mt-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {phase !== "typing" ? (
              <motion.div
                key={"r" + i}
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: alwaysOn ? 0.55 : 1, y: alwaysOn ? 14 : 0, scale: alwaysOn ? 0.96 : 1 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="ui-card p-4 sm:p-5"
              >
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.06em] text-lake-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-lake-700" /> Alfred <span className="text-ink/30">/</span> Analysis complete
                </p>
                <p className="mt-3 font-display text-[22px] font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-[26px]">{p.result}</p>
                <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-ink/65">
                  {p.tags.map((t, k) => (
                    <span key={t} className="flex items-center gap-3">
                      {k > 0 && <span className="text-ink/25">·</span>}
                      {t}
                    </span>
                  ))}
                </p>
              </motion.div>
            ) : (
              <motion.div key={"q" + i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="space-y-2.5">
                {others.map((o, k) => (
                  <div key={o.text} className={clsx("rounded-[12px] border border-white/25 bg-white/35 px-4 py-3 backdrop-blur-md", k === 1 && "mx-4 opacity-70 sm:mx-6")}>
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-lake-900/70">{o.trail[1]}</span>
                    <p className="mt-1 truncate font-display text-[14px] font-medium text-ink/80">{o.text}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* always-on alert */}
        <AnimatePresence>
          {alwaysOn && (
            <motion.div
              key={"a" + i}
              initial={{ opacity: 0, y: -40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.97 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="absolute inset-x-2 top-16 z-20 sm:inset-x-8"
              role="status"
            >
              <div className="ui-card bg-[#f6f5f3] p-4 shadow-[0_30px_60px_-20px_rgb(15_25_40/0.55)] backdrop-blur-none sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <AlfredGlyph className="h-4 w-4 text-pine-500" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink/55">New Insight · unprompted</span>
                  </span>
                  <Pill tone={alert.type.includes("Earnings") ? "pine" : "lake"}>{alert.type}</Pill>
                </div>
                <p className="mt-3 font-display text-[18px] font-semibold leading-snug text-ink sm:text-[20px]">{alert.title}</p>
                <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.04em] text-ink/50">Why you’re seeing this: touches {alert.touch}</p>
                <div className="mt-4 flex gap-2">
                  <span className="rounded-md bg-lake-700 px-3 py-1.5 font-display text-[12px] font-medium text-white">Open in Alfred</span>
                  <span className="rounded-md border border-ink/12 px-3 py-1.5 font-display text-[12px] font-medium text-ink/70">5 takeaways</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
