# Perplexity Decision Brief Protocol (PDBP)

**NL Graduation Project** — Growth Team product architecture for Perplexity AI.

## The Problem (Root Cause)

Perplexity optimizes for **Premature Epistemic Closure (PEC)**: users feel research-complete because answers are fluent and citation-dense, while 37% of systematic tests still surface errors (Tow Center 2025). The failure is not missing fact-checks. It is shipping a **single authoritative narrative** before users perform verification appropriate to their stakes.

## The Solution

**Perplexity Decision Brief Protocol (PDBP)** changes the primary output from an essay to a **judgment-ready Decision Brief**, built on five integrated solutions:

| # | Solution | What it does |
|---|----------|-------------|
| 1 | **Intent Contract** | Capture decision, stakes, and "good enough" before retrieval |
| 2 | **Epistemic Fork** | Conservative vs expansive reading from **same sources** (irreversible stakes) |
| 3 | **Calibrated Commit** | Rate claims blind → reveal evidence → document calibration delta |
| 4 | **Research Debt Quantifier** | Progress meter showing how much investigation the user still owes this decision |
| 5 | **Epistemic Fitness** | Daily 3-minute challenges that train AI judgment skill over weeks |

Plus a **Cognitive Load Adaptive Interface** that adjusts information density based on real-time reading behavior signals.

**Explicitly not:** trust scores, fact-check bots as authority, or passive sidebars.

## Ten Solutions Explored (Architecture)

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) Section 7 for full scoring:

1. **Unified Trust Score** — Rejected (black-box authority)  
2. **Autonomous Fact-Verification Agent** — Rejected (AI-on-AI, facts only)  
3. **Passive Judgment Sidebar (ContextLens-class)** — Rejected (bolt-on; does not break PEC)  
4. **Intent Contract Research** — Core pillar ✓
5. **Epistemic Fork Studio** — High-stakes pillar ✓
6. **Calibrated Commit Protocol** — Skill-building pillar ✓
7. **Research Debt Quantifier** — Progress measurement pillar ✓
8. **Cognitive Load Adaptive Interface** — Deprioritized for MVP (implemented as enhancement)
9. **AI Literacy Assessment Platform** — Rejected (wrong scope, separate product)
10. **Epistemic Fitness Trainer** — Engagement pillar ✓

**Winner:** PDBP synthesizes solutions 4, 5, 6, 7, 10 and rejects sidebar-only approaches.

## Key Documents

| Document | Purpose |
|----------|---------|
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Full product architecture (v2, award-grade depth) |
| [`docs/PROBLEM_STATEMENT.md`](docs/PROBLEM_STATEMENT.md) | Detailed problem statement, solution rationale, and risk assessment |
| [`research/survey-summary.md`](research/survey-summary.md) | User research + PDBP mapping |

## Quick Start

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo Walkthrough

1. Click **"Latest FDA guidance on AI medical devices"** (irreversible stakes)  
2. Complete **Intent Contract** modal  
3. Review **Decision Brief** sections (not a single essay)
4. Observe **Research Debt Meter** tracking your progress in the sidebar
5. Note **Cognitive Load Badge** adapting to your reading pace
6. Complete **Epistemic Fork** (conservative vs expansive)  
7. Open **Calibrated Commit** → rate claims blind → reveal → write rationale  
8. Click citation badges to inspect sources (Research Debt updates live)
9. Visit **Epistemic Fitness** (`/fitness`) for daily judgment challenges
10. Visit **Calibration Engine** (`/calibration`) for confidence trend analysis

## Project Structure

```
docs/ARCHITECTURE.md          # Full product architecture (v2, award-grade depth)
docs/PROBLEM_STATEMENT.md     # Problem statement, 5 solutions rationale, risk assessment
research/survey-summary.md    # User research + PDBP mapping
frontend/                     # Perplexity UI + PDBP interactive demo
  app/
    page.tsx                  # Home page with all protocol modules
    search/[query]/page.tsx   # Decision Brief view (Solutions 1-4 integrated)
    fitness/page.tsx          # Epistemic Fitness trainer (Solution 5)
    calibration/page.tsx      # AI Confidence Calibration Engine
    api/search/route.ts       # Mock search API
  components/
    pdbp/
      IntentContractModal.tsx      # Solution 1: Intent Contract
      EpistemicForkSelector.tsx    # Solution 2: Epistemic Fork
      CalibratedCommitGate.tsx     # Solution 3: Calibrated Commit
      ResearchDebtMeter.tsx        # Solution 4: Research Debt Quantifier
      CognitiveLoadMonitor.tsx     # Cognitive Load Adaptive Interface
      DecisionBriefView.tsx        # Decision Brief primary output
README.md
```

## North Star Metric

**Judgment-Ready Session Rate (JRSR):** % of Pro sessions completing Intent Contract + verification duties review + Calibrated Commit before external action. Target: 32% at 6 months.

## Evaluation Alignment

| Criterion | How PDBP delivers |
|-----------|-------------------|
| Depth of thought | PEC root cause; 10 solutions scored; 7 failure modes; 7 risks analyzed |
| Creativity | Changes answer artifact + interaction ritual + trains user judgment skill — no competitor does any of these |
| Data/metrics | Tow Center, survey n=5, JRSR framework, calibration delta tracking, Research Debt scoring |
| Communication | Architecture + working demo with 5 integrated solutions + problem statement + risk assessment |

## License

Educational use — NL Graduation Project.
