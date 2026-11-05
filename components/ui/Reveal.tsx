"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import clsx from "clsx";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fade/rise on enter. Content is visible without JS (SSR renders final state when reduced motion). */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
  amount = 0.25,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "span";
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

export function Stagger({ children, className, as = "div", amount = 0.2 }: { children: React.ReactNode; className?: string; as?: "div" | "ul" | "ol"; amount?: number }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M className={className} variants={container} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, amount }}>
      {children}
    </M>
  );
}

export function StaggerItem({ children, className, as = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "li" | "article" }) {
  const M = motion[as];
  return (
    <M className={clsx(className)} variants={item}>
      {children}
    </M>
  );
}
