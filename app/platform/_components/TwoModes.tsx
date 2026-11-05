import clsx from "clsx";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Layouts";

/**
 * Two modes on a dotted rule (the TwoWays pattern), without its own headline,
 * so it can sit under a split SectionHeader.
 */
export function TwoModes({ items, onDark = false }: { items: { title: string; body: string; href: string; link: string }[]; onDark?: boolean }) {
  return (
    <div className="relative mt-14 md:mt-20">
      <Reveal className="relative hidden h-px md:block">
        <span className={clsx("absolute inset-0", onDark ? "bg-white/25" : "bg-ink/20")} />
        {items.map((_, i) => (
          <span key={i} className={clsx("absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full", onDark ? "bg-paper" : "bg-ink")} style={{ left: `${(i / items.length) * 100}%` }} />
        ))}
      </Reveal>
      <Stagger className="grid gap-12 md:mt-10 md:grid-cols-2 md:gap-16">
        {items.map((it) => (
          <StaggerItem key={it.title} className={clsx("border-t pt-6 md:border-t-0 md:pt-0", onDark ? "border-white/20" : "border-ink/15")}>
            <h3 className="t-h2">{it.title}</h3>
            <p className={clsx("t-body mt-3 max-w-[460px]", onDark ? "text-paper/72" : "text-ink/70")}>{it.body}</p>
            <TextLink href={it.href} className="mt-7">{it.link}</TextLink>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
