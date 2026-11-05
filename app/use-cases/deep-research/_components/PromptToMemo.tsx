"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CardHeader, Cite, Pill, Stage, StepList, useTypewriter } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;
const PROMPT = "I’m long Amazon after the late-September selloff. Pressure-test my thesis: AWS re-accelerates on AI demand and retail margins keep expanding.";
const STEPS = ["Resolve entities · AMZN, AWS", "Pull filings and transcripts", "Map suppliers and competitors", "Run valuation in code", "Assemble cited memo"];
const DUR = [4600, 4200, 6200];

/** Hero: one prompt → visible work → a cited memo. Loops while on screen. */
export function PromptToMemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(1);
  const [cycle, setCycle] = useState(0);
  const [work, setWork] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const t = setTimeout(() => {
      if (phase === 2) setCycle((c) => c + 1);
      setPhase((phase + 1) % 3);
    }, DUR[phase]);
    return () => clearTimeout(t);
  }, [phase, inView, reduce]);

  useEffect(() => {
    if (phase !== 1) { setWork(0); return; }
    const iv = setInterval(() => setWork((w) => Math.min(w + 1, STEPS.length)), 780);
    return () => clearInterval(iv);
  }, [phase]);

  const shown = reduce ? 2 : phase;
  const typed = useTypewriter(PROMPT, { start: shown === 0 && inView, speed: 22, delay: 300 });
  const promptText = shown === 0 ? typed : PROMPT;

  return (
    <Stage field="lake" className="p-4 sm:p-8">
      <div ref={ref} className="mx-auto flex min-h-[470px] max-w-[500px] flex-col gap-3 sm:min-h-[500px]">
        <div className="ui-card p-4 sm:p-5">
          <CardHeader trail={["Deep research", "AMZN"]} right={<Pill tone="lake">Cite sources · on</Pill>} />
          <p className="mt-3.5 min-h-[4.2em] text-[13.5px] leading-relaxed text-ink/85 sm:text-[14px]">
            {promptText}
            {shown === 0 && promptText.length < PROMPT.length && <span className="animate-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-lake-700" />}
          </p>
        </div>

        <div className="relative flex-1">
          <AnimatePresence mode="wait" initial={false}>
            {shown === 1 && (
              <motion.div key={`w${cycle}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5, ease: EASE }} className="ui-card p-4 sm:p-5">
                <p className="t-ui text-[10px] text-ink/45">Working · visible steps</p>
                <StepList className="mt-3" steps={STEPS} active={work} />
              </motion.div>
            )}
            {shown === 2 && (
              <motion.div key={`m${cycle}`} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.6, ease: EASE }} className="ui-card p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="t-ui text-[10px] text-ink/45">Research memo · 6 sections</span>
                  <Pill tone="warn">Verdict · Thesis weakens</Pill>
                </div>
                <ul className="mt-3 divide-y divide-ink/8">
                  {[
                    ["What’s priced in", <>Reverse DCF implies ~16% AWS growth<span className="ml-1 font-mono text-[9px] text-pine-500">ƒx</span></>],
                    ["Counter-arguments", <>Capex keeps free cash flow compressed<Cite n={2} /></>],
                    ["What breaks it", <>AWS growth below consensus next quarter<Cite n={1} /></>],
                    ["Second-order risk", <>GPU and power supply set capacity<Cite n={3} /></>],
                  ].map(([k, v], i) => (
                    <motion.li key={k as string} initial={reduce ? false : { opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.5, ease: EASE }} className="flex items-baseline gap-3 py-2 text-[12px]">
                      <span className="w-[112px] shrink-0 font-mono text-[9.5px] uppercase tracking-[0.04em] text-ink/45">{k}</span>
                      <span className="text-ink/80">{v}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-2 flex items-center justify-between border-t border-ink/8 pt-2.5 font-mono text-[9.5px] uppercase tracking-[0.04em] text-ink/45">
                  <span>14 sources · 3 calculations</span>
                  <span className="text-[#7a5326]">1 gap flagged</span>
                </div>
              </motion.div>
            )}
            {shown === 0 && (
              <motion.div key={`p${cycle}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-[14px] border border-dashed border-white/25 p-4 sm:p-5">
                <p className="t-ui text-[10px] text-paper/55">Memo · waiting for prompt</p>
                <div className="mt-4 space-y-2.5">
                  {[82, 94, 70, 88, 56].map((w, i) => (
                    <span key={i} className={clsx("shimmer block h-2.5 rounded-full bg-white/12")} style={{ width: `${w}%` }} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Stage>
  );
}
