"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import type { LegalBlock, LegalDoc } from "@/lib/legal";

const LINK_RE = /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|https?:\/\/[^\s)]+)/g;

/** Renders text verbatim, turning email addresses and URLs into links. */
export function Linkify({ text }: { text: string }) {
  const parts = text.split(LINK_RE);
  return (
    <>
      {parts.map((p, i) => {
        if (i % 2 === 0) return <Fragment key={i}>{p}</Fragment>;
        const isUrl = p.startsWith("http");
        const trail = isUrl ? (p.match(/[.,;:]+$/)?.[0] ?? "") : "";
        const href = trail ? p.slice(0, -trail.length) : p;
        return (
          <Fragment key={i}>
            <a
              href={isUrl ? href : `mailto:${href}`}
              className="break-words text-ink underline decoration-ink/30 underline-offset-[3px] transition-colors hover:decoration-ink"
              {...(isUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {href}
            </a>
            {trail}
          </Fragment>
        );
      })}
    </>
  );
}

type Heading = Extract<LegalBlock, { id: string }>;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 104;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: { offset?: number; immediate?: boolean }) => void } }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -(header + 24), immediate: reduce });
  else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
  // Move focus for keyboard and screen-reader users without a second jump.
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

export function LegalDocument({ doc, children }: { doc: LegalDoc; children?: React.ReactNode }) {
  const toc = useMemo(() => doc.blocks.filter((b): b is Heading => b.type === "h2"), [doc]);
  const [active, setActive] = useState(toc[0]?.id ?? "");

  useEffect(() => {
    const els = toc.map((t) => document.getElementById(t.id)).filter((x): x is HTMLElement => !!x);
    let raf = 0;
    // Active = the last section heading that has passed a line ~30% down the viewport.
    const read = () => {
      raf = 0;
      const line = window.innerHeight * 0.3;
      let current = els[0]?.id ?? "";
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
        else break;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [toc]);

  const onTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActive(id);
    scrollToId(id);
  };

  const TocList = ({ mobile = false }: { mobile?: boolean }) => (
    <ol className={clsx("relative", !mobile && "border-l border-ink/10")}>
      {toc.map((t) => {
        const on = active === t.id;
        return (
          <li key={t.id}>
            <a
              href={`#${t.id}`}
              onClick={(e) => {
                onTocClick(e, t.id);
                if (mobile) (e.currentTarget.closest("details") as HTMLDetailsElement | null)?.removeAttribute("open");
              }}
              aria-current={on ? "location" : undefined}
              className={clsx(
                "relative block py-[7px] text-[14px] leading-snug transition-colors duration-300",
                mobile ? "border-t border-ink/8 py-3" : "-ml-px border-l pl-4",
                !mobile && (on ? "border-ink font-medium text-ink" : "border-transparent text-ink/55 hover:text-ink"),
                mobile && (on ? "font-medium text-ink" : "text-ink/65"),
              )}
            >
              {t.text}
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
      <aside className="lg:col-span-3">
        {/* Mobile / tablet: collapsible */}
        <details className="group rounded-[12px] border border-ink/12 bg-white/60 lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 [&::-webkit-details-marker]:hidden">
            <span className="t-ui text-ink/70">On this page · {toc.length} sections</span>
            <svg viewBox="0 0 12 8" className="h-2 w-3 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M1 1.5l5 5 5-5" />
            </svg>
          </summary>
          <nav aria-label="Table of contents" className="px-5 pb-2">
            <TocList mobile />
          </nav>
        </details>

        {/* Desktop: sticky */}
        <nav aria-label="Table of contents" className="hidden lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:block">
          <p className="t-ui mb-4 text-ink/45">On this page</p>
          <div className="max-h-[calc(100vh-var(--header-h)-120px)] overflow-y-auto pr-2 no-scrollbar" data-lenis-prevent>
            <TocList />
          </div>
        </nav>
      </aside>

      <article className="min-w-0 lg:col-span-8 lg:col-start-5">
        <div className="max-w-[720px]">
          {doc.subtitle && <p className="t-ui mb-8 text-ink/55">{doc.subtitle}</p>}
          {doc.blocks.map((b, i) => (
            <Block key={i} b={b} first={i === 0} />
          ))}
          {children}
        </div>
      </article>
    </div>
  );
}

function Anchor({ id, label }: { id: string; label: string }) {
  return (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToId(id);
      }}
      aria-label={`Link to section: ${label}`}
      className="ml-2 inline-block align-middle font-mono text-[0.7em] text-ink/30 opacity-0 transition-opacity hover:text-ink focus-visible:opacity-100 group-hover/h:opacity-100"
    >
      #
    </a>
  );
}

function Block({ b, first }: { b: LegalBlock; first: boolean }) {
  switch (b.type) {
    case "h2":
      return (
        <h2 id={b.id} className={clsx("group/h scroll-mt-[calc(var(--header-h)+24px)] font-display text-[26px] font-semibold leading-tight tracking-[-0.02em] text-ink focus:outline-none md:text-[30px]", first ? "mt-0" : "mt-16 border-t border-ink/10 pt-12")}>
          {b.text}
          <Anchor id={b.id} label={b.text} />
        </h2>
      );
    case "h3":
      return (
        <h3 id={b.id} className="group/h mt-10 scroll-mt-[calc(var(--header-h)+24px)] font-display text-[20px] font-semibold leading-snug tracking-[-0.01em] text-ink focus:outline-none">
          {b.text}
          <Anchor id={b.id} label={b.text} />
        </h3>
      );
    case "h4":
      return (
        <h4 id={b.id} className="group/h mt-8 scroll-mt-[calc(var(--header-h)+24px)] font-mono text-[12.5px] font-medium uppercase tracking-[0.06em] text-ink/70 focus:outline-none">
          {b.text}
          <Anchor id={b.id} label={b.text} />
        </h4>
      );
    case "p":
      return (
        <p className={clsx("mt-5 text-[16.5px] leading-[1.75] text-ink/80", first && "mt-0 text-[18px] text-ink/85")}>
          <Linkify text={b.text} />
        </p>
      );
    case "ul":
      return (
        <ul className="mt-5 space-y-3 pl-1">
          {b.items.map((it, i) => (
            <li key={i} className="relative pl-6 text-[16.5px] leading-[1.75] text-ink/80">
              <span className="absolute left-0 top-[0.8em] h-[5px] w-[5px] rounded-full bg-lake-500" aria-hidden="true" />
              <Linkify text={it} />
            </li>
          ))}
        </ul>
      );
  }
}
