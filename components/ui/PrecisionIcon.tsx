import clsx from "clsx";

/**
 * "Precision" iconography from the brand system. Source PNGs are single-colour line glyphs,
 * rendered through CSS masks so they inherit `currentColor` on any surface.
 */
export const ICONS = {
  rings: "rings.png",
  signal: "signal.png",
  lattice: "lattice.png",
  knot: "knot.png",
  orbit: "orbit.png",
  triad: "triad.png",
  petals: "petals.png",
  atom: "atom.png",
  pentagon: "pentagon.png",
  crosshair: "crosshair.png",
  eye: "eye.png",
  loop: "loop.png",
  star: "star.png",
  path: "path.png",
  stack: "stack.png",
  venn: "venn.png",
  chain: "chain.png",
  cube: "cube.png",
} as const;

export type IconName = keyof typeof ICONS;

export function PrecisionIcon({ name, className, label }: { name: IconName; className?: string; label?: string }) {
  const url = `/icons/${ICONS[name]}`;
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={clsx("inline-block bg-current", className ?? "h-10 w-10")}
      style={{
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
