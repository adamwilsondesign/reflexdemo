"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { Canvas } from "@/components/visual/kit";

/**
 * Direction B — "Deep graph".
 * An abstract, slowly turning three-dimensional Knowledge Graph: a core entity,
 * a shell of themes, a shell of companies and a far field of the long tail.
 * Depth is carried by size and brightness. An amber signal travels three hops
 * out from the core; small crisp tags name each hop as it arrives.
 */
const W = 560;
const H = 480;
const CAM = 720;

type N = { x: number; y: number; z: number; s: number; shell: number };

function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

function build() {
  const r = rng(7);
  const nodes: N[] = [{ x: 0, y: 0, z: 0, s: 1, shell: 0 }];
  const shell = (count: number, radius: number, jitter: number, shellId: number) => {
    for (let i = 0; i < count; i++) {
      // fibonacci sphere for even spread, then jitter the radius
      const k = i + 0.5;
      const phi = Math.acos(1 - (2 * k) / count);
      const th = Math.PI * (1 + Math.sqrt(5)) * k + r() * 0.4;
      const rr = radius * (1 + (r() - 0.5) * jitter);
      nodes.push({ x: rr * Math.sin(phi) * Math.cos(th), y: rr * Math.cos(phi) * 0.82, z: rr * Math.sin(phi) * Math.sin(th), s: 0.6 + r() * 0.8, shell: shellId });
    }
  };
  shell(14, 96, 0.2, 1);
  shell(84, 172, 0.2, 2);
  shell(320, 262, 0.28, 3);
  const d2 = (a: N, b: N) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
  const edges: [number, number, number][] = [];
  const near = (i: number, pool: number[], k: number, w: number) => {
    pool.filter((j) => j !== i).sort((a, b) => d2(nodes[i], nodes[a]) - d2(nodes[i], nodes[b])).slice(0, k).forEach((j) => edges.push([i, j, w]));
  };
  const ids = (sh: number) => nodes.map((n, i) => (n.shell === sh ? i : -1)).filter((i) => i >= 0);
  const s1 = ids(1), s2 = ids(2), s3 = ids(3);
  s1.forEach((i) => edges.push([0, i, 1]));
  s2.forEach((i) => { near(i, s1, 1, 0.8); near(i, s2, 2, 0.4); });
  s3.forEach((i) => { near(i, s2, 1, 0.22); near(i, s3, 1, 0.12); });
  // two signal paths: core → theme → company → long tail
  const pathFrom = (t: number) => {
    const a = s1[t];
    const b = s2.slice().sort((x, y) => d2(nodes[a], nodes[x]) - d2(nodes[a], nodes[y]))[1];
    const c = s3.slice().sort((x, y) => d2(nodes[b], nodes[x]) - d2(nodes[b], nodes[y]))[0];
    return [0, a, b, c];
  };
  return { nodes, edges, paths: [pathFrom(2), pathFrom(7)] };
}

const G = build();
const TAGS = [
  [["AAPL", "Origin"], ["Advanced packaging", "Theme"], ["Amkor", "+2.31%"], ["Arizona", "Geography"]],
  [["AAPL", "Origin"], ["Audio and haptics", "Theme"], ["Cirrus Logic", "+1.84%"], ["Taiwan", "Geography"]],
];

const CYCLE = 9000; // per path: 0–1.2s calm, 1.2–3.6s signal travels, 3.6–8s hold, 8–9s release

