"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";

/* ==================================================================
   RX visual kit — animated, abstracted product-UI illustrations.
   Portable: depends on react, motion (motion/react), clsx, Tailwind v4,
   and kit.css (tokens + field gradients). Install at
   components/visual/kit.tsx so the examples' imports resolve.
   - Composed on a fixed design canvas and scaled to fit, so every
     composition is pixel-exact at any width.
   - Motion is driven by a timeline of phases that the UI itself acts
     out (a cursor moves and clicks, rows arrive, a path draws). There
     are no visible state controls.
   ================================================================== */

export const RX_EASE = [0.22, 1, 0.36, 1] as const;
export const RX_SPRING = { type: "spring", stiffness: 260, damping: 30, mass: 0.9 } as const;

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Fixed design canvas (w×h) scaled to the container width.
 * Scale is capped at `maxScale` so UI type stays at its designed size in big slots (the canvas
 * centres instead). On narrow screens the scale never drops below `minScale` (keeps UI text legible);
 * the canvas is then cropped horizontally around `focusX` (0 = left, 1 = right).
 */
export function Canvas({ w, h, children, className, minScale = 0.74, maxScale = 1.12, focusX = 0.5 }: { w: number; h: number; children: React.ReactNode; className?: string; minScale?: number; maxScale?: number; focusX?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [m, setM] = useState<{ s: number; cw: number } | null>(null);
  useIso(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => { const cw = el.clientWidth; setM({ s: Math.min(maxScale, Math.max(cw / w, Math.min(minScale, 1))), cw }); };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, [w, minScale, maxScale]);
  const s = m?.s ?? 1;
  const dx = m ? (w * s > m.cw ? -(w * s - m.cw) * focusX : (m.cw - w * s) / 2) : 0;
  return (
    <div ref={ref} className={clsx("rx relative w-full", m && w * s > m.cw + 1 && "overflow-hidden", className)} style={{ height: m ? h * s : undefined, aspectRatio: m ? undefined : `${w} / ${h}` }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: w, height: h, transform: `translateX(${dx}px) scale(${s})`, opacity: m === null ? 0 : 1 }}>
        {children}
      </div>
    </div>
  );
}

/**
 * Brand gradient field the illustration floats on. `field` maps to a `.field-<name>`
 * class in kit.css — rename/add fields to match the new brand (keep 3–4: two brand
 * mid-tones, one light, one dark).
 */
export type FieldName = "primary" | "secondary" | "light" | "dark";
export function Field({ field = "primary", className, children }: { field?: FieldName; className?: string; children: React.ReactNode }) {
  return <div className={clsx("grain relative isolate overflow-hidden rounded-[18px] p-5 sm:p-8", `field-${field}`, className)}>{children}</div>;
}

/**
 * Phase timeline: advances through `durations` (ms) while in view, then loops.
 * Reduced motion holds the most informative phase (`still`).
 */
export function useTimeline(durations: number[], { still = durations.length - 1, loop = true } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [p, setP] = useState(0);
  const [cycle, setCycle] = useState(0);
  const d = useRef(durations);
  d.current = durations;
  useEffect(() => {
    if (reduce) { setP(still); return; }
    if (!inView) return;
    const t = setTimeout(() => {
      const n = d.current.length;
      if (p + 1 < n) setP(p + 1);
      else if (loop) { setP(0); setCycle((c) => c + 1); }
    }, d.current[p]);
    return () => clearTimeout(t);
  }, [p, inView, reduce, still, loop]);
  return { p, ref, cycle, reduce: !!reduce };
}

/** Typed text for a phase. */
export function useTyped(text: string, active: boolean, { speed = 30, delay = 250 } = {}) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) { setN(0); return; }
    if (reduce) { setN(text.length); return; }
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => { i += 1; setN(i); if (i < text.length) t = setTimeout(tick, speed + (text[i - 1] === " " ? 20 : 0)); };
    t = setTimeout(tick, delay);
    return () => clearTimeout(t);
  }, [active, text, speed, delay, reduce]);
  return text.slice(0, n);
}

/* ---------------- Primitives ---------------- */

export type EntityKind = "company" | "theme" | "driver" | "geo" | "product";

/** Knowledge Graph entity glyph — the same shapes as the product's graph legend. */
export function Glyph({ kind, size = 10, active = false, className }: { kind: EntityKind; size?: number; active?: boolean; className?: string }) {
  const stroke = active ? "var(--rx-signal)" : "currentColor";
  const fill = active ? "var(--rx-signal)" : "none";
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 10 10" className={clsx("shrink-0", className)} aria-hidden="true">
      {kind === "company" && <circle cx="5" cy="5" r="4" fill={fill} stroke={stroke} strokeWidth="1.3" />}
      {kind === "geo" && <rect x="1.2" y="1.2" width="7.6" height="7.6" fill={fill} stroke={stroke} strokeWidth="1.3" />}
      {kind === "product" && <rect x="2.2" y="2.2" width="5.6" height="5.6" transform="rotate(45 5 5)" fill={fill} stroke={stroke} strokeWidth="1.3" />}
      {(kind === "theme" || kind === "driver") && <rect x="0.8" y="2.6" width="8.4" height="4.8" rx="2.4" fill={fill} stroke={stroke} strokeWidth="1.3" />}
    </svg>
  );
}

