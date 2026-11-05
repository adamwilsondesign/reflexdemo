"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CardHeader, Cite, Pill, Stage, StepList, useTypewriter } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;
const PROMPT = "I’m long Amazon after the late-September selloff. Pressure-test my thesis: AWS re-accelerates on AI demand and retail margins keep expanding.";
const STEPS = ["Pull filings and transcripts", "Map suppliers and competitors", "Run valuation in code", "Assemble cited memo"];
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
      <div ref={ref} className="mx-auto flex min-h-[440px] max-w-[500px] flex-col gap-3 sm:min-h-[460px]">
        <div className="ui-card p-4">
          <CardHeader trail={["Deep research · AMZN"]} />
          <p className="mt-3 min-h-[4.4em] text-[14px] leading-relaxed text-[#0d0d0d]">
            {promptText}
            {shown === 0 && promptText.length < PROMPT.length && <span className="animate-blink ml-0.5 inline-block h-[1em] w-px translate-y-[2px] bg-[#0d0d0d]" />}
          </p>
        </div>

        <div className="relative flex-1">
          <AnimatePresence mode="wait" initial={false}>
            {shown === 1 && (
              <motion.div key={`w${cycle}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.5, ease: EASE }} className="ui-card p-4">
                <p className="text-[12px] text-[#8f8f8f]">Working</p>
                <StepList className="mt-2.5" steps={STEPS} active={work} />
              </motion.div>
            )}
            {shown === 2 && (
              <motion.div key={`m${cycle}`} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.6, ease: EASE }} className="ui-card p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[14px] font-semibold text-[#0d0d0d]">Research memo</span>
                  <Pill>Thesis weakens</Pill>
                </div>
                <ul className="mt-3 divide-y divide-black/10 border-t border-black/10">
                  {[
                    ["What’s priced in", <>Reverse DCF implies ~16% AWS growth</>],
                    ["Counter-argument", <>Capex keeps free cash flow compressed<Cite n={2} /></>],
                    ["What breaks it", <>AWS growth below consensus next quarter<Cite n={1} /></>],
                  ].map(([k, v], i) => (
                    <motion.li key={k as string} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.5, ease: EASE }} className="flex flex-col gap-0.5 py-2 text-[13px] sm:flex-row sm:items-baseline sm:gap-3">
                      <span className="shrink-0 text-[12px] text-[#8f8f8f] sm:w-[112px]">{k}</span>
                      <span className="text-[#0d0d0d]">{v}</span>
                    </motion.li>
                  ))}
                </ul>
                <p className="border-t border-black/10 pt-2.5 text-[12px] text-[#8f8f8f]">14 sources · 3 calculations · 1 gap flagged</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Stage>
  );
}
