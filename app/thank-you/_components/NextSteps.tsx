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
    <div ref={ref} className="ui-card relative overflow-hidden p-4 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white ring-1 ring-ink/5">
            <AlfredGlyph className="h-[18px] w-[18px] text-lake-700" />
          </span>
          <div>
            <h2 className="font-display text-[15px] font-semibold leading-tight text-ink">What happens next</h2>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.05em] text-ink/45">Demo request · Status</p>
          </div>
        </div>
        <motion.span
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={play ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          className="inline-flex items-center gap-1.5 rounded-full bg-pine-100 px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.05em] text-pine-700"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-pine-500" aria-hidden="true" />
          Received
        </motion.span>
      </div>

      {interests.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.05em] text-ink/45">Focus</span>
          {interests.map((i) => (
            <span key={i} className="rounded-full bg-lake-100 px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.05em] text-lake-700">
              {i}
            </span>
          ))}
        </div>
      )}

      <ol className="relative mt-7">
        {/* rail */}
        <span className="absolute bottom-3 left-[11px] top-3 w-px bg-ink/10" aria-hidden="true" />
        <motion.span
          className="absolute left-[11px] top-3 w-px origin-top bg-lake-500"
          style={{ height: "calc(100% - 24px)" }}
          initial={reduce ? false : { scaleY: 0 }}
          animate={play ? { scaleY: 1 } : undefined}
          transition={{ duration: 2.4, delay: 0.4, ease: EASE }}
          aria-hidden="true"
        />
        {STEPS.map((s, i) => (
          <motion.li
            key={s.title}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={play ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.45, ease: EASE }}
            className={clsx("relative flex gap-4", i < STEPS.length - 1 && "pb-6")}
          >
            <span
              className={clsx(
                "relative z-10 flex h-[23px] w-[23px] shrink-0 items-center justify-center rounded-full border",
                "done" in s ? "border-pine-500 bg-pine-500 text-white" : "border-ink/15 bg-paper text-ink/40",
              )}
              aria-hidden="true"
            >
              {"done" in s ? (
                <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3.5 8.5l3 3 6-6.5" />
                </svg>
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
              )}
              {i === 1 && !reduce && <span className="animate-pulse-ring absolute inset-0 rounded-full border border-lake-500" />}
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.05em] text-ink/45">{s.when}</p>
              <h3 className="mt-1 font-display text-[15.5px] font-semibold text-ink">{s.title}</h3>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink/65">{s.body}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
