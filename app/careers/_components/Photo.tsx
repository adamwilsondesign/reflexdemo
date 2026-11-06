import Image from "next/image";
import clsx from "clsx";

/**
 * Right-half photograph for the careers 50/50 blocks. Abstract architecture only
 * (no people, offices or skylines). Static: no parallax, no hover movement.
 */
export function Photo({ src, className, priority = false, pos = "50% 50%" }: { src: string; className?: string; priority?: boolean; pos?: string }) {
  return (
    <div className={clsx("relative w-full overflow-hidden rounded-[18px] bg-mist-200", className)}>
      <Image src={src} alt="" fill priority={priority} sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" style={{ objectPosition: pos }} />
    </div>
  );
}