/** Ticker chip: mono, quiet well. */
export function Ticker({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={clsx("rx-num inline-flex h-[18px] items-center rounded-[5px] bg-[var(--rx-well)] px-1.5 text-[10.5px] font-medium text-[var(--rx-2)]", className)}>{children}</span>;
}

/** Company monogram tile (stands in for a logo). */
export function Mono({ t, tone = "#24324a", size = 26 }: { t: string; tone?: string; size?: number }) {
  return (
    <span className="grid shrink-0 place-items-center rounded-[7px] text-[10px] font-semibold tracking-[-0.02em] text-white" style={{ width: size, height: size, background: tone, boxShadow: "inset 0 0 0 1px rgb(255 255 255 / .12), 0 1px 2px rgb(23 32 44 / .2)" }}>
      {t}
    </span>
  );
}

/** Signed move, mono, brand up/down colours. */
export function Delta({ v, className }: { v: number; className?: string }) {
  const up = v >= 0;
  return <span className={clsx("rx-num text-[11.5px] font-medium", className)} style={{ color: up ? "var(--rx-up)" : "var(--rx-down)" }}>{up ? "+" : "−"}{Math.abs(v).toFixed(2)}%</span>;
}

/** Citation chip: small numbered disc. */
export function CiteChip({ n, active = false }: { n: number; active?: boolean }) {
  return (
    <span className={clsx("rx-num ml-1 inline-grid h-[15px] min-w-[15px] place-items-center rounded-full px-1 align-[1px] text-[9.5px] font-medium transition-colors duration-300", active ? "bg-[var(--rx-signal)] text-[var(--rx-ink)]" : "bg-[var(--rx-well)] text-[var(--rx-2)]")}>
      {n}
    </span>
  );
}

/** The Alfred mark. */
export function Spark({ className, size = 14 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 2.5c.6 5 2.7 7.1 7.7 7.7-5 .6-7.1 2.7-7.7 7.7-.6-5-2.7-7.1-7.7-7.7 5-.6 7.1-2.7 7.7-7.7z" />
    </svg>
  );
}

/** Pointer cursor that travels between canvas coordinates; `press` triggers a click ripple. */
export function Cursor({ x, y, press = false, visible = true, dark = false }: { x: number; y: number; press?: boolean; visible?: boolean; dark?: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0 z-50"
      initial={false}
      animate={{ x, y, opacity: visible ? 1 : 0 }}
      transition={{ x: { type: "spring", stiffness: 70, damping: 18 }, y: { type: "spring", stiffness: 70, damping: 18 }, opacity: { duration: 0.35 } }}
    >
      <motion.span
        className="absolute -left-3 -top-3 h-6 w-6 rounded-full"
        style={{ background: dark ? "rgb(255 255 255 / .35)" : "rgb(23 25 28 / .16)" }}
        initial={false}
        animate={press ? { scale: [0.2, 1.6], opacity: [0.9, 0] } : { scale: 0.2, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.svg width="20" height="22" viewBox="0 0 20 22" initial={false} animate={{ scale: press ? 0.86 : 1 }} transition={{ duration: 0.15 }} style={{ filter: "drop-shadow(0 2px 3px rgb(23 32 44 / .3))" }}>
        <path d="M2 1.5 L2 17 L6.2 13.2 L9 19.6 L11.8 18.4 L9.1 12.1 L14.8 12.1 Z" fill={dark ? "#fff" : "#17191c"} stroke={dark ? "#17191c" : "#fff"} strokeWidth="1.4" strokeLinejoin="round" />
      </motion.svg>
    </motion.div>
  );
}

/** Small UI icons drawn at 1.5px for the kit. */
export function Icon({ name, size = 14, className }: { name: "attach" | "send" | "chev" | "globe" | "doc" | "plus" | "check" | "bell" | "graph"; size?: number; className?: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} className={className} aria-hidden="true">
      {name === "attach" && <path {...p} d="M10.5 4.5 5.6 9.4a1.6 1.6 0 0 0 2.3 2.3l5-5a3 3 0 0 0-4.3-4.3l-5 5a4.4 4.4 0 0 0 6.2 6.2L13.5 9" />}
      {name === "send" && <path {...p} d="M8 13V3M3.8 7.2 8 3l4.2 4.2" />}
      {name === "chev" && <path {...p} d="m4.5 6.5 3.5 3.5 3.5-3.5" />}
      {name === "globe" && <g {...p}><circle cx="8" cy="8" r="5.5" /><path d="M2.5 8h11M8 2.5c1.6 1.7 2.3 3.5 2.3 5.5S9.6 11.8 8 13.5C6.4 11.8 5.7 10 5.7 8S6.4 4.2 8 2.5z" /></g>}
      {name === "doc" && <g {...p}><path d="M4 2.5h5l3 3v8H4z" /><path d="M9 2.5v3h3M6 9h4M6 11h3" /></g>}
      {name === "plus" && <path {...p} d="M8 3.5v9M3.5 8h9" />}
      {name === "check" && <path {...p} d="m3.5 8.5 3 3 6-7" />}
      {name === "bell" && <path {...p} d="M4 11.5V7.5a4 4 0 0 1 8 0v4l1 1H3zM6.8 14h2.4" />}
      {name === "graph" && <g {...p}><circle cx="4" cy="11.5" r="1.8" /><circle cx="12" cy="4.5" r="1.8" /><circle cx="12" cy="11.5" r="1.8" /><path d="M5.6 10.6 10.4 5.4M5.8 11.5h4.4" /></g>}
    </svg>
  );
}
