import Image from "next/image";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

/**
 * Investor logos, official artwork in /public/investors (sources in the R6 report).
 * Rendered monochrome (light on the dark block). Each logo is sized by area rather than
 * height (k = optical correction for thin or heavy marks), so long wordmarks and compact marks read at the same optical weight.
 */
const LOGOS = [
  { name: "SoftBank", src: "/investors/softbank.svg", ar: 425.2 / 99.76, k: 1.3 },
  { name: "General Catalyst", src: "/investors/general-catalyst.svg", ar: 312 / 40, k: 1.15 },
  { name: "Greycroft", src: "/investors/greycroft.svg", ar: 146 / 32.07, k: 1 },
  { name: "MUFG", src: "/investors/mufg.svg", ar: 308 / 73, k: 1 },
  { name: "Rose Park Advisors", src: "/investors/rose-park-advisors.svg", ar: 134 / 34, k: 1.35 },
  { name: "LSEG", src: "/investors/lseg.svg", ar: 120 / 48, k: 0.95 },
  { name: "QUICK", src: "/investors/quick.svg", ar: 162 / 48, k: 0.9 },
  { name: "Interactive Brokers", src: "/investors/interactive-brokers.svg", ar: 452 / 69, k: 1.15 },
] as const;

const AREA = 2600; // px² per logo at desktop size

export function Investors() {
  return (
    <Stagger as="ul" className="grid grid-cols-2 border-t border-white/20">
      {LOGOS.map((l) => {
        const h = Math.round(Math.sqrt((AREA * l.k) / l.ar));
        const w = Math.round(h * l.ar);
        return (
          <StaggerItem as="li" key={l.name} className="flex h-24 items-center border-b border-white/20 pr-4 odd:border-r even:pl-6 md:h-32 md:even:pl-8">
            <Image
              src={l.src}
              alt={l.name}
              width={w}
              height={h}
              unoptimized
              className="max-w-full origin-left scale-[0.8] opacity-85 [filter:brightness(0)_invert(1)] md:scale-100"
              style={{ width: w, height: "auto" }}
            />
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
