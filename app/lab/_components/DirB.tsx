"use client";

import { AnimatePresence, motion } from "motion/react";
import { Canvas, CiteChip, Delta, Glyph, Mono, RX_EASE, Spark, Ticker, useTimeline } from "@/components/visual/kit";

/**
 * Direction B — "Graph native".
 * The Knowledge Graph's own legend (circle company, pill theme, square geography,
 * diamond product). An amber path traces Apple's exposure to a less obvious name;
 * a floating card names it. Then a second path.
 */
const LINE = "rgb(255 255 255 / 0.28)";

const EDGES = [
  "M124 190 L62 114",
  "M168 183 L258 70",
  "M330 136 L266 70",
  "M488 112 L500 186",
  "M118 232 L58 292",
  "M184 200 C220 160 240 150 275 150",
  "M425 150 C450 150 466 124 472 110",
  "M186 222 C226 240 240 262 260 262",
  "M400 262 C430 262 452 290 458 312",
];

const PATHS = [
  { d: "M184 200 C220 160 240 150 275 150 L425 150 C450 150 466 124 472 110", target: "AMKR" },
  { d: "M186 222 C226 240 240 262 260 262 L400 262 C430 262 452 290 458 312", target: "CRUS" },
];

const CARDS = {
  AMKR: { name: "Amkor Technology", tone: "#243244", rank: "Rank 1 of 12", via: "Advanced packaging", m: 2.31, cite: 2, line: "M0 30 C20 28 30 22 50 24 S80 14 100 16 S130 8 150 10 S175 4 190 5" },
  CRUS: { name: "Cirrus Logic", tone: "#3e5368", rank: "Rank 2 of 12", via: "Audio and haptics", m: 1.84, cite: 1, line: "M0 26 C20 30 30 20 50 22 S80 18 100 12 S130 16 150 10 S175 8 190 6" },
} as const;

// 0 build · 1 path A · 2 card A · 3 path B + card B · 4 out
const D = [2000, 1700, 3600, 4400, 700];

export function DirB() {
  const { p, ref, cycle } = useTimeline(D, { still: 2 });
  const which = p >= 3 ? 1 : 0;
  const lit = p >= 1 && p <= 3 ? PATHS[which].target : null;
  const card = p >= 2 && p <= 3 ? CARDS[PATHS[which].target as keyof typeof CARDS] : null;
  const out = p === 4;

  return (
    <div ref={ref}>
      <Canvas w={560} h={480}>
        <motion.div key={cycle} className="absolute inset-0 text-white" animate={{ opacity: out ? 0 : 1 }} transition={{ duration: 0.6 }}>
          <p className="absolute left-0 top-0 text-[11px] font-medium text-white/60">Knowledge Graph · Apple ecosystem</p>

          <svg className="absolute inset-0 overflow-visible" width="560" height="480" viewBox="0 0 560 480" fill="none">
            {EDGES.map((d, i) => (
              <motion.path key={d} d={d} stroke={LINE} strokeWidth="1.2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 + i * 0.09, duration: 0.9, ease: RX_EASE }} />
            ))}
            <AnimatePresence>
              {lit && (
                <motion.g key={lit} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  <motion.path d={PATHS[which].d} stroke="var(--rx-signal)" strokeOpacity="0.25" strokeWidth="8" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.3, ease: RX_EASE }} />
                  <motion.path d={PATHS[which].d} stroke="var(--rx-signal)" strokeWidth="2.2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.3, ease: RX_EASE }} />
                </motion.g>
              )}
            </AnimatePresence>
          </svg>

          {/* Apple: the origin */}
          <Node x={150} y={215} d={0.1}>
            <span className="absolute -inset-[10px] rounded-full bg-white/10" />
            <span className="relative grid h-[72px] w-[72px] place-items-center rounded-full border-2 border-white bg-[#33465d] text-[17px] font-semibold tracking-[-0.02em]">AAPL</span>
          </Node>
          <Label x={150} y={268} d={0.2} center title="Apple" sub="Origin" />

          <Node x={56} y={108} d={0.5}><Glyph kind="product" size={14} className="text-white" /></Node>
          <Label x={56} y={70} d={0.5} center title="iPhone" sub="Product" />

          <Node x={262} y={64} d={0.6}><Glyph kind="company" size={14} className="text-white" /></Node>
          <Label x={280} y={56} d={0.6} title="TSMC" sub="Supplier · #1" />

          <Node x={52} y={298} d={0.7}><Glyph kind="company" size={14} className="text-white" /></Node>
          <Label x={52} y={312} d={0.7} center title="Corning" sub="Supplier" />

          <Pill x={350} y={150} w={150} d={0.8} lit={lit === "AMKR"}>Advanced packaging</Pill>
          <Pill x={330} y={262} w={140} d={0.9} lit={lit === "CRUS"}>Audio and haptics</Pill>

          <Target x={488} y={92} t="AMKR" lit={lit === "AMKR"} d={1.0} />
          <Label x={462} y={84} d={1.0} title="Amkor" sub="" right />
          <Target x={470} y={332} t="CRUS" lit={lit === "CRUS"} d={1.1} />
          <Label x={470} y={364} d={1.1} center title="Cirrus Logic" sub="" />

          <Node x={500} y={196} d={1.2}><Glyph kind="geo" size={13} className="text-white" /></Node>
          <Label x={500} y={210} d={1.2} center title="Arizona" sub="Geography" />

          {/* result card */}
          <AnimatePresence mode="wait">
            {card && (
              <motion.div
                key={card.name}
                className="rx-card rx-card-lift absolute left-[8px] top-[352px] w-[262px] p-4 text-[var(--rx-ink)]"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.7, ease: RX_EASE, delay: p === 3 ? 1.1 : 0 }}
              >
                <div className="flex items-center gap-2.5">
                  <Mono t={PATHS[which].target.slice(0, 2)} tone={card.tone} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium leading-4">{card.name}</span>
                    <span className="block text-[11px] leading-4 text-[var(--rx-3)]">{card.rank}</span>
                  </span>
                  <Delta v={card.m} />
                </div>
                <svg viewBox="0 0 190 36" className="mt-3 h-9 w-full overflow-visible">
                  <defs>
                    <linearGradient id={`fill-${PATHS[which].target}`} x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#2f7457" stopOpacity="0.18" />
                      <stop offset="1" stopColor="#2f7457" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path d={`${card.line} L190 36 L0 36 Z`} fill={`url(#fill-${PATHS[which].target})`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} />
                  <motion.path d={card.line} fill="none" stroke="var(--rx-up)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 1.1, ease: RX_EASE }} />
                </svg>
                <p className="mt-2.5 flex items-center gap-1.5 border-t border-[var(--rx-line)] pt-2.5 text-[11.5px] text-[var(--rx-2)]">
                  <Spark size={11} className="text-[var(--rx-signal)]" />
                  Via {card.via}
                  <CiteChip n={card.cite} active />
                  <span className="ml-auto"><Ticker>{PATHS[which].target}</Ticker></span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Canvas>
    </div>
  );
}

