"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

/** Sticky in-page navigation for the deployment options, with the active section highlighted. */
export function AnchorNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Deployment options" data-tone="light" className="sticky top-[var(--header-h)] z-30 border-y border-ink/10 bg-paper/90 backdrop-blur-md">
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