export function DeepGraph() {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);
  const inView = useInView(wrap, { amount: 0.2 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const c = cv.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const dpr = 2;
    c.width = W * dpr;
    c.height = H * dpr;
    ctx.scale(dpr, dpr);
    let raf = 0;
    const t0 = performance.now();
    const proj = new Array(G.nodes.length);

    const frame = (now: number) => {
      const t = reduce ? 5200 : Math.max(0, now - t0);
      const ang = reduce ? 0.6 : t * 0.00006 + 0.6;
      const tilt = -0.32;
      const ca = Math.cos(ang), sa = Math.sin(ang), ct = Math.cos(tilt), st = Math.sin(tilt);
      for (let i = 0; i < G.nodes.length; i++) {
        const n = G.nodes[i];
        const x = n.x * ca - n.z * sa;
        let z = n.x * sa + n.z * ca;
        const y = n.y * ct - z * st;
        z = n.y * st + z * ct;
        const k = CAM / (CAM + z);
        proj[i] = { x: W / 2 + x * k, y: H / 2 + y * k, k, d: Math.min(1, Math.max(0, (z + 260) / 520)) };
      }
      const which = reduce ? 0 : Math.floor(t / CYCLE) % 2;
      const ph = reduce ? 5200 : t % CYCLE;
      const path = G.paths[which];
      const travel = Math.min(1, Math.max(0, (ph - 1200) / 2400)); // 0..1 over three hops
      const release = ph > 8000 ? 1 - (ph - 8000) / 1000 : 1;
      const hop = travel * 3;

      ctx.clearRect(0, 0, W, H);
      // orbit rings: one per shell, in the rotating equatorial plane
      for (const R of [96, 172, 262]) {
        ctx.beginPath();
        for (let k = 0; k <= 96; k++) {
          const a = (k / 96) * Math.PI * 2;
          const ox = R * Math.cos(a), oz = R * Math.sin(a);
          const x = ox * ca - oz * sa;
          let z = ox * sa + oz * ca;
          const y = -z * st;
          z = z * ct;
          const kk = CAM / (CAM + z);
          if (k === 0) ctx.moveTo(W / 2 + x * kk, H / 2 + y * kk); else ctx.lineTo(W / 2 + x * kk, H / 2 + y * kk);
        }
        ctx.strokeStyle = "rgba(255,255,255,0.09)";
        ctx.lineWidth = 1;
        ctx.setLineDash(R === 172 ? [] : [2, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      // edges, back to front
      for (const [a, b, w] of G.edges) {
        const p = proj[a], q = proj[b];
        const d = 1 - (p.d + q.d) / 2;
        ctx.strokeStyle = `rgba(255,255,255,${(0.05 + 0.22 * d) * w})`;
        ctx.lineWidth = 0.6 + 0.5 * d * w;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
      // nodes
      for (let i = 0; i < G.nodes.length; i++) {
        const n = G.nodes[i], p = proj[i];
        const d = 1 - p.d;
        const r = (n.shell === 0 ? 9 : n.shell === 1 ? 3.6 : n.shell === 2 ? 2.4 : 1.3) * n.s * p.k * (n.shell === 0 ? 1 : 1);
        ctx.fillStyle = `rgba(255,255,255,${0.25 + 0.7 * d})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, r), 0, Math.PI * 2);
        ctx.fill();
        if (n.shell <= 1) {
          ctx.strokeStyle = `rgba(255,255,255,${0.15 + 0.3 * d})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r + (n.shell === 0 ? 7 : 4), 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      // signal path
      if (travel > 0 && release > 0) {
        ctx.save();
        ctx.globalAlpha = release;
        ctx.lineCap = "round";
        for (let h = 0; h < 3; h++) {
          const f = Math.min(1, Math.max(0, hop - h));
          if (f <= 0) break;
          const a = proj[path[h]], b = proj[path[h + 1]];
          const ex = a.x + (b.x - a.x) * f, ey = a.y + (b.y - a.y) * f;
          ctx.strokeStyle = "rgba(185,205,226,0.22)";
          ctx.lineWidth = 7;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(ex, ey); ctx.stroke();
          ctx.strokeStyle = "#e6edf4";
          ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(ex, ey); ctx.stroke();
          if (f < 1) {
            ctx.fillStyle = "#ffffff";
            ctx.beginPath(); ctx.arc(ex, ey, 3.2, 0, Math.PI * 2); ctx.fill();
          }
        }
        for (let h = 0; h <= 3; h++) {
          if (hop < h) break;
          const p = proj[path[h]];
          const age = Math.min(1, (hop - h) * 3 + (h === 0 ? 1 : 0));
          ctx.fillStyle = "#e6edf4";
          ctx.beginPath(); ctx.arc(p.x, p.y, h === 0 ? 10 : 4.5, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = `rgba(185,205,226,${0.5 * (1 - age) + 0.3})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.arc(p.x, p.y, (h === 0 ? 16 : 9) + 10 * (1 - age), 0, Math.PI * 2); ctx.stroke();
        }
        ctx.restore();
      }
      // tags follow their nodes
      for (let h = 0; h < 4; h++) {
        const el = tagRefs.current[h];
        if (!el) continue;
        const p = proj[path[h]];
        const on = travel > 0 && hop >= h - 0.02 && release > 0;
        el.style.transform = `translate(${p.x + (h === 0 ? 20 : 12)}px, ${p.y - 13}px)`;
        el.style.opacity = on ? String(release) : "0";
        const label = TAGS[which][h];
        if (el.dataset.k !== `${which}-${h}`) {
          el.dataset.k = `${which}-${h}`;
          (el.children[0] as HTMLElement).textContent = label[0];
          (el.children[1] as HTMLElement).textContent = label[1];
        }
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    if (inView || reduce) raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);

  return (
    <div ref={wrap}>
      <Canvas w={W} h={H}>
        <canvas ref={cv} className="absolute inset-0" style={{ width: W, height: H }} />
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            ref={(el) => { tagRefs.current[i] = el; }}
            className="rx-card absolute left-0 top-0 flex h-[26px] items-center gap-2 whitespace-nowrap rounded-[8px] px-2.5 transition-opacity duration-500"
            style={{ opacity: 0 }}
          >
            <span className="text-[11.5px] font-medium" />
            <span className="rx-num text-[10.5px] text-[var(--rx-3)]" />
          </div>
        ))}
      </Canvas>
    </div>
  );
}
