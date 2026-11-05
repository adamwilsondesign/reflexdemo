"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

/** Sticky in-page navigation for the deployment options, with the active section highlighted. */
export function AnchorNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let cur: string | null = null;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= line) cur = it.id;
      }
      setActive(cur);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);

  return (
    <nav aria-label="Deployment options" data-tone="light" className="sticky top-[var(--header-live)] z-30 border-y border-ink/10 bg-paper/90 backdrop-blur-md">
      <div className="container-x">
        <ul className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto py-2.5">
          {items.map((it) => (
            <li key={it.id} className="shrink-0">
              <a
                href={`#${it.id}`}
                aria-current={active === it.id ? "true" : undefined}
                className={clsx(
                  "block rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.05em] transition-colors duration-300",
                  active === it.id ? "bg-ink text-paper" : "text-ink/60 hover:bg-ink/[0.06] hover:text-ink",
                )}
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
