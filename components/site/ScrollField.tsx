"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Scroll colour swap (market cartography).
 * One fixed colour layer sits behind the page. As each colour block reaches the middle
 * of the viewport, the layer fades to that block's colour, so the whole background
 * swaps with a short fade instead of snapping. Blocks keep their own colour for first
 * paint / no-JS; once mounted, `html.js-field` makes block backgrounds transparent.
 * Content in blocks whose tone (light/dark) doesn't match the current colour recedes,
 * so text never sits at low contrast mid-swap.
 */
export function ScrollField() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current!;
    const root = document.documentElement;
    let raf = 0;
    let current = "";
    let blocks: HTMLElement[] = [];

    const collect = () => {
      blocks = Array.from(document.querySelectorAll<HTMLElement>("[data-bg]")).filter((n) => !n.parentElement?.closest("[data-bg]"));
    };

    const update = (instant = false) => {
      raf = 0;
      const line = window.innerHeight * 0.5;
      let active = blocks[0];
      for (const b of blocks) {
        if (b.getBoundingClientRect().top <= line) active = b;
        else break;
      }
      if (!active) return;
      const color = active.dataset.bg || "#f4f3f1";
      const tone = active.dataset.tone || "light";
      if (color !== current) {
        current = color;
        if (instant) {
          el.style.transition = "none";
          el.style.backgroundColor = color;
          void el.offsetHeight;
          el.style.transition = "";
        } else el.style.backgroundColor = color;
      }
      for (const b of blocks) {
        const dim = (b.dataset.tone || "light") !== tone;
        if (dim) b.setAttribute("data-dim", "");
        else b.removeAttribute("data-dim");
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => update());
    };

    collect();
    update(true);
    root.classList.add("js-field");
    const mo = new MutationObserver(() => {
      collect();
      onScroll();
    });
    mo.observe(document.getElementById("main") ?? document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      blocks.forEach((b) => b.removeAttribute("data-dim"));
    };
  }, [pathname]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-paper transition-[background-color] duration-[700ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
    />
  );
}
