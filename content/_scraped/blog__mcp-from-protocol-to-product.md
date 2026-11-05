URL: /blog/mcp-from-protocol-to-product STATUS 200 TITLE Reflexivity | Investment research you can check.

ELIT
/
PERSPECTIVES
## MCP: From Protocol to Product
RJ Assaly [->null]
Chief Product Officer [->null]
7 min
sunt
•
Anim eiusmod
December 9, 2025
![MCP: From Protocol to Product](https://framerusercontent.com/images/JeCa20f0o0iERDr7MAdGNroSaE.png) 730x730
### The Excitement and the Gap
There's a lot of excitement around MCP right now, and for good reason. The Model Context Protocol represents a genuine step forward in how AI systems connect to external data and capabilities. But there's often a gap between adopting MCP as a standard and actually building products that deliver value through it.
The core insight: MCP is plumbing, not product. It solves the interconnection problem - how do I expose my data/capabilities to AI systems in a standardized way? - but it doesn't solve the much harder problems of what to expose, how intelligent those endpoints should be, and how consuming systems will actually orchestrate across multiple tools.
Standardization doesn't mean quality. Two MCP servers can both be "compliant" while differing enormously in how useful they are to an AI system trying to accomplish real tasks.
### The Fundamental Architecture Question: Where Does the Intelligence Live?
When building MCP-enabled capabilities, you face a core design decision: should the intelligence live in the reasoning layer (the AI system calling your tools), or in the tools themselves?
Simple Tools:
- Expose raw data and basic operations
- Let the consuming AI system figure out how to orchestrate, transform, and interpret
- Example: get_price(ticker, date) returns a number
Smart Tools:
- Package multiple operations, include interpretation logic, handle ambiguity
- Return structured, contextualized results
- Example: analyze_security(query) that resolves what the user means, retrieves relevant data, and returns a synthesized view
Neither approach is inherently correct. The right choice depends on several factors:
- How much underlying complexity exists? If there are 15 steps between a user's question and an answer, packaging that into a smart tool may be necessary.
- Is this capability used in one context or many? If the same functionality needs to be accessed from multiple different systems with different reasoning capabilities, smarter tools provide more consistent results.
- What can you assume about the consumer? If the AI system calling your MCP has sophisticated planning and code generation capabilities, simpler tools may suffice. If not, your tools need to compensate.
- Where is the domain expertise? Sometimes the tool provider (you) knows far more about how to interpret and use the data than any general-purpose AI system could.
In practice, most mature implementations end up with a mix - some simple endpoints for basic operations, some smart tools that package complex workflows.
### The Entity Resolution Problem
Here's a concrete example of where this gets hard. A user asks: "What's gold trading at?"
Does that mean:
- GC1 (front-month COMEX futures)
- GLD (the ETF)
- XAUUSD (spot gold)
- A specific futures contract month
- Something else entirely
Here's why this matters architecturally: if you handle entity resolution poorly, you end up doing the same work over and over again. In our gold/dollar example, if each of the 6 tool calls has to independently figure out what "gold" means, you're:
- Repeating the same resolution logic 6 times
- Burning tokens and time on redundant work
- Paying 6x the cost for something you should do once
- Potentially getting inconsistent results (tool A resolves to GC1, tool B resolves to GLD)
The fundamental tension is: do you bake resolution into every tool (making them slower and redundant), or do you have a mechanism to resolve once and pass context forward?
There are a few approaches:
- Push it to the consumer: Your MCP requires exact identifiers. The AI system calling you must figure out what the user means before calling your endpoint. This works, but it means every consumer of your MCP needs to build their own resolution layer - massive duplication of effort across the ecosystem.
- Build resolution into every tool: Your MCP accepts natural language queries and handles disambiguation internally. This makes tools easy to use in isolation but creates massive redundancy in multi-tool workflows. You're re-resolving entities on every call.
- Expose resolution as its own capability: Offer a dedicated resolve_entity(query, context) function that gets called first, returning standardized identifiers that downstream functions accept. This is cleaner, but requires the consuming AI system to understand that resolution is a prerequisite step.
- Support stateful context passing: Allow tools to return resolved entities in a standardized way that subsequent tools can reference. This is the most efficient but requires thinking carefully about how state flows through a multi-step workflow.
At Reflexivity, we've found that robust entity resolution is often the difference between an MCP that works in demos and one that works in production. Users don't speak in RICs or CUSIPs - they speak in natural language, abbreviations, and contextual references ("the stock we were looking at earlier").
This last point raises another architectural consideration: how do you handle conversational context? When a user refers to "the stock we looked at earlier," the resolution layer needs access to:
- Conversation history and memory
- A log of prior tool calls and their results
- Compressed or summarized context from earlier in the session
Without this, every query has to be completely self-contained, which isn't how people actually work. The MCP design question becomes: is this the tool's responsibility (each tool maintains conversation state), the reasoner's responsibility (it manages context and passes it explicitly), or some shared protocol for context management? This ties back to the redundancy problem - if you're re-establishing context on every tool call, you're wasting resources.
### Orchestration: The Hidden Complexity
Even with well-designed individual tools, there's significant complexity in how they get orchestrated together.
Consider a question like: "Gold is 10% off its high and the dollar index is near a high - help me understand if gold goes back to all time highs, what's the likely move in the dollar index. Give me plots for different scenarios."
Answering this requires:
- Resolving "gold" and "dollar index" to specific instruments
- Retrieving historical price data for both
- Calculating current levels relative to highs
- Running some kind of correlation or regression analysis
- Generating scenario projections
- Creating visualizations
That's potentially 6+ tool calls that need to happen in the right sequence, with information passing correctly between them. The output of step 1 (resolved identifiers) needs to flow into steps 2-6. The data from step 2 feeds the calculations in steps 3-4.
Key questions for MCP design:
- How do you avoid redundant work? If tool A resolves an entity, how does tool B know not to re-resolve it?
- How do you handle failures mid-chain? If step 4 fails, can you recover?
- Should some of these be packaged together? Maybe "resolve + retrieve historical data" is one smart tool, rather than two simple ones.
- Do you need sub-agents? For complex multi-step analysis, sometimes it makes sense to have a specialized agent that handles a subset of the workflow, rather than having the top-level reasoner manage every step.
There's no universal answer, but the design of your MCP surface area profoundly affects how well AI systems can actually use it.
### The Competitive Landscape: Data Preferencing
Here's a strategic question that becomes urgent as MCP adoption grows: in a world where multiple providers offer similar data via MCP, how does an AI system choose which to use?
If LSEG, Bloomberg, FactSet, and S&P all have MCP servers offering company financials, what determines which one Claude (or any other AI system) calls?
A few possible mechanisms:
- Quality of tool descriptions: The AI reads function signatures and descriptions to decide which tool fits the task. Better metadata = higher selection rate. This is currently how most selection works, but it's fragile.
- Explicit curation/hierarchy: The platform (Anthropic, in the case of Claude) or the end customer creates explicit preferences—"for financial data, prefer LSEG." This puts control in human hands but requires configuration.
- User-controlled subgraphs: Let users define which tools are available for their context. A user could say "I only want LSEG data" and other MCPs simply aren't in scope.
- Commercial arrangements: Providers pay for preferential placement or selection. This is the ads model applied to MCP.
- Performance/reliability signals: Over time, the system learns which MCPs actually produce good results and weights accordingly.
This is largely uncharted territory, but it's worth thinking about now. Your MCP isn't just competing on data quality - it's competing for attention in an increasingly crowded tool ecosystem. The discoverability and "selectability" of your MCP matters.
### How We Think About This
We've been building and operating AI systems with tool use for a while now, and a few principles guide our approach:
Start with the user problem, not the protocol. MCP is an implementation detail. The question is: what is the user trying to accomplish, and what's the minimum viable set of capabilities needed to get them there reliably?
Think holistically about the stack. The MCP surface area, the reasoning layer, and the user interaction model are all interconnected. Designing one without considering the others leads to gaps.
Invest heavily in entity resolution and context management. These unsexy problems are often the difference between a system that feels magical and one that feels frustrating.
Be willing to make tools smart when necessary. The instinct is often to keep tools simple and "pure," but sometimes the right answer is to package complexity so consumers don't have to reinvent it.
Iterate based on real usage. The right abstraction boundaries only become clear once you see how the system actually gets used. Build in the ability to evolve your MCP surface area over time.
MCP is genuinely exciting infrastructure, but turning it into products that work requires thinking through these layers carefully.
RJ Assaly [->null]
Chief Product Officer [->null]
Share this article:
Former Product Lead at Kensho (acquired by S&P Global). Previously AllianceBernstein.
On this page
- The Excitement and the Gap
- The Fundamental Architecture Question: Where Does the Intelligence Live?
- The Entity Resolution Problem
- Orchestration: The Hidden Complexity
- The Competitive Landscape: Data Preferencing
- How We Think About This
## Explore more articles
View all articles [->../blog]
- July 1, 2025 · Jan Szilagyi What if the cost of curiosity for investors went to zero? At Reflexivity, we’ve built the most versatile AI-powered investment analytics engine on the planet. Its core reasoning capability… Read more
- July 7, 2025 · Jan Szilagyi What If AI Made Humans More Essential? The anxiety is palpable. “How long until AI makes us obsolete?” It’s the shadow trailing every advance. Every GPT upgrade. Every agent… Read more
- August 7, 2025 · Jan Szilagyi The ideal AI agent is honest, not flawless There is a very human aspect to modern AI models: they do better with mentoring. If you ask a modern AI model a question, it might… Read more
### Velit dolore culpa laboris.
Aute sed Sint [->../blog]
Aute Voluptate [->../]
