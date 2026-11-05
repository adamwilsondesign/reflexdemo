"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import clsx from "clsx";
import { AlfredGlyph } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  { when: "Just now", title: "Request received", body: "Your details and any question you shared are with our team.", done: true },
  { when: "Within one business day", title: "We follow up to schedule", body: "A short email to find a time and confirm what you’d like to cover." },
  { when: "Typically 30 minutes", title: "Your walkthrough", body: "A product specialist runs your question, watchlist, or one of our examples live in the platform." },
  { when: "Afterwards", title: "Next steps, if it fits", body: "Follow-up material, a security review, or a deeper session with your team." },
] as const;

/** Animated "What happens next" timeline, styled as a product status card. */
export function NextSteps({ interests }: { interests: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const play = inView || !!reduce;

  return (
    <div ref={ref} className="ui-card relative overflow-hidden p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <AlfredGlyph className="h-4 w-4 text-[#0d0d0d]" />
          <h2 className="text-[16px] font-semibold leading-tight text-[#0d0d0d]">What happens next</h2>
        </div>
        <motion.span
          initial={reduce ? false : { opacity: 0 }}
          animate={play ? { opacity: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#0d0d0d]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#0d0d0d]" aria-hidden="true" />
          Received
        </motion.span>
      </div>

      {interests.length > 0 && (
        <p className="mt-2 text-[13px] text-[#8f8f8f]">
          Focus: <span className="text-[#5d5d5d]">{interests.join(", ")}</span>
        </p>
      )}

      <ol className="relative mt-5 border-t border-black/10 pt-5">
        {/* rail */}
        <span className="absolute bottom-3 left-[9px] top-8 w-px bg-black/10" aria-hidden="true" />
        <motion.span
          className="absolute left-[9px] top-8 w-px origin-top bg-black/40"
          style={{ height: "calc(100% - 44px)" }}
          initial={reduce ? false : { scaleY: 0 }}
          animate={play ? { scaleY: 1 } : undefined}
          transition={{ duration: 2.4, delay: 0.4, ease: EASE }}
          aria-hidden="true"
        />
        {STEPS.map((s, i) => (
          <motion.li
            key={s.title}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={play ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.45, ease: EASE }}
            className={clsx("relative flex gap-4", i < STEPS.length - 1 && "pb-5")}
          >
            <span
              className={clsx(
                "relative z-10 mt-0.5 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full border bg-white",
                "done" in s ? "border-[#0d0d0d] text-[#0d0d0d]" : "border-black/15 text-[#8f8f8f]",
              )}
              aria-hidden="true"
            >
              {"done" in s ? (
                <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M3.5 8.5l3 3 6-6.5" />
                </svg>
              ) : (
                <span className="h-1 w-1 rounded-full bg-current" />
              )}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className={clsx("text-[15px] text-[#0d0d0d]", "done" in s ? "font-semibold" : "font-medium")}>{s.title}</h3>
                <p className="text-[12px] text-[#8f8f8f]">{s.when}</p>
              </div>
              <p className="mt-0.5 text-[13px] leading-relaxed text-[#5d5d5d]">{s.body}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
