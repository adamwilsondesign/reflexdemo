"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { StateTabs } from "./StateTabs";
import { PrecisionIcon } from "@/components/ui/PrecisionIcon";
import { Pill, Stage, StepList } from "@/components/product/ui";

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
      <motion.div {...fade(reduce)} className="ui-card p-4">
        <div className="flex items-center justify-between gap-2">
          <span>
            <span className="block text-[12px] text-[#8f8f8f]">Client environment</span>
            <span className="block text-[16px] font-semibold text-[#0d0d0d]">Your firm</span>
          </span>
          <Pill>Isolated</Pill>
        </div>
        <ul className="mt-3 divide-y divide-black/10 border-t border-black/10">
          {items.map((t, i) => (
            <motion.li key={t} {...fade(reduce, 0.2 + i * 0.1)} className="py-2 text-[13px] text-[#0d0d0d]">
              {t}
            </motion.li>
          ))}
        </ul>
      </motion.div>
      <p className="mt-3 text-[13px] text-white/80">No shared access with other client environments</p>
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
    { n: "Document library", s: "Research folder, read-only", on: true },
    { n: "Email archive", s: "Not connected", on: false },
    { n: "Internal research notes", s: "Team workspace, read-only", on: true, flip: true },
    { n: "CRM", s: "Not connected", on: false },
  ];
  return (
    <Board field="pine">
      <motion.div ref={ref} {...fade(reduce)} className="ui-card p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[14px] font-semibold text-[#0d0d0d]">Connected sources</span>
          <span className="text-[12px] text-[#8f8f8f]">Admin controlled</span>
        </div>
        <ul className="mt-3 divide-y divide-black/10 border-t border-black/10">
          {rows.map((r) => {
            const on = r.flip ? !revoked : r.on;
            return (
              <li key={r.n} className="flex items-center gap-3 py-2">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium text-[#0d0d0d]">{r.n}</span>
                  <span className={clsx("block truncate text-[12px] transition-colors duration-500", r.flip && revoked ? "font-medium text-[#0d0d0d]" : "text-[#8f8f8f]")}>
                    {r.flip && revoked ? "Access revoked just now" : r.s}
                  </span>
                </span>
                <span role="img" aria-label={on ? "Connected" : "Not connected"} className={clsx("relative h-5 w-9 shrink-0 rounded-full transition-colors duration-500", on ? "bg-[#0d0d0d]" : "bg-[#e6e6e6]")}>
                  <span className={clsx("absolute top-0.5 h-4 w-4 rounded-full bg-white transition-[left] duration-500", on ? "left-[18px]" : "left-0.5")} />
                </span>
              </li>
            );
          })}
        </ul>
      </motion.div>
      <p className="mt-3 text-[12px] text-white/75">Illustrative source names</p>
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
      <motion.div ref={ref} {...fade(reduce)} className="ui-card p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[14px] font-semibold text-[#0d0d0d]">Data lifecycle</span>
          <span className="text-[12px] text-[#8f8f8f]">Limited retention</span>
        </div>
        <StepList className="mt-3 border-t border-black/10 pt-3" steps={steps} active={s + 1} />
        <p className={clsx("mt-3 text-[12px] text-[#5d5d5d] transition-opacity duration-700", s >= 3 ? "opacity-100" : "opacity-0")}>Prompt, excerpts and connected data cleared</p>
      </motion.div>
    </Board>
  );
}

function NeverTrained() {
  const reduce = useReducedMotion();
  const inputs = ["Prompts", "Documents", "Connected data", "Outputs"];
  return (
    <Board field="lake">
      <motion.div {...fade(reduce)} className="ui-card p-4">
        <span className="block text-[12px] text-[#8f8f8f]">Your firm&rsquo;s data</span>
        <p className="mt-1 text-[14px] text-[#0d0d0d]">{inputs.join(" · ")}</p>
        <div className="relative my-3 flex justify-center" aria-hidden="true">
          <span className="h-8 w-px bg-black/10" />
          <motion.span
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
            className="absolute top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border border-black/20 bg-white text-[#0d0d0d]"
          >
            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 3l6 6M9 3l-6 6" /></svg>
          </motion.span>
        </div>
        <div className="relative rounded-[10px] border border-dashed border-black/15 px-3 py-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-medium text-[#8f8f8f] line-through decoration-black/30">Model training</span>
            <Pill>Excluded</Pill>
          </div>
          <p className="mt-0.5 text-[12px] text-[#8f8f8f]">Reflexivity models, third-party model providers</p>
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
