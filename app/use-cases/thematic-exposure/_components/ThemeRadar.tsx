"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Stage } from "@/components/product/ui";
import { useLoop } from "../../_components/useLoop";
import { CONSTITUENTS, THEME } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

// polar layout: core names on the inner ring, less-obvious and risk names further out
const ANG = [-95, 25, 145, -30, 200, -140, 75, 115];
const SHORT = ["Rockwell", "Fanuc", "Keyence", "Teradyne", "Harmonic Drive", "Cognex", "Eaton", "Manpower"];
const RAD = [27, 27, 27, 41, 41, 41, 41, 42];
const pos = CONSTITUENTS.map((_, i) => {
  const a = (ANG[i] * Math.PI) / 180;
  return { x: 50 + Math.cos(a) * RAD[i] * 0.8, y: 50 + Math.sin(a) * RAD[i] * 0.92 };
});

/** Hero: a theme at the centre, constituents mapped by how directly they are exposed, evidence on hover of the loop. */
export function ThemeRadar() {
  const { ref, step, reduce } = useLoop(CONSTITUENTS.length, 2600, 3);
  const c = CONSTITUENTS[step];
  return (
    <Stage field="ink" className="p-4 sm:p-6">
      <div ref={ref} className="mx-auto w-full max-w-[560px]">
        <div className="relative aspect-[1/0.9] w-full">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
            {[27, 41].map((r) => (
              <ellipse key={r} cx={50} cy={50} rx={r * 0.8} ry={r * 0.92} stroke="rgb(255 255 255 / 0.1)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
            ))}
            {pos.map((p, i) => {
              const on = i === step;
              return (
                <motion.line
                  key={i}
                  x1={50}
                  y1={50}
                  x2={p.x}
                  y2={p.y}
                  stroke={on ? "#ffffff" : "rgb(255 255 255 / 0.25)"}
                  strokeWidth={on ? 1.5 : 1}
                  vectorEffect="non-scaling-stroke"
                  strokeDasharray={CONSTITUENTS[i].tier === "Core" ? undefined : "3 3"}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.08, ease: EASE }}
                />
              );
            })}
          </svg>

          {/* theme node */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-white px-2 text-center text-[12px] font-semibold leading-tight text-[#0d0d0d] sm:h-[100px] sm:w-[100px] sm:text-[13px]">{THEME}</span>
          </div>

          {CONSTITUENTS.map((k, i) => {
            const on = i === step;
            return (
              <motion.div
                key={k.ticker}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pos[i].x}%`, top: `${pos[i].y}%` }}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: reduce ? 0 : 0.8 + i * 0.08, ease: EASE }}
              >
                <span
                  className={clsx(
                    "block whitespace-nowrap rounded-[10px] border px-2 py-1 text-[12px] transition-colors duration-500 sm:px-2.5",
                    on ? "border-white bg-white font-medium text-[#0d0d0d]" : "border-white/15 bg-[#0d0d0d] text-white/75",
                  )}
                >
                  <span className="sm:hidden">{SHORT[i]}</span>
                  <span className="hidden sm:inline">{k.name.replace(" Systems", "")}</span>
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* evidence card */}
        <div className="mt-2">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={c.ticker} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.5, ease: EASE }} className="ui-card p-4">
              <div className="flex items-baseline justify-between gap-3">
                <span className="truncate text-[14px] font-semibold text-[#0d0d0d]">{c.name}</span>
                <span className="shrink-0 text-[13px] text-[#8f8f8f]">
                  {c.tier} · <span className="tabular-nums text-[#0d0d0d]">{c.score.toFixed(2)}</span>
                </span>
              </div>
              <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-[#5d5d5d]">
                {c.evidence[0].text} <span className="text-[#8f8f8f]">({c.evidence[0].source})</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Stage>
  );
}
