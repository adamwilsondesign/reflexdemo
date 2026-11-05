import Link from "next/link";
import clsx from "clsx";
import { Section, SectionHeader, type Surface } from "@/components/ui/Section";
import { AutoTabs } from "@/components/ui/AutoTabs";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow, DemoActions } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PrecisionIcon } from "@/components/ui/PrecisionIcon";
import { OutputCard } from "./OutputCard";
import type { Audience } from "./data";

export function AudienceSection({
  a,
  surface,
  field,
  quote,
  className,
}: {
  a: Audience;
  surface: Surface;
  field: "lake" | "pine" | "mist" | "ink";
  quote?: { quote: string; name: string; org: string };
  className?: string;
}) {
  const dark = surface === "lake" || surface === "ink" || surface === "graphite" || surface === "pine";
  const muted = dark ? "text-paper/65" : "text-ink/65";
  const rule = dark ? "border-white/12" : "border-ink/12";

  return (
    <Section id={a.id} surface={surface} className={clsx("scroll-mt-[var(--header-h)] overflow-hidden", className)}>
      {dark && <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-40" />}
      <div className="container-x">
        <SectionHeader
          eyebrow={
            <Eyebrow trail={[{ label: "Solutions" }, { label: a.name }]} />
          }
          title={a.hero}
          align="split"
          lead={a.lead}
        />

        <div className="mt-14 md:mt-20">
          <p className={clsx("t-ui mb-2", dark ? "text-paper/50" : "text-ink/50")}>Workflows</p>
          <AutoTabs
            onDark={dark}
            interval={7000}
            items={a.workflows.map((w) => ({
              title: w.title,
              body: (
                <span className="block space-y-2.5">
                  <span className="block">
                    <span className={clsx("t-ui mr-2", dark ? "text-paper/45" : "text-ink/45")}>Problem</span>
                    {w.problem}
                  </span>
                  <span className="block">
                    <span className={clsx("t-ui mr-2", dark ? "text-paper/45" : "text-ink/45")}>Reflexivity</span>
                    {w.action}
                  </span>
                  <span className="block">
                    <span className={clsx("t-ui mr-2", dark ? "text-paper/45" : "text-ink/45")}>Output</span>
                    {w.output}
                  </span>
                </span>
              ),
              visual: <OutputCard spec={{ ...w.spec, field: w.spec.field ?? field }} />,
            }))}
          />
        </div>

        <div className={clsx("mt-20 grid gap-10 border-t pt-12 md:mt-28 lg:grid-cols-12 lg:gap-16", rule)}>
          <Reveal className="lg:col-span-6">
            <p className={clsx("t-ui", dark ? "text-paper/50" : "text-ink/50")}>Why {a.name}</p>
            <p className="mt-5 font-display text-[22px] font-medium leading-[1.3] tracking-[-0.015em] md:text-[28px]">{a.why.title}</p>
            <p className={clsx("t-body mt-5 max-w-[560px]", muted)}>{a.why.body}</p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {a.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group inline-flex items-center gap-2 font-display text-[15px] font-medium">
                    <span className="link-underline">{l.label}</span> <Arrow />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-6">
            <div className={clsx("flex h-full flex-col rounded-[16px] p-6 md:p-9", dark ? "bg-white/[0.06] ring-1 ring-white/10" : "bg-white ring-1 ring-ink/8")}>
              {quote ? (
                <figure className={clsx("mb-8 border-b pb-8", rule)}>
                  <blockquote className="font-display text-[18px] font-medium leading-[1.45] tracking-[-0.01em] md:text-[20px]">&ldquo;{quote.quote}&rdquo;</blockquote>
                  <figcaption className={clsx("mt-5 text-[14px]", muted)}>
                    <span className="font-display font-semibold opacity-100">{quote.name}</span> · {quote.org}
                  </figcaption>
                </figure>
              ) : (
                <PrecisionIcon name={a.icon} className={clsx("mb-8 h-10 w-10", dark ? "text-paper" : "text-ink")} />
              )}
              <h3 className="t-h3">{a.cta.title}</h3>
              <p className={clsx("t-body mt-3", muted)}>{a.cta.body}</p>
              <DemoActions onDark={dark} secondary={a.cta.secondary} cta={`customers-${a.id}`} className="mt-8" />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
