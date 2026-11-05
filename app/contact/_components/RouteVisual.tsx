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
        <div className="mb-4 flex items-center justify-between text-[13px] text-white/80">
          <span>Inbound</span>
          <span>Routed to a person</span>
        </div>

        <div className="grid">
          <AnimatePresence initial={false}>
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="ui-card p-4 [grid-area:1/1]"
            >
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-semibold text-[#0d0d0d]">New message</span>
                <span className="text-[#8f8f8f]">just now</span>
              </div>
              <p className="mt-2 text-[15px] leading-snug text-[#0d0d0d] sm:text-[16px]">{m.text}</p>
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

        <ul className="ui-card grid grid-cols-5 divide-x divide-black/10 overflow-hidden p-0">
          {LANES.map((l, k) => {
            const on = routed && k === m.lane;
            return (
              <li
                key={l.k}
                className={clsx(
                  "flex flex-col items-center gap-1.5 px-1 py-3 text-center text-[11px] leading-tight transition-colors duration-500 sm:text-[13px]",
                  on ? "font-semibold text-[#0d0d0d]" : "text-[#8f8f8f]",
                )}
              >
                <span className={clsx("h-1.5 w-1.5 rounded-full bg-[#0d0d0d] transition-opacity duration-500", on ? "opacity-100" : "opacity-0")} />
                <span className="sm:hidden">{l.s}</span>
                <span className="hidden sm:inline">{l.k}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </Stage>
  );
}
