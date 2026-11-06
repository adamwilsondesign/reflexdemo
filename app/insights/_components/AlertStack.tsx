"use client";

import { AnimatePresence, motion } from "motion/react";
import { MOTION_EASE, useCycle } from "@/components/product/motion";

const ALERTS = [
  { type: "Market catalyst", title: "AI data center power buildout accelerates", touch: "VRT, ETN, CEG" },
  { type: "Company catalyst", title: "Sanofi settles Regeneron dispute", touch: "SNY, REGN" },
  { type: "Earnings recap", title: "Guidance overshadowed a mixed Nike quarter", touch: "NKE" },
  { type: "Scenario pattern", title: "Eli Lilly: recession probability at a new low", touch: "LLY" },
] as const;

const SHOWN = 3;

/** Alerts arrive one at a time, like notifications. The stack keeps a fixed height. */
export function AlertStack() {
  const [i, ref] = useCycle(ALERTS.length, { ms: 4800, finalForReduced: 0 });
  const visible = Array.from({ length: SHOWN }, (_, k) => ({ n: i - k, ...ALERTS[(((i - k) % ALERTS.length) + ALERTS.length) % ALERTS.length] }));

  return (
    <div ref={ref} className="pui relative mx-auto h-[360px] w-full max-w-[440px] overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout">
        {visible.map((a, k) => (
          <motion.div
            key={a.n}
            layout
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.6, ease: MOTION_EASE }}
            className="ui-card mb-4 flex h-[104px] items-start gap-3 p-4"
          >
            <span className={k === 0 ? "mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#0d0d0d]" : "mt-1.5 h-2 w-2 shrink-0 rounded-full bg-black/15"} />
            <span className="min-w-0 flex-1 transition-opacity duration-700" style={{ opacity: k === 0 ? 1 : 0.55 }}>
              <span className="flex justify-between text-[12px] text-[#8f8f8f]"><span>{a.type}</span><span>{k === 0 ? "now" : `${k * 9}m`}</span></span>
              <span className="mt-1 block truncate text-[15px] font-semibold leading-6 text-[#0d0d0d]">{a.title}</span>
              <span className="mt-1 block text-[13px] text-[#5d5d5d]">{a.touch}</span>
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
