"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { StateTabs } from "./StateTabs";
import { PrecisionIcon } from "@/components/ui/PrecisionIcon";
import { Pill, Stage } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

function fade(reduce: boolean | null, delay = 0) {
  return {
    initial: reduce ? false : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  } as const;
}

/** Colour-field board with faint concentric guides (cartography), no photography. */
function Board({ field, children }: { field: "lake" | "pine" | "ink"; children: React.ReactNode }) {
  return (
    <Stage field={field} className="h-full w-full p-5 sm:p-8">
      <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 -z-[5] h-full w-full text-white" fill="none" aria-hidden="true">
        {[70, 120, 170, 220, 270].map((r, i) => (
          <circle key={r} cx={330} cy={70} r={r} stroke="currentColor" strokeOpacity={0.12} strokeDasharray={i % 2 ? "2 5" : undefined} vectorEffect="non-scaling-stroke" />
        ))}
        {[200, 225, 250].map((a) => {
          const t = (a * Math.PI) / 180;
          return <line key={a} x1={330} y1={70} x2={330 + Math.cos(t) * 300} y2={70 + Math.sin(t) * 300} stroke="currentColor" strokeOpacity={0.08} vectorEffect="non-scaling-stroke" />;
        })}
      </svg>
      <div className="mx-auto flex h-full max-w-[440px] flex-col justify-center">{children}</div>
    </Stage>
  );
}

function Isolation() {
  const reduce = useReducedMotion();
  const items = ["Research & saved work", "Uploaded documents", "Connected sources", "Prompts & outputs"];
  return (
    <Board field="lake">
      <motion.div {...fade(reduce)} className="ui-card relative p-5">
        <div className="flex items-center justify-between">
          <span>
            <span className="block font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/45">Client environment</span>
            <span className="mt-0.5 block font-display text-[16px] font-semibold text-ink">Your firm</span>
          </span>
          <Pill tone="lake">Isolated</Pill>
        </div>
        <ul className="mt-4 space-y-1.5 rounded-lg border border-dashed border-lake-500/50 p-2">
          {items.map((t, i) => (
            <motion.li key={t} {...fade(reduce, 0.2 + i * 0.1)} className="flex items-center justify-between rounded-md bg-white/80 px-3 py-2 text-[12.5px] text-ink">
              {t}
              <span className="h-1.5 w-1.5 rounded-full bg-lake-500" />
            </motion.li>
          ))}
        </ul>
      </motion.div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {["Other client", "Other client"].map((t, i) => (
          <motion.div key={i} {...fade(reduce, 0.7 + i * 0.1)} className="flex items-center gap-2 rounded-[10px] border border-white/25 bg-white/10 px-3 py-2.5 backdrop-blur">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-white/70" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><circle cx="8" cy="8" r="6" /><path d="M4 12L12 4" /></svg>
            <span className="truncate font-mono text-[9.5px] uppercase tracking-[0.04em] text-white/80">{t}</span>
          </motion.div>
        ))}
      </div>
      <p className="t-ui mt-3 text-[10px] text-white/70">No shared access between environments</p>
    </Board>
  );
}

function Connections() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [revoked, setRevoked] = useState(false);
  useEffect(() => {
    if (!inView || reduce) return;
    const t = setTimeout(() => setRevoked(true), 2200);
    return () => clearTimeout(t);
  }, [inView, reduce]);
  const rows = [
    { n: "Document library", s: "Research folder · read-only", on: true },
    { n: "Email archive", s: "Not connected", on: false },
    { n: "Internal research notes", s: "Team workspace · read-only", on: true, flip: true },
    { n: "CRM", s: "Not connected", on: false },
  ];
  return (
    <Board field="pine">
      <motion.div ref={ref} {...fade(reduce)} className="ui-card p-5">
        <div className="flex items-center justify-between">
          <span className="font-display text-[16px] font-semibold text-ink">Connected sources</span>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/45">Admin controlled</span>
        </div>
        <ul className="mt-4 space-y-1.5">
          {rows.map((r) => {
            const on = r.flip ? !revoked : r.on;
            return (
              <li key={r.n} className="flex items-center gap-3 rounded-md bg-white/80 px-3 py-2.5">
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-[13px] font-medium text-ink">{r.n}</span>
                  <span className={clsx("block truncate font-mono text-[9.5px] uppercase tracking-[0.04em] transition-colors duration-500", r.flip && revoked ? "text-[#7a5326]" : "text-ink/45")}>
                    {r.flip && revoked ? "Access revoked · just now" : r.s}
                  </span>
                </span>
                <span role="img" aria-label={on ? "Connected" : "Not connected"} className={clsx("relative h-5 w-9 shrink-0 rounded-full transition-colors duration-500", on ? "bg-lake-700" : "bg-ink/15")}>
                  <span className={clsx("absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-[left] duration-500", on ? "left-[18px]" : "left-0.5")} />
                </span>
              </li>
            );
          })}
        </ul>
      </motion.div>
      <p className="t-ui mt-3 text-[10px] text-white/75">Illustrative source names</p>
    </Board>
  );
}

