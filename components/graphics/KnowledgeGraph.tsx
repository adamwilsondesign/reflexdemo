"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

/* ------------------------------------------------------------------
   Interactive Knowledge Graph
   - Force-laid network of companies, themes, products, geographies
   - Auto "event" sequence: a catalyst lands on a node and ripples
     out by hop (1st order, then 2nd order), as the product does
   - Hover/tap to inspect a node and its weighted relationships
   ------------------------------------------------------------------ */

export type KGType = "company" | "theme" | "product" | "geo";
type N = { id: string; label: string; type: KGType; x: number; y: number; vx: number; vy: number; r: number; hx: number; hy: number; minor?: boolean };
type E = { a: number; b: number; w: number; rel: string };

const SEED_NODES: [string, string, KGType][] = [
  ["AMZN", "Amazon", "company"],
  ["NVDA", "NVIDIA", "company"],
  ["TSM", "TSMC", "company"],
  ["AAPL", "Apple", "company"],
  ["MSFT", "Microsoft", "company"],
  ["AVGO", "Broadcom", "company"],
  ["ASML", "ASML", "company"],
  ["CRWV", "CoreWeave", "company"],
  ["VRT", "Vertiv", "company"],
  ["ETN", "Eaton", "company"],
  ["LLY", "Eli Lilly", "company"],
  ["NVO", "Novo Nordisk", "company"],
  ["MU", "Micron", "company"],
  ["CEG", "Constellation", "company"],
  ["AI", "AI infrastructure", "theme"],
  ["PWR", "Data center power", "theme"],
  ["GLP", "GLP-1", "theme"],
  ["AUTO", "Industrial automation", "theme"],
  ["RATES", "Rates", "theme"],
  ["GPU", "GPUs", "product"],
  ["HBM", "HBM memory", "product"],
  ["AWS", "AWS", "product"],
  ["IPH", "iPhone", "product"],
  ["TW", "Taiwan", "geo"],
  ["US", "United States", "geo"],
  ["NL", "Netherlands", "geo"],
];

const SEED_EDGES: [string, string, number, string][] = [
  ["AMZN", "AWS", 0.95, "Segment"],
  ["AWS", "AI", 0.85, "Theme exposure"],
  ["AWS", "NVDA", 0.8, "Customer of"],
  ["NVDA", "GPU", 0.95, "Product"],
  ["NVDA", "TSM", 0.9, "Supplier"],
  ["NVDA", "HBM", 0.7, "Input"],
  ["HBM", "MU", 0.75, "Product"],
  ["TSM", "TW", 0.9, "Domicile"],
  ["TSM", "ASML", 0.8, "Supplier"],
  ["ASML", "NL", 0.9, "Domicile"],
  ["TSM", "AAPL", 0.85, "Customer"],
  ["AAPL", "IPH", 0.95, "Product"],
  ["MSFT", "AI", 0.8, "Theme exposure"],
  ["MSFT", "NVDA", 0.7, "Customer of"],
  ["CRWV", "NVDA", 0.85, "Customer of"],
  ["CRWV", "MSFT", 0.6, "Customer"],
  ["AVGO", "AI", 0.7, "Theme exposure"],
  ["AVGO", "TSM", 0.7, "Supplier"],
  ["AI", "PWR", 0.8, "Driver"],
  ["PWR", "VRT", 0.85, "Beneficiary"],
  ["PWR", "ETN", 0.75, "Beneficiary"],
  ["PWR", "CEG", 0.7, "Beneficiary"],
  ["VRT", "US", 0.5, "Revenue"],
  ["AUTO", "ETN", 0.6, "Theme exposure"],
  ["AUTO", "RATES", 0.45, "Sensitivity"],
  ["GLP", "LLY", 0.95, "Leader"],
  ["GLP", "NVO", 0.92, "Leader"],
  ["LLY", "US", 0.6, "Revenue"],
  ["NVO", "RATES", 0.3, "Sensitivity"],
  ["AMZN", "US", 0.5, "Revenue"],
  ["CEG", "US", 0.6, "Domicile"],
  ["MU", "US", 0.5, "Domicile"],
  ["AAPL", "AI", 0.45, "Theme exposure"],
];

export const KG_TYPE_LABEL: Record<KGType, string> = {
  company: "Company",
  theme: "Theme",
  product: "Product / brand",
  geo: "Market / geography",
};

