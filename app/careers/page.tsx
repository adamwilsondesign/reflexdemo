import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/Layouts";
import { CTABand, FeatureGrid } from "@/components/ui/Blocks";
import { SplitText } from "@/components/ui/SplitText";
import { TeamNetwork } from "./_components/TeamNetwork";
import { OpenRoles } from "./_components/OpenRoles";
import { CAREERS_EMAIL, applyHref } from "./_components/roles";

export const metadata: Metadata = {
  title: "Careers: Help Build the Future of Finance",
  description:
    "Join Reflexivity’s distributed team in New York and London. Open roles across engineering, machine learning and product, unlimited paid time off with an incentive to take it, and a clear way to apply.",
};

const VALUES = [
  {
    icon: "triad" as const,
    title: "Trust",
    body: "Our team members hail from all over the world and are trusted to do their best work from wherever they are, with offices in New York, London and Tokyo.",
  },
  {
    icon: "loop" as const,
    title: "Balance",
    body: "Unlimited paid time off, and an incentive to actually take it.",
  },
  {
    icon: "eye" as const,
    title: "Transparency",
    body: "You have a right to know what’s going on. Every week starts with a meeting with our CEO, President and CTO, where anyone can ask anything.",
  },
  {
    icon: "petals" as const,
    title: "Fun",
    body: "When you work with the best people, teams are healthy and everyone gets to bring their whole selves to work. Just wait until your first full-team offsite in London.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        trail={[{ label: "Company" }, { label: "Careers" }]}
        title="Help build the future of finance."
        lead="Join a distributed team building the research infrastructure institutional investors rely on. Shape the future of investing, and your career, with technology at the edge of what’s possible."
        actions={null}
        visual={<TeamNetwork />}
      />

      {/* Culture statement */}
      <Section surface="lake">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SplitText
            text="We’re big on trust and low on ego, and we’re looking for people who want to build a category-defining company."
            className="t-h2"
          />
          <Reveal delay={0.2} className="lg:pt-2">
            <p className="t-lead text-paper/75">
              Reflexivity is built by people who have run money, led product at research companies and shipped systems institutions depend on. The work is hard in the right ways: messy data, real users with high standards, and outputs that have to stand up to a portfolio manager’s questions.
            </p>
            <TextLink href="/about" className="mt-8">Meet the leadership team</TextLink>
          </Reveal>
        </div>
      </Section>

      {/* PTO */}
      <Section surface="paper">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeader
            title="We’ll give you $2,000 to actually use your unlimited paid time off."
            lead="Paid time off? Unlimited PTO? Paid, unlimited PTO? Get $2,000 in cash, or $10,000 in stock options, when you take real, sustained time away from work."
            className="lg:max-w-none"
          />
          <Reveal delay={0.1} className="lg:pt-2">
            <p className="t-h1">PTO</p>
            <dl className="mt-8 grid grid-cols-2 border-t border-ink/15">
              <div className="border-b border-r border-ink/15 py-6 pr-6">
                <dt className="t-label text-ink/60">Cash</dt>
                <dd className="mt-2 font-display text-[32px] font-semibold leading-none tracking-[-0.02em] md:text-[38px]">$2,000</dd>
              </div>
              <div className="border-b border-ink/15 py-6 pl-6">
                <dt className="t-label text-ink/60">Or stock options</dt>
                <dd className="mt-2 font-display text-[32px] font-semibold leading-none tracking-[-0.02em] md:text-[38px]">$10,000</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section surface="pine">
        <div className="container-x">
          <SectionHeader title="What it’s like to work here." align="split" lead="Four things we hold each other to, from the first week onward." />
          <FeatureGrid items={VALUES} cols={4} onDark className="mt-14 md:mt-20" />
        </div>
      </Section>

      {/* Open roles */}
      <Section surface="paper" id="roles" className="scroll-mt-[var(--header-h)]">
        <div className="container-x">
          <SectionHeader
            title="Join a team of world-class colleagues."
            align="split"
            lead="Roles across engineering, machine learning and product in New York and London. Select a role to apply."
          />
          <Reveal className="mt-12 md:mt-16">
            <OpenRoles />
          </Reveal>
        </div>
      </Section>

      {/* Don't see your role + how to apply */}
      <Section surface="mist" id="apply" className="scroll-mt-[var(--header-h)]">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <SplitText text="Don’t see your role?" className="t-h2" />
            <Reveal delay={0.15}>
              <p className="t-lead mt-6 max-w-[480px] text-ink/72">
                We’re always interested in exceptional people who care about markets, data and well-made software. Tell us what you’d build here.
              </p>
              <div className="mt-8">
                <Button href={applyHref("General application")} arrow cta="careers-general">
                  Send a general application
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <h3 className="t-h3">How to apply</h3>
            <Stagger as="ol" className="mt-6 border-t border-ink/15">
              {[
                ["Choose a role", "Or send a general application if nothing fits yet."],
                ["Email us", "Include your CV or LinkedIn, and links to work you’re proud of."],
                ["Add a short note", "What you want to build, and why Reflexivity."],
              ].map(([t, b], i) => (
                <StaggerItem key={t} as="li" className="grid grid-cols-[40px_1fr] gap-x-4 border-b border-ink/15 py-6">
                  <span className="t-label text-ink/50">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-display text-[17px] font-semibold">{t}</span>
                    <span className="t-small mt-1 block text-ink/65">{b}</span>
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
            <p className="t-small mt-6 text-ink/65">
              Applications go to{" "}
              <a href={`mailto:${CAREERS_EMAIL}`} className="link-underline font-display font-medium text-ink">
                {CAREERS_EMAIL}
              </a>
            </p>
          </Reveal>
        </div>
      </Section>

      <CTABand
        title="See what this team has built."
        lead="Curious about the product you’d be working on? See Reflexivity on a real research question."
        secondary={{ label: "See open roles", href: "#roles" }}
        note={null}
        cta="careers-final"
      />
    </>
  );
}
