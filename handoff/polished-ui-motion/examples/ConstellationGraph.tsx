"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Canvas } from "@/components/visual/kit";

/**
 * Knowledge Graph — "Find the connections in your data that matter".
 * A second deep-graph variant: clustered constellations. Each theme is a hub
 * with its own cloud of companies; bridges run between clouds. The highlight
 * spreads category by category — company → its themes → other companies on
 * those themes → the other themes they touch — while a small legend counts up.
 */
const W = 560;
const H = 480;
const CAM = 640;

type Node = { x: number; y: number; z: number; s: number; kind: "hub" | "co" | "dust"; c: number };

function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

function build() {
  const r = rng(11);
  const gauss = () => (r() + r() + r() - 1.5) / 1.5;
  const nodes: Node[] = [];
  const HUBS = 10;
  const hubIds: number[] = [];
  for (let i = 0; i < HUBS; i++) {
    const k = i + 0.5;
    const phi = Math.acos(1 - (2 * k) / HUBS);
    const th = Math.PI * (1 + Math.sqrt(5)) * k;
    const R = 178 + (r() - 0.5) * 50;
    hubIds.push(nodes.length);
    nodes.push({ x: R * Math.sin(phi) * Math.cos(th), y: R * Math.cos(phi) * 0.78, z: R * Math.sin(phi) * Math.sin(th), s: 1, kind: "hub", c: i });
  }
  const members: number[][] = hubIds.map(() => []);
  hubIds.forEach((h, c) => {
    const n = 34 + Math.floor(r() * 22);
    for (let j = 0; j < n; j++) {
      const sp = 40 + r() * 34;
      members[c].push(nodes.length);
      nodes.push({ x: nodes[h].x + gauss() * sp, y: nodes[h].y + gauss() * sp, z: nodes[h].z + gauss() * sp, s: 0.6 + r() * 0.8, kind: "co", c });
    }
  });
  for (let i = 0; i < 300; i++) {
    const k = i + 0.5;
    const phi = Math.acos(1 - (2 * k) / 300);
    const th = Math.PI * (1 + Math.sqrt(5)) * k + r();
    const R = 270 * (1 + (r() - 0.5) * 0.35);
    nodes.push({ x: R * Math.sin(phi) * Math.cos(th), y: R * Math.cos(phi) * 0.8, z: R * Math.sin(phi) * Math.sin(th), s: 0.5 + r() * 0.6, kind: "dust", c: -1 });
  }
  const d2 = (a: Node, b: Node) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
  const nearest = (from: number, pool: number[], k: number) => pool.filter((j) => j !== from).sort((a, b) => d2(nodes[from], nodes[a]) - d2(nodes[from], nodes[b])).slice(0, k);

  const edges: [number, number, number][] = [];
  members.forEach((m, c) => m.forEach((i, j) => { if (j % 2 === 0) edges.push([hubIds[c], i, 0.5]); nearest(i, m, 2).forEach((q) => edges.push([i, q, 0.3])); }));
  hubIds.forEach((h) => nearest(h, hubIds, 2).forEach((j) => edges.push([h, j, 0.5])));
  // random bridges: a company also tied to a neighbouring theme
  const coIds = members.flat();
  for (let i = 0; i < 70; i++) {
    const a = coIds[Math.floor(r() * coIds.length)];
    const others = nearest(hubIds[nodes[a].c], hubIds, 3);
    edges.push([a, others[Math.floor(r() * 3)], 0.18]);
  }
  const dust = nodes.map((n, i) => (n.kind === "dust" ? i : -1)).filter((i) => i >= 0);
  dust.forEach((i) => edges.push([i, nearest(i, hubIds.concat(coIds), 1)[0], 0.1]));

  // the highlight: origin company → its themes → other companies → other themes
  // origin cloud: the hub nearest the front of the opening view
  const c0 = hubIds.map((h, c) => ({ c, v: nodes[h].z * 0.4 + Math.abs(nodes[h].y) + Math.abs(nodes[h].x) * 0.5 })).sort((a, b) => a.v - b.v)[0].c;
  const themes = [c0, ...nearest(hubIds[c0], hubIds, 2).map((h) => nodes[h].c)];
  const origin = nearest(hubIds[c0], members[c0], 4)[3];
  const s1 = themes.map((c) => [origin, hubIds[c]] as [number, number]);
  const s2: [number, number][] = [];
  themes.forEach((c) => nearest(hubIds[c], members[c], 10).filter((i) => i !== origin).slice(0, 9).forEach((i) => s2.push([hubIds[c], i])));
  const used = new Set(themes);
  const s3: [number, number][] = [];
  themes.slice(1).forEach((c) => {
    nearest(hubIds[c], hubIds, 4).map((h) => nodes[h].c).filter((cc) => !used.has(cc)).slice(0, 1).forEach((cc) => {
      used.add(cc);
      const from = s2.filter(([h]) => h === hubIds[c]).map(([, i]) => i);
      nearest(hubIds[cc], from, 2).forEach((i) => s3.push([i, hubIds[cc]]));
    });
  });
  // one more from the origin's own cloud
  {
    const cc = nearest(hubIds[c0], hubIds, 5).map((h) => nodes[h].c).find((x) => !used.has(x));
    if (cc !== undefined) {
      used.add(cc);
      const from = s2.filter(([h]) => h === hubIds[c0]).map(([, i]) => i);
      nearest(hubIds[cc], from, 2).forEach((i) => s3.push([i, hubIds[cc]]));
    }
  }
  return { nodes, edges, origin, steps: [s1, s2, s3] };
}

