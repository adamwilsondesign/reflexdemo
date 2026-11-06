"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, CiteChip, Cursor, RX_EASE, Spark, useTimeline } from "@/components/visual/kit";

/**
 * Customers — hero. Composition: a radio selection card over a preview card.
 * The cursor picks a firm type; the workspace preview below re-sets itself
 * around that firm's daily question.
 */
export type FirmPick = { name: string; sub: string; ask: string; result: string; value: string; sources: string };

const TILE_W = 194;
const TILE_H = 52;
const tilePos = (i: number) => ({ x: 86 + (i % 2) * (TILE_W + 8), y: 80 + Math.floor(i / 2) * (TILE_H + 8) });

// 0 intro, then per pick: move · press · hold
const D = [1800, ...Array(4).fill([900, 350, 3000]).flat()];

export function FirmPicker({ firms }: { firms: readonly FirmPick[] }) {
  const { p, ref } = useTimeline(D, { still: 0 });
  const round = p === 0 ? 0 : Math.floor((p - 1) / 3) + 1; // 1..4
  const step = p === 0 ? -1 : (p - 1) % 3; // 0 move · 1 press · 2 hold
  const target = round % firms.length;
  const sel = p === 0 ? 0 : step === 0 ? (round - 1) % firms.length : target;
  const f = firms[sel];
  const t = tilePos(target);
  const cursor = p === 0 ? { x: 460, y: 300, visible: false } : { x: t.x + 70, y: t.y + 30, visible: true };

  return (
    <div ref={ref}>
      <Canvas w={560} h={480}>
        {/* selection */}
        <div className="rx-card absolute left-[70px] top-[26px] w-[420px] p-4">
          <p className="text-[13px] font-semibold">Set up your workspace</p>
          <p className="mt-0.5 text-[11px] text-[var(--rx-3)]">Choose how your firm works</p>
          <div className="mt-[14px] grid grid-cols-2 gap-2">
            {firms.map((x, i) => {
              const on = i === sel;
              return (
                <span key={x.name} className={clsx("flex h-[52px] items-center gap-2.5 rounded-[10px] px-3 ring-1 ring-inset transition-[box-shadow,background-color] duration-300", on ? "bg-white ring-[#243244]/70" : "bg-white ring-[var(--rx-line)]")}>
                  <span className={clsx("grid h-4 w-4 shrink-0 place-items-center rounded-full ring-1 ring-inset transition-colors duration-300", on ? "bg-[#243244] ring-[#243244]" : "ring-[#c9ccd1]")}>
                    <motion.span className="h-1.5 w-1.5 rounded-full bg-white" initial={false} animate={{ scale: on ? 1 : 0 }} transition={{ duration: 0.25 }} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[12px] font-medium leading-4">{x.name}</span>
                    <span className="block truncate text-[10.5px] leading-4 text-[var(--rx-3)]">{x.sub}</span>
                  </span>
                </span>
              );
            })}
          </div>
        </div>

        {/* preview */}
        <div className="rx-card rx-card-lift absolute left-[84px] top-[232px] h-[200px] w-[392px] overflow-hidden p-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={sel} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }} transition={{ duration: 0.5, ease: RX_EASE }}>
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-[#3e5368]"><Spark size={10} />Alfred · {f.name}</p>
              <p className="rx-serif mt-2 h-[52px] text-[19px] leading-[26px]">{f.ask}</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-[10px] bg-[var(--rx-well)] px-3 py-2.5">
                  <p className="truncate text-[10.5px] text-[var(--rx-3)]">{f.result}</p>
                  <p className="rx-num mt-0.5 text-[18px] font-medium tracking-[-0.02em]">{f.value}</p>
                </div>
                <div className="rounded-[10px] bg-[var(--rx-well)] px-3 py-2.5">
                  <p className="text-[10.5px] text-[var(--rx-3)]">Sources cited</p>
                  <p className="mt-1 flex items-center">
                    {Array.from({ length: Math.min(4, Number(f.sources)) }, (_, i) => <CiteChip key={i} n={i + 1} active={i === 0} />)}
                    {Number(f.sources) > 4 && <span className="rx-num ml-1.5 text-[11px] text-[var(--rx-3)]">+{Number(f.sources) - 4}</span>}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <Cursor {...cursor} press={step === 1} />
      </Canvas>
    </div>
  );
}
