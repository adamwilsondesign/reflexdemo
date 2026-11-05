"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Stage } from "@/components/product/ui";
import { PrecisionIcon } from "@/components/ui/PrecisionIcon";
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

  const rows = [0, 1, 2, 3].map((i) => FEED[(head + i) % FEED.length]);
  const latest = ANNOUNCEMENTS[0];

  return (
    <div ref={ref}>
      <Stage field="lake" className="aspect-[5/6.6] w-full sm:aspect-[5/4.3]">
        <div className="pointer-events-none absolute inset-0 bg-chart-dark opacity-60" />

        <div className="ui-card absolute left-[5%] right-[5%] top-[7%] overflow-hidden p-0 sm:left-[14%] sm:right-[6%]">
          <div className="flex items-center justify-between border-b border-ink/8 px-5 py-3.5">
            <p className="t-ui flex items-center gap-2 text-[10.5px] text-ink/60">
              <motion.span
                className="inline-block h-[7px] w-[7px] rounded-full bg-pine-500"
                animate={reduce ? undefined : { opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              In the press
            </p>
            <p className="t-ui text-[10.5px] text-ink/40">{PRESS.length} placements</p>
          </div>
          <ul className="relative">
            <AnimatePresence initial={false} mode="popLayout">
              {rows.map((r, i) => (
                <motion.li
                  key={r.title}
                  layout={!reduce}
                  initial={{ opacity: 0, y: -24, backgroundColor: "rgba(213,222,230,0.7)" }}
                  animate={{ opacity: i === 3 ? 0.45 : 1, y: 0, backgroundColor: "rgba(213,222,230,0)" }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.8, ease: EASE, backgroundColor: { duration: 1.6 } }}
                  className={"items-start gap-4 border-b border-ink/6 px-5 py-3.5 last:border-0 " + (i === 3 ? "hidden sm:flex" : "flex")}
                >
                  <span className="flex w-[78px] shrink-0 pt-0.5 text-ink">
                    <Wordmark outlet={r.outlet} format={r.format} size="sm" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="line-clamp-1 font-display text-[14px] font-semibold leading-[1.3] text-ink">{r.title}</span>
                    <span className="mt-1 block font-mono text-[10.5px] uppercase tracking-[0.04em] text-ink/45">
                      {r.format}
                      {r.date ? ` · ${formatNewsDate(r.date)}` : ""}
                    </span>
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1 }}
          className="absolute bottom-[6%] left-[5%] right-[5%] rounded-[14px] border border-white/15 bg-lake-900/85 p-5 text-paper shadow-[0_24px_48px_-24px_rgb(0_0_0/0.6)] backdrop-blur-md sm:right-[30%]"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="t-ui text-[10px] text-paper/55">Company announcement · {formatNewsDate(latest.date)}</p>
            <PrecisionIcon name="orbit" className="h-6 w-6 shrink-0 text-paper" />
          </div>
          <p className="mt-2.5 line-clamp-2 font-display text-[15px] font-semibold leading-[1.3]">{latest.title}</p>
        </motion.div>
      </Stage>
    </div>
  );
}
