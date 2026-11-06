"use client";

import { motion, useReducedMotion } from "motion/react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitText } from "@/components/ui/SplitText";
import { DemoActions } from "@/components/ui/Button";
import { DeepGraph } from "@/components/visual/scenes/DeepGraph";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Dark hero: headline left half, the deep graph (approved v2 scene) in the right half, straight on the ink field. */
export function KGHero() {
  const reduce = useReducedMotion();
  const f = (d: number) => ({ initial: reduce ? false : { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease: EASE, delay: d } });

  return (
    <section data-tone="dark" data-bg="#17191c" className="relative isolate overflow-hidden bg-ink pb-16 pt-[calc(var(--header-h)+48px)] text-paper md:pb-24 md:pt-[calc(var(--header-h)+80px)]">
      <div className="pointer-events-none absolute inset-0 -z-20 field-ink opacity-90" />

      <div className="container-x grid-12 items-center gap-y-12">
        <div className="col-span-12 lg:col-span-6">
          <motion.div {...f(0.05)} className="mb-6">
            <Eyebrow trail={[{ label: "Product", href: "/platform" }, { label: "Knowledge Graph" }]} />
          </motion.div>
          <SplitText as="h1" text="The market intelligence layer for any stack." trigger="mount" delay={0.1} className="t-h1 lg:text-[clamp(2.5rem,1.3rem+3.2vw,4.25rem)]" />
          <motion.p {...f(0.45)} className="t-lead mt-6 max-w-[528px] text-paper/72">
            Reflexivity’s Knowledge Graph maps how companies, products, themes and markets connect, revealing hidden exposures and second-order effects beyond the obvious names.
          </motion.p>
          <motion.div {...f(0.6)} className="mt-10">
            <DemoActions onDark cta="kg-hero" />
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          className="col-span-12 lg:col-span-6 lg:col-start-7"
        >
          <div className="mx-auto w-full max-w-[560px]">
            <DeepGraph />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
