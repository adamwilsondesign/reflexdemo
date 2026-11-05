"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Step counter for looping product visuals. Advances every `ms` only while the element
 * is on screen and reduced motion is off; with reduced motion it rests on `rest`.
 */
export function useLoop<T extends HTMLElement = HTMLDivElement>(count: number, ms: number, rest = count - 1) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduce || !inView) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % count), ms);
    return () => clearTimeout(t);
  }, [step, inView, reduce, count, ms]);
  return { ref, step: reduce ? rest : step, reduce: !!reduce, inView };
}
