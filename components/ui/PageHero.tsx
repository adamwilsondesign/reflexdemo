"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import clsx from "clsx";
import { Eyebrow } from "./Eyebrow";
import { SplitText } from "./SplitText";
import { DemoActions } from "./Button";

const EASE = [0.16, 1, 0.3, 1] as const;

export type HeroSurface = "paper" | "ink" | "lake" | "pine" | "lake700" | "graphite" | "pine900";
export const HERO_BG: Record<HeroSurface, string> = {
  paper: "#f4f3f1",
  ink: "#17191c",
  lake: "#243244",
  pine: "#3e5c50",
  lake700: "#3e5368",
  graphite: "#3c3f44",
  pine900: "#1c332c",
};

/**
 * Inner-page hero. Every hero animates: breadcrumb eyebrow, word-rise headline, lead,
 * actions, then the visual slot (pass an animated product visual). No photography in heroes.
 */
export function PageHero({
  trail,
  eyebrow,
  title,
  lead,
  visual,
  layout = "split",
  surface = "paper",
  actions,
  secondary,
  cta,
  className,
  children,
}: {
  trail?: { label: string; href?: string }[];
  eyebrow?: string;
  title: string;
  lead?: React.ReactNode;
  visual?: React.ReactNode;
  layout?: "split" | "stacked" | "text";
  /** Solid hero colour. Product pages each own one brand colour, matched by their demo. */
  surface?: HeroSurface;
  /** custom buttons; pass `null` for a hero without any CTA */
  actions?: React.ReactNode | null;
  secondary?: { label: string; href: string };
  cta?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const vy = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const dark = surface !== "paper";

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section
      ref={ref}
      data-tone={dark ? "dark" : "light"}
      data-bg={HERO_BG[surface]}
      style={{ backgroundColor: HERO_BG[surface] }}
      className={clsx(
        "relative isolate overflow-hidden pt-[calc(var(--header-h)+56px)] md:pt-[calc(var(--header-h)+80px)]",
        layout === "stacked" ? "pb-0" : "pb-20 md:pb-28",
        dark ? "text-paper" : "text-ink",
        className,
      )}
    >

      <div className={clsx("container-x", layout === "split" && "grid items-center gap-14 lg:grid-cols-12 lg:gap-12")}>
        <div className={clsx(layout === "split" ? "lg:col-span-6" : "max-w-[920px]", layout === "stacked" && "mx-auto text-center")}>
          {(trail || eyebrow) && (
            <motion.div {...fade(0.05)} className={clsx("mb-6", layout === "stacked" && "flex justify-center")}>
              <Eyebrow trail={trail}>{eyebrow}</Eyebrow>
            </motion.div>
          )}
          <SplitText as="h1" text={title} trigger="mount" delay={0.1} className={clsx(layout === "text" ? "t-display" : "t-h1 lg:text-[clamp(2.5rem,1.3rem+3.2vw,4.25rem)]")} />
          {lead && (
            <motion.div {...fade(0.45)} className={clsx("t-lead mt-6 max-w-[580px]", dark ? "text-paper/72" : "text-ink/72", layout === "stacked" && "mx-auto")}>
              {lead}
            </motion.div>
          )}
          {actions !== null && (
            <motion.div {...fade(0.6)} className={clsx("mt-9", layout === "stacked" && "flex justify-center")}>
              {actions ?? <DemoActions onDark={dark} secondary={secondary} cta={cta} />}
            </motion.div>
          )}
          {children}
        </div>

        {visual && layout === "split" && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
            style={{ y: reduce ? 0 : vy }}
            className="relative lg:col-span-6"
          >
            {visual}
          </motion.div>
        )}
      </div>

      {visual && layout === "stacked" && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.45 }}
          className="container-x relative mt-14 md:mt-20"
        >
          {visual}
        </motion.div>
      )}
    </section>
  );
}
