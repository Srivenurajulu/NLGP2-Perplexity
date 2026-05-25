"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";

type ChallengeType = "claim-type" | "confidence" | "gap-detection" | "source-eval";

interface Challenge {
  id: string;
  type: ChallengeType;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

interface SessionStats {
  totalAttempted: number;
  totalCorrect: number;
  streak: number;
  bestStreak: number;
  dailyHistory: { date: string; score: number; total: number }[];
  claimTypeAccuracy: number;
  confidenceAccuracy: number;
  gapDetectionAccuracy: number;
  sourceEvalAccuracy: number;
}

const CHALLENGE_BANK: Challenge[] = [
  {
    id: "ct-1",
    type: "claim-type",
    prompt: '"Enterprise adoption is the primary growth driver for AI search market projections in 2026."',
    options: ["Factual — directly supported by a source", "Inferential — synthesized across sources", "Normative — a value judgment or recommendation"],
    correctIndex: 1,
    explanation: "This is an inference. Two analyst reports emphasize enterprise velocity, but the claim combines their findings into a broader conclusion not directly stated in any single source.",
    difficulty: "medium",
  },
  {
    id: "ct-2",
    type: "claim-type",
    prompt: '"The global AI search market is projected to reach $28.4B by 2026."',
    options: ["Factual — directly supported by a source", "Inferential — synthesized across sources", "Normative — a value judgment or recommendation"],
    correctIndex: 0,
    explanation: "This is factual — it directly cites a specific figure from an analyst report. The number can be traced to a single named source.",
    difficulty: "easy",
  },
  {
    id: "ct-3",
    type: "claim-type",
    prompt: '"Perplexity should prioritize the enterprise segment over consumer because the TAM is larger."',
    options: ["Factual — directly supported by a source", "Inferential — synthesized across sources", "Normative — a value judgment or recommendation"],
    correctIndex: 2,
    explanation: "This is normative. It makes a value judgment ('should prioritize') based on a factual claim about TAM. The recommendation step is not sourced.",
    difficulty: "easy",
  },
  {
    id: "conf-1",
    type: "confidence",
    prompt: "An AI search engine cites 21 sources for a market size estimate. All 21 sources are from the same research firm. How should you calibrate your confidence?",
    options: [
      "High confidence — 21 sources is strong evidence",
      "Moderate confidence — many sources, but check independence",
      "Low confidence — source diversity matters more than count",
    ],
    correctIndex: 2,
    explanation: "Citation count without source diversity is misleading. 21 citations from the same firm is effectively one source. This is a common calibration trap in AI search.",
    difficulty: "medium",
  },
  {
    id: "conf-2",
    type: "confidence",
    prompt: 'An AI response says "Studies show that remote workers are 15% more productive." It cites two sources: a 2019 Stanford study and a 2021 blog post. How should you rate this?',
    options: [
      "High confidence — a Stanford study is authoritative",
      "Moderate confidence — peer-reviewed + blog is mixed quality",
      "Low confidence — pre-pandemic data may not apply; blog is not evidence",
    ],
    correctIndex: 2,
    explanation: "The Stanford study is from before COVID changed remote work dynamics. The blog post is not peer-reviewed. Both temporal relevance and source quality are weak for current decision-making.",
    difficulty: "hard",
  },
  {
    id: "gap-1",
    type: "gap-detection",
    prompt: "You asked an AI: 'Should I invest in Company X?' The AI responded with revenue growth, market position, and analyst ratings. What critical gap should you flag?",
    options: [
      "The response didn't mention the company's founding year",
      "The response didn't address risks, competitive threats, or your risk tolerance",
      "The response didn't include the CEO's biography",
    ],
    correctIndex: 1,
    explanation: "An investment decision brief that only covers upside without risks, competitive position, or your personal risk tolerance is structurally incomplete. These are decision-critical gaps.",
    difficulty: "easy",
  },
  {
    id: "gap-2",
    type: "gap-detection",
    prompt: "An AI brief on FDA regulation for AI medical devices mentions SaMD pathways and PCCP guidance. The user is building a device for dermatology. What is the most important gap?",
    options: [
      "The brief didn't explain what SaMD stands for",
      "The brief didn't specify whether dermatology has different regulatory requirements than the cited radiology/cardiology precedents",
      "The brief didn't list all 950+ approved AI devices",
    ],
    correctIndex: 1,
    explanation: "Generic FDA guidance may not apply to the user's specific clinical area. The 950+ approvals are predominantly radiology/cardiology — applying those precedents to dermatology without verification could lead to incorrect regulatory assumptions.",
    difficulty: "hard",
  },
  {
    id: "se-1",
    type: "source-eval",
    prompt: "An AI search result cites 'fda.gov' for the claim that a specific AI device pathway is approved. The citation links to a general FAQ page. How should you evaluate this?",
    options: [
      "Strong evidence — fda.gov is an authoritative domain",
      "Weak evidence — the domain is authoritative but a FAQ page may not support the specific claim",
      "No evidence — government websites are unreliable",
    ],
    correctIndex: 1,
    explanation: "Domain authority ≠ claim support. The source domain (fda.gov) is authoritative, but a general FAQ page may not contain the specific regulatory detail being claimed. The citation needs inspection, not just domain trust.",
    difficulty: "medium",
  },
  {
    id: "se-2",
    type: "source-eval",
    prompt: "Two sources disagree: Source A (peer-reviewed journal, 2024) says 'AI search accuracy is improving.' Source B (industry benchmark, 2025) says 'error rates have not decreased.' Which do you trust?",
    options: [
      "Source A — peer review is the gold standard",
      "Source B — more recent data wins",
      "Neither alone — you need to understand their different methodologies before choosing",
    ],
    correctIndex: 2,
    explanation: "Source disagreements often stem from different definitions, methodologies, or measurement criteria. A peer-reviewed journal and an industry benchmark may be measuring completely different things. Understanding the methodology is required before taking a position.",
    difficulty: "hard",
  },
  {
    id: "ct-4",
    type: "claim-type",
    prompt: '"Based on the convergence of enterprise demand signals and analyst projections, Perplexity is well-positioned to capture significant market share in B2B search."',
    options: ["Factual — directly supported by a source", "Inferential — synthesized across sources", "Normative — a value judgment or recommendation"],
    correctIndex: 1,
    explanation: "This combines multiple data points ('enterprise demand signals' + 'analyst projections') into a forward-looking conclusion about Perplexity's position. No single source makes this exact claim — it is a synthesis.",
    difficulty: "medium",
  },
  {
    id: "conf-3",
    type: "confidence",
    prompt: "An AI response presents a statistic with four inline citations [1][2][3][4]. You click citation [2] and it's a 404 page. How should this affect your confidence?",
    options: [
      "No impact — three other sources still support it",
      "Moderate impact — check if remaining sources independently verify the claim",
      "Major impact — one broken link invalidates all citations",
    ],
    correctIndex: 1,
    explanation: "A broken citation should prompt verification of the remaining sources. If the other three sources are independent and accessible, the claim may still be well-supported. But if they are derivative of the broken source, the evidence base may be weaker than the citation count suggests.",
    difficulty: "medium",
  },
  {
    id: "gap-3",
    type: "gap-detection",
    prompt: "You asked about preparing for a senior PM interview. The AI gave detailed advice on product sense, analytics, and leadership questions. What gap matters most for your specific decision?",
    options: [
      "The response didn't include a list of every possible interview question",
      "The response didn't ask which specific company, level, or team you are interviewing for — all of which change the loop structure",
      "The response didn't mention salary negotiation",
    ],
    correctIndex: 1,
    explanation: "Generic interview prep is a starting point, but the loop structure, question weighting, and culture signals vary dramatically between companies and levels. Without knowing your specific target, the advice may be misaligned with what you will actually face.",
    difficulty: "medium",
  },
];

function getRandomChallenges(count: number): Challenge[] {
  const shuffled = [...CHALLENGE_BANK].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function loadStats(): SessionStats {
  if (typeof window === "undefined") return defaultStats();
  try {
    const raw = localStorage.getItem("epistemic-fitness-stats");
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return defaultStats();
}

function defaultStats(): SessionStats {
  return {
    totalAttempted: 0,
    totalCorrect: 0,
    streak: 0,
    bestStreak: 0,
    dailyHistory: [],
    claimTypeAccuracy: 0,
    confidenceAccuracy: 0,
    gapDetectionAccuracy: 0,
    sourceEvalAccuracy: 0,
  };
}

function saveStats(stats: SessionStats) {
  if (typeof window === "undefined") return;
  localStorage.setItem("epistemic-fitness-stats", JSON.stringify(stats));
}

export default function EpistemicFitnessPage() {
  const [stats, setStats] = useState<SessionStats>(defaultStats);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [sessionDone, setSessionDone] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setStats(loadStats());
  }, []);

  const startSession = useCallback(() => {
    setChallenges(getRandomChallenges(5));
    setCurrentIndex(0);
    setSelected(null);
    setShowExplanation(false);
    setSessionCorrect(0);
    setSessionTotal(0);
    setSessionDone(false);
    setStarted(true);
  }, []);

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (showExplanation) return;
      setSelected(optionIndex);
      setShowExplanation(true);

      const isCorrect = optionIndex === challenges[currentIndex].correctIndex;
      const newTotal = sessionTotal + 1;
      const newCorrect = sessionCorrect + (isCorrect ? 1 : 0);
      setSessionTotal(newTotal);
      setSessionCorrect(newCorrect);
    },
    [challenges, currentIndex, showExplanation, sessionCorrect, sessionTotal]
  );

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= challenges.length) {
      // Session complete
      const today = new Date().toISOString().split("T")[0];
      const updatedStats: SessionStats = {
        ...stats,
        totalAttempted: stats.totalAttempted + sessionTotal,
        totalCorrect: stats.totalCorrect + sessionCorrect,
        streak: stats.streak + 1,
        bestStreak: Math.max(stats.bestStreak, stats.streak + 1),
        dailyHistory: [
          ...stats.dailyHistory.filter((d) => d.date !== today),
          { date: today, score: sessionCorrect, total: sessionTotal },
        ].slice(-30),
        claimTypeAccuracy: Math.round(
          ((stats.totalCorrect + sessionCorrect) /
            Math.max(1, stats.totalAttempted + sessionTotal)) *
            100
        ),
        confidenceAccuracy: Math.round(
          ((stats.totalCorrect + sessionCorrect) /
            Math.max(1, stats.totalAttempted + sessionTotal)) *
            100
        ),
        gapDetectionAccuracy: Math.round(
          ((stats.totalCorrect + sessionCorrect) /
            Math.max(1, stats.totalAttempted + sessionTotal)) *
            100
        ),
        sourceEvalAccuracy: Math.round(
          ((stats.totalCorrect + sessionCorrect) /
            Math.max(1, stats.totalAttempted + sessionTotal)) *
            100
        ),
      };
      setStats(updatedStats);
      saveStats(updatedStats);
      setSessionDone(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  }, [currentIndex, challenges.length, stats, sessionCorrect, sessionTotal]);

  const overallAccuracy = useMemo(
    () =>
      stats.totalAttempted > 0
        ? Math.round((stats.totalCorrect / stats.totalAttempted) * 100)
        : 0,
    [stats]
  );

  const challenge = challenges[currentIndex];

  const typeLabel: Record<ChallengeType, string> = {
    "claim-type": "Claim Typing",
    confidence: "Confidence Calibration",
    "gap-detection": "Gap Detection",
    "source-eval": "Source Evaluation",
  };

  const typeColor: Record<ChallengeType, string> = {
    "claim-type": "bg-emerald-100 text-emerald-800 border-emerald-200",
    confidence: "bg-amber-100 text-amber-800 border-amber-200",
    "gap-detection": "bg-rose-100 text-rose-800 border-rose-200",
    "source-eval": "bg-blue-100 text-blue-800 border-blue-200",
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg
              className="h-6 w-6 text-[var(--accent)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              />
            </svg>
            <span className="font-semibold text-[var(--foreground)]">
              Perplexity
            </span>
          </Link>
          <span className="text-xs px-2 py-1 rounded-full bg-violet-100 text-violet-700 border border-violet-200 font-medium">
            Epistemic Fitness
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {!started && (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg mb-2">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1 className="text-2xl font-semibold text-[var(--foreground)]">
                Epistemic Fitness
              </h1>
              <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
                Train your ability to evaluate AI-generated claims. Three minutes per day.
                Identify claim types, calibrate confidence, detect gaps, and evaluate sources.
              </p>
            </div>

            {/* Stats dashboard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard
                label="Overall Accuracy"
                value={`${overallAccuracy}%`}
                sub={`${stats.totalCorrect}/${stats.totalAttempted} correct`}
              />
              <StatCard
                label="Current Streak"
                value={`${stats.streak}`}
                sub={`Best: ${stats.bestStreak} days`}
              />
              <StatCard
                label="Sessions"
                value={`${stats.dailyHistory.length}`}
                sub="Last 30 days"
              />
              <StatCard
                label="Skill Level"
                value={
                  overallAccuracy >= 80
                    ? "Expert"
                    : overallAccuracy >= 60
                    ? "Proficient"
                    : overallAccuracy >= 40
                    ? "Developing"
                    : "Beginner"
                }
                sub={
                  overallAccuracy >= 80
                    ? "Top calibration"
                    : "Keep practicing"
                }
              />
            </div>

            {/* Skill breakdown */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <h3 className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide mb-3">
                Skill Dimensions
              </h3>
              <div className="space-y-3">
                <SkillBar label="Claim Typing" pct={stats.claimTypeAccuracy} color="bg-emerald-500" />
                <SkillBar label="Confidence Calibration" pct={stats.confidenceAccuracy} color="bg-amber-500" />
                <SkillBar label="Gap Detection" pct={stats.gapDetectionAccuracy} color="bg-rose-500" />
                <SkillBar label="Source Evaluation" pct={stats.sourceEvalAccuracy} color="bg-blue-500" />
              </div>
            </div>

            {/* History chart */}
            {stats.dailyHistory.length > 0 && (
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <h3 className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide mb-3">
                  Recent Performance
                </h3>
                <div className="flex items-end gap-1 h-20">
                  {stats.dailyHistory.slice(-14).map((day, i) => {
                    const pct = day.total > 0 ? (day.score / day.total) * 100 : 0;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                        <div
                          className={`w-full rounded-t transition-all ${
                            pct >= 80
                              ? "bg-emerald-400"
                              : pct >= 50
                              ? "bg-amber-400"
                              : "bg-red-400"
                          }`}
                          style={{ height: `${Math.max(pct * 0.7, 4)}px` }}
                        />
                        <span className="text-[8px] text-[var(--muted)]">
                          {day.date.slice(-2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              onClick={startSession}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg"
            >
              Start Today&apos;s Session (5 challenges, ~3 min)
            </button>
          </div>
        )}

        {started && !sessionDone && challenge && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                    typeColor[challenge.type]
                  }`}
                >
                  {typeLabel[challenge.type]}
                </span>
                <span className="text-[10px] text-[var(--muted)]">
                  {challenge.difficulty}
                </span>
              </div>
              <span className="text-xs text-[var(--muted)]">
                {currentIndex + 1} / {challenges.length}
              </span>
            </div>

            <div className="flex gap-1">
              {challenges.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i < currentIndex
                      ? "bg-[var(--accent)]"
                      : i === currentIndex
                      ? "bg-[var(--accent)]/50"
                      : "bg-[var(--border)]"
                  }`}
                />
              ))}
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <p className="text-sm text-[var(--foreground)] font-medium leading-relaxed">
                {challenge.prompt}
              </p>
            </div>

            <div className="space-y-2">
              {challenge.options.map((option, idx) => {
                let borderClass = "border-[var(--border)] hover:border-[var(--accent)]/50";
                if (showExplanation) {
                  if (idx === challenge.correctIndex) {
                    borderClass =
                      "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20";
                  } else if (idx === selected) {
                    borderClass =
                      "border-red-400 bg-red-50/50 dark:bg-red-950/20";
                  }
                } else if (selected === idx) {
                  borderClass =
                    "border-[var(--accent)] bg-[var(--accent-soft)]";
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelect(idx)}
                    disabled={showExplanation}
                    className={`w-full text-left rounded-xl border p-4 transition-all ${borderClass}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full border border-[var(--border)] flex items-center justify-center text-[10px] font-bold text-[var(--muted)]">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm text-[var(--foreground)]">
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-soft)]/30 p-4 space-y-2">
                <p className="text-xs font-semibold text-[var(--accent)]">
                  {selected === challenge.correctIndex ? "✓ Correct" : "✗ Not quite"}
                </p>
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  {challenge.explanation}
                </p>
                <button
                  onClick={handleNext}
                  className="mt-2 w-full py-3 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:opacity-90"
                >
                  {currentIndex + 1 >= challenges.length
                    ? "Complete Session"
                    : "Next Challenge"}
                </button>
              </div>
            )}
          </div>
        )}

        {sessionDone && (
          <div className="text-center space-y-6 py-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[var(--foreground)]">
                Session Complete
              </h2>
              <p className="text-3xl font-bold text-[var(--accent)] mt-2">
                {sessionCorrect}/{sessionTotal}
              </p>
              <p className="text-sm text-[var(--muted)] mt-1">
                {Math.round((sessionCorrect / Math.max(1, sessionTotal)) * 100)}%
                accuracy
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-center">
                <p className="text-lg font-bold text-[var(--foreground)]">
                  {stats.streak}
                </p>
                <p className="text-[10px] text-[var(--muted)]">Day streak</p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-center">
                <p className="text-lg font-bold text-[var(--foreground)]">
                  {overallAccuracy}%
                </p>
                <p className="text-[10px] text-[var(--muted)]">Lifetime</p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-center">
                <p className="text-lg font-bold text-[var(--foreground)]">
                  {stats.totalAttempted}
                </p>
                <p className="text-[10px] text-[var(--muted)]">Total Q&apos;s</p>
              </div>
            </div>

            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={startSession}
                className="px-6 py-3 rounded-xl bg-[var(--accent)] text-white text-sm font-medium hover:opacity-90"
              >
                Practice Again
              </button>
              <Link
                href="/"
                className="px-6 py-3 rounded-xl border border-[var(--border)] text-sm text-[var(--foreground)] hover:border-[var(--accent)]"
              >
                Back to Search
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-center">
      <p className="text-[10px] text-[var(--muted)] uppercase tracking-wide">
        {label}
      </p>
      <p className="text-lg font-bold text-[var(--foreground)] mt-1">
        {value}
      </p>
      <p className="text-[10px] text-[var(--muted)]">{sub}</p>
    </div>
  );
}

function SkillBar({
  label,
  pct,
  color,
}: {
  label: string;
  pct: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-[10px] mb-0.5">
        <span className="text-[var(--muted)]">{label}</span>
        <span className="text-[var(--foreground)] font-medium">{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
