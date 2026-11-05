/* AUTO-GENERATED from content/_scraped/blog__*.md by the blog conversion script.
   Article text is verbatim from the Framer build; headings, lists, figures and quotes are structured.
   Covers are abstract compositions (no AI-generated imagery). Edit freely; this file is the source now. */

import type { IconName } from "@/components/ui/PrecisionIcon";

export type BlogCategory = "Perspectives" | "Product" | "Research";
export const BLOG_CATEGORIES: BlogCategory[] = ["Perspectives", "Product", "Research"];

export type ListItem = { lead?: string; text: string };
export type Block =
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string; id: string }
  | { type: "p"; text: string }
  | { type: "list"; items: ListItem[] }
  | { type: "quote"; text: string; variant: "block" | "pull"; decorative?: boolean }
  | { type: "image"; src: string; width: number; height: number; alt: string; caption?: string };

export type BlogCover =
  | { kind: "photo"; src: string; icon: IconName }
  | { kind: "field"; field: "lake" | "pine" | "ink"; icon: IconName };

export type BlogAuthor = { name: string; role?: string; bio?: string };

export type BlogPost = {
  slug: string;
  title: string;
  /** ISO date */
  date: string;
  author: BlogAuthor;
  category: BlogCategory;
  excerpt: string;
  /** Standfirst shown under the title, when the article has one */
  dek?: string;
  /** minutes, computed at ~230 wpm */
  readingTime: number;
  featured?: boolean;
  cover: BlogCover;
  body: Block[];
};

