import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand, FeatureGrid, TESTIMONIALS, Testimonials } from "@/components/ui/Blocks";
import { TextLink } from "@/components/ui/Layouts";
import { IllustrativeNote } from "../_components/Shared";
import { MorningOpen } from "./_components/MorningOpen";
import { MorningBrief } from "./_components/MorningBrief";
import { RippleExample } from "./_components/RippleExample";

export const metadata: Metadata = {
  title: "Portfolio Monitoring",
  description:
    "Alfred monitors the companies and themes you follow, surfacing relevant catalysts, hidden exposures, and second-order implications, without waiting for you to ask.",
};

export default function PortfolioMonitoringPage() {
  return (
    <>
      <PageHero
        trail={[{ label: "Use Cases", href: "/use-cases" }, { label: "Portfolio Monitoring" }]}
        title="Stay ahead of what could move your book."
        lead="Alfred monitors the companies and themes you follow, surfacing relevant catalysts, hidden exposures, and second-order implications, without waiting for you to ask."
        cta="pm-hero"
        visual={<MorningOpen />}
      />

      {/* Morning read */}
      <Section surface="mist">
        <div className="container-x grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <SectionHeader
              className="lg:max-w-none!"
              title="Your morning read, already prepared."
              lead="Start each day with a personalized briefing on the companies and themes you follow. Key developments are waiting in your dashboard and daily brief, so you know where to focus your research."
            />
          </div>
          <Reveal delay={0.1} className="col-span-12 lg:col-span-6 lg:col-start-7">
            <MorningBrief />
          </Reveal>
        </div>
      </Section>

      {/* Signal to intelligence */}
      <Section surface="pine">
        <div className="container-x">
          <SectionHeader
            align="split"
            title="From market signal to actionable intelligence."
            lead="Every development reaches you in real time, framed for your watchlist. It arrives in a daily watchlist summary email, on the Alfred dashboard and as Insight alerts."
            actions={<TextLink href="/insights">See Insights</TextLink>}
          />
          <FeatureGrid
            onDark
            cols={4}
            className="mt-16"
            items={[
              { icon: "eye", title: "Detection", body: "Alfred identifies earnings, company developments, and broader market catalysts." },
              { icon: "triad", title: "Connected exposures", body: "The Knowledge Graph traces direct and second-order implications across companies and themes." },
              { icon: "stack", title: "Your coverage", body: "Relevant developments are surfaced as Insights and alerts based on the companies and themes you follow." },
              { icon: "rings", title: "Alfred is one click away", body: "Alfred is one click away when you want to work through what it means." },
            ]}
          />
        </div>
      </Section>

      {/* Worked example */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader align="split" title="See the ripple effects in action." lead="The headline only names the obvious. Here’s how Reflexivity takes it further." />
          <div className="mt-16">
            <RippleExample />
          </div>
          <IllustrativeNote className="mt-8">Illustrative example based on a Reflexivity Insight.</IllustrativeNote>
        </div>
      </Section>

      {/* Proof */}
      <Section surface="lake" tight>
        <div className="container-x">
          <Testimonials onDark items={[TESTIMONIALS[1]]} />
        </div>
      </Section>

      <CTABand title="Put your watchlists to the test." cta="pm-final" />
    </>
  );
}
