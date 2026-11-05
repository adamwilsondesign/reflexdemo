"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitText } from "@/components/ui/SplitText";
import { DemoActions } from "@/components/ui/Button";
import { KnowledgeGraph } from "@/components/graphics/KnowledgeGraph";
import { NODE_INFO } from "./graphData";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Dark hero with a large, interactive Knowledge Graph and a live "now tracing" readout. */
export function KGHero() {
  const reduce = useReducedMotion();
  const [focus, setFocus] = useState("AMZN");
  const info = NODE_INFO[focus];
  const f = (d: number) => ({ initial: reduce ? false : { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease: EASE, delay: d } });

  return (
    <section data-tone="dark" className="relative isolate overflow-hidden bg-ink pt-[calc(var(--header-h)+48px)] text-paper md:pt-[calc(var(--header-h)+72px)]">
      <div className="pointer-events-none absolute inset-0 -z-20 field-ink opacity-90" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-50" style={{ maskImage: "radial-gradient(90% 70% at 20% 10%, #000 20%, transparent 70%)", WebkitMaskImage: "radial-gradient(90% 70% at 20% 10%, #000 20%, transparent 70%)" }} />

      <div className="container-x relative">
        <div className="relative z-10 max-w-[640px] lg:pointer-events-none">
          <motion.div {...f(0.05)} className="mb-6 lg:pointer-events-auto">
            <Eyebrow trail={[{ label: "Product", href: "/platform" }, { label: "Knowledge Graph" }]} />
          </motion.div>
          <SplitText as="h1" text="The market intelligence layer for any stack." trigger="mount" delay={0.1} className="t-h1 lg:text-[clamp(2.5rem,1.3rem+3.2vw,4.25rem)]" />
          <motion.p {...f(0.45)} className="t-lead mt-6 max-w-[560px] text-paper/72">
            Reflexivity’s Knowledge Graph maps how companies, products, themes and markets connect, revealing hidden exposures and second-order effects beyond the obvious names.
          </motion.p>
          <motion.div {...f(0.6)} className="mt-9 lg:pointer-events-auto">
            <DemoActions onDark secondary={{ label: "See an event ripple", href: "#ripple" }} cta="kg-hero" />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
        className="relative mt-6 h-[440px] w-full sm:h-[520px] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[64%]"
        style={{ maskImage: "linear-gradient(90deg, transparent 0%, #000 22%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 22%)" }}
      >
        <KnowledgeGraph tone="dark" minor={90} interval={5600} sequence={["AMZN", "PWR", "GLP", "TSM", "AI"]} onFocus={setFocus} showLegend={false} />
      </motion.div>

      <div className="container-x relative z-10 pb-12 pt-6 md:pb-16 lg:pointer-events-none lg:pt-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <ul className="t-ui flex flex-wrap gap-x-5 gap-y-2 text-[10.5px] text-paper/60">
            <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-paper" />Company</li>
            <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full border-[1.5px] border-pine-300" />Theme</li>
            <li className="flex items-center gap-1.5"><span className="h-2 w-2 rotate-45 bg-lake-300" />Product / brand</li>
            <li className="flex items-center gap-1.5"><span className="h-2 w-2 border-[1.3px] border-neutral-300" />Market / geography</li>
            <li className="hidden text-paper/40 sm:block">Hover or tap a node to inspect it</li>
          </ul>
          <div className="w-full max-w-[360px] rounded-[14px] border border-white/12 bg-[#1b1e23]/80 p-4 backdrop-blur-md lg:pointer-events-auto" aria-live="polite">
            <p className="t-ui flex items-center gap-2 text-[10px] text-paper/50">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pine-300 opacity-60" /><span className="relative h-2 w-2 rounded-full bg-pine-300" /></span>
              Now tracing
            </p>
            <AnimatePresence mode="wait">
              {info && (
                <motion.div key={focus} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.45, ease: EASE }}>
                  <p className="mt-2 font-display text-[17px] font-semibold">
                    {info.label} <span className="ml-1 font-mono text-[10px] font-normal uppercase tracking-[0.05em] text-paper/45">{info.type}</span>
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {info.rels.slice(0, 3).map((r) => (
                      <li key={r.to} className="flex items-center gap-3 text-[12px] text-paper/75">
                        <span className="min-w-0 flex-1 truncate">{r.rel} · {r.to}</span>
                        <span className="h-1 w-14 overflow-hidden rounded-full bg-white/10"><span className="block h-full rounded-full bg-lake-300" style={{ width: `${r.w * 100}%` }} /></span>
                        <span className="w-8 text-right font-mono text-[10.5px] text-paper/55">{r.w.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
