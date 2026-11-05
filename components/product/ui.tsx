"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

/* ==================================================================
   Coded product UI kit — rebuilt from the Figma "Total Page Mocks"
   product imagery so it can animate, stay crisp, and be updated
   without re-exporting images. Visual language:
   paper cards · mono UI labels · lake accents · cited sources.
   ================================================================== */

const EASE = [0.16, 1, 0.3, 1] as const;

export function AlfredGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 2c.6 5.2 2.8 7.4 8 8-5.2.6-7.4 2.8-8 8-.6-5.2-2.8-7.4-8-8 5.2-.6 7.4-2.8 8-8z" fill="currentColor" />
    </svg>
  );
}

/** Gradient field stage that product cards float on. Uses brand gradients; optional Figma blur backdrop. */
export function Stage({
  children,
  field = "lake",
  className,
  image,
  parallax = true,
}: {
  children: React.ReactNode;
  field?: "lake" | "pine" | "mist" | "ink";
  className?: string;
  image?: string;
  parallax?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <div ref={ref} className={clsx("grain relative isolate overflow-hidden rounded-[18px]", `field-${field}`, className)}>
      {image && (
        <motion.div className="absolute inset-[-8%] -z-10 bg-cover bg-center opacity-90" style={{ backgroundImage: `url(${image})`, y: parallax && !reduce ? y : 0 }} />
      )}
      {children}
    </div>
  );
}

export function Pill({ children, tone = "neutral", className }: { children: React.ReactNode; tone?: "neutral" | "lake" | "pine" | "warn"; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.05em]",
        tone === "neutral" && "bg-ink/[0.06] text-ink/70",
        tone === "lake" && "bg-lake-100 text-lake-700",
        tone === "pine" && "bg-pine-100 text-pine-700",
        tone === "warn" && "bg-[#f3e6d6] text-[#7a5326]",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Cite({ n }: { n: number }) {
  return <sup className="ml-0.5 inline-flex h-[15px] min-w-[15px] -translate-y-[1px] items-center justify-center rounded-[3px] bg-lake-100 px-1 font-mono text-[9.5px] font-medium text-lake-700 not-italic">{n}</sup>;
}

export function CardHeader({ title = "Alfred", trail, right }: { title?: string; trail?: string[]; right?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-[0_1px_2px_rgb(23_25_28/0.08)] ring-1 ring-ink/5">
          <AlfredGlyph className="h-[18px] w-[18px] text-lake-700" />
        </span>
        <span>
          <span className="block font-display text-[14px] font-semibold leading-tight text-ink">{title}</span>
          {trail && (
            <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.05em] text-ink/45">
              {trail.map((t, i) => (
                <span key={t}>
                  {i > 0 && <span className="mx-1 opacity-60">/</span>}
                  <span className={i === trail.length - 1 && trail.length > 1 ? "text-lake-700" : undefined}>{t}</span>
                </span>
              ))}
            </span>
          )}
        </span>
      </div>
      {right}
    </div>
  );
}

/** Typewriter that starts when in view. */
export function useTypewriter(text: string, { speed = 26, start = true, delay = 0 } = {}) {
  const reduce = useReducedMotion();
  const [out, setOut] = useState(reduce ? text : "");
  useEffect(() => {
    if (reduce) { setOut(text); return; }
    if (!start) { setOut(""); return; }
    let i = 0;
    let iv: ReturnType<typeof setInterval>;
    const t = setTimeout(() => {
      iv = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(iv);
      }, speed);
    }, delay);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [text, speed, start, delay, reduce]);
  return out;
}

