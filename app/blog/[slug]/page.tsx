import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Stagger, StaggerItem, Reveal } from "@/components/ui/Reveal";
import { Arrow, Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/Blocks";
import { POSTS, getPost, getRelated, getToc } from "@/lib/blog";
import { ArticleHeader } from "../_components/ArticleHeader";
import { ArticleBody } from "../_components/ArticleBody";
import { ReadingProgress, ShareLinks, Toc } from "../_components/ArticleChrome";
import { ProductCta } from "../_components/ProductCta";
import { PostCard, Initials } from "../_components/PostCard";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    authors: [{ name: post.author.name }],
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.date, authors: [post.author.name] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const toc = getToc(post);
  const related = getRelated(post.slug, 3);
  const path = `/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author.name, jobTitle: post.author.role },
    publisher: { "@type": "Organization", name: "Reflexivity" },
    description: post.excerpt,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgress targetId="article-body" />
      <ArticleHeader post={post} />

      <section data-tone="light" data-bg="#f4f3f1" className="relative bg-paper pb-20 pt-14 md:pb-28 md:pt-20">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,68ch)_minmax(0,1fr)] lg:gap-14">
          {/* left rail: TOC + share (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 flex flex-col gap-10">
              {toc.length > 1 && <Toc items={toc} />}
              <ShareLinks title={post.title} path={path} />
            </div>
          </aside>

          <div className="min-w-0">
            {/* mobile TOC */}
            {toc.length > 1 && (
              <details className="group mb-10 rounded-[12px] border border-ink/12 bg-white/60 lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4">
                  <span className="t-ui text-ink/60">On this page · {toc.length} sections</span>
                  <svg viewBox="0 0 12 12" className="h-3 w-3 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M2 4.5l4 4 4-4" />
                  </svg>
                </summary>
                <ol className="flex flex-col gap-1 border-t border-ink/10 px-6 py-4">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="block py-2 text-[15px] text-ink/75 hover:text-ink">
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            )}

            <article id="article-body" aria-label={post.title}>
              <ArticleBody blocks={post.body} leadFirst={!post.dek} />
            </article>

            {/* byline card */}
            <div className="mt-16 flex flex-col gap-6 border-y border-ink/12 py-8 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <Initials name={post.author.name} className="h-12 w-12 bg-ink/[0.07] text-[14px]" />
                <div>
                  <p className="font-display text-[17px] font-semibold">
                    <span className="font-normal text-ink/55">Written by </span>
                    {post.author.name}
                  </p>
                  {post.author.role && <p className="mt-0.5 font-display text-[14px] text-ink/60">{post.author.role}, Reflexivity</p>}
                  {post.author.bio && <p className="t-small mt-2 max-w-[420px] text-ink/60">{post.author.bio}</p>}
                </div>
              </div>
              <ShareLinks title={post.title} path={path} />
            </div>

            <div className="mt-14">
              <ProductCta slug={post.slug} />
            </div>
          </div>

          {/* right rail: quiet conversion card (xl) */}
          <aside className="hidden xl:block" aria-label="Request a demo">
            <div className="sticky top-32 ml-auto max-w-[240px] rounded-[14px] border border-ink/10 bg-white/60 p-6">
              <p className="font-display text-[17px] font-semibold leading-[1.3]">AI investment research you can check.</p>
              <p className="t-small mt-2 text-ink/60">See Alfred, the Knowledge Graph and Insights on a question of your own.</p>
              <Link href="/book-a-demo" data-cta="article-rail" className="group mt-6 inline-flex items-center gap-2 font-display text-[15px] font-medium">
                <span className="link-underline">Request a Demo</span>
                <Arrow />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <Section surface="mist" className="border-t border-ink/8">
        <div className="container-x">
          <SectionHeader
            title="More from the Reflexivity blog."
            align="split"
            actions={
              <div>
                <Button href="/blog" variant="secondary" arrow>
                  View all articles
                </Button>
              </div>
            }
          />
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-6">
            {related.map((p) => (
              <StaggerItem key={p.slug} className="h-full">
                <PostCard post={p} />
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-10">
            <p className="t-small text-ink/55">
              Want new articles as they’re published?{" "}
              <Link href="/blog#subscribe" className="link-underline text-ink">
                Subscribe to the newsletter
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </Section>

      <CTABand
        title="Test the argument on your own book."
        lead="Bring a question, a watchlist or a theme. We’ll walk through how Reflexivity researches it, and show you the sources."
        secondary={{ label: "Explore the platform", href: "/platform" }}
        cta="article-final"
      />
    </>
  );
}
