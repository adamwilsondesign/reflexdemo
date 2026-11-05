import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { ArrowNE } from "@/components/ui/Layouts";
import { CTABand } from "@/components/ui/Blocks";
import { HELP_URL } from "@/lib/nav";
import { RouteVisual } from "./_components/RouteVisual";
import { ContactForm } from "./_components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Reflexivity",
  description:
    "Get in touch with Reflexivity about partnerships, technical integrations, security reviews, press or customer support. Request a demo to see the platform on your own work.",
};

const ROUTES: { k: string; title: string; body: string; links: { label: string; href: string }[]; }[] = [
  {
    k: "Sales",
    title: "See the product on your work",
    body: "A walkthrough tailored to your portfolio, watchlist or research workflow.",
    links: [{ label: "Request a Demo", href: "/book-a-demo" }],
  },
  {
    k: "Partnerships",
    title: "Embed or distribute Reflexivity",
    body: "Platform, data and distribution partnerships, including embedded and white-label setups.",
    links: [
      { label: "Email partnerships", href: "mailto:partnerships@reflexivity.com" },
      { label: "Use the form", href: "/contact?topic=partnerships#form" },
    ],
  },
  {
    k: "Support",
    title: "Help for existing customers",
    body: "Guides, answers and a direct line to our support team.",
    links: [{ label: "Visit the Help Center", href: HELP_URL }],
  },
  {
    k: "Press",
    title: "Media and interview requests",
    body: "Announcements, coverage and commentary from our team.",
    links: [
      { label: "Press enquiry", href: "/contact?topic=press#form" },
      { label: "News & Press", href: "/news" },
    ],
  },
  {
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
      <Section surface="pine">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SplitText text="Choose the right route." className="t-h2 max-w-[520px]" />
            <Reveal delay={0.15}>
              <p className="t-lead mt-5 max-w-[460px] text-paper/72">Each enquiry goes straight to the team that handles it.</p>
            </Reveal>
          </div>
          <Stagger as="ul" className="border-t border-white/20">
            {ROUTES.map((r) => (
              <StaggerItem as="li" key={r.k} className="grid gap-x-6 gap-y-2 border-b border-white/20 py-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:py-7">
                <h3 className="font-display text-[19px] font-medium tracking-[-0.01em] md:text-[21px]">{r.k}</h3>
                <div>
                  <p className="font-display text-[16px] font-semibold">{r.title}</p>
                  <p className="t-small mt-1 text-paper/70">{r.body}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                    {r.links.map((l) => {
                      const ext = l.href.startsWith("http") || l.href.startsWith("mailto:");
                      const cls = "group inline-flex items-center gap-2 border-b border-current/40 pb-0.5 font-display text-[14.5px] font-medium transition-colors hover:border-current";
                      return (
                        <li key={l.href}>
                          {ext ? (
                            <a href={l.href} className={cls}>
                              {l.label} <ArrowNE />
                            </a>
                          ) : (
                            <Link href={l.href} className={cls}>
                              {l.label} <ArrowNE />
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Form + offices */}
      <Section surface="paper" id="form" className="scroll-mt-[var(--header-h)]">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader
              title="Tell us what you need."
              className="lg:max-w-none"
              lead="Pick a topic and we’ll route your note to the right team. Product interest is fastest through a demo request."
            />
            <Reveal delay={0.2} className="hidden lg:block">
              <OfficeList />
            </Reveal>
          </div>
          <Reveal className="lg:col-span-8" delay={0.1}>
            <Suspense fallback={<div className="h-[560px] rounded-[18px] border border-ink/10 bg-white/70" aria-hidden="true" />}>
              <ContactForm />
            </Suspense>
          </Reveal>
          <div className="lg:hidden">
            <OfficeList />
          </div>
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

function OfficeList() {
  return (
    <div className="border-t border-ink/12 pt-8 lg:mt-12">
      <h3 className="t-h3">Offices</h3>
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
  );
}
