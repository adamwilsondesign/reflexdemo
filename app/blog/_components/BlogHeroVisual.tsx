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

        {/* precision icon lattice: the active article's icon lights up */}
        <div className="absolute left-[6%] top-[9%] hidden sm:block" aria-hidden="true">
          <div className="grid grid-cols-3 gap-2.5">
            {icons.map((name, i) => (
              <motion.span
                key={name}
                className="flex h-14 w-14 items-center justify-center rounded-[12px] border text-paper"
                animate={{
                  opacity: i === activeIdx ? 1 : 0.4,
                  backgroundColor: i === activeIdx ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.03)",
                  borderColor: i === activeIdx ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.08)",
                }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <span className="flex">
                  <PrecisionIcon name={name} className="h-7 w-7" />
                </span>
              </motion.span>
            ))}
          </div>
          <div className="mt-6 w-[188px] border-t border-white/15 pt-4">
            <p className="t-ui text-[10px] text-paper/50">Now reading</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={active.slug}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mt-2 font-mono text-[11px] uppercase leading-[1.5] tracking-[0.04em] text-paper/80"
              >
                {active.category} · {active.author.name}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* card stack */}
        <div className="absolute inset-x-[6%] bottom-[9%] sm:inset-x-auto sm:right-[6%] sm:w-[52%]">
          <div className="relative h-[300px] w-full md:h-[310px]">
            <AnimatePresence initial={false}>
              {visible
                .map((p, depth) => (
                  <motion.article
                    key={p.slug}
                    className="ui-card pui absolute inset-x-0 bottom-0 overflow-hidden p-0"
                    style={{ zIndex: 3 - depth, transformOrigin: "50% 0%" }}
                    initial={{ opacity: 0, y: -60, scale: 0.86 }}
                    animate={{ opacity: depth === 0 ? 1 : 0, y: -depth * 14, scale: 1 - depth * 0.04 }}
                    exit={{ opacity: 0, y: 70, transition: { duration: 0.7, ease: EASE } }}
                    transition={{ duration: 0.9, ease: EASE }}
                    aria-hidden={depth !== 0}
                  >
                    <BlogCover post={p} size="sm" className="h-[150px]" sizes="380px" />
                    <div className="p-4">
                      <p className="text-[12px] text-[#8f8f8f]">
                        {p.category} · {p.readingTime} min read
                      </p>
                      <p className="mt-1 line-clamp-2 min-h-[2.5em] text-[16px] font-semibold leading-[1.3] text-[#0d0d0d]">{p.title}</p>
                      <div className="mt-2 flex items-center justify-between border-t border-black/10 pt-2 text-[12px] text-[#5d5d5d]">
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
