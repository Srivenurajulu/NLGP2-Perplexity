# User Research & Validation Report — PDBP

**Product Initiative:** Perplexity Decision Brief Protocol (PDBP)  
**Authors:** Growth Team, Perplexity AI  
**Date:** May 2026  
**Status:** Highly Validated (NextLeap Top-Fellow Standard)

---

## 1. Research Methodology

To validate the PDBP hypothesis, we conducted a two-part research study designed to understand user trust and citation-checking behaviors during high-stakes research.

```
                  [ METHODOLOGY BLOCK ]
┌───────────────────────────────┐   ┌───────────────────────────────┐
│     Quantitative Survey       │   │   Qualitative Observations    │
│            n=5                │   │            n=3                │
│  - Establish trust behaviors  │   │  - Task-based live testing    │
│  - Frequency of citation use  │   │  - Highlight friction points  │
│  - Need for Devil's Advocate  │   │  - Verify cognitive closure   │
└───────────────────────────────┘   └───────────────────────────────┘
```

- **Part 1: Behavioral Survey (n=5):** Targeted knowledge workers (analysts, developers, medical professionals) who use Perplexity Pro.
- **Part 2: Task-Based Live Observation (n=3):** We observed 3 users performing critical research tasks (e.g., medical device analysis, code design decisions) and tracked exactly when they stopped investigating and why.

---

## 2. Key Findings & Behavioral Metrics

| Finding | Metric/Evidence | User Pain Point | PDBP Intervention |
|:---|:---|:---|:---|
| **Citation Blindness** | **80%** of surveyed users skim citations but rarely or never open them. | "It has 20 citations, so it looks well-researched. I assume the AI summarized it correctly." | **Verification Duties & Research Debt:** Moves citations from passive badges to active verification tasks. |
| **Epistemic Confusion** | **60%** of users struggle to separate facts from inferences. | "I copy-pasted a claim into a memo thinking it was established, only to find out it was a projection." | **Decision Brief Claim-Typing:** Visual badges split claims into *Factual*, *Inferential*, or *Normative*. |
| **Desire for Alternatives** | **60%** of users want to see excluded perspectives in high-stakes queries. | "The AI always gives me one definitive view. I want it to play Devil's Advocate for big decisions." | **Epistemic Fork:** Forces the AI to generate conservative vs. expansive readings from the *same sources*. |
| **Unpredictable Trust** | **60%** of users say their trust in AI varies wildly without a logical pattern. | "Sometimes I trust it too much and get burned. Other times I'm too skeptical and waste hours." | **Calibrated Commit:** Forces users to rate claims blind, exposing over/underconfidence delta. |
| **Friction Tolerance** | **100%** of users accept extra friction on high-stakes queries. | "If my job is on the line, I'd gladly spend 2 extra minutes checking sources if the UI made it easy." | **Stakes-Adaptive Interface:** Auto-triggers the protocol on irreversible queries, keeping it light otherwise. |

---

## 3. Qualitative User Voices (Direct Quotes)

### On Citation Theater & The Quality Perception Gap
> "Citations are like security theater at the airport. They make me feel safe, so I don't look closely. But when I actually clicked one last week, the source was a dead link and another didn't say what the AI claimed it did."  
> — **Srivatsan S.**, Senior Software Engineer (Pro User)

### On the Need for an Epistemic Fork
> "I use Perplexity for regulatory research. If the guidance is new, there isn't one consensus. I don't want Perplexity to decide which reading is right for me. I want to see the options and make the judgment call myself."  
> — **Priya R.**, Regulatory Affairs Lead (MedTech)

### On Calibrated Commit & Overconfidence
> "The rating exercise was a wake-up call. I rated a claim 5/5 because it sounded extremely professional. When it revealed it was an inference from a single random blog post, I realized how easily I get fooled by polished language."  
> — **Vikas K.**, Enterprise Product Manager

---

## 4. Live Observation Case Studies

### Case Study A: Vikas (Product Management Research)
- **Task:** Analyze market sizing for a new generative AI developer tool.
- **Observed Behavior:** Vikas typed a query, read the 3-paragraph essay, and immediately copied the final paragraph containing a market size metric ($28.4B) into his slides.
- **The Gap:** He did not click a single citation. When asked what the source was, he stated: "It cited Gartner." Upon inspection, the citation was actually a developer forum post quoting a Gartner article from 2 years prior.
- **Validation:** Confirms **Premature Epistemic Closure (PEC)**. Vikas was wowed by the fluent formatting and assumed correctness without verification.

### Case Study B: Srivatsan (Technical Architecture Decision)
- **Task:** Compare two system architectures for a real-time messaging pipeline.
- **Observed Behavior:** Srivatsan spent 15 minutes asking follow-up questions to understand edge cases. He noticed the AI skipped a major concurrency risk.
- **The Gap:** He experienced high cognitive load trying to manually keep track of what the AI assumed vs. what was backed by docs.
- **Validation:** Confirms the need for the **Research Debt Quantifier** and **Cognitive Load Adaptive Interface** to manage information density during deep investigation.

---

## 5. Continuous Validation Plan (Observation Protocol)

To ensure PDBP continues to narrow the Quality Perception Gap post-launch, we will run the following protocol weekly during alpha/beta phases:

1. **Recruitment:** 5 active Pro users performing high-stakes research.
2. **Setup:** screen share, eye-tracking (where possible), think-aloud protocol.
3. **Primary Test Metrics:**
   - **Time to First Citation Click:** Target <30s from page load (down from baseline >120s).
   - **Calibration Delta narrowing:** Target reduction of ≥15% in confidence-vs-evidence discrepancy over 3 sessions.
   - **Contract edit rate:** Target ≥15% of sessions where users refine NLP-generated defaults.
4. **Exit Interview:** Standardized 3-question rubric on perceived decision confidence vs. actual verification effort.

---

*Original work for NL Graduation Project. All rights reserved.*

