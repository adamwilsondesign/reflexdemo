"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Stage } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const LANES = [
  { k: "Sales", s: "Sales", to: "Demo team" },
  { k: "Partnerships", s: "Partner", to: "Partnerships" },
  { k: "Support", s: "Support", to: "Help Center" },
  { k: "Press", s: "Press", to: "Communications" },
  { k: "Security", s: "Security", to: "Security review" },
] as const;

const MESSAGES = [
  { text: "We’d like to see Reflexivity on our own watchlist.", lane: 0 },
  { text: "Could we embed the Knowledge Graph in our client portal?", lane: 1 },
  { text: "Our security team needs your due-diligence pack.", lane: 4 },
  { text: "Interview request about AI in asset management.", lane: 3 },
  { text: "How do I add a teammate to our workspace?", lane: 2 },
];

/** Hero visual: an incoming message is read and routed to the right team. */
export function RouteVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [routed, setRouted] = useState(!!reduce);

  useEffect(() => {
    if (!inView || reduce) return;
    setRouted(false);
    const a = setTimeout(() => setRouted(true), 1400);
    const b = setTimeout(() => setI((x) => (x + 1) % MESSAGES.length), 3800);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [i, inView, reduce]);

  const m = MESSAGES[i];

  return (
    <Stage field="lake" className="p-4 sm:p-7 md:p-8">
      <div ref={ref}>
        <div className="mb-4 flex items-center justify-between text-white/80">
          <span className="t-ui">Inbound</span>
          <span className="t-ui flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" /> Routed to a person
          </span>
        </div>

        <div className="grid">
          <AnimatePresence initial={false}>
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="ui-card p-4 [grid-area:1/1] sm:p-5"
            >
              <div className="flex items-center justify-between">
                <span className="t-ui text-ink/50">New message</span>
                <span className="font-mono text-[10px] text-ink/40">just now</span>
              </div>
              <p className="mt-2.5 font-display text-[15px] font-medium leading-snug text-ink sm:text-[16.5px]">{m.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <svg viewBox="0 0 500 44" preserveAspectRatio="none" className="h-11 w-full" aria-hidden="true">
          {LANES.map((_, k) => {
            const x = 50 + k * 100;
            const on = routed && k === m.lane;
            return (
              <path
                key={k}
                d={`M250 0 C 250 22, ${x} 22, ${x} 44`}
                fill="none"
                stroke={on ? "#fff" : "rgb(255 255 255 / 0.22)"}
                strokeWidth={on ? 1.8 : 1}
                vectorEffect="non-scaling-stroke"
                style={{ transition: "stroke 0.5s, stroke-width 0.5s" }}
              />
            );
          })}
        </svg>

        <ul className="grid grid-cols-5 gap-1 sm:gap-1.5">
          {LANES.map((l, k) => {
            const on = routed && k === m.lane;
            return (
              <li
                key={l.k}
                className={clsx(
                  "rounded-[10px] border px-1.5 py-2.5 text-center transition-all duration-500 sm:px-2",
                  on ? "border-white bg-white text-ink shadow-[0_10px_30px_-10px_rgb(0_0_0/0.5)]" : "border-white/20 bg-white/[0.06] text-white/75",
                )}
              >
                <span className="block font-display text-[10px] font-semibold leading-tight sm:text-[12.5px]">
                  <span className="sm:hidden">{l.s}</span>
                  <span className="hidden sm:inline">{l.k}</span>
                </span>
                <span className={clsx("mt-1 hidden font-mono text-[9px] uppercase tracking-[0.04em] sm:block", on ? "text-ink/50" : "text-white/45")}>{l.to}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </Stage>
  );
}
