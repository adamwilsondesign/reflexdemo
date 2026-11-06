"use client";

import { motion, useReducedMotion } from "motion/react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitText } from "@/components/ui/SplitText";
import { DemoActions } from "@/components/ui/Button";
import { Field } from "@/components/visual/kit";
import { LayeredStack } from "@/components/visual/scenes/LayeredStack";
import { Illustrative } from "@/components/ui/Illustrative";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeHero() {
  const reduce = useReducedMotion();
  const f = (d: number) => ({ initial: reduce ? false : { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease: EASE, delay: d } });

  return (
    <section data-tone="light" data-bg="#f4f3f1" className="relative isolate overflow-hidden bg-paper pb-16 pt-[calc(var(--header-h)+48px)] md:pb-24 md:pt-[calc(var(--header-h)+80px)]">
      <div className="container-x grid-12 items-center gap-y-16">
        <div className="col-span-12 lg:col-span-6">
          <motion.div {...f(0.05)}>
            <Eyebrow>AI Investment Research</Eyebrow>
          </motion.div>
          <SplitText as="h1" text="Trace the relationships shaping markets." trigger="mount" delay={0.12} stagger={0.06} className="t-display mt-6 max-w-[720px]" />
          <motion.p {...f(0.55)} className="t-lead mt-8 max-w-[528px] text-ink/75">
            Reflexivity helps institutional investors test ideas faster and uncover the hidden risks and opportunities they’d otherwise miss.
          </motion.p>
          <motion.div {...f(0.7)} className="mt-10">
            <DemoActions cta="home-hero" />
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          className="col-span-12 lg:col-span-6"
        >
          <Field field="pine">
            <LayeredStack />
          </Field>
          <Illustrative className="mt-4">Illustrative example.</Illustrative>
        </motion.div>
      </div>
    </section>
  );
}
