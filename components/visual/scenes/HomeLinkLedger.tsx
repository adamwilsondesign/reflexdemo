"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import { Canvas, Glyph, RX_EASE, Spark, useTimeline } from "@/components/visual/kit";

/**
 * Home · Knowledge Graph — "a proprietary map of relationships… hidden exposures".
 * Composition: a card with a dark, dense mini-graph inset over a live ledger of
 * relationships. Each new evidence-backed link lands at the top of the ledger
 * and flashes in the graph; the second-order one is marked.
 */
const LINKS = [
  { a: "TSMC", rel: "supplies", b: "NVIDIA", w: 0.92, src: 6 },
  { a: "Vertiv", rel: "cools", b: "Microsoft", w: 0.74, src: 4 },
  { a: "Amkor", rel: "packages for", b: "Apple", w: 0.64, src: 3 },
  { a: "Lam Research", rel: "equips", b: "TSMC", w: 0.58, src: 5, second: true },
  { a: "Eaton", rel: "powers", b: "Equinix", w: 0.61, src: 3 },
];
// 0 two links · 1–3 a new link lands · 4 hold · 5 out
const D = [1800, 2100, 2100, 2100, 3600, 700];

function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

function MiniGraph({ flash, w, h }: { flash: number; w: number; h: number }) {
  const cv = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const G = useMemo(() => {
    const r = rng(23);
    const nodes = Array.from({ length: 190 }, (_, i) => {
      const cl = i % 5;
      const cx = [0.16, 0.36, 0.55, 0.74, 0.9][cl] * w, cy = [0.5, 0.36, 0.6, 0.42, 0.58][cl] * h;
      const a = r() * Math.PI * 2, d = Math.pow(r(), 0.7) * (40 + cl * 4);
      return { x: cx + Math.cos(a) * d * 1.5, y: cy + Math.sin(a) * d * 0.62, s: 0.5 + r() * 1.3, ph: r() * 6 };
    });
    const edges: [number, number][] = [];
    nodes.forEach((n, i) => {
      const near = nodes.map((m, j) => [j, (m.x - n.x) ** 2 + (m.y - n.y) ** 2] as const).filter(([j]) => j !== i).sort((x, y) => x[1] - y[1]);
      edges.push([i, near[0][0]]);
      if (r() > 0.55) edges.push([i, near[1 + Math.floor(r() * 4)][0]]);
    });
    const hubs = [3, 41, 77, 118, 152, 9, 66, 130].map((k) => k % nodes.length);
    const hl: [number, number][] = [[hubs[0], hubs[3]], [hubs[1], hubs[4]], [hubs[2], hubs[5]], [hubs[6], hubs[0]], [hubs[7], hubs[2]]];
    return { nodes, edges, hubs, hl };
  }, [w, h]);

  useEffect(() => {
    const c = cv.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    c.width = w * 2; c.height = h * 2;
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    let raf = 0;
    const t0 = performance.now();
    const frame = (now: number) => {
      const t = reduce ? 0 : Math.max(0, now - t0) / 1000;
      const age = reduce ? 0.8 : Math.min(1, t / 1.4);
      const P = G.nodes.map((n) => ({ x: n.x + Math.sin(t * 0.5 + n.ph) * 1.6, y: n.y + Math.cos(t * 0.4 + n.ph) * 1.2 }));
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 0.6;
      for (const [a, b] of G.edges) {
        ctx.strokeStyle = "rgba(255,255,255,0.13)";
        ctx.beginPath(); ctx.moveTo(P[a].x, P[a].y); ctx.lineTo(P[b].x, P[b].y); ctx.stroke();
      }
      G.nodes.forEach((n, i) => {
        ctx.fillStyle = `rgba(255,255,255,${0.3 + n.s * 0.32})`;
        ctx.beginPath(); ctx.arc(P[i].x, P[i].y, n.s, 0, Math.PI * 2); ctx.fill();
      });
      G.hubs.forEach((i) => {
        ctx.strokeStyle = "rgba(255,255,255,0.35)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(P[i].x, P[i].y, 4.2, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(P[i].x, P[i].y, 2, 0, Math.PI * 2); ctx.fill();
      });
      if (flash >= 0) {
        const [a, b] = G.hl[flash % G.hl.length];
        const f = Math.min(1, age * 1.6);
        const ex = P[a].x + (P[b].x - P[a].x) * f, ey = P[a].y + (P[b].y - P[a].y) * f;
        ctx.lineCap = "round";
        ctx.strokeStyle = "rgba(185,205,226,0.25)"; ctx.lineWidth = 6;
        ctx.beginPath(); ctx.moveTo(P[a].x, P[a].y); ctx.lineTo(ex, ey); ctx.stroke();
        ctx.strokeStyle = "#e6edf4"; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(P[a].x, P[a].y); ctx.lineTo(ex, ey); ctx.stroke();
        for (const [x, y, k] of [[P[a].x, P[a].y, 1], [ex, ey, f]] as const) {
          ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(x, y, 3.4 * (k as number), 0, Math.PI * 2); ctx.fill();
        }
        if (f >= 1) {
          ctx.strokeStyle = `rgba(255,255,255,${0.6 * (1 - Math.min(1, (age - 0.62) * 2.5))})`;
          ctx.beginPath(); ctx.arc(P[b].x, P[b].y, 6 + 10 * Math.min(1, (age - 0.62) * 2.5), 0, Math.PI * 2); ctx.stroke();
        }
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [G, flash, w, h, reduce]);

  return <canvas ref={cv} className="absolute inset-0" style={{ width: w, height: h }} />;
}

export function HomeLinkLedger() {
  const { p, ref, cycle } = useTimeline(D, { still: 3 });
  const n = Math.min(p, 3) + 1; // index of the newest link
  const shown = LINKS.slice(0, n + 1).map((l, i) => ({ ...l, i })).reverse();

  return (
    <div ref={ref}>
      <Canvas w={560} h={400} focusX={0.25}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: p === 5 ? 0 : 1 }} transition={{ duration: 0.6 }}>
          <motion.div className="rx-card rx-card-lift absolute left-[32px] top-[24px] h-[352px] w-[496px] overflow-hidden" initial={{ y: 14 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
            <div className="relative m-2 h-[124px] overflow-hidden rounded-[10px]" style={{ background: "radial-gradient(90% 120% at 70% 0%, #2a3b4d, #17191c 70%)" }}>
              <MiniGraph flash={n} w={480} h={124} />
              <span className="absolute left-3 top-2.5 flex items-center gap-1.5 text-[10.5px] font-medium text-white/80"><Glyph kind="company" size={9} />Knowledge Graph</span>
              <span className="rx-num absolute right-3 top-2.5 text-[10.5px] text-white/70">600K+ links</span>
            </div>
            <div className="flex items-center justify-between px-5 pb-1 pt-3">
              <p className="rx-serif text-[17px]">New relationships today</p>
              <span className="text-[11px] text-[var(--rx-3)]">Weighted by evidence</span>
            </div>
            <div className="px-5">
              <AnimatePresence initial={false}>
                {shown.map((l, k) => (
                  <motion.div key={l.i} layout className="flex h-[46px] items-center gap-2 border-t border-[var(--rx-line)] text-[12.5px]" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: RX_EASE }}>
                    <Chip>{l.a}</Chip>
                    <span className="text-[11.5px] text-[var(--rx-3)]">{l.rel}</span>
                    <Chip>{l.b}</Chip>
                    {l.second && <span className="rounded-[5px] bg-[#e6ece9] px-1.5 py-px text-[10.5px] font-medium text-[#2f5c4a]">2nd order</span>}
                    <span className="ml-auto flex items-center gap-2.5">
                      {k === 0 && p < 5 && <span className="flex items-center gap-1 text-[10.5px] font-medium text-[#3e5368]"><Spark size={9} />New</span>}
                      <span className="rx-num text-[10.5px] text-[var(--rx-3)]">{l.src} sources</span>
                      <span className="relative h-[5px] w-[44px] overflow-hidden rounded-full bg-[var(--rx-well)]"><span className="absolute inset-y-0 left-0 rounded-full bg-[#3e5368]" style={{ width: `${l.w * 100}%` }} /></span>
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </Canvas>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-[24px] items-center gap-1.5 rounded-[7px] border border-[var(--rx-line)] px-2 text-[12px] font-medium">
      <Glyph kind="company" size={8} className="text-[var(--rx-3)]" />{children}
    </span>
  );
}
