"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import clsx from "clsx";
import { Eyebrow } from "./Eyebrow";
import { SplitText } from "./SplitText";
import { DemoActions } from "./Button";

const EASE = [0.16, 1, 0.3, 1] as const;

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
  surface?: "paper" | "ink" | "lake";
  actions?: React.ReactNode;
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
      className={clsx(
        "relative isolate overflow-hidden pt-[calc(var(--header-h)+56px)] md:pt-[calc(var(--header-h)+80px)]",
        layout === "stacked" ? "pb-0" : "pb-20 md:pb-28",
        surface === "paper" && "bg-paper text-ink",
        surface === "ink" && "bg-ink text-paper",
        surface === "lake" && "bg-lake-900 text-paper",
        className,
      )}
    >
      <div className={clsx("pointer-events-none absolute inset-0 -z-10 mask-fade-b", dark ? "bg-chart-dark" : "bg-chart")} style={{ maskImage: "radial-gradient(120% 70% at 30% 0%, #000 30%, transparent 75%)", WebkitMaskImage: "radial-gradient(120% 70% at 30% 0%, #000 30%, transparent 75%)" }} />
      {dark && <div className="pointer-events-none absolute inset-0 -z-20 field-ink opacity-90" />}

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
          <motion.div {...fade(0.6)} className={clsx("mt-9", layout === "stacked" && "flex justify-center")}>
            {actions ?? <DemoActions onDark={dark} secondary={secondary} cta={cta} />}
          </motion.div>
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
