"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CardHeader, Pill, Stage } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

function Mark({ id, on, na = false }: { id: string; on: boolean; na?: boolean }) {
  return (
    <sup
      className={clsx(
        "ml-0.5 inline-flex h-[16px] min-w-[16px] -translate-y-[1px] items-center justify-center rounded-[3px] px-1 font-mono text-[9.5px] font-medium transition-all duration-500",
        na ? (on ? "bg-[#7a5326] text-white" : "bg-[#ecd9c0] text-[#7a5326]") : on ? "bg-lake-700 text-white" : "bg-lake-100 text-lake-700",
        on && "scale-110",
      )}
    >
      {id}
    </sup>
  );
}

const EVIDENCE = [
  { id: "1", kind: "Source", title: "Hyperscaler filings, FY2024", meta: "Filing · cash-flow statement · linked page" },
  { id: "2", kind: "Calculation", title: "growth = (210 − 142) / 142 = 0.479", meta: "Python · re-runnable" },
  { id: "3", kind: "Source", title: "Q4 earnings call transcripts", meta: "Transcript · management commentary" },
  { id: "NA", kind: "Missing", title: "Regional split of AI capex", meta: "Not disclosed by issuers · flagged, not estimated" },
];

/** Hero: an answer whose claims light up with their evidence, one by one, including a flagged gap. */
export function AuditHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [k, setK] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const iv = setInterval(() => setK((x) => (x + 1) % EVIDENCE.length), 2200);
    return () => clearInterval(iv);
  }, [inView, reduce]);

  const on = (i: number) => !reduce && k === i;

  return (
    <Stage field="mist" className="w-full p-4 sm:p-7">
      <div ref={ref} className="mx-auto max-w-[520px]">
        <div className="ui-card p-4 sm:p-5">
          <CardHeader trail={["Research", "Illustrative"]} right={<Pill tone="lake">Cited</Pill>} />
          <p className="mt-4 rounded-md bg-ink/[0.04] px-3 py-2 text-[12.5px] text-ink/65">How fast did hyperscaler capex grow in 2024, and what drove it?</p>
          <p className="mt-4 font-display text-[15px] font-medium leading-[1.55] text-ink sm:text-[16px]">
            <span className={clsx("rounded-sm transition-colors duration-500", (on(0) || on(1)) && "bg-lake-100/80")}>
              Combined capex across the cohort rose <span className="font-semibold">48%</span> in 2024, from $142B to $210B
            </span>
            <Mark id="1" on={on(0)} />
            <Mark id="2" on={on(1)} />,{" "}
            <span className={clsx("rounded-sm transition-colors duration-500", on(2) && "bg-lake-100/80")}>led by data center and AI infrastructure spend</span>
            <Mark id="3" on={on(2)} />.{" "}
            <span className={clsx("rounded-sm transition-colors duration-500", on(3) && "bg-[#f3e6d6]")}>A regional breakdown is not available</span>
            <Mark id="NA" on={on(3)} na />.
          </p>
        </div>

        <ul className="mt-3 space-y-2" aria-label="Evidence attached to the answer">
          {EVIDENCE.map((e, i) => {
            const active = on(i);
            const na = e.kind === "Missing";
            return (
              <motion.li
                key={e.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, x: active ? 6 : 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: reduce ? 0 : 0.8 + i * 0.12 }}
                className={clsx(
                  "flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-[background-color,border-color,box-shadow] duration-500",
                  na ? "border-dashed border-[#b88a55]/50 bg-[#f7efe4]" : "border-ink/8 bg-white/85",
                  active && (na ? "shadow-[0_8px_24px_-12px_rgb(122_83_38/0.5)]" : "border-lake-300 shadow-[0_8px_24px_-12px_rgb(36_50_68/0.45)]"),
                )}
              >
                <span className={clsx("flex h-6 min-w-6 shrink-0 items-center justify-center rounded px-1 font-mono text-[10px] font-medium", na ? "bg-[#ecd9c0] text-[#7a5326]" : "bg-lake-100 text-lake-700")}>{e.id}</span>
                <span className="min-w-0 flex-1">
                  <span className={clsx("block truncate text-[12.5px] font-medium", e.kind === "Calculation" ? "font-mono text-[11.5px] text-ink" : na ? "font-display text-[#5a3d1c]" : "font-display text-ink")}>{e.title}</span>
                  <span className={clsx("block truncate font-mono text-[9.5px] uppercase tracking-[0.04em]", na ? "text-[#7a5326]/70" : "text-ink/45")}>{e.meta}</span>
                </span>
                <span className="hidden font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/40 sm:inline">{e.kind}</span>
              </motion.li>
            );
          })}
        </ul>
        <p className="t-ui mt-3 text-right text-[10px] text-ink/40">Illustrative figures</p>
      </div>
    </Stage>
  );
}
