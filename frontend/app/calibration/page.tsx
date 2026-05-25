"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface CalibrationEntry {
  id: string;
  date: string;
  query: string;
  claims: {
    text: string;
    userRating: number;
    actualType: "factual" | "inferential" | "normative";
    sourceStrength: "strong" | "moderate" | "weak";
    wasOverconfident: boolean;
    wasUnderconfident: boolean;
  }[];
  overallDelta: number; // positive = overconfident, negative = underconfident
}

// Simulated historical calibration data for demo
const DEMO_HISTORY: CalibrationEntry[] = [
  {
    id: "s1",
    date: "2026-05-18",
    query: "AI search market size projections",
    claims: [
      { text: "$28.4B figure is reliable for board-level planning", userRating: 5, actualType: "factual", sourceStrength: "weak", wasOverconfident: true, wasUnderconfident: false },
      { text: "Enterprise is definitively the primary growth driver", userRating: 4, actualType: "inferential", sourceStrength: "moderate", wasOverconfident: true, wasUnderconfident: false },
      { text: "Citation-heavy products will capture 12-15% share", userRating: 3, actualType: "inferential", sourceStrength: "weak", wasOverconfident: false, wasUnderconfident: false },
    ],
    overallDelta: 1.3,
  },
  {
    id: "s2",
    date: "2026-05-19",
    query: "Perplexity vs ChatGPT comparison",
    claims: [
      { text: "More citations means more trustworthy output", userRating: 4, actualType: "inferential", sourceStrength: "weak", wasOverconfident: true, wasUnderconfident: false },
      { text: "Perplexity Pro is more accurate than free tier", userRating: 5, actualType: "factual", sourceStrength: "weak", wasOverconfident: true, wasUnderconfident: false },
      { text: "ChatGPT cannot support serious research", userRating: 2, actualType: "normative", sourceStrength: "moderate", wasOverconfident: false, wasUnderconfident: false },
    ],
    overallDelta: 1.7,
  },
  {
    id: "s3",
    date: "2026-05-20",
    query: "FDA AI medical device guidance",
    claims: [
      { text: "PCCP means we can ship updates without FDA interaction", userRating: 3, actualType: "factual", sourceStrength: "moderate", wasOverconfident: true, wasUnderconfident: false },
      { text: "950+ approvals mean gen-AI clinical tools are proven safe", userRating: 2, actualType: "inferential", sourceStrength: "weak", wasOverconfident: false, wasUnderconfident: false },
      { text: "This brief is sufficient for regulatory sign-off", userRating: 1, actualType: "normative", sourceStrength: "weak", wasOverconfident: false, wasUnderconfident: false },
    ],
    overallDelta: 0.3,
  },
  {
    id: "s4",
    date: "2026-05-21",
    query: "Senior PM interview preparation",
    claims: [
      { text: "Product sense is ~40% of loop weight at all FAANG companies", userRating: 3, actualType: "inferential", sourceStrength: "moderate", wasOverconfident: false, wasUnderconfident: false },
      { text: "4-6 weeks prep is sufficient for any senior candidate", userRating: 4, actualType: "inferential", sourceStrength: "weak", wasOverconfident: true, wasUnderconfident: false },
      { text: "Tailoring stories to culture principles is always authentic", userRating: 2, actualType: "normative", sourceStrength: "moderate", wasOverconfident: false, wasUnderconfident: true },
    ],
    overallDelta: 0.7,
  },
  {
    id: "s5",
    date: "2026-05-22",
    query: "AI search competitive analysis",
    claims: [
      { text: "Market is winner-take-all in AI search", userRating: 3, actualType: "normative", sourceStrength: "weak", wasOverconfident: false, wasUnderconfident: false },
      { text: "Enterprise segment will drive 60% of revenue", userRating: 2, actualType: "inferential", sourceStrength: "moderate", wasOverconfident: false, wasUnderconfident: true },
      { text: "Citation accuracy is improving across all platforms", userRating: 4, actualType: "factual", sourceStrength: "weak", wasOverconfident: true, wasUnderconfident: false },
    ],
    overallDelta: 0.3,
  },
  {
    id: "s6",
    date: "2026-05-23",
    query: "Remote work productivity data",
    claims: [
      { text: "Remote workers are 15% more productive", userRating: 2, actualType: "factual", sourceStrength: "weak", wasOverconfident: false, wasUnderconfident: false },
      { text: "Hybrid is optimal for most knowledge workers", userRating: 3, actualType: "normative", sourceStrength: "moderate", wasOverconfident: false, wasUnderconfident: false },
      { text: "Productivity gains persist beyond initial novelty", userRating: 2, actualType: "inferential", sourceStrength: "weak", wasOverconfident: false, wasUnderconfident: false },
    ],
    overallDelta: -0.3,
  },
];

