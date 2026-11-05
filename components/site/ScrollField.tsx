"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Colour-block seams (market cartography). Every top-level block with `data-bg` keeps its
 * own solid colour; where two different colours meet, the incoming block's top padding
 * carries a gradient from the previous colour, so blocks melt into each other as you
 * scroll instead of meeting at a hard edge. Text never sits on a half-blended colour
 * because the blend lives entirely inside the padding.
 */
export function ScrollField() {
  const pathname = usePathname();

  useEffect(() => {
    const apply = () => {
      const blocks = Array.from(document.querySelectorAll<HTMLElement>("[data-bg]")).filter((n) => !n.parentElement?.closest("[data-bg]"));
      blocks.forEach((el, i) => {
        const prev = blocks[i - 1];
        const from = prev?.dataset.bg;
        const to = el.dataset.bg;
        const pad = parseFloat(getComputedStyle(el).paddingTop) || 0;
        const adjacent = prev && Math.abs(prev.getBoundingClientRect().bottom - el.getBoundingClientRect().top) < 2;
        if (from && to && from !== to && adjacent && pad >= 48) {
          el.style.setProperty("--seam-from", from);
          el.style.setProperty("--seam-to", to);
          el.style.setProperty("--seam-h", `${Math.round(Math.min(pad * 0.92, 220))}px`);
          el.setAttribute("data-seam", "");
        } else {
          el.removeAttribute("data-seam");
        }
      });
    };
    apply();
    const t = setTimeout(apply, 400);
    const ro = new ResizeObserver(() => apply());
    ro.observe(document.body);
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [pathname]);

  return null;
}
