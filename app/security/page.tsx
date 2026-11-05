import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Arrow, Button } from "@/components/ui/Button";
import { SplitText } from "@/components/ui/SplitText";
import { PrecisionIcon, type IconName } from "@/components/ui/PrecisionIcon";
import { PropagationField } from "@/components/graphics/RippleRings";
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
        trail={[{ label: "Product" }, { label: "Security" }]}
        title="Security built for institutional research."
        lead="Reflexivity protects sensitive research and connected data through independently audited controls, encryption, and permission-aware access."
        cta="security-hero"
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Button href={SECURITY_HREF} arrow cta="security-hero-overview">
              Request a Security Overview
            </Button>
            <Button href="/book-a-demo" variant="secondary" cta="security-hero-demo">
              Request a Demo
            </Button>
          </div>
        }
        visual={<SecurityHero />}
      />

      {/* Enterprise controls */}
      <Section surface="lake" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-50" />
        <div className="container-x">
          <SectionHeader
            eyebrow="Diligence essentials"
            title="Enterprise controls"
            align="split"
            lead="Answers to the first questions on most due-diligence questionnaires, up front. Governance can vary by deployment, and we’ll walk through yours."
          />
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-[16px] bg-white/10 md:mt-20 md:grid-cols-3">
            {CONTROLS.map((c) => (
              <StaggerItem key={c.title} as="article" className="group flex flex-col bg-lake-900 p-7 transition-colors duration-500 hover:bg-[#2a3a4f] md:p-9">
                <PrecisionIcon name={c.icon} className="h-12 w-12 text-paper transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:rotate-[30deg]" />
                <h3 className="t-h3 mt-14 text-[24px] md:mt-20 md:text-[26px]">{c.title}</h3>
                <p className="t-body mt-3 max-w-[320px] text-paper/70">{c.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Your data, protected */}
      <Section surface="ink" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 field-ink" />
        <div className="container-x">
          <SectionHeader
            eyebrow="Data handling"
            title="Your data, protected."
            lead="Clear statements on isolation, connected-source access, retention and model training, so there is no ambiguity about what is stored and who can see it."
          />
          <div className="mt-14 md:mt-20">
            <DataProtection />
          </div>
        </div>
      </Section>

      {/* Security portal + cross-link */}
      <Section surface="paper">
        <div className="container-x grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <Link
              href={SECURITY_HREF}
              className="group relative flex h-full flex-col overflow-hidden rounded-[18px] bg-lake-900 p-7 text-paper transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1 md:p-10"
            >
              <div className="pointer-events-none absolute inset-0 bg-chart-dark opacity-60" />
              <div className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] opacity-[0.14] md:-right-10">
                <PrecisionIcon name="rings" className="h-full w-full text-lake-300 transition-transform duration-[2s] ease-[var(--ease-out-expo)] group-hover:rotate-45" />
              </div>
              <p className="t-ui relative text-paper/60">Security portal</p>
              <h2 className="t-h2 relative mt-6 max-w-[520px]">Trust portal &amp; DDQ</h2>
              <p className="t-lead relative mt-4 max-w-[560px] text-paper/72">
                Request our security documentation, get support with your due-diligence questionnaire, or set up a review with our security team.
              </p>
              <ul className="relative mt-8 grid gap-2 sm:grid-cols-2">
                {PORTAL.map((p) => (
                  <li key={p} className="flex items-center gap-3 rounded-[10px] border border-white/12 bg-white/[0.04] px-4 py-3 text-[14px] text-paper/85">
                    <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-pine-300" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3.5 8.5l3 3 6-6.5" /></svg>
                    {p}
                  </li>
                ))}
              </ul>
              <span className="relative mt-10 inline-flex items-center gap-2 font-display text-[16px] font-medium">
                <span className="link-underline">Contact the security team</span>
                <Arrow />
              </span>
            </Link>
          </Reveal>
          <Reveal className="lg:col-span-4" delay={0.1}>
            <Link href="/auditability-data" className="group flex h-full flex-col rounded-[18px] border border-ink/10 bg-white/60 p-7 transition-[border-color,background-color] duration-500 hover:border-ink/25 hover:bg-white md:p-8">
              <PrecisionIcon name="eye" className="h-10 w-10 text-ink transition-transform duration-700 group-hover:scale-110" />
              <p className="t-ui mt-10 text-ink/50">Related · Auditability &amp; Data</p>
              <h3 className="t-h3 mt-3">Checking the research, not protecting the data?</h3>
              <p className="t-body mt-3 text-ink/65">Security covers how your data is protected. Auditability covers how analysis can be inspected: sources, calculations and missing-data flags.</p>
              <span className="mt-auto flex items-center gap-2 pt-8 font-display text-[15px] font-medium">
                <span className="link-underline">How auditability works</span>
                <Arrow />
              </span>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* CTA: security review */}
      <section data-tone="dark" className="relative isolate overflow-hidden bg-ink py-16 text-paper md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 field-ink" />
        <div className="pointer-events-none absolute inset-y-0 right-[-20%] -z-10 w-[120%] opacity-70 md:right-[-10%] md:w-[80%]">
          <PropagationField />
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