export function PromptCard({
  prompt,
  trail = ["Counter-thesis", "AAPL"],
  sources = 8,
  typing = false,
  className,
  start = true,
  active = false,
}: {
  prompt: string;
  trail?: string[];
  sources?: number;
  typing?: boolean;
  className?: string;
  start?: boolean;
  active?: boolean;
}) {
  const typed = useTypewriter(prompt, { start: typing && start, speed: 22 });
  const shown = typing ? typed : prompt;
  return (
    <div className={clsx("ui-card p-4 sm:p-5", active && "ring-1 ring-lake-500/40", className)}>
      <CardHeader trail={trail} right={<span className="font-mono text-[14px] leading-none text-ink/35">•••</span>} />
      <p className="mt-4 min-h-[2.6em] font-display text-[15px] font-medium leading-snug text-ink sm:text-[16.5px]">
        {shown}
        {typing && shown.length < prompt.length && <span className="animate-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-lake-700" />}
      </p>
      <div className="mt-4 flex items-center justify-between border-t border-ink/8 pt-3">
        <span className="inline-flex items-center gap-1.5 rounded-md border border-ink/10 bg-white/70 px-2.5 py-1.5 font-display text-[12px] font-medium text-ink/70">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M8 2l6 3-6 3-6-3 6-3zM2 8l6 3 6-3M2 11l6 3 6-3" /></svg>
          Sources ({sources})
          <svg viewBox="0 0 10 6" className="h-1.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M1 1l4 4 4-4" /></svg>
        </span>
        <span className="inline-flex items-center gap-2 rounded-md bg-lake-700 px-3.5 py-1.5 font-display text-[12.5px] font-medium text-white">
          Ask
          <svg viewBox="0 0 14 12" className="h-2.5 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M0 6h12M7.5 1.5L12 6l-4.5 4.5" /></svg>
        </span>
      </div>
    </div>
  );
}

