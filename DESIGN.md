# Reflexivity site — design & build guide

POC redesign of the Reflexivity marketing site (Framer WIP: https://adaptable-elements-804586.framer.app/).
Next.js 16 (App Router) · React 19 · Tailwind v4 · `motion` (Framer Motion) · Lenis smooth scroll.

> Next 16 note: dynamic route `params` is a **Promise** — `export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; }`. Same for `generateMetadata`.

## Sources of truth (in `content/_scraped/`)
1. `IA_content_map.txt` — client IA + copy. **Where copy is fully written in the IA, use it verbatim.**
2. `<page>.md` — copy scraped from the Framer build, page by page. Use it where the IA only gives a concept.
3. `CRO_audit.txt` — CRO + narrative audit. Apply its recommendations where the IA is silent: precise claims, no placeholders, consistent vocabulary, contextual links, trust cues.

Never ship placeholders ("Supporting line", "graphic coming soon", "data feds", "Earning Insights").
Avoid absolute claims ("every claim", "zero hallucination", "real-time" as a blanket). Prefer "cited by default", "flags missing data", etc.
Reflexivity = the platform. Alfred = its AI analyst. Knowledge Graph = the relationship-intelligence layer. Insights = always-on monitoring.

## Art direction — "Market Cartography" (agreed)
Unified, considered, enterprise-grade. Take from the cartography boards:
- **Big colour blocks** — Pine `#3E5C50` (`surface="pine"`) is the signature block; lake-900 (deep blue), ink (charcoal), paper/mist for light. Blocks **blend into each other** (no hard edges): the colour-seam system (`components/site/ScrollField.tsx`) paints a gradient in the incoming block's top padding. Every top-level block must carry `data-bg` + `data-tone` (`Section`, `SplitFeature`, `PageHero` do this). Don't stack identical dark blocks; alternate light/dark.
- **Abstract, animated faux data-viz** to explain concepts (`@/components/graphics/Cartography`): `RadialSystem` (a market as a system), `ExposurePolar` (weighted exposure), `BranchLines` (a question branching to evidence), `FlowLines` (signals routing), `ScenarioFan` (distribution of outcomes), `SignalField` (series + event marker). Thin lines, nodes, slow motion.
- **50/50 layouts** (`@/components/ui/Layouts`): `SplitFeature` (copy | viz on a colour block), `LinkRowsBlock` / `LinkRows` (headline | rows with ↗), `TwoWays` (two columns on a dotted rule), `TextLink` (underlined link with ↗).
- **Do not use**: big photography, topographic maps, huge number callouts (stats max ~40px), huge type callouts, corner framing lines on cards, numbered decorative eyebrows.

## Brand
- Colours: `paper #F4F3F1`, `ink #17191C`, `graphite`, mist scale; accents **pine** (`pine-500 #3E5C50` block colour) and **lake** (`lake-900 #243244`). Muted, never bright.
- **Type (Typography Draft 1)** — Archivo + Source Serif 4. No other faces (code samples use the system monospace automatically inside `pre`/`code`).
  | Role | Face | Class |
  |---|---|---|
  | Display 56–72 | Archivo Bold | `t-display`, `t-h1` |
  | Heading 24–40 | Archivo Semibold | `t-h2`, `t-h3` |
  | Statement 22–28 | Source Serif 4 | `t-statement` (pull quotes, testimonials, big leads) |
  | Body 16–18 | Source Serif 4 | `t-lead`, `t-body`, `t-small` |
  | Label / UI 12–14 | Archivo Medium | `t-ui` (uppercase), `t-label` |
  Rules: Archivo for headings, buttons, labels, nav, and product-UI mockups. Source Serif 4 for paragraphs and quotes. **Never** Archivo for long paragraphs; **never** serif on buttons/nav. One voice per line. Quotes use the serif.

## Component rules
- **Eyebrows only in heroes.** No eyebrow/kicker labels above section headings or card titles anywhere else (`SectionHeader` ignores `eyebrow`). Labels *inside product UI mockups* are fine; "Illustrative" disclaimers go below a visual, not above a heading.
- **Headline + subhead ≤ half the desktop grid** (6 of 12 cols). `SectionHeader` enforces it; `align="split"` = headline left half / subhead right half.
- **Icon + copy cards: one pattern** — `FeatureGrid` / `IconCard` from `Blocks` (hairline grid, hover = background tint only).
- **No hover movement**: cards never shift, lift or scale on hover; icons never rotate. Hover = colour/tint, underline, arrow nudge only.

## Layout
- `container-x` = max 1440 with 112px gutters at desktop (matches Framer).
- Sections: `<Section surface="paper|mist|white|ink|graphite|lake|pine">`. Surface sets `data-tone`; the header reads it and inverts (dark nav over light sections, light nav over dark ones). Any custom full-width block must set `data-tone="light|dark"`.
- Alternate surfaces for rhythm: paper → lake/ink → paper → mist… Don't stack two identical dark surfaces.
- Desktop and mobile both matter. Check 390px and 1440px. No horizontal scroll.

## Components (import, don't re-create)
| Import | Use |
|---|---|
| `@/components/ui/PageHero` `PageHero` | Inner-page hero: `trail`, `title`, `lead`, `visual`, `layout="split|stacked|text"`, `surface`, `secondary` CTA |
| `@/components/ui/Section` `Section, Container, SectionHeader` | Section shell + animated header (`align="left|center|split"`) |
| `@/components/ui/Button` `Button, DemoActions, Arrow` | CTAs. Primary label is always **"Request a Demo"** → `/book-a-demo` |
| `@/components/ui/Reveal` `Reveal, Stagger, StaggerItem` | Scroll reveals |
| `@/components/ui/SplitText` | Word-rise headings |
| `@/components/ui/AutoTabs` | Auto-advancing "states" (list + crossfading visual) — the Figma state boards |
| `@/components/ui/Accordion` | FAQ |
| `@/components/ui/Blocks` `CTABand, Testimonials, FeatureGrid, LinkCard, StatRow, Steps, TESTIMONIALS` | Common blocks. Every page ends with `CTABand` |
| `@/components/ui/PrecisionIcon` | Brand icons via CSS mask: rings, signal, lattice, knot, orbit, triad, petals, atom, pentagon, crosshair, eye, loop, star, path, stack, venn, chain, cube |
| `@/components/ui/LogoStrip` `DataSourceLogos, WordmarkStrip, Marquee` | Data-source logos (label as data/content sources — never as customers) |
| `@/components/ui/CountUp` | Animated metrics |
| `@/components/graphics/KnowledgeGraph` | Interactive canvas graph (`tone`, `sequence` of node ids, `focus` controlled) |
| `@/components/graphics/RippleRings` `RippleRings, PropagationField` | Line-art illustration |
| `@/components/product/ui` | Coded product UI kit: `Stage` (gradient field), `PromptCard`, `CardHeader`, `Pill`, `Cite`, `SourceRow`, `MissingData`, `CodeBlock`, `Sparkline`, `series`, `ImpactPathway`, `StepList`, `MetricRow`, `TakeawayList`, `AlfredGlyph`, `useTypewriter` |
| `@/components/product/visuals` | Composite visuals: `InsightStream`, `AuditTrace`, `InsightAnatomy`, `DailyBrief`, `ScrollStory` |
| `@/components/product/HeroWorkflow` | Homepage hero sequence |

Product mock references (Figma exports) live in `public/figma/n*.png` — use them as **reference** for coded UI; they may be used directly as images inside a `Stage` when coding is impractical. Abstract photography and logos from the Framer build are in `public/framer/` (see `content/_scraped/*.md` for which page used which).

## Motion
- Ease: `[0.16, 1, 0.3, 1]` (expo out). Durations 0.6–1.2s. Stagger 0.05–0.1s.
- Heroes animate on mount; sections reveal on scroll once. Product visuals loop subtly while in view and pause off-screen.
- Always respect `useReducedMotion()` — content must be fully visible with reduced motion or no JS.

## Conversion
- One primary action everywhere: **Request a Demo** (`/book-a-demo`). Add page-context secondary actions (e.g. "Explore deployment options").
- Demo form is front-end only (validates, routes to `/thank-you`). Newsletter is separate (footer).

## Page file conventions
- Route: `app/<route>/page.tsx` exporting `metadata` (unique title + description).
- Page-specific components: `app/<route>/_components/*.tsx` (client components need `"use client"`).
- Don't edit shared components; if you need a variant, build it in your page's `_components`.
