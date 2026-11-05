/** Cartography chart names + deterministic picker (server-safe; no client code). */
export const VIZ_NAMES = ["flow", "radial", "branch", "exposure", "fan", "signal", "wave", "orbit"] as const;
export type VizName = (typeof VIZ_NAMES)[number];

export function vizFor(seed: string, pool: readonly VizName[] = ["flow", "wave", "orbit", "radial", "branch", "exposure"]): VizName {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return pool[h % pool.length];
}
