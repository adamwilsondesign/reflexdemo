import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Arrow, Button } from "@/components/ui/Button";
import { CTABand, FeatureGrid } from "@/components/ui/Blocks";
import { SplitText } from "@/components/ui/SplitText";
import { PrecisionIcon } from "@/components/ui/PrecisionIcon";
import { TeamNetwork } from "./_components/TeamNetwork";
import { OpenRoles } from "./_components/OpenRoles";
import { CAREERS_EMAIL, applyHref } from "./_components/roles";

export const metadata: Metadata = {
  title: "Careers: Help Build the Future of Finance",
  description:
    "Join Reflexivity’s distributed team in New York and London. Open roles across engineering, machine learning and product, unlimited PTO with PTO³, and a clear way to apply.",
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
    body: "Unlimited paid time off, and an incentive to actually take it. We call it PTO³.",
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
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Button href="#roles" arrow cta="careers-hero">
              See open roles
            </Button>
            <Button href="#apply" variant="secondary">
              How to apply
            </Button>
          </div>
        }
        visual={<TeamNetwork />}
      />

      {/* Culture statement */}
      <Section surface="lake" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-50" />
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="t-ui text-paper/60">How we work</p>
          </Reveal>
          <div className="lg:col-span-8">
            <SplitText
              text="We’re big on trust, and low on ego. We want people who want to build a category-defining company."
              className="font-display text-[30px] font-medium leading-[1.2] tracking-[-0.02em] md:text-[44px]"
            />
            <Reveal delay={0.2}>
              <p className="t-lead mt-8 max-w-[640px] text-paper/70">
                Reflexivity is built by people who have run money, led product at research companies and shipped systems institutions depend on. The work is hard in the right ways: messy data, real users with high standards, and outputs that have to stand up to a portfolio manager’s questions.
              </p>
              <Link href="/about" className="group mt-8 inline-flex items-center gap-2 font-display text-[15px] font-medium">
                <span className="link-underline">Meet the leadership team</span> <Arrow />
              </Link>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* PTO³ */}
      <Section surface="paper">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[18px] bg-ink p-8 text-paper md:p-12">
              <div className="pointer-events-none absolute inset-0 field-ink" />
              <p className="t-ui relative text-paper/55">Benefit</p>
              <p className="relative mt-6 font-display text-[96px] font-semibold leading-none tracking-[-0.04em] md:text-[132px]">
                PTO<sup className="align-super text-[0.45em]">3</sup>
              </p>
              <dl className="relative mt-10 grid grid-cols-2 gap-6 border-t border-white/12 pt-6">
                <div>
                  <dt className="t-ui text-paper/50">Cash</dt>
                  <dd className="mt-2 font-display text-[32px] font-semibold tracking-[-0.02em]">$2,000</dd>
                </div>
                <div>
                  <dt className="t-ui text-paper/50">Or stock options</dt>
                  <dd className="mt-2 font-display text-[32px] font-semibold tracking-[-0.02em]">$10,000</dd>
                </div>
              </dl>
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="Time away"
              title="We’ll give you $2,000 to actually use your unlimited paid time off."
              lead="Paid time off? Unlimited PTO? Paid, unlimited PTO? We call it PTO³: get $2,000 in cash, or $10,000 in stock options, when you take real, sustained time away from work."
            />
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section surface="mist" className="border-t border-ink/8">
        <div className="container-x">
          <SectionHeader eyebrow="Our values" title="What it’s like to work here." align="split" lead="Four things we hold each other to, from the first week onward." />
          <FeatureGrid items={VALUES} cols={4} className="mt-14 md:mt-20" />
        </div>
      </Section>

      {/* Open roles */}
      <Section surface="paper" id="roles" className="scroll-mt-[var(--header-h)]">
        <div className="container-x">
          <SectionHeader
            eyebrow="Open roles"
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
      <Section surface="paper" id="apply" bare className="scroll-mt-[var(--header-h)] pb-20 md:pb-28">
        <div className="container-x grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[18px] bg-lake-900 p-7 text-paper md:p-10">
              <div className="pointer-events-none absolute inset-0 bg-chart-dark opacity-60" />
              <PrecisionIcon name="star" className="relative h-11 w-11" />
              <h2 className="t-h2 relative mt-10">Don’t see your role?</h2>
              <p className="t-body relative mt-4 max-w-[520px] text-paper/70">
                We’re always interested in exceptional people who care about markets, data and well-made software. Tell us what you’d build here.
              </p>
              <div className="relative mt-8">
                <Button href={applyHref("General application")} variant="light" arrow cta="careers-general">
                  Send a general application
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="flex h-full flex-col rounded-[18px] border border-ink/10 bg-white p-7 md:p-10">
              <p className="t-ui text-ink/50">How to apply</p>
              <Stagger as="ol" className="mt-6 space-y-5">
                {[
                  ["Choose a role", "Or send a general application if nothing fits yet."],
                  ["Email us", "Include your CV or LinkedIn, and links to work you’re proud of."],
                  ["Add a short note", "What you want to build, and why Reflexivity."],
                ].map(([t, b], i) => (
                  <StaggerItem key={t} as="li" className="flex gap-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink/20 font-mono text-[11px] text-ink/60">{i + 1}</span>
                    <span>
                      <span className="block font-display text-[16px] font-semibold">{t}</span>
                      <span className="t-small mt-1 block text-ink/60">{b}</span>
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
              <p className="mt-auto border-t border-ink/10 pt-6 text-[14px] text-ink/60">
                Applications go to{" "}
                <a href={`mailto:${CAREERS_EMAIL}`} className="link-underline font-medium text-ink">
                  {CAREERS_EMAIL}
                </a>
              </p>
            </div>
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
