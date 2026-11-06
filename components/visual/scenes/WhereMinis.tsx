"use client";

import { AnimatePresence, motion } from "motion/react";
import { Canvas, Icon, RX_EASE, Spark, useTimeline, useTyped } from "@/components/visual/kit";

/**
 * Alfred · Works where you do — three small scenes, one per way in.
 * MCP: a dark assistant transcript with a tool call. Teams: a channel thread.
 * API: a request and its JSON response.
 */

/* ---------- MCP: your AI assistant calls Reflexivity ---------- */
const MCP_Q = "Which suppliers do Apple and NVIDIA share?";
// 0 type · 1 tool · 2 result · 3 answer · 4 out
const MCP_D = [2200, 1100, 900, 3800, 600];

export function WhereMcp() {
  const { p, ref, cycle } = useTimeline(MCP_D, { still: 3 });
  const typed = useTyped(MCP_Q, p === 0, { speed: 32, delay: 300 });
  return (
    <div ref={ref}>
      <Canvas w={340} h={200} minScale={0.9}>
        <motion.div key={cycle} className="absolute left-[14px] top-[14px] w-[312px] rounded-[14px] p-4 text-white" style={{ background: "#1b1e23", boxShadow: "0 0 0 1px rgb(255 255 255 / .08), 0 24px 48px -16px rgb(0 0 0 / .5)" }} initial={{ opacity: 0 }} animate={{ opacity: p === 4 ? 0 : 1 }} transition={{ duration: 0.5 }}>
          <p className="flex items-center gap-1.5 text-[10.5px] text-white/45"><span className="h-1.5 w-1.5 rounded-full bg-white/30" />Your AI assistant</p>
          <p className="mt-2 h-[18px] text-[12.5px] text-white/90"><span className="text-white/40">› </span>{p === 0 ? typed : MCP_Q}</p>
          <AnimatePresence>
            {p >= 1 && (
              <motion.div className="mt-3 flex items-center gap-2 rounded-[8px] px-2.5 py-2 text-[11px]" style={{ background: "rgb(255 255 255 / .07)" }} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: RX_EASE }}>
                <span className="rx-num text-white/80">reflexivity.graph_search</span>
                <span className="ml-auto flex items-center gap-1 text-white/60">
                  {p >= 2 ? <><span className="text-[#8fc7a9]"><Icon name="check" size={11} /></span>38 entities</> : "calling…"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {p >= 3 && (
              <motion.p className="mt-3 text-[12.5px] leading-[19px] text-white/85" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: RX_EASE }}>
                Six shared suppliers. TSMC and Amkor carry the most revenue from both.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </Canvas>
    </div>
  );
}

/* ---------- Microsoft Teams: Alfred answers in a channel ---------- */
// 0 question · 1 typing · 2 reply · 3 out
const TEAMS_D = [1400, 1200, 4200, 600];

export function WhereTeams() {
  const { p, ref, cycle } = useTimeline(TEAMS_D, { still: 2 });
  return (
    <div ref={ref}>
      <Canvas w={340} h={200} minScale={0.9}>
        <motion.div key={cycle} className="rx-card absolute left-[14px] top-[12px] w-[312px] p-3.5" initial={{ opacity: 0 }} animate={{ opacity: p === 3 ? 0 : 1 }} transition={{ duration: 0.5 }}>
          <p className="border-b border-[var(--rx-line)] pb-2 text-[11.5px] font-semibold"># semis-desk</p>
          <div className="mt-2.5 flex gap-2">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--rx-well)] text-[9px] font-semibold text-[var(--rx-2)]">JL</span>
            <p className="text-[12px] leading-[17px]"><span className="font-medium text-[#3e5368]">@Alfred</span> what moved NVDA today?</p>
          </div>
          <div className="mt-2.5 flex gap-2">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-[7px] bg-[var(--rx-ink)] text-white"><Spark size={11} /></span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-[11px] font-medium">Alfred <span className="rounded-[4px] bg-[var(--rx-well)] px-1 text-[9.5px] font-normal text-[var(--rx-3)]">App</span></p>
              {p === 1 && <Dots />}
              {p >= 2 && (
                <motion.p className="mt-0.5 text-[12px] leading-[17px] text-[var(--rx-2)]" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: RX_EASE }}>
                  Raised guidance on data center demand. Three names on your list move with it.
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      </Canvas>
    </div>
  );
}

function Dots() {
  return (
    <span className="mt-1.5 flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-[var(--rx-3)]" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
      ))}
    </span>
  );
}

/* ---------- API: a request and a cited JSON response ---------- */
const JSON_LINES: [string, string][] = [
  ["answer", "\"12 names exposed…\""],
  ["citations", "[ 7 ]"],
  ["gaps", "[ \"JBL: n/d\" ]"],
  ["latency_ms", "2140"],
];
// 0 request · 1 response · 2 hold · 3 out
const API_D = [1100, 900, 3800, 600];

export function WhereApi() {
  const { p, ref, cycle } = useTimeline(API_D, { still: 2 });
  return (
    <div ref={ref}>
      <Canvas w={340} h={200} minScale={0.9}>
        <motion.div key={cycle} className="rx-card absolute left-[14px] top-[12px] w-[312px] overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: p === 3 ? 0 : 1 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 border-b border-[var(--rx-line)] px-3.5 py-2.5">
            <span className="rx-num rounded-[5px] bg-[var(--rx-ink)] px-1.5 py-0.5 text-[10px] font-medium text-white">POST</span>
            <span className="rx-num text-[11.5px]">/v1/alfred/ask</span>
            <span className="rx-num ml-auto text-[10.5px]" style={{ color: p >= 1 ? "var(--rx-up)" : "var(--rx-3)" }}>{p >= 1 ? "200 OK" : "sending…"}</span>
          </div>
          <div className="rx-num px-3.5 py-2.5 text-[11px] leading-[19px]">
            <p className="text-[var(--rx-3)]">{"{"}</p>
            {JSON_LINES.map(([k, v], i) => (
              <motion.p key={k} className="pl-3" initial={{ opacity: 0 }} animate={{ opacity: p >= 1 ? 1 : 0 }} transition={{ delay: p >= 1 ? 0.1 + i * 0.12 : 0, duration: 0.35 }}>
                <span className="text-[#3e5368]">&quot;{k}&quot;</span><span className="text-[var(--rx-3)]">: </span><span className="text-[var(--rx-ink)]">{v}</span>
              </motion.p>
            ))}
            <p className="text-[var(--rx-3)]">{"}"}</p>
          </div>
        </motion.div>
      </Canvas>
    </div>
  );
}
