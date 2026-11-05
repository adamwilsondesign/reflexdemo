import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/Blocks";
import { PrecisionIcon } from "@/components/ui/PrecisionIcon";
import { DataSourceLogos } from "@/components/ui/LogoStrip";
import { CodeBlock, MissingData, SourceRow } from "@/components/product/ui";
import { AuditHero } from "./_components/AuditHero";
import { SourceToAnswer } from "./_components/SourceToAnswer";
import { EntityResolution } from "./_components/EntityResolution";

export const metadata: Metadata = {
  title: "Auditability & Data | Institutional data, cited analysis | Reflexivity",
  description:
    "Reflexivity reasons over natively integrated institutional data from LSEG, S&P Global, Dow Jones and more, cites its sources by default, flags missing data, and runs calculations in code your team can re-run.",
};

const DATA_MAP = [
  { type: "Market data & pricing", sources: "LSEG · Cboe · Nasdaq" },
  { type: "Company fundamentals & estimates", sources: "LSEG · S&P Global" },
  { type: "News & newswires", sources: "Dow Jones · MT Newswires · Benzinga" },
  { type: "Earnings calls & transcripts", sources: "Quartr" },
  { type: "Macro & economic series", sources: "FRED" },
];

const COMPARE = [
  { row: "Data", general: "Reasons over the documents and data you provide.", rfx: "Natively integrated institutional data, with no separate contract for core coverage." },
  { row: "Entities", general: "Your team matches names, tickers and identifiers.", rfx: "Resolves each company to a single entity across providers." },
  { row: "Sourcing", general: "Citations depend on what was supplied and how it was asked.", rfx: "Cited by default, linked back to the source." },
  { row: "Missing data", general: "Gaps can be filled in unless someone checks.", rfx: "Shows NA and flags the gap instead of estimating." },
  { row: "Calculations", general: "Figures need a separate check.", rfx: "Run in code that can be opened and re-run." },
  { row: "Continuity", general: "Each session starts from a new prompt.", rfx: "Insights, schedules and workspaces keep the workflow running." },
];