type Palette = { bg: string; edge: string; edgeHot: string; label: string; labelDim: string; type: Record<KGType, string>; ring: string };

const PALETTES: Record<"dark" | "light", Palette> = {
  dark: {
    bg: "transparent",
    edge: "rgba(143,163,182,0.16)",
    edgeHot: "rgba(213,222,230,0.9)",
    label: "rgba(244,243,241,0.95)",
    labelDim: "rgba(244,243,241,0.45)",
    ring: "rgba(213,222,230,0.55)",
    type: { company: "#f4f3f1", theme: "#7d978c", product: "#8fa3b6", geo: "#b7b6b2" },
  },
  light: {
    bg: "transparent",
    edge: "rgba(36,50,68,0.14)",
    edgeHot: "rgba(36,50,68,0.85)",
    label: "rgba(23,25,28,0.92)",
    labelDim: "rgba(23,25,28,0.45)",
    ring: "rgba(62,83,104,0.5)",
    type: { company: "#17191c", theme: "#3e5c50", product: "#5d738c", geo: "#6e7176" },
  },
};

function mulberry(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function build(minorCount: number) {
  const rnd = mulberry(7);
  const nodes: N[] = SEED_NODES.map(([id, label, type]) => ({
    id,
    label,
    type,
    x: (rnd() - 0.5) * 600,
    y: (rnd() - 0.5) * 400,
    vx: 0,
    vy: 0,
    r: type === "company" ? 5 : type === "theme" ? 6.5 : 4,
    hx: 0,
    hy: 0,
  }));
  const idx = new Map(nodes.map((n, i) => [n.id, i]));
  const edges: E[] = SEED_EDGES.map(([a, b, w, rel]) => ({ a: idx.get(a)!, b: idx.get(b)!, w, rel }));
  // minor nodes: the long tail of the graph
  const named = nodes.length;
  for (let i = 0; i < minorCount; i++) {
    const parent = Math.floor(rnd() * named);
    const p = nodes[parent];
    nodes.push({ id: `m${i}`, label: "", type: (["company", "product", "company", "geo"] as KGType[])[i % 4], x: p.x + (rnd() - 0.5) * 120, y: p.y + (rnd() - 0.5) * 120, vx: 0, vy: 0, r: 1.8 + rnd() * 1.4, hx: 0, hy: 0, minor: true });
    edges.push({ a: parent, b: nodes.length - 1, w: 0.2 + rnd() * 0.4, rel: "" });
    if (rnd() > 0.6) edges.push({ a: Math.floor(rnd() * named), b: nodes.length - 1, w: 0.15 + rnd() * 0.3, rel: "" });
  }
  // force layout
  for (let it = 0; it < 420; it++) {
    const alpha = 1 - it / 420;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        let dx = b.x - a.x, dy = b.y - a.y;
        let d2 = dx * dx + dy * dy;
        if (d2 < 1) { dx = rnd(); dy = rnd(); d2 = 1; }
        const rep = ((a.minor ? 600 : 2600) + (b.minor ? 600 : 2600)) / d2;
        const d = Math.sqrt(d2);
        a.vx -= (dx / d) * rep * alpha; a.vy -= (dy / d) * rep * alpha;
        b.vx += (dx / d) * rep * alpha; b.vy += (dy / d) * rep * alpha;
      }
    }
    for (const e of edges) {
      const a = nodes[e.a], b = nodes[e.b];
      const dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      const target = a.minor || b.minor ? 38 : 95;
      const k = (d - target) * 0.02 * alpha;
      a.vx += (dx / d) * k; a.vy += (dy / d) * k;
      b.vx -= (dx / d) * k; b.vy -= (dy / d) * k;
    }
    for (const n of nodes) {
      n.vx -= n.x * 0.004 * alpha; n.vy -= n.y * 0.006 * alpha;
      n.x += n.vx; n.y += n.vy; n.vx *= 0.6; n.vy *= 0.6;
    }
  }
  for (const n of nodes) { n.hx = n.x; n.hy = n.y; }
  const adj: number[][] = nodes.map(() => []);
  edges.forEach((e, i) => { adj[e.a].push(i); adj[e.b].push(i); });
  return { nodes, edges, adj, idx };
}

