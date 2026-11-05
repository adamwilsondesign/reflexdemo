import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Button } from "@/components/ui/Button";
import { LinkCard } from "@/components/ui/Blocks";
import { PrecisionIcon } from "@/components/ui/PrecisionIcon";
import { Stage } from "@/components/product/ui";
import { PropagationField } from "@/components/graphics/RippleRings";
import { INTERESTS } from "../book-a-demo/_components/options";
import { NextSteps } from "./_components/NextSteps";

export const metadata: Metadata = {
  title: "Demo request received",
  description: "Thanks for requesting a Reflexivity demo. Here’s what happens next, who you’ll meet, and how to prepare.",
  robots: { index: false, follow: true },
};

function cleanName(raw?: string | string[]) {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (!v) return "";
  const s = v.replace(/[^\p{L}\p{M}' .-]/gu, "").replace(/\s+/g, " ").trim().slice(0, 40);
  return s;
}

function cleanInterests(raw?: string | string[]) {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (!v) return [];
  const allowed = INTERESTS as readonly string[];
  return v.split(",").map((x) => x.trim()).filter((x) => allowed.includes(x)).slice(0, 8);
}

function listPhrase(items: string[]) {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

const PREP = [
  { icon: "crosshair" as const, title: "A question you’re working on", body: "A thesis to pressure-test, an event you’re tracking, or a theme you want to map." },
  { icon: "stack" as const, title: "A watchlist, if you have one", body: "Public tickers are plenty. You don’t need to share confidential holdings." },
  { icon: "triad" as const, title: "The right people", body: "Invite whoever would use it day to day: PMs, analysts, risk, or your technology team." },
];

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const name = cleanName(sp.name);
  const interests = cleanInterests(sp.interest);
  const focus = interests.length ? ` focused on ${listPhrase(interests)}` : "";

  return (
    <>
      <PageHero
        trail={[{ label: "Request a Demo", href: "/book-a-demo" }, { label: "Confirmation" }]}
        title={name ? `Thanks, ${name}.` : "Thanks for your request."}
        lead={
          <p>
            Your demo request is in. We&rsquo;ll follow up within one business day to schedule a walkthrough{focus}, shaped around how you work.
          </p>
        }
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/platform" variant="primary" arrow cta="thanks-platform">
              Explore the platform
            </Button>
            <Button href="/blog" variant="secondary">
              Read the blog
            </Button>
          </div>
        }
        visual={
          <Stage field="lake" className="p-3 sm:p-8 md:p-10">
            <div className="mx-auto max-w-[480px]">
              <NextSteps interests={interests} />
            </div>
          </Stage>
        }
      />

      <Section surface="lake" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-60" />
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Who you’ll meet"
              title="A product specialist who knows the workflow."
              lead="Your walkthrough is led by a Reflexivity product specialist. They’ll run your question live in Alfred and the Knowledge Graph, open the sources behind each answer, and leave time for your team’s questions."
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <h3 className="t-ui text-paper/55">How to prepare (optional)</h3>
            </Reveal>
            <Stagger as="ul" className="mt-5 grid gap-px overflow-hidden rounded-[14px] bg-white/10">
              {PREP.map((p) => (
                <StaggerItem key={p.title} as="li" className="flex gap-5 bg-lake-900 p-6 md:p-7">
                  <PrecisionIcon name={p.icon} className="h-9 w-9 shrink-0 text-lake-300" />
                  <div>
                    <p className="t-h3">{p.title}</p>
                    <p className="t-body mt-1.5 text-paper/70">{p.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2}>
              <p className="t-small mt-5 text-paper/55">Nothing to hand? That&rsquo;s fine. We&rsquo;ll bring a worked example.</p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section surface="paper">
        <div className="container-x">
          <SectionHeader eyebrow="While you wait" title="Explore what you’ll see in the walkthrough." align="split" lead="A few places to start, if you’d like context before the call." />
          <Stagger className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
            <StaggerItem className="h-full">
              <LinkCard href="/platform" icon="stack" eyebrow="Platform" title="How Reflexivity fits together" body="Alfred, the Knowledge Graph, Insights and integrated data in one environment." />
            </StaggerItem>
            <StaggerItem className="h-full">
              <LinkCard href="/knowledge-graph" icon="rings" eyebrow="Knowledge Graph" title="See how markets connect" body="The relationship layer underneath every answer, including the non-obvious links." />
            </StaggerItem>
            <StaggerItem className="h-full">
              <LinkCard href="/alfred" icon="lattice" eyebrow="Alfred" title="Meet your AI analyst" body="Ask a research question and get a cited answer you can inspect and re-run." />
            </StaggerItem>
            <StaggerItem className="h-full">
              <LinkCard href="/blog/the-sharpe-ratio" icon="signal" eyebrow="From the blog" title="Better Sharpe Ratio is a plumbing problem" body="Jan Szilagyi on why returns depend on how many times you can afford to place a bet." />
            </StaggerItem>
          </Stagger>
        </div>
      </Section>

      <Section surface="ink" className="overflow-hidden" tight>
        <div className="pointer-events-none absolute inset-0 -z-10 field-ink" />
        <div className="pointer-events-none absolute inset-y-0 right-[-20%] -z-10 w-[120%] opacity-70 md:right-[-10%] md:w-[80%]">
          <PropagationField />
        </div>
        <div className="container-x py-10 md:py-16">
          <div className="max-w-[760px]">
            <SplitText text="Running diligence in parallel?" className="t-h1" />
            <Reveal delay={0.15}>
              <p className="t-lead mt-6 max-w-[560px] text-paper/70">
                Share our security overview and deployment options with your team now, so the review keeps pace with the evaluation.
              </p>
            </Reveal>
            <Reveal delay={0.25} className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="/security" variant="light" arrow cta="thanks-security">
                Review Security
              </Button>
              <Button href="/deployment" variant="outline-light">
                Explore Deployment Options
              </Button>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
