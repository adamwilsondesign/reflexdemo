"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitText } from "@/components/ui/SplitText";
import { formatDate, type BlogPost } from "@/lib/blog";
import { BlogCover } from "./BlogCover";
import { Initials } from "./PostCard";
import { ShareLinks } from "./ArticleChrome";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Article hero: breadcrumb, word-rise title, standfirst, byline, then the cover reveals with a clip wipe. */
export function ArticleHeader({ post }: { post: BlogPost }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section ref={ref} data-tone="light" data-bg="#f4f3f1" className="relative isolate overflow-hidden bg-paper pt-[calc(var(--header-h)+40px)] md:pt-[calc(var(--header-h)+72px)]">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-chart"
        style={{ maskImage: "radial-gradient(100% 60% at 20% 0%, #000 25%, transparent 70%)", WebkitMaskImage: "radial-gradient(100% 60% at 20% 0%, #000 25%, transparent 70%)" }}
      />
      <div className="container-x">
        <div className="max-w-[940px]">
          <motion.div {...fade(0.05)}>
            <Eyebrow trail={[{ label: "Resources" }, { label: "Blog", href: "/blog" }, { label: post.category }]} />
          </motion.div>
          <SplitText as="h1" text={post.title} trigger="mount" delay={0.1} stagger={0.04} className="t-h1 mt-6 text-balance lg:text-[clamp(2.5rem,1.4rem+2.6vw,3.75rem)]" />
          {post.dek && (
            <motion.p {...fade(0.4)} className="t-lead mt-6 max-w-[720px] text-ink/72">
              {post.dek}
            </motion.p>
          )}
          <motion.div {...fade(0.55)} className="mt-9 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-ink/12 pt-6">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <span className="flex items-center gap-3">
                <Initials name={post.author.name} className="h-10 w-10 bg-ink/[0.07] text-[13px]" />
                <span>
                  <span className="block font-display text-[15px] font-semibold">{post.author.name}</span>
                  {post.author.role && <span className="block font-display text-[13px] text-ink/55">{post.author.role}</span>}
                </span>
              </span>
              <dl className="flex gap-8 font-display text-[14px]">
                <div>
                  <dt className="t-ui text-[10.5px] text-ink/45">Published</dt>
                  <dd className="mt-0.5 text-ink/80">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </dd>
                </div>
                <div>
                  <dt className="t-ui text-[10.5px] text-ink/45">Reading time</dt>
                  <dd className="mt-0.5 text-ink/80">{post.readingTime} min</dd>
                </div>
              </dl>
            </div>
            <ShareLinks title={post.title} path={`/blog/${post.slug}`} />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="container-x mt-12 md:mt-16"
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.45 }}
      >
        <motion.div
          className="max-w-[940px] overflow-hidden rounded-[18px]"
          initial={reduce ? false : { clipPath: "inset(0 0 100% 0 round 18px)" }}
          animate={{ clipPath: "inset(0 0 0% 0 round 18px)" }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.5 }}
        >
          <BlogCover post={post} size="lg" priority className="aspect-[16/10] sm:aspect-[21/9]" sizes="(min-width:1024px) 940px, 100vw" />
        </motion.div>
      </motion.div>
    </section>
  );
}
