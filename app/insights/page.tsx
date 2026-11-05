import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { AutoTabs } from "@/components/ui/AutoTabs";
import { Button } from "@/components/ui/Button";
import { CTABand, FeatureGrid } from "@/components/ui/Blocks";
import { type IconName } from "@/components/ui/PrecisionIcon";
import { SplitFeature, TextLink } from "@/components/ui/Layouts";
import { BranchLines } from "@/components/graphics/Cartography";
import { InsightsHero } from "./_components/InsightsHero";
import { AnatomyDoc } from "./_components/AnatomyDoc";
import { SignalFilter } from "./_components/SignalFilter";
import { WhySurfaced } from "./_components/WhySurfaced";
import { SameEvent } from "./_components/SameEvent";
import { InsightToWork } from "./_components/InsightToWork";

export const metadata: Metadata = {
  title: "Insights | Always-on market intelligence for your coverage | Reflexivity",
  description:
    "Reflexivity Insights surface company and market catalysts, earnings previews and recaps, and historical pattern signals for the names and themes you follow, with the reason each one reached you.",
};

const ANATOMY = [
  { title: "Headline", body: "Each Insight opens with the catalyst, its direction and the theme it moves." },
  { title: "Top 5 takeaways", body: "The five points that matter most, each tagged to the themes it affects." },
  { title: "Graph ripple effects", body: "The Knowledge Graph ranks the companies connected to the catalyst by role, event link and what to watch." },
  { title: "Ask Alfred", body: "See which countries and regions are exposed, then ask Alfred follow-up questions about the cohort." },
];

const TYPES: { icon: IconName; name: string; question: string; body: string; example: string; note?: string }[] = [
  {
    icon: "atom",
    name: "Company Catalysts",
    question: "What just changed at a company I follow, and what does it mean for my holdings?",
    body: "Deals, leadership changes and market moves that affect the companies you follow, framed by what they mean for your holdings.",
    example: "Sanofi settles Regeneron dispute in expanded antibody pact",
  },
  {
    icon: "orbit",
    name: "Market Catalysts",
    question: "Which of my names does this macro, policy or thematic shift reach?",
    body: "See how macroeconomic shifts, policy changes, geopolitical events, and emerging themes affect companies across your coverage.",
    example: "AI data center power buildout accelerates",
  },
  {
    icon: "signal",
    name: "Earnings Insights",
    question: "What should I watch on the call, and what actually changed after it?",
    body: "Previews ahead of the call. Recaps shortly after it, covering key KPIs, management commentary, guidance, and peer implications.",
    example: "Guidance overshadowed a mixed Nike quarter",
  },
  {
    icon: "loop",
    name: "Scenario-Pattern Detection",
    question: "Has this setup appeared before, and what followed historically?",
    body: "Get alerted when historically backtested fundamental, macro, or technical conditions reappear, signaling potential price movements.",
    example: "Eli Lilly: recession probability at a new low",
    note: "Patterns describe what followed historically. They are not a forecast of future prices.",
  },
];

