"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Icon, RX_EASE, Spark, useTimeline } from "@/components/visual/kit";

/**
 * Thank you — "What happens next".
 * Composition: a request checklist with status chips. The first step checks
 * off, the scheduling step goes live, and an email notification lands.
 * Focus chips come from the interests the visitor chose in the form.
 */
type St = "done" | "live" | "next";
const STEPS = [
  { t: "Request received", when: "Just now" },
  { t: "We follow up to schedule", when: "Within 1 business day" },
  { t: "Your walkthrough", when: "Typically 30 min" },
  { t: "Next steps, if it fits", when: "Afterwards" },
];

// 0 in · 1 check · 2 live · 3 toast · 4 out
const D = [1500, 1300, 1700, 4000, 600];

export function RequestStatus({ interests = [] }: { interests?: string[] }) {
  const { p, ref, cycle } = useTimeline(D, { still: 3 });
  const chips = interests.length ? interests.slice(0, 3) : ["Your question", "Your watchlist"];
  const more = interests.length - 3;
  const status = (i: number): St => (i === 0 ? (p >= 1 ? "done" : "live") : i === 1 ? (p >= 2 ? "live" : "next") : "next");

  return (
    <div ref={ref}>
      <Canvas w={500} h={410} minScale={0.7} focusX={0.35}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: p === 4 ? 0 : 1 }} transition={{ duration: 0.5 }}>
          <motion.div className="rx-card rx-card-lift absolute left-[20px] top-[24px] w-[460px] p-5" initial={{ y: 12 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold"><Spark size={11} className="text-[#3e5368]" />Demo request</span>
              <span className="rx-num text-[10.5px] text-[var(--rx-3)]">REQ-2048</span>
            </div>
            <p className="rx-serif mt-2 text-[20px] leading-[27px]">What happens next</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {chips.map((c) => <span key={c} className="rounded-[6px] bg-[var(--rx-well)] px-2 py-[3px] text-[11px] text-[var(--rx-2)]">{c}</span>)}
              {more > 0 && <span className="rounded-[6px] bg-[var(--rx-well)] px-2 py-[3px] text-[11px] text-[var(--rx-3)]">+{more}</span>}
            </div>
            <div className="mt-4">
              {STEPS.map((s, i) => {
                const st = status(i);
                return (
                  <motion.div key={s.t} className="flex h-[50px] items-center gap-3 border-t border-[var(--rx-line)]" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: RX_EASE }}>
                    <motion.span
                      className="grid h-[20px] w-[20px] shrink-0 place-items-center rounded-full text-white"
                      initial={false}
                      animate={{ backgroundColor: st === "done" ? "#2f7457" : "rgba(255,255,255,1)", boxShadow: st === "done" ? "inset 0 0 0 1px #2f7457" : st === "live" ? "inset 0 0 0 1.5px #3e5368" : "inset 0 0 0 1.3px rgba(23,25,28,.18)" }}
                      transition={{ duration: 0.35 }}
                    >
                      {st === "done" && <Icon name="check" size={12} />}
                      {st === "live" && <motion.span className="h-1.5 w-1.5 rounded-full bg-[#3e5368]" animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />}
                    </motion.span>
                    <span className="min-w-0 flex-1">
                      <span className={clsx("block text-[13px] leading-4", st === "next" ? "text-[var(--rx-2)]" : "font-medium")}>{s.t}</span>
                      <span className="block text-[11px] leading-4 text-[var(--rx-3)]">{s.when}</span>
                    </span>
                    <Chip st={st} />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <AnimatePresence>
            {p === 3 && (
              <motion.div className="rx-card rx-card-lift absolute left-[96px] top-[332px] flex w-[384px] items-start gap-3 p-3.5" initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.6, ease: RX_EASE }}>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] bg-[#243244] text-white"><Mail /></span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between text-[11px] text-[var(--rx-3)]"><span className="font-medium text-[var(--rx-ink)]">Reflexivity team</span><span>now</span></span>
                  <span className="mt-0.5 block text-[12.5px] font-medium leading-4">Scheduling your walkthrough</span>
                  <span className="block truncate text-[11.5px] leading-4 text-[var(--rx-2)]">Three times that work this week. Pick one?</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Canvas>
    </div>
  );
}

function Chip({ st }: { st: St }) {
  const c = st === "done" ? { l: "Done", bg: "rgba(47,116,87,.12)", fg: "#2f7457" } : st === "live" ? { l: "In progress", bg: "rgba(62,83,104,.12)", fg: "#3e5368" } : { l: "Up next", bg: "#f4f3f0", fg: "#959aa1" };
  return (
    <motion.span className="rounded-full px-2 py-[3px] text-[10.5px] font-medium" initial={false} animate={{ backgroundColor: c.bg, color: c.fg }} transition={{ duration: 0.4 }}>
      {c.l}
    </motion.span>
  );
}

function Mail() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><rect x="2" y="3.5" width="12" height="9" rx="1.5" /><path d="m2.5 4.5 5.5 4 5.5-4" /></svg>
  );
}