export default function AuditabilityPage() {
  return (
    <>
      <PageHero
        trail={[{ label: "Product" }, { label: "Auditability & Data" }]}
        title="Analysis an investment committee can use."
        lead="Institutional data, visible sourcing, and calculations that can be re-run, so your team can check the work and stand behind it."
        secondary={{ label: "See how sourcing works", href: "#source-to-answer" }}
        cta="audit-hero"
        visual={<AuditHero />}
      />

      {/* Institutional data */}
      <Section surface="lake" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-50" />
        <div className="container-x">
          <SectionHeader
            eyebrow="Institutional data"
            title="Built on institutional data, already connected."
            align="split"
            lead="Reflexivity reasons over natively integrated institutional data from the providers below. No separate data contract required for core coverage, so your team starts on the research, not the procurement."
          />
          <Reveal className="mt-14 rounded-[16px] border border-white/10 bg-white/[0.03] px-6 py-10 md:mt-20 md:px-10">
            <p className="t-ui mb-8 text-paper/50">Data and content sources</p>
            <DataSourceLogos onDark marquee={false} className="items-center" />
          </Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <h3 className="t-h3">Where each kind of data comes from</h3>
              <p className="t-body mt-3 text-paper/65">
                Quality starts with the feeds, not the model. Answers name the provider behind a figure, so a reviewer knows what they are looking at.
              </p>
              <p className="t-small mt-5 text-paper/45">
                Coverage varies by dataset, market and entitlement. We&rsquo;ll walk through what is included for your universe, and how your own research and connected sources sit alongside it.
              </p>
            </Reveal>
            <Stagger as="ul" className="lg:col-span-8">
              {DATA_MAP.map((d) => (
                <StaggerItem key={d.type} className="flex flex-col gap-1 border-t border-white/12 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 last:border-b">
                  <span className="font-display text-[17px] font-medium">{d.type}</span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.05em] text-paper/60">{d.sources}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      {/* Three trust rules */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader eyebrow="Three trust rules" maxW="max-w-[900px]" title="Cited by default. NA over guesswork. Code-backed calculations." lead="A simple mental model for what you can expect from analysis in Reflexivity, and where its limits are." />
          <Stagger className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3">
            <StaggerItem as="article" className="flex flex-col rounded-[16px] border border-ink/10 bg-white/60 p-6 md:p-7">
              <PrecisionIcon name="chain" className="h-10 w-10 text-ink" />
              <h3 className="t-h3 mt-8">Cited by default.</h3>
              <p className="t-body mt-2.5 text-ink/68">Answers link to the documents and data behind them, so a claim can be checked at its source.</p>
              <div className="mt-auto pt-7">
                <SourceRow n={1} title="Q4 earnings call transcript" meta="Transcript · Quartr · linked" />
              </div>
            </StaggerItem>
            <StaggerItem as="article" className="flex flex-col rounded-[16px] border border-ink/10 bg-white/60 p-6 md:p-7">
              <PrecisionIcon name="eye" className="h-10 w-10 text-ink" />
              <h3 className="t-h3 mt-8">NA over guesswork.</h3>
              <p className="t-body mt-2.5 text-ink/68">When data is missing, the answer shows NA rather than filling the gap with an estimate.</p>
              <div className="mt-auto pt-7">
                <MissingData />
              </div>
            </StaggerItem>
            <StaggerItem as="article" className="flex flex-col rounded-[16px] border border-ink/10 bg-white/60 p-6 md:p-7">
              <PrecisionIcon name="cube" className="h-10 w-10 text-ink" />
              <h3 className="t-h3 mt-8">Code-backed calculations.</h3>
              <p className="t-body mt-2.5 text-ink/68">Calculations run in code, so a figure can be opened, re-run and checked.</p>
              <div className="mt-auto pt-7">
                <CodeBlock lines={[`<span style="color:#8fa3b6">growth</span> = (210 - 142) / 142`, `<span style="color:#7d978c"># = 0.479</span>`]} />
              </div>
            </StaggerItem>
          </Stagger>

          <Reveal className="mt-6">
            <div className="grid gap-6 rounded-[16px] bg-mist-200/70 p-6 md:grid-cols-12 md:items-center md:p-8">
              <p className="font-display text-[20px] font-semibold leading-snug md:col-span-4 md:text-[22px]">Cited is not the same as independently verified.</p>
              <p className="t-body text-ink/70 md:col-span-8">
                A citation shows exactly where a figure came from, so a reviewer can check it quickly. It does not independently audit the underlying filing, feed or transcript, and it does not replace your team&rsquo;s judgment. These controls make the work easier to inspect and errors easier to catch; review still matters.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Source to answer */}
      <Section surface="ink" id="source-to-answer" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 field-ink" />
        <div className="container-x">
          <SectionHeader
            eyebrow="Source to answer"
            title="Follow a claim back to its source."
            align="split"
            lead="Analysis keeps its evidence attached, from the source document through the calculation to the final claim. A reviewer can open each step and see where a figure came from."
          />
          <div className="mt-20 md:mt-28">
            <SourceToAnswer />
          </div>
          <Reveal>
            <p className="t-small mt-12 max-w-[720px] text-paper/45">
              Illustrative figures. Depending on the provider, source links open the original document, a highlighted excerpt or the provider record. Calculations re-run against the same data, under your firm&rsquo;s entitlements.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Entity resolution */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader
            eyebrow="Entity resolution"
            title="When you say Apple, it knows which Apple."
            align="split"
            lead="The unglamorous layer sophisticated buyers ask about. When a user says Apple, the system knows which Apple, which provider to query, and how to reconcile disagreement."
          />
          <div className="mt-14 md:mt-20">
            <EntityResolution />
          </div>
        </div>
      </Section>

      {/* Versus a general workflow */}
      <Section surface="mist" className="border-t border-ink/8">
        <div className="container-x">
          <SectionHeader
            eyebrow="Versus a general workflow"
            title="A general model works with what you give it."
            align="split"
            lead="Reflexivity runs on leading models too. The difference is the layer around them: it maps entities, enforces sourcing, flags missing data, and keeps the workflow alive."
          />
          <Reveal className="mt-14 overflow-hidden rounded-[16px] border border-ink/10 bg-white md:mt-20">
            <table className="w-full text-left">
              <caption className="sr-only">General model workflow compared with Reflexivity</caption>
              <thead>
                <tr className="border-b border-ink/10">
                  <th scope="col" className="hidden w-[18%] px-6 py-5 md:table-cell"><span className="sr-only">Area</span></th>
                  <th scope="col" className="px-5 py-5 md:px-6">
                    <span className="t-ui text-ink/50">A general model</span>
                  </th>
                  <th scope="col" className="bg-lake-900 px-5 py-5 text-paper md:px-6">
                    <span className="t-ui text-paper/70">Reflexivity</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((c) => (
                  <tr key={c.row} className="border-b border-ink/8 last:border-0">
                    <th scope="row" className="hidden px-6 py-5 align-top font-display text-[15px] font-semibold md:table-cell">{c.row}</th>
                    <td className="px-5 py-5 align-top text-[14.5px] text-ink/65 md:px-6">
                      <span className="t-ui mb-1 block text-[10px] text-ink/40 md:hidden">{c.row}</span>
                      {c.general}
                    </td>
                    <td className="bg-lake-900 px-5 py-5 align-top text-[14.5px] text-paper md:px-6">
                      <span className="t-ui mb-1 block text-[10px] text-paper/40 md:hidden">{c.row}</span>
                      {c.rfx}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal className="mt-10 grid gap-4 md:grid-cols-2">
            <CrossLink href="/security" kicker="Security" title="Looking for how data is protected?" body="Isolation, encryption, permission-aware access and the security review process." />
            <CrossLink href="/alfred" kicker="Alfred" title="See auditability inside Alfred" body="How Alfred shows its sources, calculations and gaps in a real research workflow." />
          </Reveal>
        </div>
      </Section>

      <CTABand
        title="Review Reflexivity against data, audit, and research-control requirements."
        lead="Bring your diligence checklist. We’ll walk through data coverage, sourcing, calculations and controls for your use case."
        secondary={{ label: "Review security", href: "/security" }}
        cta="audit-final"
      />
    </>
  );
}

function CrossLink({ href, kicker, title, body }: { href: string; kicker: string; title: string; body: string }) {
  return (
    <Link href={href} className="group flex items-center justify-between gap-6 rounded-[14px] border border-ink/10 bg-white/60 p-6 transition-[border-color,background-color] duration-500 hover:border-ink/25 hover:bg-white">
      <span>
        <span className="t-ui block text-ink/50">{kicker}</span>
        <span className="t-h3 mt-2 block">{title}</span>
        <span className="t-small mt-1.5 block text-ink/60">{body}</span>
      </span>
      <Arrow className="shrink-0" />
    </Link>
  );
}
