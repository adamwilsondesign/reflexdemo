"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Stage } from "@/components/product/ui";
import { ANNOUNCEMENTS, PRESS, formatNewsDate } from "./data";
import { Wordmark } from "./Wordmark";

const EASE = [0.16, 1, 0.3, 1] as const;
const FEED = PRESS.filter((p) => p.outlet);

/** Hero visual: a newsroom feed card where new coverage slides in, plus the latest announcement pinned. */
export function PressWire() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [head, setHead] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const t = setInterval(() => setHead((h) => (h + 1) % FEED.length), 2800);
    return () => clearInterval(t);
  }, [inView, reduce]);

  const rows = [0, 1, 2].map((i) => FEED[(head + i) % FEED.length]);
  const latest = ANNOUNCEMENTS[0];

  return (
    <div ref={ref}>
      <Stage field="lake" className="flex aspect-[5/6.6] w-full items-center justify-center p-[5%] sm:aspect-[5/4.3]">
        <div className="pointer-events-none absolute inset-0 bg-chart-dark opacity-60" />

        <div className="ui-card relative w-full max-w-[460px] overflow-hidden p-4">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold text-[#0d0d0d]">In the press</p>
            <p className="text-[12px] text-[#8f8f8f]">{PRESS.length} placements</p>
          </div>
          <ul className="relative mt-2 border-t border-black/10">
            <AnimatePresence initial={false} mode="popLayout">
              {rows.map((r) => (
                <motion.li
                  key={r.title}
                  layout={!reduce}
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="flex items-start gap-4 border-b border-black/10 py-2.5"
                >
                  <span className="flex w-[72px] shrink-0 pt-0.5 text-[#0d0d0d]">
                    <Wordmark outlet={r.outlet} format={r.format} size="sm" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="line-clamp-1 text-[14px] font-medium leading-[1.3] text-[#0d0d0d]">{r.title}</span>
                    <span className="mt-0.5 block text-[12px] text-[#8f8f8f]">
                      {r.format}
                      {r.date ? ` · ${formatNewsDate(r.date)}` : ""}
                    </span>
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <div className="pt-2.5">
            <p className="text-[12px] text-[#8f8f8f]">Announcement · {formatNewsDate(latest.date)}</p>
            <p className="mt-0.5 line-clamp-1 text-[14px] font-medium text-[#0d0d0d]">{latest.title}</p>
          </div>
        </div>
      </Stage>
    </div>
  );
}
