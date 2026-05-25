# Problem Statement: Why Perplexity's Users Make Bad Decisions With Good Answers

**Author:** Srivenurajulu G  
**Date:** May 2026  
**Document Type:** Root Problem Analysis, Solution Rationale, and Risk Assessment

---

## The Problem in One Sentence

Perplexity delivers the most citation-rich AI search experience on the market, and its users are still making poorly-informed decisions — not because the answers are wrong, but because the answer format signals "stop investigating" before users have done the verification their decisions require.

---

## Why This Problem Matters Now

Three things have converged to make this urgent.

**First, usage is at scale.** Perplexity processes 780 million queries per month. At this volume, even a small percentage of users making premature decisions based on AI-generated research translates to material real-world harm — financial decisions made on single-source projections, medical decisions made on draft guidance treated as settled policy, career decisions made on interview prep that does not match the actual hiring loop.

**Second, the evidence base is clear.** Tow Center's 2025 study found Perplexity incorrect on 37% of systematic news-attribution tests. The Pro tier — the paid product positioned for serious research — was *more* definitive when wrong, not less. Qwairy's 2026 benchmarks show Perplexity averaging 21.87 citations per response versus ChatGPT's 7.92. More provenance surface, but the citations are being skimmed, not inspected. Our own preliminary survey (n=5) found 80% of users skim citations without opening them.

**Third, competitors are converging on the wrong solutions.** The industry response to AI trust problems has been trust scores, fact-check bots, and transparency sidebars. None of these address the structural issue. They add metadata to a closure-inducing artifact — like putting calorie labels on a buffet. The format of consumption dominates the label content.

---

## The Root Cause: Premature Epistemic Closure (PEC)

I spent weeks trying to frame this problem correctly. The obvious framing — "AI hallucination" — is insufficient. Hallucination is a model problem. What we are seeing is a *product design* problem.

I eventually landed on a concept from epistemology: **Premature Epistemic Closure (PEC)**.

> PEC occurs when a person experiences the feeling that their investigation is complete — that they have "enough" to decide — when they have not yet performed the verification appropriate to the stakes of their decision.

Perplexity's answer format is optimized for PEC. Here is why:

### 1. Synthesis-as-Answer

RAG compresses multiple heterogeneous sources into a single coherent voice. The user reads one polished paragraph and loses awareness that the underlying evidence may be contradictory, thin, or irrelevant to their specific decision.

### 2. Citation Theater

21.87 citation badges per response. These badges signal diligence — "we did the research for you" — but 80% of users never open them. The citations provide *provenance visibility* without *verification behavior*. The user feels the work has been done on their behalf.

### 3. Pro Tier Overconfidence

Tow Center's finding is deeply counterintuitive: the paid product is more wrong, more confidently. This means the users who are paying for rigor are receiving *more* closure-inducing prose, not less.

### 4. No Decision Object

The output is optimized for reading, not for deciding. There is no structure that says: "Given what you told us you're trying to decide, here is what we found, here is what we didn't find, and here is what you still need to do before you act."

---

## The Five Judgment Failures Caused by PEC

PEC is the disease. These are the symptoms:

| Failure | Description | Example |
|---------|-------------|---------|
| **J1: Wrong claim type heuristic** | Users treat inferences like facts because both share the same prose style | "Enterprise drives growth" presented identically to "$28.4B market size" |
| **J2: Context collapse** | "Good answer" judged without reference to the user's actual decision | User researching FDA guidance for a specific device class gets generic SaMD overview |
| **J3: Provenance without inspection** | Citations are present but the evidentiary chain is never walked | 21 badges, zero opened — "I trust it because it has sources" |
| **J4: No calibration feedback** | Confidence feeling is never compared to outcome | User rates everything 5/5 confidence; no mechanism shows them this pattern |
| **J5: Action without audit trail** | No record of why the user trusted the output when harm occurs | Six months later: "Why did we assume $28.4B market size?" No one knows. |

---

## Why Existing Approaches Fail

I evaluated every major approach the industry has tried or proposed. Here is why each one falls short:

| Approach | What It Optimizes | Why Trust Problem Persists |
|----------|-------------------|---------------------------|
| **Citations** | Provenance | Users don't click them; misattribution still possible |
| **Trust scores** | Speed of decision | Black-box authority; REL-A.I. shows scores don't predict actual reliance |
| **Fact-check bots** | Binary correctness | Ignores inference, usefulness, context; AI judging AI |
| **Reasoning traces** | Transparency theater | Post-hoc narrative, not ground truth about model process |
| **Explainability panels** | Information volume | Cognitive overload without behavior change |
| **Confidence labels** | Model uncertainty | Model uncertainty ≠ user decision appropriateness |

The gap is clear: **no product ties output format to user decision context and calibration training.**

---

## Why We Are Proposing Five Solutions — Not One

I explored ten directions in total and narrowed to five. The rationale for five rather than one is structural:

