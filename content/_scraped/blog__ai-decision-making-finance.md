URL: /blog/ai-decision-making-finance STATUS 200 TITLE Reflexivity | Investment research you can check.

ELIT
/
PERSPECTIVES
## The Copilot Paradox: Rethinking AI Decision-Making in Finance
RJ Assaly [->null]
Chief Product Officer [->null]
7 min
sunt
•
Anim eiusmod
April 14, 2026
![The Copilot Paradox: Rethinking AI Decision-Making in Finance](https://framerusercontent.com/images/WZ7f5kM7YQpg9vhSKa6YHB2298.png) 730x410
#### The best AI for investment research surfaces what matters, explains why it’s most relevant, and leaves the final call to the user. In finance especially, trust comes from extending human judgement, without taking over the decision.
Every AI product eventually encounters a specific moment of failure, and it almost never looks the way you'd expect. The system does something useful, something correct even, and the user's first response is: "Why did it do that?"
That reaction should be celebrated, in theory. The system worked. But in practice it signals something corrosive, a loss of control that, in professional contexts, can be much harder to recover from than a system that simply doesn't do enough. The underpowered tool gets abandoned quietly. The overpowered one gets abandoned with suspicion, and the user carries that suspicion into every future interaction.
I've been thinking about this problem for a while now, because at Reflexivity we're building AI systems used in investment research by finance professionals who have spent entire careers developing judgment about markets, instruments, and risk. The "copilot" framing that the industry has settled on contains a hidden assumption: that the pilot wants help. From what I've seen, the real demand is more precise than help. It's leverage, helping people cut through signal vs noise in investing and focus on what really matters. The consistent request we hear, stated in different ways, is some version of "help me make more of me," make sure I don't miss the thing I would have caught if I had more time, surface the connection I would have drawn if I could watch every market simultaneously. The system should extend the user's judgment without competing with it. That sounds like a simple distinction, but it turns out to be one of the hardest things to get right in product design.
This makes the design challenge genuinely hard, because the obvious answer ("just make the AI better") misses the point entirely.
## Where AI should stop in the investment research workflow
What we've found works, and I suspect this generalizes well beyond finance, is a default flow with a clear stopping point. When the system surfaces an insight, it moves through a sequence: here is what happened, here is why it matters to you specifically, here is the range of possible outcomes from here, and here is how you could express a view on it. Then it stops. The system does not recommend a specific trade, a specific structure, or a specific position size unless the user explicitly asks.
That "why it matters to you" step is worth pausing on, because early users actually demanded it. The most common piece of feedback we got on alerts was "why am I seeing this?" People wanted the system to interpret relevance, to say "you own Lockheed, which has exposure to drone technology, and this is a regulatory development affecting drones." What they didn't want, and reacted strongly against in early prototypes, was the system telling them what to do about it. I've written before about how natural language and point-and-click interfaces serve different moments in a workflow. This is the deeper question underneath that: not just which mode the user is in, but who is driving.
The distinction sounds simple when you state it plainly. Interpret for me, but don't act for me. In practice, finding exactly where interpretation ends and action begins is one of the harder design problems we've dealt with.
## The Betty Crocker problem
There's a famous story from the 1950s about Betty Crocker cake mixes. The original formula included powdered eggs, so all you had to do was add water. It flopped. When they reformulated to require cracking a real egg, sales took off. The explanation most people give is psychological: people needed to feel like they were baking, even if the egg didn't meaningfully change the cake.
The parallel to AI-assisted professional work is strong, but messier than most people acknowledge. Sometimes the eggs are symbolic. The system could have gotten to the right answer, but the user needs ownership of the decision for it to feel legitimate. From what I've seen, this is especially true in portfolio construction, where the analytical path to a conclusion matters almost as much as the conclusion itself, because the analyst needs to be able to defend it to a PM or a client.
But sometimes the eggs are real. Consider someone receiving an alert that the Chilean peso is likely to devalue against the dollar. The number of ways to express that view is enormous: you could trade spot, you could trade forwards, you could look at cross-currency basis swaps, you could move into options. The right structure depends on things the system genuinely cannot know, like your existing book, your risk appetite, whether your mandate allows exotic instruments, what your counterparty relationships look like. No amount of model intelligence closes that gap, because the information lives in the user's head and in systems the AI doesn't have access to.
What convinced me that this framing is important is that both versions are true simultaneously, and the system has to handle the ambiguity gracefully. You can't design for one and ignore the other. If you assume the eggs are always symbolic, you'll condescend to users by withholding capabilities the system actually has. If you assume they're always real, you'll under-invest in the parts of the workflow where the system could genuinely do more.
## Why over-doing is worse than under-doing
The two failure modes, doing too little and doing too much, sound symmetrical but they aren't. When a system does too little, the user is annoyed, maybe frustrated, but they remain in control. The cost is adoption: they use the tool less, or stop using it entirely. That's a product problem, a serious one, but it's recoverable.
When a system does too much, especially if it does the right thing in a way the user doesn't understand, the damage is different in kind. It introduces doubt about every prior output. If it made this decision without me, what other decisions has it been making? In finance, where a single wrong number or wrong instrument can have real consequences, that doubt is corrosive. My intuition is that one episode of unexplained autonomy costs more trust than a dozen episodes of the system being too conservative.
This asymmetry has a practical implication for how we think about recommendations. When a user does ask "what would you recommend?", the conversation should feel collaborative, not declarative. The system suggests a structure, the user pushes back or asks about alternatives, the system adjusts. The recommendation emerges from the exchange rather than being handed down. This takes more time and more tokens than simply outputting an answer, but the adoption difference is significant.
## What actually matters for trust
I keep coming back to a formulation that I think captures most of what we've learned: users will accept a surprising amount of intelligence from a system, including interpreting why something matters and mapping out complex scenario trees, as long as they retain the feeling of authorship over the decision. This is especially applicable in a financial context where they’re accountable for the outcome. The line people draw in their heads has less to do with what the system knows and more to do with what it does. Knowledge is welcomed. Action without invitation is not.
There's a related point about explanation that matters here. When the system does surface something for the user's input, the quality of the ask matters enormously. "Do you want to proceed?" is empty friction, it doesn't tell you what you're proceeding with or why the system paused. "I'm seeing three possible structures for this view, each with different risk profiles, want me to walk through them?" gives the user a reason to engage. The difference looks small in a product spec, but in practice it's the difference between a system that feels like it's deferring to you and one that feels like it's dumping decisions on you because it doesn't know what to do.
As the system gets to know a user over time (through their watchlists, the countries and themes they follow, the work they do within the platform) the autonomy can expand naturally. We're early in this, but the trajectory is clear: a system that has watched you engage with dozens of alerts about Latin American FX and has seen the structures you tend to favor should be able to move further along the interpretation-to-action spectrum than one encountering you for the first time. The trust earns itself, if you've been careful not to break it early on.
## The Takeaway
The best AI systems win by stopping at the right moment.
In investment research users will accept a surprising amount of intelligence as long as they remain the author of the decision. The role of AI is to expand what they can see, surface what matters, and help them cut through signal vs noise in investing.
Push beyond that, and it stops feeling like leverage.
RJ Assaly [->null]
Chief Product Officer [->null]
Share this article:
Former Product Lead at Kensho (acquired by S&P Global). Previously AllianceBernstein.
On this page
- The best AI for investment research surfaces what matters, explains why it’s most relevant, and leaves the final call to the user. In finance especially, trust comes from extending human judgement, without taking over the decision.
- Where AI should stop in the investment research workflow
- The Betty Crocker problem
- Why over-doing is worse than under-doing
- What actually matters for trust
- The Takeaway
## Explore more articles
View all articles [->../blog]
- July 1, 2025 · Jan Szilagyi What if the cost of curiosity for investors went to zero? At Reflexivity, we’ve built the most versatile AI-powered investment analytics engine on the planet. Its core reasoning capability… Read more
- July 7, 2025 · Jan Szilagyi What If AI Made Humans More Essential? The anxiety is palpable. “How long until AI makes us obsolete?” It’s the shadow trailing every advance. Every GPT upgrade. Every agent… Read more
- August 7, 2025 · Jan Szilagyi The ideal AI agent is honest, not flawless There is a very human aspect to modern AI models: they do better with mentoring. If you ask a modern AI model a question, it might… Read more
### Velit dolore culpa laboris.
Aute sed Sint [->../blog]
Aute Voluptate [->../]
