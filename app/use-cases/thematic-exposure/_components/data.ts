/* Illustrative Industrial Automation theme data (scores are for demonstration). */

export type Tier = "Core" | "Less obvious" | "Risk";
export type Constituent = {
  name: string;
  ticker: string;
  role: string;
  tier: Tier;
  score: number;
  path: string[];
  why: string;
  evidence: { text: string; source: string }[];
  breakdown: { revenue: number; evidence: number; recency: number };
};

export const THEME = "Industrial Automation";

export const CONSTITUENTS: Constituent[] = [
  {
    name: "Rockwell Automation",
    ticker: "ROK",
    role: "Factory automation and control",
    tier: "Core",
    score: 0.93,
    path: ["Industrial Automation", "Factory control systems", "Rockwell Automation"],
    why: "Its core segments sell automation hardware, software and control systems.",
    evidence: [
      { text: "Segment reporting: Intelligent Devices, Software & Control, Lifecycle Services", source: "Annual report · 10-K" },
      { text: "Management cites automation orders as the primary demand driver", source: "Earnings call transcript" },
    ],
    breakdown: { revenue: 0.95, evidence: 0.92, recency: 0.9 },
  },
  {
    name: "Fanuc",
    ticker: "6954",
    role: "Industrial robots and CNC",
    tier: "Core",
    score: 0.91,
    path: ["Industrial Automation", "Robotics", "Fanuc"],
    why: "Robots and factory automation make up most of its revenue.",
    evidence: [
      { text: "Robot and factory automation divisions reported separately", source: "Annual report" },
      { text: "Order commentary tied to automotive and electronics capex", source: "Results presentation" },
    ],
    breakdown: { revenue: 0.94, evidence: 0.88, recency: 0.86 },
  },
  {
    name: "Keyence",
    ticker: "6861",
    role: "Factory sensors and machine vision",
    tier: "Core",
    score: 0.86,
    path: ["Industrial Automation", "Sensing and vision", "Keyence"],
    why: "Sensors, measurement and vision systems used on automated lines.",
    evidence: [{ text: "Product lines: sensors, machine vision, measurement instruments", source: "Annual report" }],
    breakdown: { revenue: 0.9, evidence: 0.8, recency: 0.84 },
  },
  {
    name: "Teradyne",
    ticker: "TER",
    role: "Collaborative robots",
    tier: "Less obvious",
    score: 0.58,
    path: ["Industrial Automation", "Robotics", "Collaborative robots", "Teradyne"],
    why: "Known for semiconductor test, but its robotics segment builds collaborative and mobile robots.",
    evidence: [
      { text: "Robotics segment includes Universal Robots and Mobile Industrial Robots", source: "Annual report · 10-K" },
      { text: "Robotics revenue disclosed as a separate segment", source: "Quarterly filing · 10-Q" },
    ],
    breakdown: { revenue: 0.35, evidence: 0.86, recency: 0.78 },
  },
  {
    name: "Harmonic Drive Systems",
    ticker: "6324",
    role: "Precision gears in robot joints",
    tier: "Less obvious",
    score: 0.66,
    path: ["Industrial Automation", "Robotics", "Robot joints", "Harmonic Drive Systems"],
    why: "A supplier one step back: strain-wave gears that sit inside robot arms.",
    evidence: [
      { text: "Strain-wave gearing sold to industrial robot manufacturers", source: "Annual report" },
      { text: "Orders linked to robot production volumes", source: "Results briefing" },
    ],
    breakdown: { revenue: 0.72, evidence: 0.64, recency: 0.6 },
  },
  {
    name: "Cognex",
    ticker: "CGNX",
    role: "Machine vision on production lines",
    tier: "Less obvious",
    score: 0.71,
    path: ["Industrial Automation", "Sensing and vision", "Cognex"],
    why: "Vision systems that inspect and guide automated production and logistics.",
    evidence: [{ text: "Machine vision products for factory and logistics automation", source: "Annual report · 10-K" }],
    breakdown: { revenue: 0.85, evidence: 0.62, recency: 0.66 },
  },
  {
    name: "Eaton",
    ticker: "ETN",
    role: "Power distribution for automated plants",
    tier: "Less obvious",
    score: 0.46,
    path: ["Industrial Automation", "Energy · cost pressure", "Electrical equipment", "Eaton"],
    why: "Second-order: higher input costs push automation, and automated plants need more power equipment.",
    evidence: [
      { text: "Electrical segment sells into industrial and manufacturing end markets", source: "Annual report · 10-K" },
      { text: "Insight: higher input costs increase automation exposure", source: "Reflexivity Insight" },
    ],
    breakdown: { revenue: 0.3, evidence: 0.6, recency: 0.72 },
  },
  {
    name: "ManpowerGroup",
    ticker: "MAN",
    role: "Light-industrial staffing",
    tier: "Risk",
    score: 0.42,
    path: ["Industrial Automation", "Labour substitution", "ManpowerGroup"],
    why: "Exposed, but as a risk: automation can substitute for light-industrial staffing demand.",
    evidence: [
      { text: "Manufacturing and industrial clients are a significant share of revenue", source: "Annual report · 10-K" },
      { text: "Management discusses automation as a structural factor in demand", source: "Earnings call transcript" },
    ],
    breakdown: { revenue: 0.5, evidence: 0.48, recency: 0.4 },
  },
];

export const RELATED_THEMES = [
  { name: "Robotics", sub: "End market" },
  { name: "Energy", sub: "Cost pressure" },
  { name: "Reshoring", sub: "Domestic production" },
];
