"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";
import clsx from "clsx";
import { Canvas, Cursor, Icon, RX_EASE, Spark, useTimeline } from "@/components/visual/kit";
import { useAnchor } from "@/components/visual/anchor";

/**
 * Home · Auditable analysis — "traceable sources and code-backed calculations".
 * Composition: an answer card; clicking a citation opens a source popover
 * with the filing line highlighted and the calculation run beneath it. The
 * second citation opens a gap: not disclosed, so not estimated.
 */
// 0 in · 1 move → [1] · 2 open source · 3 calc · 4 move → [2] · 5 open gap · 6 out
const D = [1500, 900, 1300, 3000, 900, 3400, 700];

function Chip({ n, on, el }: { n: number; on: boolean; el: React.RefObject<HTMLSpanElement | null> }) {
  return (
    <span ref={el} className={clsx("rx-num ml-1 inline-grid h-[16px] min-w-[16px] place-items-center rounded-full px-1 align-[2px] font-sans text-[10px] font-medium transition-colors duration-300", on ? "bg-[var(--rx-signal)] text-[var(--rx-ink)]" : "bg-[var(--rx-well)] text-[var(--rx-2)]")}>{n}</span>
  );
}

export function SourceTrace() {
  const { p, ref, cycle } = useTimeline(D, { still: 3 });
  const root = useRef<HTMLDivElement>(null);
  const c1 = useRef<HTMLSpanElement>(null);
  const c2 = useRef<HTMLSpanElement>(null);
  const a1 = useAnchor(root, c1, [p, cycle], { dx: 1, dy: 2 });
  const a2 = useAnchor(root, c2, [p, cycle], { dx: 1, dy: 2 });
  const src = p >= 2 && p <= 3;
  const gap = p === 5;
  const at = gap ? a2 : a1;
  const popX = at ? Math.min(Math.max(at.x - 60, 24), 560 - 316 - 16) : 0;
  const popY = at ? at.y + 16 : 0;
  const cursor =
    p === 0 || p === 6 ? { x: 470, y: 420, visible: false } :
    p <= 3 ? { x: a1?.x ?? 300, y: a1?.y ?? 200, visible: true } :
    { x: a2?.x ?? 300, y: a2?.y ?? 200, visible: true };

  return (
    <div ref={ref}>
      <Canvas w={560} h={400} focusX={0.25}>
        <div ref={root} className="absolute inset-0">
          <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: p === 6 ? 0 : 1 }} transition={{ duration: 0.6 }}>
            <motion.div className="rx-card rx-card-lift absolute left-[28px] top-[34px] w-[504px] p-6" initial={{ y: 14 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5 font-semibold"><Spark size={11} className="text-[var(--rx-signal)]" />Alfred</span>
                <span className="text-[var(--rx-3)]">2 sources · 1 calculation</span>
              </div>
              <p className="rx-serif mt-3 text-[20px] leading-[27px]">Is AWS growth reaccelerating?</p>
              <p className="rx-serif mt-2.5 text-[15px] leading-[25px] text-[var(--rx-2)]">
                Yes. AWS revenue grew <span className="text-[var(--rx-ink)]">19% year over year</span> to $28.8B<Chip n={1} on={src} el={c1} />, its fastest pace in two years. Revenue from AI services is not disclosed<Chip n={2} on={gap} el={c2} />.
              </p>
              <div className="mt-4 flex gap-1.5">
                {["Filing", "Code-backed", "Gap flagged"].map((t) => <span key={t} className="rounded-[6px] bg-[var(--rx-well)] px-2 py-1 text-[10.5px] text-[var(--rx-2)]">{t}</span>)}
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {(src || gap) && at && (
                <motion.div key={gap ? "gap" : "src"} className="rx-card rx-card-lift absolute z-20 w-[316px] p-4" style={{ left: popX, top: popY }} initial={{ opacity: 0, y: -6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, transition: { duration: 0.18 } }} transition={{ duration: 0.35, ease: RX_EASE }}>
                  {!gap ? (
                    <>
                      <p className="flex items-center gap-2 text-[11px] text-[var(--rx-3)]"><Icon name="doc" size={13} className="text-[var(--rx-2)]" /><span className="font-medium text-[var(--rx-ink)]">Q4 2024 earnings release</span>p.4</p>
                      <p className="mt-2.5 text-[12.5px] leading-[19px] text-[var(--rx-2)]">
                        “AWS segment sales increased{" "}
                        <span className="relative whitespace-nowrap text-[var(--rx-ink)]">
                          <motion.span className="absolute -inset-x-0.5 inset-y-0 origin-left rounded-[3px] bg-[var(--rx-signal-soft)]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.3, ease: "linear" }} style={{ boxShadow: "inset 0 -1.5px 0 var(--rx-signal)" }} />
                          <span className="relative">19% year-over-year to $28.8 billion</span>
                        </span>
                        .”
                      </p>
                      <motion.div className="rx-num mt-3 flex items-center justify-between rounded-[8px] bg-[#17191c] px-3 py-2 text-[11px] text-white/85" initial={{ opacity: 0, y: 4 }} animate={{ opacity: p === 3 ? 1 : 0, y: p === 3 ? 0 : 4 }} transition={{ duration: 0.45, ease: RX_EASE }}>
                        <span>(28.8 − 24.2) / 24.2 = 0.190</span>
                        <span className="flex items-center gap-1 font-sans text-[10.5px] text-[#9fd3b8]"><Icon name="check" size={12} />Ran</span>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <p className="flex items-center gap-2 text-[11px] font-medium"><span className="rx-hatch h-3 w-3 rounded-[3px] ring-1 ring-inset ring-[#2f7457]/40" />Not disclosed</p>
                      <p className="mt-2 text-[12.5px] leading-[19px] text-[var(--rx-2)]">Amazon doesn’t report AI revenue separately. Flagged, not estimated.</p>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <Cursor {...cursor} press={p === 2 || p === 5} />
          </motion.div>
        </div>
      </Canvas>
    </div>
  );
}
