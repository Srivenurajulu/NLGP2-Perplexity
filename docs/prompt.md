Here's the expanded, deeply detailed Gamma prompt:

---

**GAMMA PROMPT — 10-SLIDE DECK (MAXIMUM CONTENT VERSION)**

---

**Slide 1 — Title Slide**

Title: "AI Outputs Are Trusted Before They're Understood: Building Decision Infrastructure for the Age of AI Research"

Subtitle: Perplexity Decision Brief Protocol (PDBP) — A Five-Module Product Solution That Replaces Polished AI Essays With Judgment-Ready Decision Briefs

Body content block:
"Perplexity processes 780 million queries per month. Its users are making financial decisions, regulatory filings, career pivots, and clinical judgments — based on outputs that signal 'research complete' before verification has begun. This deck proposes PDBP: a protocol that changes not just what AI returns, but how users engage with, evaluate, and take accountability for AI-generated research."

Three context pills below subtitle:
- "780M queries/month — Perplexity scale"
- "37% error rate — Tow Center 2025 systematic study"
- "21.87 citations/response — more provenance surface, not more judgment support"

Visual: Split composition — left half shows a beautiful AI answer with citation badges cascading down, right half shows the same user six months later asking "why did we assume that figure?" in a board meeting. Thin dividing line between the two moments. Dark teal (#20808D) header bar. White body.

Footer note: "All user research conducted with informed consent. All data anonymized. No sensitive prompts stored."

---

**Slide 2 — Market Landscape**

Title: "Users Trust Citation Count and Sentence Fluency — Neither Predicts Accuracy"

**Section A — How users currently evaluate AI outputs (survey n=5, preliminary, directional)**
- 80% of users skim citation badges without opening a single source
- Users report trusting outputs that "sound authoritative" and have "lots of sources" — regardless of what those sources actually say
- 60% of users cannot reliably distinguish factual claims (directly sourced) from inferential claims (synthesized across sources) when both appear in the same prose paragraph
- 60% describe their trust in AI outputs as "unpredictable" — they over-trust some sessions, under-trust others, with no calibration mechanism
- 60% want to know what perspectives or information were excluded from the answer — this was the single most-requested feature in open-ended survey responses
- 40% report being surprised by unstated assumptions embedded in AI answers after the fact

**Section B — What existing approaches offer and why they fail**

| Approach | What It Optimizes | Core Failure |
|---|---|---|
| Inline citations | Provenance visibility | Users don't click them; citation count signals diligence without enabling verification |
| Trust scores / reliability meters | Speed of decision | Black-box authority; REL-A.I. NAACL 2025 shows scores don't predict actual human reliance behavior |
| Autonomous fact-check bots | Binary correctness | AI judging AI; ignores inferential claims, normative judgments, and contextual relevance to the user's specific decision |
| Reasoning traces / chain-of-thought | Process transparency | Post-hoc narratives; not ground truth about model reasoning; adds words without adding verifiability |
| Explainability sidebars | Information volume | Cognitive overload without behavior change; 80% don't open optional panels even when present |
| Confidence labels | Model uncertainty | Model uncertainty ≠ decision appropriateness; a highly confident wrong answer is worse than an uncertain correct one |

**Section C — The core gap**
"The gap is not between output quality and accuracy. The gap is between output quality and perceived quality. Perplexity's Tow Center finding is the sharpest illustration: Pro tier — the paid product positioned for serious research — was more definitively wrong, not less. The product that signals the most trustworthiness delivers the most confidently incorrect outputs. No existing product ties output format to user decision context and calibration training simultaneously."

**Qwairy 2026 benchmark callout box:**
"Perplexity: 21.87 citations per response. ChatGPT: 7.92. More provenance surface area. Zero improvement in verification behavior. Citation theater at scale."

---

**Slide 3 — Business & Product Outcomes**

Title: "Appropriate Reliance Is the Moat — Not More Citations, Not Faster Answers"

**Strategic thesis (full paragraph):**
"Perplexity's next durable competitive advantage is not retrieval speed or citation count. Both are commoditizing. The moat is becoming the system professionals reach for when the stakes are high and the judgment must stay human. PDBP repositions Perplexity from 'best answer engine' to 'best decision support infrastructure.' That is a category change, not a feature addition."

**Four business outcome quadrants:**

**Quadrant 1 — Long-term user trust**
When users complete the Calibrated Commit and see their overconfidence revealed, they don't distrust Perplexity — they trust it more, because it was honest with them. Appropriate reliance (neither over-trust nor under-trust) is the condition for sustained professional use. Every "AI betrayed me" moment in a high-stakes context is a churned Pro user and a reputation event. PDBP eliminates the structural cause of those moments.

**Quadrant 2 — Retention and engagement quality**
PDBP does not optimize for raw session dwell time. It optimizes for Judgment-Ready Session Rate — sessions where the user completes the full evaluation loop. This metric correlates with decision quality outcomes, which drive word-of-mouth in professional communities. A lawyer who trusts Perplexity for contract research refers three colleagues. A lawyer who was burned by a misattributed citation writes a blog post.

**Quadrant 3 — High-stakes workflow adoption**
Professionals currently exclude AI from irreversible decisions because they cannot document their verification process. PDBP creates that documentation: Intent Contract (what was I deciding), Decision Brief (what did I find), Calibrated Commit (how did I evaluate it), Epistemic Fork choice (which reading I committed to and why). This is an audit trail. Enterprise legal, finance, medical, and regulatory teams need audit trails. That is the enterprise conversion mechanism.

**Quadrant 4 — Depth and quality of usage**
Users who engage with PDBP modules develop better prompting skills, better evaluation instincts, and ask more sophisticated follow-up questions. Epistemic Fitness training compounds this over weeks. Better users generate better sessions generate better training signal. The protocol builds the user while serving the user.

**Trade-off analysis (full detail):**
- Speed vs. Accuracy: Exploratory queries (low stakes) keep the legacy essay format. Intent Contract auto-populates from NLP query analysis. Full protocol activates only on operational or irreversible stakes. Estimated added time: 30–60 seconds on high-stakes sessions. Accepted trade-off: 5–10% drop in exploratory engagement in exchange for measurable improvement in high-stakes session quality.
- Assistance vs. Dependence: PDBP explicitly refuses to verdict. The system never says "this claim is true" or "trust this source." It structures evidence, labels claim types, and surfaces conflicts — then requires the user to commit in writing. Locus of judgment stays human by design.
- Transparency vs. Cognitive Overload: Brief sections are progressive and collapsible. Narrative toggle available for users who prefer prose. Epistemic Fork only triggers on irreversible stakes. Cognitive Load Monitor adapts information density in real-time based on scroll velocity, tab-switching frequency, and interaction gap signals.

---

**Slide 4 — User Journey Map**

Title: "Premature Epistemic Closure Strikes Between Output Interpretation and Evaluation — Where No Product Intervenes"

**Full 5-stage journey with detailed breakdown at each stage:**

**Stage 1 — Prompting**
What happens: User types a query with unstated stakes, no defined decision context, no articulation of what "good enough" would look like, and no deadline.
What AI receives: Generic text string. RAG pipeline retrieves broadly. No weighting toward the user's actual decision criteria.
Breakdown: The research is framed wrong before a single source is retrieved. The answer will be optimized for the query, not for the decision.
PDBP intervention: Intent Contract captures decision context before retrieval. Retrieval reranks toward contract criteria. "What decision does this support?" asked before the first API call.

**Stage 2 — Receiving Output**
What happens: A polished, fluent, multi-paragraph essay arrives with 15–25 inline citation badges. The visual density of badges signals "research complete." The prose is authoritative in tone regardless of source quality.
What the user experiences: Cognitive relief. The problem feels solved. Investigation urge drops.
Breakdown: This is the moment of Premature Epistemic Closure. The format of the answer defines when the user stops investigating — not the quality of the evidence.
PDBP intervention: Decision Brief replaces the essay. Output is structurally divided into Sourced Findings, Inferred Conclusions, Not Addressed, Verification Duties, and Source Disagreement Map. The format resists closure by making incompleteness visible.

**Stage 3 — Evaluating Output**
What happens: 80% of users skim without opening citations. 60% cannot distinguish factual from inferential claims in prose. Users apply a single trust heuristic — "it has sources, it sounds right" — to all claim types equally.
What AI provides: No distinction between "FDA authorizes 950+ devices (direct source)" and "Generative AI will dominate clinical workflows by 2027 (synthesized inference)." Both appear in the same paragraph with the same citation badge style.
Breakdown: Wrong claim-type heuristic applied universally. Inferential claims treated as factual. Normative recommendations treated as empirical findings.
PDBP intervention: Every claim in the Decision Brief is typed (Factual / Inferential / Normative) with color-coded and labeled badges. Inferential claims show explicit reasoning chains: "This conclusion combines [source 2] enterprise velocity data with [source 4] CAGR assumptions — neither source makes this claim directly." Source Disagreement Map shows conflicts without resolving them.

**Stage 4 — Revising or Trusting**
What happens: User finds no mechanism to stress-test the output. No devil's advocate. No "what if this is wrong?" No second reading. On high-stakes queries, user has only one narrative to work with.
Breakdown: Single-narrative illusion. The synthesis hides that the same sources support multiple defensible readings. User commits to one interpretation without knowing alternatives exist.
PDBP intervention: Epistemic Fork on irreversible-stakes queries. Same citation pool generates Conservative reading (emphasizes uncertainty, conflicts, oldest corroborated claims) and Expansive reading (emphasizes opportunity, convergent trends, forward projections). User must select and write one sentence explaining their choice. That rationale is stored in the session.

**Stage 5 — Taking Action**
What happens: User exports, shares, or acts on research with no record of: what decision it was supporting, which claims they evaluated, how confident they were, or what verification they chose not to do.
Breakdown: No audit trail. Six months later: "Why did we assume $28.4B market size?" No one knows. No one can reconstruct the verification chain.
PDBP intervention: Calibrated Commit Gate. Before export or action on high-stakes sessions, user rates 3–5 key claims blind (no source labels, no claim type labels). System reveals: claim type, source quality, mismatch alerts ("You rated 5/5 confidence; single weak source"). User writes one sentence rationale. This constitutes the audit trail. The judgment is documented.

**Journey failure heatmap (below the stage strip):**
Stage 1: Low failure | Stage 2: High failure (PEC trigger) | Stage 3: High failure (wrong heuristic) | Stage 4: High failure (single narrative) | Stage 5: Medium failure (no audit trail)
Use filled/empty shape indicators, not color alone.

---

**Slide 5 — Target Segment & Unmet Needs**

Title: "Power Knowledge Workers Need Decision Support Infrastructure — Not Faster Essays"

**Primary segment definition (full detail):**
"High-frequency, high-stakes knowledge workers: professionals using Perplexity 2+ times per day for research synthesis, competitive analysis, policy navigation, financial due diligence, regulatory interpretation, and career-defining decisions. These users are not looking for entertainment. They are using AI as a research assistant for decisions that will be audited, questioned, or acted upon."

**Included profiles:**
- Product managers researching market sizing for roadmap decisions
- Lawyers verifying regulatory guidance before client advice
- Medical professionals cross-referencing clinical guidance
- Investors researching company fundamentals before allocation
- Executives preparing for board presentations
- Candidates preparing for high-stakes interviews

**Explicitly excluded:**
- Casual curiosity search ("best pizza near me")
- Entertainment and recommendation queries
- Users who want one-click answers without reflection

**Unmet needs mapped to evidence (full table):**

| Unmet Need | Evidence Source | Current Gap |
|---|---|---|
| Know what was excluded from the answer | 60% Q8 survey responses — top open-ended request | No AI search product surfaces systematic gaps vs user's specific decision |
| Surface unstated assumptions embedded in synthesis | 40% Q8/Q10 survey responses | Assumptions are invisible in polished prose |
| Separate sourced findings from inferences visually | 60% struggle to distinguish in practice | All claims rendered identically in essay format |
| Stress-test before acting — Devil's Advocate | 60% of users cite this for high-stakes queries | No product generates honest alternative readings from same sources |
| Avoid repeating flagged errors in same research thread | Qualitative: Vikas session observation | No session-level claim memory exists in any AI search product |
| Know when AI is unsure in technical/code domains | Qualitative: Srivatsan session observation | Confidence presentation uniform regardless of source quality |
| Calibration feedback on trust patterns over time | 60% report unpredictable trust | No product tracks user confidence vs evidence quality over sessions |

**Why this segment, specifically:**
"This segment has the highest cost of getting it wrong (irreversible decisions), the highest capacity to engage with a structured protocol (domain expertise), the highest willingness to pay for decision quality (Pro/Enterprise pricing), and the highest word-of-mouth leverage in professional communities. One Pro user in a law firm who trusts Perplexity for regulatory research influences five colleagues."

**Internal team unmet needs (secondary):**
- Trust & Safety: No systematic way to measure whether users are over-trusting outputs in high-stakes domains
- Research/Alignment: No behavioral signal distinguishing appropriate vs. inappropriate reliance
- Growth: No product mechanism that converts "good enough for curiosity" users to "trust it for decisions" users

---

**Slide 6 — Structured Problem Analysis**

Title: "The Root Cause Is Premature Epistemic Closure — A Product Design Failure, Not a Model Failure"

**Root cause definition (full paragraph):**
"Premature Epistemic Closure (PEC) occurs when a person experiences the feeling that their investigation is complete — that they have 'enough' to decide — when they have not yet performed the verification appropriate to the stakes of their decision. PEC is not caused by AI hallucination. It is caused by product design that optimizes a single polished synthesis for narrative satisfaction rather than decision readiness. Fixing hallucination does not fix PEC. The format of consumption dominates the label content."

**Why Perplexity is uniquely exposed to PEC (four structural reasons):**

1. **Synthesis-as-Answer:** RAG compresses multiple heterogeneous sources into a single coherent voice. The user reads one polished paragraph and loses awareness that the underlying evidence may be contradictory, thin, or irrelevant to their specific decision. The compression is the product. The compression is also the failure mode.

2. **Citation Theater:** 21.87 citation badges per response. These badges signal diligence — "we did the research for you" — but 80% of users never open them. The citations provide provenance visibility without verification behavior. The user feels the work has been done on their behalf. It has not been done. It has been listed.

3. **Pro Tier Overconfidence:** Tow Center's finding is the most counterintuitive data point in this space. The paid product — the one positioned for serious research — produces more definitively wrong outputs, not less. Users who pay for rigor receive more closure-inducing prose, not less. The premium product amplifies PEC in the users who can least afford it.

4. **No Decision Object:** Every AI search output is optimized for reading. None are optimized for deciding. There is no structure that says: given what you told us you are trying to decide, here is what we found, here is what we did not find, and here is what you still need to do before you act.

**Six-stage problem breakdown:**

| Stage | What Should Happen | What Actually Happens | Judgment Failure |
|---|---|---|---|
| User Intent | User defines decision context, stakes, success criteria | User types a query with none of this specified | J2: Context collapse — "good answer" judged without reference to actual decision |
| Prompting | Retrieval weighted to decision criteria | Generic retrieval; relevance scored by query match, not decision fit | J2 persists into retrieval |
| Output Generation | Sources represented with heterogeneity preserved | Multiple contradictory sources compressed into single authoritative voice | J1: Wrong claim-type heuristic enabled by uniform prose |
| Output Interpretation | User identifies factual vs inferential vs normative claims | All claims appear identical in prose; user applies uniform trust | J1: Inferential claims treated as factual |
| Output Evaluation | User inspects sources, resolves conflicts, rates confidence | User skims; 80% don't open citations; no conflict surface | J3: Provenance without inspection; J4: No calibration feedback |
| Action-Taking | User documents reasoning, verification performed, audit trail created | User exports or acts with no record of evaluation process | J5: Action without audit trail |

**Five named judgment failures (J1–J5):**
- J1 — Wrong claim-type heuristic: Inferences look like facts in prose
- J2 — Context collapse: Good answer judged without decision reference
- J3 — Provenance without inspection: Citations present, evidentiary chain never walked
- J4 — No calibration feedback: Confidence feeling never compared to evidence quality
- J5 — Action without audit trail: No record of why user trusted output when harm occurs

**Where users over-trust:** Output Interpretation stage — inferential claims rated at same confidence as factual claims.
**Where users lose confidence:** Post-action, when outcomes don't match expectations — too late for the current decision.
**Where judgment breaks down:** The gap between Stage 3 (Evaluating) and Stage 4 (Trusting) — where no current product intervenes.

---

**Slide 7 — Solution Ideation & Decision**

Title: "Three Directions Explored — Two Annotate the Problem, One Eliminates It at the Source"

**Full scoring matrix preamble:**
"Ten solution directions were explored. Six were eliminated at the concept stage (trust scores, fact-check bots, AI-on-AI verifiers, confidence labels, reasoning traces, explainability panels). Three were developed into detailed concepts and scored across five dimensions: User Insight Fit (25%), Judgment Development (25%), Trust Ethics (20%), Perplexity Differentiation (15%), and Feasibility (15%)."

**Direction 1 — Passive Judgment Sidebar (ContextLens-class)**

Full description: Essay answer unchanged. Side panel shows claim types, assumptions, gaps, source disagreements, and a devil's advocate view. User can open panel at will.

Why it was considered: Directly maps to 60% user request for gap visibility and 40% request for assumption surfacing. Low engineering lift — async metadata generation. High feasibility score.

Detailed failure analysis:
"The fundamental problem with sidebar design is that the essay still arrives first. The polished narrative induces closure before the user ever opens the panel. This is not a UX hypothesis — it is supported by behavior data. 80% of users in our research never open optional panels even when they express a desire for the information the panel contains. The desire for gaps and the behavior of opening gap panels are decoupled. Adding metadata to a closure-inducing artifact is like putting calorie labels on a buffet. The format of consumption dominates the label content. Furthermore, sidebar design leaves the primary output unchanged. It annotates the problem rather than solving it. Innovation ceiling too low for award-grade work."

Scores: User Insight 4/5 | Judgment Development 3/5 | Trust Ethics 4/5 | Differentiation 3/5 | Feasibility 5/5
Weighted total: 3.85 — REJECTED as primary solution

**Direction 2 — Autonomous Fact-Verification Agent**

Full description: Second AI model performs a pass over the generated output and labels each sentence as Supported / Unsupported / Contested. Labels are inline, color-coded.

Why it was considered: Directly addresses citation accuracy problem identified by Tow Center. Seems to solve J3 (provenance without inspection) by automating inspection.

Detailed failure analysis:
"Three structural problems. First: AI-on-AI verification is a black box on a black box. When the verifier says 'Supported,' the user has no way to evaluate the verifier's reasoning. They simply transfer their over-trust from the primary model to the verification model — the trust problem is moved, not solved. Second: fact-checking is binary and ignores the majority of problematic claims. Inferential claims (synthesized conclusions), normative claims (recommendations, value judgments), and completeness gaps (what was not retrieved) cannot be fact-checked against sources because they were never directly stated in sources. Third: at 780 million queries per month, a second full model pass on every response is economically implausible without severe quality trade-offs. Cost and latency at scale make this unviable as a default experience."

Scores: User Insight 3/5 | Judgment Development 2/5 | Trust Ethics 2/5 | Differentiation 3/5 | Feasibility 3/5
Weighted total: 2.55 — REJECTED

**Direction 3 — Perplexity Decision Brief Protocol (CHOSEN)**

Full description: Replace the essay as the primary output format with a structured Decision Brief. Capture decision context before retrieval via Intent Contract. Gate action on high-stakes sessions behind Calibrated Commit. Offer Epistemic Fork on irreversible queries. Track research completeness via Research Debt Meter. Build user skill via Epistemic Fitness training layer.

Why it wins across all five dimensions:
- User Insight: Directly addresses all six unmet needs surfaced in research — gaps, assumptions, claim type visibility, devil's advocate, error memory, and uncertainty signaling
- Judgment Development: Only direction that measurably builds user evaluation skill over time. Calibrated Commit creates a feedback loop. Epistemic Fitness compounds it across sessions.
- Trust Ethics: No verdicts issued. No AI authority introduced. System structures evidence; human commits in writing. Locus of judgment stays human.
- Differentiation: No AI search product asks "what decision does this research support?" before retrieval. No product generates two honest readings from the same source set. No product implements a pre-commitment gate. All three are structurally novel in consumer AI search.
- Feasibility: Highest feasibility risk is UX friction on Intent Contract. Mitigated by stakes-based activation and NLP auto-population. Core modules are engineering-achievable without novel model capabilities.

Scores: User Insight 5/5 | Judgment Development 5/5 | Trust Ethics 5/5 | Differentiation 5/5 | Feasibility 4/5
Weighted total: 4.85 — CHOSEN

**Decision rationale one-line summary:**
"Directions 1 and 2 annotate the closure problem. Direction 3 eliminates it by changing what the primary output artifact is."

---

**Slide 8 — Solution Detail**

Title: "PDBP: Five Modules That Transform AI Research From Narrative Delivery to Documented Judgment"

**Module 1 — Intent Contract (pre-retrieval, 15 seconds)**

Full detail: Before retrieval begins, the user completes a lightweight contract: What decision does this research support? What are the stakes (Exploratory / Operational / Irreversible)? What would "good enough" look like? By when do you need to act?

Why this works: It reframes the interaction from "search" to "decision support." The answer is then rendered as a fulfillment matrix against the contract — showing which criteria are met, which are partially met, and which were not addressed at all. This is the single most effective anti-PEC intervention because it forces the user to define their finish line before the answer has a chance to define it for them.

Implementation note: On returning users, contract fields auto-populate from session history. NLP query analysis pre-fills stakes level (e.g., "FDA guidance for our device" → Irreversible). User confirms rather than fills from scratch.

What no competitor does: No AI search product asks "what decision does this research support?" before retrieval. Every competitor treats every query as a generic information request.

**Module 2 — Decision Brief (primary output — replaces essay)**

Full section-by-section breakdown:

Section A — Sourced Findings: Claims directly supported by retrieved sources. Every claim has typed badge (Factual) and inline source IDs. No synthesis. No interpolation. Only what sources actually say.

Section B — Inferred Conclusions: Claims synthesized across multiple sources. Every claim shows explicit reasoning chain: "This conclusion combines [2] enterprise velocity figures with [4] CAGR projection — neither source makes this claim directly. Treat as inference." Typed badge (Inferential). Higher skepticism warranted.

Section C — Not Retrieved / Not Addressed: The most powerful anti-PEC mechanism. Explicitly lists what the user's Intent Contract required that was not found in retrieval. "Your device class (I/II/III) and predicate strategy were not addressed." "EU AI Act interaction with FDA strategy not retrieved." Makes incompleteness visible instead of hiding it in paragraph fluency.

Section D — Verification Duties: Ranked, specific actions the user should perform before acting. Not generic "verify this claim" — specific: "Open [1] and confirm $28.4B uses the same market definition you use internally. Market size claims are highly definition-sensitive." Priority-ranked against Intent Contract stakes.

Section E — Source Disagreement Map: When sources conflict, both positions are shown. No winner is picked. "Source A says enterprise leads growth [2][3]. Source B says consumer is still majority revenue share [1]. You decide which applies to your context."

Optional: "Show narrative summary" toggle collapses Brief into prose for lower-stakes sessions or users who need to share with stakeholders.

**Module 3 — Calibrated Commit Gate (pre-action)**

Full process:
Step 1: System extracts 3–5 key claims from the Brief. Presents them as plain text cards — no source labels, no claim type badges, no inline citations. Clean. Blind.
Step 2: User rates each claim 1–5 (1 = low trust, 5 = high trust) before seeing any evidence structure.
Step 3: System reveals: claim type (Factual/Inferential/Normative), source IDs, source quality assessment, and mismatch alerts. "You rated 5/5. This is an inferential claim supported by a single weak source — forward projection from one analyst, no corroboration."
Step 4: User must write at least one sentence: "Why I trust (or distrust) this brief enough to act on it." This is the judgment commit. It is stored in the session.
Step 5: For irreversible stakes, export and share are gated behind commit completion. Override available with explicit warning banner.

Why this is the most important module: It is the only mechanism that measurably builds evaluation skill over time. Inspired by meteorological calibration training — forecasters improve accuracy through structured confidence feedback, not through being told the right answer. Every Perplexity session becomes a micro-training exercise. Calibration delta (difference between stated confidence and evidence-justified confidence) tracked over time and shown in Calibration Dashboard.

**Module 4 — Epistemic Fork (irreversible stakes only)**

Full detail: When stakes = Irreversible and source count ≥ 8 (sufficient diversity), system generates two complete syntheses from the same retrieved source pool:

Fork A — Conservative: Emphasizes uncertainty, source conflicts, oldest corroborated claims, weakest evidence for optimistic projections, and highest-risk interpretations of ambiguous guidance.

Fork B — Expansive: Emphasizes opportunity, convergent trends, forward projections, favorable interpretations of draft guidance, and best-case readings of ambiguous evidence.

Critical design constraint: Every sentence in both forks cites only from the retrieved source set. No hallucinated counters. No invented evidence. Two honest readings, not one honest and one fabricated.

User action required: Select a fork. Write one sentence: "I choose Conservative because our device is in Class III and we cannot afford a De Novo rejection delay." This rationale is stored. It is the audit trail for the decision frame chosen.

Why this breaks the single-narrative illusion: Most high-stakes decisions are not between good information and bad information. They are between two defensible interpretations of ambiguous evidence. PDBP makes that ambiguity structural and explicit, rather than hiding it in a single authoritative synthesis.

**Module 5 — Epistemic Fitness (between-session training)**

Full detail: Daily 3-minute exercise layer embedded in Perplexity. Four exercise types: Claim Typing (identify Factual/Inferential/Normative), Confidence Calibration (rate trust before seeing evidence), Gap Detection (identify what's missing from a brief), Source Evaluation (assess source quality and independence).

Progress tracking: Accuracy score, day streak, personal best, skill dimension breakdown (Claim Typing accuracy, Confidence Calibration accuracy, Gap Detection accuracy, Source Evaluation accuracy). Monthly calibration digest (opt-in) shows trend: "You started detecting inferential claims correctly 40% of the time. After 4 weeks: 78%."

Why this matters for the product: Solutions 1–4 change the answer format. Solution 5 changes the user. A user who has done 30 days of Epistemic Fitness arrives at a Decision Brief with better evaluation instincts, asks sharper follow-up questions, and completes the Calibrated Commit more thoughtfully. The protocol builds the professional.

**Bonus — Cognitive Load Adaptive Interface:**
Real-time monitoring of scroll velocity, tab-switch frequency, and interaction gap patterns. When high cognitive load is detected (fast scrolling = skimming), UI simplifies to "Key Claims Only" view. When load normalizes, full Decision Brief restores. User can override manually. Designed to prevent the Brief itself from becoming an overload artifact.

**System data flow:**
User query → Intent Contract (decision + stakes + goodEnough + deadline) → RAG pipeline (contract-weighted retrieval reranking) → Decision Brief Engine (claim typing + section assembly + gap detection + conflict identification) → UI (Decision Brief rendered) → Calibrated Commit Gate (blind claim rating → reveal → rationale) → [if irreversible] Epistemic Fork (dual synthesis from same source pool → user selection + rationale) → Export / Share / Action with documented judgment record

**Edge cases:**
- Conflicting sources: Disagreement Map section; no resolution provided; user directed to Verification Duties
- Thin retrieval (<4 sources): "Not addressed" section dominates; narrative summary disabled; user prompted to refine query or search external sources
- User skips Intent Contract: Brief still generates; "No contract specified" banner in header; gaps section notes what contract information would have enabled
- Overconfident AI prose: Mismatch alert fires on Commit reveal when user confidence > evidence quality justifies
- User wants speed: "Quick answer" escape button available; exits to legacy essay format with banner: "Judgment-ready mode off for this query"
- Repeat flagged claim in same thread: Session-level claim memory highlights previously disputed claims; blocks auto-reuse in new synthesis without explicit user acknowledgment

---

**Slide 9 — Measuring Success**

Title: "JRSR Is the North Star — A Session Only Counts If the User Completed the Full Judgment Loop"

**North Star Metric — full definition:**

"Judgment-Ready Session Rate (JRSR): The percentage of Pro-tier sessions in which the user (a) completes the Intent Contract with at least stakes level and goodEnough criteria specified, (b) reviews the Decision Brief through the Verification Duties section, (c) completes the Calibrated Commit with a typed rationale of minimum 10 characters on at least one claim, and (d) for irreversible-stakes sessions, selects an Epistemic Fork with a typed rationale of minimum 15 characters. All four criteria must be met for the session to count."

Target: 32% of Pro high-stakes sessions at 6 months post-launch. Baseline: 0% (no current mechanism).

Why JRSR and not engagement time: "A user who reads the full Brief and immediately exports has done the work. A user who spends 20 minutes scrolling without completing the Commit has not. JRSR measures the behavioral loop that produces decision quality — not the time spent in the product."

**Leading Indicators (with full rationale):**

- Intent Contract completion rate: 55% of Pro sessions flagged as high-stakes. Leading indicator because contract completion is the gateway to the full Brief. If this drops, investigate NLP stakes detection and contract UX friction.
- Verification duty click-through rate: +50% vs. citation click-through baseline. Leading indicator because it measures whether the Brief is changing inspection behavior — the core behavioral change PDBP is designed to produce.
- Calibration delta narrowing (repeat users): 15% improvement in overconfidence rate at 90-day cohort. Leading indicator because it measures whether the Calibrated Commit is building user skill over time — the compounding value of the protocol.
- Fork completion rate (irreversible queries): 70% of sessions where fork is triggered. Leading indicator because fork abandonment signals the user found the dual-reading format cognitively overwhelming or unnecessary — key friction signal.
- Epistemic Fitness daily active users: 15% of Pro users completing at least one session per week at 30 days. Leading indicator because Fitness engagement predicts Commit quality in subsequent search sessions.

**Guardrail Metrics (with full rationale):**

- p95 time-to-brief: Less than 8 seconds additional latency vs. legacy essay. Guardrail because JRSR gains are worthless if the product becomes unusable for time-sensitive research.
- Session abandonment rate: No greater than 5% increase vs. pre-PDBP baseline. Guardrail because friction at Intent Contract or Fork steps is the highest risk to adoption.
- Quick-answer escape rate on irreversible queries: Less than 40%. Above 40% signals that the protocol is perceived as bureaucratic and users are routing around it for the very sessions it was designed to protect.
- Self-reported harm incidents (user feedback, support tickets): Downward trend quarter-over-quarter. Ultimate guardrail — if users are still being harmed by over-trusting outputs, the product is failing regardless of JRSR.
- Calibration delta direction: Must not widen (i.e., must not make users more overconfident). Any widening triggers immediate investigation of Commit reveal design.

**Experiment plan:**
- Week 0–4: 5% Pro A/B. Measure abandonment and JRSR leading indicators only.
- Week 4–12: 25% Pro rollout. Add calibration delta and Fitness engagement tracking.
- Week 12–24: Full Pro GA. Add Epistemic Fork to irreversible-stakes segment.
- Parallel: Qualitative cohort n=20 for decision quality interviews at 30-day and 90-day marks. Survey participants on: "Did the PDBP session change what action you took?" and "Would you have caught this gap without the Brief?"

---

**Slide 10 — Why This Might Fail & How to Mitigate**

Title: "The Users Who Need PDBP Most Are Most Likely to Skip It — Here Is How We Solve That"

**Opening self-critique paragraph:**
"The most important intellectual exercise in product design is not justifying your solution — it is finding the conditions under which it fails and determining whether those conditions are acceptable or fixable. PDBP has seven identified failure modes. Three are high-likelihood. Two of those three are high-impact. The protocol's survival depends on how well we design against them."

**Risk 1 — Friction Kills Usage (HIGH likelihood, HIGH impact)**

Full analysis: Users want answers in 3 seconds. PDBP adds 30–60 seconds of interaction on high-stakes sessions. If deployed on all queries, engagement will collapse. The product that was supposed to improve trust will drive users to competitors who give fast essays.

Why this is the hardest risk: Friction is invisible in qualitative research — users say they want thoroughness, but behave for speed. Survey responses and behavioral data will disagree.

Mitigation strategy:
- Stakes-based activation: Exploratory queries keep legacy essay format. Intent Contract activates on NLP-detected high-stakes queries (regulatory, financial, medical, career, investment). User confirms stakes level, not fills it from scratch.
- Smart defaults: Contract fields auto-populate. "Good enough" defaults to the previous session's value for returning users. Deadline defaults to "this week."
- Progressive commitment: Intent Contract is one question on first use ("What decision does this support?"). Remaining fields added over subsequent sessions as habits form.

Residual risk accepted: 5–10% drop in exploratory session starts in exchange for measurable improvement in high-stakes session quality. We accept this trade-off explicitly.

**Risk 2 — Calibrated Commit Gets Gamed or Skipped (HIGH likelihood, MEDIUM impact)**

Full analysis: Users will click through the Commit without thinking. All claims rated 3/5 in two seconds. Typed rationale is "ok" or "good enough." The calibration data becomes noise. The users who most need calibration — the overconfident ones — are the most likely to skip it.

Why this matters beyond individual sessions: JRSR counts sessions where Commit is "completed." If completion is trivially achievable, JRSR becomes a vanity metric. The North Star becomes gameable.

Mitigation strategy:
- Minimum rationale: Commit requires typed rationale of minimum 10 characters. Short enough to not be burdensome. Long enough to require a sentence.
- Random spot-check: 20% of sessions trigger a follow-up prompt on the highest-rated claim: "You rated this 5/5. Tell us one thing you would check before acting on it." This cannot be completed in one second.
- JRSR definition tightening: North Star definition includes minimum time-in-commit of 45 seconds. Instant click-through does not count.
- Behavioral monitoring: Skip rate tracked by user cohort. If overconfident-pattern users (those who consistently rate > evidence quality) also show highest skip rates, intervention triggered: Commit becomes non-skippable for that cohort.

Residual risk accepted: Some users will game any commitment mechanism. We optimize for the honest majority and accept a gaming tail.

**Risk 3 — Epistemic Fork Doubles the Hallucination Surface (MEDIUM likelihood, HIGH impact)**

Full analysis: Two syntheses from the same sources means two opportunities for misrepresentation. The Expansive fork in particular may overstate forward projections, favorable regulatory readings, or optimistic market interpretations. A user who chooses the Expansive fork for an irreversible medical device decision may be harmed.

Why this is the highest-stakes failure mode: It is the one case where PDBP could make outcomes worse than the current essay format, because it surfaces an Expansive reading that the essay would have moderated.

Mitigation strategy:
- Same-source constraint enforced at generation: Every sentence in both forks must cite from the retrieved source set. No synthesis beyond what sources support. Technical enforcement, not just prompt instruction.
- Minimum source count: Fork only triggers when ≥8 sources are retrieved. Insufficient diversity means single-narrative Brief instead.
- Conservative fork default position: Conservative fork shown on left / first. Expansive shown on right / second. Default selection state: neither. User must actively choose.
- Explicit framing: "Conservative does not mean correct. Expansive does not mean optimistic. Both are honest readings. You are choosing a frame, not a fact."
- Human evaluation gate: Fork generation quality reviewed by human evaluators before GA rollout on medical and regulatory query types.

Residual risk accepted: Some users will treat Expansive fork as validation for risky decisions. We monitor fork selection patterns by domain and add domain-specific warnings where Expansive selection rate is anomalously high.

**Risk 4 — Decision Brief Feels Bureaucratic (MEDIUM likelihood, HIGH impact)**

Full analysis: Knowledge workers associate structured templates with compliance theater. A Decision Brief that feels like a government form will be rejected regardless of its epistemic value. Users will hit "Quick answer" escape and never return to PDBP mode.

Mitigation: Design partnership with 10 power users during development. Tight, opinionated copy — no form-field language. Brief should read like a research analyst's output, not a corporate template. Collapsible sections. Narrative toggle as pressure valve.

**Risk 5 — Research Debt Score Creates Anxiety (MEDIUM likelihood, MEDIUM impact)**

Full analysis: "62% complete" may make users feel their research is worthless and trigger abandonment rather than completion. Or users may obsess over reaching 100% when 75% is decision-appropriate.

Mitigation: Frame as progress, not score. Language: "Here is what you have covered so far" not "Your research is incomplete." Never show percentage on exploratory stakes. Allow users to mark duties as "not relevant to my decision" to close the gap intentionally.

**Risk 6 — Epistemic Fitness Engagement Drops After Novelty (HIGH likelihood, MEDIUM impact)**

Full analysis: Gamified exercises lose engagement after initial curiosity spike. 30-day retention on daily habit products averages 15–20% in consumer apps. If users stop doing Fitness challenges after two weeks, the long-term skill-building thesis fails.

Mitigation: Contextual integration — after a Calibrated Commit session, offer a related Fitness challenge immediately ("You found inferential claims hard to spot today — try this 2-minute challenge"). Vary exercise types weekly. Social features (anonymous team leaderboards for Enterprise). Monthly calibration report email with improvement trend charts (opt-in). Target 15–20% sustained weekly engagement, not 100%.

**Risk 7 — Privacy Backlash on Calibration History (LOW-MEDIUM likelihood, MEDIUM impact)**

Full analysis: Enterprise users may fear that calibration data — which reveals judgment patterns and confidence levels — could be accessed by managers or used in performance evaluation. Even if privacy controls are strong, the perception of surveillance can prevent honest engagement with the Commit mechanism.

Mitigation: All calibration data opt-in only. No employer dashboards — ever, unconditionally. Local-first storage with explicit delete-all control. Privacy-preserving aggregate analytics only for product improvement. Clear, plain-language documentation: "This data is for you. Anthropic/Perplexity sees only anonymized aggregate trends, never your individual session records." Third-party privacy audit before Enterprise launch.

**Closing self-assessment:**
"The honest summary: PDBP will succeed if we design the friction correctly — enough to require genuine engagement, not enough to drive abandonment. The line between 'productive friction that builds skill' and 'annoying friction that drives churn' is narrow and will be determined by A/B testing, not by prediction. We know where the risks are. We have mitigations ready. We will monitor aggressively and iterate fast."

---

**Design System for Gamma:**
- Background: White (#FAFAFA) throughout
- Primary accent: Teal (#20808D) for headers and key callouts
- Warning/risk indicators: Amber (#D97706) borders and icons
- All risk levels: Differentiated by border weight + shape fill pattern, never color alone
- All tables: Minimum 14pt font, high contrast text on white/light backgrounds
- No author name anywhere in the deck
- No color-only differentiation (accessible for color-blind readers throughout)
- File name: NL Perplexity
- All external links (Tow Center, Qwairy, survey) hyperlinked inline where referenced