"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
import { Arrow } from "@/components/ui/Button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Newsletter subscribe (light surface). Deliberately separate from the demo request form. */
export function SubscribeForm({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  const uid = useId();
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "sending" | "done">("idle");
  const valid = EMAIL_RE.test(email.trim());

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return setState("error");
    setState("sending");
    // Front-end only for the POC: the HubSpot newsletter embed replaces this.
    await new Promise((r) => setTimeout(r, 700));
    setState("done");
  };

  return (
    <form noValidate onSubmit={submit} aria-label="Newsletter signup" data-form="newsletter" className={clsx("w-full max-w-[520px]", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {state === "done" ? (
          <motion.div
            key="done"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            role="status"
            className={clsx("flex items-start gap-3 rounded-[12px] border px-4 py-4", onDark ? "border-white/15 bg-white/[0.05]" : "border-pine-300/60 bg-pine-100/60")}
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pine-500 text-white">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3.5 8.5l3 3 6-6.5" />
              </svg>
            </span>
            <span>
              <span className="block font-display text-[16px] font-semibold">You&rsquo;re subscribed.</span>
              <span className={clsx("mt-0.5 block text-[14px]", onDark ? "text-paper/65" : "text-ink/65")}>Look out for the next issue. You can unsubscribe from any email in one click.</span>
            </span>
          </motion.div>
        ) : (
          <motion.div key="form" exit={reduce ? undefined : { opacity: 0, y: -6 }}>
            <label htmlFor={`${uid}-email`} className={clsx("block text-[14px] font-medium", onDark ? "text-paper" : "text-ink")}>
              Email address
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                id={`${uid}-email`}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="name@firm.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error") setState("idle");
                }}
                aria-invalid={state === "error" || undefined}
                aria-describedby={state === "error" ? `${uid}-err` : `${uid}-hint`}
                className={clsx(
                  "h-12 w-full min-w-0 sm:flex-1 rounded-[10px] border px-3.5 text-[15px] transition-colors focus:outline-none focus:ring-2",
                  onDark ? "bg-white/[0.06] text-paper placeholder:text-paper/40" : "bg-white text-ink placeholder:text-ink/35",
                  state === "error" ? "border-[#b5594a] focus:ring-[#b5594a]/20" : onDark ? "border-white/20 focus:border-paper/60 focus:ring-white/15" : "border-ink/15 focus:border-lake-500 focus:ring-lake-500/25",
                )}
              />
              <button
                type="submit"
                disabled={state === "sending"}
                aria-busy={state === "sending"}
                className={clsx(
                  "group inline-flex h-12 shrink-0 items-center justify-center gap-2 px-6 font-display text-[16px] font-medium transition-colors disabled:cursor-progress",
                  onDark ? "bg-paper text-ink hover:bg-white" : "bg-ink text-paper hover:bg-lake-900",
                )}
              >
                {state === "sending" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70" aria-hidden="true" />
                    Subscribing&hellip;
                  </>
                ) : (
                  <>
                    Subscribe <Arrow />
                  </>
                )}
              </button>
            </div>
            {state === "error" ? (
              <p id={`${uid}-err`} role="alert" className="mt-2 text-[13px] text-[#9a3f30]">
                Enter a valid email address, like name@firm.com.
              </p>
            ) : (
              <p id={`${uid}-hint`} className={clsx("mt-2.5 text-[13px] leading-relaxed", onDark ? "text-paper/50" : "text-ink/55")}>
                Unsubscribe anytime. See our{" "}
                <Link href="/privacy" className="underline decoration-current/30 underline-offset-2 hover:decoration-current">
                  Privacy Policy
                </Link>
                .
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
