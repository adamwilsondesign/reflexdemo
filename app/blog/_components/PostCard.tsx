import Link from "next/link";
import clsx from "clsx";
import { Arrow } from "@/components/ui/Button";
import { formatDate, type BlogPost } from "@/lib/blog";
import { BlogCover } from "./BlogCover";

export function Initials({ name, className }: { name: string; className?: string }) {
  return (
    <span aria-hidden="true" className={clsx("flex shrink-0 items-center justify-center rounded-full font-display font-semibold", className ?? "h-8 w-8 bg-ink/[0.06] text-[12px]")}>
      {name
        .split(" ")
        .map((s) => s[0])
        .join("")}
    </span>
  );
}

export function PostMeta({ post, onDark = false, className }: { post: BlogPost; onDark?: boolean; className?: string }) {
  return (
    <p className={clsx("t-ui flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px]", onDark ? "text-paper/60" : "text-ink/55", className)}>
      <span className={onDark ? "text-paper/85" : "text-ink/80"}>{post.category}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readingTime} min read</span>
    </p>
  );
}

/** Grid card: cover, meta, title, excerpt, author. Whole card is one link. */
export function PostCard({ post, headingLevel = "h3", wide = false }: { post: BlogPost; headingLevel?: "h2" | "h3"; wide?: boolean }) {
  const H = headingLevel;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={clsx(
        "group flex h-full flex-col overflow-hidden rounded-[14px] border border-ink/10 bg-white/60 transition-[border-color,background-color,transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:border-ink/20 hover:bg-white hover:shadow-[0_24px_48px_-28px_rgb(23_25_28/0.35)]",
        wide && "lg:grid lg:grid-cols-2",
      )}
    >
      <BlogCover post={post} className={clsx("aspect-[16/10]", wide && "lg:aspect-auto lg:h-full")} sizes={wide ? "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" : undefined} />
      <div className={clsx("flex flex-1 flex-col p-6 md:p-7", wide && "lg:p-9")}>
        <PostMeta post={post} />
        <H className={clsx("t-h3 mt-3.5 text-balance", wide && "lg:text-[26px] lg:leading-[1.2]")}>{post.title}</H>
        <p className="t-small mt-3 line-clamp-3 text-ink/65">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-7">
          <span className="flex items-center gap-2.5">
            <Initials name={post.author.name} />
            <span className="text-[14px] font-medium text-ink/80">{post.author.name}</span>
          </span>
          <span className="flex items-center gap-2 font-display text-[14px] font-medium">
            Read <Arrow />
          </span>
        </div>
      </div>
    </Link>
  );
}
