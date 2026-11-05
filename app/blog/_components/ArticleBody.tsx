import Image from "next/image";
import clsx from "clsx";
import type { Block } from "@/lib/blog";

/**
 * Long-form renderer. Source Serif 4 body at ~68ch, Archivo headings, hanging pull quotes,
 * figures in a mist frame. The first paragraph is set as the lede when there is no standfirst.
 */
export function ArticleBody({ blocks, leadFirst }: { blocks: Block[]; leadFirst: boolean }) {
  const firstP = leadFirst ? blocks.findIndex((b) => b.type === "p") : -1;
  return (
    <div className="max-w-[68ch] font-serif text-ink/85">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} id={b.id} className="mt-16 scroll-mt-32 font-display text-[26px] font-semibold leading-[1.18] tracking-[-0.02em] text-ink first:mt-0 md:mt-20 md:text-[30px]">
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={b.id} className="mt-12 scroll-mt-32 font-display text-[20px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink md:text-[22px]">
                {b.text}
              </h3>
            );
          case "p": {
            const label = b.text.length < 32 && b.text.endsWith(":");
            if (label)
              return (
                <p key={i} className="mt-8 font-display text-[17px] font-semibold text-ink">
                  {b.text}
                </p>
              );
            return (
              <p
                key={i}
                className={clsx(
                  "mt-6 first:mt-0",
                  i === firstP ? "text-[20px] leading-[1.6] text-ink md:text-[22px]" : "text-[17px] leading-[1.75] md:text-[18px]",
                )}
              >
                {b.text}
              </p>
            );
          }
          case "list":
            return (
              <ul key={i} className="mt-6 flex flex-col gap-3 text-[17px] leading-[1.7] md:text-[18px]">
                {b.items.map((it, j) => (
                  <li key={j} className="relative pl-7">
                    <span aria-hidden="true" className="absolute left-1 top-[0.72em] h-[6px] w-[6px] rotate-45 border border-lake-500" />
                    {it.lead && <strong className="font-semibold text-ink">{it.lead}: </strong>}
                    {it.text}
                  </li>
                ))}
              </ul>
            );
          case "quote":
            if (b.variant === "pull")
              return (
                <figure key={i} aria-hidden={b.decorative || undefined} className="relative my-14 border-y border-ink/12 py-9 md:-mx-10 md:my-16 md:px-10">
                  <svg viewBox="0 0 32 24" className="h-5 w-7 text-lake-500" fill="currentColor" aria-hidden="true">
                    <path d="M0 24V14C0 6 4 1.5 12 0l1.5 3C9 4.5 7 7.5 7 11h5v13H0zm19 0V14c0-8 4-12.5 12-14l1 3c-4.5 1.5-6.5 4.5-6.5 8H31v13H19z" />
                  </svg>
                  <blockquote className="mt-5 text-balance font-serif text-[24px] font-normal leading-[1.32] tracking-[-0.01em] text-ink md:text-[30px]">{b.text}</blockquote>
                </figure>
              );
            return (
              <blockquote key={i} className="my-9 border-l-2 border-lake-500 bg-mist-100 py-5 pl-6 pr-5 text-[18px] italic leading-[1.65] text-ink md:text-[19px]">
                &ldquo;{b.text}&rdquo;
              </blockquote>
            );
          case "image":
            return (
              <figure key={i} className="my-12 md:-mx-10">
                <div className="overflow-hidden rounded-[14px] border border-ink/10 bg-mist-100 p-2 md:p-3">
                  <Image
                    src={b.src}
                    alt={b.alt}
                    width={b.width}
                    height={b.height}
                    sizes="(min-width:1024px) 760px, 100vw"
                    className="mx-auto h-auto w-full rounded-[8px]"
                    style={{ maxWidth: b.width < 700 ? b.width : undefined }}
                  />
                </div>
                {b.caption && <figcaption className="t-small mt-3 px-1 text-ink/55">{b.caption}</figcaption>}
              </figure>
            );
        }
      })}
    </div>
  );
}
