URL: /blog/how-do-you-make-ai-predictable-without-making-it-dumb STATUS 200 TITLE Reflexivity | Investment research you can check.

ELIT
/
PERSPECTIVES
## How do you make AI predictable without making it dumb?
RJ Assaly [->null]
Chief Product Officer [->null]
3 min
sunt
•
Anim eiusmod
February 26, 2026
![How do you make AI predictable without making it dumb?](https://framerusercontent.com/images/6gIwGqgxhleuBayXx4Wj6guQWs.png) 730x486
How do you make AI predictable without making it dumb?
It's a question most of the industry hasn’t asked. The conversation is overwhelmingly about intelligence – harder questions, deeper reasoning, more complexity. Very little attention goes to reliability: can this system do the same thing correctly, consistently, and be honest when it can't?
In most domains, that imbalance is fine. A chatbot that gets a restaurant recommendation wrong is a minor annoyance. At Reflexivity, we build AI for financial professionals.
Reliability isn't a feature. It's the product.
We've developed a hierarchy for failure severity. A wrong number is catastrophic – the system says a stock is up 12% and it's actually up 2%. A wrong instrument is equally bad – you asked about gold futures and got the ETF instead. An inconsistent methodology is subtler: the core steps in an analytical path should be stable across runs, even if the output varies with the data available.
You can't prompt your way to reliability.
Our system is a code-agent – it reasons in code, executes against real data, and has full visibility into its own execution chain. When a tool call fails or returns unexpected results, the system sees that. It can retry, search for alternatives, or surface the limitation directly.
A user asked us to analyze South American currency pairs. The system ran the analysis – but flagged, unprompted, that it was using spot rates because it didn't have access to non-deliverable forwards. It didn't hallucinate NDFs. It didn't silently substitute. It did its best with what it had and told you where it hit a wall.
The principle: a transparent limitation is always more valuable than a polished hallucination.
We run structured evaluations where every execution is scored against the path we'd expect – did it resolve the correct entity, call the expected tools, apply a sound method, answer the question, and make good use of the data it retrieved?
Ambiguity is part of the design. If a user asks whether US inflation is outpacing the UK, they haven't specified core vs. headline, CPI vs. PCE. Multiple resolutions are valid. Our evals handle this – the expected entity can be a set, not a single answer, and a correct resolution means landing anywhere in that set.
We also control the evaluation environment. Every run can be configured with a specific set of tools – we can test a single tool atomically, or open up the full system to test end-to-end execution. This lets us diagnose whether a failure lives in resolution, in a specific tool, or in the orchestration layer.
We track what we call a "strike score" – the percentage of executions that hit every dimension. The name is deliberate: like bowling, a strike is a strike, regardless of the size of the pins. You either nailed it or you didn't.
The industry will keep optimizing for intelligence. We're optimizing for reliability. In our experience, that's what users in high-stakes domains actually pay for.
RJ Assaly [->null]
Chief Product Officer [->null]
Share this article:
Former Product Lead at Kensho (acquired by S&P Global). Previously AllianceBernstein.
## Explore more articles
View all articles [->../blog]
- July 1, 2025 · Jan Szilagyi What if the cost of curiosity for investors went to zero? At Reflexivity, we’ve built the most versatile AI-powered investment analytics engine on the planet. Its core reasoning capability… Read more
- July 7, 2025 · Jan Szilagyi What If AI Made Humans More Essential? The anxiety is palpable. “How long until AI makes us obsolete?” It’s the shadow trailing every advance. Every GPT upgrade. Every agent… Read more
- August 7, 2025 · Jan Szilagyi The ideal AI agent is honest, not flawless There is a very human aspect to modern AI models: they do better with mentoring. If you ask a modern AI model a question, it might… Read more
### Velit dolore culpa laboris.
Aute sed Sint [->../blog]
Aute Voluptate [->../]
