"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Pill, Stage } from "@/components/product/ui";
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

// faint background constituents: the long tail of the theme
let seed = 7;
const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
const MINOR = Array.from({ length: 34 }, () => {
  const a = rnd() * Math.PI * 2;
  const r = 14 + rnd() * 34;
  return { x: 50 + Math.cos(a) * r * 0.8, y: 50 + Math.sin(a) * r * 0.92, s: 0.5 + rnd() * 0.7 };
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
          {MINOR.map((m, i) => (
            <g key={`m${i}`}>
              <line x1={50} y1={50} x2={m.x} y2={m.y} stroke="rgb(244 243 241 / 0.05)" strokeWidth={0.5} vectorEffect="non-scaling-stroke" />
              <ellipse cx={m.x} cy={m.y} rx={m.s * 0.55} ry={m.s * 0.5} fill="rgb(244 243 241 / 0.28)" />
            </g>
          ))}
          {[27, 41].map((r) => (
            <ellipse key={r} cx={50} cy={50} rx={r * 0.8} ry={r * 0.92} stroke="rgb(244 243 241 / 0.12)" strokeWidth={0.25} strokeDasharray="0.6 1.2" vectorEffect="non-scaling-stroke" />
          ))}
          {pos.map((p, i) => {
            const risk = CONSTITUENTS[i].tier === "Risk";
            const on = i === step;
            return (
              <motion.line
                key={i}
                x1={50}
                y1={50}
                x2={p.x}
                y2={p.y}
                stroke={risk ? "#c07a6a" : on ? "#d5e0da" : "rgb(244 243 241 / 0.3)"}
                strokeWidth={on ? 2 : 0.6 + CONSTITUENTS[i].score}
                vectorEffect="non-scaling-stroke"
                strokeDasharray={CONSTITUENTS[i].tier === "Core" ? undefined : "3 3"}
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, delay: 0.5 + i * 0.08, ease: EASE }}
              />
            );
          })}
        </svg>

        {/* theme node */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="absolute inset-0 -m-3 rounded-full border border-pine-300/40" aria-hidden="true" />
          {!reduce && <span className="animate-pulse-ring absolute inset-0 rounded-full border border-pine-300/50" aria-hidden="true" />}
          <span className="relative flex h-[84px] w-[84px] flex-col items-center justify-center rounded-full bg-pine-500 text-center sm:h-[104px] sm:w-[104px]">
            <span className="font-mono text-[8px] uppercase tracking-[0.06em] text-paper/70 sm:text-[9px]">Theme</span>
            <span className="mt-0.5 px-2 font-display text-[11px] font-semibold leading-tight text-paper sm:text-[13px]">{THEME}</span>
          </span>
        </div>

        {CONSTITUENTS.map((k, i) => {
          const on = i === step;
          const risk = k.tier === "Risk";
          return (
            <motion.div
              key={k.ticker}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos[i].x}%`, top: `${pos[i].y}%` }}
              initial={reduce ? false : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: on ? 1.08 : 1 }}
              transition={{ duration: 0.6, delay: reduce ? 0 : on ? 0 : 0.8 + i * 0.08, ease: EASE }}
            >
              <span
                className={clsx(
                  "flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-1 font-display text-[10px] font-semibold transition-colors duration-500 sm:px-2.5 sm:text-[11.5px]",
                  on ? (risk ? "border-[#c07a6a] bg-[#f3e1dc] text-[#6e3328]" : "border-paper bg-paper text-ink") : risk ? "border-[#c07a6a]/60 bg-ink text-[#e2b3a8]" : "border-white/20 bg-[#20242a] text-paper/85",
                )}
              >
                <span className={clsx("h-1.5 w-1.5 rounded-full", risk ? "bg-[#c07a6a]" : k.tier === "Core" ? "bg-pine-300" : "bg-lake-300")} />
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
            <motion.div key={c.ticker} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.5, ease: EASE }} className="ui-card p-3.5 sm:p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-display text-[13.5px] font-semibold text-ink">{c.name}</span>
                <Pill tone={c.tier === "Risk" ? "warn" : c.tier === "Core" ? "pine" : "lake"}>{c.tier === "Risk" ? "Exposed · risk" : c.tier}</Pill>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase text-ink/45">Exposure</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/8">
                  <motion.span className={clsx("block h-full", c.tier === "Risk" ? "bg-[#9a4b3c]" : "bg-pine-500")} initial={{ width: 0 }} animate={{ width: `${c.score * 100}%` }} transition={{ duration: 0.8, ease: EASE }} />
                </span>
                <span className="font-mono text-[11px] text-ink">{c.score.toFixed(2)}</span>
              </div>
              <p className="mt-2 line-clamp-2 text-[11.5px] leading-relaxed text-ink/65">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-lake-700">Evidence · </span>
                {c.evidence[0].text} <span className="text-ink/40">({c.evidence[0].source})</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Stage>
  );
}
