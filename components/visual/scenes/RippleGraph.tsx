"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import { Canvas } from "@/components/visual/kit";

/**
 * "Ripple" — an abstract, dense Knowledge Graph seen from slightly above.
 * Banded rings of entities slowly turn; a wave leaves the catalyst at the
 * centre and lights every node it reaches, while the strongest path is drawn
 * three hops out. Crisp tags appear only on that path.
 * For dark fields (ink).
 */
type N = { a: number; r: number; s: number; band: number };

function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

function build(seed: number) {
  const r = rng(seed);
  const nodes: N[] = [{ a: 0, r: 0, s: 1, band: 0 }];
  const band = (count: number, radius: number, spread: number, id: number) => {
    for (let i = 0; i < count; i++) nodes.push({ a: (i / count) * Math.PI * 2 + r() * 0.5, r: radius + (r() - 0.5) * spread, s: 0.6 + r() * 0.8, band: id });
  };
  band(11, 78, 22, 1);
  band(46, 150, 46, 2);
  band(230, 236, 92, 3);
  const pos = (n: N) => [n.r * Math.cos(n.a), n.r * Math.sin(n.a)];
  const d2 = (a: N, b: N) => { const [ax, ay] = pos(a), [bx, by] = pos(b); return (ax - bx) ** 2 + (ay - by) ** 2; };
  const ids = (b: number) => nodes.map((n, i) => (n.band === b ? i : -1)).filter((i) => i >= 0);
  const b1 = ids(1), b2 = ids(2), b3 = ids(3);
  const edges: [number, number, number][] = [];
  const near = (i: number, pool: number[], k: number, w: number) => pool.filter((j) => j !== i).sort((x, y) => d2(nodes[i], nodes[x]) - d2(nodes[i], nodes[y])).slice(0, k).forEach((j) => edges.push([i, j, w]));
  b1.forEach((i) => edges.push([0, i, 1]));
  b2.forEach((i) => { near(i, b1, 1, 0.8); near(i, b2, 2, 0.4); });
  b3.forEach((i) => { near(i, b2, 1, 0.24); near(i, b3, 2, 0.12); });
  // the traced path is picked per cycle, facing the viewer (down-right), so its tags never stack
  const ang = (x: number, t: number) => Math.abs(Math.atan2(Math.sin(x - t), Math.cos(x - t)));
  const pick = (rot: number) => {
    const target = Math.PI / 2 - 0.42 - rot;
    const best = (pool: number[], t: number) => pool.slice().sort((x, y) => ang(nodes[x].a, t) - ang(nodes[y].a, t))[0];
    const a = best(b1, target);
    const b = best(b2, nodes[a].a - 0.12);
    const c = best(b3, nodes[b].a - 0.12);
    return [0, a, b, c];
  };
  return { nodes, edges, pick };
}

const CYCLE = 8600; // 0–0.8s calm · 0.8–3.6s wave + path · hold · 7.6–8.6s release

