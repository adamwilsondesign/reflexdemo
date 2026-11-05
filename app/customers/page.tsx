import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Arrow, Button } from "@/components/ui/Button";
import { PrecisionIcon } from "@/components/ui/PrecisionIcon";
import { CTABand, TESTIMONIALS, Testimonials } from "@/components/ui/Blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FirmRouter } from "./_components/FirmRouter";
import { AudienceSection } from "./_components/AudienceSection";
import { AUDIENCES, ROLES } from "./_components/data";

export const metadata: Metadata = {
  title: "Solutions by Firm: Hedge Funds, Institutions, Asset & Wealth Managers",
  description:
    "How hedge funds, financial institutions, asset managers and wealth managers use Reflexivity: the same Knowledge Graph, Alfred and Insights, framed around each firm’s workflows.",
};

const [HF, FI, AM, WM] = AUDIENCES;

export default function CustomersPage() {
  return (
    <>
      <PageHero
        trail={[{ label: "Solutions" }, { label: "By firm type" }]}
        title="One platform, set up around how your firm works."
        lead="Built for hedge funds, financial institutions, wealth teams and asset managers, with the same Knowledge Graph, Alfred and Insights framed around each one’s work."
        secondary={{ label: "Find your firm type", href: "#firms" }}
        cta="customers-hero"
        visual={<FirmRouter />}
      />

      {/* Audience grid */}
      <Section surface="paper" id="firms" className="scroll-mt-[var(--header-h)] border-t border-ink/8">
        <div className="container-x">
          <SectionHeader
            eyebrow="Who we work with"
            title="Four kinds of firm, one platform."
            align="split"
            lead="From a hedge fund’s book to a wealth team’s client note, here’s what Reflexivity does for each kind of firm."
          />
          <Stagger className="mt-14 grid gap-4 md:mt-16 lg:grid-cols-2">
            <StaggerItem className="lg:row-span-3">
              <Link
                href={`#${HF.id}`}
                className="group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[18px] bg-lake-900 p-7 text-paper transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1 md:p-10"
              >
                <div className="pointer-events-none absolute inset-0 bg-chart-dark opacity-60" />
                <div className="relative flex items-start justify-between">
                  <span className="t-ui rounded-full bg-white/10 px-3 py-1 text-paper/80">Our core audience</span>
                  <PrecisionIcon name={HF.icon} className="h-14 w-14 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:rotate-45" />
                </div>
                <h3 className="t-h1 relative mt-auto pt-16">{HF.name}</h3>
                <p className="t-lead relative mt-4 max-w-[520px] text-paper/75">{HF.card}</p>
                <ul className="relative mt-8 flex flex-wrap gap-2">
                  {HF.workflows.map((w) => (
                    <li key={w.title} className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.04em] text-paper/70">
                      {w.title}
                    </li>
                  ))}
                </ul>
                <span className="relative mt-8 flex items-center gap-2 font-display text-[15px] font-medium">
                  See the hedge fund workflow <Arrow />
                </span>
              </Link>
            </StaggerItem>
            {[FI, AM, WM].map((a) => (
              <StaggerItem key={a.id}>
                <Link
                  href={`#${a.id}`}
                  className="group flex h-full items-start gap-5 rounded-[16px] border border-ink/10 bg-white/60 p-6 transition-[border-color,background-color,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-ink/25 hover:bg-white md:p-7"
                >
                  <PrecisionIcon name={a.icon} className="h-10 w-10 shrink-0 text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[20deg]" />
                  <span className="block">
                    <span className="t-h3 block">{a.name}</span>
                    <span className="t-body mt-2 block text-ink/65">{a.card}</span>
                    <span className="mt-4 flex items-center gap-2 font-display text-[15px] font-medium">
                      See how it works <Arrow />
                    </span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Role routes */}
          <Reveal className="mt-16 md:mt-20">
            <p className="t-ui text-ink/50">Or start from your role</p>
            <ul className="mt-5 grid gap-px overflow-hidden rounded-[14px] bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
              {ROLES.map((r) => (
                <li key={r.role} className="bg-paper">
                  <Link href={r.href} className="group flex h-full flex-col p-5 transition-colors duration-300 hover:bg-white md:p-6">
                    <span className="font-display text-[16px] font-semibold">{r.role}</span>
                    <span className="t-small mt-1.5 text-ink/60">{r.body}</span>
                    <span className="mt-auto flex items-center gap-2 pt-4 font-display text-[14px] font-medium text-ink/80">
                      {r.link} <Arrow />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <AudienceSection a={HF} surface="lake" field="mist" quote={TESTIMONIALS[1]} />
      <AudienceSection a={FI} surface="paper" field="mist" />
      <AudienceSection a={AM} surface="mist" field="lake" className="border-t border-ink/8" />
      <AudienceSection a={WM} surface="paper" field="pine" />

      {/* Testimonials */}
      <Section surface="lake" id="testimonials">
        <div className="container-x">
          <Reveal>
            <Eyebrow className="mb-5 text-paper">In their words</Eyebrow>
          </Reveal>
          <Testimonials onDark items={[TESTIMONIALS[0]]} title="A daily tool for the modern portfolio manager." />
        </div>
      </Section>

      {/* Customer stories: reference conversation instead of placeholder case studies */}
      <Section surface="mist" id="customer-stories" className="scroll-mt-[var(--header-h)]">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Customer stories"
              title="Hear it from a firm like yours."
              lead="Named customer stories are being prepared with our clients’ approval. In the meantime, we can arrange a reference conversation with a firm whose work looks like yours."
            />
            <Reveal delay={0.2} className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact?topic=reference" arrow cta="customers-reference">
                Request a reference conversation
              </Button>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="t-small mt-5 max-w-[420px] text-ink/50">Reference calls are typically arranged after an initial demo, subject to the reference customer’s availability.</p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="t-ui text-ink/50">What a reference conversation covers</p>
            </Reveal>
            <Stagger as="ol" className="mt-5 grid gap-px overflow-hidden rounded-[16px] bg-ink/10 sm:grid-cols-2">
              {[
                { t: "The starting challenge", b: "What the team needed done, and what it was using before.", i: "crosshair" as const },
                { t: "The deployment choice", b: "Platform seats, an integration, or both, and why.", i: "knot" as const },
                { t: "The workflow", b: "How research, monitoring and review fit into the day.", i: "path" as const },
                { t: "The result", b: "What changed for the team, in their own words.", i: "star" as const },
              ].map((s) => (
                <StaggerItem key={s.t} as="li" className="bg-white p-6 md:p-8">
                  <PrecisionIcon name={s.i} className="h-9 w-9 text-ink" />
                  <h3 className="t-h3 mt-8">{s.t}</h3>
                  <p className="t-small mt-2 text-ink/65">{s.b}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      <CTABand
        title="See Reflexivity set up for your firm."
        lead="Bring your coverage, your book or a client question. We’ll show the workflow that fits how your firm works."
        secondary={{ label: "Discuss a partnership", href: "/contact?topic=partnerships" }}
        cta="customers-final"
      />
    </>
  );
}
