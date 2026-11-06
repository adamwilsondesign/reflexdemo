"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Field } from "@/components/visual/kit";
import { WorkedCatalyst } from "@/components/visual/scenes/WorkedCatalyst";
import { RippleGraph } from "@/components/visual/scenes/RippleGraph";
import { WorkedAsk } from "@/components/visual/scenes/WorkedAsk";
import { WorkedEvidence } from "@/components/visual/scenes/WorkedEvidence";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS: { kicker: string; title: string; body: string; visual: React.ReactNode }[] = [
  {
    kicker: "01 · The event",
    title: "A catalyst lands.",
    body: "September U.S. Flash PMI rekindles factory cost pressure. Insights surfaces it the moment it matters to the companies and themes you follow, with the reason it reached you.",
    visual: <Field field="lake" className="flex h-full w-full items-center"><div className="w-full"><WorkedCatalyst /></div></Field>,
  },
  {
    kicker: "02 · The ripple",
    title: "The Graph traces where it travels.",
    body: "Relationships are weighted by evidence, so you see which suppliers, customers, and competitors are most exposed: first-order, then second-order.",
    visual: (
      <Field field="ink" className="flex h-full w-full items-center">
        <div className="w-full"><RippleGraph tags={[["Flash PMI", "Catalyst"], ["Eaton", "1st order"], ["Rockwell Automation", "2nd order"], ["Harmonic Drive", "3rd order"]]} /></div>
      </Field>
    ),
  },
  {
    kicker: "03 · The question",
    title: "Ask Alfred what it means for you.",
    body: "Open the Insight in Alfred and keep going: compare exposures, check guidance, or pressure-test the read against your own thesis.",
    visual: <Field field="pine" className="flex h-full w-full items-center"><div className="w-full"><WorkedAsk /></div></Field>,
  },
  {
    kicker: "04 · The evidence",
    title: "Inspect it before you act on it.",
    body: "Every figure links to its source. The calculation is visible. Where an input is missing, Alfred says so instead of estimating it.",
    visual: <Field field="mist" className="flex h-full w-full items-center"><div className="w-full"><WorkedEvidence /></div></Field>,
  },
];

/** Scroll story: copy scrolls on the left, the step's illustration stays pinned on the right (inline under each step on mobile). */
export function WorkedExample() {
  const [active, setActive] = useState(0);
  return (
    <div className="grid-12 mt-10 gap-y-10 md:mt-16">
      <div className="col-span-12 lg:col-span-5">
        {STEPS.map((s, i) => (
          <Step key={s.title} index={i} onActive={setActive} active={active === i} {...s} />
        ))}
      </div>
      <div className="hidden lg:col-span-6 lg:col-start-7 lg:block">
        <div className="sticky top-[calc(var(--header-live)+48px)] aspect-[4/3.6] w-full">
          <AnimatePresence mode="popLayout">
            <motion.div key={active} className="absolute inset-0" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.8, ease: EASE }}>
              {STEPS[active].visual}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Step({ title, body, visual, index, onActive, active }: { kicker: string; title: string; body: string; visual: React.ReactNode; index: number; onActive: (i: number) => void; active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => { if (inView) onActive(index); }, [inView, index, onActive]);
  return (
    <div ref={ref} className="flex flex-col justify-center py-8 lg:min-h-[72vh] lg:py-0">
      <div className={clsx("transition-opacity duration-700", active ? "opacity-100" : "lg:opacity-30")}>
        <h3 className="t-h2">{title}</h3>
        <p className="t-lead mt-4 text-ink/70">{body}</p>
      </div>
      <div className="mt-8 w-full lg:hidden">{visual}</div>
    </div>
  );
}
