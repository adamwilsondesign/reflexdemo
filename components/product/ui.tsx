"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

/* ==================================================================
   Product UI kit — illustration style per DESIGN_1.md
   ("graphite ink on warm paper"): white panels, 1px hairline,
   10px radius, no shadow, achromatic, system font, compact rhythm.
   Deliberately simplified: one idea per panel, few elements.
   Gradient stages behind the panels keep the brand fields.
   ================================================================== */

const EASE = [0.16, 1, 0.3, 1] as const;

/** Minimal monochrome mark for Alfred (16px line icon). */
export function AlfredGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M12 3.5c.5 4.4 2.4 6.3 6.8 6.8-4.4.5-6.3 2.4-6.8 6.8-.5-4.4-2.4-6.3-6.8-6.8 4.4-.5 6.3-2.4 6.8-6.8z" />
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
  /** "none" = transparent: the visual sits directly on its section colour */
  field?: "lake" | "pine" | "mist" | "ink" | "none";
  className?: string;
  image?: string;
  parallax?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <div ref={ref} className={clsx("relative isolate overflow-hidden rounded-[18px]", field !== "none" && ["grain", `field-${field}`], className)}>
      {image && (
        <motion.div className="absolute inset-[-8%] -z-10 bg-cover bg-center opacity-90" style={{ backgroundImage: `url(${image})`, y: parallax && !reduce ? y : 0 }} />
      )}
      <div className="pui contents">{children}</div>
    </div>
  );
}

/** Badge — square corners, mist fill, sentence case. Tones are accepted for compatibility but render the same. */
export function Pill({ children, className }: { children: React.ReactNode; tone?: "neutral" | "lake" | "pine" | "warn"; className?: string }) {
  return <span className={clsx("inline-flex items-center bg-[#f9f9f9] px-1.5 py-0.5 text-[12px] font-medium text-[#5d5d5d]", className)}>{children}</span>;
}

/** Citation marker — quiet bracketed number. */
export function Cite({ n }: { n: number }) {
  return <sup className="ml-0.5 text-[10px] font-medium text-[#8f8f8f]">[{n}]</sup>;
}

