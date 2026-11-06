"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Cursor, Icon, Mono, RX_EASE, useTimeline } from "@/components/visual/kit";

/**
 * Contact — "Routed to a person".
 * Composition: an inbound message card with a "Route to" select. The cursor
 * opens it (a people list: team + named owner), picks a team, and the
 * message joins the routed queue underneath with its owner. Alternates between two messages per loop.
 */
const TEAMS = [
  { team: "Sales", who: "Maya Chen", i: "MC", bg: "#3e5368" },
  { team: "Partnerships", who: "Tom Becker", i: "TB", bg: "#3e5c50" },
  { team: "Support", who: "Help Center", i: "HC", bg: "#7a6a58" },
  { team: "Security", who: "Priya Nair", i: "PN", bg: "#243244" },
];
const MESSAGES = [
  { from: "Dana Ruiz", org: "Meridian Capital", mono: "MR", tone: "#5a6f63", subject: "Embedding the Graph in our portal", body: "Could we show Knowledge Graph exposures inside our client portal?", to: 1 },
  { from: "Sam Okafor", org: "Halden Partners", mono: "HP", tone: "#3e5368", subject: "Due-diligence pack", body: "Our security team needs your questionnaire and pen-test summary.", to: 3 },
];

// 0 in · 1 move · 2 open · 3 hover · 4 press · 5 toast · 6 out
const D = [1500, 900, 1000, 800, 450, 3600, 600];

// Canvas geometry (card at 40,36 · w 480)
const SEL = { x: 404, y: 216 };
const ROW_Y = (k: number) => 267 + k * 42;

const QUEUE = [
  { s: "Walkthrough on our watchlist", team: 0, t: "9 min" },
  { s: "Adding a teammate", team: 2, t: "22 min" },
  { s: "Interview request", team: 3, t: "1 h" },
];

export function InboxRoute() {
  const { p, ref, cycle } = useTimeline(D, { still: 5 });
  const m = MESSAGES[cycle % MESSAGES.length];
  const t = TEAMS[m.to];
  const open = p >= 2 && p <= 4;
  const set = p >= 5;
  const cursor =
    p === 0 ? { x: 520, y: 470, visible: false } :
    p <= 2 ? { ...SEL, visible: true } :
    { x: 360, y: ROW_Y(m.to), visible: p < 5 };

  return (
    <div ref={ref}>
      <Canvas w={560} h={440}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: p === 6 ? 0 : 1 }} transition={{ duration: 0.5 }}>
          <motion.div className="rx-card rx-card-lift absolute left-[40px] top-[36px] z-10 h-[206px] w-[480px] p-5" initial={{ y: 12 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
            <div className="flex items-center gap-3">
              <Mono t={m.mono} tone={m.tone} size={30} />
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-medium leading-4">{m.from}</span>
                <span className="block text-[11.5px] leading-4 text-[var(--rx-3)]">{m.org}</span>
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-[var(--rx-3)]"><span className="h-1.5 w-1.5 rounded-full bg-[#3e5368]" />Just now</span>
            </div>
            <p className="rx-serif mt-4 text-[19px] leading-[26px]">{m.subject}</p>
            <p className="mt-1 text-[13px] leading-[20px] text-[var(--rx-2)]">{m.body}</p>

            <div className="absolute inset-x-5 top-[150px] flex items-center justify-between border-t border-[var(--rx-line)] pt-3">
              <span className="text-[11.5px] font-medium text-[var(--rx-3)]">Route to</span>
              <motion.span
                className="flex h-[34px] w-[200px] items-center gap-2 rounded-[9px] px-2.5 text-[12px] ring-1 ring-inset ring-[var(--rx-line)]"
                animate={{ backgroundColor: set ? ["rgba(47,116,87,.14)", "rgba(255,255,255,1)"] : "rgba(255,255,255,1)" }}
                transition={{ duration: 1.4 }}
              >
                {set ? (
                  <>
                    <span className="grid h-5 w-5 place-items-center rounded-full text-[8px] font-semibold text-white" style={{ background: t.bg }}>{t.i}</span>
                    <span className="font-medium">{t.team}</span>
                    <span className="truncate text-[var(--rx-3)]">· {t.who}</span>
                  </>
                ) : (
                  <span className="text-[var(--rx-3)]">Choose a team</span>
                )}
                <span className="ml-auto text-[var(--rx-3)]"><Icon name="chev" size={12} /></span>
              </motion.span>
            </div>
          </motion.div>

          <AnimatePresence>
            {open && (
              <motion.div className="rx-card absolute left-[280px] top-[240px] z-30 w-[240px] p-1.5" initial={{ opacity: 0, y: -4, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }} transition={{ duration: 0.25, ease: RX_EASE }} style={{ transformOrigin: "70% 0%" }}>
                {TEAMS.map((r, k) => (
                  <span key={r.team} className={clsx("flex h-[42px] items-center gap-2.5 rounded-[8px] px-2.5 transition-colors", k === m.to && p >= 3 ? "bg-[var(--rx-well)]" : "")}>
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[8.5px] font-semibold text-white" style={{ background: r.bg }}>{r.i}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[12px] font-medium leading-4">{r.team}</span>
                      <span className="block text-[10.5px] leading-[14px] text-[var(--rx-3)]">{r.who}</span>
                    </span>
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* routed queue, runs off the bottom edge */}
          <div className="rx-card absolute left-[40px] top-[262px] w-[480px] px-5 pt-3.5">
            <p className="flex items-center justify-between text-[11.5px] font-semibold">Routed today<span className="rx-num font-normal text-[var(--rx-3)]">{QUEUE.length + (set ? 1 : 0)}</span></p>
            <div className="mt-2">
              <AnimatePresence initial={false}>
                {[...(set ? [{ s: m.subject, team: m.to, t: "now", fresh: true }] : []), ...QUEUE.map((q) => ({ ...q, fresh: false }))].map((q) => {
                  const r = TEAMS[q.team];
                  return (
                    <motion.div key={q.s} layout className="relative flex h-[46px] items-center gap-3 border-t border-[var(--rx-line)]" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 46 }} transition={{ duration: 0.6, ease: RX_EASE, delay: q.fresh ? 0.35 : 0 }}>
                      {q.fresh && <motion.span className="absolute -left-5 top-3 h-5 w-[3px] rounded-r-full bg-[var(--rx-signal)]" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.8, duration: 0.4 }} />}
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[8.5px] font-semibold text-white" style={{ background: r.bg }}>{r.i}</span>
                      <span className={clsx("min-w-0 flex-1 truncate text-[12.5px]", q.fresh ? "font-medium" : "text-[var(--rx-2)]")}>{q.s}</span>
                      <span className="rounded-[6px] bg-[var(--rx-well)] px-2 py-[3px] text-[11px] text-[var(--rx-2)]">{r.team}</span>
                      <span className="rx-num w-[42px] text-right text-[10.5px] text-[var(--rx-3)]">{q.t}</span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          <Cursor {...cursor} press={p === 2 || p === 4} />
        </motion.div>
      </Canvas>
    </div>
  );
}
