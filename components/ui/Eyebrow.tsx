import clsx from "clsx";
import Link from "next/link";

/** Mono UI-role eyebrow. Pass `trail` for breadcrumb eyebrows, e.g. ["Product", "Alfred"]. */
export function Eyebrow({
  children,
  trail,
  className,
  dot = true,
}: {
  children?: React.ReactNode;
  trail?: { label: string; href?: string }[];
  className?: string;
  dot?: boolean;
}) {
  return (
    <p className={clsx("t-ui flex items-center gap-2 opacity-80", className)}>
      {dot && <span className="inline-block h-[6px] w-[6px] rounded-full bg-current opacity-70" aria-hidden="true" />}
      {trail ? (
        <span className="flex items-center gap-2">
          {trail.map((t, i) => (
            <span key={t.label} className="flex items-center gap-2">
              {i > 0 && <span className="opacity-40">/</span>}
              {t.href ? (
                <Link href={t.href} className="hover:underline">
                  {t.label}
                </Link>
              ) : (
                <span aria-current={i === trail.length - 1 ? "page" : undefined}>{t.label}</span>
              )}
            </span>
          ))}
        </span>
      ) : (
        children
      )}
    </p>
  );
}
