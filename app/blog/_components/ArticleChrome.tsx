"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import clsx from "clsx";

/** Thin reading-progress bar pinned to the top of the viewport, tracking the article body. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const reduce = useReducedMotion();
  const progress = useMotionValue(0);
  const scaleX = useSpring(progress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height - vh * 0.4;
      const done = vh * 0.3 - r.top;
      progress.set(Math.min(1, Math.max(0, total > 0 ? done / total : 0)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetId, progress]);
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-lake-500" style={{ scaleX: reduce ? progress : scaleX }} />;
}

/** Sticky "On this page" list with the active section highlighted. */
export function Toc({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const onScroll = () => {
      const line = window.innerHeight * 0.3;
      let current = els[0].id;
      for (const e of els) if (e.getBoundingClientRect().top <= line) current = e.id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  if (!items.length) return null;
  return (
    <nav aria-label="On this page">
      <p className="t-ui text-ink/50">On this page</p>
      <ol className="mt-4 flex flex-col border-l border-ink/12">
        {items.map((i) => {
          const on = active === i.id;
          return (
            <li key={i.id} className="relative">
              {on && <motion.span layoutId="toc-marker" className="absolute -left-px top-0 h-full w-[2px] bg-ink" transition={{ type: "spring", stiffness: 400, damping: 40 }} />}
              <a
                href={`#${i.id}`}
                aria-current={on ? "location" : undefined}
                className={clsx("block py-1.5 pl-4 text-[13.5px] leading-[1.4] transition-colors duration-300", on ? "font-medium text-ink" : "text-ink/55 hover:text-ink")}
              >
                {i.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Copy link, LinkedIn, X. */
export function ShareLinks({ title, path, className, label = true }: { title: string; path: string; className?: string; label?: boolean }) {
  const [copied, setCopied] = useState(false);
  const url = `https://reflexivity.com${path}`;
  const btn =
    "flex h-9 w-9 items-center justify-center rounded-full border border-ink/12 text-ink/70 transition-[color,border-color,background-color] duration-300 hover:border-ink/30 hover:bg-white hover:text-ink";
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      {label && <span className="t-ui mr-1 text-ink/50">Share</span>}
      <button
        type="button"
        className={btn}
        aria-label={copied ? "Link copied" : "Copy link"}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(window.location.origin + path);
          } catch {
            /* clipboard unavailable */
          }
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        }}
      >
        {copied ? (
          <svg viewBox="0 0 16 16" className="h-4 w-4 text-pine-500" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M3 8.5l3 3 7-7" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M6.5 9.5l3-3M7 4.5l1.2-1.2a2.6 2.6 0 013.7 3.7L10.7 8.2M9 11.5l-1.2 1.2a2.6 2.6 0 01-3.7-3.7L5.3 7.8" strokeLinecap="round" />
          </svg>
        )}
      </button>
      <a className={btn} href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn (opens in a new tab)">
        <svg viewBox="0 0 16 16" className="h-[15px] w-[15px]" fill="currentColor" aria-hidden="true">
          <path d="M3.6 5.6H1.2V15h2.4V5.6zM2.4 1.2a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8zM15 9.7c0-2.5-.5-4.3-3.4-4.3-1.4 0-2.3.8-2.7 1.5V5.6H6.6V15H9v-4.6c0-1.2.2-2.4 1.8-2.4 1.5 0 1.5 1.4 1.5 2.5V15H15V9.7z" />
        </svg>
      </a>
      <a className={btn} href={`https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X (opens in a new tab)">
        <svg viewBox="0 0 16 16" className="h-[14px] w-[14px]" fill="currentColor" aria-hidden="true">
          <path d="M12.2 1.5h2.2L9.6 7l5.6 7.5h-4.4L7.4 10l-3.9 4.5H1.3l5.1-5.9L1 1.5h4.5l3.1 4.1 3.6-4.1zm-.8 11.7h1.2L4.7 2.7H3.4l8 10.5z" />
        </svg>
      </a>
      <span role="status" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
