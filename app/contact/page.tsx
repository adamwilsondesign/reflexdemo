import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/Blocks";
import { PrecisionIcon, type IconName } from "@/components/ui/PrecisionIcon";
import { HELP_URL } from "@/lib/nav";
import { RouteVisual } from "./_components/RouteVisual";
import { ContactForm } from "./_components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Reflexivity",
  description:
    "Get in touch with Reflexivity about partnerships, technical integrations, security reviews, press or customer support. Request a demo to see the platform on your own work.",
};

const ROUTES: { icon: IconName; k: string; title: string; body: string; links: { label: string; href: string }[]; primary?: boolean }[] = [
  {
    icon: "crosshair",
    k: "Sales",
    title: "See the product on your work",
    body: "A walkthrough tailored to your portfolio, watchlist or research workflow.",
    links: [{ label: "Request a Demo", href: "/book-a-demo" }],
    primary: true,
  },
  {
    icon: "knot",
    k: "Partnerships",
    title: "Embed or distribute Reflexivity",
    body: "Platform, data and distribution partnerships, including embedded and white-label setups.",
    links: [
      { label: "Email partnerships", href: "mailto:partnerships@reflexivity.com" },
      { label: "Use the form", href: "/contact?topic=partnerships#form" },
    ],
  },
  {
    icon: "loop",
    k: "Support",
    title: "Help for existing customers",
    body: "Guides, answers and a direct line to our support team.",
    links: [{ label: "Visit the Help Center", href: HELP_URL }],
  },
  {
    icon: "signal",
    k: "Press",
    title: "Media and interview requests",
    body: "Announcements, coverage and commentary from our team.",
    links: [
      { label: "Press enquiry", href: "/contact?topic=press#form" },
      { label: "News & Press", href: "/news" },
    ],
  },
  {
    icon: "chain",
    k: "Security",
    title: "Security review and due diligence",
    body: "Questionnaires, documentation requests and security conversations.",
    links: [
      { label: "Start a security review", href: "/contact?topic=security#form" },
      { label: "Security overview", href: "/security" },
    ],
  },
];

const OFFICES = ["New York", "London", "Tokyo"];

export default function ContactPage() {
  return (
    <>
      <PageHero
        trail={[{ label: "Company" }, { label: "Contact" }]}
        title="Get in touch with Reflexivity."
        lead="Use this page for partnerships, technical questions, security reviews, press and support. To see the platform against your own work, request a demo instead."
        secondary={{ label: "Send a message", href: "#form" }}
        cta="contact-hero"
        visual={<RouteVisual />}
      />

      {/* Routes */}
      <Section surface="paper" tight className="border-t border-ink/8">
        <div className="container-x">
          <Reveal>
            <p className="t-ui text-ink/50">Choose the right route</p>
          </Reveal>
          <Stagger className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {ROUTES.map((r) => (
              <StaggerItem
                key={r.k}
                className={
                  "group flex h-full flex-col rounded-[16px] p-6 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 " +
                  (r.primary ? "bg-lake-900 text-paper" : "border border-ink/10 bg-white/60")
                }
              >
                <div className="flex items-center justify-between">
                  <span className={"t-ui " + (r.primary ? "text-paper/60" : "text-ink/50")}>{r.k}</span>
                  <PrecisionIcon name={r.icon} className="h-8 w-8 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[20deg]" />
                </div>
                <h2 className="mt-10 font-display text-[19px] font-semibold leading-snug tracking-[-0.01em]">{r.title}</h2>
                <p className={"t-small mt-2 " + (r.primary ? "text-paper/70" : "text-ink/60")}>{r.body}</p>
                <ul className="mt-auto space-y-2 pt-6">
                  {r.links.map((l) => {
                    const ext = l.href.startsWith("http") || l.href.startsWith("mailto:");
                    const inner = (
                      <>
                        <span className="link-underline">{l.label}</span> <Arrow className="shrink-0" />
                      </>
                    );
                    const cls = "group/l inline-flex items-center gap-2 font-display text-[14.5px] font-medium";
                    return (
                      <li key={l.href}>
                        {ext ? (
                          <a href={l.href} className={cls}>
                            {inner}
                          </a>
                        ) : (
                          <Link href={l.href} className={cls}>
                            {inner}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Form + offices */}
      <Section surface="mist" id="form" className="scroll-mt-[var(--header-h)] border-t border-ink/8">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="Send a message"
              title="Tell us what you need."
              lead="Pick a topic and we’ll route your note to the right team. Product interest is fastest through a demo request."
            />
            <Reveal delay={0.2}>
              <div className="mt-12 border-t border-ink/12 pt-8">
                <p className="t-ui text-ink/50">Offices</p>
                <ul className="mt-4 space-y-3">
                  {OFFICES.map((o) => (
                    <li key={o} className="flex items-center justify-between border-b border-ink/8 pb-3">
                      <span className="font-display text-[20px] font-semibold tracking-[-0.01em]">{o}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-lake-500" aria-hidden="true" />
                    </li>
                  ))}
                </ul>
                <p className="t-small mt-6 text-ink/55">
                  Partnerships:{" "}
                  <a href="mailto:partnerships@reflexivity.com" className="link-underline text-ink">
                    partnerships@reflexivity.com
                  </a>
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-8" delay={0.1}>
            <Suspense fallback={<div className="h-[560px] rounded-[18px] border border-ink/10 bg-white/70" aria-hidden="true" />}>
              <ContactForm />
            </Suspense>
          </Reveal>
        </div>
      </Section>

      <CTABand
        title="Want to see it on your own work?"
        lead="Bring a watchlist, a thesis or a client question. We’ll tailor the walkthrough to your process."
        secondary={{ label: "Deployment options", href: "/deployment" }}
        cta="contact-final"
      />
    </>
  );
}
