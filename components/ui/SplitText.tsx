"use client";

import { motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
import { createElement } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Masked word-by-word rise. Used for hero headlines and section titles.
 * `trigger="mount"` animates immediately (heroes); `"view"` waits for scroll.
 */
export function SplitText({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.05,
  trigger = "view",
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: "mount" | "view";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const animateProps =
    trigger === "mount"
      ? { animate: "show" as const }
      : { whileInView: "show" as const, viewport: { once: true, amount: 0.4 } };

  const content = (
    <motion.span
      className="block"
      initial={reduce ? false : "hidden"}
      {...animateProps}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      aria-hidden="true"
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            variants={{ hidden: { y: "105%", rotate: 2 }, show: { y: "0%", rotate: 0, transition: { duration: 1, ease: EASE } } }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );

  return createElement(as, { className: clsx(className), "aria-label": text }, content);
}