export const POSTS: BlogPost[] = [
  {
    "slug": "the-sharpe-ratio",
    "title": "Better Sharpe Ratio is a plumbing problem",
    "date": "2026-04-29",
    "author": {
      "name": "Jan Szilagyi",
      "role": "Chief Executive Officer",
      "bio": "Former Co-CIO at Lombard Odier, PM at Fortress. World record for fastest Harvard Economics PhD."
    },
    "category": "Research",
    "excerpt": "Why investment returns are ultimately governed less by the quality of the trades an investor finds, and more by the number of times they can afford to place one.",
    "dek": "Why investment returns are ultimately governed less by the quality of the trades an investor finds, and more by the number of times they can afford to place one.",
    "readingTime": 4,
    "featured": true,
    "cover": {
      "kind": "photo",
      "icon": "loop",
      "src": "/framer/Dk8ba2iUYmPKCJUiXcWnhz5CnQ.jpg"
    },
    "body": [
      {
        "type": "p",
        "text": "Imagine I offer you a game."
      },
      {
        "type": "p",
        "text": "You pay 50 cents to flip a fair coin. Heads, you get $1.50. Tails, you get nothing. That is a 50% expected return, which is obscene. People have started wars over less attractive economics."
      },
      {
        "type": "p",
        "text": "But if I only let you play once, there is a 50% chance you walk away broke."
      },
      {
        "type": "p",
        "text": "Now imagine I let you play 100 times."
      },
      {
        "type": "p",
        "text": "Your expected return per flip is still 50%. Nothing has changed about the quality of the bet. But the probability of ruin (of flipping tails 100 times in a row) is 0.5^100, a number so small the universe would get bored and collapse before you finished writing it out."
      },
      {
        "type": "p",
        "text": "The mean hasn't moved, but the tails have been pruned. Same coin. Same odds. Radically different outcome, just because you flipped it more."
      },
      {
        "type": "h2",
        "text": "Same edge, more bets, higher Sharpe",
        "id": "same-edge-more-bets-higher-sharpe"
      },
      {
        "type": "p",
        "text": "This is, I think, under-appreciated in the business of running money."
      },
      {
        "type": "p",
        "text": "People talk endlessly about finding better trades - better coins. They talk much less about the infrastructure that determines how many times you get to flip. But the Sharpe ratio does not care about this distinction. It is roughly your expected return divided by the volatility of that return, and the math is relentlessly clear: same edge, more bets, higher Sharpe. Not because you got smarter. Just because you did it more."
      },
      {
        "type": "p",
        "text": "This is, incidentally, the entire secret of Renaissance Technologies."
      },
      {
        "type": "quote",
        "text": "Jim Simons did not find a magic coin. He built a machine that could flip one thousands of times a day.",
        "variant": "block"
      },
      {
        "type": "h2",
        "text": "The cost of curiosity",
        "id": "the-cost-of-curiosity"
      },
      {
        "type": "p",
        "text": "So what determines how many times you flip?"
      },
      {
        "type": "p",
        "text": "For most fundamental investors, it is the cost of curiosity."
      },
      {
        "type": "p",
        "text": "An investor reads something interesting about, say, the relationship between container shipping rates and semiconductor inventories. She thinks: huh, I wonder if that is true, and if so, whether it is priced in. What happens next is the part nobody romanticizes."
      },
      {
        "type": "p",
        "text": "She needs data from multiple providers, in different formats, with different quirks. She needs to figure out if these data sets even describe the same universe. Then she has to clean everything, merge it, model it, and debug the model when it breaks."
      },
      {
        "type": "p",
        "text": "This takes weeks, and the whole time she doesn't know if the question was worth asking."
      },
      {
        "type": "p",
        "text": "The cost of curiosity is not just high. It is front-loaded. You pay the full price before learning if there was anything to find."
      },
      {
        "type": "p",
        "text": "This is the bottleneck. Not \"what do I think\" but \"can I afford to find out.\""
      },
      {
        "type": "p",
        "text": "So the curiosity dies on the vine. She does her 10 trades a year. They are good trades. But she walked past 90 others that might have been just as good, because the data work was too expensive."
      },
      {
        "type": "p",
        "text": "She is the person flipping the coin 10 times when she could have been flipping it 100."
      },
      {
        "type": "h2",
        "text": "What we’re building at Reflexivity",
        "id": "what-were-building-at-reflexivity"
      },
      {
        "type": "p",
        "text": "I want to be precise about the claim. The claim is not \"we make investors smarter.\" The claim is \"we make it radically cheaper to be curious.\""
      },
      {
        "type": "p",
        "text": "Most approaches to making data easier give you a chatbot on top of a database. You ask a question, it writes a SQL query, and maybe the answer is what you wanted. But this fails when the investor doesn't yet know what to ask. When the question requires understanding that shipping rates from Provider A and inventory data from Provider B are talking about the same supply chain from different angles, using different taxonomies."
      },
      {
        "type": "p",
        "text": "This is what Reflexivity's Knowledge Graph solves. A Knowledge Graph doesn't just store data. It stores relationships between data."
      },
      {
        "type": "p",
        "text": "It knows that Company X is a subsidiary of Company Y, a customer of Company Z, which ships through Port A. The relationships are first-class citizens, not afterthoughts."
      },
      {
        "type": "p",
        "text": "So when our investor wonders how shipping rates connect to chip inventories, it is not a data engineering project. It is a query."
      },
      {
        "type": "p",
        "text": "But a map without a guide is just a poster."
      },
      {
        "type": "p",
        "text": "Reflexivity's reasoning engine is the thing that takes a loosely formed question, navigates the graph, and comes back not just with data but with analysis and, often, with three related questions the investor should have asked but didn't. The Knowledge Graph makes the data connectable. The reasoning engine makes it navigable. Together, they collapse the cost of curiosity from weeks to minutes."
      },
      {
        "type": "p",
        "text": "And that changes the math. Remove the data plumbing constraint and a 10-flip-a-year investor becomes a 100-flip-a-year investor. The edge hasn't changed. The process hasn't changed. But the variance around her expected return has compressed, dramatically, because she expressed that edge enough times for the law of large numbers to show up and do its thing."
      },
      {
        "type": "p",
        "text": "Making data analysis easy is not a productivity story."
      },
      {
        "type": "p",
        "text": "It is a risk-adjusted return story."
      },
      {
        "type": "p",
        "text": "The coin is the same coin. The only thing that changed is how many times you get to flip it."
      }
    ]
  },
  {
    "slug": "ai-decision-making-finance",
    "title": "The Copilot Paradox: Rethinking AI Decision-Making in Finance",
    "date": "2026-04-14",
    "author": {
      "name": "RJ Assaly",
      "role": "Chief Product Officer",
      "bio": "Former Product Lead at Kensho (acquired by S&P Global). Previously AllianceBernstein."
    },
    "category": "Perspectives",
    "excerpt": "The best AI for investment research surfaces what matters, explains why it’s most relevant, and leaves the final call to the user. In finance especially, trust comes from extending human judgement, without taking over the decision.",
    "dek": "The best AI for investment research surfaces what matters, explains why it’s most relevant, and leaves the final call to the user. In finance especially, trust comes from extending human judgement, without taking over the decision.",
    "readingTime": 7,
    "featured": false,
    "cover": {
      "kind": "field",
      "icon": "eye",
      "field": "lake"
    },
    "body": [
      {
        "type": "p",
        "text": "Every AI product eventually encounters a specific moment of failure, and it almost never looks the way you'd expect. The system does something useful, something correct even, and the user's first response is: \"Why did it do that?\""
      },
      {
        "type": "p",
        "text": "That reaction should be celebrated, in theory. The system worked. But in practice it signals something corrosive, a loss of control that, in professional contexts, can be much harder to recover from than a system that simply doesn't do enough. The underpowered tool gets abandoned quietly. The overpowered one gets abandoned with suspicion, and the user carries that suspicion into every future interaction."
      },
      {
        "type": "p",
        "text": "I've been thinking about this problem for a while now, because at Reflexivity we're building AI systems used in investment research by finance professionals who have spent entire careers developing judgment about markets, instruments, and risk. The \"copilot\" framing that the industry has settled on contains a hidden assumption: that the pilot wants help. From what I've seen, the real demand is more precise than help. It's leverage, helping people cut through signal vs noise in investing and focus on what really matters. The consistent request we hear, stated in different ways, is some version of \"help me make more of me,\" make sure I don't miss the thing I would have caught if I had more time, surface the connection I would have drawn if I could watch every market simultaneously. The system should extend the user's judgment without competing with it. That sounds like a simple distinction, but it turns out to be one of the hardest things to get right in product design."
      },
      {
        "type": "p",
        "text": "This makes the design challenge genuinely hard, because the obvious answer (\"just make the AI better\") misses the point entirely."
      },
      {
        "type": "h2",
        "text": "Where AI should stop in the investment research workflow",
        "id": "where-ai-should-stop-in-the-investment-research-workflow"
      },
      {
        "type": "p",
        "text": "What we've found works, and I suspect this generalizes well beyond finance, is a default flow with a clear stopping point. When the system surfaces an insight, it moves through a sequence: here is what happened, here is why it matters to you specifically, here is the range of possible outcomes from here, and here is how you could express a view on it. Then it stops. The system does not recommend a specific trade, a specific structure, or a specific position size unless the user explicitly asks."
      },
      {
        "type": "p",
        "text": "That \"why it matters to you\" step is worth pausing on, because early users actually demanded it. The most common piece of feedback we got on alerts was \"why am I seeing this?\" People wanted the system to interpret relevance, to say \"you own Lockheed, which has exposure to drone technology, and this is a regulatory development affecting drones.\" What they didn't want, and reacted strongly against in early prototypes, was the system telling them what to do about it. I've written before about how natural language and point-and-click interfaces serve different moments in a workflow. This is the deeper question underneath that: not just which mode the user is in, but who is driving."
      },
      {
        "type": "p",
        "text": "The distinction sounds simple when you state it plainly. Interpret for me, but don't act for me. In practice, finding exactly where interpretation ends and action begins is one of the harder design problems we've dealt with."
      },
      {
        "type": "h2",
        "text": "The Betty Crocker problem",
        "id": "the-betty-crocker-problem"
      },
      {
        "type": "p",
        "text": "There's a famous story from the 1950s about Betty Crocker cake mixes. The original formula included powdered eggs, so all you had to do was add water. It flopped. When they reformulated to require cracking a real egg, sales took off. The explanation most people give is psychological: people needed to feel like they were baking, even if the egg didn't meaningfully change the cake."
      },
      {
        "type": "p",
        "text": "The parallel to AI-assisted professional work is strong, but messier than most people acknowledge. Sometimes the eggs are symbolic. The system could have gotten to the right answer, but the user needs ownership of the decision for it to feel legitimate. From what I've seen, this is especially true in portfolio construction, where the analytical path to a conclusion matters almost as much as the conclusion itself, because the analyst needs to be able to defend it to a PM or a client."
      },
      {
        "type": "p",
        "text": "But sometimes the eggs are real. Consider someone receiving an alert that the Chilean peso is likely to devalue against the dollar. The number of ways to express that view is enormous: you could trade spot, you could trade forwards, you could look at cross-currency basis swaps, you could move into options. The right structure depends on things the system genuinely cannot know, like your existing book, your risk appetite, whether your mandate allows exotic instruments, what your counterparty relationships look like. No amount of model intelligence closes that gap, because the information lives in the user's head and in systems the AI doesn't have access to."
      },
      {
        "type": "p",
        "text": "What convinced me that this framing is important is that both versions are true simultaneously, and the system has to handle the ambiguity gracefully. You can't design for one and ignore the other. If you assume the eggs are always symbolic, you'll condescend to users by withholding capabilities the system actually has. If you assume they're always real, you'll under-invest in the parts of the workflow where the system could genuinely do more."
      },
      {
        "type": "h2",
        "text": "Why over-doing is worse than under-doing",
        "id": "why-over-doing-is-worse-than-under-doing"
      },
      {
        "type": "p",
        "text": "The two failure modes, doing too little and doing too much, sound symmetrical but they aren't. When a system does too little, the user is annoyed, maybe frustrated, but they remain in control. The cost is adoption: they use the tool less, or stop using it entirely. That's a product problem, a serious one, but it's recoverable."
      },
      {
        "type": "p",
        "text": "When a system does too much, especially if it does the right thing in a way the user doesn't understand, the damage is different in kind. It introduces doubt about every prior output. If it made this decision without me, what other decisions has it been making? In finance, where a single wrong number or wrong instrument can have real consequences, that doubt is corrosive. My intuition is that one episode of unexplained autonomy costs more trust than a dozen episodes of the system being too conservative."
      },
      {
        "type": "p",
        "text": "This asymmetry has a practical implication for how we think about recommendations. When a user does ask \"what would you recommend?\", the conversation should feel collaborative, not declarative. The system suggests a structure, the user pushes back or asks about alternatives, the system adjusts. The recommendation emerges from the exchange rather than being handed down. This takes more time and more tokens than simply outputting an answer, but the adoption difference is significant."
      },
      {
        "type": "h2",
        "text": "What actually matters for trust",
        "id": "what-actually-matters-for-trust"
      },
      {
        "type": "p",
        "text": "I keep coming back to a formulation that I think captures most of what we've learned: users will accept a surprising amount of intelligence from a system, including interpreting why something matters and mapping out complex scenario trees, as long as they retain the feeling of authorship over the decision. This is especially applicable in a financial context where they’re accountable for the outcome. The line people draw in their heads has less to do with what the system knows and more to do with what it does. Knowledge is welcomed. Action without invitation is not."
      },
      {
        "type": "p",
        "text": "There's a related point about explanation that matters here. When the system does surface something for the user's input, the quality of the ask matters enormously. \"Do you want to proceed?\" is empty friction, it doesn't tell you what you're proceeding with or why the system paused. \"I'm seeing three possible structures for this view, each with different risk profiles, want me to walk through them?\" gives the user a reason to engage. The difference looks small in a product spec, but in practice it's the difference between a system that feels like it's deferring to you and one that feels like it's dumping decisions on you because it doesn't know what to do."
      },
      {
        "type": "p",
        "text": "As the system gets to know a user over time (through their watchlists, the countries and themes they follow, the work they do within the platform) the autonomy can expand naturally. We're early in this, but the trajectory is clear: a system that has watched you engage with dozens of alerts about Latin American FX and has seen the structures you tend to favor should be able to move further along the interpretation-to-action spectrum than one encountering you for the first time. The trust earns itself, if you've been careful not to break it early on."
      },
      {
        "type": "h2",
        "text": "The Takeaway",
        "id": "the-takeaway"
      },
      {
        "type": "quote",
        "text": "The best AI systems win by stopping at the right moment.",
        "variant": "pull"
      },
      {
        "type": "p",
        "text": "In investment research users will accept a surprising amount of intelligence as long as they remain the author of the decision. The role of AI is to expand what they can see, surface what matters, and help them cut through signal vs noise in investing."
      },
      {
        "type": "p",
        "text": "Push beyond that, and it stops feeling like leverage."
      }
    ]
  },
  {
    "slug": "the-model-upgrade-problem",
    "title": "The Model Upgrade Problem",
    "date": "2026-03-19",
    "author": {
      "name": "RJ Assaly",
      "role": "Chief Product Officer",
      "bio": "Former Product Lead at Kensho (acquired by S&P Global). Previously AllianceBernstein."
    },
    "category": "Perspectives",
    "excerpt": "There's an announcement that lands in your inbox every few months, and after a while you start to dread it. \"Model X is being deprecated.",
    "readingTime": 5,
    "featured": false,
    "cover": {
      "kind": "photo",
      "icon": "stack",
      "src": "/framer/0YSwPZaQBlUH7CSqYIAlebekASw.jpg"
    },
    "body": [
      {
        "type": "p",
        "text": "There's an announcement that lands in your inbox every few months, and after a while you start to dread it. \"Model X is being deprecated. You have 60 days.\" The subtext is always the same: drop what you're doing."
      },
      {
        "type": "p",
        "text": "The public narrative around model releases is relentlessly positive. Benchmarks are up, reasoning is sharper, context windows are longer. What nobody talks about is what happens to the teams running production systems on the model that was working just fine, and who now have to stop building in order to keep the lights on."
      },
      {
        "type": "p",
        "text": "The numbers are not subtle. Anthropic alone has issued 6 separate deprecation notices since January 2025, covering 9 distinct models. OpenAI's churn is even more striking: GPT-5, their flagship, was effectively superseded within about three months of release. Google is moving at a similar pace through the Gemini family."
      },
      {
        "type": "quote",
        "text": "Every one of those transitions is an event that lands on somebody's engineering calendar.",
        "variant": "pull"
      },
      {
        "type": "p",
        "text": "At Reflexivity, we've built a proprietary investment analysis platform on top of a knowledge graph that maps relationships across assets, macroeconomic drivers, and market events in real time. Language models power specific components of that system. We have had to re-validate each component with each migration, and the cost compounds across every workflow that depends on consistent model behavior downstream."
      },
      {
        "type": "p",
        "text": "We've absorbed this enough times that it's become a familiar line item. Each migration demands at least one to two person-weeks once you account for standing up test harnesses, auditing for interface-breaking changes, running evals, and assessing whether the new model is steerable in the ways you need it to be. These migrations don't slip client deadlines, so we absorb them by pulling engineers off the features we actually want to build, and what looks like a one-time disruption becomes a recurring tax on the work that would otherwise compound toward something valuable."
      },
      {
        "type": "p",
        "text": "The uncomfortable truth about \"better\" is that it's defined from the provider's perspective. A new model might score higher on benchmarks and still be worse for your specific production use case. We've seen new releases change output formats that downstream code depended on, shift API parameters without clean migration paths, and add prose wrapping around responses that used to be clean and parseable. When a behavior your prompts and evals were built around quietly shifts, you're paying the migration cost regardless of whether the change actually helps you."
      },
      {
        "type": "p",
        "text": "Then there's the pricing dimension, which doesn't get discussed enough. When Anthropic deprecated Haiku 3.5, the direct replacement was Haiku 4.5, a model we found performed worse on our specific workflows, priced 25% higher ($1/$5 per million tokens versus the prior $0.80/$4). In some cases the recommended replacement isn't even a lateral move within the same model tier: Anthropic's deprecation page lists claude-opus-4-6 as the recommended replacement for both Sonnet 3.7 and Haiku 3.5, meaning you're being pushed up a tier (or two) entirely. \"Upgrade\" is doing a lot of work in that framing."
      },
      {
        "type": "p",
        "text": "Steerability is a less-discussed dimension of this. Older models, once tuned with sufficient system prompt investment, could be reliably guided into consistent output behavior. Some newer models are harder to control in practice. They are more opinionated about how they want to respond, more prone to deviating from established patterns. That's not always a regression in aggregate, but it can be a real one for a carefully tuned workflow."
      },
      {
        "type": "p",
        "text": "Why does this keep happening?"
      },
      {
        "type": "p",
        "text": "The incentive structure is straightforward once you see it. Providers need to retire hardware to serve and train the next generation of models. Keeping old models alive indefinitely isn't economically viable for them, and self-hosting deprecated weights isn't an option they allow. So the deprecation cycle is a structural feature of the landscape, not a policy choice you can negotiate around. Anthropic's own deprecation documentation acknowledges the downsides plainly, noting that model retirement \"introduces safety- and model welfare-related risks\" and commits to long-term weight preservation, which is a meaningful acknowledgment, even if it doesn't solve the immediate operational problem."
      },
      {
        "type": "p",
        "text": "There are workarounds, and they're worth naming honestly. Open source models (Llama, Mistral and others) have closed the capability gap enough that for some tasks they're genuinely viable, and running your own weights means nobody can deprecate them on you. Fine-tuning an open source base model takes that further: you can bake your desired output behavior into the weights directly, reducing exposure to the behavioral drift that makes migrations painful in the first place. For teams on AWS or Google Cloud, there's also the option of accessing models through Bedrock or Vertex AI, which have sometimes maintained model availability beyond the original provider's retirement dates."
      },
      {
        "type": "p",
        "text": "What convinces me these are workarounds rather than solutions, though, is that each one trades the original problem for a different cost: self-hosting means you own the infrastructure and reliability burden, fine-tuning is a substantial investment that still doesn't protect you from base model deprecation, and cloud provider timelines are informal and unguaranteed. You've shifted the risk, not eliminated it."
      },
      {
        "type": "p",
        "text": "What would actually help is mostly a mindset shift on the provider side about what \"migration support\" really means. Longer deprecation windows would be a start, since 60 days is often not enough for teams running complex evals across multiple workflows. The more important gap, though, is honest documentation at release time: not benchmark tables, but behavioral diffs that flag output format changes and known regressions relative to the prior version, alongside explicit acknowledgment when the recommended replacement sits in a more expensive tier. The providers who figure out how to make model transitions feel like a service rather than a forced migration will have a genuine differentiator, particularly as more companies move AI into production systems that real work depends on."
      },
      {
        "type": "p",
        "text": "New releases deserve to be celebrated, and the progress across the industry is real. But the operational costs that sit below the benchmark line are just as real, they're accelerating, and right now customers are bearing almost all of them."
      }
    ]
  },
  {
    "slug": "your-ai-remembers-everything-but-learns-nothing",
    "title": "Your AI remembers everything, but learns nothing.",
    "date": "2026-03-11",
    "author": {
      "name": "RJ Assaly",
      "role": "Chief Product Officer",
      "bio": "Former Product Lead at Kensho (acquired by S&P Global). Previously AllianceBernstein."
    },
    "category": "Product",
    "excerpt": "Imagine you hire a junior analyst: sharp, fast, knowledgeable. On Monday, you ask them to run scenario analysis on a position in case SPX drops 15%.",
    "readingTime": 11,
    "featured": false,
    "cover": {
      "kind": "field",
      "icon": "lattice",
      "field": "pine"
    },
    "body": [
      {
        "type": "p",
        "text": "Imagine you hire a junior analyst: sharp, fast, knowledgeable. On Monday, you ask them to run scenario analysis on a position in case SPX drops 15%. They use a simple linear projection and you correct them - \"We use Monte Carlo for this.\" They fix it and it looks correct."
      },
      {
        "type": "p",
        "text": "Tuesday morning, same type of question, same mistake. You correct them again. Wednesday, the same again. By Thursday, you're questioning the hire."
      },
      {
        "type": "p",
        "text": "Now imagine this analyst also forgets your name every morning. Forgets that you cover Latin-American rates. Forgets that when you say \"returns\" you mean vol-adjusted, not beta-adjusted. Every single day, you start from zero."
      },
      {
        "type": "p",
        "text": "You'd fire that analyst inside a week."
      },
      {
        "type": "p",
        "text": "But this is exactly how most AI products work today."
      },
      {
        "type": "h2",
        "text": "The Filing Cabinet",
        "id": "the-filing-cabinet"
      },
      {
        "type": "p",
        "text": "AI memory, as it currently exists, is mostly a filing cabinet. Individual facts, accumulated over time, stored in a flat list with no hierarchy and no structure."
      },
      {
        "type": "p",
        "text": "Here's what this looks like in practice - these are actual memories stored by a leading AI assistant for a sophisticated user:"
      },
      {
        "type": "list",
        "items": [
          {
            "text": "\"User asked about gold futures on January 15\""
          },
          {
            "text": "\"Discussed bond restructuring in last conversation\""
          },
          {
            "text": "\"User's colleague is named Mike\""
          },
          {
            "text": "\"Prefers answers to be in a professional tone\""
          },
          {
            "text": "\"Is an expert in financial markets\""
          },
          {
            "text": "\"Has created an email folder named 'gold'\""
          }
        ]
      },
      {
        "type": "p",
        "text": "Some of these are trivia from a single conversation that will never matter again. Some are genuine preferences… yet they’re all stored the same way: flat, unranked, undifferentiated. An S3 bucket name sits alongside a career-defining area of expertise. There's no understanding of what matters, what's ephemeral, and what should actually change how the system behaves."
      },
      {
        "type": "p",
        "text": "More importantly: none of these memories change the execution path. Whether the system knows you \"prefer a professional tone\" or not, the analysis it runs is identical. The output gets a different coat of paint. The substance doesn't change."
      },
      {
        "type": "quote",
        "text": "This isn't memory. It's note-taking.",
        "variant": "pull"
      },
      {
        "type": "h2",
        "text": "Remembering Who You Are vs. How You Work",
        "id": "remembering-who-you-are-vs-how-you-work"
      },
      {
        "type": "p",
        "text": "There's a difference between remembering who someone is and remembering how they work. Most AI memory systems are optimizing for the former while the real value is in the latter."
      },
      {
        "type": "p",
        "text": "I think about this as two categories:"
      },
      {
        "type": "p",
        "text": "Stylistic preferences shape how the output looks. Tone, formatting, length, structure. \"Prefers bullet points.\" \"Use a professional tone.\" These are legitimate preferences and worth remembering, but they're the easy ones. They're applied at the end of the pipeline - a formatting layer on top of whatever analysis the system has already done."
      },
      {
        "type": "p",
        "text": "Methodological preferences shape what the output is… how analysis gets run; which assumptions get made; what data gets used:"
      },
      {
        "type": "list",
        "items": [
          {
            "text": "\"When analyzing returns, use vol-adjusted, not beta-adjusted.\""
          },
          {
            "text": "\"For LatAm bonds, default to local currency denomination, not hard currency.\""
          },
          {
            "text": "\"Scenario analysis should use Monte Carlo simulation.\""
          }
        ]
      },
      {
        "type": "p",
        "text": "These preferences change the execution path. They're the difference between getting the right answer on the first try and getting corrected on the second turn."
      },
      {
        "type": "p",
        "text": "Every correction a user makes is a signal. When someone says \"actually, I wanted vol-adjusted,\" they're not just fixing one output - they're telling you something about how they work. Most systems throw that away! The correction fixes the current response and then evaporates."
      },
      {
        "type": "h2",
        "text": "From Filing Cabinet to User Model",
        "id": "from-filing-cabinet-to-user-model"
      },
      {
        "type": "p",
        "text": "What you actually need isn't a list of facts. It's a synthesized model of how a person works."
      },
      {
        "type": "p",
        "text": "We've been experimenting with this at Reflexivity. As an exercise, we took the full question history of one of our power users - 219 queries over several months - and ran an extraction pass designed to build a structured user profile. Not \"what facts do we know about this person\" but \"what would a new team member need to know to work effectively with this person from day one?\""
      },
      {
        "type": "p",
        "text": "The extraction looks across multiple dimensions:"
      },
      {
        "type": "list",
        "items": [
          {
            "lead": "Expertise level and domain",
            "text": "Not just \"works in finance\" but the specific sophistication level - are they asking introductory questions or referencing swap rates and 5s30s spreads?"
          },
          {
            "lead": "Instruments and markets",
            "text": "Which specific tickers, indices, and instruments appear repeatedly? This tells you the universe they operate in."
          },
          {
            "lead": "Methodological preferences",
            "text": "What analytical approaches do they favor? Seasonal decomposition? Correlation analysis? Carry analysis? When they ask for scenario analysis, what do they expect under the hood?"
          },
          {
            "lead": "Output expectations",
            "text": "Not just \"bullet points vs. paragraphs\" but deeper patterns - do they want the reasoning shown? Do they verify the math? Do they expect specific table structures for comparisons?"
          },
          {
            "lead": "Personas they invoke",
            "text": "Some users consistently ask the system to adopt specific expert frames - \"answer as a PhD economist at a major bank\" or \"think like a swap trader.\" These aren't whims; they're calibrations of the depth and framing they expect."
          }
        ]
      },
      {
        "type": "p",
        "text": "The output is something like an operating manual for working with that person. Almost like synthesized paragraph that could be handed to a new analyst on their first day:"
      },
      {
        "type": "quote",
        "text": "This user is a sophisticated institutional macro PM focused on LatAm rates and FX, particularly Chile, Brazil, Colombia, and Mexico. They expect professional-grade terminology without explanation of basics. They favor empirical evidence, historical event studies, and correlation analyses. All mathematical calculations, especially swap pricing and forward rates, must be exact - they will check your work.",
        "variant": "block"
      },
      {
        "type": "p",
        "text": "Compare that to \"Uses Chrome instead of Microsoft Edge.\""
      },
      {
        "type": "p",
        "text": "The interesting thing is what emerges from the extraction that no individual conversation would tell you. Patterns across sessions. The fact that a user has asked about Chilean CPI seasonals eight times across different months isn't visible in any single conversation - but it tells you something fundamental about their research process. The fact that they correct beta-adjusted to vol-adjusted three times reveals a methodological preference that was never explicitly stated."
      },
      {
        "type": "h2",
        "text": "The Payoff: Why This Actually Matters",
        "id": "the-payoff-why-this-actually-matters"
      },
      {
        "type": "p",
        "text": "Building a user model isn't an academic exercise. It has concrete, measurable effects on system performance."
      },
      {
        "type": "p",
        "text": "Two turns become one. This is the most immediate win. Without a preference model, the interaction often goes: user asks question → system delivers answer using default methodology → user corrects → system reruns. With a preference model, the first response is right. For a professional running dozens of queries a day, eliminating that correction loop is significant."
      },
      {
        "type": "p",
        "text": "Execution gets faster. When you know a user operates in a specific domain, you can constrain certain steps in the pipeline. Search can be boosted toward relevant instruments and markets. Entity resolution can be weighted toward likely interpretations. If the system knows this user works in Chilean fixed income, \"the rate\" probably refers to the Camara swap rate, not the Fed funds rate. That disambiguation, which might otherwise require a clarifying question or a wrong first attempt, happens instantly."
      },
      {
        "type": "p",
        "text": "The system can anticipate. With enough traces of past executions - not just questions, but the full chain of what analysis was run and how results were used - the system can start suggesting what to ask next. A user runs a screening query, and the system knows from past behavior that they typically follow with a chart and then a deep dive on the top result. Instead of waiting for each request, it can prepare or suggest the next step."
      },
      {
        "type": "p",
        "text": "Corrections compound. Every methodological correction improves not just the current session but every future session. The system develops a richer model of how this user thinks, which means it gets closer to the right answer faster over time. This is the core promise: the second conversation should be better than the first, and  the twentieth should be dramatically better. **Workflows become automated. **When the system has enough traces, it can see patterns the user might not even notice themselves. A user who runs the same CPI analysis every month at the same time is a candidate for a scheduled query - the analysis runs automatically and the results are waiting when they sit down. Today that's a nudge: \"You've run this analysis three months in a row - want to make it automatic?\" Tomorrow, the system could set it up without asking. The preference model doesn't just learn how you work. It learns what you work on and when, and starts taking things off your plate entirely."
      },
      {
        "type": "h2",
        "text": "The Hard Problems",
        "id": "the-hard-problems"
      },
      {
        "type": "p",
        "text": "None of this is easy, and we'd be dishonest to pretend otherwise."
      },
      {
        "type": "p",
        "text": "There are several genuinely difficult problems here, and I think the industry underestimates the degree to which solving them is more art than science."
      },
      {
        "type": "h3",
        "text": "Workflow Preferences vs. Intellectual Property",
        "id": "workflow-preferences-vs-intellectual-property"
      },
      {
        "type": "p",
        "text": "This is the trust boundary, and it matters enormously in finance. A portfolio manager absolutely wants the system to remember that they prefer vol-adjusted returns and Monte Carlo simulations. They absolutely do not want the system to remember - and potentially leak into shared models - that they're building a specific position or exploring a particular trade thesis."
      },
      {
        "type": "p",
        "text": "The distinction is between how I work (methodology, formatting, analytical standards) and what I'm working on (ideas, positions, strategy). A preference system needs to capture the former while being extremely careful about the latter. If users don't trust that the boundary is maintained, they won't use the system for anything meaningful."
      },
      {
        "type": "h3",
        "text": "The Overfitting Problem",
        "id": "the-overfitting-problem"
      },
      {
        "type": "p",
        "text": "Build a strong user model and you create a new failure mode: the system over-applies what it knows."
      },
      {
        "type": "p",
        "text": "Our LatAm rates trader asks about a Canadian penny stock because a friend mentioned it over dinner. If the system is too anchored to the user model, it might try to frame the analysis through a macro lens, default to institutional-grade methodology, or worse, attempt to resolve the ticker against the wrong universe of instruments."
      },
      {
        "type": "p",
        "text": "A good human analyst who's worked with you for a year knows when your preferences apply and when they don't. They can read the register shift - \"my buddy told me about this random mining stock\" is a different kind of query than \"run me the Chile CPI seasonal decomposition.\""
      },
      {
        "type": "p",
        "text": "The system needs the same instinct: not just what the preferences are, but when to apply them."
      },
      {
        "type": "p",
        "text": "This turns out to be a classification problem in itself. Is this query within the user's core domain? Adjacent to it? Completely outside it? The right behavior is different in each case - full model, selective application, mostly ignore (keep formatting, drop methodology). Getting this wrong is arguably worse than having no user model at all, because confidence in the wrong context produces confidently wrong answers."
      },
      {
        "type": "h3",
        "text": "Extraction: What to Capture",
        "id": "extraction-what-to-capture"
      },
      {
        "type": "p",
        "text": "Not every signal is worth preserving. Current memory systems fail here in both directions - they capture trivial facts (a folder name) while missing critical patterns (a repeated methodological correction)."
      },
      {
        "type": "p",
        "text": "The extraction challenge has several layers. Stated preferences are easy - the user tells you what they want. Revealed preferences are harder but more valuable - what does the user's behavior tell you about how they work? A user who consistently reformats your tables into a specific structure is telling you something. A user who always asks for a follow-up chart after a screening query is telling you something. A user who checks your math every time is telling you something about the level of rigor they expect."
      },
      {
        "type": "p",
        "text": "And then there are implied assumptions - the things a user never specifies because they consider them obvious. These are the silent failures. The LatAm trader doesn't say \"local currency\" because in their world, that's the default. When the system returns hard currency data, it feels broken. But the user never explicitly stated the preference, because to them it wasn't a preference - it was just how things work."
      },
      {
        "type": "h3",
        "text": "Representation: How to Store It",
        "id": "representation-how-to-store-it"
      },
      {
        "type": "p",
        "text": "Even if you capture the right signals, a flat list doesn't give you the structure to use them. A user model needs hierarchy - methodological preferences matter more than formatting preferences. It needs relationships like \"works in LatAm FX\" connects to \"default to local currency.\" And it needs synthesis: don't store fifteen individual corrections, recognize the pattern they reveal."
      },
      {
        "type": "p",
        "text": "There's also the temporal dimension, because preferences are not static. A user might shift focus from Chilean rates to Brazilian equities. A methodology preference might evolve as they learn something new. The system needs some concept of decay - recent signals weighted more heavily than older ones - without losing foundational preferences that hold steady over time. In practice, this looks something like exponential decay: recent interactions are preserved in full, while older context gets progressively compacted. But what survives the compaction and what gets lost is a design decision with real consequences."
      },
      {
        "type": "h3",
        "text": "Knowing When a Preference Has Changed",
        "id": "knowing-when-a-preference-has-changed"
      },
      {
        "type": "p",
        "text": "Related but distinct: how do you know when a correction is updating a preference versus being a one-off exception? If a user who always wants Monte Carlo says \"just do a simple linear projection this time,\" is that a new preference or a shortcut for this specific query? The system needs to distinguish between \"I've changed my mind about how I work\" and \"this particular case is different.\" Humans do this effortlessly through context. Systems need to be taught."
      },
      {
        "type": "h3",
        "text": "The Art of It",
        "id": "the-art-of-it"
      },
      {
        "type": "p",
        "text": "I think people underestimate how much of this is art rather than science. The engineering community wants clean abstractions - extract preferences, store them in a schema, apply them deterministically. And the infrastructure matters. But the difference between a system that feels magical and one that feels frustrating often comes down to judgment calls that resist formalization."
      },
      {
        "type": "p",
        "text": "When do you lean on the user model and when do you set it aside? How aggressively do you compact old context? How do you weigh a correction - is it a preference update or an exception? How do you handle the user who's an expert in one domain and a novice in another within the same conversation?"
      },
      {
        "type": "p",
        "text": "These are design problems that require taste, iteration, and a willingness to be wrong."
      },
      {
        "type": "p",
        "text": "We've gotten some of them right. We're still working on others. The honest state of things is: we've built the infrastructure for per-tool memory and context management, we've proven the extraction works, and we've done significant R&D on using past traces to improve current execution. The closed loop where every interaction automatically refines the user model, which automatically improves the next interaction, is what we're building toward."
      },
      {
        "type": "p",
        "text": "What gives me confidence is that the underlying thesis keeps validating. Every time we show a user their extracted profile, the reaction is the same: \"Yes. This is exactly how I work. Why doesn't the system already know this?\""
      },
      {
        "type": "p",
        "text": "The second conversation should be better than the first. We're getting there."
      }
    ]
  },
  {
    "slug": "the-question-graveyard",
    "title": "The Question Graveyard",
    "date": "2026-03-03",
    "author": {
      "name": "RJ Assaly",
      "role": "Chief Product Officer",
      "bio": "Former Product Lead at Kensho (acquired by S&P Global). Previously AllianceBernstein."
    },
    "category": "Research",
    "excerpt": "Every investor I know has a graveyard of questions they never answered. Not because the questions were bad.",
    "readingTime": 6,
    "featured": false,
    "cover": {
      "kind": "photo",
      "icon": "path",
      "src": "/framer/irR1MnXZTOJDEehQ63p0w17k.jpg"
    },
    "body": [
      {
        "type": "p",
        "text": "Every investor I know has a graveyard of questions they never answered."
      },
      {
        "type": "p",
        "text": "Not because the questions were bad. Not because the data didn't exist. Because the path from \"I wonder if...\" to an actual answer required too many intermediate steps — finding the right dataset, figuring out what it's called, cleaning it, running the analysis, interpreting the output. By the time you've scoped the work, the moment has passed or you've moved on to something more urgent."
      },
      {
        "type": "p",
        "text": "These aren't lazy people. They're some of the sharpest minds in finance. The questions they're asking are often exactly the right ones. But there's a gap between having a good question and being able to operationalize it — and that gap kills more valuable analysis than most people realize."
      },
      {
        "type": "h2",
        "text": "Two Conversations That Stuck With Me",
        "id": "two-conversations-that-stuck-with-me"
      },
      {
        "type": "p",
        "text": "A friend who runs a long/short equity book called me a few months ago with a question: what's the historical relationship between auto sales and semiconductor stocks? He had a thesis — something about the auto cycle leading semi demand in a way that wasn't priced in. In particular, that relationship had gotten completely out of whack during COVID, and he wanted to understand whether it had fundamentally changed or whether it would normalize back to historical patterns."
      },
      {
        "type": "p",
        "text": "He knew the data existed. But he didn't know exactly where. He didn't know whether he needed seasonally adjusted or unadjusted figures. Global or country-by-country? Which semi names had meaningful auto exposure? He's not a quant. He's a PM with a good instinct and twenty years of pattern recognition. But the distance between his intuition and an actual testable analysis was enormous. Traditionally, he'd hand that to a junior analyst and get something back in a few days — by which point the trade idea might already be stale, or he's focused on something else."
      },
      {
        "type": "p",
        "text": "A system like ours collapses that entirely. He describes what he's looking for in plain language. The system resolves the right datasets, figures out the appropriate adjustments, identifies the relevant semi names, runs the analysis, and hands him back something he can actually evaluate. Not a chatbot response — a real analytical output he can interrogate, iterate on, and act on."
      },
      {
        "type": "p",
        "text": "A different friend — a buy-side analyst at a multi-strat fund — has the opposite version of the same problem. He doesn't lack data. He's drowning in it. His fund buys credit card transaction data, web traffic data, app download data, satellite imagery — the whole alternative data stack. He knows he wants to predict same-store sales for a set of companies. He knows the answer is probably somewhere in the data he's already paying for."
      },
      {
        "type": "p",
        "text": "But he doesn't know which variables are actually predictive. He doesn't know if some of his data sources are redundant — duplicating the same signal, meaning he could cut costs without losing edge. He doesn't know how to set up the analysis to figure that out. He knows the question. He has the data. He just can't get from one to the other."
      },
      {
        "type": "quote",
        "text": "That second case is almost more frustrating than the first. You're paying for the answer and can't access it.",
        "variant": "pull"
      },
      {
        "type": "h2",
        "text": "The Gap Nobody Talks About",
        "id": "the-gap-nobody-talks-about"
      },
      {
        "type": "p",
        "text": "There's a narrative in finance that the bottleneck is data. Get more data, get better data, get alternative data. Billions of dollars flow into data procurement every year. But in my experience, the actual bottleneck — the thing that prevents good analysis from happening — is much more mundane: it's the translation layer between a human question and a structured, testable analysis."
      },
      {
        "type": "p",
        "text": "Most investment professionals aren't quants. They shouldn't need to be. They have domain expertise, market intuition, and good questions. What they don't have is the ability to — on the fly — resolve the right dataset, determine the right methodology, and execute the analysis."
      },
      {
        "type": "p",
        "text": "The traditional answer is to hire for it. And we've seen how that plays out at firms firsthand: they recruit brilliant quantitative minds out of Google or Meta, spend heavily on data infrastructure, and then wait. It takes the better part of a year for those hires to learn enough about finance to tell a PM something useful. And when they finally do, there's a credibility problem — the PM who's been doing this for two decades isn't always receptive to the new person who doesn't know the domain telling them what to do. The talent is real. The friction is structural."
      },
      {
        "type": "p",
        "text": "Even when that model works — when the quant team is established, credible, and productive — there's still a queue. Questions get prioritized. Anything that isn't urgent gets pushed. And by the time the analysis comes back, the market has moved, the catalyst has passed, or the PM's attention is elsewhere. The question got answered — just too late to matter."
      },
      {
        "type": "p",
        "text": "The result is a quiet, constant triage. Every day, PMs and analysts are implicitly prioritizing which questions are \"worth\" the effort of answering. The threshold is high. A quick check — sure. But anything that requires assembling data from multiple sources, running a non-trivial analysis, or exploring a hypothesis? That goes to the back of the queue. And most of the time, it dies there."
      },
      {
        "type": "p",
        "text": "We hear something else from our users that I think is related: a nagging, ambient sense of \"what am I missing?\" It's not a specific question — it's the feeling that there's signal in the noise they can't quite reach. That somewhere in the data they have access to, or the data that exists in the world, there are patterns and relationships that would change how they think about a position. But they can't surface them because the cost of exploring is too high."
      },
      {
        "type": "h2",
        "text": "What Changes",
        "id": "what-changes"
      },
      {
        "type": "p",
        "text": "This is what systems like ours are actually for. Not \"AI for finance\" in the abstract — a specific, concrete thing: collapsing the distance between a question and an answer."
      },
      {
        "type": "p",
        "text": "The user knows what they want to ask. The system handles everything in between — resolving entities, finding the right data, choosing an appropriate methodology, executing the analysis, and presenting the results in a form that a domain expert can evaluate and act on. The human brings the question and the judgment. The system brings the execution."
      },
      {
        "type": "p",
        "text": "And something interesting happens once that gap closes: people start asking better questions. We see this consistently. A user comes in with a straightforward query — something they could probably have answered manually with enough time. They get an answer in minutes. And then they ask a follow-up they wouldn't have thought to ask before, because the first answer opened a new thread. And then another. The ceiling on what feels \"worth exploring\" rises dramatically when the cost of exploration drops to near zero."
      },
      {
        "type": "p",
        "text": "We saw this with one of our earliest users. He started a session asking if he could filter a screen by subsector. Within an hour, he was asking whether he could build custom scenario analyses — testing how a basket of EV semiconductor names would perform if global auto sales returned to normalized levels. He went from \"can I sort this list\" to \"can I test a macro hypothesis against a custom universe\" in a single sitting. Each answer raised the ceiling on what he thought was worth asking."
      },
      {
        "type": "h2",
        "text": "The Question Graveyard Isn't Inevitable",
        "id": "the-question-graveyard-isnt-inevitable"
      },
      {
        "type": "p",
        "text": "The tragedy of the question graveyard isn't that the questions are unanswerable. It's that they're eminently answerable — the data exists, the methodologies are known, the questions are well-formed. The only thing missing is the connective tissue between the person who has the question and the infrastructure that can answer it."
      },
      {
        "type": "p",
        "text": "That connective tissue is what we spend our time building at Reflexivity . It's not glamorous work — entity resolution, data orchestration, methodology selection, structured outputs. But it's the work that turns \"I wonder if...\" into an actual answer. And every time it does, a question that would have died in the graveyard gets to live instead."
      }
    ]
  },
  {
    "slug": "how-do-you-make-ai-predictable-without-making-it-dumb",
    "title": "How do you make AI predictable without making it dumb?",
    "date": "2026-02-26",
    "author": {
      "name": "RJ Assaly",
      "role": "Chief Product Officer",
      "bio": "Former Product Lead at Kensho (acquired by S&P Global). Previously AllianceBernstein."
    },
    "category": "Perspectives",
    "excerpt": "It's a question most of the industry hasn’t asked. The conversation is overwhelmingly about intelligence – harder questions, deeper reasoning, more complexity.",
    "readingTime": 3,
    "featured": false,
    "cover": {
      "kind": "field",
      "icon": "pentagon",
      "field": "ink"
    },
    "body": [
      {
        "type": "p",
        "text": "It's a question most of the industry hasn’t asked. The conversation is overwhelmingly about intelligence – harder questions, deeper reasoning, more complexity. Very little attention goes to reliability: can this system do the same thing correctly, consistently, and be honest when it can't?"
      },
      {
        "type": "p",
        "text": "In most domains, that imbalance is fine. A chatbot that gets a restaurant recommendation wrong is a minor annoyance. At Reflexivity, we build AI for financial professionals."
      },
      {
        "type": "quote",
        "text": "Reliability isn't a feature. It's the product.",
        "variant": "pull"
      },
      {
        "type": "p",
        "text": "We've developed a hierarchy for failure severity. A wrong number is catastrophic – the system says a stock is up 12% and it's actually up 2%. A wrong instrument is equally bad – you asked about gold futures and got the ETF instead. An inconsistent methodology is subtler: the core steps in an analytical path should be stable across runs, even if the output varies with the data available."
      },
      {
        "type": "p",
        "text": "You can't prompt your way to reliability."
      },
      {
        "type": "p",
        "text": "Our system is a code-agent – it reasons in code, executes against real data, and has full visibility into its own execution chain. When a tool call fails or returns unexpected results, the system sees that. It can retry, search for alternatives, or surface the limitation directly."
      },
      {
        "type": "p",
        "text": "A user asked us to analyze South American currency pairs. The system ran the analysis – but flagged, unprompted, that it was using spot rates because it didn't have access to non-deliverable forwards. It didn't hallucinate NDFs. It didn't silently substitute. It did its best with what it had and told you where it hit a wall."
      },
      {
        "type": "p",
        "text": "The principle: a transparent limitation is always more valuable than a polished hallucination."
      },
      {
        "type": "p",
        "text": "We run structured evaluations where every execution is scored against the path we'd expect – did it resolve the correct entity, call the expected tools, apply a sound method, answer the question, and make good use of the data it retrieved?"
      },
      {
        "type": "p",
        "text": "Ambiguity is part of the design. If a user asks whether US inflation is outpacing the UK, they haven't specified core vs. headline, CPI vs. PCE. Multiple resolutions are valid. Our evals handle this – the expected entity can be a set, not a single answer, and a correct resolution means landing anywhere in that set."
      },
      {
        "type": "p",
        "text": "We also control the evaluation environment. Every run can be configured with a specific set of tools – we can test a single tool atomically, or open up the full system to test end-to-end execution. This lets us diagnose whether a failure lives in resolution, in a specific tool, or in the orchestration layer."
      },
      {
        "type": "p",
        "text": "We track what we call a \"strike score\" – the percentage of executions that hit every dimension. The name is deliberate: like bowling, a strike is a strike, regardless of the size of the pins. You either nailed it or you didn't."
      },
      {
        "type": "p",
        "text": "The industry will keep optimizing for intelligence. We're optimizing for reliability. In our experience, that's what users in high-stakes domains actually pay for."
      }
    ]
  },
  {
    "slug": "chat-is-not-the-product",
    "title": "Chat Is Not the Product",
    "date": "2026-02-18",
    "author": {
      "name": "RJ Assaly",
      "role": "Chief Product Officer",
      "bio": "Former Product Lead at Kensho (acquired by S&P Global). Previously AllianceBernstein."
    },
    "category": "Product",
    "excerpt": "There's a quiet assumption running through most AI product design right now: the chat interface is the destination. You type, the system responds, and that's the interaction model.",
    "readingTime": 9,
    "featured": false,
    "cover": {
      "kind": "photo",
      "icon": "venn",
      "src": "/framer/E99ASuxDchioC1nENoRDYZnbxo.jpg"
    },
    "body": [
      {
        "type": "p",
        "text": "There's a quiet assumption running through most AI product design right now: the chat interface is the destination. You type, the system responds, and that's the interaction model. Every new AI tool seems to launch with a text box and a blinking cursor."
      },
      {
        "type": "p",
        "text": "In consumer contexts, that's often fine. But in professional domains — particularly finance — this assumption breaks down fast. And the way it breaks is instructive."
      },
      {
        "type": "image",
        "src": "/framer/1X9rZrzCIC9fPVl2JqGFnoSIeFU.png",
        "width": 730,
        "height": 381,
        "alt": "Diagram contrasting a linear chat thread with natural language used as an on-ramp into interactive content",
        "caption": "The conventional chat model is linear. We treat natural language as an on-ramp into rich, interactive content."
      },
      {
        "type": "h2",
        "text": "We've Been Doing This for a While",
        "id": "weve-been-doing-this-for-a-while"
      },
      {
        "type": "p",
        "text": "We've been building AI systems for investment professionals at Reflexivity since well before the current wave of chat-first products. Before anyone was talking about \"AI copilots,\" we were using language models to do something unglamorous but important: translate quantitative outputs into natural language."
      },
      {
        "type": "p",
        "text": "Our system would run a statistical analysis — say, detect that McDonald's had an unusual volume spike, and that historically, when this pattern occurs, Chipotle tends to move in a correlated way within a specific window — and then verbalize that for a portfolio manager who isn't a quant: \"You should pay attention to Chipotle. Here's why, here's the evidence, and here's the back-test.\" The statistical rigor was there underneath. The language model made it accessible."
      },
      {
        "type": "p",
        "text": "When GPT-3.5 landed, we extended this in the other direction: letting users express intent in natural language and get rich, structured content back. Not chat responses. Content — tables, charts, sourced analysis, and interactive visualizations."
      },
      {
        "type": "image",
        "src": "/framer/9tPAlXxKBXvAAYd6k8rByrcfq8.png",
        "width": 730,
        "height": 381,
        "alt": "Early Reflexivity output: a query returning a price chart of NVIDIA since the launch of GPT-4",
        "caption": "An early example of what we mean by \"content, not chat\" – a query returning structured, workable output."
      },
      {
        "type": "p",
        "text": "That distinction matters more than it sounds."
      },
      {
        "type": "h2",
        "text": "What \"Chat-First\" Gets Wrong",
        "id": "what-chat-first-gets-wrong"
      },
      {
        "type": "p",
        "text": "Here's the thing about a portfolio manager's workflow: it's not a conversation. It's an investigation. The PM has a thesis, or a half-formed question, or a hunch… and they need to pull on threads, compare data, check sources, manipulate views, and build conviction. That process is inherently multi-modal. Some steps are best expressed in language. Others are best executed with a click."
      },
      {
        "type": "p",
        "text": "The problem with chat-first design isn't that chat is bad. It's that chat becomes a bottleneck the moment you need to do something with what you got back. Sorting a table by market cap. Toggling a chart's time horizon. Filtering search results by document type. Drilling into a specific company from a comparative analysis. These are all actions that take two seconds with a mouse and fifteen seconds to articulate in natural language — assuming the system even interprets your instruction correctly."
      },
      {
        "type": "p",
        "text": "And yet, a remarkable number of AI products force users to stay in the chat lane. Want to re-sort that table? Type it. Want to zoom into a chart? Type it. Want to see the underlying passage that supports a claim? Type it."
      },
      {
        "type": "p",
        "text": "Nobody who has actually used a Bloomberg terminal would design a system this way."
      },
      {
        "type": "h2",
        "text": "The Pattern: Language for Intent, Interaction for Iteration",
        "id": "the-pattern-language-for-intent-interaction-for-iteration"
      },
      {
        "type": "p",
        "text": "The design principle we've arrived at — through years of building this, not through theory — is roughly: natural language is an on-ramp, not a destination."
      },
      {
        "type": "p",
        "text": "Language is extraordinarily good at expressing intent. \"Show me all the surgical robotics companies and help me understand whether the sector is priced for penetration growth or margin expansion.\" No form, no dropdown menu, no pre-built screen is going to capture that request as naturally as plain English."
      },
      {
        "type": "p",
        "text": "But what comes back shouldn't be a chat message. It should be a thing — a piece of rich, structured content that you can manipulate, interrogate, and build on using the interaction paradigms that professionals already know."
      },
      {
        "type": "p",
        "text": "Here's what this looks like in practice."
      },
      {
        "type": "h2",
        "text": "A Concrete Example: Sector Research",
        "id": "a-concrete-example-sector-research"
      },
      {
        "type": "p",
        "text": "A research analyst asks Reflexivity: \"Is the surgical robotics sector currently priced for penetration growth, margin expansion, or technological breakthroughs?\""
      },
      {
        "type": "p",
        "text": "What comes back isn't a paragraph of text. It's a structured analysis — an executive summary, a valuation metrics comparison table across Intuitive Surgical, Medtronic, J&J, Stryker, and Globus Medical, a revenue growth vs. P/E scatter plot, margin trend charts, and a sourced evidence section breaking down the case for each valuation driver. The system searched 160 documents across 45 companies, synthesized the evidence, and rendered it as something you can actually work with."
      },
      {
        "type": "image",
        "src": "/framer/iVU256vUGU939SuRBJl0Xe0VxjA.png",
        "width": 730,
        "height": 381,
        "alt": "Reflexivity sector analysis of surgical robotics with valuation table, sources, documents and time series panels",
        "caption": "One question. Five entities resolved, 10 time series pulled, 160 documents searched across transcripts, filings, and presentations. What comes back isn't a chat message – it's something you can actually work with."
      },
      {
        "type": "p",
        "text": "Now the investigation branches. And this is where the design earns its keep."
      },
      {
        "type": "h2",
        "text": "Following the Thread: From Analysis to Conviction",
        "id": "following-the-thread-from-analysis-to-conviction"
      },
      {
        "type": "p",
        "text": "The analyst wants to understand Stryker's positioning in more detail. They don't type a follow-up question. They click Stryker in the Sources panel."
      },
      {
        "type": "p",
        "text": "A drawer slides open. But this isn't just a stock quote card. It's a full knowledge graph — Stryker's exposure to the Medical Devices theme, its key brands and products, its competitors with live price changes, and other exposures."
      },
      {
        "type": "p",
        "text": "From here, the analyst can go deeper in any direction. They click into Stryker's latest earnings. A structured recap appears: Q4 & FY 2025 results, EPS beat of $0.08, revenue beat of $45M, guidance for 8-9.5% organic growth in 2026 — all organized with sections for Market Reaction, KPIs in Focus, Management Commentary, Thematic Focus, Peer Comparison, and Risk Assessment. Not a raw transcript. A synthesized, navigable document."
      },
      {
        "type": "image",
        "src": "/framer/AkROQSNNacR1UgBoS96zjDBPE.png",
        "width": 730,
        "height": 381,
        "alt": "Stryker company view with a business impact assessment, thematic focus and most impacted companies",
        "caption": "The analyst clicked into Stryker from the analysis. No follow-up prompt needed – just a structured, navigable view."
      },
      {
        "type": "p",
        "text": "Or they notice a recent catalyst. Stryker just launched Mako RPS — a handheld robotic system for total knee arthroplasty. The system has already generated a business impact assessment: operational implications, competitive effects (a direct strike against Smith & Nephew's CORI system), financial impact analysis, and a sentiment-tagged view of the most impacted companies — Zimmer Biomet (negative), Smith & Nephew (negative), J&J (neutral), Enovis (negative), Intuitive Surgical (neutral)."
      },
      {
        "type": "image",
        "src": "/framer/aV5yHBDkFhrEmwsdPwdWQT7AhJ8.png",
        "width": 730,
        "height": 381,
        "alt": "Automatically assessed Stryker product launch showing competitive impact and sentiment-tagged companies",
        "caption": "A product launch detected and assessed automatically – competitive impact, sentiment, and price reaction in one view."
      },
      {
        "type": "p",
        "text": "The analyst can dive into any of these — click Zimmer Biomet to understand why it's flagged negative, read the thematic focus on Surgical Robotics (positive — \"CEO Lobo stated robotics can become the standard of care\"), check the Margin Expansion angle, or review the Aging Demographics macro theme."
      },
      {
        "type": "p",
        "text": "And if the analyst wants to verify any of this against primary sources? They click \"View sources\" to open the document search — passages ranked by relevance, filterable and sortable by recency, reporting period, document type, and relevance threshold. Click a passage from a J&J Q3 transcript, and the right pane shows it highlighted in the context of the full document."
      },
      {
        "type": "image",
        "src": "/framer/Wivngj9whGior1SePenPUvz1Wp8.png",
        "width": 730,
        "height": 381,
        "alt": "Document search with ranked transcript passages and the selected passage highlighted in context",
        "caption": "When the analyst wants to verify a claim against primary sources, they click through to passage-level evidence – highlighted in context."
      },
      {
        "type": "p",
        "text": "At no point did the analyst re-engage with chat to do any of this. The natural language query established the intent. Everything after that was point-and-click — the interaction model that investment professionals have used for thirty years and that remains, for many tasks, simply faster and more precise than language."
      },
      {
        "type": "h2",
        "text": "When Language Comes Back",
        "id": "when-language-comes-back"
      },
      {
        "type": "p",
        "text": "This isn't a story about language being bad and buttons being good. The interesting design space is precisely the interplay between the two."
      },
      {
        "type": "p",
        "text": "Sometimes the analyst does come back to chat — but from a position of context. They've been looking at the margin trend chart for ISRG and they want to add Medtronic for comparison. They type: \"add MDT margins to this chart.\" The system knows what \"this chart\" refers to. It modifies the existing visualization. The analyst could also have done this by clicking \"Add data\" on the chart itself. Both paths work. The choice is the user's."
      },
      {
        "type": "p",
        "text": "Or consider charting more broadly. An analyst asks Reflexivity to chart USDZAR and USDBRL indexed to 100 over the past year. The chart appears. The system has resolved the entities, pulled the time series, and rendered the visualization. Now the analyst wants to add USDCLP. They can type it. Or they can use the data picker in the chart interface, which shows all the related series that were resolved during the conversation, with checkboxes. Whichever is faster in the moment."
      },
      {
        "type": "p",
        "text": "The principle isn't 'chat for some things, UI for others.' It's that professional workflows already demand both — and always have. An analyst moves between verbal reasoning and direct manipulation dozens of times in a single research session. That's not a design choice we're enabling. It's an existing pattern we're meeting. The product's job is to make those transitions frictionless, so that working with AI feels like working the way you already work, not adopting a new paradigm."
      },
      {
        "type": "h2",
        "text": "Why This Is Hard to Build",
        "id": "why-this-is-hard-to-build"
      },
      {
        "type": "p",
        "text": "This sounds obvious when you describe it. But it's genuinely difficult to engineer, and I think that's why so few products do it well."
      },
      {
        "type": "p",
        "text": "The core challenge is that natural language outputs and interactive UI components need to share context. When the system generates a structured analysis with embedded charts, tables, and entity references, every one of those elements needs to be a live object — connected to underlying data, capable of receiving interactions, and aware of the broader context of the conversation."
      },
      {
        "type": "p",
        "text": "If you build your chat system and your application as separate layers — which is the path of least resistance — you end up with chat responses that are essentially static text with maybe a few rendered widgets. The user can read them, but they can't work with them. The artifacts don't connect back to the platform. There are no on-ramps into deeper exploration, no off-ramps into the user's broader workflow."
      },
      {
        "type": "p",
        "text": "Building this properly means the AI system doesn't just generate text. It orchestrates sub-agents that can interact with specific parts of the application — the charting engine, the screener, the document search, the financial data layer. Chat outputs include embedded content that's wired to the same backend as the full-page experiences. Users can \"expand\" any preview into the full application context without losing their place."
      },
      {
        "type": "h2",
        "text": "On-Ramps and Off-Ramps",
        "id": "on-ramps-and-off-ramps"
      },
      {
        "type": "p",
        "text": "This brings up something that doesn't get enough attention in AI product design: on-ramps and off-ramps."
      },
      {
        "type": "p",
        "text": "An on-ramp is how a user enters a workflow. Natural language is a remarkable on-ramp — arguably the best ever designed, because there's no learning curve and no constraints on what you can express."
      },
      {
        "type": "p",
        "text": "An off-ramp is how a user takes the output and does something else with it. Downloads it to Excel. Shares it with a colleague. Adds it to a watchlist. Expands it to a full-page view where they can manipulate it with all the controls the platform offers."
      },
      {
        "type": "p",
        "text": "Most chat-first AI products are all on-ramp and no off-ramp. You can get into the workflow easily, but you can't take what you got and go somewhere with it. The analysis lives and dies in the chat thread."
      },
      {
        "type": "p",
        "text": "For investment professionals, this is a dealbreaker. The output of one piece of analysis is almost always an input to the next. The valuation comparison becomes a slide in a deck. The screening results become a watchlist that gets monitored. The chart becomes an exhibit shared with a PM. The earnings call passage becomes an annotation in a research note."
      },
      {
        "type": "p",
        "text": "If you can't get out of the chat — if you can't download, expand, export, share, or integrate — then the AI is generating disposable content. It looks impressive in a demo. It doesn't survive contact with a real workflow."
      },
      {
        "type": "h2",
        "text": "The Design Thesis",
        "id": "the-design-thesis"
      },
      {
        "type": "p",
        "text": "If I had to distill this into a principle, it would be:"
      },
      {
        "type": "quote",
        "text": "Build for the investigation, not the conversation.",
        "variant": "pull"
      },
      {
        "type": "p",
        "text": "A conversation is linear. An investigation branches. The user follows threads, backtracks, compares, cross-references, and builds a view over time. Natural language is a powerful way to start that process and a useful tool to reach for at various points along the way. But it's not the process itself."
      },
      {
        "type": "p",
        "text": "The products that will win in professional domains are the ones that understand this — that treat AI as a capability woven through a rich, interactive experience, rather than as a chatbot that occasionally renders a chart."
      },
      {
        "type": "p",
        "text": "We started building this way before it was fashionable to have an opinion on it, and the users we work with — PMs and research analysts managing real capital — have made it very clear that this is what working with AI actually feels like when it works. It doesn't feel like a conversation. It feels like having a very capable research partner who sets things up for you and then gets out of the way."
      }
    ]
  },
  {
    "slug": "mcp-from-protocol-to-product",
    "title": "MCP: From Protocol to Product",
    "date": "2025-12-09",
    "author": {
      "name": "RJ Assaly",
      "role": "Chief Product Officer",
      "bio": "Former Product Lead at Kensho (acquired by S&P Global). Previously AllianceBernstein."
    },
    "category": "Product",
    "excerpt": "There's a lot of excitement around MCP right now, and for good reason. The Model Context Protocol represents a genuine step forward in how AI systems connect to external data and capabilities.",
    "readingTime": 7,
    "featured": false,
    "cover": {
      "kind": "field",
      "icon": "chain",
      "field": "lake"
    },
    "body": [
      {
        "type": "h2",
        "text": "The Excitement and the Gap",
        "id": "the-excitement-and-the-gap"
      },
      {
        "type": "p",
        "text": "There's a lot of excitement around MCP right now, and for good reason. The Model Context Protocol represents a genuine step forward in how AI systems connect to external data and capabilities. But there's often a gap between adopting MCP as a standard and actually building products that deliver value through it."
      },
      {
        "type": "p",
        "text": "The core insight: MCP is plumbing, not product. It solves the interconnection problem - how do I expose my data/capabilities to AI systems in a standardized way? - but it doesn't solve the much harder problems of what to expose, how intelligent those endpoints should be, and how consuming systems will actually orchestrate across multiple tools."
      },
      {
        "type": "quote",
        "text": "MCP is plumbing, not product.",
        "variant": "pull",
        "decorative": true
      },
      {
        "type": "p",
        "text": "Standardization doesn't mean quality. Two MCP servers can both be \"compliant\" while differing enormously in how useful they are to an AI system trying to accomplish real tasks."
      },
      {
        "type": "h2",
        "text": "The Fundamental Architecture Question: Where Does the Intelligence Live?",
        "id": "the-fundamental-architecture-question-where-does-the-intelli"
      },
      {
        "type": "p",
        "text": "When building MCP-enabled capabilities, you face a core design decision: should the intelligence live in the reasoning layer (the AI system calling your tools), or in the tools themselves?"
      },
      {
        "type": "p",
        "text": "Simple Tools:"
      },
      {
        "type": "list",
        "items": [
          {
            "text": "Expose raw data and basic operations"
          },
          {
            "text": "Let the consuming AI system figure out how to orchestrate, transform, and interpret"
          },
          {
            "lead": "Example",
            "text": "get_price(ticker, date) returns a number"
          }
        ]
      },
      {
        "type": "p",
        "text": "Smart Tools:"
      },
      {
        "type": "list",
        "items": [
          {
            "text": "Package multiple operations, include interpretation logic, handle ambiguity"
          },
          {
            "text": "Return structured, contextualized results"
          },
          {
            "lead": "Example",
            "text": "analyze_security(query) that resolves what the user means, retrieves relevant data, and returns a synthesized view"
          }
        ]
      },
      {
        "type": "p",
        "text": "Neither approach is inherently correct. The right choice depends on several factors:"
      },
      {
        "type": "list",
        "items": [
          {
            "text": "How much underlying complexity exists? If there are 15 steps between a user's question and an answer, packaging that into a smart tool may be necessary."
          },
          {
            "text": "Is this capability used in one context or many? If the same functionality needs to be accessed from multiple different systems with different reasoning capabilities, smarter tools provide more consistent results."
          },
          {
            "text": "What can you assume about the consumer? If the AI system calling your MCP has sophisticated planning and code generation capabilities, simpler tools may suffice. If not, your tools need to compensate."
          },
          {
            "text": "Where is the domain expertise? Sometimes the tool provider (you) knows far more about how to interpret and use the data than any general-purpose AI system could."
          }
        ]
      },
      {
        "type": "p",
        "text": "In practice, most mature implementations end up with a mix - some simple endpoints for basic operations, some smart tools that package complex workflows."
      },
      {
        "type": "h2",
        "text": "The Entity Resolution Problem",
        "id": "the-entity-resolution-problem"
      },
      {
        "type": "p",
        "text": "Here's a concrete example of where this gets hard. A user asks: \"What's gold trading at?\""
      },
      {
        "type": "p",
        "text": "Does that mean:"
      },
      {
        "type": "list",
        "items": [
          {
            "text": "GC1 (front-month COMEX futures)"
          },
          {
            "text": "GLD (the ETF)"
          },
          {
            "text": "XAUUSD (spot gold)"
          },
          {
            "text": "A specific futures contract month"
          },
          {
            "text": "Something else entirely"
          }
        ]
      },
      {
        "type": "p",
        "text": "Here's why this matters architecturally: if you handle entity resolution poorly, you end up doing the same work over and over again. In our gold/dollar example, if each of the 6 tool calls has to independently figure out what \"gold\" means, you're:"
      },
      {
        "type": "list",
        "items": [
          {
            "text": "Repeating the same resolution logic 6 times"
          },
          {
            "text": "Burning tokens and time on redundant work"
          },
          {
            "text": "Paying 6x the cost for something you should do once"
          },
          {
            "text": "Potentially getting inconsistent results (tool A resolves to GC1, tool B resolves to GLD)"
          }
        ]
      },
      {
        "type": "p",
        "text": "The fundamental tension is: do you bake resolution into every tool (making them slower and redundant), or do you have a mechanism to resolve once and pass context forward?"
      },
      {
        "type": "p",
        "text": "There are a few approaches:"
      },
      {
        "type": "list",
        "items": [
          {
            "lead": "Push it to the consumer",
            "text": "Your MCP requires exact identifiers. The AI system calling you must figure out what the user means before calling your endpoint. This works, but it means every consumer of your MCP needs to build their own resolution layer - massive duplication of effort across the ecosystem."
          },
          {
            "lead": "Build resolution into every tool",
            "text": "Your MCP accepts natural language queries and handles disambiguation internally. This makes tools easy to use in isolation but creates massive redundancy in multi-tool workflows. You're re-resolving entities on every call."
          },
          {
            "lead": "Expose resolution as its own capability",
            "text": "Offer a dedicated resolve_entity(query, context) function that gets called first, returning standardized identifiers that downstream functions accept. This is cleaner, but requires the consuming AI system to understand that resolution is a prerequisite step."
          },
          {
            "lead": "Support stateful context passing",
            "text": "Allow tools to return resolved entities in a standardized way that subsequent tools can reference. This is the most efficient but requires thinking carefully about how state flows through a multi-step workflow."
          }
        ]
      },
      {
        "type": "p",
        "text": "At Reflexivity, we've found that robust entity resolution is often the difference between an MCP that works in demos and one that works in production. Users don't speak in RICs or CUSIPs - they speak in natural language, abbreviations, and contextual references (\"the stock we were looking at earlier\")."
      },
      {
        "type": "p",
        "text": "This last point raises another architectural consideration: how do you handle conversational context? When a user refers to \"the stock we looked at earlier,\" the resolution layer needs access to:"
      },
      {
        "type": "list",
        "items": [
          {
            "text": "Conversation history and memory"
          },
          {
            "text": "A log of prior tool calls and their results"
          },
          {
            "text": "Compressed or summarized context from earlier in the session"
          }
        ]
      },
      {
        "type": "p",
        "text": "Without this, every query has to be completely self-contained, which isn't how people actually work. The MCP design question becomes: is this the tool's responsibility (each tool maintains conversation state), the reasoner's responsibility (it manages context and passes it explicitly), or some shared protocol for context management? This ties back to the redundancy problem - if you're re-establishing context on every tool call, you're wasting resources."
      },
      {
        "type": "h2",
        "text": "Orchestration: The Hidden Complexity",
        "id": "orchestration-the-hidden-complexity"
      },
      {
        "type": "p",
        "text": "Even with well-designed individual tools, there's significant complexity in how they get orchestrated together."
      },
      {
        "type": "p",
        "text": "Consider a question like: \"Gold is 10% off its high and the dollar index is near a high - help me understand if gold goes back to all time highs, what's the likely move in the dollar index. Give me plots for different scenarios.\""
      },
      {
        "type": "p",
        "text": "Answering this requires:"
      },
      {
        "type": "list",
        "items": [
          {
            "text": "Resolving \"gold\" and \"dollar index\" to specific instruments"
          },
          {
            "text": "Retrieving historical price data for both"
          },
          {
            "text": "Calculating current levels relative to highs"
          },
          {
            "text": "Running some kind of correlation or regression analysis"
          },
          {
            "text": "Generating scenario projections"
          },
          {
            "text": "Creating visualizations"
          }
        ]
      },
      {
        "type": "p",
        "text": "That's potentially 6+ tool calls that need to happen in the right sequence, with information passing correctly between them. The output of step 1 (resolved identifiers) needs to flow into steps 2-6. The data from step 2 feeds the calculations in steps 3-4."
      },
      {
        "type": "p",
        "text": "Key questions for MCP design:"
      },
      {
        "type": "list",
        "items": [
          {
            "text": "How do you avoid redundant work? If tool A resolves an entity, how does tool B know not to re-resolve it?"
          },
          {
            "text": "How do you handle failures mid-chain? If step 4 fails, can you recover?"
          },
          {
            "text": "Should some of these be packaged together? Maybe \"resolve + retrieve historical data\" is one smart tool, rather than two simple ones."
          },
          {
            "text": "Do you need sub-agents? For complex multi-step analysis, sometimes it makes sense to have a specialized agent that handles a subset of the workflow, rather than having the top-level reasoner manage every step."
          }
        ]
      },
      {
        "type": "p",
        "text": "There's no universal answer, but the design of your MCP surface area profoundly affects how well AI systems can actually use it."
      },
      {
        "type": "h2",
        "text": "The Competitive Landscape: Data Preferencing",
        "id": "the-competitive-landscape-data-preferencing"
      },
      {
        "type": "p",
        "text": "Here's a strategic question that becomes urgent as MCP adoption grows: in a world where multiple providers offer similar data via MCP, how does an AI system choose which to use?"
      },
      {
        "type": "p",
        "text": "If LSEG, Bloomberg, FactSet, and S&P all have MCP servers offering company financials, what determines which one Claude (or any other AI system) calls?"
      },
      {
        "type": "p",
        "text": "A few possible mechanisms:"
      },
      {
        "type": "list",
        "items": [
          {
            "lead": "Quality of tool descriptions",
            "text": "The AI reads function signatures and descriptions to decide which tool fits the task. Better metadata = higher selection rate. This is currently how most selection works, but it's fragile."
          },
          {
            "lead": "Explicit curation/hierarchy",
            "text": "The platform (Anthropic, in the case of Claude) or the end customer creates explicit preferences—\"for financial data, prefer LSEG.\" This puts control in human hands but requires configuration."
          },
          {
            "lead": "User-controlled subgraphs",
            "text": "Let users define which tools are available for their context. A user could say \"I only want LSEG data\" and other MCPs simply aren't in scope."
          },
          {
            "lead": "Commercial arrangements",
            "text": "Providers pay for preferential placement or selection. This is the ads model applied to MCP."
          },
          {
            "lead": "Performance/reliability signals",
            "text": "Over time, the system learns which MCPs actually produce good results and weights accordingly."
          }
        ]
      },
      {
        "type": "p",
        "text": "This is largely uncharted territory, but it's worth thinking about now. Your MCP isn't just competing on data quality - it's competing for attention in an increasingly crowded tool ecosystem. The discoverability and \"selectability\" of your MCP matters."
      },
      {
        "type": "h2",
        "text": "How We Think About This",
        "id": "how-we-think-about-this"
      },
      {
        "type": "p",
        "text": "We've been building and operating AI systems with tool use for a while now, and a few principles guide our approach:"
      },
      {
        "type": "p",
        "text": "Start with the user problem, not the protocol. MCP is an implementation detail. The question is: what is the user trying to accomplish, and what's the minimum viable set of capabilities needed to get them there reliably?"
      },
      {
        "type": "p",
        "text": "Think holistically about the stack. The MCP surface area, the reasoning layer, and the user interaction model are all interconnected. Designing one without considering the others leads to gaps."
      },
      {
        "type": "p",
        "text": "Invest heavily in entity resolution and context management. These unsexy problems are often the difference between a system that feels magical and one that feels frustrating."
      },
      {
        "type": "p",
        "text": "Be willing to make tools smart when necessary. The instinct is often to keep tools simple and \"pure,\" but sometimes the right answer is to package complexity so consumers don't have to reinvent it."
      },
      {
        "type": "p",
        "text": "Iterate based on real usage. The right abstraction boundaries only become clear once you see how the system actually gets used. Build in the ability to evolve your MCP surface area over time."
      },
      {
        "type": "p",
        "text": "MCP is genuinely exciting infrastructure, but turning it into products that work requires thinking through these layers carefully."
      }
    ]
  },
  {
    "slug": "introducing-earnings-insights",
    "title": "Introducing Earnings Insights: AI-Driven Intelligence for Earnings Season",
    "date": "2025-11-06",
    "author": {
      "name": "Eamon Troy"
    },
    "category": "Product",
    "excerpt": "4:05 PM. MSFT just released earnings, stock is down 5% and moving lower. You’re digging through to find what drove this miss.",
    "readingTime": 3,
    "featured": false,
    "cover": {
      "kind": "photo",
      "icon": "signal",
      "src": "/framer/jtvQSNmLK3YKDqH2ZYrdHo7sXpU.jpg"
    },
    "body": [
      {
        "type": "p",
        "text": "4:05 PM. MSFT just released earnings, stock is down 5% and moving lower. You’re digging through to find what drove this miss."
      },
      {
        "type": "p",
        "text": "Azure growth deceleration?"
      },
      {
        "type": "p",
        "text": "Capex guidance cut?"
      },
      {
        "type": "p",
        "text": "Any new data center partnerships?"
      },
      {
        "type": "p",
        "text": "What’s the read-through for the rest of the book?"
      },
      {
        "type": "p",
        "text": "Scan Bloomberg headlines, the press release, filing, check impulse reactions on socials. Dig through each line item. Parse what customers or segments drove cloud weakness – was it Azure specific? How does it compare vs. AWS? GCP?"
      },
      {
        "type": "p",
        "text": "Way too much to work through but seven more companies just hit the tape, names are swinging wildly, and critical position decisions need to be made."
      },
      {
        "type": "p",
        "text": "This is your standard earnings season: reactive and rushed, stretched too thin across too many calls, too much content, and an ever-growing coverage universe."
      },
      {
        "type": "p",
        "text": "We built Earnings Insights, powered by the Reflexivity Knowledge Graph, to change that."
      },
      {
        "type": "p",
        "text": "Each earnings season brings thousands of quarterly reports – 10-Ks/Qs, prepared management remarks, call Q&A, analyst revisions, and market coverage. Spending 2-3 hours per company doesn’t work. Plans to read press releases, attend calls, update models, assess competitive impact, position size, and talk to the trading desk, for every company in your coverage universe, never seem to scale."
      },
      {
        "type": "p",
        "text": "Our new product offering is powered by an AI-driven analysis pipeline that continuously processes and distills the most critical information for each company’s quarterly release."
      },
      {
        "type": "p",
        "text": "This release features two complementary insight types designed to help users prepare and react to earnings season."
      },
      {
        "type": "p",
        "text": "Published three days before a company reports, Previews provide the critical context users need into a quarter, including:"
      },
      {
        "type": "list",
        "items": [
          {
            "text": "Setup with historical scenario analysis"
          },
          {
            "text": "Company-specific KPIs"
          },
          {
            "text": "Thematic framework tracking exposure across three core categories: industry, financial, and macro"
          },
          {
            "text": "Company impact analysis - peers most likely to benefit or suffer based on different outcomes"
          },
          {
            "text": "Investment scenarios to watch"
          }
        ]
      },
      {
        "type": "image",
        "src": "/framer/eUIyUhHKI2KTLQEbk9HCaKI1Ug.png",
        "width": 592,
        "height": 583,
        "alt": "Earnings Preview for Datadog showing setup, KPIs to monitor and thematic focus"
      },
      {
        "type": "p",
        "text": "Recaps are generated within 30 minutes of a company’s earnings release and provide a concise narrative for what drove the quarter and stock reaction. These insights cover:"
      },
      {
        "type": "quote",
        "text": "Recaps are generated within 30 minutes of a company’s earnings release.",
        "variant": "pull",
        "decorative": true
      },
      {
        "type": "list",
        "items": [
          {
            "text": "Stock reaction attribution"
          },
          {
            "text": "KPI deep dives with peer performance"
          },
          {
            "text": "Critical management commentary"
          },
          {
            "text": "Thematic validation"
          },
          {
            "text": "Peer company impact"
          },
          {
            "text": "Updated risk assessment and catalyst outlook"
          }
        ]
      },
      {
        "type": "image",
        "src": "/framer/yh91e0bimAu6GrmMI1QRECkRO9I.png",
        "width": 650,
        "height": 560,
        "alt": "Earnings Recap for Datadog showing KPIs in focus and management commentary"
      },
      {
        "type": "h2",
        "text": "Sources and Data Quality",
        "id": "sources-and-data-quality"
      },
      {
        "type": "p",
        "text": "Each Earnings Insight is sourced and verified from official company disclosures, transcripts, and financial news sources. All quotes are attributed to their speakers."
      },
      {
        "type": "h2",
        "text": "Coverage",
        "id": "coverage"
      },
      {
        "type": "p",
        "text": "Current coverage for Earnings Insights spans all U.S. companies with a market cap over $1 billion. The platform also supports customization on source and methodology, meaning teams can incorporate their own research and proprietary data into the analysis."
      },
      {
        "type": "h2",
        "text": "What Makes This Different",
        "id": "what-makes-this-different"
      },
      {
        "type": "p",
        "text": "These insights are powered by the relational network and processing pipeline of the Reflexivity Knowledge Graph. Our graph tracks 2,000+ investment themes, 4,000+ companies, and over 20,000 unique products, brands, and services. This network allows the Graph pipeline to automatically resolve earnings results into relevant themes, identify the most impacted companies, and determine which KPIs truly matter based on historical sensitivity, company guidance, and evolving business model dynamics."
      }
    ]
  },
  {
    "slug": "the-alchemy-of-finance",
    "title": "The Alchemy of Finance",
    "date": "2025-10-28",
    "author": {
      "name": "Jan Szilagyi",
      "role": "Chief Executive Officer",
      "bio": "Former Co-CIO at Lombard Odier, PM at Fortress. World record for fastest Harvard Economics PhD."
    },
    "category": "Perspectives",
    "excerpt": "There’s a sort of open secret in finance: we’re incredible at collecting data and terrible at using it. Everyone loves to say, “data is the lifeblood of the business.”",
    "readingTime": 2,
    "featured": false,
    "cover": {
      "kind": "photo",
      "icon": "atom",
      "src": "/framer/eI9b30EAvoTRnOQLycd9dJZatfQ.jpg"
    },
    "body": [
      {
        "type": "p",
        "text": "There’s a sort of open secret in finance: we’re incredible at collecting data and terrible at using it. Everyone loves to say, “data is the lifeblood of the business.” Is it? It mostly just sits there, gushing aimlessly. There’s more data than ever before (prices, trades, alternative signals) but very few people seem to know what to actually do with it. The AI-powered solutions are starting to look like the silver bullet."
      },
      {
        "type": "p",
        "text": "Let’s be honest: everyone has long known the real prize was never about hoarding terabytes of data. It’s about finding the signal in the noise: the one insight that actually changes your mind, your position, or your P&L. The trouble is, finance runs on duct-taped infrastructure. Jupyter notebooks and Excel spreadsheets were fine when data was measured in gigabytes but can’t scale up elegantly into galaxies. I doubt a typical investment analyst uses even 1% of the data they have (and pay handsomely for)."
      },
      {
        "type": "p",
        "text": "The advent of LLMs showed us information could suddenly be harnessed at scale. Consuming the entire internet worth of information made critical queries like “please put together an agenda for a one-day visit to Budapest” suddenly possible. LLMs make information processing look almost trivial."
      },
      {
        "type": "p",
        "text": "That’s why everyone is now frantically racing to reinvent themselves. They’re busy building the very infrastructure that Reflexivity already has: engines that don’t just collect data, but use it to think and generate insights. It’s no longer enough to sell ingredients; the customer wants a platform to turn them into a meal."
      },
      {
        "type": "p",
        "text": "And the ingredients aren’t just unstructured text. Buried in internal .csv files are billions of untouched time series, collecting dust and opportunity cost. Reflexivity operates in a new paradigm where data pipelines, Knowledge Graph-linked datasets, analytics engines, and AI models all work together: generating signals, forecasts, and narratives in real time. We don’t just use data. We own the machinery of insight itself and use it to power our clients’ idea generation and risk management."
      },
      {
        "type": "p",
        "text": "For decades, having access to data was itself valuable. But once data volume exploded beyond what humans can process, raw data stopped being a scarce resource. Insight is what's scarce. The ability to connect dots, contextualize, and anticipate what happens next. This will ultimately make truly valuable data actually more valuable - premium content will finally earn a premium - because users will have the infrastructure to use it."
      },
      {
        "type": "p",
        "text": "We're moving from \"here's the data, good luck\" to \"here are the insights, here's the evidence.\" It's synthesis-as-a-service rather than information-as-a-service."
      },
      {
        "type": "quote",
        "text": "The golden age of (using) data is just beginning.",
        "variant": "pull"
      }
    ]
  },
  {
    "slug": "can-ai-help-investors-with-questions-not-just-answers",
    "title": "Can AI help investors with questions (not just answers)?",
    "date": "2025-08-13",
    "author": {
      "name": "Jan Szilagyi",
      "role": "Chief Executive Officer",
      "bio": "Former Co-CIO at Lombard Odier, PM at Fortress. World record for fastest Harvard Economics PhD."
    },
    "category": "Research",
    "excerpt": "A lot of the buzz around LLMs right now is centered on their impressive ability to handle increasingly complex questions with apparent ease.",
    "readingTime": 3,
    "featured": false,
    "cover": {
      "kind": "photo",
      "icon": "orbit",
      "src": "/framer/nA0NPa0E1JlJODZQ9I61pDOFkeA.jpg"
    },
    "body": [
      {
        "type": "p",
        "text": "A lot of the buzz around LLMs right now is centered on their impressive ability to handle increasingly complex questions with apparent ease. And let’s be clear: this is no small feat. You’re talking about AI understanding a user’s question, figuring out how to answer it, gathering the necessary data, running the analysis, and then providing an answer. All of this might have taken hours of valuable time away from the user that could be better spent doing something else, like coming up with another question. And this is where things get interesting."
      },
      {
        "type": "p",
        "text": "At Reflexivity, our goal of driving the cost of investor curiosity down to zero isn’t just a nice-to-have. It’s a game changer. Investors are grateful that the platform handles a lot of the heavy lifting: pricing a one-touch EURBRL digital option while also building an independent forecast for NVDA, all with minimal effort. Our proprietary Knowledge Graph stitched together otherwise entirely separate data sources, and linked them in a way that made data easily discoverable and analyzable."
      },
      {
        "type": "p",
        "text": "But here’s the kicker. There’s an even bigger need that portfolio managers and analysts are eager to solve: building the curiosity muscle. They don’t just want answers; they want better questions. AI is still largely thought to be clueless when it comes to independent, creative thinking. It doesn’t seem to be capable of the kind of original thought that has long been the domain of the human brain, with all its mysterious, messy ways. But what if we are wrong and AI can help with that too?"
      },
      {
        "type": "p",
        "text": "This is the frontier we’re aiming to conquer with Reflexivity’s unprompted AI. We’re already helping investors answer their questions. Could we take it a step further? What if we could help them identify the questions they should be asking, but aren’t?"
      },
      {
        "type": "quote",
        "text": "What if we could help them identify the questions they should be asking, but aren’t?",
        "variant": "pull",
        "decorative": true
      },
      {
        "type": "p",
        "text": "Let’s start with the “known unknowns.” You know, those gaps in knowledge we’re aware of but haven’t filled yet. If we ask the right questions, we can turn those gaps into “known knowns.”"
      },
      {
        "type": "p",
        "text": "However, we also have the “unknown unknowns” in Donald Rumsfeld’s parlance. These are the gaps in our knowledge we don’t even know exist. This is the stuff that in hindsight appears obvious but no one saw coming. The black swans. The 5-sigma events. And that’s where the real challenge - and the real opportunity - lies."
      },
      {
        "type": "p",
        "text": "The dynamic Knowledge Graph is key to achieving this. It provides Reflexivity with a basic mapping of investing relationships that matter, and gives it “situational awareness.” Whenever it detects a dislocation in US 10 year yields, it will know to look for ripple effects in utility stocks or the term structure of commodity curves."
      },
      {
        "type": "p",
        "text": "We have also given it the freedom to uncover new ones, initially relying on some degree of pattern recognition and relatively elementary statistics. And guess what? It is starting to turn from a passive participant into an active investigator that is able to highlight potentially overlooked ideas. It will uncover links between companies that may defy conventional categorization, and adjust its revenue expectations for FedEx or UPS based on logistics commentary from Amazon."
      },
      {
        "type": "p",
        "text": "This will change the paradigm. Rather than prompting Reflexivity with “Tell me what factors are driving a company’s discount to its peers” the user will instead be prompted:"
      },
      {
        "type": "quote",
        "text": "I found another company that is just as exposed to the Supply Chain Automation chain theme but trades at a substantial discount due to very temporary factors.",
        "variant": "block"
      },
      {
        "type": "p",
        "text": "We are just getting started but the promise of this endeavor is absolutely immense."
      }
    ]
  },
  {
    "slug": "the-ideal-ai-agent-is-honest-not-flawless",
    "title": "The ideal AI agent is honest, not flawless",
    "date": "2025-08-07",
    "author": {
      "name": "Jan Szilagyi",
      "role": "Chief Executive Officer",
      "bio": "Former Co-CIO at Lombard Odier, PM at Fortress. World record for fastest Harvard Economics PhD."
    },
    "category": "Perspectives",
    "excerpt": "There is a very human aspect to modern AI models: they do better with mentoring. If you ask a modern AI model a question, it might generate a correct and insightful answer.",
    "readingTime": 3,
    "featured": false,
    "cover": {
      "kind": "field",
      "icon": "triad",
      "field": "lake"
    },
    "body": [
      {
        "type": "p",
        "text": "There is a very human aspect to modern AI models: they do better with mentoring. If you ask a modern AI model a question, it might generate a correct and insightful answer. Ask again with a slightly different phrasing, and you might get something less accurate. In some cases, pressing the model will cause it to revise or even walk back its earlier response."
      },
      {
        "type": "p",
        "text": "For most users, this isn’t just unexpected. It’s unsettling. We’re conditioned to treat software as precise and unambiguous. We expect a clear answer, and we expect it to be final. The idea that AI might generate a plausible yet flawed output (then reconsider that output in real time) feels strange."
      },
      {
        "type": "p",
        "text": "Does this mean it’s useless? Not ready?"
      },
      {
        "type": "p",
        "text": "Actually, this behavior is not only explainable; it’s foundational. Today’s AI doesn’t \"think\" in the way people often assume. It doesn’t run a fixed script or fetch a static record. Instead, it generates a large set of candidate answers and then estimates which one is most likely to be correct in context. This probabilistic reasoning is what gives AI its flexibility, but it also introduces uncertainty. Sometimes, the model will choose a suboptimal path. Occasionally, it will double back and adjust."
      },
      {
        "type": "h2",
        "text": "Embracing Uncertainty Is the Next Interface Challenge",
        "id": "embracing-uncertainty-is-the-next-interface-challenge"
      },
      {
        "type": "p",
        "text": "Rather than dismiss this as a shortcoming, we should see it for what it is: an early form of reflexive thinking. This isn’t quite how humans think. By necessity, to make the most of our brain compute, we operate at a higher level of abstraction and don’t work out hundreds of complete solutions to the problem the way AI does. But we also make mistakes and jump to conclusions. We rarely arrive at the perfect answer immediately. We speculate, we refine, we change our minds. And we have learned to accept that."
      },
      {
        "type": "p",
        "text": "The discomfort with AI fallibility, on the other hand, stems from a mismatch between reality and expectations. Users expect perfection from machines, yet we’ve built a system that has mimicked us in some ways. We trust humans not because they’re always right but because they learn. Can we learn to treat AI that way?"
      },
      {
        "type": "p",
        "text": "That means adjusting our expectations. Not down, but sideways. Instead of demanding perfect answers, we must demand better conversations. Transparent reasoning. Reflexive outputs. This shift in expectations may be as important as the models themselves."
      },
      {
        "type": "h2",
        "text": "Debugging Cognition",
        "id": "debugging-cognition"
      },
      {
        "type": "p",
        "text": "We don’t need AI to be flawless. We need it to be honest when it’s uncertain. We need transparency in reasoning, not just polish in presentation. That means interfaces that help users engage with reasoning processes, rather than conceal them behind authoritative-seeming answers. Just like we learned to debug code, we’ll learn to debug cognition."
      },
      {
        "type": "quote",
        "text": "We don’t need AI to be flawless. We need it to be honest when it’s uncertain.",
        "variant": "pull",
        "decorative": true
      },
      {
        "type": "p",
        "text": "There was a time when debugging code was seen as highly technical. Today, it's foundational literacy. Debugging AI (probing, understanding, and iterating on its outputs) may be next."
      },
      {
        "type": "p",
        "text": "And that starts by letting go of the illusion that intelligence means always being right. Sometimes, the most useful thing a system can say is simply: “Let me try that again.”"
      },
      {
        "type": "p",
        "text": "Reflexivity is built around this core principle: to help users harness the undeniable power of AI in connecting the dots that lead to trade ideas, or running complex portfolio risk simulations while embracing the need for occasional additional tips and instructions to the indefatigable analyst."
      }
    ]
  },
  {
    "slug": "what-if-ai-made-humans-more-essential",
    "title": "What If AI Made Humans More Essential?",
    "date": "2025-07-07",
    "author": {
      "name": "Jan Szilagyi",
      "role": "Chief Executive Officer",
      "bio": "Former Co-CIO at Lombard Odier, PM at Fortress. World record for fastest Harvard Economics PhD."
    },
    "category": "Perspectives",
    "excerpt": "The anxiety is palpable. “How long until AI makes us obsolete?” It’s the shadow trailing every advance.",
    "readingTime": 3,
    "featured": false,
    "cover": {
      "kind": "photo",
      "icon": "petals",
      "src": "/framer/vq1sLaQ1xkz3KG6dfXMcXxodvVE.jpg"
    },
    "body": [
      {
        "type": "p",
        "text": "The anxiety is palpable. “How long until AI makes us obsolete?”"
      },
      {
        "type": "p",
        "text": "It’s the shadow trailing every advance. Every GPT upgrade. Every agent demo. A gnawing question: Once we’re no longer the smartest entities in the room… what’s left for us to do?"
      },
      {
        "type": "p",
        "text": "Yes, the nature of work is shifting. Faster than ever. And yes, in many domains, AI will outperform, outproduce, and outpersist us. But not everyone is afraid."
      },
      {
        "type": "p",
        "text": "Some are hungry."
      },
      {
        "type": "h2",
        "text": "The Illusion of Infinite Productivity",
        "id": "the-illusion-of-infinite-productivity"
      },
      {
        "type": "p",
        "text": "The default answer to AI displacement is a hopeful one: “humans in the loop.” But even that vision quietly concedes something: that we’ll be supporting actors, not leads. That productivity gains will reduce headcount. Unless, of course, demand is boundless."
      },
      {
        "type": "p",
        "text": "Enter Health, and Wealth."
      },
      {
        "type": "p",
        "text": "Two categories where demand isn’t just durable. It's insatiable. You can’t be too healthy. You can’t be too prepared for an uncertain financial future. These aren’t checklist services. They’re lifelong pursuits. And they’re deeply, intensely human."
      },
      {
        "type": "h2",
        "text": "Why Wealth Management Won’t Be Automated Away",
        "id": "why-wealth-management-wont-be-automated-away"
      },
      {
        "type": "p",
        "text": "When most people hear \"financial advice,\" they think spreadsheets, algorithms, maybe a robo-advisor with a slick UI. But wealth — like health — lives at the intersection of emotion and complexity. It’s not just about optimizing a portfolio. It’s about navigating divorce, inheritance, retirement, fear, ambition, regret."
      },
      {
        "type": "p",
        "text": "That’s why financial advisors aren’t being replaced."
      },
      {
        "type": "p",
        "text": "They’re being outpaced by demand."
      },
      {
        "type": "p",
        "text": "Advisors aged 55 and older constitute 42% of the advisor population but manage 57% of client assets. They will retire within 10 years. At current productivity levels, the U.S. wealth management industry is staring down a deficit of up to 110,000 advisors by 2034. That’s a 30–37% shortfall. Not because advisors are inefficient. But because clients are multiplying faster than qualified humans can be trained."
      },
      {
        "type": "p",
        "text": "And those clients? They want people."
      },
      {
        "type": "p",
        "text": "Nearly 80% of affluent households say they’d pay a 50bps+ premium for a human advisor over a digital one priced at just 10bps. Nearly a third would pay double that. Why? Because advice is never just about returns. It’s about trust. About context. About sitting across from someone who doesn’t just model outcomes, but understands you."
      },
      {
        "type": "h2",
        "text": "This Isn’t a Cost Curve. It’s a Confidence Curve.",
        "id": "this-isnt-a-cost-curve-its-a-confidence-curve"
      },
      {
        "type": "p",
        "text": "The economics of advice are booming. Fee-based advisory revenues in the U.S. have nearly doubled from ~$150B in 2015 to ~$260B in 2024. And the number of human-advised relationships is growing 3x faster than the population."
      },
      {
        "type": "p",
        "text": "Why? Because financial wellbeing is no longer a luxury good. It’s a psychological need."
      },
      {
        "type": "p",
        "text": "This is the paradox of AI: as it gets better at the mechanical, the relational becomes more valuable. The very things machines can’t fake (empathy, presence, shared experience) become economic drivers. Advisors are no longer gatekeepers of data. They’re interpreters of meaning."
      },
      {
        "type": "h2",
        "text": "The Future Belongs to Advisors Who Partner with AI — Not Compete with It",
        "id": "the-future-belongs-to-advisors-who-partner-with-ai-not-compe"
      },
      {
        "type": "p",
        "text": "AI isn’t replacing the wealth manager. It’s replacing the parts of the job that slow them down. The paperwork. The data prep. The compliance drag."
      },
      {
        "type": "p",
        "text": "What remains is the real work: building trust, framing choices, guiding judgment. And as AI makes advisors more productive, it doesn’t eliminate the human. It elevates them from calculator to counselor, from planner to partner."
      },
      {
        "type": "quote",
        "text": "Wealth management isn’t becoming less human. It’s becoming more so.",
        "variant": "pull"
      },
      {
        "type": "p",
        "text": "And the first question is no longer “Will AI replace me?”"
      },
      {
        "type": "p",
        "text": "It’s: Why wouldn’t I want to do even more, with less friction, for the people who trust me most?"
      },
      {
        "type": "p",
        "text": "At Reflexivity, we're doing just that - empowering wealth managers to do more with less friction for their clients."
      }
    ]
  },
  {
    "slug": "what-if-the-cost-of-curiosity-for-investors-went-to-zero",
    "title": "What if the cost of curiosity for investors went to zero?",
    "date": "2025-07-01",
    "author": {
      "name": "Jan Szilagyi",
      "role": "Chief Executive Officer",
      "bio": "Former Co-CIO at Lombard Odier, PM at Fortress. World record for fastest Harvard Economics PhD."
    },
    "category": "Research",
    "excerpt": "At Reflexivity, we’ve built the most versatile AI-powered investment analytics engine on the planet.",
    "readingTime": 4,
    "featured": false,
    "cover": {
      "kind": "field",
      "icon": "knot",
      "field": "pine"
    },
    "body": [
      {
        "type": "p",
        "text": "At Reflexivity, we’ve built the most versatile AI-powered investment analytics engine on the planet. Its core reasoning capability emerges from the orchestration of large language models (LLMs) meticulously fine-tuned for financial analysis. These aren’t generic chatbots. They’re precision tools, calibrated to interpret probabilistic market structures, simulate macro shocks, run factor decompositions, and more — all in natural language."
      },
      {
        "type": "p",
        "text": "This cognitive layer is supercharged by a proprietary Knowledge Graph, which fuses disparate streams of institutional-grade data: real-time pricing, macroeconomic indicators, earnings transcripts, even geopolitical risk overlays. And atop it all sits Alfred — our AI agent, equally fluent in Bayesian inference and plain English."
      },
      {
        "type": "p",
        "text": "When users first interact with Alfred, they’re spellbound. “Wait, it can backtest my trading strategy?” Yes. “Run a Monte Carlo simulation on my portfolio, with correlated drawdowns and nonlinear tail risks?” Absolutely. What starts as skepticism morphs into awe."
      },
      {
        "type": "p",
        "text": "And then… silence."
      },
      {
        "type": "p",
        "text": "After the first flurry of questions, users stop. They didn’t hit a limit. They ran out of questions."
      },
      {
        "type": "p",
        "text": "It turns out, few investors have a mental inventory of complex analytical queries ready to go. After all, for decades, financial reasoning has been mediated by an older generation of tools (think spreadsheets) or arcane statistical libraries. Creativity was constrained by the enormous activation energy required to answer a single question. Why run a vector autoregression when a rule of thumb will do?"
      },
      {
        "type": "p",
        "text": "This is the paradox of Alfred: its analytical power is immense, and its adoption is bounded not by latency or compute — but by imagination."
      },
      {
        "type": "h2",
        "text": "Why Rules of Thumb Were Born",
        "id": "why-rules-of-thumb-were-born"
      },
      {
        "type": "p",
        "text": "Rules like “don’t fight the Fed” or “golden crosses are bullish” weren’t born because they were right — they were born because they were cheap. In a world where rigorous empirical analysis required weeks of work, it was rational to rely on heuristics."
      },
      {
        "type": "p",
        "text": "But Reflexivity changes the economics of inquiry. Now, a portfolio stress test costs seconds, not hours. Structural breaks in correlation matrices? Instant. Sentiment-weighted earnings signal from last night’s transcripts? A prompt away."
      },
      {
        "type": "quote",
        "text": "In this world, failing to ask questions is no longer an inconvenience. It’s negligence.",
        "variant": "pull"
      },
      {
        "type": "h2",
        "text": "User Prompting",
        "id": "user-prompting"
      },
      {
        "type": "p",
        "text": "This is why we’re focused not just on prompting Alfred — but on prompting users, too."
      },
      {
        "type": "p",
        "text": "The first step is to make it very easy for our users to think in terms of testable hypotheses, not just gut feel. We can weave these into workflows, interfaces, and nudges. We bring AI support where it’s most needed rather than wait for users to seek it out. But more than that, we’re training investors to reimagine the cost of curiosity."
      },
      {
        "type": "p",
        "text": "You just read a breaking news story: the U.S. is slapping heavy tariffs on imported steel. A trader’s first question used to be: Where’s my analyst/economist? Instead, integrated directly with institutional data providers like LSEG, Nasdaq, S&P Global etc., Reflexivity can help:"
      },
      {
        "type": "list",
        "items": [
          {
            "text": "“Which of my holdings are most exposed to steel prices?”"
          },
          {
            "text": "“Who are the top three U.S. importers of steel today?”"
          },
          {
            "text": "“What is the marginal effect of a 10% increase in steel prices on each stock’s expected return?”"
          }
        ]
      },
      {
        "type": "p",
        "text": "Each question is a doorway into a previously time-consuming analysis. Now, it’s zero-friction."
      },
      {
        "type": "h2",
        "text": "Push Meets Pull: Content with Teeth",
        "id": "push-meets-pull-content-with-teeth"
      },
      {
        "type": "p",
        "text": "Reflexivity doesn’t just wait for the user to ask the right questions. It pushes content — dynamic, insightful, contextual — and pairs it with reasoning."
      },
      {
        "type": "p",
        "text": "That’s where our dual engines come in: Insights (push) and Alfred (pull). The insight pipeline surfaces relevant macro shifts, market anomalies, and policy events. Alfred then becomes the interactive lens through which users can interrogate them. The synergy creates a virtuous loop: content invites curiosity; reasoning refines insight."
      },
      {
        "type": "p",
        "text": "Clients love that Alfred answers their questions. But they value even more that Alfred prompts the questions they should have asked."
      },
      {
        "type": "h2",
        "text": "The Road Ahead",
        "id": "the-road-ahead"
      },
      {
        "type": "p",
        "text": "We’ve already started building the connective tissue: tying together passive insights with active reasoning. The roadmap includes features that turn every insight into an invitation — click here to simulate, backtest, or scenario-stress the impact."
      },
      {
        "type": "p",
        "text": "In time, this will become second nature. But for now, we are bridging an age-old gap: between the human instinct to simplify, and the machine’s ability to amplify."
      },
      {
        "type": "p",
        "text": "The future of investing may belong to those who ask better questions."
      },
      {
        "type": "p",
        "text": "And the first one is: Why didn’t we do this sooner?"
      }
    ]
  }
];


export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export function getFeatured() {
  return POSTS.find((p) => p.featured) ?? POSTS[0];
}

/** Related: same category first, then most recent. */
export function getRelated(slug: string, n = 3) {
  const post = getPost(slug);
  const others = POSTS.filter((p) => p.slug !== slug);
  const same = others.filter((p) => p.category === post?.category);
  const rest = others.filter((p) => p.category !== post?.category);
  return [...same, ...rest].slice(0, n);
}

export function getToc(post: BlogPost) {
  return post.body.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2").map((b) => ({ id: b.id, text: b.text }));
}
