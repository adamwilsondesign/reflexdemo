import { Button } from "@/components/ui/Button";
import { PrecisionIcon, type IconName } from "@/components/ui/PrecisionIcon";
import { Reveal } from "@/components/ui/Reveal";

type Cta = { title: string; body: string; href: string; label: string; icon: IconName; points: string[] };

const ALFRED: Cta = {
  title: "Put a question you’ve been sitting on to Alfred.",
  body: "Alfred, Reflexivity’s AI analyst, resolves the entities, pulls the data, runs the analysis in code and shows its sources, so you can check the method before you use the answer.",
  href: "/alfred",
  label: "Meet Alfred",
  icon: "triad",
  points: ["Cited by default", "Flags missing data", "Re-runnable analysis"],
};

const CTAS: Record<string, Cta> = {
  "mcp-from-protocol-to-product": {
    title: "Bring Reflexivity into your own stack through MCP.",
    body: "Entity resolution, the Knowledge Graph and Alfred’s analysis, exposed to the AI systems and tools your team already runs.",
    href: "/deployment#api-mcp",
    label: "See API and MCP access",
    icon: "chain",
    points: ["Entity resolution", "Knowledge Graph", "Monitoring feeds"],
  },
  "introducing-earnings-insights": {
    title: "See Earnings Insights on your own coverage.",
    body: "Previews before the print and recaps after it, tied to the KPIs, themes and peers that matter for the names you follow.",
    href: "/insights",
    label: "Explore Insights",
    icon: "signal",
    points: ["Previews and recaps", "Peer impact", "Attributed quotes"],
  },
  "can-ai-help-investors-with-questions-not-just-answers": {
    title: "Let the questions come to you.",
    body: "Insights watches the names and themes you follow and surfaces developments, and their knock-on effects, before you think to ask.",
    href: "/insights",
    label: "Explore Insights",
    icon: "signal",
    points: ["Always-on monitoring", "Ripple effects", "Sourced alerts"],
  },
  "the-sharpe-ratio": {
    title: "Make the next question a query, not a project.",
    body: "The Knowledge Graph maps how companies, products, suppliers and themes connect, so a hunch about a relationship can be tested in minutes.",
    href: "/knowledge-graph",
    label: "How the Knowledge Graph works",
    icon: "rings",
    points: ["Relationships as data", "Hidden exposures", "Connected sources"],
  },
  "the-alchemy-of-finance": {
    title: "From “here’s the data” to “here’s the evidence.”",
    body: "The Knowledge Graph links institutional datasets so Alfred can connect the dots and show which source supports each step.",
    href: "/knowledge-graph",
    label: "How the Knowledge Graph works",
    icon: "rings",
    points: ["Linked datasets", "Relationship intelligence", "Inspectable sources"],
  },
  "the-model-upgrade-problem": {
    title: "Analysis you can re-run, whatever the model underneath.",
    body: "See how Reflexivity keeps outputs cited, sourced and re-runnable, and why each component is re-validated when the models underneath change.",
    href: "/alfred#trust",
    label: "See auditability and data",
    icon: "stack",
    points: ["Cited outputs", "Execution trace", "Re-runnable"],
  },
  "how-do-you-make-ai-predictable-without-making-it-dumb": {
    title: "Reliability you can inspect.",
    body: "Every answer carries its sources and execution path, and the system says where it hit a limit instead of guessing.",
    href: "/alfred#trust",
    label: "See auditability and data",
    icon: "pentagon",
    points: ["Flags missing data", "Execution trace", "Structured evaluations"],
  },
  "what-if-ai-made-humans-more-essential": {
    title: "More time for clients, less for data prep.",
    body: "Client-ready explanations tied to holdings, in language an advisor can use the same day.",
    href: "/customers#wealth-managers",
    label: "See how advisors use it",
    icon: "petals",
    points: ["Holdings-aware", "Client-ready language", "Sourced explanations"],
  },
};

/** Contextual product CTA at the end of an article, chosen by topic. Defaults to Alfred. */
export function ProductCta({ slug }: { slug: string }) {
  const c = CTAS[slug] ?? ALFRED;
  return (
    <Reveal>
      <aside aria-label="Related product" data-tone="dark" className="relative isolate overflow-hidden rounded-[18px] bg-pine-500 p-7 text-paper md:p-10">
        <PrecisionIcon name={c.icon} className="h-11 w-11 text-paper md:h-12 md:w-12" />
        <h2 className="t-h2 mt-8 max-w-[520px] text-[26px] md:mt-10 md:text-[32px]">{c.title}</h2>
        <p className="t-body mt-4 max-w-[540px] text-paper/72">{c.body}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {c.points.map((p) => (
            <li key={p} className="rounded-full border border-white/20 px-3 py-1 font-display text-[13px] font-medium text-paper/80">
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/book-a-demo" variant="light" arrow cta="article-demo">
            Request a Demo
          </Button>
          <Button href={c.href} variant="outline-light" cta="article-product">
            {c.label}
          </Button>
        </div>
      </aside>
    </Reveal>
  );
}
