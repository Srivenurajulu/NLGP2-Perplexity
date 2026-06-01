"use client";

import { useState } from "react";
import Link from "next/link";

interface SessionSummaryProps {
  researchDebtScore: number;
  calibrationDelta: number;
  overconfidentClaims: string[];
  forkChoice?: { selected: string; rationale: string } | null;
  onFitnessComplete?: () => void;
}

const MINI_CHALLENGES = [
  {
    id: "mc1",
    prompt:
      '"Enterprise adoption is the primary growth driver" — what type of claim is this?',
    options: ["Factual", "Inferential", "Normative"],
    correctIndex: 1,
    explanation:
      "This is inferential — it synthesizes multiple sources into a conclusion not stated in any single source.",
  },
  {
    id: "mc2",
    prompt:
      "An AI response cites 21 sources, all from the same research firm. How should you calibrate?",
    options: [
      "High confidence — 21 sources",
      "Low confidence — source diversity matters more than count",
    ],
    correctIndex: 1,
    explanation:
      "Citation count without source diversity is misleading. 21 from one firm is effectively one source.",
  },
];

export default function SessionSummary({
  researchDebtScore,
  calibrationDelta,
  overconfidentClaims,
  forkChoice,
  onFitnessComplete,
}: SessionSummaryProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answered, setAnswered] = useState(0);

  const challenge = MINI_CHALLENGES[currentQ];
  const allDone = answered >= MINI_CHALLENGES.length;

  function handleSelect(idx: number) {
    if (showExplanation) return;
    setSelected(idx);
    setShowExplanation(true);
  }

  function handleNext() {
    const next = currentQ + 1;
    if (next >= MINI_CHALLENGES.length) {
      setAnswered(MINI_CHALLENGES.length);
      onFitnessComplete?.();
    } else {
      setCurrentQ(next);
      setSelected(null);
      setShowExplanation(false);
      setAnswered(next);
    }
  }

  return (
    <div className="space-y-6">
      {/* Session Summary Card */}
      <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-soft)]/30 p-5 space-y-4">
        <h3 className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wide">
          Session Summary
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-500">
              {researchDebtScore}%
            </p>
            <p className="text-[10px] text-[var(--muted)]">Research Debt</p>
          </div>
          <div className="text-center">
            <p
              className={`text-2xl font-bold ${
                calibrationDelta > 0.5 ? "text-amber-500" : "text-emerald-500"
              }`}
            >
              {calibrationDelta > 0 ? "+" : ""}
              {calibrationDelta.toFixed(1)}
            </p>
            <p className="text-[10px] text-[var(--muted)]">Calibration Delta</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-500">
              {overconfidentClaims.length}
            </p>
            <p className="text-[10px] text-[var(--muted)]">Overconfident</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[var(--foreground)]">
              {forkChoice ? "✓" : "—"}
            </p>
            <p className="text-[10px] text-[var(--muted)]">Fork Selected</p>
          </div>
        </div>

        {forkChoice && (
          <div className="rounded-lg border border-violet-200 bg-violet-50/50 dark:bg-violet-950/20 dark:border-violet-800 p-3">
            <p className="text-[10px] font-semibold text-violet-700 dark:text-violet-300">
              🔀 Fork: {forkChoice.selected}
            </p>
            <p className="text-xs text-[var(--muted)] mt-1 italic">
              &ldquo;{forkChoice.rationale}&rdquo;
            </p>
          </div>
        )}

        {overconfidentClaims.length > 0 && (
          <div className="space-y-1">
            <p className="text-[10px] font-semibold text-amber-700 dark:text-amber-300">
              ⚠ Overconfident claims:
            </p>
            {overconfidentClaims.map((c, i) => (
              <p key={i} className="text-xs text-amber-600 dark:text-amber-400">
                • {c}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Mini Epistemic Fitness Challenge */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[var(--foreground)]">
            ⚡ Mini Epistemic Fitness
          </h3>
          <span className="text-[10px] text-[var(--muted)]">
            {Math.min(answered + 1, MINI_CHALLENGES.length)}/
            {MINI_CHALLENGES.length}
          </span>
        </div>

        {!allDone && challenge && (
          <div className="space-y-3">
            <p className="text-sm text-[var(--foreground)]">{challenge.prompt}</p>
            <div className="space-y-2">
              {challenge.options.map((opt, idx) => {
                let cls = "border-[var(--border)] hover:border-[var(--accent)]/50";
                if (showExplanation) {
                  if (idx === challenge.correctIndex)
                    cls = "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20";
                  else if (idx === selected)
                    cls = "border-red-400 bg-red-50/50 dark:bg-red-950/20";
                }
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelect(idx)}
                    disabled={showExplanation}
                    className={`w-full text-left rounded-lg border p-3 text-sm transition-all ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {showExplanation && (
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-soft)]/30 p-3">
                <p className="text-xs font-semibold text-[var(--accent)]">
                  {selected === challenge.correctIndex ? "✓ Correct" : "✗ Not quite"}
                </p>
                <p className="text-xs text-[var(--foreground)] mt-1">
                  {challenge.explanation}
                </p>
                <button
                  type="button"
                  onClick={handleNext}
                  className="mt-2 w-full py-2 rounded-lg bg-[var(--accent)] text-white text-xs font-medium"
                >
                  {currentQ + 1 >= MINI_CHALLENGES.length ? "Complete" : "Next"}
                </button>
              </div>
            )}
          </div>
        )}

        {allDone && (
          <div className="text-center py-4 space-y-3">
            <p className="text-sm text-emerald-600 font-medium">
              ✓ Mini fitness complete!
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                href="/fitness"
                className="text-xs px-4 py-2 rounded-lg bg-[var(--accent)] text-white"
              >
                Full Epistemic Fitness →
              </Link>
              <Link
                href="/calibration"
                className="text-xs px-4 py-2 rounded-lg border border-[var(--border)]"
              >
                Calibration Dashboard →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
