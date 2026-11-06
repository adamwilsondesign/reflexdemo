"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Icon, RX_EASE, Spark, useTimeline } from "@/components/visual/kit";

/**
 * Security — hero. Composition: a live access log (sessions table).
 * Each request lands at the top, already checked against the firm's
 * permissions; one outside the user's entitlements is denied and logged.
 */
type Row = { who: string; init: string; tone: string; via?: string; res: string; icon: "doc" | "graph"; ok: boolean };
const POOL: Row[] = [
  { who: "Anna Chen", init: "AC", tone: "#3e5368", res: "Q3 committee pack", icon: "doc", ok: true },
  { who: "Alfred", init: "", tone: "#24324a", via: "MCP", res: "Semis research notes", icon: "doc", ok: true },
  { who: "Ravi Patel", init: "RP", tone: "#7a6a58", res: "Credit desk models", icon: "doc", ok: false },
  { who: "Jonas Lind", init: "JL", tone: "#3e5c50", res: "Graph · TSMC", icon: "graph", ok: true },
  { who: "Sara Moreau", init: "SM", tone: "#5b6068", res: "Fund II holdings", icon: "doc", ok: true },
  { who: "Alfred", init: "", tone: "#24324a", via: "Teams", res: "Morning brief", icon: "doc", ok: true },
  { who: "Mia Okafor", init: "MO", tone: "#a6503a", res: "Restricted list", icon: "doc", ok: false },
  { who: "Anna Chen", init: "AC", tone: "#3e5368", res: "Watchlist · AI power", icon: "graph", ok: true },
];
const N = POOL.length;
const SHOW = 6;
const D = POOL.map((_, i) => (POOL[(i + SHOW - 1) % N].ok ? 2400 : 3800));

const clock = (n: number) => {
  const s = 41 * 60 + 12 + n * 9;
  return `09:${String(Math.floor(s / 60) % 60).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};

export function AccessLog() {
  const { p, ref, cycle } = useTimeline(D, { still: 1 });
  const n = cycle * N + p + SHOW - 1; // newest row index; continuous across loops
  const rows = Array.from({ length: SHOW }, (_, k) => n - k);
  const denied = !POOL[n % N].ok;

  return (
    <div ref={ref}>
      <Canvas w={560} h={480} focusX={0.2}>
        <div className="rx-card rx-card-lift absolute left-[28px] top-[34px] h-[412px] w-[504px] overflow-hidden px-5 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold">Access log</p>
            <span className="flex items-center gap-1.5">
              <span className="rounded-[6px] bg-[var(--rx-well)] px-2 py-0.5 text-[10.5px] text-[var(--rx-2)]">SSO</span>
              <span className="flex items-center gap-1 rounded-[6px] bg-[var(--rx-well)] px-2 py-0.5 text-[10.5px] text-[var(--rx-2)]"><Lock />TLS 1.3</span>
            </span>
          </div>
          <p className="mt-0.5 text-[11.5px] text-[var(--rx-3)]">Every request is checked against your firm’s permissions.</p>

          <div className="mt-4 grid grid-cols-[138px_1fr_88px_58px] border-b border-[var(--rx-line)] pb-2 text-[10.5px] font-medium text-[var(--rx-3)]">
            <span>User</span><span>Resource</span><span>Result</span><span className="text-right">Time</span>
          </div>
          <div className="relative">
            <AnimatePresence initial={false}>
              {rows.map((k, slot) => {
                const r = POOL[((k % N) + N) % N];
                const fresh = slot === 0;
                return (
                  <motion.div
                    key={k}
                    layout
                    className="relative grid h-[52px] grid-cols-[138px_1fr_88px_58px] items-center border-b border-[var(--rx-line)]"
                    initial={{ opacity: 0, y: -14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.6, ease: RX_EASE }}
                  >
                    {fresh && !r.ok && (
                      <motion.span className="absolute -inset-x-2 inset-y-1 -z-10 rounded-[8px] bg-[#a6503a]/[0.06]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} />
                    )}
                    <span className="flex min-w-0 items-center gap-2">
                      {r.init ? (
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[9px] font-semibold text-white" style={{ background: r.tone }}>{r.init}</span>
                      ) : (
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#24324a] text-white"><Spark size={11} /></span>
                      )}
                      <span className="min-w-0">
                        <span className="block truncate text-[12px] font-medium leading-4">{r.who}</span>
                        {r.via && <span className="block text-[10px] leading-3 text-[var(--rx-3)]">via {r.via}</span>}
                      </span>
                    </span>
                    <span className="min-w-0 pr-3">
                      <span className="inline-flex max-w-full items-center gap-1.5 rounded-[6px] bg-[var(--rx-well)] px-2 py-1 text-[11.5px] text-[var(--rx-2)]">
                        <Icon name={r.icon} size={12} className="shrink-0" />
                        <span className="truncate">{r.res}</span>
                      </span>
                    </span>
                    <span className={clsx("flex items-center gap-1.5 text-[11.5px] font-medium", r.ok ? "text-[var(--rx-up)]" : "text-[var(--rx-down)]")}>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: r.ok ? "#2f7457" : "#a6503a" }} />
                      {r.ok ? "Allowed" : "Denied"}
                    </span>
                    <span className="rx-num text-right text-[11px] text-[var(--rx-3)]">{clock(k)}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* denial detail lands as a toast */}
        <AnimatePresence>
          {denied && (
            <motion.div
              key={n}
              className="rx-card absolute bottom-[18px] right-[14px] z-10 flex w-[248px] items-start gap-2.5 p-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8, transition: { duration: 0.3 } }}
              transition={{ duration: 0.5, ease: RX_EASE, delay: 0.5 }}
            >
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#a6503a]/10 text-[var(--rx-down)]"><Lock /></span>
              <span className="min-w-0">
                <span className="block text-[12px] font-medium leading-4">Outside entitlements</span>
                <span className="mt-0.5 block text-[11px] leading-4 text-[var(--rx-3)]">Blocked and logged for your admin.</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </Canvas>
    </div>
  );
}

function Lock() {
  return (
    <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true"><rect x="2.5" y="5.2" width="7" height="5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.3" /><path d="M4.2 5.2V3.8a1.8 1.8 0 0 1 3.6 0v1.4" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
  );
}

