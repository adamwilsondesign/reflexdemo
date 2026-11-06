"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";
import clsx from "clsx";
import { Canvas, Cursor, Icon, RX_EASE, useTimeline } from "@/components/visual/kit";
import { useAnchor } from "@/components/visual/anchor";

/**
 * Platform · Security — "audited controls, encryption, permission-aware access".
 * Composition: a people-with-access card with role selects, and a connected
 * source that inherits its permissions. The cursor narrows one person's access
 * and the change is logged.
 */
const PEOPLE = [
  { i: "AW", n: "Alex Weston", r: "Owner", tone: "#3e5368" },
  { i: "PM", n: "Priya Mehta", r: "Can edit", tone: "#3e5c50" },
  { i: "JL", n: "Jonah Lee", r: "Can edit", tone: "#7a6a58" },
];

// 0 in · 1 move · 2 open · 3 hover · 4 pick · 5 logged · 6 out
const D = [1600, 900, 700, 700, 350, 3600, 700];

export function PlatformAccess() {
  const { p, ref, cycle } = useTimeline(D, { still: 5 });
  const root = useRef<HTMLDivElement>(null);
  const sel = useRef<HTMLSpanElement>(null);
  const opt = useRef<HTMLSpanElement>(null);
  const aSel = useAnchor(root, sel, [cycle], { ax: 0.55 });
  const aOpt = useAnchor(root, opt, [p >= 2 && p <= 4, cycle], { ax: 0.4 });
  const open = p >= 2 && p <= 4;
  const changed = p >= 4 && p < 6;
  const cursor =
    p === 1 || p === 2 ? { x: aSel?.x ?? 440, y: aSel?.y ?? 200, visible: true } :
    p === 3 || p === 4 ? { x: aOpt?.x ?? 440, y: aOpt?.y ?? 260, visible: true } :
    p === 5 ? { x: (aOpt?.x ?? 440) + 30, y: (aOpt?.y ?? 260) + 70, visible: false } :
    { x: 500, y: 420, visible: false };

  return (
    <div ref={ref}>
      <Canvas w={560} h={400} focusX={0.3}>
        <div ref={root} className="absolute inset-0">
          <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: p === 6 ? 0 : 1 }} transition={{ duration: 0.6 }}>
            <motion.div className="rx-card rx-card-lift absolute left-[48px] top-[30px] w-[464px] p-5" initial={{ y: 14 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
              <div className="flex items-center justify-between">
                <p className="text-[14px] font-semibold">Share “Q3 semis thesis”</p>
                <span className="flex items-center gap-1.5 rounded-[7px] bg-[var(--rx-well)] px-2 py-1 text-[10.5px] text-[var(--rx-2)]"><Lock />Encrypted</span>
              </div>
              <p className="mt-3 text-[11px] font-medium text-[var(--rx-3)]">People with access</p>
              <div className="mt-1">
                {PEOPLE.map((u, k) => {
                  const role = k === 2 && changed ? "Can view" : u.r;
                  return (
                    <div key={u.n} className="relative flex h-[48px] items-center gap-3">
                      <span className="grid h-7 w-7 place-items-center rounded-full text-[10px] font-semibold text-white" style={{ background: u.tone }}>{u.i}</span>
                      <span className="flex-1 text-[13px] font-medium">{u.n}</span>
                      {k === 0 ? (
                        <span className="pr-2.5 text-[12px] text-[var(--rx-3)]">Owner</span>
                      ) : (
                        <motion.span ref={k === 2 ? sel : undefined} className={clsx("flex h-7 w-[96px] items-center gap-1 rounded-[8px] px-2.5 text-[12px]", k === 2 && open ? "bg-[var(--rx-well)]" : "text-[var(--rx-2)]")} animate={{ backgroundColor: k === 2 && changed ? ["rgba(233,169,58,.2)", "rgba(255,255,255,0)"] : undefined }} transition={{ duration: 1.4 }}>
                          {role}<span className="ml-auto text-[var(--rx-3)]"><Icon name="chev" size={11} /></span>
                        </motion.span>
                      )}
                      {k === 2 && (
                        <AnimatePresence>
                          {open && (
                            <motion.div className="rx-card absolute right-0 top-[42px] z-20 w-[150px] p-1.5" initial={{ opacity: 0, y: -4, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }} transition={{ duration: 0.25, ease: RX_EASE }} style={{ transformOrigin: "80% 0%" }}>
                              {["Can edit", "Can view", "Remove"].map((o) => (
                                <span key={o} ref={o === "Can view" ? opt : undefined} className={clsx("flex h-8 items-center rounded-[7px] px-2.5 text-[12px]", o === "Can view" && p >= 3 ? "bg-[var(--rx-well)] text-[var(--rx-ink)]" : o === "Remove" ? "text-[#a6503a]" : "text-[var(--rx-2)]")}>
                                  {o}{o === (p >= 4 ? "Can view" : "Can edit") && <span className="ml-auto"><Icon name="check" size={12} /></span>}
                                </span>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 border-t border-[var(--rx-line)] pt-3">
                <p className="text-[11px] font-medium text-[var(--rx-3)]">Connected source</p>
                <div className="mt-2 flex items-center gap-3 rounded-[10px] bg-[var(--rx-well)] px-3 py-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-[8px] bg-white text-[var(--rx-2)] shadow-[0_0_0_1px_rgb(23_32_44/.06)]"><Icon name="doc" size={14} /></span>
                  <span className="flex-1">
                    <span className="block text-[12.5px] font-medium leading-4">Research drive</span>
                    <span className="block text-[11px] leading-4 text-[var(--rx-3)]">Inherits folder permissions</span>
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-[var(--rx-2)]"><Lock />Permission-aware</span>
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              {changed && (
                <motion.div className="rx-card rx-card-lift absolute left-[150px] top-[352px] z-30 flex items-center gap-2.5 px-3.5 py-2.5" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.5, ease: RX_EASE, delay: 0.4 }}>
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[#2f7457] text-white"><Icon name="check" size={11} /></span>
                  <span className="text-[12px] font-medium">Access changed</span>
                  <span className="text-[11.5px] text-[var(--rx-3)]">Added to audit log</span>
                </motion.div>
              )}
            </AnimatePresence>
            <Cursor {...cursor} press={p === 2 || p === 4} />
          </motion.div>
        </div>
      </Canvas>
    </div>
  );
}

function Lock() {
  return (
    <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true"><rect x="2.5" y="5.2" width="7" height="5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.3" /><path d="M4.2 5.2V3.8a1.8 1.8 0 0 1 3.6 0v1.4" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
  );
}