export type KGEvent = { focus: string; title: string };

export function KnowledgeGraph({
  tone = "dark",
  className,
  minor = 70,
  sequence = ["AMZN", "PWR", "GLP", "TSM", "AI"],
  interval = 5200,
  showLegend = true,
  onFocus,
  focus: controlledFocus,
}: {
  tone?: "dark" | "light";
  className?: string;
  minor?: number;
  sequence?: string[];
  interval?: number;
  showLegend?: boolean;
  onFocus?: (id: string) => void;
  /** Force a focus node (controlled mode, e.g. driven by tabs). */
  focus?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ x: number; y: number; label: string; type: KGType; rels: { label: string; rel: string; w: number }[] } | null>(null);
  const controlled = useRef<string | undefined>(controlledFocus);
  controlled.current = controlledFocus;
  const onFocusRef = useRef(onFocus);
  onFocusRef.current = onFocus;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const wrap = wrapRef.current!;
    const ctx = canvas.getContext("2d")!;
    const pal = PALETTES[tone];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const monoFont = getComputedStyle(document.documentElement).getPropertyValue("--font-plex-mono").trim() || "monospace";
    const { nodes, edges, adj, idx } = build(window.innerWidth < 640 ? Math.round(minor * 0.5) : minor);

    let W = 0, H = 0, dpr = 1, scale = 1;
    let visible = true;
    let raf = 0;
    let t0 = performance.now();
    let mouse = { x: -9999, y: -9999, active: false };
    let parallax = { x: 0, y: 0 };
    let hovered = -1;

    // event ripple state
    let seqI = 0;
    let focus = idx.get(controlled.current ?? sequence[0]) ?? 0;
    let focusStart = 0;
    let hop: number[] = [];

    const computeHops = (src: number) => {
      hop = nodes.map(() => Infinity);
      hop[src] = 0;
      const q = [src];
      while (q.length) {
        const c = q.shift()!;
        for (const ei of adj[c]) {
          const e = edges[ei];
          const o = e.a === c ? e.b : e.a;
          if (hop[o] === Infinity) { hop[o] = hop[c] + 1; q.push(o); }
        }
      }
    };
    computeHops(focus);
    onFocusRef.current?.(nodes[focus].id);

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      W = r.width; H = r.height; dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (const n of nodes) { minX = Math.min(minX, n.hx); maxX = Math.max(maxX, n.hx); minY = Math.min(minY, n.hy); maxY = Math.max(maxY, n.hy); }
      scale = Math.min((W * 0.86) / (maxX - minX), (H * 0.82) / (maxY - minY));
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(frame); }, { threshold: 0 });
    io.observe(wrap);

    const toScreen = (n: N) => ({ x: W / 2 + n.x * scale + parallax.x * (n.minor ? 0.6 : 1), y: H / 2 + n.y * scale + parallax.y * (n.minor ? 0.6 : 1) });

    function frame(now: number) {
      raf = 0;
      if (!visible) return;
      const t = (now - t0) / 1000;
      if (!focusStart) focusStart = now;

      // controlled focus or sequence advance
      const want = controlled.current ? idx.get(controlled.current) : undefined;
      if (want !== undefined && want !== focus) { focus = want; focusStart = now; computeHops(focus); }
      else if (want === undefined && !reduce && now - focusStart > interval && hovered < 0) {
        seqI = (seqI + 1) % sequence.length;
        focus = idx.get(sequence[seqI]) ?? 0; focusStart = now; computeHops(focus);
        onFocusRef.current?.(nodes[focus].id);
      }
      const age = Math.max(0, (now - focusStart) / 1000);

      // drift
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const k = reduce ? 0 : 1;
        n.x = n.hx + Math.sin(t * 0.35 + i * 1.7) * 5 * k;
        n.y = n.hy + Math.cos(t * 0.3 + i * 2.3) * 4 * k;
      }
      parallax.x += ((mouse.active ? (mouse.x - W / 2) * -0.025 : 0) - parallax.x) * 0.06;
      parallax.y += ((mouse.active ? (mouse.y - H / 2) * -0.025 : 0) - parallax.y) * 0.06;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const activeSrc = hovered >= 0 ? hovered : focus;
      const ripple = (h: number) => {
        // wave arrives at hop h at time h*0.55s
        if (hovered >= 0) return h <= 1 ? 1 : 0;
        const arrive = h * 0.55;
        if (age < arrive) return 0;
        const fade = h === 0 ? 1 : h === 1 ? 1 : h === 2 ? 0.6 : 0.18;
        return Math.min(1, (age - arrive) / 0.5) * fade;
      };
      const hopOf = (i: number) => {
        if (hovered >= 0) return i === hovered ? 0 : adj[hovered].some((ei) => edges[ei].a === i || edges[ei].b === i) ? 1 : Infinity;
        return hop[i];
      };

      // edges
      for (const e of edges) {
        const a = nodes[e.a], b = nodes[e.b];
        const pa = toScreen(a), pb = toScreen(b);
        const ha = hopOf(e.a), hb = hopOf(e.b);
        const h = Math.max(ha, hb);
        const lit = Number.isFinite(h) && Math.abs(ha - hb) <= 1 ? ripple(h) : 0;
        const mx = (pa.x + pb.x) / 2 + (pb.y - pa.y) * 0.12;
        const my = (pa.y + pb.y) / 2 - (pb.x - pa.x) * 0.12;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.quadraticCurveTo(mx, my, pb.x, pb.y);
        ctx.strokeStyle = lit > 0 ? pal.edgeHot.replace(/[\d.]+\)$/, `${0.12 + lit * 0.75 * e.w})`) : pal.edge;
        ctx.lineWidth = lit > 0 ? 0.8 + e.w * 1.2 * lit : 0.7;
        ctx.stroke();

        // travelling pulse along lit edges
        if (lit > 0.2 && !reduce) {
          const from = ha <= hb ? pa : pb, to = ha <= hb ? pb : pa;
          const p = ((age * 0.7 + e.w) % 1);
          const u = 1 - p;
          const px = u * u * from.x + 2 * u * p * mx + p * p * to.x;
          const py = u * u * from.y + 2 * u * p * my + p * p * to.y;
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = pal.edgeHot;
          ctx.fill();
        }
      }

      // focus ripple rings
      if (!reduce) {
        const f = toScreen(nodes[activeSrc]);
        for (let k = 0; k < 3; k++) {
          const p = ((age * 0.45 + k / 3) % 1);
          ctx.beginPath();
          ctx.arc(f.x, f.y, 8 + p * 90, 0, Math.PI * 2);
          ctx.strokeStyle = pal.ring.replace(/[\d.]+\)$/, `${(1 - p) * 0.45})`);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const p = toScreen(n);
        const h = hopOf(i);
        const lit = Number.isFinite(h) ? ripple(h) : 0;
        const col = pal.type[n.type];
        ctx.globalAlpha = n.minor ? 0.35 + lit * 0.5 : 0.55 + lit * 0.45;
        ctx.beginPath();
        const rr = n.r * (1 + (h === 0 ? 0.6 : lit * 0.25));
        if (n.type === "theme" && !n.minor) {
          // themes as rings
          ctx.arc(p.x, p.y, rr + 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.stroke();
          ctx.beginPath(); ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill();
        } else if (n.type === "geo" && !n.minor) {
          ctx.rect(p.x - rr, p.y - rr, rr * 2, rr * 2);
          ctx.strokeStyle = col; ctx.lineWidth = 1.3; ctx.stroke();
        } else if (n.type === "product" && !n.minor) {
          ctx.moveTo(p.x, p.y - rr - 1); ctx.lineTo(p.x + rr + 1, p.y); ctx.lineTo(p.x, p.y + rr + 1); ctx.lineTo(p.x - rr - 1, p.y); ctx.closePath();
          ctx.fillStyle = col; ctx.fill();
        } else {
          ctx.arc(p.x, p.y, rr, 0, Math.PI * 2);
          ctx.fillStyle = col; ctx.fill();
        }
        ctx.globalAlpha = 1;

        if (!n.minor && W > 420) {
          const showLabel = lit > 0.05 || h === 0 || i === hovered;
          ctx.font = `${h === 0 ? 600 : 500} ${h === 0 ? 13 : 11.5}px ${monoFont}`;
          ctx.fillStyle = showLabel ? pal.label : pal.labelDim;
          ctx.globalAlpha = showLabel ? Math.max(0.35, lit) : 0.5;
          const txt = n.type === "company" ? n.id : n.label;
          ctx.fillText(txt.toUpperCase(), p.x + rr + 7, p.y + 4);
          ctx.globalAlpha = 1;
        }
      }

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    const pick = (x: number, y: number) => {
      let best = -1, bd = 22 * 22;
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].minor) continue;
        const p = toScreen(nodes[i]);
        const d = (p.x - x) ** 2 + (p.y - y) ** 2;
        if (d < bd) { bd = d; best = i; }
      }
      return best;
    };
    const describe = (i: number, x: number, y: number) => {
      const n = nodes[i];
      const rels = adj[i]
        .map((ei) => edges[ei])
        .filter((e) => !nodes[e.a].minor && !nodes[e.b].minor)
        .sort((a, b) => b.w - a.w)
        .slice(0, 4)
        .map((e) => ({ label: nodes[e.a === i ? e.b : e.a].label, rel: e.rel, w: e.w }));
      setHover({ x, y, label: n.label, type: n.type, rels });
    };
    const onMove = (ev: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse = { x: ev.clientX - r.left, y: ev.clientY - r.top, active: true };
      const i = pick(mouse.x, mouse.y);
      if (i !== hovered) {
        hovered = i;
        canvas.style.cursor = i >= 0 ? "pointer" : "default";
        if (i >= 0) describe(i, mouse.x, mouse.y);
        else setHover(null);
      } else if (i >= 0) {
        setHover((h) => (h ? { ...h, x: mouse.x, y: mouse.y } : h));
      }
    };
    const onLeave = () => { mouse.active = false; hovered = -1; setHover(null); };
    const onDown = (ev: PointerEvent) => {
      if (ev.pointerType === "mouse") return;
      const r = canvas.getBoundingClientRect();
      const i = pick(ev.clientX - r.left, ev.clientY - r.top);
      if (i >= 0) { focus = i; focusStart = performance.now(); computeHops(i); describe(i, ev.clientX - r.left, ev.clientY - r.top); onFocusRef.current?.(nodes[i].id); }
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tone, minor, interval]);

  const dark = tone === "dark";
  return (
    <div ref={wrapRef} className={clsx("relative h-full w-full select-none", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 touch-pan-y" aria-label="Interactive map of relationships between companies, themes, products and markets" role="img" />
      {hover && (
        <div
          className={clsx(
            "pointer-events-none absolute z-10 w-[230px] rounded-lg border p-3 text-left shadow-xl backdrop-blur-md",
            dark ? "border-white/10 bg-[#1b1e23]/90 text-paper" : "border-ink/10 bg-white/95 text-ink",
          )}
          style={{ left: Math.min(hover.x + 16, 9999), top: hover.y + 16, transform: hover.x > 0 ? undefined : undefined }}
        >
          <p className="t-ui opacity-60">{KG_TYPE_LABEL[hover.type]}</p>
          <p className="mt-1 font-display text-[15px] font-semibold">{hover.label}</p>
          <ul className="mt-2 space-y-1.5">
            {hover.rels.map((r) => (
              <li key={r.label + r.rel} className="flex items-center gap-2 text-[12px]">
                <span className={clsx("h-1 rounded-full", dark ? "bg-lake-300" : "bg-lake-500")} style={{ width: `${Math.round(r.w * 36)}px` }} />
                <span className="truncate opacity-80">
                  {r.rel} · {r.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showLegend && (
        <ul className={clsx("t-ui pointer-events-none absolute bottom-3 left-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] sm:bottom-4 sm:left-4", dark ? "text-paper/55" : "text-ink/55")}>
          <li className="flex items-center gap-1.5"><span className={clsx("h-2 w-2 rounded-full", dark ? "bg-paper" : "bg-ink")} />Company</li>
          <li className="flex items-center gap-1.5"><span className={clsx("h-2 w-2 rounded-full border-[1.5px]", dark ? "border-pine-300" : "border-pine-500")} />Theme</li>
          <li className="flex items-center gap-1.5"><span className={clsx("h-2 w-2 rotate-45", dark ? "bg-lake-300" : "bg-lake-500")} />Product</li>
          <li className="flex items-center gap-1.5"><span className={clsx("h-2 w-2 border-[1.3px]", dark ? "border-neutral-300" : "border-neutral-500")} />Market</li>
        </ul>
      )}
    </div>
  );
}
