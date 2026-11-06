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
import { AlertStack } from "./_components/AlertStack";
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

const TYPES: { icon: IconName; name: string; body: string }[] = [
  {
    icon: "atom",
    name: "Company Catalysts",
    body: "Deals, leadership changes and market moves at the companies you follow, framed by what they mean for your holdings.",
  },
  {
    icon: "orbit",
    name: "Market Catalysts",
    body: "Macro shifts, policy changes, geopolitical events and emerging themes, traced to the companies across your coverage.",
  },
  {
    icon: "signal",
    name: "Earnings Insights",
    body: "Previews before the call and recaps soon after, covering KPIs, management commentary, guidance and peer read-across.",
  },
  {
    icon: "loop",
    name: "Scenario-Pattern Detection",
    body: "Alerts when backtested fundamental, macro or technical conditions reappear, showing what followed before. Not a forecast.",
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
        cta="insights-hero"
        visual={<InsightsHero />}
      />

      {/* Alerts that signal what matters */}
      <Section surface="lake">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SplitText text="Alerts that signal what matters." className="t-h2" />
            <Reveal delay={0.15}>
              <p className="t-lead mt-6 text-paper/75">Key developments are surfaced as markets move, connecting events to their broader investment implications for your coverage universe. No waiting for a prompt. Insights do that work while you get on with yours.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 border-t border-white/12 pt-8">
                <h3 className="t-h3 text-paper">Chat answers questions. It does not watch the book.</h3>
                <p className="t-body mt-4 text-paper/65">
                  Insights appear in the platform&rsquo;s Insights feed and as alerts on the names and themes in your watchlist, so the morning read starts with what changed, not a blank prompt.
                </p>
                <TextLink href="/use-cases/portfolio-monitoring" className="mt-6 text-paper">How teams monitor a book with Insights</TextLink>
              </div>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <AlertStack />
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
            items={TYPES.map((t) => ({ icon: t.icon, title: t.name, body: t.body }))}
          />
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
              <div className="flex flex-wrap gap-4">
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