PEC is not a single failure — it is five distinct judgment failures (J1–J5) occurring at different stages of the user's research process. A single feature cannot address all five. What is needed is a *protocol* — a coherent set of interventions that each target a specific failure at the right moment in the workflow.

Here is how the five map:

| Solution | Targets | Stage |
|----------|---------|-------|
| **Intent Contract** | J2 (context collapse) | Before retrieval |
| **Epistemic Fork** | J1 (wrong claim heuristic), J3 (provenance without inspection) | During review |
| **Calibrated Commit** | J4 (no calibration feedback), J5 (no audit trail) | Before action |
| **Research Debt Quantifier** | J2 (context collapse), J3 (provenance without inspection) | Throughout session |
| **Epistemic Fitness** | J1 (claim typing), J4 (calibration) | Between sessions |

---

## The Five Solutions in Detail

### Solution 1: Intent Contract

**What it does:** Before retrieval begins, the user completes a 15-second micro-contract specifying: what decision this research supports, what the stakes are (exploratory / operational / irreversible), and what "good enough" would look like.

**Why it works:** It reframes the interaction from "search" to "decision support." The answer is then rendered as a fulfillment matrix against the contract — showing which criteria are met, which are partially met, and which were not addressed at all. This is the single most effective anti-PEC intervention because it forces the user to define their finish line before the answer has a chance to define it for them.

**What no competitor does:** No AI search product asks "What decision does this research support?" before retrieval. Every competitor treats every query as a generic information request.

### Solution 2: Epistemic Fork

**What it does:** For queries flagged as irreversible stakes, the system generates two defensible syntheses from the same source set — a conservative reading (emphasizing uncertainty, conflicts, oldest corroborated claims) and an expansive reading (emphasizing opportunity, convergent trends, forward projections). The user must select one and write a sentence explaining their choice.

**Why it works:** It breaks the single-narrative illusion that causes J1 (treating all claims as equally reliable). The mandatory rationale sentence is the critical design choice — articulating "why I chose this frame" is where judgment skill develops.

**What no competitor does:** No consumer AI search product shows two honest readings from the same evidence. This is structurally novel.

### Solution 3: Calibrated Commit Protocol

**What it does:** Before the user can export, share, or take action on high-stakes research, the system shows 3–5 key claims without source labels or claim types. The user rates their confidence (1–5) per claim. The system then reveals claim type, source quality, and any mismatch alerts. The user sees their calibration delta and writes a brief rationale.

**Why it works:** This is the only mechanism that measurably builds the user's evaluation skill over time. Inspired by meteorological calibration training (where forecasters improve accuracy through structured confidence feedback), it turns every Perplexity session into a micro-training exercise.

**What no competitor does:** No search product implements a pre-commitment gate that reveals calibration gaps.

### Solution 4: Research Debt Quantifier

**What it does:** Calculates and displays a "research completeness" score based on: how many Intent Contract criteria have supporting evidence, how many source conflicts are unresolved, how many verification duties remain uncompleted, and how much of the source set has been inspected.

**Why it works:** It makes the invisible visible. Users think they are done when they feel done. Research Debt provides an honest counterweight to the feeling of closure. Critically, it is *not* a trust score — it measures user effort, not AI reliability. The locus of responsibility stays with the human.

**What no competitor does:** Nobody quantifies research incompleteness from the user's perspective.

### Solution 5: Epistemic Fitness

**What it does:** Embeds a daily 3-minute exercise layer within Perplexity. Users are shown AI-generated claims and asked to identify claim types, rate confidence, detect unsupported assertions, and spot reasoning gaps. Their accuracy is tracked over weeks with streaks, personal bests, and trend charts.

**Why it works:** Solutions 1–4 change the answer format. Solution 5 changes the user. Over weeks and months, users who engage with Epistemic Fitness exercises become measurably better evaluators. The before/after measurement is built into the product: "You started detecting unsupported claims 40% of the time. After 4 weeks: 78%."

**What no competitor does:** No product exists — in AI search or anywhere else — that trains users to become better evaluators of AI outputs through gamified daily practice.

---

## Risk Assessment

I want to be direct about what could go wrong. These are not theoretical risks — they are the failure modes I believe are most likely.

### Risk 1: Friction Kills Usage
**Likelihood:** High  
**Impact:** High  
**Description:** Users want answers in three seconds. PDBP adds 30–60 seconds of interaction. If we deploy this on all queries, engagement will drop.

**Mitigation:** Stakes-based activation. Exploratory queries keep the essay format. Intent Contract auto-populates from NLP analysis of the query. The full protocol only activates when stakes are operational or irreversible. Remember contract fields for returning users.

**Residual risk:** Even with smart defaults, some users will abandon at the Intent Contract step. We accept a 5–10% drop in exploratory session engagement if we gain meaningful improvement in high-stakes session quality.

### Risk 2: Decision Brief Feels Bureaucratic
**Likelihood:** Medium  
**Impact:** High  
**Description:** Knowledge workers associate structured templates with corporate bureaucracy. A Decision Brief that feels like a compliance form will be rejected regardless of its value.

