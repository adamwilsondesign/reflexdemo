"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

/* ==================================================================
   Product animation system — the ONE way product illustrations move.
   Rules (see DESIGN.md › Product animation):
   - one fixed-size panel per visual: content never resizes the frame
   - each state holds ≥ 4.5s; ≤ ~12 new words per state
   - one motion idea per visual (a line draws, a row arrives, a highlight moves)
   - slow, quiet transitions: 0.6s fade / 8px rise, expo-out
   - pauses off-screen; reduced motion shows the final, most informative state
   ================================================================== */

export const MOTION_EASE = [0.16, 1, 0.3, 1] as const;
export const STATE_MS = 4800;

/** Cycles 0..count-1 every `ms` while in view. Returns [index, ref, setIndex]. */
export function useCycle(count: number, { ms = STATE_MS, finalForReduced = count - 1 } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) { setI(finalForReduced); return; }
    if (!inView) return;
    const t = setTimeout(() => setI((v) => (v + 1) % count), ms);
    return () => clearTimeout(t);
  }, [i, inView, reduce, count, ms, finalForReduced]);
  return [i, ref, setI] as const;
}

/** Fixed-height white panel. Children cross-fade by `stateKey` without changing the panel size. */
export function MockPanel({
  stateKey,
  children,
  className,
  height = 248,
}: {
  stateKey?: string | number;
  children: React.ReactNode;
  className?: string;
  height?: number;
}) {
  return (
    <div className={clsx("ui-card pui relative w-full overflow-hidden p-4", className)} style={{ height }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={stateKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.6, ease: MOTION_EASE }}
          className="h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Three quiet step dots under a panel (position, not labels). */
export function StepDots({ count, active, onDark = true, onSelect }: { count: number; active: number; onDark?: boolean; onSelect?: (i: number) => void }) {
  return (
    <div className="mt-4 flex items-center justify-center gap-2" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          tabIndex={-1}
          onClick={() => onSelect?.(i)}
          className={clsx("h-1.5 rounded-full transition-all duration-500", i === active ? "w-6" : "w-1.5", onDark ? (i === active ? "bg-white" : "bg-white/40") : i === active ? "bg-[#0d0d0d]" : "bg-black/20")}
        />
      ))}
    </div>
  );
}

/** A panel row: label left, quiet value right. */
export function Row({ label, value, strong = false, dot = false }: { label: React.ReactNode; value?: React.ReactNode; strong?: boolean; dot?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-black/10 py-2 text-[13px] first:border-t-0">
      <span className={clsx("flex min-w-0 items-center gap-2 truncate", strong ? "font-medium text-[#0d0d0d]" : "text-[#5d5d5d]")}>
        {dot && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d0d0d]" />}
        {label}
      </span>
      {value !== undefined && <span className="shrink-0 tabular-nums text-[#8f8f8f]">{value}</span>}
    </div>
  );
}

/** Small entity chain (A → B → C): nodes arrive one by one, joined by a hairline that draws in. */
export function Chain({ nodes, step = 0.9 }: { nodes: string[]; step?: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex flex-col">
      {nodes.map((n, i) => (
        <div key={n}>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * step, ease: MOTION_EASE }}
            className="flex items-center gap-2 rounded-[10px] border border-black/10 px-3 py-2 text-[13px] text-[#0d0d0d]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#0d0d0d]" />
            {n}
          </motion.div>
          {i < nodes.length - 1 && (
            <motion.div
              className="ml-[17px] h-4 w-px origin-top bg-[#0d0d0d]/40"
              initial={reduce ? false : { scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: i * step + 0.5, ease: MOTION_EASE }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
