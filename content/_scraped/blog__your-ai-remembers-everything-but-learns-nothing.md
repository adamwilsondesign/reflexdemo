URL: /blog/your-ai-remembers-everything-but-learns-nothing STATUS 200 TITLE Reflexivity | Investment research you can check.

ELIT
/
PERSPECTIVES
## Your AI remembers everything, but learns nothing.
RJ Assaly [->null]
Chief Product Officer [->null]
11 min
sunt
•
Anim eiusmod
March 11, 2026
![Your AI remembers everything, but learns nothing.](https://framerusercontent.com/images/lChshdmJJZ2tZJ6PNRSME7T6nk.png) 730x410
Imagine you hire a junior analyst: sharp, fast, knowledgeable. On Monday, you ask them to run scenario analysis on a position in case SPX drops 15%. They use a simple linear projection and you correct them - "We use Monte Carlo for this." They fix it and it looks correct.
Tuesday morning, same type of question, same mistake. You correct them again. Wednesday, the same again. By Thursday, you're questioning the hire.
Now imagine this analyst also forgets your name every morning. Forgets that you cover Latin-American rates. Forgets that when you say "returns" you mean vol-adjusted, not beta-adjusted. Every single day, you start from zero.
You'd fire that analyst inside a week.
But this is exactly how most AI products work today.
### The Filing Cabinet
AI memory, as it currently exists, is mostly a filing cabinet. Individual facts, accumulated over time, stored in a flat list with no hierarchy and no structure.
Here's what this looks like in practice - these are actual memories stored by a leading AI assistant for a sophisticated user:
- "User asked about gold futures on January 15"
- "Discussed bond restructuring in last conversation"
- "User's colleague is named Mike"
- "Prefers answers to be in a professional tone"
- "Is an expert in financial markets"
- "Has created an email folder named 'gold'"
Some of these are trivia from a single conversation that will never matter again. Some are genuine preferences… yet they’re all stored the same way: flat, unranked, undifferentiated. An S3 bucket name sits alongside a career-defining area of expertise. There's no understanding of what matters, what's ephemeral, and what should actually change how the system behaves.
More importantly: none of these memories change the execution path. Whether the system knows you "prefer a professional tone" or not, the analysis it runs is identical. The output gets a different coat of paint. The substance doesn't change.
This isn't memory. It's note-taking.
### Remembering Who You Are vs. How You Work
There's a difference between remembering who someone is and remembering how they work. Most AI memory systems are optimizing for the former while the real value is in the latter.
I think about this as two categories:
Stylistic preferences shape how the output looks. Tone, formatting, length, structure. "Prefers bullet points." "Use a professional tone." These are legitimate preferences and worth remembering, but they're the easy ones. They're applied at the end of the pipeline - a formatting layer on top of whatever analysis the system has already done.
Methodological preferences shape what the output is… how analysis gets run; which assumptions get made; what data gets used:
- "When analyzing returns, use vol-adjusted, not beta-adjusted."
- "For LatAm bonds, default to local currency denomination, not hard currency."
- "Scenario analysis should use Monte Carlo simulation."
These preferences change the execution path. They're the difference between getting the right answer on the first try and getting corrected on the second turn.
Every correction a user makes is a signal. When someone says "actually, I wanted vol-adjusted," they're not just fixing one output - they're telling you something about how they work. Most systems throw that away! The correction fixes the current response and then evaporates.
### From Filing Cabinet to User Model
What you actually need isn't a list of facts. It's a synthesized model of how a person works.
We've been experimenting with this at Reflexivity. As an exercise, we took the full question history of one of our power users - 219 queries over several months - and ran an extraction pass designed to build a structured user profile. Not "what facts do we know about this person" but "what would a new team member need to know to work effectively with this person from day one?"
The extraction looks across multiple dimensions:
- Expertise level and domain: Not just "works in finance" but the specific sophistication level - are they asking introductory questions or referencing swap rates and 5s30s spreads?
- Instruments and markets: Which specific tickers, indices, and instruments appear repeatedly? This tells you the universe they operate in.
- Methodological preferences: What analytical approaches do they favor? Seasonal decomposition? Correlation analysis? Carry analysis? When they ask for scenario analysis, what do they expect under the hood?
- Output expectations: Not just "bullet points vs. paragraphs" but deeper patterns - do they want the reasoning shown? Do they verify the math? Do they expect specific table structures for comparisons?
- Personas they invoke: Some users consistently ask the system to adopt specific expert frames - "answer as a PhD economist at a major bank" or "think like a swap trader." These aren't whims; they're calibrations of the depth and framing they expect.
The output is something like an operating manual for working with that person. Almost like synthesized paragraph that could be handed to a new analyst on their first day:
"This user is a sophisticated institutional macro PM focused on LatAm rates and FX, particularly Chile, Brazil, Colombia, and Mexico. They expect professional-grade terminology without explanation of basics. They favor empirical evidence, historical event studies, and correlation analyses. All mathematical calculations, especially swap pricing and forward rates, must be exact - they will check your work."
Compare that to "Uses Chrome instead of Microsoft Edge."
The interesting thing is what emerges from the extraction that no individual conversation would tell you. Patterns across sessions. The fact that a user has asked about Chilean CPI seasonals eight times across different months isn't visible in any single conversation - but it tells you something fundamental about their research process. The fact that they correct beta-adjusted to vol-adjusted three times reveals a methodological preference that was never explicitly stated.
### The Payoff: Why This Actually Matters
Building a user model isn't an academic exercise. It has concrete, measurable effects on system performance.
Two turns become one. This is the most immediate win. Without a preference model, the interaction often goes: user asks question → system delivers answer using default methodology → user corrects → system reruns. With a preference model, the first response is right. For a professional running dozens of queries a day, eliminating that correction loop is significant.
Execution gets faster. When you know a user operates in a specific domain, you can constrain certain steps in the pipeline. Search can be boosted toward relevant instruments and markets. Entity resolution can be weighted toward likely interpretations. If the system knows this user works in Chilean fixed income, "the rate" probably refers to the Camara swap rate, not the Fed funds rate. That disambiguation, which might otherwise require a clarifying question or a wrong first attempt, happens instantly.
The system can anticipate. With enough traces of past executions - not just questions, but the full chain of what analysis was run and how results were used - the system can start suggesting what to ask next. A user runs a screening query, and the system knows from past behavior that they typically follow with a chart and then a deep dive on the top result. Instead of waiting for each request, it can prepare or suggest the next step.
Corrections compound. Every methodological correction improves not just the current session but every future session. The system develops a richer model of how this user thinks, which means it gets closer to the right answer faster over time. This is the core promise: the second conversation should be better than the first, and  the twentieth should be dramatically better. **Workflows become automated. **When the system has enough traces, it can see patterns the user might not even notice themselves. A user who runs the same CPI analysis every month at the same time is a candidate for a scheduled query - the analysis runs automatically and the results are waiting when they sit down. Today that's a nudge: "You've run this analysis three months in a row - want to make it automatic?" Tomorrow, the system could set it up without asking. The preference model doesn't just learn how you work. It learns what you work on and when, and starts taking things off your plate entirely.
### The Hard Problems
None of this is easy, and we'd be dishonest to pretend otherwise.
There are several genuinely difficult problems here, and I think the industry underestimates the degree to which solving them is more art than science.
### Workflow Preferences vs. Intellectual Property
This is the trust boundary, and it matters enormously in finance. A portfolio manager absolutely wants the system to remember that they prefer vol-adjusted returns and Monte Carlo simulations. They absolutely do not want the system to remember - and potentially leak into shared models - that they're building a specific position or exploring a particular trade thesis.
The distinction is between how I work (methodology, formatting, analytical standards) and what I'm working on (ideas, positions, strategy). A preference system needs to capture the former while being extremely careful about the latter. If users don't trust that the boundary is maintained, they won't use the system for anything meaningful.
### The Overfitting Problem
Build a strong user model and you create a new failure mode: the system over-applies what it knows.
Our LatAm rates trader asks about a Canadian penny stock because a friend mentioned it over dinner. If the system is too anchored to the user model, it might try to frame the analysis through a macro lens, default to institutional-grade methodology, or worse, attempt to resolve the ticker against the wrong universe of instruments.
A good human analyst who's worked with you for a year knows when your preferences apply and when they don't. They can read the register shift - "my buddy told me about this random mining stock" is a different kind of query than "run me the Chile CPI seasonal decomposition."
The system needs the same instinct: not just what the preferences are, but when to apply them.
This turns out to be a classification problem in itself. Is this query within the user's core domain? Adjacent to it? Completely outside it? The right behavior is different in each case - full model, selective application, mostly ignore (keep formatting, drop methodology). Getting this wrong is arguably worse than having no user model at all, because confidence in the wrong context produces confidently wrong answers.
### Extraction: What to Capture
Not every signal is worth preserving. Current memory systems fail here in both directions - they capture trivial facts (a folder name) while missing critical patterns (a repeated methodological correction).
The extraction challenge has several layers. Stated preferences are easy - the user tells you what they want. Revealed preferences are harder but more valuable - what does the user's behavior tell you about how they work? A user who consistently reformats your tables into a specific structure is telling you something. A user who always asks for a follow-up chart after a screening query is telling you something. A user who checks your math every time is telling you something about the level of rigor they expect.
And then there are implied assumptions - the things a user never specifies because they consider them obvious. These are the silent failures. The LatAm trader doesn't say "local currency" because in their world, that's the default. When the system returns hard currency data, it feels broken. But the user never explicitly stated the preference, because to them it wasn't a preference - it was just how things work.
### Representation: How to Store It
Even if you capture the right signals, a flat list doesn't give you the structure to use them. A user model needs hierarchy - methodological preferences matter more than formatting preferences. It needs relationships like "works in LatAm FX" connects to "default to local currency." And it needs synthesis: don't store fifteen individual corrections, recognize the pattern they reveal.
There's also the temporal dimension, because preferences are not static. A user might shift focus from Chilean rates to Brazilian equities. A methodology preference might evolve as they learn something new. The system needs some concept of decay - recent signals weighted more heavily than older ones - without losing foundational preferences that hold steady over time. In practice, this looks something like exponential decay: recent interactions are preserved in full, while older context gets progressively compacted. But what survives the compaction and what gets lost is a design decision with real consequences.
### Knowing When a Preference Has Changed
Related but distinct: how do you know when a correction is updating a preference versus being a one-off exception? If a user who always wants Monte Carlo says "just do a simple linear projection this time," is that a new preference or a shortcut for this specific query? The system needs to distinguish between "I've changed my mind about how I work" and "this particular case is different." Humans do this effortlessly through context. Systems need to be taught.
### The Art of It
I think people underestimate how much of this is art rather than science. The engineering community wants clean abstractions - extract preferences, store them in a schema, apply them deterministically. And the infrastructure matters. But the difference between a system that feels magical and one that feels frustrating often comes down to judgment calls that resist formalization.
When do you lean on the user model and when do you set it aside? How aggressively do you compact old context? How do you weigh a correction - is it a preference update or an exception? How do you handle the user who's an expert in one domain and a novice in another within the same conversation?
These are design problems that require taste, iteration, and a willingness to be wrong.
We've gotten some of them right. We're still working on others. The honest state of things is: we've built the infrastructure for per-tool memory and context management, we've proven the extraction works, and we've done significant R&D on using past traces to improve current execution. The closed loop where every interaction automatically refines the user model, which automatically improves the next interaction, is what we're building toward.
What gives me confidence is that the underlying thesis keeps validating. Every time we show a user their extracted profile, the reaction is the same: "Yes. This is exactly how I work. Why doesn't the system already know this?"
The second conversation should be better than the first. We're getting there.
RJ Assaly [->null]
Chief Product Officer [->null]
Share this article:
Former Product Lead at Kensho (acquired by S&P Global). Previously AllianceBernstein.
On this page
- The Filing Cabinet
- Remembering Who You Are vs. How You Work
- From Filing Cabinet to User Model
- The Payoff: Why This Actually Matters
- The Hard Problems
- Workflow Preferences vs. Intellectual Property
- The Overfitting Problem
- Extraction: What to Capture
- Representation: How to Store It
- Knowing When a Preference Has Changed
- The Art of It
## Explore more articles
View all articles [->../blog]
- July 1, 2025 · Jan Szilagyi What if the cost of curiosity for investors went to zero? At Reflexivity, we’ve built the most versatile AI-powered investment analytics engine on the planet. Its core reasoning capability… Read more
- July 7, 2025 · Jan Szilagyi What If AI Made Humans More Essential? The anxiety is palpable. “How long until AI makes us obsolete?” It’s the shadow trailing every advance. Every GPT upgrade. Every agent… Read more
- August 7, 2025 · Jan Szilagyi The ideal AI agent is honest, not flawless There is a very human aspect to modern AI models: they do better with mentoring. If you ask a modern AI model a question, it might… Read more
### Velit dolore culpa laboris.
Aute sed Sint [->../blog]
Aute Voluptate [->../]
