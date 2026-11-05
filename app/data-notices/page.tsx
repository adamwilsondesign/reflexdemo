import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/Blocks";
import { Stage } from "@/components/product/ui";
import { DATA_SOURCES } from "@/lib/logos";
import { SourceMap } from "./_components/SourceMap";

export const metadata: Metadata = {
  title: "Data provider notices",
  description:
    "Notices and attributions for third-party data and content in Reflexivity, including LSEG, S&P Global, Cboe, Dow Jones, Nasdaq, Quartr, MT Newswires, Benzinga and FRED.",
  alternates: { canonical: "/data-notices" },
};

const logo = (name: string) => DATA_SOURCES.find((d) => d.name === name);

const PROVIDERS: { id: string; name: string; logoName: string; content: string; notice: string }[] = [
  {
    id: "lseg",
    name: "LSEG",
    logoName: "LSEG",
    content: "Financial and market data",
    notice: "Certain data in Reflexivity is provided under license from London Stock Exchange Group plc and its group companies (“LSEG”). LSEG and its licensors retain all rights in their data.",
  },
  {
    id: "sp-global",
    name: "S&P Global",
    logoName: "S&P Global",
    content: "Financial and market data",
    notice: "Certain data in Reflexivity is provided under license from S&P Global or its affiliates. S&P Global and its licensors retain all rights in their data.",
  },
  {
    id: "cboe",
    name: "Cboe",
    logoName: "Cboe",
    content: "Market data",
    notice: "Certain market data in Reflexivity is provided under license from Cboe Global Markets, Inc. or its affiliates, which retain all rights in that data.",
  },
  {
    id: "dow-jones",
    name: "Dow Jones Newswires",
    logoName: "Dow Jones Newswires",
    content: "News",
    notice: "Certain news content in Reflexivity is provided under license from Dow Jones & Company, Inc., which retains all rights in that content.",
  },
  {
    id: "nasdaq",
    name: "Nasdaq",
    logoName: "Nasdaq",
    content: "Market data",
    notice: "Certain market data in Reflexivity is provided under license from Nasdaq, Inc. or its affiliates, which retain all rights in that data.",
  },
  {
    id: "quartr",
    name: "Quartr",
    logoName: "Quartr",
    content: "Company events and earnings call content",
    notice: "Certain company event content in Reflexivity is provided under license from Quartr, which retains all rights in that content.",
  },
  {
    id: "mt-newswires",
    name: "MT Newswires",
    logoName: "MT Newswires",
    content: "News",
    notice: "Certain news content in Reflexivity is provided under license from MT Newswires, which retains all rights in that content.",
  },
  {
    id: "benzinga",
    name: "Benzinga",
    logoName: "Benzinga",
    content: "News",
    notice: "Certain news content in Reflexivity is provided under license from Benzinga, which retains all rights in that content.",
  },
  {
    id: "fred",
    name: "FRED®, Federal Reserve Bank of St. Louis",
    logoName: "FRED (Federal Reserve Bank of St. Louis)",
    content: "Economic data",
    notice: "Source: Federal Reserve Economic Data (FRED), Federal Reserve Bank of St. Louis. This product uses the FRED® API but is not endorsed or certified by the Federal Reserve Bank of St. Louis.",
  },
];

const GENERAL = [
  {
    title: "Ownership",
    body: "Third-party data and content remain the property of the respective provider and its licensors. Use of Reflexivity does not transfer any ownership rights in that data or content.",
  },
  {
    title: "Permitted use",
    body: "Third-party data and content are made available for your internal research and analysis only, and may not be redistributed except as permitted by your agreement with us or through sharing features built into Reflexivity.",
  },
  {
    title: "No warranty",
    body: "Third-party data and content are provided “as is”. Neither Reflexivity nor its providers guarantee that they are accurate, complete or timely, and some data may be delayed.",
  },
  {
    title: "Not investment advice",
    body: "Nothing provided by Reflexivity or its data providers is investment advice. You are responsible for your own investment decisions.",
  },
  {
    title: "Changes to notices",
    body: "Providers may update their notices from time to time. The Data Provider Notices section of our Terms explains how updates apply to subscribers.",
  },
];

export default function DataNoticesPage() {
  return (
    <>
      <PageHero
        trail={[{ label: "Legal" }, { label: "Data notices" }]}
        title="Data provider notices"
        lead={
          <p>
            Reflexivity integrates data and content from third-party providers. This page identifies those providers and the notices that apply to their content.
          </p>
        }
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/auditability-data" variant="primary" arrow>
              How sourcing works
            </Button>
            <Button href="/terms#data-provider-notices" variant="secondary">
              Read the Terms
            </Button>
          </div>
        }
        visual={
          <Stage field="lake" className="p-4 sm:p-8 md:p-10">
            <SourceMap />
          </Stage>
        }
      />

      <Section surface="paper" className="border-t border-ink/8">
        <div className="container-x">
          <SectionHeader eyebrow="Providers" title="Attributions by provider." align="split" lead="Each provider’s data and content is used under license. Where a provider requires specific attribution wording, it appears below." />
          <Stagger as="ul" className="mt-14 grid gap-px overflow-hidden rounded-[16px] border border-ink/10 bg-ink/10 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {PROVIDERS.map((p) => {
              const l = logo(p.logoName);
              return (
                <StaggerItem key={p.id} as="li" className="flex flex-col bg-paper p-6 md:p-8">
                  <div id={p.id} className="flex h-10 scroll-mt-[calc(var(--header-h)+32px)] items-center">
                    {l && <Image src={l.src} alt="" width={l.w} height={l.h} className="h-auto max-h-[26px] w-auto opacity-80 grayscale" style={{ width: l.w * 0.95 }} />}
                  </div>
                  <h3 className="t-h3 mt-6">{p.name}</h3>
                  <p className="t-ui mt-2 text-ink/50">{p.content}</p>
                  <p className="t-small mt-4 leading-relaxed text-ink/75">{p.notice}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
          <Reveal>
            <p className="t-small mt-8 max-w-[760px] text-ink/55">
              All product names, logos and brands are property of their respective owners and are used for identification purposes only. Their use does not imply endorsement.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section surface="mist" className="border-t border-ink/8">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Applies to all providers" title="General notices." />
            <Reveal delay={0.2} className="mt-8">
              <p className="t-body max-w-[340px] text-ink/65">
                Questions about these notices? Contact our legal team at{" "}
                <a href="mailto:legal@reflexivity.com" className="text-ink underline decoration-ink/25 underline-offset-2 hover:decoration-ink">
                  legal@reflexivity.com
                </a>
                .
              </p>
            </Reveal>
          </div>
          <Stagger as="ul" className="border-b border-ink/12 lg:col-span-8">
            {GENERAL.map((g) => (
              <StaggerItem key={g.title} as="li" className="grid gap-2 border-t border-ink/12 py-6 md:grid-cols-[200px_1fr] md:gap-8">
                <h3 className="font-display text-[17px] font-semibold">{g.title}</h3>
                <p className="t-body text-ink/72">
                  {g.body}
                  {g.title === "Changes to notices" && (
                    <>
                      {" "}
                      <Link href="/terms#data-provider-notices" className="text-ink underline decoration-ink/25 underline-offset-2 hover:decoration-ink">
                        Read the section
                      </Link>
                      .
                    </>
                  )}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <CTABand
        title="See how sources show up in an answer."
        lead="Alfred cites by default and flags missing data, so you can open the source behind each claim."
        secondary={{ label: "How sourcing works", href: "/auditability-data" }}
        cta="data-notices-final"
      />
    </>
  );
}