export function Sparkline({ points, className, stroke = "currentColor", animate = true, fill }: { points: number[]; className?: string; stroke?: string; animate?: boolean; fill?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const max = Math.max(...points), min = Math.min(...points);
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${(i / (points.length - 1)) * 100},${40 - ((p - min) / (max - min || 1)) * 36 - 2}`).join(" ");
  return (
    <svg ref={ref} viewBox="0 0 100 40" preserveAspectRatio="none" className={className} aria-hidden="true">
      {fill && <path d={`${d} L100,40 L0,40 Z`} fill={fill} opacity={inView || reduce ? 1 : 0} style={{ transition: "opacity 1.2s ease 0.6s" }} />}
      <motion.path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={1.4}
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
        initial={animate && !reduce ? { pathLength: 0 } : false}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.8, ease: EASE }}
      />
    </svg>
  );
}

/** Deterministic random-walk series for charts. */
export function series(n: number, seed = 3, drift = 0.35, vol = 2.2) {
  let s = seed;
  const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const out: number[] = [];
  let v = 50;
  for (let i = 0; i < n; i++) { v += drift + (r() - 0.5) * vol * 2; out.push(v); }
  return out;
}

export function StepList({ steps, active, className }: { steps: string[]; active: number; className?: string }) {
  return (
    <ul className={clsx("space-y-2", className)}>
      {steps.map((s, i) => {
        const done = i < active;
        const on = i === active;
        return (
          <li key={s} className={clsx("flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.04em] transition-colors duration-500", done ? "text-ink/70" : on ? "text-ink" : "text-ink/30")}>
            <span className="relative flex h-4 w-4 items-center justify-center">
              {done ? (
                <svg viewBox="0 0 16 16" className="h-4 w-4 text-pine-500" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3.5 8.5l3 3 6-6.5" /></svg>
              ) : on ? (
                <span className="h-3 w-3 animate-spin rounded-full border-[1.5px] border-lake-500 border-t-transparent" />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
              )}
            </span>
            {s}
          </li>
        );
      })}
    </ul>
  );
}

/** Animated impact pathway: entity cards linked by drawn connectors (AWS → NVIDIA → TSMC). */
export function ImpactPathway({
  nodes = [
    { k: "A", name: "Amazon Web Services", sub: "AI infrastructure demand" },
    { k: "N", name: "NVIDIA", sub: "GPU supplier" },
    { k: "T", name: "TSMC", sub: "Advanced chip manufacturing" },
  ],
  links = ["GPU demand", "Chip production"],
  play = true,
  className,
}: {
  nodes?: { k: string; name: string; sub: string }[];
  links?: string[];
  play?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const pos = [
    { left: "2%", top: "4%" },
    { left: "46%", top: "38%" },
    { left: "4%", top: "72%" },
  ];
  return (
    <div className={clsx("relative h-[300px] w-full", className)}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <motion.path d="M48 14 C 62 14, 62 34, 62 44" fill="none" stroke="#5d738c" strokeWidth="1.3" vectorEffect="non-scaling-stroke" initial={reduce ? false : { pathLength: 0 }} animate={play ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1, delay: 0.5, ease: EASE }} />
        <motion.path d="M80 56 C 80 76, 60 80, 46 82" fill="none" stroke="#3e5c50" strokeWidth="1.3" vectorEffect="non-scaling-stroke" initial={reduce ? false : { pathLength: 0 }} animate={play ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1, delay: 1.3, ease: EASE }} />
      </svg>
      {links.map((l, i) => (
        <motion.span
          key={l}
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={play ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.9 + i * 0.8, ease: EASE }}
          className={clsx("absolute rounded-full px-2.5 py-1 font-display text-[11px] font-medium", i === 0 ? "left-[54%] top-[24%] bg-lake-100 text-lake-700" : "left-[56%] top-[70%] bg-pine-100 text-pine-700")}
        >
          {l}
        </motion.span>
      ))}
      {nodes.map((n, i) => (
        <motion.div
          key={n.name}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={play ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: i * 0.8, ease: EASE }}
          className="absolute flex w-[52%] items-center gap-3 rounded-[10px] border border-ink/8 bg-white px-3 py-2.5 shadow-[0_6px_20px_-8px_rgb(23_25_28/0.25)]"
          style={pos[i]}
        >
          <span className={clsx("flex h-8 w-8 shrink-0 items-center justify-center rounded-md font-display text-[13px] font-semibold", i === 2 ? "bg-pine-100 text-pine-700" : "bg-lake-100 text-lake-700")}>{n.k}</span>
          <span className="min-w-0">
            <span className="block truncate font-display text-[13px] font-semibold text-ink">{n.name}</span>
            <span className="block truncate text-[11px] text-ink/55">{n.sub}</span>
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export function MetricRow({ label, value, delta, up = true }: { label: string; value: string; delta?: string; up?: boolean }) {
  return (
    <div className="flex items-center justify-between border-t border-ink/8 py-2 text-[12px]">
      <span className="text-ink/60">{label}</span>
      <span className="flex items-center gap-2 font-mono">
        <span className="text-ink">{value}</span>
        {delta && <span className={up ? "text-pine-500" : "text-[#9a4b3c]"}>{delta}</span>}
      </span>
    </div>
  );
}

export function SourceRow({ n, title, meta }: { n: number; title: string; meta: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-ink/8 bg-white/80 px-3 py-2">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-lake-100 font-mono text-[10px] font-medium text-lake-700">{n}</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-display text-[12.5px] font-medium text-ink">{title}</span>
        <span className="block truncate font-mono text-[10px] uppercase tracking-[0.04em] text-ink/45">{meta}</span>
      </span>
      <svg viewBox="0 0 12 12" className="h-3 w-3 text-ink/35" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M4 2h6v6M10 2L3 9" /></svg>
    </div>
  );
}

export function MissingData({ label = "Regional revenue breakdown", reason = "Not disclosed by issuer" }: { label?: string; reason?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-dashed border-[#b88a55]/50 bg-[#f7efe4] px-3 py-2">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ecd9c0] font-mono text-[10px] font-semibold text-[#7a5326]">NA</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-display text-[12.5px] font-medium text-[#5a3d1c]">{label}</span>
        <span className="block truncate font-mono text-[10px] uppercase tracking-[0.04em] text-[#7a5326]/70">{reason} · flagged, not estimated</span>
      </span>
    </div>
  );
}

export function CodeBlock({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <pre className={clsx("overflow-hidden rounded-lg bg-[#1b1e23] p-3 font-mono text-[11px] leading-[1.65] text-paper/85", className)}>
      {lines.map((l, i) => (
        <div key={i} className="flex gap-3">
          <span className="w-4 shrink-0 select-none text-right text-paper/25">{i + 1}</span>
          <span dangerouslySetInnerHTML={{ __html: l }} />
        </div>
      ))}
    </pre>
  );
}

export function TakeawayList({ items, active = -1 }: { items: string[]; active?: number }) {
  return (
    <ol className="space-y-1.5">
      {items.map((t, i) => (
        <li key={t} className={clsx("flex items-center gap-3 rounded-md px-2.5 py-2 text-[12.5px] transition-colors", i === active ? "bg-ink/[0.05]" : "")}>
          <span className="font-mono text-[10.5px] text-ink/40">{String(i + 1).padStart(2, "0")}</span>
          <span className="font-display font-medium text-ink">{t}</span>
        </li>
      ))}
    </ol>
  );
}