const G = build();
const LIT_CO = new Set(G.steps[1].map(([, i]) => i));
const LIT_TH1 = new Set(G.steps[0].map(([, h]) => h));
const LIT_TH2 = new Set(G.steps[2].map(([, h]) => h));

// stage start times (ms) within a cycle: 0 company · 1 themes · 2 companies · 3 themes · hold · release
const T = [1000, 2400, 4000, 5800, 8000, 11000];
const CYCLE = 12000;
const COUNTS = [1, LIT_TH1.size, LIT_CO.size, LIT_TH2.size];

const COLORS = { co: "#ffffff", th: "#bfe0cf", co2: "#c6d6e6", th2: "#e4efe9" };

const LEGEND: { label: string; glyph: "co" | "th" | "co2" | "th2" }[] = [
  { label: "Company", glyph: "co" },
  { label: "Its themes", glyph: "th" },
  { label: "Peer companies", glyph: "co2" },
  { label: "Linked themes", glyph: "th2" },
];

export function ConstellationGraph() {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const tag = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { amount: 0.2 });
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(-1);
  const stageRef = useRef(-1);

  useEffect(() => {
    const c = cv.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const dpr = 2;
    c.width = W * dpr;
    c.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    let raf = 0;
    const t0 = performance.now();
    const proj = new Array(G.nodes.length);
    const clamp = (v: number) => Math.min(1, Math.max(0, v));

    const frame = (now: number) => {
      const t = reduce ? 9000 : now - t0;
      const ph = t % CYCLE;
      const ang = reduce ? 0.5 : t * 0.00005 + 0.5;
      const tilt = -0.28;
      const ca = Math.cos(ang), sa = Math.sin(ang), ct = Math.cos(tilt), st = Math.sin(tilt);
      for (let i = 0; i < G.nodes.length; i++) {
        const n = G.nodes[i];
        const x = n.x * ca - n.z * sa;
        let z = n.x * sa + n.z * ca;
        const y = n.y * ct - z * st;
        z = n.y * st + z * ct;
        const k = CAM / (CAM + z);
        proj[i] = { x: W / 2 + 40 + x * k, y: H / 2 - 22 + y * k, k, d: clamp((z + 300) / 600) };
      }
      const release = ph > T[5] ? 1 - (ph - T[5]) / (CYCLE - T[5]) : 1;
      const f = (s: number, dur = 1100) => clamp((ph - T[s]) / dur) * release;
      const fo = f(0, 500), f1 = f(1), f2 = f(2, 1400), f3 = f(3);
      const focus = Math.max(fo, 0) * 0.6;
      const st_ = ph >= T[3] ? 3 : ph >= T[2] ? 2 : ph >= T[1] ? 1 : ph >= T[0] ? 0 : -1;
      const ns = ph > T[5] ? -1 : st_;
      if (ns !== stageRef.current) { stageRef.current = ns; setStage(ns); }

      ctx.clearRect(0, 0, W, H);
      // base edges
      for (const [a, b, w] of G.edges) {
        const p = proj[a], q = proj[b];
        const d = 1 - (p.d + q.d) / 2;
        ctx.strokeStyle = `rgba(255,255,255,${(0.08 + 0.34 * d) * w * (1 - focus * 0.55)})`;
        ctx.lineWidth = 0.5 + 0.6 * d * w;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      }
      // lit edges, growing from parent to child
      const litEdges = (list: [number, number][], amt: number, stagger: number) => {
        list.forEach(([a, b], i) => {
          const e = clamp(amt * (1 + stagger) - (i / list.length) * stagger);
          if (e <= 0) return;
          const p = proj[a], q = proj[b];
          ctx.strokeStyle = "rgba(240,246,250,0.9)";
          ctx.lineWidth = 1.3;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + (q.x - p.x) * e, p.y + (q.y - p.y) * e); ctx.stroke();
        });
      };
      litEdges(G.steps[0], f1, 0.3);
      litEdges(G.steps[1], f2, 0.8);
      litEdges(G.steps[2], f3, 0.5);

      // halos around the lit clouds
      const halo = (set: Set<number>, amt: number, dash: number[]) => {
        if (amt <= 0) return;
        set.forEach((h) => {
          const p = proj[h];
          ctx.setLineDash(dash);
          ctx.strokeStyle = `rgba(255,255,255,${0.35 * amt})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(p.x, p.y, (58 + 10 * (1 - amt)) * p.k, 0, Math.PI * 2); ctx.stroke();
        });
        ctx.setLineDash([]);
      };
      halo(LIT_TH1, f1, []);
      halo(LIT_TH2, f3, [2, 4]);

      // nodes, back to front by depth
      const order = proj.map((_, i) => i).sort((a, b) => proj[b].d - proj[a].d);
      for (const i of order) {
        const n = G.nodes[i], p = proj[i];
        const d = 1 - p.d;
        let lit = 0;
        let col = "255,255,255";
        if (i === G.origin) { lit = fo; col = "255,255,255"; }
        else if (LIT_TH1.has(i)) { lit = f1; col = "191,224,207"; }
        else if (LIT_CO.has(i)) { lit = f2; col = "198,214,230"; }
        else if (LIT_TH2.has(i)) { lit = f3; col = "228,239,233"; }
        const baseA = (0.25 + 0.7 * d) * (1 - focus * 0.6);
        if (n.kind === "hub") {
          const r = (5.6 + 2.6 * lit) * p.k;
          const a = baseA + (1 - baseA) * lit;
          ctx.fillStyle = lit > 0 ? `rgba(${col},${a})` : `rgba(255,255,255,${a})`;
          pill(ctx, p.x, p.y, r * 2.1, r * 1.15);
          ctx.fill();
          if (lit > 0) {
            ctx.strokeStyle = `rgba(255,255,255,${0.5 * lit})`;
            ctx.lineWidth = 1;
            pill(ctx, p.x, p.y, r * 2.1 + 7, r * 1.15 + 7);
            ctx.stroke();
          }
          if (LIT_TH2.has(i) && lit > 0) {
            ctx.fillStyle = `rgba(62,83,104,${lit})`;
            pill(ctx, p.x, p.y, r * 1.2, r * 0.45);
            ctx.fill();
          }
        } else {
          const r0 = n.kind === "dust" ? 1.1 * n.s : 1.9 * n.s;
          const r = (r0 + (lit ? 1.4 * lit : 0)) * p.k;
          ctx.fillStyle = lit > 0 ? `rgba(${col},${baseA + (1 - baseA) * lit})` : `rgba(255,255,255,${n.kind === "dust" ? baseA * 0.7 : baseA})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0.6, r), 0, Math.PI * 2); ctx.fill();
          if (lit > 0 && i !== G.origin) {
            ctx.strokeStyle = `rgba(255,255,255,${0.6 * lit})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath(); ctx.arc(p.x, p.y, r + 2.6, 0, Math.PI * 2); ctx.stroke();
          }
        }
      }
      // origin marker
      if (fo > 0) {
        const p = proj[G.origin];
        ctx.fillStyle = `rgba(255,255,255,${fo})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, 6.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(233,169,58,${fo})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = `rgba(255,255,255,${0.55 * fo})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(p.x, p.y, 12 + 8 * (1 - clamp((ph - T[0]) / 900)), 0, Math.PI * 2); ctx.stroke();
        if (tag.current) {
          tag.current.style.transform = `translate(${p.x + 18}px, ${p.y - 13}px)`;
          tag.current.style.opacity = String(fo);
        }
      } else if (tag.current) tag.current.style.opacity = "0";
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    if (inView || reduce) raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);

  return (
    <div ref={wrap}>
      <Canvas w={W} h={H}>
        <canvas ref={cv} className="absolute inset-0" style={{ width: W, height: H }} />
        <div ref={tag} className="rx-card absolute left-0 top-0 flex h-[26px] items-center gap-2 whitespace-nowrap rounded-[8px] px-2.5" style={{ opacity: 0 }}>
          <span className="text-[11.5px] font-medium">NVIDIA</span>
          <span className="rx-num text-[10.5px] text-[var(--rx-3)]">NVDA</span>
        </div>
        <div className="rx-card absolute bottom-[22px] left-[72px] w-[196px] p-3.5">
          <p className="text-[11px] font-medium text-[var(--rx-3)]">Exposure map</p>
          <div className="mt-2 space-y-1">
            {LEGEND.map((l, i) => {
              const on = stage >= i;
              return (
                <div key={l.label} className={clsx("flex h-[22px] items-center gap-2.5 rounded-[6px] px-1.5 text-[11.5px] transition-colors duration-500", stage === i ? "bg-[var(--rx-well)] text-[var(--rx-ink)]" : on ? "text-[var(--rx-ink)]" : "text-[var(--rx-3)]")}>
                  <LegendGlyph g={l.glyph} />
                  <span className="flex-1 truncate">{l.label}</span>
                  <span className="rx-num text-[11px] text-[var(--rx-2)]">{on ? COUNTS[i] : "–"}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Canvas>
    </div>
  );
}

function pill(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x - w / 2 + r, y - h / 2);
  ctx.lineTo(x + w / 2 - r, y - h / 2);
  ctx.arc(x + w / 2 - r, y, r, -Math.PI / 2, Math.PI / 2);
  ctx.lineTo(x - w / 2 + r, y + h / 2);
  ctx.arc(x - w / 2 + r, y, r, Math.PI / 2, (3 * Math.PI) / 2);
  ctx.closePath();
}

/** Legend marks: same shapes the canvas draws, inked for a white card. */
function LegendGlyph({ g }: { g: "co" | "th" | "co2" | "th2" }) {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden="true" className="shrink-0">
      {g === "co" && <><circle cx="7" cy="5" r="4" fill="#24324a" /><circle cx="7" cy="5" r="1.5" fill="#e9a93a" /></>}
      {g === "th" && <rect x="1" y="2" width="12" height="6" rx="3" fill="#2f7457" />}
      {g === "co2" && <circle cx="7" cy="5" r="3.2" fill="#8fa3b6" />}
      {g === "th2" && <><rect x="1" y="2" width="12" height="6" rx="3" fill="none" stroke="#2f7457" strokeWidth="1.3" /><rect x="4.5" y="4.2" width="5" height="1.6" rx=".8" fill="#2f7457" /></>}
    </svg>
  );
}
