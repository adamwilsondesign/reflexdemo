import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SplitText } from "@/components/ui/SplitText";
import { type IconName } from "@/components/ui/PrecisionIcon";
import { FeatureGrid } from "@/components/ui/Blocks";
import { LinkRowsBlock, SplitFeature, TextLink } from "@/components/ui/Layouts";
import { IsolationViz } from "./_components/IsolationViz";
import { CartoViz } from "@/components/graphics/Cartography";
import { SecurityHero } from "./_components/SecurityHero";
import { DataProtection } from "./_components/DataProtection";

export const metadata: Metadata = {
  title: "Security | Enterprise controls for institutional research | Reflexivity",
  description:
    "How Reflexivity protects sensitive research and connected data: SOC 2 Type II audited controls, encryption in transit, permission-aware access, client isolation, and a security review process for your due diligence.",
};

const SECURITY_HREF = "/contact?topic=security";

const CONTROLS: { icon: IconName; title: string; body: string }[] = [
  { icon: "pentagon", title: "SOC 2 Type II", body: "Reflexivity’s security controls undergo annual independent audits." },
  { icon: "knot", title: "Encryption", body: "Customer data is encrypted in transit to protect sensitive information." },
  { icon: "venn", title: "Permission-aware access", body: "Access to connected sources respects your firm’s existing permissions." },
];

const PORTAL = [
  "SOC 2 Type II report request",
  "Security overview and architecture walkthrough",
  "Due-diligence questionnaire (DDQ) support",
  "Data handling and retention questions",
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        surface="pine900"
        trail={[{ label: "Product" }, { label: "Security" }]}
        title="Security built for institutional research."
        lead="Reflexivity protects sensitive research and connected data through independently audited controls, encryption, and permission-aware access."
        cta="security-hero"
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Button href={SECURITY_HREF} variant="light" arrow cta="security-hero-overview">
              Request a Security Overview
            </Button>
            <Button href="/book-a-demo" variant="outline-light" cta="security-hero-demo">
              Request a Demo
            </Button>
          </div>
        }
        visual={<SecurityHero />}
      />

      {/* Enterprise controls */}
      <Section surface="lake">
        <div className="container-x">
          <SectionHeader
            title="Enterprise controls"
            align="split"
            lead="Answers to the first questions on most due-diligence questionnaires, up front. Governance can vary by deployment, and we’ll walk through yours."
          />
          <FeatureGrid onDark className="mt-14 md:mt-20" items={CONTROLS} />
        </div>
      </Section>

      {/* Your data, protected */}
      <Section surface="paper">
        <div className="container-x">
          <SectionHeader
            title="Your data, protected."
            lead="Clear statements on isolation, connected-source access, retention and model training, so there is no ambiguity about what is stored and who can see it."
          />
          <div className="mt-14 md:mt-20">
            <DataProtection />
          </div>
        </div>
      </Section>

      {/* Concept: isolation layers */}
      <SplitFeature
        surface="pine"
        title="One environment per client."
        lead="Access is checked at the edge, data is encrypted in transit, and each firm’s research, documents and connected sources sit in their own environment. Nothing is shared between clients."
        link={{ label: "Request a Security Overview", href: SECURITY_HREF }}
        visual={<IsolationViz />}
      />

      {/* Security portal + cross-link */}
      <Section surface="mist">
        <div className="container-x">
          <LinkRowsBlock
            title="Trust portal & DDQ"
            lead="Request our security documentation, get support with your due-diligence questionnaire, or set up a review with our security team."
            rows={PORTAL.map((p) => ({ label: p, href: SECURITY_HREF }))}
          />
          <Reveal className="mt-20 grid gap-6 border-t border-ink/15 pt-10 md:mt-28 lg:grid-cols-2 lg:gap-16">
            <h3 className="t-h3 max-w-[460px]">Checking the research, not protecting the data?</h3>
            <div>
              <p className="t-body max-w-[520px] text-ink/70">Security covers how your data is protected. Auditability covers how analysis can be inspected: sources, calculations and missing-data flags.</p>
              <TextLink href="/auditability-data" className="mt-6">How auditability works</TextLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* CTA: security review */}
      <section data-tone="dark" data-bg="#17191c" className="relative isolate overflow-hidden bg-ink py-16 text-paper md:py-20">
        <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-1/2 items-center justify-center text-paper/80 lg:flex">
          <div className="aspect-square w-[min(520px,90%)]">
            <CartoViz name="orbit" accent="#f4f3f1" />
          </div>
        </div>
        <div className="container-x py-10 md:py-16">
          <div className="max-w-[760px]">
            <SplitText text="Start a security review with our team." className="t-h1" />
            <Reveal delay={0.15}>
              <p className="t-lead mt-6 max-w-[560px] text-paper/70">
                Request a security overview, discuss your firm&rsquo;s requirements, or begin a due diligence review with our team.
              </p>
            </Reveal>
            <Reveal delay={0.25} className="mt-10 flex flex-wrap items-center gap-3">
              <Button href={SECURITY_HREF} variant="light" arrow cta="security-final-overview">
                Request a Security Overview
              </Button>
              <Button href="/book-a-demo" variant="outline-light" cta="security-final-demo">
                Request a Demo
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