export default function CalibrationDashboard() {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  const avgDelta = useMemo(() => {
    const total = DEMO_HISTORY.reduce((sum, e) => sum + e.overallDelta, 0);
    return total / DEMO_HISTORY.length;
  }, []);

  const overconfidentCount = useMemo(
    () =>
      DEMO_HISTORY.reduce(
        (sum, e) =>
          sum + e.claims.filter((c) => c.wasOverconfident).length,
        0
      ),
    []
  );

  const totalClaims = useMemo(
    () => DEMO_HISTORY.reduce((sum, e) => sum + e.claims.length, 0),
    []
  );

  const deltaHistory = useMemo(
    () => DEMO_HISTORY.map((e) => ({ date: e.date, delta: e.overallDelta })),
    []
  );

  const deltaImproving = useMemo(() => {
    if (deltaHistory.length < 3) return false;
    const last3 = deltaHistory.slice(-3);
    return last3[2].delta < last3[0].delta;
  }, [deltaHistory]);

  const selected = DEMO_HISTORY.find((e) => e.id === selectedSession);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg className="h-6 w-6 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="font-semibold text-[var(--foreground)]">Perplexity</span>
          </Link>
          <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200 font-medium">
            Calibration Engine
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">
            AI Confidence Calibration Engine
          </h1>
          <p className="text-sm text-[var(--muted)] max-w-lg mx-auto">
            Track how well you calibrate your confidence in AI-generated claims.
            Over-trust leads to errors. Under-trust wastes the investment. The goal is appropriate reliance.
          </p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center">
            <p className="text-[10px] text-[var(--muted)] uppercase tracking-wide">Avg Calibration Delta</p>
            <p className={`text-2xl font-bold mt-1 ${avgDelta > 0.5 ? "text-amber-500" : "text-emerald-500"}`}>
              {avgDelta > 0 ? "+" : ""}{avgDelta.toFixed(1)}
            </p>
            <p className="text-[10px] text-[var(--muted)]">
              {avgDelta > 0.5 ? "Overconfident trend" : avgDelta < -0.5 ? "Underconfident trend" : "Well calibrated"}
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center">
            <p className="text-[10px] text-[var(--muted)] uppercase tracking-wide">Overconfident Claims</p>
            <p className="text-2xl font-bold text-[var(--foreground)] mt-1">
              {Math.round((overconfidentCount / totalClaims) * 100)}%
            </p>
            <p className="text-[10px] text-[var(--muted)]">{overconfidentCount}/{totalClaims} total</p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center">
            <p className="text-[10px] text-[var(--muted)] uppercase tracking-wide">Sessions Analyzed</p>
            <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{DEMO_HISTORY.length}</p>
            <p className="text-[10px] text-[var(--muted)]">Last 7 days</p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center">
            <p className="text-[10px] text-[var(--muted)] uppercase tracking-wide">Trend</p>
            <p className={`text-2xl font-bold mt-1 ${deltaImproving ? "text-emerald-500" : "text-amber-500"}`}>
              {deltaImproving ? "↓ Improving" : "→ Stable"}
            </p>
            <p className="text-[10px] text-[var(--muted)]">Delta narrowing</p>
          </div>
        </div>

        {/* Calibration trend chart */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <h3 className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide mb-4">
            Calibration Delta Over Time
          </h3>
          <p className="text-[10px] text-[var(--muted)] mb-3">
            Positive = overconfident · Negative = underconfident · Zero = perfectly calibrated
          </p>
          <div className="relative h-32">
            {/* Zero line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[var(--border)]" />
            <div className="absolute top-1/2 left-0 text-[8px] text-[var(--muted)] -translate-y-1/2 -ml-1">0</div>
            <div className="flex items-center h-full gap-2 px-4">
              {deltaHistory.map((d, i) => {
                const maxDelta = 2;
                const normalizedDelta = Math.max(-maxDelta, Math.min(maxDelta, d.delta));
                const pctFromCenter = (normalizedDelta / maxDelta) * 50;
                const isOver = d.delta > 0;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center justify-center h-full relative">
                    <div
                      className={`w-full rounded transition-all ${
                        isOver ? "bg-amber-400" : "bg-blue-400"
                      }`}
                      style={{
                        position: "absolute",
                        top: isOver ? `${50 - Math.abs(pctFromCenter)}%` : "50%",
                        height: `${Math.abs(pctFromCenter)}%`,
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setSelectedSession(DEMO_HISTORY[i].id)}
                      className="absolute bottom-0 text-[8px] text-[var(--muted)] hover:text-[var(--accent)] cursor-pointer"
                    >
                      {d.date.slice(5)}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between text-[9px] text-[var(--muted)] mt-1 px-4">
            <span>Underconfident ↓</span>
            <span>Overconfident ↑</span>
          </div>
        </div>

        {/* Session detail */}
        {selected && (
          <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-soft)]/20 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[var(--accent)]">Session Detail</p>
                <p className="text-sm text-[var(--foreground)] font-medium">{selected.query}</p>
                <p className="text-[10px] text-[var(--muted)]">{selected.date}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSession(null)}
                className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                Close
              </button>
            </div>
            <div className="space-y-2">
              {selected.claims.map((claim, i) => (
                <div
                  key={i}
                  className={`rounded-lg border p-3 ${
                    claim.wasOverconfident
                      ? "border-amber-300 bg-amber-50/50 dark:bg-amber-950/20"
                      : claim.wasUnderconfident
                      ? "border-blue-300 bg-blue-50/50 dark:bg-blue-950/20"
                      : "border-[var(--border)]"
                  }`}
                >
                  <p className="text-sm text-[var(--foreground)]">{claim.text}</p>
                  <div className="flex flex-wrap gap-2 mt-2 text-[10px]">
                    <span className="px-2 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--border)]">
                      Your rating: {claim.userRating}/5
                    </span>
                    <span className={`px-2 py-0.5 rounded-full border ${
                      claim.actualType === "factual"
                        ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                        : claim.actualType === "inferential"
                        ? "bg-amber-100 text-amber-800 border-amber-200"
                        : "bg-violet-100 text-violet-800 border-violet-200"
                    }`}>
                      {claim.actualType}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full border ${
                      claim.sourceStrength === "strong"
                        ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                        : claim.sourceStrength === "moderate"
                        ? "bg-amber-100 text-amber-800 border-amber-200"
                        : "bg-red-100 text-red-800 border-red-200"
                    }`}>
                      {claim.sourceStrength} sources
                    </span>
                    {claim.wasOverconfident && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-300 font-medium">
                        ⚠ Overconfident
                      </span>
                    )}
                    {claim.wasUnderconfident && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-200 text-blue-900 border border-blue-300 font-medium">
                        ↑ Underconfident
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--muted)]">
              Session delta: <strong className={selected.overallDelta > 0.5 ? "text-amber-600" : "text-emerald-600"}>
                {selected.overallDelta > 0 ? "+" : ""}{selected.overallDelta.toFixed(1)}
              </strong>
            </p>
          </div>
        )}

        {/* Intervention recommendations */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <h3 className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide mb-3">
            Calibration Insights & Recommendations
          </h3>
          <div className="space-y-3">
            {avgDelta > 0.3 && (
              <div className="rounded-lg border border-amber-200 bg-amber-50/80 dark:bg-amber-950/20 px-3 py-2 text-sm">
                <p className="font-medium text-amber-800 dark:text-amber-200">You tend to over-trust AI-generated claims</p>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                  Recommendation: Before trusting a claim rated 4 or 5, check whether it is factual (directly sourced) or inferential (synthesized). Your overconfidence is highest on inferential claims.
                </p>
              </div>
            )}
            <div className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm">
              <p className="font-medium text-[var(--foreground)]">Claim type blind spot: Inferential claims</p>
              <p className="text-xs text-[var(--muted)] mt-1">
                You rated inferential claims 0.8 points higher on average than their source strength justifies. These claims combine multiple sources into a new conclusion — treat them with more skepticism.
              </p>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 dark:bg-emerald-950/20 px-3 py-2 text-sm">
              <p className="font-medium text-emerald-800 dark:text-emerald-200">Strength: Normative claim detection</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                You correctly identify and discount normative claims (value judgments, recommendations). This is above the median calibration for Perplexity Pro users.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl border border-[var(--border)] text-sm text-[var(--foreground)] hover:border-[var(--accent)]"
          >
            Back to Search
          </Link>
          <Link
            href="/fitness"
            className="px-6 py-3 rounded-xl bg-[var(--accent)] text-white text-sm font-medium hover:opacity-90"
          >
            Practice Calibration
          </Link>
        </div>
      </main>
    </div>
  );
}
