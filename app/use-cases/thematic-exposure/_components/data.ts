/* Illustrative Industrial Automation theme data (from our existing worked example; values are for demonstration). */

export const THEME = "Industrial Automation";

/** Hero: the obvious names first, then the ones a sector screen misses. */
export const TIERS = [
  {
    label: "Core exposure",
    rows: [
      { name: "Rockwell Automation", score: "0.93" },
      { name: "Fanuc", score: "0.91" },
      { name: "Keyence", score: "0.86" },
    ],
  },
  {
    label: "Less obvious",
    rows: [
      { name: "Cognex, machine vision", score: "0.71" },
      { name: "Harmonic Drive, robot joints", score: "0.66" },
      { name: "Teradyne, cobots", score: "0.58" },
    ],
  },
  {
    label: "Second-order",
    rows: [
      { name: "Eaton, plant power", score: "0.46" },
      { name: "ManpowerGroup, staffing", score: "Risk · 0.42" },
    ],
  },
] as const;

/** Theme page: the four blocks from the Figma showcase, filled with Industrial Automation content. */
export const THEME_VIEWS = [
  {
    title: "Tailwinds",
    rows: [
      { label: "Higher input costs push automation", value: "Energy" },
      { label: "Production moves closer to home", value: "Reshoring" },
      { label: "Skilled labour stays scarce", value: "Labour" },
    ],
  },
  {
    title: "Headwinds",
    rows: [
      { label: "Factory orders soften", value: "PMI" },
      { label: "Higher rates delay capex", value: "Rates" },
      { label: "Automotive programmes slip", value: "Autos" },
    ],
  },
  {
    title: "Big movers",
    rows: [
      { label: "Cognex", value: "+6.2%" },
      { label: "Rockwell Automation", value: "+3.4%" },
      { label: "Teradyne", value: "−2.1%" },
    ],
  },
  {
    title: "Related themes",
    rows: [
      { label: "Robotics", value: "End market" },
      { label: "Energy", value: "Cost pressure" },
      { label: "Reshoring", value: "Domestic production" },
    ],
  },
] as const;
