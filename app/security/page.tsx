import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/ui/Blocks";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SplitFeature } from "@/components/ui/Layouts";
import { ControlBadges } from "./_components/ControlBadges";
import { IsolationViz } from "./_components/IsolationViz";
import { SecurityHero } from "./_components/SecurityHero";
import { DataProtection } from "./_components/DataProtection";

export const metadata: Metadata = {
  title: "Security | Enterprise controls for institutional research | Reflexivity",
  description:
    "How Reflexivity protects sensitive research and connected data: SOC 2 Type II audited controls, encryption in transit, permission-aware access, client isolation, and a security review process for your due diligence.",
};

const SECURITY_HREF = "/contact?topic=security";

export default function SecurityPage() {
  return (
    <>
      <PageHero
        surface="pine900"
        trail={[{ label: "Product" }, { label: "Security" }]}
        title="Security built for institutional research."
        lead="Reflexivity protects sensitive research and connected data through independently audited controls, encryption, and permission-aware access."
        cta="security-hero"
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
          <ControlBadges className="mt-14 md:mt-20" />
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
        visual={<IsolationViz />}
      />

      {/* CTA: security review */}
      <CTABand
        title="Start a security review with our team."
        lead="Request a security overview, discuss your firm’s requirements, or begin a due diligence review with our team."
        note={null}
        actions={
          <div className="flex flex-wrap items-center gap-4">
            <Button href={SECURITY_HREF} variant="light" arrow cta="security-final-overview">
              Request a Security Overview
            </Button>
            <Button href="/book-a-demo" variant="outline-light" cta="security-final-demo">
              Request a Demo
            </Button>
          </div>
        }
      />
    </>
  );
}