**Mitigation:** Design partnership with 10 power users during development. Tight, opinionated copy — not form fields. Collapsible sections. Narrative toggle for users who prefer prose. The Brief should feel like a research analyst's output, not a government form.

**Residual risk:** Some users will always prefer the essay format. That is fine — we are targeting the segment that needs judgment support, not the segment that wants fast answers.

### Risk 3: Calibrated Commit Gets Gamed or Skipped
**Likelihood:** High  
**Impact:** Medium  
**Description:** Users will click through without thinking. All claims rated 3/5 in two seconds. The calibration data becomes noise.

**Mitigation:** Meaningful commit requires typed rationale on at least one claim. Random "spot-check" prompts for a deeper response. JRSR definition requires non-trivial time in the commit phase. But fundamentally, if users do not engage honestly, we will not force them. We measure and iterate.

**Residual risk:** The users who need this most — the overconfident ones — are the most likely to skip it. We monitor skip rates by user cohort and adjust the prompts.

### Risk 4: Epistemic Fork Doubles the Hallucination Surface
**Likelihood:** Medium  
**Impact:** High  
**Description:** Two syntheses from the same sources means two opportunities for misrepresentation. The expansive fork in particular may overstate forward projections.

**Mitigation:** Same-source constraint is enforced — every sentence in both forks must cite from the retrieved set. Fork generation only triggers when source count ≥ 8 (sufficient diversity). Human evaluation before GA rollout. The conservative fork should always be the default display position.

**Residual risk:** Users may treat the expansive fork as validation for risky decisions ("the AI said there's an optimistic reading"). We monitor fork selection patterns and add explicit warnings.

### Risk 5: Research Debt Score Becomes a New Anxiety Metric
**Likelihood:** Medium  
**Impact:** Medium  
**Description:** Users may feel that "62% complete" means the research is worthless and abandon instead of completing verification duties. Or they may obsess over reaching 100% when 70% would be decision-appropriate.

**Mitigation:** Frame as progress, not score. Use language like "Here's what you've covered so far" rather than "Your research is incomplete." Never show a percentage for exploratory-stakes queries. Allow users to mark duties as "not relevant to my decision" to close the gap.

**Residual risk:** Any quantification creates anchoring effects. We will need to tune the presentation through user testing.

### Risk 6: Epistemic Fitness Engagement Drops After Novelty
**Likelihood:** High  
**Impact:** Medium  
**Description:** Gamified exercises lose engagement after initial curiosity. If users stop doing daily challenges after two weeks, the long-term skill-building thesis fails.

**Mitigation:** Integrate exercises contextually — after a Calibrated Commit, offer a related challenge. Vary exercise types. Social features (anonymous team leaderboards for enterprise). Monthly "calibration report" emails with improvement trends.

**Residual risk:** Not every user will become a daily practitioner. We target 15-20% sustained engagement and measure skill improvement in that cohort.

### Risk 7: Privacy Backlash on Calibration History
**Likelihood:** Low–Medium  
**Impact:** Medium  
**Description:** Users may fear that their judgment accuracy is being profiled and used against them — especially in enterprise contexts where managers could theoretically see calibration data.

**Mitigation:** All calibration data is opt-in only. No employer dashboards — ever. Local-first storage with explicit delete-all control. Privacy-preserving aggregate analytics only. Clear communication: "This data is for you. No one else sees it."

**Residual risk:** Perception matters more than reality. Even with strong privacy controls, some users will distrust the system. Transparent data handling documentation and third-party audits may be necessary.

---

## What I Am Not Claiming

I want to be clear about the boundaries of this proposal:

1. **I am not claiming PDBP eliminates AI errors.** It does not. The AI will still be wrong sometimes. What PDBP does is ensure the user knows which claims are sourced, which are inferred, and which verification work remains undone.

2. **I am not claiming all users need this.** Someone looking up "best pizza near me" does not need a Decision Brief. This is for the subset of queries where the answer will influence a meaningful decision.

3. **I am not claiming the user research is complete.** Survey n=5 is directional, not definitive. The directions I have chosen are informed by this research but not dependent on it. The next step is 20+ structured interviews and task observations.

4. **I am not claiming competitors cannot build this.** They can. But the insight (PEC as root cause, not hallucination) and the protocol design (pre-retrieval contract + anti-closure format + calibration training) represent at least 12 months of execution distance from anyone starting today.

---

## Summary of Recommendation

Stop optimizing for "better answers." Start optimizing for "better decisions."

The five solutions I am proposing — Intent Contract, Epistemic Fork, Calibrated Commit, Research Debt Quantifier, and Epistemic Fitness — form a coherent protocol that addresses the structural failure no competitor is working on: Premature Epistemic Closure.

The risk is friction. The opportunity is becoming the system that professionals trust when the stakes are high and the judgment must stay human.

---

*Srivenurajulu G · Growth Team · May 2026*
