"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Cursor, Icon, RX_EASE, useTimeline } from "@/components/visual/kit";

/**
 * Security — your data, your rules.
 * Composition: a settings table with per-row policies. The cursor opens one
 * select and tightens it; one row is locked by design.
 */
type Pol = "Allow" | "Ask" | "Block" | "Never";
const ROWS: { name: string; sub: string; pol: Pol; lock?: boolean }[] = [
  { name: "Train models on your data", sub: "Contractually excluded", pol: "Never", lock: true },
  { name: "Use internal research notes", sub: "Only inside your workspace", pol: "Allow" },
  { name: "Share answers outside the firm", sub: "Links, exports and email", pol: "Ask" },
  { name: "Export to Excel", sub: "With citations attached", pol: "Allow" },
  { name: "Connect third-party data", sub: "Admin approval required", pol: "Ask" },
];
const DOT: Record<Pol, string> = { Allow: "#2f7457", Ask: "#c98a1c", Block: "#a6503a", Never: "#17191c" };

// 0 in · 1 move · 2 open · 3 choose · 4 set · 5 hold
const D = [1800, 900, 1100, 700, 400, 3400];

export function Controls() {
  const { p, ref, cycle } = useTimeline(D, { still: 5 });
  const open = p === 2 || p === 3;
  const set = p >= 4;
  const cursor = p === 0 ? { x: 600, y: 520, visible: false } : p <= 2 ? { x: 452, y: 262, visible: true } : { x: 436, y: 344, visible: p < 5 };

  return (
    <div ref={ref}>
      <Canvas w={560} h={480}>
        <motion.div key={cycle} className="rx-card rx-card-lift absolute left-[30px] top-[40px] w-[500px] p-5" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold">Workspace controls</p>
            <span className="flex items-center gap-1.5 rounded-[7px] bg-[var(--rx-well)] px-2 py-1 text-[11px] text-[var(--rx-2)]"><Lock />Single-tenant</span>
          </div>
          <p className="mt-0.5 text-[11.5px] text-[var(--rx-3)]">Set by your admin. Every change is logged.</p>
          <div className="mt-4">
            {ROWS.map((r, i) => {
              const pol: Pol = i === 2 && set ? "Block" : r.pol;
              return (
                <motion.div key={r.name} className="relative flex h-[54px] items-center gap-3 border-t border-[var(--rx-line)]" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: RX_EASE }}>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12.5px] font-medium leading-4">{r.name}</span>
                    <span className="block text-[11px] leading-4 text-[var(--rx-3)]">{r.sub}</span>
                  </span>
                  <motion.span
                    className={clsx("flex h-7 w-[92px] items-center gap-1.5 rounded-[8px] px-2.5 text-[11.5px] font-medium", r.lock ? "bg-[var(--rx-well)] text-[var(--rx-2)]" : "ring-1 ring-inset ring-[var(--rx-line)]")}
                    animate={{ backgroundColor: i === 2 && set ? ["rgba(233,169,58,.22)", "rgba(255,255,255,1)"] : r.lock ? "#f4f3f0" : "rgba(255,255,255,1)" }}
                    transition={{ duration: 1.4 }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: DOT[pol] }} />
                    {pol}
                    <span className="ml-auto text-[var(--rx-3)]">{r.lock ? <Lock /> : <Icon name="chev" size={11} />}</span>
                  </motion.span>
                  {i === 2 && (
                    <AnimatePresence>
                      {open && (
                        <motion.div className="rx-card absolute right-0 top-[46px] z-20 w-[150px] p-1.5" initial={{ opacity: 0, y: -4, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }} transition={{ duration: 0.25, ease: RX_EASE }} style={{ transformOrigin: "80% 0%" }}>
                          {(["Allow", "Ask", "Block"] as Pol[]).map((o) => (
                            <span key={o} className={clsx("flex h-8 items-center gap-2 rounded-[7px] px-2.5 text-[12px]", o === "Block" && p === 3 ? "bg-[var(--rx-well)] text-[var(--rx-ink)]" : "text-[var(--rx-2)]")}>
                              <span className="h-1.5 w-1.5 rounded-full" style={{ background: DOT[o] }} />{o}
                              {o === "Ask" && <span className="ml-auto text-[var(--rx-3)]"><Icon name="check" size={12} /></span>}
                            </span>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        <Cursor {...cursor} press={p === 4 || p === 2} />
      </Canvas>
    </div>
  );
}

function Lock() {
  return (
    <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true"><rect x="2.5" y="5.2" width="7" height="5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.3" /><path d="M4.2 5.2V3.8a1.8 1.8 0 0 1 3.6 0v1.4" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
  );
}
