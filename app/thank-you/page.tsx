import { CTABand } from "@/components/ui/Blocks";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Button } from "@/components/ui/Button";
import { FeatureGrid } from "@/components/ui/Blocks";
import { LinkRowsBlock } from "@/components/ui/Layouts";
import { Stage } from "@/components/product/ui";
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
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/platform" variant="primary" arrow cta="thanks-platform">
              Explore the platform
            </Button>
            <Button href="/blog" variant="secondary">
              Read the blog
            </Button>
          </div>
        }
        visual={
          <Stage field="lake" className="p-4 sm:p-8 md:p-10">
            <div className="mx-auto max-w-[480px]">
              <NextSteps interests={interests} />
            </div>
          </Stage>
        }
      />

      <Section surface="pine">
        <div className="container-x">
          <SectionHeader
            align="split"
            title="A product specialist who knows the workflow."
            lead="Your walkthrough is led by a Reflexivity product specialist. They’ll run your question live in Alfred and the Knowledge Graph, open the sources behind each answer, and leave time for your team’s questions."
          />
          <Reveal className="mt-16 md:mt-20">
            <h3 className="t-h3">How to prepare (optional)</h3>
          </Reveal>
          <FeatureGrid items={PREP} cols={3} onDark className="mt-8" />
          <Reveal delay={0.2}>
            <p className="t-small mt-6 text-paper/65">Nothing to hand? That&rsquo;s fine. We&rsquo;ll bring a worked example.</p>
          </Reveal>
        </div>
      </Section>

      <Section surface="paper">
        <div className="container-x">
          <LinkRowsBlock
            title="Explore what you’ll see in the walkthrough."
            lead="A few places to start, if you’d like context before the call."
            rows={[
              { label: "How Reflexivity fits together", href: "/platform", note: "Alfred, the Knowledge Graph, Insights and integrated data in one environment." },
              { label: "See how markets connect", href: "/knowledge-graph", note: "The relationship layer underneath every answer, including the non-obvious links." },
              { label: "Meet your AI analyst", href: "/alfred", note: "Ask a research question and get a cited answer you can inspect and re-run." },
              { label: "Better Sharpe Ratio is a plumbing problem", href: "/blog/the-sharpe-ratio", note: "Jan Szilagyi on why returns depend on how many times you can afford to place a bet." },
            ]}
          />
        </div>
      </Section>

      <CTABand
        title="Running diligence in parallel?"
        lead="Share our security overview and deployment options with your team now, so the review keeps pace with the evaluation."
        note={null}
        actions={
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/security" variant="light" arrow cta="thanks-security">
              Review Security
            </Button>
            <Button href="/deployment" variant="outline-light">
              Explore Deployment Options
            </Button>
          </div>
        }
      />
    </>
  );
}
