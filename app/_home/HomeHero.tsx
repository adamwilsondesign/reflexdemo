"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitText } from "@/components/ui/SplitText";
import { DemoActions } from "@/components/ui/Button";
import { PrecisionIcon } from "@/components/ui/PrecisionIcon";
import { Stage } from "@/components/product/ui";
import { HeroWorkflow } from "@/components/product/HeroWorkflow";
import { RippleRings } from "@/components/graphics/RippleRings";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const ringsY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const f = (d: number) => ({ initial: reduce ? false : { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease: EASE, delay: d } });

  return (
    <section ref={ref} data-tone="light" data-bg="#f4f3f1" className="relative isolate overflow-hidden bg-paper pb-16 pt-[calc(var(--header-h)+48px)] md:pb-24 md:pt-[calc(var(--header-h)+72px)]">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-chart"
        style={{ maskImage: "radial-gradient(90% 80% at 70% 30%, #000 20%, transparent 70%)", WebkitMaskImage: "radial-gradient(90% 80% at 70% 30%, #000 20%, transparent 70%)" }}
      />
      <motion.div style={{ y: reduce ? 0 : ringsY }} className="pointer-events-none absolute -right-[13%] top-[2%] -z-10 hidden h-[1100px] w-[440px] text-lake-700/35 xl:block">
        <RippleRings className="h-full w-full" />
      </motion.div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 xl:col-span-6">
          <motion.div {...f(0.05)}>
            <Eyebrow>AI Investment Research</Eyebrow>
          </motion.div>
          <SplitText as="h1" text="Trace the relationships shaping markets." trigger="mount" delay={0.12} stagger={0.06} className="t-display mt-6 max-w-[720px]" />
          <motion.p {...f(0.55)} className="t-lead mt-7 max-w-[540px] text-ink/75">
            Reflexivity helps institutional investors test ideas faster and uncover the hidden risks and opportunities they’d otherwise miss.
          </motion.p>
          <motion.div {...f(0.7)} className="mt-9">
            <DemoActions secondary={{ label: "Explore the platform", href: "/platform" }} cta="home-hero" />
          </motion.div>

          <motion.dl {...f(0.9)} className="mt-14 grid max-w-[560px] gap-6 border-t border-ink/12 pt-7 sm:grid-cols-2">
            <div className="flex gap-3.5">
              <PrecisionIcon name="crosshair" className="mt-0.5 h-6 w-6 shrink-0 text-lake-700" />
              <div>
                <dt className="font-display text-[15px] font-semibold">On-demand research</dt>
                <dd className="t-small mt-1 text-ink/65">Ask Alfred to investigate a company, analyze a portfolio, or pressure-test a thesis.</dd>
              </div>
            </div>
            <div className="flex gap-3.5">
              <PrecisionIcon name="signal" className="mt-0.5 h-6 w-6 shrink-0 text-pine-500" />
              <div>
                <dt className="font-display text-[15px] font-semibold">Always-on intelligence</dt>
                <dd className="t-small mt-1 text-ink/65">Relevant catalysts and their ripple effects, surfaced across the names you follow.</dd>
              </div>
            </div>
          </motion.dl>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 50, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.3 }}
          style={{ y: reduce ? 0 : y }}
          className="lg:col-span-6 xl:col-span-6"
        >
          <Stage field="lake" className="p-4 sm:p-7 md:p-9" image="/figma/n875.png">
            <HeroWorkflow />
          </Stage>
          <p className="t-ui mt-4 text-ink/45">Illustrative example. Alfred cites a source for every figure and flags missing data.</p>
        </motion.div>
      </div>
    </section>
  );
}
