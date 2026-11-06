import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitFeature, TextLink } from "@/components/ui/Layouts";
import { CTABand, FeatureGrid } from "@/components/ui/Blocks";
import { CountUp } from "@/components/ui/CountUp";
import { IllustrativeNote } from "../_components/Shared";
import { ThemeConstituents } from "./_components/ThemeConstituents";
import { ThemePage } from "./_components/ThemePage";

export const metadata: Metadata = {
  title: "Thematic Exposure",
  description:
    "Build, validate, and maintain thematic universes with evidence-backed exposure mapping, including the less obvious companies benefiting from a market trend.",
};

const STATS = [
  { to: 40, suffix: "K", label: "Securities mapped" },
  { to: 600, suffix: "K", label: "Evidence-backed relationships" },
  { to: 47, suffix: "", label: "Global markets" },
  { to: 900, suffix: "", label: "Ready-made themes" },
];

export default function ThematicExposurePage() {
  return (
    <>
      <PageHero
        trail={[{ label: "Use Cases", href: "/use-cases" }, { label: "Thematic Exposure" }]}
        title="Find the names you’re missing."
        lead="Build, validate, and maintain thematic universes with evidence-backed exposure mapping, including the less obvious companies benefiting from a market trend."
        cta="te-hero"
        visual={<ThemeConstituents />}
      />

      {/* Thesis to constituents */}
      <Section surface="lake">
        <div className="container-x">
          <SectionHeader
            align="split"
            title="From investment thesis to constituent list, faster."
            lead="Explore 900+ ready-made themes, or trace the connections behind your own investment thesis."
          />
          <FeatureGrid
            onDark
            cols={4}
            className="mt-16"
            items={[
              { icon: "stack", title: "Build faster.", body: "Identify the companies behind emerging themes and build your research universe faster." },
              { icon: "triad", title: "Find hidden exposures.", body: "Trace second-order relationships across companies, products, and markets." },
              { icon: "path", title: "Validate your thesis.", body: "See how strongly each company is exposed, with cited evidence to back it up." },
              { icon: "eye", title: "Stay current.", body: "Track catalysts that strengthen or weaken thematic exposure." },
            ]}
          />
        </div>
      </Section>

      {/* Theme page */}
      <SplitFeature
        surface="pine"
        title="See what’s driving the theme."
        lead="Explore performance, the events shaping market sentiment, and related financial and macro themes, all in one view."
        visual={
          <div className="flex min-h-full flex-col justify-center">
            <ThemePage />
            <IllustrativeNote onDark className="mt-4 text-center">Illustrative AI infrastructure theme page.</IllustrativeNote>
          </div>
        }
      />

      {/* Coverage */}
      <Section surface="paper">
        <div className="container-x grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <SectionHeader
              className="lg:max-w-none!"
              title="Broader coverage built for stronger conviction."
              lead="A global investment universe spanning companies, markets, and hundreds of thousands of mapped, weighted relationship exposures."
            />
            <Reveal delay={0.2} className="mt-8">
              <TextLink href="/book-a-demo">Request a Demo</TextLink>
            </Reveal>
          </div>
          <Stagger as="ul" className="col-span-12 grid grid-cols-2 gap-x-8 lg:col-span-6 lg:col-start-7">
            {STATS.map((st) => (
              <StaggerItem as="li" key={st.label} className="border-t border-ink/15 pb-8 pt-6">
                <div className="font-display text-[32px] font-semibold leading-10 tracking-[-0.025em] md:text-[40px] md:leading-[48px]">
                  {st.label === "Global markets" ? "" : "+"}
                  <CountUp to={st.to} suffix={st.suffix} />
                </div>
                <p className="t-ui mt-2 text-ink/60">{st.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <CTABand title="See what’s missing from your thematic universe." cta="te-final" />
    </>
  );
}
