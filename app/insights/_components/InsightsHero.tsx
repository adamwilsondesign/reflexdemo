"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Pill, Stage } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const FOLLOWING = [
  { id: "VRT", label: "Vertiv" },
  { id: "SNY", label: "Sanofi" },
  { id: "NKE", label: "Nike" },
  { id: "LLY", label: "Eli Lilly" },
  { id: "MSFT", label: "Microsoft" },
  { id: "DCP", label: "Data center power", theme: true },
  { id: "GLP", label: "Obesity drugs", theme: true },
] as const;

type Item = {
  type: string;
  tone: "lake" | "pine" | "warn";
  title: string;
  why: string;
  match: string[];
  touches: string;
  dir: "Bullish" | "Bearish" | "Mixed";
};

const ITEMS: Item[] = [
  {
    type: "Market catalyst",
    tone: "lake",
    title: "AI data center power buildout accelerates",
    why: "You follow Vertiv and the Data center power theme",
    match: ["VRT", "DCP"],
    touches: "VRT · ETN · CEG · PWR",
    dir: "Bullish",
  },
  {
    type: "Company catalyst",
    tone: "lake",
    title: "Sanofi settles Regeneron dispute in expanded antibody pact",
    why: "Sanofi is on your watchlist",
    match: ["SNY"],
    touches: "SNY · REGN",
    dir: "Bullish",
  },
  {
    type: "Earnings recap",
    tone: "pine",
    title: "Guidance overshadowed a mixed Nike quarter",
    why: "Nike is on your watchlist · 4 peers you follow are referenced",
    match: ["NKE"],
    touches: "NKE · 4 peers",
    dir: "Bearish",
  },
  {
    type: "Scenario pattern",
    tone: "warn",
    title: "Eli Lilly: recession probability at a new low",
    why: "A backtested pattern reappeared on a name you follow",
    match: ["LLY", "GLP"],
    touches: "LLY",
    dir: "Mixed",
  },
];

/** Hero: Insights arriving for the names and themes a user follows, each with its "why you're seeing this" line. */
export function InsightsHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [head, setHead] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const iv = setInterval(() => setHead((h) => h + 1), 3400);
    return () => clearInterval(iv);
  }, [inView, reduce]);

  const current = ITEMS[head % ITEMS.length];
  const visible = [0, 1, 2].map((k) => ({ ...ITEMS[(((head - k) % ITEMS.length) + ITEMS.length) % ITEMS.length], key: head - k }));

  return (
    <Stage field="none" className="w-full p-1 sm:p-2">
      <div ref={ref} className="relative mx-auto flex max-w-[500px] flex-col">
        {/* Coverage panel */}
        <div className="rounded-[12px] border border-white/15 bg-white/[0.07] p-3.5 backdrop-blur-md sm:p-4">
          <div className="flex items-center justify-between text-white/80">
            <span className="t-ui text-[10.5px]">Your coverage</span>
            <span className="t-ui flex items-center gap-2 text-[10.5px]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              Monitoring
            </span>
          </div>
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Names and themes followed (illustrative)">
            {FOLLOWING.map((f) => {
              const on = current.match.includes(f.id);
              return (
                <li
                  key={f.id}
                  className={clsx(
                    "relative rounded-full border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.04em] transition-[background-color,border-color,color] duration-500",
                    "theme" in f ? "border-dashed" : "",
                    on ? "border-white bg-white text-lake-900" : "border-white/25 text-white/75",
                  )}
                >
                  {"theme" in f ? f.label : f.id}
                  {on && !reduce && (
                    <motion.span
                      className="absolute inset-0 rounded-full border border-white"
                      initial={{ opacity: 0.8, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.35 }}
                      transition={{ duration: 1.2, ease: EASE }}
                      key={head}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Connector */}
        <div className="relative mx-auto h-7 w-px bg-white/25" aria-hidden="true">
          {!reduce && (
            <motion.span
              key={head}
              className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_12px_rgb(255_255_255/0.8)]"
              initial={{ top: "-10%", opacity: 0 }}
              animate={{ top: "100%", opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          )}
        </div>

        {/* Arriving Insights */}
        <div className="relative h-[372px] overflow-hidden sm:h-[396px]">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((it, i) => (
              <motion.article
                key={it.key}
                layout
                initial={{ opacity: 0, y: -26, scale: 0.97 }}
                animate={{ opacity: i === 0 ? 1 : 0.82 - i * 0.18, y: 0, scale: 1 - i * 0.02 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.85, ease: EASE }}
                className="ui-card mb-2.5 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <Pill tone={it.tone}>{it.type}</Pill>
                  <span className="font-mono text-[10px] text-ink/40">{i === 0 ? "just now" : `${i * 12}m ago`}</span>
                </div>
                <p className="mt-2.5 font-display text-[15px] font-semibold leading-snug text-ink sm:text-[16px]">{it.title}</p>
                <div className="mt-2 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.04em] text-ink/50">
                  <span className="truncate">Touches {it.touches}</span>
                  <span className={clsx("shrink-0", it.dir === "Bullish" ? "text-pine-500" : it.dir === "Bearish" ? "text-[#9a4b3c]" : "text-ink/55")}>{it.dir}</span>
                </div>
                {i === 0 && (
                  <motion.p
                    initial={reduce ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <span className="mt-3 flex items-start gap-2 rounded-md bg-lake-100/70 px-2.5 py-2 text-[11.5px] leading-snug text-lake-700">
                      <svg viewBox="0 0 16 16" className="mt-[1px] h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                        <circle cx="8" cy="8" r="6.2" />
                        <path d="M8 7.2v3.6M8 5v.2" strokeLinecap="round" />
                      </svg>
                      <span>
                        <span className="font-semibold">Why you&rsquo;re seeing this:</span> {it.why}
                      </span>
                    </span>
                  </motion.p>
                )}
              </motion.article>
            ))}
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-lake-900/60 to-transparent" />
        </div>
        <p className="t-ui mt-1 text-right text-[10px] text-white/45">Illustrative coverage</p>
      </div>
    </Stage>
  );
}