export function RippleGraph({ tags, w = 560, h = 480, seed = 11 }: { tags: [string, string][]; w?: number; h?: number; seed?: number }) {
  const G = useMemo(() => build(seed), [seed]);
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);
  const inView = useInView(wrap, { amount: 0.2 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const c = cv.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    c.width = w * 2;
    c.height = h * 2;
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    let raf = 0;
    const t0 = performance.now();
    const cx = w / 2, cy = h / 2 + 6, SQ = 0.62;
    const P = G.nodes.map(() => ({ x: 0, y: 0, d: 0 }));
    let pathFor = -1;
    let path = G.pick(0.4);

    const frame = (now: number) => {
      const t = reduce ? 5000 : now - t0;
      const ph = reduce ? 5000 : t % CYCLE;
      const rot = reduce ? 0.4 : t * 0.000035 + 0.4;
      for (let i = 0; i < G.nodes.length; i++) {
        const n = G.nodes[i];
        const a = n.a + rot;
        const x = n.r * Math.cos(a), z = n.r * Math.sin(a);
        P[i] = { x: cx + x, y: cy + z * SQ, d: (z / 280 + 1) / 2 }; // d: 0 far … 1 near
      }
      const ci = reduce ? 0 : Math.floor(t / CYCLE);
      if (ci !== pathFor) { pathFor = ci; path = G.pick(rot + (CYCLE * 0.000035) * 0.6); }
      const wave = Math.max(0, (ph - 800) / 2800) * 320;
      const release = ph > 7600 ? 1 - (ph - 7600) / 1000 : 1;
      const hop = Math.min(3, Math.max(0, (ph - 900) / 900));

      ctx.clearRect(0, 0, w, h);
      // band guides
      for (const R of [78, 150, 236]) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, R, R * SQ, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.setLineDash(R === 150 ? [] : [2, 4]);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.setLineDash([]);
      // wave front
      if (wave > 0 && wave < 320 && release > 0) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, wave, wave * SQ, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(214,226,238,${0.35 * (1 - wave / 320)})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
      const lit = (i: number) => {
        const n = G.nodes[i];
        if (wave <= 0) return 0;
        const k = (wave - n.r) / 60;
        return k < 0 ? 0 : Math.max(0.25, 1 - k * 0.25) * release;
      };
      for (const [a, b, wt] of G.edges) {
        const p = P[a], q = P[b];
        const d = (p.d + q.d) / 2;
        const l = Math.min(lit(a), lit(b));
        ctx.strokeStyle = `rgba(255,255,255,${(0.05 + 0.2 * d) * wt + l * 0.12 * wt})`;
        ctx.lineWidth = 0.6 + 0.5 * d * wt;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      }
      for (let i = 0; i < G.nodes.length; i++) {
        const n = G.nodes[i], p = P[i];
        const l = lit(i);
        const r = (n.band === 0 ? 8 : n.band === 1 ? 3.4 : n.band === 2 ? 2.3 : 1.3) * n.s * (0.8 + 0.4 * p.d);
        ctx.fillStyle = `rgba(255,255,255,${0.28 + 0.6 * p.d + l * 0.3})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0.6, r + l * 0.6), 0, Math.PI * 2); ctx.fill();
        if (n.band <= 1) {
          ctx.strokeStyle = `rgba(255,255,255,${0.18 + 0.3 * p.d})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, r + (n.band === 0 ? 7 : 4), 0, Math.PI * 2); ctx.stroke();
        }
      }
      // traced path
      if (hop > 0 && release > 0) {
        ctx.save();
        ctx.globalAlpha = release;
        ctx.lineCap = "round";
        for (let k = 0; k < 3; k++) {
          const f = Math.min(1, Math.max(0, hop - k));
          if (f <= 0) break;
          const a = P[path[k]], b = P[path[k + 1]];
          const ex = a.x + (b.x - a.x) * f, ey = a.y + (b.y - a.y) * f;
          ctx.strokeStyle = "rgba(185,205,226,0.22)"; ctx.lineWidth = 7;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(ex, ey); ctx.stroke();
          ctx.strokeStyle = "#e6edf4"; ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(ex, ey); ctx.stroke();
        }
        for (let k = 0; k <= 3; k++) {
          if (hop < k) break;
          const p = P[path[k]];
          ctx.fillStyle = "#eef2f6";
          ctx.beginPath(); ctx.arc(p.x, p.y, k === 0 ? 9 : 4.4, 0, Math.PI * 2); ctx.fill();
          if (k === 3) { ctx.fillStyle = "#e9a93a"; ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); ctx.fill(); }
        }
        ctx.restore();
      }
      for (let k = 0; k < 4; k++) {
        const el = tagRefs.current[k];
        if (!el) continue;
        const p = P[path[k]];
        const tw = el.offsetWidth;
        const left = p.x + (k === 0 ? 18 : 11) + tw > w - 6 ? p.x - (k === 0 ? 18 : 11) - tw : p.x + (k === 0 ? 18 : 11);
        el.style.transform = `translate(${left}px, ${p.y - 13}px)`;
        el.style.opacity = hop >= k - 0.02 && hop > 0 && release > 0 ? String(release) : "0";
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    if (inView || reduce) raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, G, w, h]);

  return (
    <div ref={wrap}>
      <Canvas w={w} h={h}>
        <canvas ref={cv} className="absolute inset-0" style={{ width: w, height: h }} />
        {tags.slice(0, 4).map(([a, b], i) => (
          <div key={i} ref={(el) => { tagRefs.current[i] = el; }} className="rx-card absolute left-0 top-0 flex h-[26px] items-center gap-2 whitespace-nowrap rounded-[8px] px-2.5 transition-opacity duration-500" style={{ opacity: 0 }}>
            <span className="text-[11.5px] font-medium">{a}</span>
            <span className="rx-num text-[10.5px] text-[var(--rx-3)]">{b}</span>
          </div>
        ))}
      </Canvas>
    </div>
  );
}