export default function InsightsPage() {
  return (
    <>
      <PageHero
        surface="lake"
        trail={[{ label: "Product" }, { label: "Insights" }]}
        title="Intelligence that arrives before you ask."
        lead="Insights surface relevant market developments, earnings intelligence, and second-order effects across the companies and themes you follow, each with the reason it reached you."
        secondary={{ label: "See portfolio monitoring", href: "/use-cases/portfolio-monitoring" }}
        cta="insights-hero"
        visual={<InsightsHero />}
      />

      {/* Alerts that signal what matters */}
      <Section surface="lake">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SplitText text="Alerts that signal what matters." className="t-h2" />
            <Reveal delay={0.15}>
              <p className="t-lead mt-5 text-paper/75">Key developments are surfaced as markets move, connecting events to their broader investment implications for your coverage universe. No waiting for a prompt. Insights do that work while you get on with yours.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 border-t border-white/12 pt-7">
                <h3 className="t-h3 text-paper">Chat answers questions. It does not watch the book.</h3>
                <p className="t-body mt-3 text-paper/65">
                  Insights appear in the platform&rsquo;s Insights feed and as alerts on the names and themes in your watchlist, so the morning read starts with what changed, not a blank prompt.
                </p>
                <TextLink href="/use-cases/portfolio-monitoring" className="mt-6 text-paper">How teams monitor a book with Insights</TextLink>
              </div>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <SignalFilter />
          </Reveal>
        </div>
      </Section>

      {/* Anatomy */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader
            title="What’s inside an Insight."
            align="split"
            lead={
              <>
                An Insight is a structured brief that turns an unstructured market development into what happened, what it touches, and what to ask next. Each one follows the same path, from the catalyst to its ripple effects, so you can read it fast and act on it.
              </>
            }
          />
          <div className="mt-14 md:mt-20">
            <AutoTabs
              interval={6000}
              items={ANATOMY.map((a, i) => ({
                title: a.title,
                body: a.body,
                visual: <AnatomyDoc step={i} />,
              }))}
            />
          </div>
          <Reveal>
            <p className="t-small mt-8 max-w-[640px] text-ink/50">
              Shown: a Market Catalyst on AI data center power, simplified for illustration. Earnings Insights add KPIs, management commentary and guidance to the same reading path.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Four Insight types */}
      <Section surface="pine">
        <div className="container-x">
          <SectionHeader
            title="Different signals. Deeper market intelligence."
            align="split"
            lead="Four distinct Insight types, from market catalysts to historical patterns. Each is built to answer a different question about your coverage."
          />
          <FeatureGrid
            onDark
            cols={2}
            className="mt-14 md:mt-20"
            items={TYPES.map((t) => ({
              icon: t.icon,
              title: t.name,
              body: (
                <>
                  <span className="t-body block italic text-paper/90">{t.question}</span>
                  <span className="mt-3 block">{t.body}</span>
                  {t.note && <span className="mt-3 block text-paper/55">{t.note}</span>}
                  <span className="ui-card mt-6 block px-4 py-3">
                    <span className="block text-[12px] text-[#8f8f8f]">Example insight</span>
                    <span className="mt-0.5 block text-[14px] font-medium text-[#0d0d0d]">{t.example}</span>
                  </span>
                </>
              ),
            }))}
          />
          <Reveal>
            <p className="t-small mt-6 text-paper/55">Preview and recap timing varies by company and event. We can confirm coverage for specific names in a demo.</p>
          </Reveal>
        </div>
      </Section>

      {/* Why surfaced */}
      <SplitFeature
        surface="paper"
        className="!pb-6 md:!pb-10"
        title="Every Insight says why it reached you."
        lead="Insights are matched to your coverage through the names you follow, their Knowledge Graph relationships and the themes you track. The why-surfaced line is never implicit."
        visual={
          <div className="mx-auto flex h-full w-full max-w-[440px] items-center">
            <BranchLines accent="#3e5c50" origin="Market event" branches={["On your watchlist", "Connected in the Graph", "Inside a theme you follow"]} />
          </div>
        }
      />
      <Section surface="paper" className="!pt-0">
        <div className="container-x">
          <WhySurfaced />
        </div>
      </Section>

      {/* Same event, different artifact */}
      <Section surface="ink">
        <div className="container-x">
          <SectionHeader
            title="One event. Read for the way you invest."
            align="center"
            lead="Personalisation is methodological, not cosmetic. An activist stake becomes a category read for a consumer PM and a deal-mechanics read for special situations. Both stay one click from source."
          />
          <div className="mt-14 md:mt-20">
            <SameEvent />
          </div>
        </div>
      </Section>

      {/* From insight to work */}
      <Section surface="lake">
        <div className="container-x">
          <SectionHeader
            title="Push mode meets build mode."
            align="split"
            lead="Any Insight can open in Alfred, refresh on a schedule, or live on a workspace, so a signal becomes research without starting over."
            actions={
              <div className="flex flex-wrap gap-3">
                <Button href="/alfred" variant="outline-light" arrow>
                  Meet Alfred
                </Button>
              </div>
            }
          />
          <Reveal className="mt-14 md:mt-20">
            <InsightToWork />
          </Reveal>
        </div>
      </Section>

      <CTABand
        title="See what Insights surface across your coverage."
        lead="Bring a watchlist or a theme you follow. We’ll show the Insights it would have surfaced, and why."
        secondary={{ label: "Explore the Knowledge Graph", href: "/knowledge-graph" }}
        cta="insights-final"
      />
    </>
  );
}
