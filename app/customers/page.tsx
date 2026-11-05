import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTABand, FeatureGrid, TESTIMONIALS, Testimonials } from "@/components/ui/Blocks";
import { LinkRowsBlock } from "@/components/ui/Layouts";
import { FirmRouter } from "./_components/FirmRouter";
import { AudienceSection } from "./_components/AudienceSection";
import { AUDIENCES, ROLES } from "./_components/data";

export const metadata: Metadata = {
  title: "Solutions by Firm: Hedge Funds, Institutions, Asset & Wealth Managers",
  description:
    "How hedge funds, financial institutions, asset managers and wealth managers use Reflexivity: the same Knowledge Graph, Alfred and Insights, framed around each firm’s workflows.",
};

const [HF, FI, AM, WM] = AUDIENCES;

export default function CustomersPage() {
  return (
    <>
      <PageHero
        trail={[{ label: "Solutions" }, { label: "By firm type" }]}
        title="One platform, set up around how your firm works."
        lead="Built for hedge funds, financial institutions, wealth teams and asset managers, with the same Knowledge Graph, Alfred and Insights framed around each one’s work."
        secondary={{ label: "Find your firm type", href: "#firms" }}
        cta="customers-hero"
        visual={<FirmRouter />}
      />

      {/* Audience router */}
      <Section surface="ink" id="firms" className="scroll-mt-[var(--header-h)]">
        <div className="container-x">
          <LinkRowsBlock
            onDark
            title="Different decisions. A shared need for evidence."
            lead="From a hedge fund’s book to a wealth team’s client note, here’s what Reflexivity does for each kind of firm."
            rows={AUDIENCES.map((a) => ({ label: a.name, href: `#${a.id}`, note: a.card }))}
          />
          <LinkRowsBlock
            onDark
            className="mt-20 md:mt-28"
            title="Or start from your role."
            rows={ROLES.map((r) => ({ label: r.role, href: r.href, note: r.body }))}
          />
        </div>
      </Section>

      <AudienceSection a={HF} surface="paper" field="lake" quote={TESTIMONIALS[1]} />
      <AudienceSection a={FI} surface="pine" field="mist" />
      <AudienceSection a={AM} surface="paper" field="lake" />
      <AudienceSection a={WM} surface="mist" field="pine" />

      {/* Testimonials */}
      <Section surface="lake" id="testimonials">
        <div className="container-x">
          <Testimonials onDark items={[TESTIMONIALS[0]]} title="A daily tool for the modern portfolio manager." />
        </div>
      </Section>

      {/* Customer stories: reference conversation instead of placeholder case studies */}
      <Section surface="paper" id="customer-stories" className="scroll-mt-[var(--header-h)]">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              title="Hear it from a firm like yours."
              className="lg:max-w-none"
              lead="Named customer stories are being prepared with our clients’ approval. In the meantime, we can arrange a reference conversation with a firm whose work looks like yours."
            />
            <Reveal delay={0.2} className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact?topic=reference" arrow cta="customers-reference">
                Request a reference conversation
              </Button>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="t-small mt-5 max-w-[420px] text-ink/50">Reference calls are typically arranged after an initial demo, subject to the reference customer’s availability.</p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <h3 className="t-h3">What a reference conversation covers</h3>
            </Reveal>
            <FeatureGrid
              cols={2}
              className="mt-6"
              items={[
                { icon: "crosshair", title: "The starting challenge", body: "What the team needed done, and what it was using before." },
                { icon: "knot", title: "The deployment choice", body: "Platform seats, an integration, or both, and why." },
                { icon: "path", title: "The workflow", body: "How research, monitoring and review fit into the day." },
                { icon: "star", title: "The result", body: "What changed for the team, in their own words." },
              ]}
            />
          </div>
        </div>
      </Section>

      <CTABand
        title="See Reflexivity set up for your firm."
        lead="Bring your coverage, your book or a client question. We’ll show the workflow that fits how your firm works."
        secondary={{ label: "Discuss a partnership", href: "/contact?topic=partnerships" }}
        cta="customers-final"
      />
    </>
  );
}
