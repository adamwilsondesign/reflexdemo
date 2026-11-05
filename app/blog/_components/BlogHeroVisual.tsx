"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PrecisionIcon, type IconName } from "@/components/ui/PrecisionIcon";
import { Stage } from "@/components/product/ui";
import { formatDate, type BlogPost } from "@/lib/blog";
import { BlogCover } from "./BlogCover";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Cycling stack of article cards over a precision-icon lattice: the editorial desk, in code. */
export function BlogHeroVisual({ posts }: { posts: BlogPost[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [start, setStart] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const t = setInterval(() => setStart((s) => (s + 1) % posts.length), 3600);
    return () => clearInterval(t);
  }, [inView, reduce, posts.length]);

  const visible = [0, 1, 2].map((i) => posts[(start + i) % posts.length]);
  const active = visible[0];
  const icons: IconName[] = Array.from(new Set(posts.map((p) => p.cover.icon))).slice(0, 9);
  const activeIdx = icons.indexOf(active.cover.icon);

  return (
    <div ref={ref} className="relative">
      <Stage field="lake" className="aspect-[5/5.2] w-full sm:aspect-[5/4]">
        <div className="pointer-events-none absolute inset-0 bg-chart-dark opacity-70" />

        {/* precision icon lattice */}
        <div className="absolute left-[6%] top-[8%] hidden grid-cols-3 gap-3 sm:grid" aria-hidden="true">
          {icons.map((name, i) => (
            <motion.span
              key={name}
              className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.04] text-paper"
              animate={{ opacity: i === activeIdx ? 1 : 0.35, scale: i === activeIdx ? 1.08 : 1 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <PrecisionIcon name={name} className="h-6 w-6" />
            </motion.span>
          ))}
        </div>

        {/* card stack */}
        <div className="absolute inset-x-[6%] bottom-[7%] sm:inset-x-auto sm:right-[6%] sm:w-[62%]">
          <div className="relative aspect-[4/4.1] w-full">
            <AnimatePresence initial={false}>
              {visible
                .map((p, depth) => (
                  <motion.article
                    key={p.slug}
                    className="ui-card absolute inset-x-0 bottom-0 overflow-hidden p-0"
                    style={{ zIndex: 3 - depth, transformOrigin: "50% 0%" }}
                    initial={{ opacity: 0, y: -40, scale: 0.88 }}
                    animate={{ opacity: depth === 0 ? 1 : depth === 1 ? 0.75 : 0.45, y: -depth * 22, scale: 1 - depth * 0.05 }}
                    exit={{ opacity: 0, y: 60, rotate: -3, transition: { duration: 0.7, ease: EASE } }}
                    transition={{ duration: 0.9, ease: EASE }}
                    aria-hidden={depth !== 0}
                  >
                    <BlogCover post={p} size="sm" showLabel={false} className="aspect-[16/8]" sizes="360px" />
                    <div className="p-4 md:p-5">
                      <p className="t-ui text-[10px] text-ink/55">
                        {p.category} · {p.readingTime} min read
                      </p>
                      <p className="mt-2 line-clamp-2 font-display text-[16px] font-semibold leading-[1.25] tracking-[-0.01em] text-ink md:text-[18px]">{p.title}</p>
                      <div className="mt-3 flex items-center justify-between text-[12px] text-ink/55">
                        <span>{p.author.name}</span>
                        <span>{formatDate(p.date)}</span>
                      </div>
                    </div>
                  </motion.article>
                ))
                .reverse()}
            </AnimatePresence>
          </div>
        </div>

        {/* progress ticks */}
        <div className="absolute bottom-[3%] left-[6%] hidden gap-1.5 sm:flex" aria-hidden="true">
          {posts.map((p, i) => (
            <span key={p.slug} className="h-[3px] w-5 overflow-hidden rounded-full bg-white/15">
              <motion.span className="block h-full bg-paper" animate={{ width: i === start ? "100%" : "0%" }} transition={{ duration: i === start ? 3.4 : 0.3, ease: "linear" }} />
            </span>
          ))}
        </div>
      </Stage>
    </div>
  );
}
