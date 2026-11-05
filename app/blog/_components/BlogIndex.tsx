"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import clsx from "clsx";
import { BLOG_CATEGORIES, type BlogCategory, type BlogPost } from "@/lib/blog";
import { PostCard } from "./PostCard";

const EASE = [0.16, 1, 0.3, 1] as const;
type Filter = "All" | BlogCategory;

const DESCRIPTIONS: Record<Filter, string> = {
  All: "Everything we’ve published, newest first.",
  Perspectives: "How AI should and shouldn’t change investment decisions.",
  Product: "How we build Reflexivity, and what’s new in the platform.",
  Research: "The economics of curiosity, and what better questions are worth.",
};

/** Client-side category filter with an animated tab indicator and layout-animated grid. */
export function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const reduce = useReducedMotion();
  const filters: Filter[] = ["All", ...BLOG_CATEGORIES];
  const shown = filter === "All" ? posts : posts.filter((p) => p.category === filter);
  // Widen 1–2 cards so the 3-column grid always ends on a full row (desktop).
  const wideCount = (3 - (shown.length % 3)) % 3;
  const wideAt = new Set(wideCount === 2 ? [0, Math.min(shown.length - 1, 6)] : wideCount === 1 ? [0] : []);
  const count = (f: Filter) => (f === "All" ? posts.length : posts.filter((p) => p.category === f).length);

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-ink/10 pb-5 md:flex-row md:items-end md:justify-between">
        <div
          role="tablist"
          aria-label="Filter articles by category"
          onKeyDown={(e) => {
            if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
            e.preventDefault();
            const next = (filters.indexOf(filter) + (e.key === "ArrowRight" ? 1 : -1) + filters.length) % filters.length;
            setFilter(filters[next]);
            (e.currentTarget.querySelectorAll("button")[next] as HTMLButtonElement | undefined)?.focus();
          }}
          className="no-scrollbar -mx-[var(--gutter)] flex gap-1 overflow-x-auto px-[var(--gutter)] md:mx-0 md:px-0">
          <LayoutGroup id="blog-tabs">
            {filters.map((f) => {
              const on = filter === f;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={on}
                  tabIndex={on ? 0 : -1}
                  aria-controls="blog-grid"
                  onClick={() => setFilter(f)}
                  className={clsx(
                    "relative flex h-10 shrink-0 items-center gap-2 rounded-full px-4 font-display text-[15px] font-medium transition-colors duration-300",
                    on ? "text-paper" : "text-ink/65 hover:text-ink",
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="blog-tab-pill"
                      className="absolute inset-0 -z-0 rounded-full bg-ink"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className="relative">{f}</span>
                  <span className={clsx("relative font-mono text-[11px]", on ? "text-paper/60" : "text-ink/40")}>{count(f)}</span>
                </button>
              );
            })}
          </LayoutGroup>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={filter}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="t-small text-ink/60 md:text-right"
            aria-live="polite"
          >
            {DESCRIPTIONS[filter]}
          </motion.p>
        </AnimatePresence>
      </div>

      <motion.ul id="blog-grid" role="tabpanel" aria-label={`${filter} articles`} layout={!reduce} className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12 lg:grid-flow-dense lg:grid-cols-3 lg:gap-6">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p, i) => (
            <motion.li
              key={p.slug}
              className={wideAt.has(i) ? "lg:col-span-2" : undefined}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
              transition={{ duration: 0.7, ease: EASE, delay: reduce ? 0 : Math.min(i, 6) * 0.04 }}
            >
              <PostCard post={p} wide={wideAt.has(i)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
