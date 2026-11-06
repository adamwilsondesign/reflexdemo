"use client";

import { motion } from "motion/react";
import { Canvas, Icon, RX_EASE, useTimeline, useTyped } from "@/components/visual/kit";

/**
 * Knowledge Graph — "Build with the Graph".
 * Composition: a code card. A tool call is typed, the request runs, and
 * weighted relationship records stream back as structured JSON.
 */
const REQ = `{ "entity": "TSMC", "depth": 2 }`;
const ROWS: [string, string, string][] = [
  ["NVDA", "customer", "0.90"],
  ["AAPL", "customer", "0.88"],
  ["ASML", "supplier", "0.81"],
  ["AMKR", "partner", "0.64"],
  ["TW", "domicile", "1.00"],
];

// 0 type · 1 run · 2 stream · 3 hold · 4 out
const D = [2000, 800, 2200, 3600, 600];

export function GraphCall() {
  const { p, ref, cycle } = useTimeline(D, { still: 3 });
  const req = useTyped(REQ, p < 4, { speed: 26, delay: 500 });
  const done = p >= 2;

  return (
    <div ref={ref}>
      <Canvas w={560} h={300}>
        <motion.div key={cycle} className="rx-card rx-card-lift absolute left-[64px] top-[20px] h-[260px] w-[432px] overflow-hidden" initial={{ opacity: 0, y: 12 }} animate={{ opacity: p === 4 ? 0 : 1, y: 0 }} transition={{ duration: 0.6, ease: RX_EASE }}>
          <div className="flex h-[42px] items-center gap-2 border-b border-[var(--rx-line)] px-4">
            <span className="rounded-[5px] bg-[#e7efe9] px-1.5 py-px text-[10.5px] font-medium text-[#2f5c48]">MCP</span>
            <span className="rx-num text-[12px] font-medium">graph.neighbors</span>
            <motion.span
              className="rx-num ml-auto flex items-center gap-1.5 rounded-[6px] px-2 py-0.5 text-[10.5px]"
              animate={{ backgroundColor: done ? "rgba(47,116,87,.1)" : "rgba(244,243,240,1)", color: done ? "#2f7457" : "#959aa1" }}
              transition={{ duration: 0.4 }}
            >
              {done ? <><Icon name="check" size={11} />200 · 84 ms</> : p === 1 ? <><Dots />Running</> : "Ready"}
            </motion.span>
          </div>
          <div className="rx-num px-4 pt-3 text-[11.5px] leading-[20px]">
            <p className="text-[10.5px] text-[var(--rx-3)]">Request</p>
            <p className="mt-1 h-[28px] rounded-[7px] bg-[var(--rx-well)] px-2.5 py-1 text-[var(--rx-2)]">
              {colour(req)}
              {p === 0 && <span className="ml-px inline-block h-[13px] w-px animate-pulse bg-[var(--rx-ink)] align-[-2px]" />}
            </p>
            <p className="mt-3 flex justify-between text-[10.5px] text-[var(--rx-3)]"><span>Response</span>{done && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>1,284 edges</motion.span>}</p>
            <div className="mt-1">
              {ROWS.map(([t, r, w], i) => (
                <motion.p key={t} className="whitespace-pre" initial={{ opacity: 0, x: -6 }} animate={done ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }} transition={{ delay: i * 0.28, duration: 0.4, ease: RX_EASE }}>
                  <span className="text-[var(--rx-3)]">{"{ "}</span>
                  <K>target</K>: <S>{`"${t}"`}</S>,{pad(t, 4)} <K>rel</K>: <S>{`"${r}"`}</S>,{pad(r, 8)} <K>weight</K>: <N>{w}</N>
                  <span className="text-[var(--rx-3)]">{" }"}</span>
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>
      </Canvas>
    </div>
  );
}

const pad = (s: string, n: number) => " ".repeat(Math.max(0, n - s.length));
const K = ({ children }: { children: React.ReactNode }) => <span className="text-[#5b6068]">&quot;{children}&quot;</span>;
const S = ({ children }: { children: React.ReactNode }) => <span className="text-[#2f7457]">{children}</span>;
const N = ({ children }: { children: React.ReactNode }) => <span className="text-[#3e5368]">{children}</span>;

/** Light syntax tint for the typed request. */
function colour(s: string) {
  let q = 0;
  return s.split(/("[^"]*"?)/).map((part, i) => {
    if (!part) return null;
    if (part.startsWith('"')) {
      const isKey = q++ !== 1;
      return <span key={i} className={isKey ? "text-[#5b6068]" : "text-[#2f7457]"}>{part}</span>;
    }
    return <span key={i} className={/\d/.test(part) ? "text-[#3e5368]" : "text-[var(--rx-3)]"}>{part}</span>;
  });
}

function Dots() {
  return (
    <span className="flex gap-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="h-1 w-1 rounded-full bg-current" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
      ))}
    </span>
  );
}
