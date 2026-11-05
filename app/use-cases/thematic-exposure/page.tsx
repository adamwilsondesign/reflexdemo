import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Button";
import { CTABand, FeatureGrid } from "@/components/ui/Blocks";
import { CountUp } from "@/components/ui/CountUp";
import { Audiences, Contrast, IllustrativeNote, RelatedUseCases } from "../_components/Shared";
import { VennRings } from "../_components/LineArt";
import { ThemeRadar } from "./_components/ThemeRadar";
import { DirectionToggle } from "./_components/DirectionToggle";
import { ConstituentExplorer } from "./_components/ConstituentExplorer";

export const metadata: Metadata = {
  title: "Thematic Exposure",
  description:
    "Find every company a theme moves, including the ones no headline will name. Build, validate and maintain thematic universes with evidence-backed exposure mapping from the Reflexivity Knowledge Graph.",
};

const STATS = [
  { to: 40000, suffix: "+", label: "Securities mapped" },
  { to: 600000, suffix: "+", label: "Evidence-backed relationships" },
  { to: 47, suffix: "", label: "Global markets" },
  { to: 900, suffix: "+", label: "Ready-made themes" },
];

export default function ThematicExposurePage() {
  return (
    <>
      <PageHero
        trail={[{ label: "Use Cases", href: "/use-cases" }, { label: "Thematic Exposure" }]}
        title="Find the names you’re missing."
        lead="Find every company a theme moves, including the ones no headline will name. Build, validate and maintain thematic universes with evidence-backed exposure mapping."
        secondary={{ label: "Explore the Knowledge Graph", href: "/knowledge-graph" }}
        cta="te-hero"
        visual={<ThemeRadar />}
      />

      {/* The old workflow */}
      <Section surface="mist" className="border-t border-ink/8">
        <div className="container-x">
          <SectionHeader
            eyebrow="The old workflow"
            title="Implicit model knowledge is not a map."
            maxW="max-w-[860px]"
            lead="A strong model can name related companies. It cannot give a stable, evidence-backed map that means the same thing on Tuesday as on Monday."
          />
          <Contrast
            className="mt-14 md:mt-16"
            before={{
              label: "Sector codes and general models",
              items: [
                "Most market data is categorised by sector, so hidden correlations stay unmapped.",
                "Ask twice and get two different lists, with no evidence behind either.",
                "The obvious names are found; suppliers and second-order exposures are missed.",
                "Every exposure reads as a beneficiary, even when the theme is a risk.",
              ],
            }}
            after={{
              label: "With the Knowledge Graph",
              items: [
                "A persistent map of relationships across companies, products, themes and markets.",
                "Exposure strength for each name, with the evidence behind it.",
                "Less-obvious and second-order names surfaced alongside the core.",
                "Beneficiaries and risks labelled as such.",
              ],
            }}
          />
        </div>
      </Section>

      {/* How Reflexivity does it */}
      <Section surface="paper">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="How Reflexivity does it"
              title="Theme to company is not company to theme."
              lead="Whether a theme matters to a company is not the same as whether that company is a tradable expression of the theme. Eligibility and evidence sit behind the baskets desks actually want."
            />
            <Reveal delay={0.2} className="mt-8">
              <Link href="/knowledge-graph" className="group inline-flex items-center gap-2 font-display text-[15px] font-medium">
                <span className="link-underline">Methodology: how the Graph scores exposure</span> <Arrow />
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <DirectionToggle />
          </Reveal>
        </div>
      </Section>

      {/* How teams use it */}
      <Section surface="lake" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-50" />
        <div className="container-x">
          <SectionHeader
            eyebrow="How teams use it"
            title="A relationship layer on top of your data."
            align="split"
            lead="The Graph unlocks a new class of relationship models for the thematic work teams already do."
          />
          <FeatureGrid
            onDark
            cols={4}
            className="mt-14 md:mt-16"
            items={[
              { icon: "path", title: "Launch faster", body: "Go from a narrative to a constituent list, starting from 900+ ready-made themes or your own thesis." },
              { icon: "triad", title: "Miss fewer names", body: "Trace second-order exposure across suppliers, products and markets, not just the headline names." },
              { icon: "eye", title: "Back up your pick", body: "See how strongly each company is exposed, with the cited evidence behind each relationship." },
              { icon: "signal", title: "Stay current", body: "Track the catalysts that strengthen or weaken thematic exposure as they happen.", href: "/insights", linkLabel: "See Insights" },
            ]}
          />
        </div>
      </Section>

      {/* Worked example */}
      <Section surface="mist">
        <div className="container-x">
          <SectionHeader
            eyebrow="Worked example"
            title="A theme everyone thinks they know."
            align="split"
            lead="Industrial Automation: the obvious robot makers, the suppliers inside the robots, and the names exposed as a risk. Select a company to inspect its rationale."
          />
          <div className="mt-14 md:mt-16">
            <ConstituentExplorer />
          </div>
          <IllustrativeNote className="mt-6 max-w-[820px]">
            Based on Reflexivity’s Industrial Automation theme overview; a subset of constituents is shown. Exposure scores and breakdowns are for illustration, and evidence is summarised from the cited source types.
          </IllustrativeNote>
        </div>
      </Section>

      {/* Numbers */}
      <Section surface="lake" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-40" />
        <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="Coverage" title="Broader coverage, stronger conviction." lead="A global investment universe spanning securities, markets, and hundreds of thousands of mapped relationships." />
            <Stagger className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] bg-white/10">
              {STATS.map((st) => (
                <StaggerItem key={st.label} className="bg-lake-900 p-6 md:p-8">
                  <div className="font-display text-[34px] font-semibold leading-none tracking-[-0.03em] sm:text-[44px] xl:text-[56px]">
                    <CountUp to={st.to} suffix={st.suffix} />
                  </div>
                  <p className="t-ui mt-4 text-paper/60">{st.label}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal delay={0.15} className="hidden lg:col-span-5 lg:block">
            <div className="mx-auto aspect-[560/580] max-w-[440px] text-paper/70">
              <VennRings />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Who it is for */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader eyebrow="Who it’s for" title="For teams that build and defend thematic universes." align="split" lead="From a PM’s idea list to an index desk’s basket, with the evidence to back each name." />
          <div className="mt-14 md:mt-16">
            <Audiences
              items={[
                { name: "Hedge Funds", body: "Find the second-order names before the theme is crowded, and size them with evidence.", href: "/customers#hedge-funds" },
                { name: "Asset Managers", body: "Build and maintain thematic products with constituent lists you can explain.", href: "/customers#asset-managers" },
                { name: "Financial Institutions", body: "Power baskets, indices and research products with the Graph through API or feeds.", href: "/customers#financial-institutions" },
                { name: "Wealth Managers", body: "Show clients which holdings a theme really touches, beyond the fund label.", href: "/customers#wealth-managers" },
              ]}
            />
          </div>
          <div className="mt-20 md:mt-28">
            <RelatedUseCases current="thematic-exposure" />
          </div>
        </div>
      </Section>

      <CTABand
        title="See what’s missing from your thematic universe."
        lead="Talk to us about an integration, or book a demo and bring a theme you already cover."
        secondary={{ label: "Talk to us about an integration", href: "/contact" }}
        cta="te-final"
      />
    </>
  );
}
