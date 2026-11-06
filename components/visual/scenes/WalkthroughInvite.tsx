"use client";

import { motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Icon, RX_EASE, Spark, Ticker, useTimeline } from "@/components/visual/kit";

/**
 * Book a demo — "What you'll see".
 * Composition: a calendar event card with attendees and a short agenda.
 * Calm by design (it sits beside the form): the agenda checks itself off,
 * one item at a time, then the invite settles on "Ready".
 */
const AGENDA = [
  { t: "Your watchlist", extra: ["TSM", "ASML", "VRT"] },
  { t: "Ask Alfred, traced through the Graph" },
  { t: "Open the source and the calculation" },
];
const PEOPLE = [
  { i: "JS", bg: "#3e5368" },
  { i: "AK", bg: "#3e5c50" },
  { i: "You", bg: "#7a6a58" },
];

// 0 in · 1 item 1 · 2 item 2 · 3 item 3 · 4 hold
const D = [1600, 1700, 1700, 1700, 3800];

export function WalkthroughInvite() {
  const { p, ref, cycle } = useTimeline(D, { still: 4 });
  const ready = p >= 4;

  return (
    <div ref={ref}>
      <Canvas w={480} h={300} minScale={0.7}>
        <motion.div key={cycle} className="rx-card rx-card-lift absolute left-[16px] top-[18px] w-[448px] p-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
          <div className="flex items-start gap-4">
            <span className="flex h-[54px] w-[50px] shrink-0 flex-col items-center justify-center rounded-[10px] ring-1 ring-inset ring-[var(--rx-line)]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a6503a]">Thu</span>
              <span className="rx-num text-[20px] leading-6">12</span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between">
                <span className="rx-serif text-[19px] leading-6">Reflexivity walkthrough</span>
                <motion.span
                  className="flex h-6 items-center gap-1.5 rounded-full px-2.5 text-[11px] font-medium"
                  animate={{ backgroundColor: ready ? "rgba(47,116,87,.12)" : "#f4f3f0", color: ready ? "#2f7457" : "#5b6068" }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: ready ? "#2f7457" : "#959aa1" }} />
                  {ready ? "Ready" : "Planned"}
                </motion.span>
              </span>
              <span className="mt-1 flex items-center gap-2 text-[12px] text-[var(--rx-3)]">
                <span className="rx-num">2:00 – 2:30 PM</span>·<span>Video call</span>
              </span>
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2.5">
            <span className="flex -space-x-1.5">
              {PEOPLE.map((a) => (
                <span key={a.i} className="grid h-7 w-7 place-items-center rounded-full text-[9.5px] font-semibold text-white ring-2 ring-white" style={{ background: a.bg }}>{a.i}</span>
              ))}
            </span>
            <span className="text-[11.5px] text-[var(--rx-2)]">Product specialist and your team</span>
          </div>

          <div className="mt-4 border-t border-[var(--rx-line)] pt-3">
            <p className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--rx-3)]"><Spark size={10} className="text-[#3e5368]" />Agenda</p>
            {AGENDA.map((a, i) => {
              const done = p >= i + 1;
              return (
                <motion.div key={a.t} className="flex h-[34px] items-center gap-2.5" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease: RX_EASE }}>
                  <motion.span
                    className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full"
                    initial={false}
                    animate={{ backgroundColor: done ? "#2f7457" : "rgba(255,255,255,1)", boxShadow: done ? "inset 0 0 0 1px #2f7457" : "inset 0 0 0 1.3px rgba(23,25,28,.18)" }}
                    transition={{ duration: 0.35 }}
                  >
                    <motion.span className="text-white" initial={false} animate={{ scale: done ? 1 : 0.4, opacity: done ? 1 : 0 }} transition={{ duration: 0.3, ease: RX_EASE }}><Icon name="check" size={11} /></motion.span>
                  </motion.span>
                  <span className={clsx("text-[13px] transition-colors duration-500", done ? "text-[var(--rx-ink)]" : "text-[var(--rx-2)]")}>{a.t}</span>
                  {a.extra && <span className="ml-auto flex gap-1">{a.extra.map((t) => <Ticker key={t}>{t}</Ticker>)}</span>}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Canvas>
    </div>
  );
}
