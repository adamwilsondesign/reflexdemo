import Image from "next/image";
import clsx from "clsx";
import { PrecisionIcon } from "@/components/ui/PrecisionIcon";
import type { BlogPost } from "@/lib/blog";

/** Small deterministic hash so each post gets a stable composition. */
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const FIELD: Record<"lake" | "pine" | "ink", string> = {
  lake: "field-lake",
  pine: "field-pine",
  ink: "field-ink",
};

/**
 * Article cover: an abstract photograph (light, stone, water, architecture) or a brand
 * colour field, with a white precision icon overlaid. No AI-generated imagery.
 * Hover motion is driven by a parent `group`.
 */
export function BlogCover({
  post,
  size = "md",
  className,
  sizes = "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw",
  priority = false,
}: {
  post: Pick<BlogPost, "slug" | "cover" | "category">;
  size?: "sm" | "md" | "lg";
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const { cover } = post;
  const h = hash(post.slug);
  const isField = cover.kind === "field";
  // Fields centre a large icon; photographs anchor a smaller icon to a corner.
  const pos = isField ? (h % 2 === 0 ? "center" : "offset") : h % 2 === 0 ? "bl" : "tr";
  const iconSize =
    size === "lg"
      ? isField ? "h-28 w-28 md:h-40 md:w-40" : "h-14 w-14 md:h-20 md:w-20"
      : size === "sm"
        ? isField ? "h-12 w-12" : "h-8 w-8"
        : isField ? "h-16 w-16 md:h-20 md:w-20" : "h-10 w-10 md:h-12 md:w-12";

  return (
    <div className={clsx("grain relative isolate overflow-hidden bg-ink", isField && FIELD[cover.field], className)}>
      {cover.kind === "photo" && (
        <>
          <Image
            src={cover.src}
            alt=""
            fill
            priority={priority}
            sizes={sizes}
            className="-z-10 object-cover saturate-[0.8]"
          />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-ink/55 via-ink/10 to-ink/5" />
        </>
      )}
      {isField && (
        <>
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-chart-dark opacity-80"
            style={{ maskImage: "radial-gradient(70% 70% at 50% 50%, #000 10%, transparent 75%)", WebkitMaskImage: "radial-gradient(70% 70% at 50% 50%, #000 10%, transparent 75%)" }}
          />
          <div className="pointer-events-none absolute -right-[20%] -top-[30%] -z-10 h-[90%] w-[70%] rounded-full bg-white/10 blur-3xl" />
        </>
      )}


      <div
        className={clsx(
          "absolute flex text-white",
          pos === "center" && "inset-0 items-center justify-center",
          pos === "offset" && "inset-0 items-center justify-end pr-[16%]",
          pos === "bl" && "bottom-6 left-6 md:bottom-7 md:left-7",
          pos === "tr" && "right-6 top-6 md:right-7 md:top-7",
        )}
      >
        <PrecisionIcon
          name={cover.icon}
          className={clsx(iconSize, "drop-shadow-[0_2px_12px_rgb(0_0_0/0.25)]")}
        />
      </div>
    </div>
  );
}
