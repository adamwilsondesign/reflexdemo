"use client";

import { motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Icon, RX_EASE, Spark, useTimeline } from "@/components/visual/kit";

/**
 * Platform · Hero — "the intelligence layer between institutional data and your workflow".
 * Composition: three tiers on one field. Data sources at the bottom, the
 * Reflexivity layer as the focal card, the team's tools on top. Each module
 * takes a turn: a source lights, its route draws up, the module produces an
 * output, and the route continues into the tool that receives it.
 */
const TILES = [
  { n: "Research notes", s: "Notes", ic: "doc" },
  { n: "Spreadsheets", s: "Sheets", ic: "sheet" },
  { n: "Chat", s: "Chat", ic: "chat" },
  { n: "Your models", s: "Models", ic: "graph" },
  { n: "AI agents", s: "Agents", ic: "spark" },
] as const;
const MODS = [
  { n: "Alfred", sub: "AI analyst", out: "Cited answer ready", from: 1, to: 0 },
  { n: "Knowledge Graph", sub: "Relationships", out: "3 hidden exposures", from: 0, to: 3 },
  { n: "Insights", sub: "Always on", out: "Catalyst, 2 holdings", from: 3, to: 2 },
];
const DATA = ["LSEG", "S&P Global", "Cboe", "Dow Jones", "Quartr", "Nasdaq"];
const CARD_T = 172, CARD_B = 322, TILE_B = 134, DATA_T = 394;
function geo(w: number) {
  const pad = w >= 560 ? 40 : 18;
  const cw = w - pad * 2;
  const TX = (i: number) => pad + 32 + i * ((cw - 64) / 4);
  const MX = (i: number) => pad + cw / 6 + (i * cw) / 3;
  const DX = (i: number) => 12 + (w - 24) / 12 + (i * (w - 24)) / 6;
  const UP = (d: number, m: number) => `M${DX(d)} ${DATA_T} C${DX(d)} ${DATA_T - 40} ${MX(m)} ${CARD_B + 36} ${MX(m)} ${CARD_B}`;
  const OUT = (m: number, t: number) => `M${MX(m)} ${CARD_T} C${MX(m)} ${CARD_T - 22} ${TX(t)} ${TILE_B + 22} ${TX(t)} ${TILE_B}`;
  return { pad, cw, TX, DX, UP, OUT, chip: Math.min(82, (w - 24) / 6 - 8) };
}
const LINKS_UP: [number, number][] = [[0, 1], [1, 0], [2, 0], [3, 2], [4, 1], [5, 2]];
const LINKS_OUT: [number, number][] = [[0, 0], [0, 1], [1, 3], [1, 4], [2, 2], [2, 4]];

// per module: 0 source → layer · 1 output · 2 layer → tool
const D = [1300, 1000, 1700, 1300, 1000, 1700, 1300, 1000, 1700];

