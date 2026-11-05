"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Stage } from "@/components/product/ui";

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
        <div className="ui-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-semibold">Your coverage</span>
            <span className="flex items-center gap-1.5 text-[12px] text-[#8f8f8f]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0d0d0d]" />
              Monitoring
            </span>
          </div>
          <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[13px]" aria-label="Names and themes followed (illustrative)">
            {FOLLOWING.map((f) => {
              const on = current.match.includes(f.id);
              return (
                <li key={f.id} className={clsx("transition-colors duration-500", on ? "font-medium text-[#0d0d0d]" : "text-[#8f8f8f]")}>
                  {"theme" in f ? f.label : f.id}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Connector */}
        <div className="relative mx-auto h-7 w-px bg-white/30" aria-hidden="true">
          {!reduce && (
            <motion.span
              key={head}
              className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white"
              initial={{ top: "-10%", opacity: 0 }}
              animate={{ top: "100%", opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          )}
        </div>

        {/* Arriving Insights */}
        <div className="ui-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-semibold">Insights</span>
            <span className="text-[12px] text-[#8f8f8f]">For you</span>
          </div>
          <ul className="relative mt-3 h-[300px] overflow-hidden border-t border-black/10 sm:h-[290px]">
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((it, i) => (
                <motion.li
                  key={it.key}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: i === 0 ? 1 : 0.7 - i * 0.2, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.85, ease: EASE }}
                  className="border-b border-black/10 py-3"
                >
                  <div className="flex items-center justify-between gap-2 text-[12px] text-[#8f8f8f]">
                    <span>{it.type}</span>
                    <span>{i === 0 ? "just now" : `${i * 12}m ago`}</span>
                  </div>
                  <p className="mt-0.5 text-[15px] font-medium leading-snug text-[#0d0d0d]">{it.title}</p>
                  <p className="mt-0.5 truncate text-[12px] text-[#5d5d5d]">{it.touches} · {it.dir}</p>
                  {i === 0 && (
                    <motion.p
                      initial={reduce ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <span className="mt-2 block rounded-[10px] bg-[#f9f9f9] px-3 py-2 text-[13px] leading-snug text-[#5d5d5d]">
                        <span className="font-medium text-[#0d0d0d]">Why you&rsquo;re seeing this:</span> {it.why}
                      </span>
                    </motion.p>
                  )}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
        <p className="mt-2 text-right text-[12px] text-white/55">Illustrative coverage</p>
      </div>
    </Stage>
  );
}