function Retention() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [step, setS] = useState(0);
  const s = reduce ? 3 : step;
  useEffect(() => {
    if (!inView || reduce) return;
    if (s >= 3) return;
    const t = setTimeout(() => setS((x) => x + 1), 1100);
    return () => clearTimeout(t);
  }, [inView, reduce, s]);
  const steps = ["Request received", "Processed for your query", "Response delivered", "Client data not persisted"];
  return (
    <Board field="ink">
      <motion.div ref={ref} {...fade(reduce)} className="ui-card p-5">
        <div className="flex items-center justify-between">
          <span className="font-display text-[16px] font-semibold text-ink">Data lifecycle</span>
          <Pill tone="pine">Limited retention</Pill>
        </div>
        <ol className="relative mt-5 space-y-3 pl-6">
          <span className="absolute bottom-2 left-[7px] top-2 w-px bg-ink/12" aria-hidden="true" />
          {steps.map((t, i) => {
            const done = i <= s;
            return (
              <li key={t} className="relative">
                <span className={clsx("absolute -left-6 top-0.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border transition-colors duration-500", done ? (i === 3 ? "border-pine-500 bg-pine-500" : "border-lake-700 bg-lake-700") : "border-ink/20 bg-white")}>
                  {done && <svg viewBox="0 0 16 16" className="h-2.5 w-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M3.5 8.5l3 3 6-6.5" /></svg>}
                </span>
                <span className={clsx("block font-display text-[13.5px] transition-colors duration-500", done ? "font-medium text-ink" : "text-ink/35")}>{t}</span>
              </li>
            );
          })}
        </ol>
        <div className="mt-5 flex gap-1.5">
          {["Prompt", "Excerpt", "Connected data"].map((t) => (
            <motion.span
              key={t}
              animate={{ opacity: s >= 3 ? 0.25 : 1, filter: s >= 3 ? "blur(1.5px)" : "blur(0px)" }}
              transition={{ duration: 0.8 }}
              className="rounded-md border border-ink/10 bg-white px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.04em] text-ink/60"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </Board>
  );
}

function NeverTrained() {
  const reduce = useReducedMotion();
  const inputs = ["Prompts", "Documents", "Connected data", "Outputs"];
  return (
    <Board field="lake">
      <motion.div {...fade(reduce)} className="ui-card p-5">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/45">Your firm&rsquo;s data</span>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {inputs.map((t, i) => (
            <motion.span key={t} {...fade(reduce, 0.15 + i * 0.08)} className="rounded-md bg-white/85 px-3 py-2 font-display text-[12.5px] font-medium text-ink">
              {t}
            </motion.span>
          ))}
        </div>
        <div className="relative my-3 flex justify-center" aria-hidden="true">
          <span className="h-8 w-px bg-ink/20" />
          <motion.span
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
            className="absolute top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-[#9a4b3c] text-white"
          >
            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3l6 6M9 3l-6 6" /></svg>
          </motion.span>
        </div>
        <div className="relative overflow-hidden rounded-lg border border-dashed border-ink/20 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="font-display text-[13.5px] font-semibold text-ink/45">Model training</span>
            <Pill>Excluded</Pill>
          </div>
          <p className="mt-1 text-[11.5px] text-ink/45">Reflexivity models · third-party model providers</p>
          <motion.span
            aria-hidden="true"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 1, ease: EASE }}
            className="absolute left-3 right-3 top-[22px] h-px origin-left bg-ink/35"
          />
        </div>
      </motion.div>
    </Board>
  );
}

export function DataProtection() {
  const icon = (n: Parameters<typeof PrecisionIcon>[0]["name"]) => <PrecisionIcon name={n} className="h-6 w-6" />;
  return (
    <StateTabs idPrefix="protect" frameClassName="h-[470px] sm:h-auto sm:aspect-[4/3]"
      interval={6500}
      items={[
        { title: "Client isolation", icon: icon("cube"), body: "Customer data and research remain isolated from other client environments.", visual: <Isolation /> },
        { title: "Controlled connections", icon: icon("chain"), body: "Your firm controls which sources Reflexivity can connect to and can revoke access at any time.", visual: <Connections /> },
        { title: "Limited data retention", icon: icon("loop"), body: "Reflexivity does not persistently store client data, minimizing exposure of sensitive information.", visual: <Retention /> },
        { title: "Never trained on your data", icon: icon("stack"), body: "Your prompts, documents, connected data, and outputs are never used to train Reflexivity’s models or those of third-party providers.", visual: <NeverTrained /> },
      ]}
    />
  );
}
