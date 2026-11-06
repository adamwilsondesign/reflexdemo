"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Cursor, RX_EASE, useTimeline } from "@/components/visual/kit";
import { formatDate, type BlogPost } from "@/lib/blog";
import { BlogCover } from "@/app/blog/_components/BlogCover";

/**
 * Blog — the editorial desk.
 * Composition: a topic selection list (radio-style, one selected) beside an
 * article card. The cursor picks a topic and the card turns to that topic's
 * latest piece.
 */
const ORDER = ["Perspectives", "Product", "Research"] as const;

// per topic: 0 read · 1 move · 2 press
const STEP = [3200, 900, 420];

export function BlogShelf({ posts }: { posts: BlogPost[] }) {
  const topics = ORDER.map((c) => ({ c, list: posts.filter((x) => x.category === c) })).filter((t) => t.list.length);
  const n = Math.max(1, topics.length);
  const { p, ref } = useTimeline(Array.from({ length: n }, () => STEP).flat(), { still: 0 });
  const i = Math.floor(p / 3) % n;
  const ph = p % 3;
  const next = (i + 1) % n;
  const sel = ph === 2 ? next : i;
  const shown = topics[i] ?? { c: "Perspectives", list: posts };
  const post = shown.list[0] ?? posts[0];
  const rowY = (k: number) => 167 + k * 46;
  const cursor = ph === 0 ? { x: 120, y: rowY(i) + 4, visible: false } : { x: 140, y: rowY(next), visible: true };

  if (!post) return null;

  return (
    <div ref={ref}>
      <Canvas w={560} h={420} focusX={0.5}>
        {/* topic list */}
        <div className="rx-card absolute left-[24px] top-[70px] w-[196px] p-1.5 pb-2">
          <p className="px-2.5 pb-2 pt-2 text-[11px] font-medium text-[var(--rx-3)]">Topics</p>
          <div className="relative h-[34px] px-2.5 text-[12.5px] text-[var(--rx-2)]">
            <span className="flex h-full items-center justify-between">All articles<span className="rx-num text-[10.5px] text-[var(--rx-3)]">{posts.length}</span></span>
          </div>
          {topics.map((t, k) => (
            <div key={t.c} className="relative mt-1 h-[42px]">
              {sel === k && <motion.span layoutId="blog-topic" className="absolute inset-0 rounded-[9px] bg-[var(--rx-well)]" transition={{ duration: 0.45, ease: RX_EASE }} />}
              <span className="relative flex h-full items-center gap-2.5 px-2.5">
                <span className={clsx("grid h-[15px] w-[15px] place-items-center rounded-full transition-shadow duration-300", sel === k ? "shadow-[inset_0_0_0_4.5px_#3e5368]" : "shadow-[inset_0_0_0_1.3px_rgba(23,25,28,.22)]")} />
                <span className={clsx("flex-1 text-[12.5px]", sel === k ? "font-medium" : "text-[var(--rx-2)]")}>{t.c}</span>
                <span className="rx-num text-[10.5px] text-[var(--rx-3)]">{t.list.length}</span>
              </span>
            </div>
          ))}
        </div>

        {/* article card */}
        <div className="absolute left-[232px] top-[26px] h-[380px] w-[310px]">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.article
              key={post.slug}
              className="rx-card rx-card-lift absolute inset-x-0 top-0 overflow-hidden"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
              transition={{ duration: 0.7, ease: RX_EASE }}
            >
              <BlogCover post={post} size="sm" className="h-[196px]" sizes="340px" />
              <div className="p-5">
                <p className="text-[11px] text-[var(--rx-3)]">{post.category} · <span className="rx-num">{post.readingTime}</span> min read</p>
                <p className="rx-serif mt-1.5 line-clamp-3 text-[19px] leading-[25px]">{post.title}</p>
                <div className="mt-4 flex items-center justify-between border-t border-[var(--rx-line)] pt-3 text-[11.5px] text-[var(--rx-2)]">
                  <span>{post.author.name}</span>
                  <span className="text-[var(--rx-3)]">{formatDate(post.date)}</span>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
        <Cursor {...cursor} press={ph === 2} />
      </Canvas>
    </div>
  );
}
