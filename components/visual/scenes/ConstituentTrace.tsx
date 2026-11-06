"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, CiteChip, Cursor, Glyph, Icon, RX_EASE, useTimeline } from "@/components/visual/kit";

/**
 * Thematic Exposure — hero, "Find the names you're missing".
 * Composition: a constituents table with exposure bars. The cursor asks for
 * second-order names; they slide in under the obvious ones, and one row's
 * evidence opens in a popover.
 */
const CORE = [
  { n: "Rockwell Automation", t: "ROK", e: 0.93 },
  { n: "Fanuc", t: "6954", e: 0.91 },
  { n: "Keyence", t: "6861", e: 0.86 },
];
const FOUND = [
  { n: "Cognex", t: "CGNX", e: 0.71, via: "Machine vision" },
  { n: "Harmonic Drive", t: "6324", e: 0.66, via: "Robot joints" },
  { n: "Teradyne", t: "TER", e: 0.58, via: "Collaborative robots" },
];

// 0 core · 1 move · 2 press · 3 tracing · 4 found · 5 to evidence · 6 popover · 7 hold
const D = [2000, 900, 400, 1100, 2000, 900, 3400, 700];
const ROW = 46;

export function ConstituentTrace() {
  const { p, ref, cycle } = useTimeline(D, { still: 6 });
  const found = p >= 4;
  const pop = p === 6;
  const cursor =
    p === 0 ? { x: 560, y: 500, visible: false } :
    p <= 3 ? { x: 160, y: 296, visible: p < 3 } :
    { x: 503, y: 347, visible: p >= 5 && p <= 6 };

  return (
    <div ref={ref}>
      <Canvas w={560} h={480}>
        <motion.div key={cycle} className="rx-card rx-card-lift absolute left-[30px] top-[30px] w-[500px] px-5 pb-4 pt-5" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
          <p className="flex items-center gap-2 text-[11px] font-medium text-[var(--rx-3)]"><Glyph kind="theme" size={12} />Theme</p>
          <div className="mt-1 flex items-baseline justify-between">
            <p className="rx-serif text-[21px] leading-[28px]">Industrial automation</p>
            <motion.span className="rx-num text-[11px] text-[var(--rx-3)]" key={found ? "6" : "3"} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{found ? 6 : 3} constituents</motion.span>
          </div>

          <div className="mt-4 grid grid-cols-[1fr_120px_56px] border-b border-[var(--rx-line)] pb-2 text-[10.5px] font-medium text-[var(--rx-3)]">
            <span>Company</span><span>Exposure</span><span className="text-right">Evidence</span>
          </div>
          {CORE.map((r, i) => <Row key={r.n} {...r} c={i + 1} show />)}

          <motion.div className="overflow-hidden" initial={false} animate={{ height: found ? ROW * 3 : 0 }} transition={{ duration: 0.7, ease: RX_EASE }}>
            {FOUND.map((r, i) => <Row key={r.n} {...r} c={i + 4} show={found} delay={0.25 + i * 0.14} active={pop && i === 1} />)}
          </motion.div>

          <motion.div className="mt-3 flex h-9 items-center justify-center gap-2 rounded-[9px] text-[12px] font-medium" initial={false} animate={{ backgroundColor: p >= 2 && p <= 3 ? "#e9eef2" : "#f4f3f0" }}>
            {p === 3 ? (
              <span className="flex items-center gap-2 text-[#3e5368]">
                <motion.span className="h-3 w-3 rounded-full border-[1.5px] border-[#3e5368] border-t-transparent" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} />
                Tracing the Knowledge Graph
              </span>
            ) : found ? (
              <span className="flex items-center gap-1.5 text-[var(--rx-up)]"><Icon name="check" size={13} />3 second-order names added</span>
            ) : (
              <span className="flex items-center gap-1.5"><Icon name="graph" size={13} />Find second-order names</span>
            )}
          </motion.div>

          <AnimatePresence>
            {pop && (
              <motion.div className="rx-card absolute right-[18px] top-[330px] z-20 w-[236px] p-3.5" initial={{ opacity: 0, y: 6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.4, ease: RX_EASE, delay: 0.15 }}>
                <p className="flex items-center text-[11px] text-[var(--rx-3)]">Evidence<CiteChip n={5} active /></p>
                <p className="mt-1 text-[12.5px] leading-[18px]">Strain-wave gears sit in the joints of most industrial robot arms.</p>
                <p className="mt-1.5 text-[10.5px] text-[var(--rx-3)]">Annual report · Business overview</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <Cursor {...cursor} press={p === 2} />
      </Canvas>
    </div>
  );
}

function Row({ n, t, e, via, c, show, delay = 0, active = false }: { n: string; t: string; e: number; via?: string; c: number; show: boolean; delay?: number; active?: boolean }) {
  return (
    <motion.div className="grid h-[46px] grid-cols-[1fr_120px_56px] items-center border-b border-[var(--rx-line)]" initial={false} animate={{ opacity: show ? 1 : 0, y: show ? 0 : 8 }} transition={{ delay: show ? delay : 0, duration: 0.5, ease: RX_EASE }}>
      <span className="flex min-w-0 items-center gap-2.5">
        <Glyph kind="company" size={10} className={via ? "text-[#3e5c50]" : "text-[var(--rx-3)]"} />
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-medium leading-4">{n} <span className="rx-num ml-1 text-[10.5px] font-normal text-[var(--rx-3)]">{t}</span></span>
          {via && <span className="block text-[10.5px] leading-4 text-[var(--rx-up)]">Second-order · {via}</span>}
        </span>
      </span>
      <span className="flex items-center gap-2">
        <span className="h-[5px] w-[72px] overflow-hidden rounded-full bg-[var(--rx-well)]">
          <motion.span className={clsx("block h-full rounded-full", via ? "bg-[#3e5c50]" : "bg-[#3e5368]")} initial={false} animate={{ width: show ? `${e * 100}%` : "0%" }} transition={{ delay: show ? delay + 0.2 : 0, duration: 0.7, ease: RX_EASE }} />
        </span>
        <span className="rx-num text-[11px] text-[var(--rx-2)]">{e.toFixed(2)}</span>
      </span>
      <span className="flex justify-end">
        <CiteChip n={c} active={active} />
      </span>
    </motion.div>
  );
}
