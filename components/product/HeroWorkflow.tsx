"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Cite, MissingData, PromptCard, StepList } from "./ui";

const EASE = [0.16, 1, 0.3, 1] as const;
const PHASES = ["Ask", "Connect", "Verify", "Monitor"] as const;
const DUR = [3600, 3400, 5000, 4400];
const PROMPT = "Map AAPL’s ecosystem and find the hidden beneficiaries.";

/**
 * Home hero product sequence — one workflow in four plain panels:
 * a question → the Graph traversal → a cited answer with a gap flagged → a follow-up alert.
 * Illustration style: DESIGN_1 (white panels, hairline, achromatic, system font).
 */
export function HeroWorkflow({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(reduce ? 2 : 0);
  const [cycle, setCycle] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const t = setTimeout(() => {
      setPhase((p) => {
        const n = (p + 1) % PHASES.length;
        if (n === 0) setCycle((c) => c + 1);
        return n;
      });
    }, DUR[phase]);
    return () => clearTimeout(t);
  }, [phase, inView, reduce]);

  useEffect(() => {
    if (phase !== 1) { setStep(0); return; }
    const iv = setInterval(() => setStep((s) => Math.min(3, s + 1)), 760);
    return () => clearInterval(iv);
  }, [phase]);

  return (
    <div ref={ref} className={clsx("pui relative", className)}>
      {/* step indicator */}
      <div className="mb-3 flex items-center gap-1" aria-hidden="true">
        {PHASES.map((p, i) => (
          <button
            key={p}
            type="button"
            tabIndex={-1}
            onClick={() => setPhase(i)}
            className={clsx("rounded-[10px] px-2.5 py-1 text-[13px] transition-colors duration-300", i === phase ? "bg-white text-[#0d0d0d]" : "text-white/70 hover:bg-white/10")}
          >
            {p}
          </button>
        ))}
      </div>

      <PromptCard prompt={PROMPT} trail={["AAPL"]} typing={phase === 0} start={inView} key={`p${cycle}`} active={phase === 0} />

      <div className="relative mt-2 min-h-[236px]">
        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.div key="ph1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }} className="ui-card p-4">
              <p className="text-[13px] text-[#8f8f8f]">Working</p>
              <StepList className="mt-2" active={step} steps={["Resolve Apple Inc. (AAPL)", "Traverse suppliers and partners", "Weight relationships by evidence", "Pull fundamentals"]} />
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div key="ph2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }} className="ui-card p-4">
              <p className="text-[16px] font-semibold">12 potential beneficiaries</p>
              <div className="mt-2 divide-y divide-black/10 border-t border-black/10">
                {[
                  ["TSMC", "Supplier, advanced nodes", 1],
                  ["Broadcom", "Supplier, connectivity", 2],
                  ["Micron", "Supplier, memory", 3],
                ].map(([n, r, c]) => (
                  <div key={n as string} className="flex items-baseline justify-between gap-3 py-2 text-[13px]">
                    <span className="font-medium text-[#0d0d0d]">{n as string}</span>
                    <span className="truncate text-[#5d5d5d]">
                      {r as string}
                      <Cite n={c as number} />
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <MissingData label="Supplier revenue split, 2 names" reason="Not disclosed" />
              </div>
            </motion.div>
          )}

          {phase === 3 && (
            <motion.div key="ph3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }} className="ui-card p-4">
              <div className="flex items-center justify-between text-[12px] text-[#8f8f8f]">
                <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#0d0d0d]" />Insight</span>
                <span>2m ago</span>
              </div>
              <p className="mt-1 text-[15px] font-semibold leading-snug">TSMC raises advanced-node capacity guidance</p>
              <p className="mt-1 text-[13px] text-[#5d5d5d]">Touches 3 names on your AAPL list.</p>
              <div className="mt-3 border-t border-black/10 pt-3">
                <span className="rounded-[10px] border border-black/10 px-3 py-1 text-[13px] font-medium">Ask Alfred what it means</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