function Node({ x, y, d, children }: { x: number; y: number; d: number; children: React.ReactNode }) {
  return (
    <motion.div className="absolute grid place-items-center" style={{ left: x, top: y, x: "-50%", y: "-50%" }} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: d, duration: 0.6, ease: RX_EASE }}>
      {children}
    </motion.div>
  );
}

function Label({ x, y, d, title, sub, center, right }: { x: number; y: number; d: number; title: string; sub: string; center?: boolean; right?: boolean }) {
  return (
    <motion.div
      className="absolute whitespace-nowrap"
      style={{ left: x, top: y, x: center ? "-50%" : right ? "-100%" : 0, textAlign: center ? "center" : right ? "right" : "left" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: d + 0.15, duration: 0.6 }}
    >
      <p className="text-[12px] font-medium leading-4 text-white/90">{title}</p>
      {sub && <p className="rx-num text-[9px] uppercase leading-4 tracking-[0.12em] text-white/50">{sub}</p>}
    </motion.div>
  );
}

function Pill({ x, y, w, d, lit, children }: { x: number; y: number; w: number; d: number; lit: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      className="absolute grid h-7 place-items-center rounded-full border text-[11.5px] font-medium"
      style={{ left: x, top: y, width: w, x: "-50%", y: "-50%" }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1, borderColor: lit ? "#e9a93a" : "rgba(255,255,255,0.35)", backgroundColor: lit ? "#5b5a4f" : "#41546b", color: lit ? "#ffe1a8" : "#ffffff" }}
      transition={{ delay: lit ? 0.4 : d, duration: 0.6, ease: RX_EASE }}
    >
      {children}
    </motion.div>
  );
}

function Target({ x, y, t, lit, d }: { x: number; y: number; t: string; lit: boolean; d: number }) {
  return (
    <Node x={x} y={y} d={d}>
      <motion.span className="absolute -inset-[8px] rounded-full" animate={{ backgroundColor: lit ? "rgba(233,169,58,0.25)" : "rgba(255,255,255,0)" }} transition={{ delay: lit ? 1.1 : 0, duration: 0.6 }} />
      <motion.span
        className="relative grid h-10 w-10 place-items-center rounded-full border-[1.5px] text-[10.5px] font-semibold"
        animate={{ backgroundColor: lit ? "#e9a93a" : "rgba(51,70,93,1)", borderColor: lit ? "#e9a93a" : "#ffffff", color: lit ? "#17191c" : "#ffffff" }}
        transition={{ delay: lit ? 1.1 : 0, duration: 0.5 }}
      >
        {t}
      </motion.span>
    </Node>
  );
}
