URL: /blog/the-question-graveyard STATUS 200 TITLE Reflexivity | Investment research you can check.

ELIT
/
PERSPECTIVES
## The Question Graveyard
RJ Assaly [->null]
Chief Product Officer [->null]
6 min
sunt
•
Anim eiusmod
March 3, 2026
![The Question Graveyard](https://framerusercontent.com/images/4bEPMYKNkNRN2EAIwhHWHKeRSJc.png) 730x410
Every investor I know has a graveyard of questions they never answered.
Not because the questions were bad. Not because the data didn't exist. Because the path from "I wonder if..." to an actual answer required too many intermediate steps — finding the right dataset, figuring out what it's called, cleaning it, running the analysis, interpreting the output. By the time you've scoped the work, the moment has passed or you've moved on to something more urgent.
These aren't lazy people. They're some of the sharpest minds in finance. The questions they're asking are often exactly the right ones. But there's a gap between having a good question and being able to operationalize it — and that gap kills more valuable analysis than most people realize.
### Two Conversations That Stuck With Me
A friend who runs a long/short equity book called me a few months ago with a question: what's the historical relationship between auto sales and semiconductor stocks? He had a thesis — something about the auto cycle leading semi demand in a way that wasn't priced in. In particular, that relationship had gotten completely out of whack during COVID, and he wanted to understand whether it had fundamentally changed or whether it would normalize back to historical patterns.
He knew the data existed. But he didn't know exactly where. He didn't know whether he needed seasonally adjusted or unadjusted figures. Global or country-by-country? Which semi names had meaningful auto exposure? He's not a quant. He's a PM with a good instinct and twenty years of pattern recognition. But the distance between his intuition and an actual testable analysis was enormous. Traditionally, he'd hand that to a junior analyst and get something back in a few days — by which point the trade idea might already be stale, or he's focused on something else.
A system like ours collapses that entirely. He describes what he's looking for in plain language. The system resolves the right datasets, figures out the appropriate adjustments, identifies the relevant semi names, runs the analysis, and hands him back something he can actually evaluate. Not a chatbot response — a real analytical output he can interrogate, iterate on, and act on.
A different friend — a buy-side analyst at a multi-strat fund — has the opposite version of the same problem. He doesn't lack data. He's drowning in it. His fund buys credit card transaction data, web traffic data, app download data, satellite imagery — the whole alternative data stack. He knows he wants to predict same-store sales for a set of companies. He knows the answer is probably somewhere in the data he's already paying for.
But he doesn't know which variables are actually predictive. He doesn't know if some of his data sources are redundant — duplicating the same signal, meaning he could cut costs without losing edge. He doesn't know how to set up the analysis to figure that out. He knows the question. He has the data. He just can't get from one to the other.
That second case is almost more frustrating than the first. You're paying for the answer and can't access it.
### The Gap Nobody Talks About
There's a narrative in finance that the bottleneck is data. Get more data, get better data, get alternative data. Billions of dollars flow into data procurement every year. But in my experience, the actual bottleneck — the thing that prevents good analysis from happening — is much more mundane: it's the translation layer between a human question and a structured, testable analysis.
Most investment professionals aren't quants. They shouldn't need to be. They have domain expertise, market intuition, and good questions. What they don't have is the ability to — on the fly — resolve the right dataset, determine the right methodology, and execute the analysis.
The traditional answer is to hire for it. And we've seen how that plays out at firms firsthand: they recruit brilliant quantitative minds out of Google or Meta, spend heavily on data infrastructure, and then wait. It takes the better part of a year for those hires to learn enough about finance to tell a PM something useful. And when they finally do, there's a credibility problem — the PM who's been doing this for two decades isn't always receptive to the new person who doesn't know the domain telling them what to do. The talent is real. The friction is structural.
Even when that model works — when the quant team is established, credible, and productive — there's still a queue. Questions get prioritized. Anything that isn't urgent gets pushed. And by the time the analysis comes back, the market has moved, the catalyst has passed, or the PM's attention is elsewhere. The question got answered — just too late to matter.
The result is a quiet, constant triage. Every day, PMs and analysts are implicitly prioritizing which questions are "worth" the effort of answering. The threshold is high. A quick check — sure. But anything that requires assembling data from multiple sources, running a non-trivial analysis, or exploring a hypothesis? That goes to the back of the queue. And most of the time, it dies there.
We hear something else from our users that I think is related: a nagging, ambient sense of "what am I missing?" It's not a specific question — it's the feeling that there's signal in the noise they can't quite reach. That somewhere in the data they have access to, or the data that exists in the world, there are patterns and relationships that would change how they think about a position. But they can't surface them because the cost of exploring is too high.
### What Changes
This is what systems like ours are actually for. Not "AI for finance" in the abstract — a specific, concrete thing: collapsing the distance between a question and an answer.
The user knows what they want to ask. The system handles everything in between — resolving entities, finding the right data, choosing an appropriate methodology, executing the analysis, and presenting the results in a form that a domain expert can evaluate and act on. The human brings the question and the judgment. The system brings the execution.
And something interesting happens once that gap closes: people start asking better questions. We see this consistently. A user comes in with a straightforward query — something they could probably have answered manually with enough time. They get an answer in minutes. And then they ask a follow-up they wouldn't have thought to ask before, because the first answer opened a new thread. And then another. The ceiling on what feels "worth exploring" rises dramatically when the cost of exploration drops to near zero.
We saw this with one of our earliest users. He started a session asking if he could filter a screen by subsector. Within an hour, he was asking whether he could build custom scenario analyses — testing how a basket of EV semiconductor names would perform if global auto sales returned to normalized levels. He went from "can I sort this list" to "can I test a macro hypothesis against a custom universe" in a single sitting. Each answer raised the ceiling on what he thought was worth asking.
### The Question Graveyard Isn't Inevitable
The tragedy of the question graveyard isn't that the questions are unanswerable. It's that they're eminently answerable — the data exists, the methodologies are known, the questions are well-formed. The only thing missing is the connective tissue between the person who has the question and the infrastructure that can answer it.
That connective tissue is what we spend our time building at Reflexivity . It's not glamorous work — entity resolution, data orchestration, methodology selection, structured outputs. But it's the work that turns "I wonder if..." into an actual answer. And every time it does, a question that would have died in the graveyard gets to live instead.
RJ Assaly [->null]
Chief Product Officer [->null]
Share this article:
Former Product Lead at Kensho (acquired by S&P Global). Previously AllianceBernstein.
On this page
- Two Conversations That Stuck With Me
- The Gap Nobody Talks About
- What Changes
- The Question Graveyard Isn't Inevitable
## Explore more articles
View all articles [->../blog]
- July 1, 2025 · Jan Szilagyi What if the cost of curiosity for investors went to zero? At Reflexivity, we’ve built the most versatile AI-powered investment analytics engine on the planet. Its core reasoning capability… Read more
- July 7, 2025 · Jan Szilagyi What If AI Made Humans More Essential? The anxiety is palpable. “How long until AI makes us obsolete?” It’s the shadow trailing every advance. Every GPT upgrade. Every agent… Read more
- August 7, 2025 · Jan Szilagyi The ideal AI agent is honest, not flawless There is a very human aspect to modern AI models: they do better with mentoring. If you ask a modern AI model a question, it might… Read more
### Velit dolore culpa laboris.
Aute sed Sint [->../blog]
Aute Voluptate [->../]