export function PlatformLayers({ w = 560 }: { w?: number }) {
  const { pad, cw, TX, DX, UP, OUT, chip } = geo(w);
  const narrow = w < 560;
  const { p, ref } = useTimeline(D, { still: 1 });
  const m = Math.floor(p / 3);
  const s = p % 3;
  const M = MODS[m];

  return (
    <div ref={ref}>
      <Canvas w={w} h={480}>
        <p style={{ left: pad }} className="absolute top-[16px] text-[11px] font-medium text-white/75">Your workflow</p>
        <p style={{ left: pad }} className="absolute top-[452px] text-[11px] font-medium text-white/75">Institutional data and content</p>

        <svg className="absolute inset-0" width={w} height="480" aria-hidden="true">
          {LINKS_UP.map(([d, mm]) => <path key={`u${d}`} d={UP(d, mm)} fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="1" />)}
          {LINKS_OUT.map(([mm, t]) => <path key={`o${mm}${t}`} d={OUT(mm, t)} fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="1" />)}
          <motion.path key={`up${m}`} d={UP(M.from, m)} fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }} />
          <motion.path key={`out${m}`} d={OUT(m, M.to)} fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: s === 2 ? 1 : 0 }} transition={{ duration: s === 2 ? 0.9 : 0, ease: "easeInOut" }} />
        </svg>

        {TILES.map((t, i) => {
          const on = i === M.to && s === 2;
          return (
            <div key={t.n} className="absolute flex w-[84px] -translate-x-1/2 flex-col items-center" style={{ left: TX(i), top: 38 }}>
              <motion.span className="rx-card relative grid h-[60px] w-[60px] place-items-center text-[var(--rx-2)]" animate={{ y: on ? -3 : 0 }} transition={{ duration: 0.4, ease: RX_EASE, delay: on ? 0.8 : 0 }}>
                <TileIcon name={t.ic} />
                <motion.span className="absolute -right-1.5 -top-1.5 grid h-[18px] w-[18px] place-items-center rounded-full bg-[#17191c] text-white" initial={false} animate={{ scale: on ? 1 : 0, opacity: on ? 1 : 0 }} transition={{ duration: 0.3, delay: on ? 0.85 : 0 }}><Icon name="check" size={11} /></motion.span>
              </motion.span>
              <span className={clsx("mt-2 whitespace-nowrap text-[11px] transition-colors duration-500", on ? "text-white" : "text-white/70")}>{narrow ? t.s : t.n}</span>
            </div>
          );
        })}

        <div className="rx-card rx-card-lift absolute px-0 pt-4" style={{ left: pad, width: cw, top: CARD_T, height: CARD_B - CARD_T }}>
          <div className="flex items-center gap-2 px-5">
            <Spark size={13} className="text-[var(--rx-signal)]" />
            <span className="text-[13.5px] font-semibold">Reflexivity</span>
            {!narrow && <span className="text-[11.5px] text-[var(--rx-3)]">Investment intelligence layer</span>}
          </div>
          <div className="mt-3.5 grid grid-cols-3 border-t border-[var(--rx-line)]">
            {MODS.map((mod, i) => {
              const on = i === m;
              return (
                <div key={mod.n} className={clsx("relative h-[94px] pt-3.5", narrow ? "px-3" : "px-5", i > 0 && "border-l border-[var(--rx-line)]")}>
                  <motion.span className="absolute inset-0" animate={{ backgroundColor: on ? "rgba(244,243,240,1)" : "rgba(244,243,240,0)" }} transition={{ duration: 0.5 }} style={{ borderRadius: i === 0 ? "0 0 0 14px" : i === 2 ? "0 0 14px 0" : 0 }} />
                  <span className={clsx("relative block font-medium", narrow ? "text-[12px]" : "text-[13px]")}>{mod.n}</span>
                  <span className="relative block text-[11px] text-[var(--rx-3)]">{mod.sub}</span>
                  <motion.span className={clsx("relative mt-2.5 flex items-center gap-1.5 whitespace-nowrap font-medium", narrow ? "text-[10.5px]" : "text-[11px]")} initial={false} animate={{ opacity: on && s >= 1 ? 1 : 0, y: on && s >= 1 ? 0 : 4 }} transition={{ duration: 0.4, ease: RX_EASE }}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2f7457]" />{mod.out}
                  </motion.span>
                </div>
              );
            })}
          </div>
        </div>

        {DATA.map((d, i) => {
          const on = i === M.from;
          return (
            <motion.span key={d} className={clsx("rx-card absolute flex h-[30px] -translate-x-1/2 items-center justify-center whitespace-nowrap rounded-[9px] font-medium", narrow ? "text-[10px]" : "text-[11.5px]")} style={{ left: DX(i), top: DATA_T, width: chip }} animate={{ color: on ? "#17191c" : "#5b6068", y: on ? -2 : 0 }} transition={{ duration: 0.4 }}>
              {on && <motion.span layoutId="pl-dot" className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#2f7457] ring-2 ring-white" />}
              {d}
            </motion.span>
          );
        })}
      </Canvas>
    </div>
  );
}

function TileIcon({ name }: { name: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "doc" || name === "graph") return <Icon name={name} size={22} />;
  if (name === "spark") return <Spark size={20} className="text-[var(--rx-2)]" />;
  return (
    <svg viewBox="0 0 16 16" width="22" height="22" aria-hidden="true">
      {name === "sheet" && <g {...p}><rect x="2.5" y="3" width="11" height="10" rx="1.5" /><path d="M2.5 6.5h11M2.5 9.8h11M6.5 3v10" /></g>}
      {name === "chat" && <path {...p} d="M3 4.5A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5v5a1.5 1.5 0 0 1-1.5 1.5H7l-3 2.5V11h.5" />}
    </svg>
  );
}
