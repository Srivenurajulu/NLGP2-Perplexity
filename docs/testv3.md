# Testing Guide v3: Your Walkthrough

**Author:** Srivenurajulu G  
**Date:** May 2026  
**Purpose:** A friendly, step-by-step guide to testing the Unified Decision Brief Protocol.

---

Welcome to the v3 Testing Guide! ☕ Grab a coffee (or tea) and let's walk through how to experience the newly unified, humanized protocol. We've designed this to be a seamless, guided journey. Let's see it in action!

---

## Getting Started

First things first, let's spin up the local environment. Open your terminal and run:

```bash
cd frontend
npm install
npm run dev
```

Awesome! Now open your browser and head over to [http://localhost:3000](http://localhost:3000). You should see our sleek new homepage.

---

## Walkthrough 1: The High-Stakes Journey (Full Protocol)

Let's pretend you're a product manager making a massive, irreversible decision about FDA regulations. We want to see all five of our solutions kick into gear.

### Step 1: Kicking it off
- On the homepage, under "Demo queries," click on **"Latest FDA guidance on AI medical devices"**.
- Sit back for a brief second while the AI structures your Decision Brief.

### Step 2: Setting Intent (The Intent Contract)
- You'll land right at the top of the workflow. Notice how it feels like a natural conversation rather than a rigid form?
- Check out the **Intent Contract**. The AI has already realized this is an **Irreversible** stakes decision. 
- **Action:** Go ahead and click **"Generate Decision Brief"** to align on these stakes and move forward.

> **What to look for (Output Quality — Contextuality):** The Intent Contract captures *your* decision context. The same FDA query from a med student exploring careers would get "Exploratory" stakes. From a regulatory lead making a filing decision, it gets "Irreversible." The entire protocol adapts based on this — that's what we mean by "good output is contextual."

### Step 3: Reviewing the Brief (Decision Brief + Research Debt)

Now you're looking at the actual Decision Brief. Notice how it's structured completely differently from a typical AI essay:

- **Sourced Findings** — Each claim is labeled with a type badge (Factual / Inferential / Normative) and linked to specific sources via citation buttons `[1]`, `[2]`, `[3]`.
- **Inferred Conclusions** — Look for the *italic reasoning chain* underneath each inference. This shows you exactly *how* the AI combined separate pieces of evidence. For example: *"Draft guidance [3]; not final law."* You can trace the AI's logic and disagree with it if you want.
- **Not Addressed** — These amber cards are the AI *telling you what it doesn't know*. It says things like "Your device class was not specified" and "EU AI Act interaction not modeled." No other AI product explicitly flags its own blind spots.
- **Verification Duties** — Ranked actions *you* should take (Priority 1, 2, etc.), each explaining *why* that verification matters.
- **Source Disagreements** — Where sources conflict, the AI shows both positions side by side. It does **not** pick a winner. Your judgment decides.

> **What to look for (AI Reasoning Legibility):** Click on the reasoning chains under inferred conclusions. Notice how they expose the AI's assumptions — things like "single analyst projection" or "assumes no platform consolidation." These aren't hidden — they're right there for you to inspect.

- Keep an eye on the bottom right of your screen. See that floating ring? That's your **Research Debt Meter**. 
- **Action:** Try clicking on a few citation badges. Watch how the Research Debt ring fills up as you do the legwork of inspecting sources.
- When you're ready, click **"Continue to Epistemic Fork"**.

> **What to look for (Human Judgment Support):** The Research Debt Meter tracks *your* effort — not the AI's reliability. It says "You've inspected 2 of 3 sources" and "0 of 1 conflicts resolved." This is fundamentally different from a trust score. It keeps the responsibility with you.

### Step 4: Facing the Fork (Epistemic Fork)

- Because this is a high-stakes query, the AI stops you to present two different ways to interpret the exact same data:
  - **Conservative:** "Treat draft gen-AI guidance as early signal only…"
  - **Expansive:** "Leverage PCCP for iterative ML updates…"
- **Action:** Read both, pick one that resonates with your strategy, and type a quick sentence explaining *why* (e.g., "We need to play it safe for our first FDA submission.").
- Click **"Commit to this reading."**

> **What to look for (Preserving Ambiguity):** Notice how the system does NOT tell you which fork is "right." It presents two honest readings from the same evidence and makes *you* articulate why one matters more for your context. This is the anti-thesis of a black-box recommendation. The AI says: "I see two valid interpretations. You decide."

### Step 5: The Gut-Check (Calibrated Commit)

- Almost done! Now the AI is going to test your confidence. It presents a few claims blindly (without showing you the sources).
- **Action:** Rate how confident you are in each claim from 1 to 5. 
- Click **"Reveal Evidence."** 

> **What to look for (Confidence Calibration):** After the reveal, check for two things:
> - **Overconfidence alerts** — Did you rate an inferential claim as 5/5? The mismatch alert will tell you why that's risky (e.g., "PCCP requires pre-specified change protocols; not blanket freedom").
> - **Underconfidence detection** — If you rated a well-sourced factual claim as a 1/5, the system will surface that too. The goal is *appropriate reliance* — not blind trust, and not excessive skepticism either.

- Type a quick reflection and click **"Complete Protocol."**

### Step 6: Reflection & Fitness (Epistemic Fitness)

- Boom! You made it. Your Research Debt should be near 100%. 
- Review your Session Summary to see your calibration delta (were you over or under confident?).
- **Action:** To wrap up, try answering the two mini **Epistemic Fitness** questions at the bottom. These are designed to build your long-term judgment skills in four dimensions:
  - Claim typing (fact vs. inference vs. value judgment)
  - Confidence calibration (source quality vs. citation count)
  - Gap detection (what's missing from a "complete" response)
  - Source evaluation (domain authority vs. actual claim support)

---

## Walkthrough 2: The Quick Check (Operational Stakes)

What happens if the stakes aren't life-or-death? Let's test the adaptive nature of the protocol.

- Head back to the homepage.
- Click on **"What are the market size projections for AI search in 2026?"**
- Notice that in the Intent Contract, the stakes are recognized as just **Operational**. 
- Go ahead and click through. 
- **What to look for:** Notice how the **Epistemic Fork (Phase 3) is completely skipped!** The protocol resizes itself so it doesn't add unnecessary friction when you just need operational data.

> **Why this matters:** The protocol doesn't treat every query as high-risk. It adapts based on your stated stakes — because excessive caution kills productivity just as much as excessive trust does. That's confidence calibration in action at the system level.

---

## Walkthrough 3: Hitting the Gym (Standalone Epistemic Fitness)

Let's say you just want to do your daily training. 

- On the homepage, look for the **"Epistemic Fitness"** card (look for the little lightning bolt ⚡) and click it.
- Welcome to your personalized dashboard!
- **Action:** Click **"Start Today's Session"** and run through a 5-question challenge. 
- Watch how your accuracy score and streak update in real-time. It's a quick, gamified way to become a sharper evaluator of AI.

> **What to look for:** After completing the session, check the **Skill Dimensions** breakdown — it shows your accuracy across four different evaluation skills (Claim Typing, Confidence Calibration, Gap Detection, Source Evaluation). This makes the training *legible* — you know exactly where you're strong and where you need to improve.

---

## Walkthrough 4: Calibration Dashboard

- From the homepage, click the **"Calibration Engine"** card (📈 icon).
- Review the **Calibration Delta Over Time** chart. Positive bars mean overconfident sessions. Negative bars mean underconfident sessions. The ideal is zero.
- Click on individual session dates to see claim-level details.
- Check the **Insights & Recommendations** section at the bottom.

> **What to look for:** The demo data shows a user who started overconfident (+1.3 delta) and improved to well-calibrated (-0.3). Notice the specific, actionable recommendation: *"You rated inferential claims 0.8 points higher than their source strength justifies."* This is not a generic "be more careful" — it's a precise, data-driven nudge that helps build better intuition over time.

---

## Brief Alignment Checklist

As you walk through the demo, use this checklist to verify alignment with the core brief:

| Brief Requirement | Where to See It | What to Look For |
|---|---|---|
| **Quality Perception Gap — Correctness** | Claim type badges on every claim | User sees that "37% error rate" claim types distinguish verified facts from inferences |
| **Quality Perception Gap — Completeness** | "Not Addressed" section + Research Debt ring | AI flags what's *missing*; Debt ring tracks how much user has inspected |
| **Quality Perception Gap — Reasoning** | Inferred Conclusions with reasoning chains | Italic text shows how the AI combined separate sources — user can disagree |
| **Quality Perception Gap — Usefulness** | Intent Contract "Good Enough" field | Output evaluated against *your* criteria, not judged abstractly |
| **Quality Perception Gap — Uncertainty** | Source Disagreement Map + Epistemic Fork | Conflicts shown, not collapsed; two honest readings from same evidence |
| **Calibrated Commit measures the gap** | Blind rating → Reveal | The delta between user confidence and evidence strength *is* the gap, quantified |
| **Helping users evaluate correctness** | Sourced Findings section with claim type badges | Each claim labeled Factual/Inferential/Normative |
| **Helping users evaluate completeness** | "Not Addressed" section + Research Debt ring | AI flags its own blind spots; Debt ring tracks coverage |
| **Helping users evaluate reasoning quality** | Inferred Conclusions with reasoning chains | Italic text showing how sources were combined |
| **Helping users evaluate usefulness** | Intent Contract "Good Enough" field | Output evaluated against *your* decision criteria |
| **Helping users evaluate uncertainty** | Source Disagreement Map | Two positions shown; no winner picked |
| **Output quality is contextual** | Stakes-adaptive protocol (4 vs 5 phases) | Same query gets different depth based on stakes |
| **Supporting human judgment** | Epistemic Fork rationale requirement | User must articulate *why* they chose a reading |
| **Surfacing alternative perspectives** | Fork: Conservative vs. Expansive readings | Two honest interpretations from same evidence |
| **Encouraging critical thinking** | Calibrated Commit blind rating | User rates claims *before* seeing evidence |
| **NOT presenting as authority** | Verification Duties ("you perform these") | System assigns work to user, not to itself |
| **NOT encouraging blind trust** | Mismatch alerts on overconfident ratings | System flags when user trusts too much |
| **NOT removing natural ambiguity** | Source Disagreements ("we do not pick a winner") | Conflicts preserved, not collapsed |
| **Avoiding overconfidence** | Calibrated Commit overconfidence alerts | Amber highlights for over-trusted claims |
| **Avoiding excessive skepticism** | Calibration Dashboard underconfident trend | System detects and surfaces under-trust patterns |
| **Building intuition over time** | Epistemic Fitness accuracy trends | Tracked improvement across sessions |
| **Making AI reasoning legible** | Reasoning chains + claim type labels | Every inference shows its logic trail |
| **Surfacing assumptions** | Reasoning chains + "Not Addressed" section | Assumptions made visible, not hidden |
| **Surfacing missing information** | "Not Addressed" + Verification Duties | AI says what it didn't cover |
| **NOT a hallucination detector** | Problem Statement framing | PEC is a product design problem, not a model problem |
| **NOT fact-checking alone** | Decision Brief structure | Multi-dimensional evaluation, not binary true/false |
| **NOT generic trust scores** | Research Debt Quantifier | Measures user effort, not AI reliability |
| **NOT cosmetic UI changes** | Entire protocol architecture | Output artifact and user behavior are fundamentally changed |

---

## Final Thoughts for Evaluators

As you walk through these flows, keep an eye on how **fluid** everything feels. We've moved away from pop-ups and scattered pages into a single, cohesive narrative. 

The goal here isn't to trick the user — it's to partner with them. The AI becomes a transparent research collaborator that shows its work, admits its gaps, preserves ambiguity where it exists, and helps the human develop better judgment over time.

Have fun testing, and let us know what you think! 🎉