/** Panel header: small glyph, title, optional trail in muted text. */
export function CardHeader({ title = "Alfred", trail, right }: { title?: string; trail?: string[]; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2">
        <AlfredGlyph className="h-4 w-4 shrink-0 text-[#0d0d0d]" />
        <span className="truncate text-[14px] font-semibold text-[#0d0d0d]">{title}</span>
        {trail && trail.length > 0 && <span className="truncate text-[13px] text-[#8f8f8f]">{trail.join(" · ")}</span>}
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

/** Prompt panel: header, the question, one quiet action row. */
export function PromptCard({
  prompt,
  trail = ["AAPL"],
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
    <div className={clsx("ui-card p-4", active && "border-black/20", className)}>
      <CardHeader trail={trail.slice(-1)} />
      <p className="mt-3 min-h-[2.8em] text-[15px] leading-[1.45] text-[#0d0d0d]">
        {shown}
        {typing && shown.length < prompt.length && <span className="animate-blink ml-0.5 inline-block h-[1em] w-px translate-y-[2px] bg-[#0d0d0d]" />}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[13px] text-[#8f8f8f]">{sources} sources</span>
        <span className="rounded-[10px] border border-black/10 bg-white px-3 py-1 text-[13px] font-medium text-[#0d0d0d]">Ask</span>
      </div>
    </div>
  );
}

/** Line chart — single graphite stroke, no fill. */
export function Sparkline({ points, className, stroke = "#0d0d0d", animate = true }: { points: number[]; className?: string; stroke?: string; animate?: boolean; fill?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref as unknown as React.RefObject<Element>, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const max = Math.max(...points), min = Math.min(...points);
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${((i / (points.length - 1)) * 100).toFixed(2)},${(40 - ((p - min) / (max - min || 1)) * 36 - 2).toFixed(2)}`).join(" ");
  return (
    <svg ref={ref} viewBox="0 0 100 40" preserveAspectRatio="none" className={className} aria-hidden="true">
      <motion.path
        d={d}
        fill="none"
        stroke={stroke === "currentColor" ? "#0d0d0d" : stroke}
        strokeOpacity={0.55}
        strokeWidth={1.25}
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
        initial={animate && !reduce ? { pathLength: 0 } : false}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.6, ease: EASE }}
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

/** Progress list — plain rows, small check / dot. */
export function StepList({ steps, active, className }: { steps: string[]; active: number; className?: string }) {
  return (
    <ul className={clsx("space-y-1.5", className)}>
      {steps.map((s, i) => {
        const done = i < active;
        const on = i === active;
        return (
          <li key={s} className={clsx("flex items-center gap-2 text-[13px] transition-colors duration-500", done ? "text-[#5d5d5d]" : on ? "text-[#0d0d0d]" : "text-[#8f8f8f]/60")}>
            <span className="flex h-4 w-4 items-center justify-center">
              {done ? (
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3.5 8.5l3 3 6-6.5" /></svg>
              ) : on ? (
                <span className="h-3 w-3 animate-spin rounded-full border border-[#0d0d0d] border-t-transparent" />
              ) : (
                <span className="h-1 w-1 rounded-full bg-current" />
              )}
            </span>
            {s}
          </li>
        );
      })}
    </ul>
  );
}

/** Impact pathway: three entity rows joined by thin connectors. */
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
  return (
    <ol className={clsx("relative", className)}>
      {nodes.map((n, i) => (
        <motion.li
          key={n.name}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={play ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: i * 0.5, ease: EASE }}
        >
          <div className="flex items-center gap-3 rounded-[10px] border border-black/10 bg-white px-3 py-2.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f9f9f9] text-[12px] font-semibold text-[#0d0d0d]">{n.k}</span>
            <span className="min-w-0">
              <span className="block truncate text-[14px] font-medium text-[#0d0d0d]">{n.name}</span>
              <span className="block truncate text-[12px] text-[#8f8f8f]">{n.sub}</span>
            </span>
          </div>
          {i < nodes.length - 1 && (
            <div className="flex items-center gap-2 py-1.5 pl-[22px]">
              <motion.span className="block w-px origin-top bg-black/20" style={{ height: 22 }} initial={reduce ? false : { scaleY: 0 }} animate={play ? { scaleY: 1 } : { scaleY: 0 }} transition={{ duration: 0.5, delay: i * 0.5 + 0.3 }} />
              <span className="text-[12px] text-[#8f8f8f]">{links[i]}</span>
            </div>
          )}
        </motion.li>
      ))}
    </ol>
  );
}

export function MetricRow({ label, value, delta, up = true }: { label: string; value: string; delta?: string; up?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-black/10 py-2 text-[13px]">
      <span className="min-w-0 truncate text-[#5d5d5d]">{label}</span>
      <span className="shrink-0 tabular-nums text-[#0d0d0d]">
        {value}
        {delta && <span className="ml-1 text-[#8f8f8f]">{up ? "↑" : "↓"}</span>}
      </span>
    </div>
  );
}

/** Source row — number, title, muted meta; hairline separated. */
export function SourceRow({ n, title, meta }: { n: number; title: string; meta: string }) {
  return (
    <div className="flex items-baseline gap-3 rounded-[10px] border border-black/10 bg-white px-3 py-2">
      <span className="text-[12px] text-[#8f8f8f]">[{n}]</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-medium text-[#0d0d0d]">{title}</span>
        <span className="block truncate text-[12px] text-[#8f8f8f]">{meta}</span>
      </span>
    </div>
  );
}

/** Missing input — stated plainly, not estimated. */
export function MissingData({ label = "Regional revenue breakdown", reason = "Not disclosed by issuer" }: { label?: string; reason?: string }) {
  return (
    <div className="flex items-baseline gap-3 rounded-[10px] border border-dashed border-black/15 bg-white px-3 py-2">
      <span className="text-[12px] font-medium text-[#5d5d5d]">N/A</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] text-[#0d0d0d]">{label}</span>
        <span className="block truncate text-[12px] text-[#8f8f8f]">{reason}. Flagged, not estimated.</span>
      </span>
    </div>
  );
}

/** Code sample — light, monochrome. Inline color spans are neutralised. */
export function CodeBlock({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <pre className={clsx("no-scrollbar overflow-x-auto rounded-[10px] border border-black/10 bg-[#f9f9f9] p-3 text-[12px] leading-[1.6] text-[#0d0d0d]", className)}>
      {lines.map((l, i) => (
        <div key={i} className="whitespace-pre" dangerouslySetInnerHTML={{ __html: l.replace(/style="[^"]*"/g, "") }} />
      ))}
    </pre>
  );
}

export function TakeawayList({ items, active = -1 }: { items: string[]; active?: number }) {
  return (
    <ol className="divide-y divide-black/10">
      {items.map((t, i) => (
        <li key={t} className={clsx("flex items-baseline gap-3 px-1 py-2 text-[13px] transition-colors", i === active ? "text-[#0d0d0d]" : "text-[#5d5d5d]")}>
          <span className="w-4 shrink-0 tabular-nums text-[#8f8f8f]">{i + 1}</span>
          <span>{t}</span>
        </li>
      ))}
    </ol>
  );
}
