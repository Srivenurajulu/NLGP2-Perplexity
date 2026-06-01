# GAMMA PROMPT — NL PERPLEXITY (10-SLIDE FINAL VERSION)

---

## Design System for Gamma

- **Background**: White (#FAFAFA) throughout
- **Primary accent**: Teal (#20808D) for headers and key callouts
- **Warning/risk indicators**: Amber (#D97706) borders and icons
- **Section labels**: Black (#000000) backgrounds with white text, small font, ALL CAPS
- **Card borders**: Dark (#1A1A1A) with 1.5pt weight on Problem Framing Canvas cards
- **All tables**: Minimum 14pt font, high contrast text on white/light backgrounds
- **Header style**: White banner at top of each slide with thick teal top-border line, black title text centered, thin teal underline — NO colored header banner
- **No author name anywhere in the deck**
- **No color-only differentiation** (accessible for color-blind readers throughout)
- **File name**: NL Perplexity
- **All external links** (Tow Center, Qwairy, survey) hyperlinked inline where referenced
- **All risk levels**: Differentiated by border weight + shape fill pattern, never color alone
- **Typography**: Clean sans-serif (Arial or Inter), professional consulting-deck aesthetic
- **Layout density**: Maximum content — every slide should be information-dense like a McKinsey or Anthropic strategy slide, with two-column layouts, tables, bullet cards, and data callouts

---

## Slide 1 — Title Slide

**Background**: Dark navy (#0F172A). Teal accent bar on the left edge. Small amber accent line.

**Title** (large, white, bold):
"AI Outputs Are Trusted Before They're Understood"

**Subtitle** (teal-accent colour):
"Building Decision Infrastructure for the Age of AI Research"

**Teal banner strip** below subtitle:
"Perplexity Decision Brief Protocol (PDBP) — Five Modules. One Goal: Judgment-Ready Research."

**Body paragraph** (small, light grey, italic):
"Perplexity processes 780 million queries per month. Its users are making financial decisions, regulatory filings, career pivots, and clinical judgments — based on outputs that signal 'research complete' before verification has begun. This deck proposes PDBP: a protocol that changes not just what AI returns, but how users engage with, evaluate, and take accountability for AI-generated research."

**Three stat cards** at the bottom, each in a dark blue box with teal border:
- **780M** — queries/month at Perplexity scale
- **37%** — error rate, Tow Center 2025 systematic study
- **21.87** — citations/response — more provenance surface, not more judgment support

Stat values in large amber bold text. Labels in small teal-grey text below.

**Footer** (small, centered, italic):
"All user research conducted with informed consent · All data anonymised · No sensitive prompts stored"

---

## Slide 2 — Market Landscape & The Strategic Growth Opportunity Gap

**Title** (centered, large black text in white header banner with teal top border):
"Market Landscape & The Strategic Growth Opportunity Gap"

**Layout**: Two-column, information-dense. Left column ~47%, right column ~50%.

### LEFT COLUMN

**Section A — HOW USERS EVALUATE AI OUTPUTS TODAY (Survey n=5)** (black label banner)

Five bullet points:
- 80% skim citation badges — never open a single source
- 60% cannot distinguish factual from inferential claims in prose
- 60% describe AI trust as 'unpredictable' — no calibration loop
- 60% want to know what was EXCLUDED (top open-ended request)
- 40% surprised by unstated assumptions discovered post-action

**Section B — CORE ISSUE** (black label banner)

"The gap is not between output quality and accuracy. The gap is between output quality and perceived quality. Perplexity Pro — the paid product positioned for serious research — was more definitively wrong, not less (Tow Center 2025). No existing product ties output format to user decision context and calibration training simultaneously."

**Section C — WHY CURRENT APPROACHES FAIL** (black label banner)

Table (7 rows × 3 columns):

| Approach | Optimises | Why It Fails |
|---|---|---|
| Inline Citations | Provenance | 80% never click; visibility ≠ verification |
| Trust Scores | Speed of decision | Black-box; scores don't predict reliance |
| Fact-Check Bots | Binary correctness | Ignores inference, normative claims, gaps |
| Reasoning Traces | Transparency | Post-hoc narrative, not ground truth |
| Explainability Panels | Info volume | 80% don't open optional panels |
| Confidence Labels | Model uncertainty | Model confidence ≠ decision appropriateness |

### RIGHT COLUMN

**Section D — HOW PERPLEXITY COMPARES** (black label banner)

Table (7 rows × 5 columns):

| Feature | PDBP (Proposed) | Perplexity (Current) | ChatGPT | Google AI |
|---|---|---|---|---|
| Captures decision context before retrieval | **Yes, via Intent Contract** (green cell) | No | No | No |
| Separates fact from inference visually | **Yes, typed badges** (green cell) | No | No | No |
| Generates alternative readings from same sources | **Yes, Epistemic Fork** (green cell) | No | No | No |
| Calibration feedback on trust patterns | **Yes, Calibrated Commit** (green cell) | No | No | No |
| Surfaces gaps vs user's specific decision | **Yes, Brief §C** (green cell) | No | Partial | No |
| Audit trail for decision rationale | **Yes, auto** (green cell) | No | No | No |

**Section E — THE SCALE OF OPPORTUNITY** (black label banner)

Four stat cards in a horizontal row:
- **780M** — queries/month, Perplexity scale
- **37%** — error rate, Tow Center 2025
- **20-30M** — monthly active users
- **$167B** — AI productivity market by 2030

Footer: "At 20 to 30 million monthly active users, even a small improvement in session decision quality translates into significant retention and conversion uplift."

---

## Slide 3 — Product Friction Audit: Deconstructing the Activation Breakdown

**Title**: "Product Friction Audit: Deconstructing the Activation Breakdown"

**Layout**: Two-column.

### LEFT COLUMN

**Section A — FOUR STRUCTURAL REASONS PERPLEXITY IS UNIQUELY EXPOSED TO PEC** (black label banner)

Four detailed bullets:
- **Synthesis-as-Answer:** RAG compresses multiple heterogeneous sources into a single coherent voice. The user reads one polished paragraph and loses awareness that the evidence may be contradictory, thin, or irrelevant to their decision.
- **Citation Theater:** 21.87 citation badges per response. These badges signal diligence but 80% of users never open them. Citations provide provenance visibility without verification behaviour.
- **Pro Tier Overconfidence:** Tow Center finding — the paid product produces more definitively wrong outputs, not less. The premium product amplifies PEC in the users who can least afford it.
- **No Decision Object:** Every AI search output is optimised for reading, not deciding. No structure says: here is what we found, didn't find, and what you still need to do.

**Section B — WHAT THE PRODUCT NEEDS TO DO** (black label banner)

"Shift the experience from manual re-prompting to decision-context-aware output by surfacing Intent Contracts at the moment of query, when the cost of premature closure is highest. The product must replace the essay with a Decision Brief that makes incompleteness visible instead of hiding it in paragraph fluency."

**Section C — WHAT THE CURRENT UX OPTIMISES** (black label banner)

Three bullets + summary:
- **Fast lookup**: citation badges signal diligence without enabling it
- **Narrative fluency**: polished prose induces closure before evaluation
- **Volume signalling**: 21.87 citations/response substitutes quantity for verification

"It was not designed for users who need to evaluate, verify, and audit AI research before making irreversible professional decisions."

### RIGHT COLUMN

**Section D — UX AUDIT — FIVE FAILURE POINTS IN CURRENT AI SEARCH** (black label banner)

Table (6 rows × 3 columns):

| Failure Point | What Happens | User Impact |
|---|---|---|
| **Essay-first design** (red cell) | Polished narrative arrives before any evaluation tool | PEC triggers in <5 seconds. Most users never evaluate. |
| **Citation theater** (red cell) | 21 badges signal "research done" — 80% never click | Provenance visible but verification never happens |
| No claim typing | Factual, inferential, and normative claims look identical | Users apply uniform trust to heterogeneous evidence |
| No decision context | Query treated generically; no stakes or success criteria | Answer optimised for query, not for the actual decision |
| **No audit trail** (amber cell) | No record of evaluation process or judgment rationale | Cannot reconstruct why a decision was trusted |

**Section E — SIX-STAGE BREAKDOWN — WHERE JUDGMENT FAILS** (black label banner)

Table (7 rows × 4 columns):

| Stage | Should Happen | Actually Happens | Failure |
|---|---|---|---|
| User Intent | Define decision context | Stakes unstated | J2: Context collapse |
| Prompting | Decision-weighted retrieval | Generic retrieval | J2 persists |
| **Output Gen.** (red) | Preserve heterogeneity | Single authority voice | **J1: Wrong heuristic** |
| **Interpretation** (red) | Type claims correctly | All claims identical | **J1: Inference = Fact** |
| **Evaluation** (red) | Inspect and calibrate | 80% skim; no feedback | **J3 + J4** |
| Action | Document verification | No record exists | J5: No audit trail |

---

## Slide 4 — Research Framework: Validating Critical Activation Hypotheses

**Title**: "Research Framework: Validating Critical Activation Hypotheses"

**Layout**: Two-column. Left ~40%, right ~56%.

### LEFT COLUMN

**Section A — TARGET SEGMENT** (black label banner)

"High-frequency, high-stakes knowledge workers: professionals using Perplexity 2+ times per day for research synthesis, competitive analysis, policy navigation, financial due diligence, regulatory interpretation, and career-defining decisions. Small as a proportion of all users but disproportionately responsible for retention, advocacy, and organic growth."

Three bordered pills: "5 Survey respondents" · "3 Task observations" · "2 Recall walkthroughs"

**Section B — USER'S UNMET NEEDS** (black label banner)

- Persistent preference memory across sessions without manual setup
- In-conversation evaluation without leaving the chat interface
- Plain-English rules that are readable, editable, and inspectable
- Transparency into what AI observed, surfaced in the output
- Per-session toggle to disable a rule without deleting it permanently

**Section C — WHY THIS SEGMENT?** (black label banner)

- Return for same task types repeatedly — pattern value highest
- Bring the highest contextual input per session
- Work across multiple workstreams with distinct decision needs
- Engage in longer sessions — more context built, more pain at session end
- Consistent output each time is a professional requirement
- Highest cost of getting it wrong (irreversible decisions)

### RIGHT COLUMN

**Section D — HYPOTHESES TESTED** (black label banner)

Table (7 rows × 5 columns):

| | The Hypothesis | Question Being Tested | Key Finding | Verdict |
|---|---|---|---|---|
| H1 | Users are already building workarounds on their own | If this is a real problem, are they solving it themselves? | 80% skim citations. 60% can't tell fact from inference. No workaround. | **Strongly Confirmed** (green) |
| H2 | Inconsistent outputs cause users to quit Perplexity for specific tasks | Is the frustration bad enough to push users away entirely? | 60% describe trust as 'unpredictable.' Users blame themselves, not the product. | **Strongly Confirmed** (green) |
| H3 | Users know what good looks like but cannot communicate it to AI | Is the gap about knowledge or communication? | 60% want excluded info surfaced. 40% surprised by hidden assumptions. 78-point gap. | **Strongly Confirmed** (green) |
| H4 | The time lost to output corrections is quantifiable and significant | Can a concrete effort cost be attached to this problem? | 80% never click citations. Verification effort >120s baseline. 3+ rounds correcting prompts. | **Confirmed** (green) |
| H5 | Users will trust AI-learned preferences only with visible control over what is saved | How much control is needed before users are comfortable? | 100% accept extra friction on high-stakes. 60% want Devil's Advocate. Suggest-and-confirm preferred. | **Strongly Confirmed** (green) |
| H6 | Decision structure has never been surfaced to a user who needed it, inside the product | Is this a discoverability gap or a product intelligence gap? | No AI search product captures decision context. PDBP is structurally novel across the category. | **Partially Confirmed** (green) |

All Verdict cells should have green (#D1FAE5) backgrounds.

---

## Slide 5 — Data Synthesis: Quantifying Frustration & Inconsistency

**Title**: "Data Synthesis: Quantifying Frustration & Inconsistency"

**Layout**: Two-column.

### LEFT COLUMN

**Section A — QUALITATIVE FINDINGS** (black label banner)

Three findings with bold leader text:
- **The Quality Cliff:** Users describe receiving an exceptional output and then being unable to recreate it. The cause is unknown to them. Self-blame follows, leading to progressively longer prompts. Output quality does not return.
- **Scroll-Back Behaviour:** Users scroll chat history to locate the session where the AI produced the right output. This is a persistence problem, not a memory problem.
- **Reflection Mismatch:** Users want to understand why output quality drifted across sessions, not simply how many corrections were made.

**Section B — THE PATTERN THAT KEEPS REPEATING** (black label banner)

Table (5 rows × 3 columns):

| What Triggers It | What Users Do | What They Think |
|---|---|---|
| **Frustration after output goes wrong** (red cell) | Scroll back through old chats for a good session | They assume they prompted wrong |
| **Relief when it works temporarily** (amber cell) | Start maintaining a doc with prompt instructions | They think better prompting is the key |
| Confusion when identical tasks differ | Write longer prompts each time | They accept inconsistency as how AI works |
| **Anxiety before a high-stake output** (red cell) | Spend 3+ rounds correcting the prompt | They never connect to a missing product feature |

**Footer callout** (bold, teal-dark):
"Unprompted Upgrade Signal: 100% of interviewees accept extra friction on high-stakes queries. At approximately 20M monthly active users, even a 1% conversion lift from solving output trust represents significant incremental ARR at the Pro price point, making this the highest-leverage consumer monetisation opportunity currently untested."

### RIGHT COLUMN

**Section C — USER PERSONAS** (black label banner)

**Persona 1** (bordered white card):
**Vikas K · Product Manager · Enterprise PM · Perplexity Pro · 8 months**
- Produces competitive analyses and market sizing memos weekly
- Copied $28.4B market figure into slides without clicking citation
- Source was actually a developer forum post quoting a 2-year-old Gartner article
- Has never used any evaluation tool beyond skimming citation badges

*"I got this perfect output once. The structure was exactly right, the tone was mine. I have been trying to get back to that ever since. I never have."*

**Persona 2** (bordered white card):
**Srivatsan S · Sr Software Engineer · IT Consulting · Pro · 4 months**
- Uses Perplexity for architecture decisions and technical documentation
- Spent 15 minutes asking follow-ups — noticed AI skipped a concurrency risk
- High cognitive load trying to track what AI assumed vs. what was backed by docs
- Citations are "like security theater at the airport"

*"The blank box with no guidance felt like writing code from scratch. I gave up and went back to re-prompting."*

**Section D — USER'S RECALL-BASED WALKTHROUGH** (black label banner)

- I use Perplexity almost every day for work
- I always end up writing the same instructions, same format, same tone, same structure
- If Perplexity had just asked me two questions after a good output, I would have set it up that day
- I know the output can be wrong. I just never felt like the product helped me catch it
- The next day I opened a new chat and typed my instructions again from scratch

---

## Slide 6 — Problem Framing Canvas

**Title**: "Problem Framing Canvas"

**Layout**: 2 rows × 3 columns grid of bordered cards. Each card has a black border (1.5pt weight) on white background.

### ROW 1

**Card 1 — ⚠️ WHAT IS THE TRUE PROBLEM?**

Recurring structured tasks demand consistent output quality, yet users re-enter the same format, tone, and structure preferences every session. Perplexity has a native citation and synthesis layer built to solve exactly this, but it has never been triggered mid-conversation. The capability exists within the product. The mechanism to surface it at the moment it would matter most does not.

**Card 2 — 👥 WHO ARE THE CUSTOMERS?**

**Recurring Task Power Users**
- **Subscription Tier**: Hold paid Pro or Max subscriptions and use Perplexity daily
- **Behaviour**: Perform the same category of structured tasks repeatedly at least 2× per week
- **Workarounds**: Have already built external manual memory systems, such as Notion prompt libraries, saved chats, and copy-paste templates
- **Status**: Motivated and pattern-blind, frustrated that the tool does not learn their specific standards

**Card 3 — 📊 HOW DO WE KNOW IT'S REAL?**

- **Qualitative**: Quality cliff described across all 3 observations. Users cannot recreate their best outputs. They scroll back through chat history. They blame themselves. They accept inconsistency as normal.
- **Quantitative**: 80% citation blindness. 60% can't tell fact from inference. 60% unpredictable trust. 100% accept friction on high-stakes queries. The cost is measurable and large.

### ROW 2

**Card 4 — 💡 VALUE FOR THE USER**

- Output matches their standard on the first attempt, every time
- The correction loop is permanently broken. No re-prompting, no pasted instructions
- Every preference is readable and editable before going live
- Capture happens at peak satisfaction, right after a great output
- Users shift from managing Perplexity to relying on it

**Card 5 — 💰 VALUE FOR THE BUSINESS**

- Decision-quality users churn less. Each session with PDBP creates a personalised switching cost
- Calibration and preference signals build a compounding dataset that grows more defensible over time
- Confirm-first design is a trust advantage over competitors who apply silently
- Enterprise legal, finance, and medical teams need audit trails. PDBP creates that documentation.

**Card 6 — 🔥 WHY SOLVE THIS NOW?** (amber/yellow background #FEF3C7)

- **Competitive Urgency**: Competitors are already shipping persistence features. As competitors add memory, the perception gap regarding Perplexity's decision support capability grows.
- **Untapped Revenue**: 100% friction-tolerance signal from research — massive unexploited conversion lever.
- **Time-Sensitivity**: The first AI to build reliable decision infrastructure creates compounding advantages that are difficult for late-movers to disrupt.

---

## Slide 7 — Proposed Solutions

**Title**: "Proposed Solutions"

**Layout**: Three equal-width cards side by side. The third card (selected solution) should have a teal border instead of black. A medal emoji (🏆) appears in the third card's title.

### Card 1 — Solution 1: Passive Judgment Sidebar

**WHAT IT DOES**
Essay answer unchanged. Side panel shows claim types, assumptions, gaps, source disagreements, and a devil's advocate view. User can open panel at will.

**WHY IT MIGHT WORK**
- Directly maps to 60% user request for gap visibility and 40% request for assumption surfacing
- Low engineering lift — async metadata generation
- High feasibility score

**WHY IT WAS DEPRIORITISED**
The essay still arrives first. The polished narrative induces closure before the user ever opens the panel. 80% of users never open optional panels even when they want the information. Adding metadata to a closure-inducing artifact is like putting calorie labels on a buffet. The format of consumption dominates the label content. Innovation ceiling too low.

**HYPOTHESES ADDRESSED**
H2 Abandonment, H3 Communication gap, H5 Trust model and H6 Discovery

### Card 2 — Solution 2: Autonomous Fact-Verification Agent

**WHAT IT DOES**
Second AI model performs a pass over the generated output and labels each sentence as Supported / Unsupported / Contested. Labels are inline, color-coded.

**WHY IT MIGHT WORK**
- Creates a Decision Object on day one, before any frustration accumulates
- Requires no great output to exist yet; works at account creation
- Confirm-first design aligns with H5 trust requirement
- Surfaces verification proactively; closes H6 for new users

**WHY IT WAS DEPRIORITISED**
Three structural problems: (1) AI-on-AI verification is a black box on a black box. (2) Fact-checking ignores inferential, normative, and completeness claims. (3) At 780M queries/month, a second full model pass is economically implausible without severe quality trade-offs.

**HYPOTHESES ADDRESSED**
H3 Communication gap and H6 Discovery

### Card 3 — Solution 3: PDBP (Selected) 🏆

**WHAT IT DOES**
Replace the essay with a structured Decision Brief. Capture decision context before retrieval via Intent Contract. Gate action on high-stakes sessions behind Calibrated Commit. Offer Epistemic Fork on irreversible queries. Build user skill via Epistemic Fitness.

**WHY IT MIGHT WORK**
- Starts from evidence, not intent; encodes what great actually looks like (H3)
- Surfaces at the highest-intent moment in any session, immediately post-output (H6)
- Suggest-and-confirm design directly matches H5's 83% preference finding
- Eliminates the quality cliff by making the exceptional output the new baseline (H2)

**HYPOTHESES ADDRESSED**
H2 Abandonment, H3 Communication gap, H5 Trust model and H6 Discovery

---

## Slide 8 — Solution Prioritization and Design

**Title**: "Solution Prioritization and Design"

**Layout**: Three-column. Left ~35%, centre ~28%, right ~30%.

### LEFT — PRIORITISATION FRAMEWORK: SCORING MATRIX

Table (4 rows × 7 columns):

| Solution | User Insight | Judgment Dev | Trust Ethics | Diff. | Feasib. | Score |
|---|---|---|---|---|---|---|
| **✓ PDBP** (green row) | 5 | 5 | 5 | 5 | 4 | **4.85** |
| Passive Sidebar | 4 | 3 | 4 | 3 | 5 | 3.85 |
| Fact-Check Agent | 3 | 2 | 2 | 3 | 3 | 2.55 |

Weights: User Insight 25% · Judgment Dev 25% · Trust Ethics 20% · Differentiation 15% · Feasibility 15%

**WHY PDBP WINS ON EVERY DIMENSION**

- Reach is highest because it activates on every high-stakes query from every Pro user. No opt-in required. It reaches the full eligible base automatically.
- Impact is must-have because it is the only solution that solves both the quality cliff (H2) and the discovery gap (H6) at the same time. No other option does both.
- Confidence is highest because three independent data points all point to the same design. H3 says capture from evidence not intent. H5 says confirm before applying. H6 says surface it in the chat.
- Effort is manageable because the protocol runs on existing session data. No new infrastructure and no new data pipeline required.

Teal callout box at bottom:
*"Every other approach asks users what they want before they have seen it. This one waits until they have seen it, then offers to save it."*

### CENTRE — USER FLOW DIAGRAM

**[Leave this section blank with heading and a bordered placeholder box]**

Placeholder text: "Insert user flow diagram here showing: User Query → Intent Contract → RAG (contract-weighted) → Decision Brief Engine → Calibrated Commit Gate → [if irreversible] Epistemic Fork → Export + Documented Judgment Record"

### RIGHT — SYSTEM ARCHITECTURE

Vertical stack of 7 connected layers, each in a teal-bordered box:

1. **Perplexity Search** (dark teal fill, white text)
2. **L1 — Session Telemetry** — Query context · citation chains
3. **L2 — Intent Contract Engine** — Decision · stakes · goodEnough
4. **L3 — Decision Brief Compiler** — Claim typing · section assembly
5. **L4 — Calibration Engine** — Blind rating · reveal · rationale
6. **L5 — Epistemic Fork Generator** — Conservative · Expansive readings
7. **L6 — Feedback Loop** — Calibration delta tracking

Footer: "Output structure only · On-session · User-controlled"

---

## Slide 9 — Wireframing and Product Flow

**Title**: "Wireframing and Product Flow"

**Layout**: 2 rows of 5 blank screen placeholders with arrows between them.

**IMPORTANT**: Leave all screen images blank (just bordered grey placeholder boxes). Include only the text descriptions below each.

### Row 1 (5 screens):

**Screen 1:** User types a high-stakes query. PDBP detects stakes level via NLP and surfaces Intent Contract.

→

**Screen 2:** Intent Contract: user specifies decision, stakes (Exploratory/Operational/Irreversible), 'good enough' criteria.

→

**Screen 3:** Decision Brief generated — five sections: Sourced Findings, Inferred Conclusions, Not Addressed, Verification Duties, Source Disagreement Map.

→

**Screen 4:** Brief review: user inspects claim-type badges (Factual/Inferential/Normative) and reasoning chains.

→

**Screen 5:** Verification Duties: ranked specific actions the user should perform before acting.

### Row 2 (5 screens):

**Screen 6:** Calibrated Commit: 3-5 key claims shown blind (no labels). User rates 1-5 trust.

→

**Screen 7:** Commit reveal: claim type, source quality, mismatch alerts shown. User writes typed rationale.

→

**Screen 8:** Epistemic Fork (irreversible only): Conservative + Expansive readings from same source pool.

→

**Screen 9:** User selects fork and writes rationale. Stored as audit trail for decision frame chosen.

→

**Screen 10:** Export with documented judgment record: Intent Contract + Brief + Commit rationale + Fork selection.

Bottom right corner: "Prototype      Wireframe"

---

## Slide 10 — Measurement: Growth Indicators, Rollout & Privacy Protections

**Title**: "Measurement: Growth Indicators, Rollout & Privacy Protections"

**Layout**: Two-column. Left ~47% (metrics), right ~50% (rollout + ethics).

### LEFT COLUMN

**Section A — NORTH STAR METRIC** (black label banner)

**Judgment-Ready Session Rate (JRSR)**
% of Pro sessions where user completes: Intent Contract + Decision Brief review + Calibrated Commit with typed rationale ≥10 chars + (for irreversible) Epistemic Fork with rationale ≥15 chars.

JRSR = (Completed Sessions) / (High-Stakes Sessions Shown) × 100
**Target: 32% of Pro high-stakes sessions at 6 months · Baseline: 0%**

**Section B — LEADING INDICATORS: 0 to 30 DAYS** (black label banner)

Table (5 rows × 3 columns):

| Metric | What It Indicates | Target |
|---|---|---|
| Intent Contract completion rate | Whether the contract feels relevant and worth completing | 55% of Pro high-stakes |
| Verification duty click-through | Whether Brief changes inspection behaviour | +50% vs citation CTR baseline |
| Calibration delta narrowing (90-day) | Whether Commit builds user skill over time | 15% overconfidence improvement |
| Fork completion rate (irreversible) | Whether fork is cognitively manageable | >70% of fork-triggered sessions |

**Section C — GUARDRAIL METRICS** (black label banner)

- p95 time-to-brief: <8s additional vs legacy — JRSR gains worthless if unusable
- Session abandonment rate: No >5% increase — highest adoption risk signal
- Quick-answer escape (irreversible): <40% — above 40% = routing around protocol
- Self-reported harm incidents: Downward trend QoQ — ultimate guardrail
- Calibration delta direction: Must not widen — any widening triggers immediate investigation

### RIGHT COLUMN

**Section D — GO-TO-MARKET** (black label banner)

**PHASE 1: WEEKS 0-4**
Controlled Pilot (Trust and Accuracy Validation)

Audience: Pro users with 5+ recurring task types in the last 30 days
Rollout: 5% Pro A/B. Surface PDBP on high-stakes queries only; conservative confidence threshold
Track: JRSR leading indicators, abandonment rate, Intent Contract completion
Kill threshold: Abandonment rate exceeds 5% increase
Success criteria: JRSR above 15% · Abandonment below 5%

**PHASE 2: WEEKS 4-12**
Targeted Expansion (Relevance Scaling)

Audience: 25% Pro rollout. Add calibration delta + Fitness engagement tracking.
A/B test: Intent Contract auto-fill vs manual entry
Success criteria: JRSR above 25% · Calibration delta narrowing 10%+

**PHASE 3: WEEKS 12-24**
Full Rollout

Audience: All Pro/Max. Add Epistemic Fork to irreversible-stakes segment.
Parallel: Qualitative cohort n=20 at 30-day & 90-day marks
Success criteria: JRSR 32% · Fork completion 70%

**Section E — ETHICAL GUIDELINES** (black label banner)

Table (6 rows × 3 columns):

| # | Principle | What This Means in Practice |
|---|---|---|
| 1 | No AI verdicts | System structures evidence; human commits judgment in writing. Locus of judgment stays human. |
| 2 | On-session processing | All analysis happens within the current session. No content leaves. No cross-session data without explicit confirmation. |
| 3 | No output monetisation | Calibration data never used for ads, targeting, or profiling. Solely to improve output quality for that user. |
| 4 | Anonymised research data | Everything from survey and interviews is anonymised. No names. No identifiable information stored. |
| 5 | Right to opt out | PDBP can be turned off in one tap. Quick-answer escape available. No lock-in of any kind. |

---

**END OF PROMPT**

**Instructions for Gamma:**
1. Use exactly these slide titles and content. Do not add, remove, or rephrase.
2. Use the design system specified above for all slides.
3. Every slide should be maximum-density — strategy consulting-quality slides, not marketing slides. Fill the space.
4. All section labels should use black background with white ALL CAPS text.
5. All tables should be clean, high-contrast, with header rows in black backgrounds.
6. Slide 9 (Wireframing) should show blank bordered placeholder boxes for each screen — no actual wireframe images.
7. No author name anywhere. No date. No slide numbers.
8. File name: NL Perplexity
