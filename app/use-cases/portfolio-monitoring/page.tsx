import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand, FeatureGrid, TESTIMONIALS, Testimonials } from "@/components/ui/Blocks";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PrecisionIcon } from "@/components/ui/PrecisionIcon";
import { Stage } from "@/components/product/ui";
import { DailyBrief } from "@/components/product/visuals";
import { Audiences, Contrast, IllustrativeNote, RelatedUseCases } from "../_components/Shared";
import { MorningOpen } from "./_components/MorningOpen";
import { MorningWorkflow } from "./_components/MorningWorkflow";
import { RippleExample } from "./_components/RippleExample";

export const metadata: Metadata = {
  title: "Portfolio Monitoring | Reflexivity",
  description:
    "Watch the book without living in alert noise. Reflexivity surfaces catalysts, earnings and second-order read-throughs across the companies and themes you follow, with the reason each item reached you.",
};

const DELIVERY = [
  { name: "Daily brief", body: "A morning summary of what changed across your watchlist, by email and in Alfred." },
  { name: "Alfred dashboard", body: "Where you start: the latest developments and upcoming events for the names you follow." },
  { name: "Insight alerts", body: "Catalysts, earnings recaps and scenario patterns as they are detected, ranked for your coverage." },
];

export default function PortfolioMonitoringPage() {
  return (
    <>
      <PageHero
        trail={[{ label: "Use Cases", href: "/use-cases" }, { label: "Portfolio Monitoring" }]}
        title="Stay ahead of what could move your book."
        lead="Alfred monitors the companies and themes you follow, surfacing relevant catalysts, hidden exposures, and second-order implications, without waiting for you to ask."
        secondary={{ label: "See how Insights work", href: "/insights" }}
        cta="pm-hero"
        visual={<MorningOpen />}
      >
        <ul className="mt-10 flex max-w-[560px] flex-wrap gap-2 border-t border-ink/12 pt-6">
          {["Catalysts", "Anomalies", "Earnings", "Second-order read-throughs"].map((t) => (
            <li key={t} className="rounded-full border border-ink/12 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.04em] text-ink/65">{t}</li>
          ))}
          <li className="basis-full pt-2 text-[14px] text-ink/60">Each with an explicit reason it appeared.</li>
        </ul>
      </PageHero>

      {/* The old workflow */}
      <Section surface="mist" className="border-t border-ink/8">
        <div className="container-x">
          <SectionHeader
            eyebrow="The old workflow"
            title="Access to information is becoming easier. Understanding what matters is not."
            maxW="max-w-[900px]"
            lead="Terminals and news feeds tell you what moved. Analysts still stitch together who else is affected, and whether it matters."
          />
          <Contrast
            className="mt-14 md:mt-16"
            before={{
              label: "Feeds and terminals",
              items: [
                "Headlines name the obvious company, not its suppliers, customers or competitors.",
                "Read-throughs are pieced together by hand, name by name.",
                "Keyword alerts fire on everything, so the signal drowns in noise.",
                "Deciding whether it matters to your book happens after the open.",
              ],
            }}
            after={{
              label: "With Reflexivity",
              items: [
                "Detection finds the event: earnings, company developments and market catalysts.",
                "The Knowledge Graph maps how it transmits to connected companies and themes.",
                "Your watchlist decides why it is yours, and the Insight says so.",
                "Alfred is one click away when you want to work through what it means.",
              ],
            }}
          />
        </div>
      </Section>

      {/* How Reflexivity does it */}
      <Section surface="lake" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-50" />
        <div className="container-x">
          <SectionHeader eyebrow="How Reflexivity does it" title="From market signal to a reason to act." align="split" lead="Every development is framed for the companies and themes you follow, and arrives in your daily brief, on the Alfred dashboard and as Insight alerts." />
          <FeatureGrid
            onDark
            cols={4}
            className="mt-14 md:mt-16"
            items={[
              { icon: "signal", title: "Detection", body: "Alfred identifies earnings, company developments, and broader market catalysts." },
              { icon: "triad", title: "Connected exposures", body: "The Knowledge Graph traces direct and second-order implications across companies and themes.", href: "/knowledge-graph", linkLabel: "How the Graph works" },
              { icon: "eye", title: "Your coverage", body: "Developments are surfaced as Insights and alerts based on the companies and themes you follow." },
              { icon: "star", title: "Alfred, one click away", body: "Open any Insight in Alfred to ask follow-ups, compare names, or test the read.", href: "/alfred", linkLabel: "Meet Alfred" },
            ]}
          />
          <div className="mt-20 border-t border-white/12 pt-12 md:mt-28 md:pt-16">
            <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-12">
              <div>
                <Eyebrow className="text-paper">A morning, step by step</Eyebrow>
                <h3 className="t-h2 mt-4 max-w-[640px]">From a development to the follow-up, in minutes.</h3>
              </div>
              <IllustrativeNote onDark className="max-w-[340px]">Illustrative example of an earnings read-through on a watchlist name.</IllustrativeNote>
            </Reveal>
            <MorningWorkflow />
          </div>
        </div>
      </Section>

      {/* Morning read + watchlist vs holdings */}
      <Section surface="paper">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeader eyebrow="Your morning read" title="Already prepared when you sit down." lead="Start each day with a briefing on the companies and themes you follow, so you know where to focus your research." />
            <Reveal delay={0.1} className="mt-10">
              <dl className="divide-y divide-ink/10 border-y border-ink/10">
                {DELIVERY.map((d) => (
                  <div key={d.name} className="grid gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
                    <dt className="font-display text-[16px] font-semibold">{d.name}</dt>
                    <dd className="t-body text-ink/65">{d.body}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.2} className="mt-8">
              <div className="flex gap-4 rounded-[14px] border border-lake-300/50 bg-lake-100/50 p-5 md:p-6">
                <PrecisionIcon name="stack" className="mt-0.5 h-7 w-7 shrink-0 text-lake-700" />
                <div>
                  <h3 className="font-display text-[17px] font-semibold">Watchlist or holdings?</h3>
                  <p className="t-small mt-1.5 text-ink/70">
                    Monitoring runs on a watchlist: the companies and themes you choose to follow. Many teams mirror their holdings or coverage universe there. It doesn’t need a connection to your portfolio system or your position sizes to be useful from day one.{" "}
                    <Link href="/deployment" className="link-underline font-medium text-ink">Integration options</Link>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-6">
            <Stage field="lake" image="/figma/n915.png" className="p-5 sm:p-10">
              <div className="animate-float mx-auto max-w-[420px]">
                <DailyBrief />
              </div>
            </Stage>
            <IllustrativeNote className="mt-4">Daily brief layout shown with sample watchlist names.</IllustrativeNote>
          </Reveal>
        </div>
      </Section>

      {/* Worked example */}
      <Section surface="mist" className="border-t border-ink/8">
        <div className="container-x">
          <SectionHeader eyebrow="Worked example" title="See the ripple effects in action." lead="The headline only names the obvious. Here’s how Reflexivity takes one company catalyst further." />
          <div className="mt-12 md:mt-16">
            <RippleExample />
          </div>
          <IllustrativeNote className="mt-8">
            Based on a Reflexivity Insight; condensed for the page. Connected companies are a subset of the relationships the Graph returns.
          </IllustrativeNote>
        </div>
      </Section>

      {/* Proof */}
      <Section surface="lake" tight>
        <div className="container-x">
          <Testimonials onDark items={[TESTIMONIALS[1]]} />
        </div>
      </Section>

      {/* Who it is for */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader eyebrow="Who it’s for" title="Core for funds. Client-ready for wealth." align="split" lead="Hedge funds and asset managers watch the book with it. The same monitoring becomes client commentary for wealth teams." />
          <div className="mt-14 md:mt-16">
            <Audiences
              items={[
                { name: "Hedge Funds", body: "Catch the second-order move before it shows up in the P&L, with the reason it matters to your book.", href: "/customers#hedge-funds" },
                { name: "Asset Managers", body: "Cover more names without more alerts: one brief across the companies and themes your team follows.", href: "/customers#asset-managers" },
                { name: "Wealth Managers", body: "Turn overnight developments into commentary tied to the holdings clients actually ask about.", href: "/customers#wealth-managers" },
                { name: "Financial Institutions", body: "Deliver the same monitoring to clients inside platforms you already distribute.", href: "/customers#financial-institutions" },
              ]}
            />
          </div>
          <div className="mt-20 md:mt-28">
            <RelatedUseCases current="portfolio-monitoring" />
          </div>
        </div>
      </Section>

      <CTABand
        title="Put your watchlists to the test."
        lead="Show this against your book. Bring a watchlist and we’ll run a morning on it, or we’ll use a sample one."
        secondary={{ label: "See how Insights work", href: "/insights" }}
        cta="pm-final"
      />
    </>
  );
}
