"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { IntentContract, SearchResponse, StakesLevel } from "@/lib/types";
import { findMockResponse } from "@/lib/mock/pdbp-data";
import { claimTypeColor, claimTypeLabel } from "@/lib/utils";
import DecisionBriefView from "./DecisionBriefView";
import SourceCards from "@/components/SourceCards";
import PhaseProgressBar, {
  CollapsedPhaseCard,
  type ProtocolPhase,
} from "./PhaseProgressBar";
import SessionSummary from "./SessionSummary";
import SearchBar from "@/components/SearchBar";
import CognitiveLoadMonitor, {
  LoadLevelBadge,
  type LoadLevel,
} from "./CognitiveLoadMonitor";

interface UnifiedProtocolProps {
  query: string;
}

export default function UnifiedProtocol({ query }: UnifiedProtocolProps) {
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<ProtocolPhase>("define");
  const [completedPhases, setCompletedPhases] = useState<ProtocolPhase[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cognitiveLoad, setCognitiveLoad] = useState<LoadLevel>("medium");

  // Phase 1 state
  const [decision, setDecision] = useState("");
  const [stakes, setStakes] = useState<StakesLevel>("operational");
  const [goodEnough, setGoodEnough] = useState("");
  const [deadline, setDeadline] = useState("");
  const [contract, setContract] = useState<IntentContract | null>(null);

  // Phase 2 state
  const [sourcesInspected, setSourcesInspected] = useState<Set<number>>(new Set());
  const [highlightedSource, setHighlightedSource] = useState<number | null>(null);
  const [showNarrative, setShowNarrative] = useState(false);

  // Phase 3 state
  const [forkChoice, setForkChoice] = useState<{
    selected: "conservative" | "expansive";
    rationale: string;
  } | null>(null);
  const [forkSelected, setForkSelected] = useState<"conservative" | "expansive" | null>(null);
  const [forkRationale, setForkRationale] = useState("");

  // Phase 4 state
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [commitRevealed, setCommitRevealed] = useState(false);
  const [commitRationale, setCommitRationale] = useState("");

  // Load data
  useEffect(() => {
    async function load() {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1500));
      const json = findMockResponse(query);
      setData(json);
      const ic = json.decisionBrief.intentContract;
      setDecision(ic.decision);
      setStakes(ic.stakes);
      setGoodEnough(ic.goodEnough);
      setDeadline(ic.deadline ?? "");
      setLoading(false);
    }
    load();
  }, [query]);

  const brief = data?.decisionBrief;
  const needsFork = stakes === "irreversible" && brief?.epistemicFork;

  const phases = useMemo(() => {
    const p: { key: ProtocolPhase; label: string }[] = [
      { key: "define", label: "Define" },
      { key: "review", label: "Review" },
    ];
    if (needsFork) p.push({ key: "confront", label: "Confront" });
    p.push({ key: "commit", label: "Commit" });
    p.push({ key: "reflect", label: "Reflect" });
    return p;
  }, [needsFork]);

  const completePhase = useCallback(
    (p: ProtocolPhase) => {
      setCompletedPhases((prev) => (prev.includes(p) ? prev : [...prev, p]));
    },
    []
  );

  // Phase 1 submit
  function handleDefineSubmit() {
    const c: IntentContract = { decision, stakes, goodEnough, deadline: deadline || undefined };
    setContract(c);
    if (data) {
      setData({ ...data, decisionBrief: { ...data.decisionBrief, intentContract: c } });
    }
    completePhase("define");
    setPhase("review");
  }

  // Phase 2 continue
  function handleReviewContinue() {
    completePhase("review");
    setPhase(needsFork ? "confront" : "commit");
  }

  // Phase 3 submit
  function handleForkSubmit() {
    if (!forkSelected) return;
    const choice = { selected: forkSelected, rationale: forkRationale };
    setForkChoice(choice);
    completePhase("confront");
    setPhase("commit");
  }

  // Phase 4 reveal
  function handleReveal() {
    if (brief && brief.calibratedCommit.blindClaims.every((c) => ratings[c.id] !== undefined)) {
      setCommitRevealed(true);
    }
  }

  // Phase 4 complete
  function handleCommitComplete() {
    completePhase("commit");
    setPhase("reflect");
  }

  const handleCitationClick = useCallback((id: number) => {
    setHighlightedSource(id);
    setSourcesInspected((prev) => new Set(prev).add(id));
    document.getElementById(`source-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  // Research debt score
  const researchDebtScore = useMemo(() => {
    if (!data || !brief) return 0;
    let score = 0;
    let total = 0;
    // Contract
    total += 25;
    if (contract) score += 25;
    // Sources
    total += 20;
    const srcRatio = data.sources.length > 0 ? sourcesInspected.size / data.sources.length : 0;
    score += srcRatio * 20;
    // Fork
    if (needsFork) { total += 10; if (forkChoice) score += 10; }
    // Commit
    total += 20;
    if (commitRevealed) score += 20;
    // Duties
    total += 25;
    // (duties not tracked in demo, give partial credit)
    return total > 0 ? Math.round((score / total) * 100) : 0;
  }, [contract, sourcesInspected, forkChoice, commitRevealed, data, brief, needsFork]);

  // Calibration delta
  const calibrationDelta = useMemo(() => {
    if (!commitRevealed || !brief) return 0;
    const reveals = brief.calibratedCommit.reveals;
    let sum = 0;
    let count = 0;
    for (const r of reveals) {
      const rating = ratings[r.claimId];
      if (rating !== undefined) {
        const expected = r.type === "factual" ? 3 : r.type === "inferential" ? 2 : 1.5;
        sum += rating - expected;
        count++;
      }
    }
    return count > 0 ? Number((sum / count).toFixed(1)) : 0;
  }, [commitRevealed, brief, ratings]);

  const overconfidentClaims = useMemo(() => {
    if (!commitRevealed || !brief) return [];
    return brief.calibratedCommit.reveals
      .filter((r) => (ratings[r.claimId] ?? 0) >= 4 && r.mismatchAlert)
      .map((r) => r.mismatchAlert!);
  }, [commitRevealed, brief, ratings]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <Header query={query} cognitiveLoad="medium" />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 py-8">
            <div className="h-4 w-4 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
            <p className="text-sm text-[var(--muted)]">Building Decision Brief for &quot;{query}&quot;...</p>
          </div>
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-[var(--border)] rounded w-3/4" />
            <div className="h-4 bg-[var(--border)] rounded w-full" />
            <div className="h-4 bg-[var(--border)] rounded w-5/6" />
          </div>
        </main>
      </div>
    );
  }

  if (!data || !brief) return null;

  const revealMap = Object.fromEntries(brief.calibratedCommit.reveals.map((r) => [r.claimId, r]));

  return (
    <CognitiveLoadMonitor onLoadChange={setCognitiveLoad}>
      {(loadLevel) => (
        <div className="min-h-screen bg-[var(--background)]">
          <Header query={query} cognitiveLoad={loadLevel} />

          <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
            {/* Phase Progress Bar */}
            <PhaseProgressBar currentPhase={phase} completedPhases={completedPhases} phases={phases} />

            {/* Collapsed completed phases */}
            {completedPhases.includes("define") && phase !== "define" && (
              <CollapsedPhaseCard
                title="Phase 1: Define — Intent Contract"
                summary={{
                  Decision: contract?.decision ?? "",
                  Stakes: contract?.stakes ?? "",
                  "Good enough": contract?.goodEnough ? contract.goodEnough.slice(0, 60) + "..." : "",
                }}
              />
            )}

            {completedPhases.includes("review") && phase !== "review" && (
              <CollapsedPhaseCard
                title="Phase 2: Review — Decision Brief"
                summary={{
                  "Sources inspected": `${sourcesInspected.size}/${data.sources.length}`,
                  "Cognitive load": loadLevel,
                }}
              />
            )}

            {completedPhases.includes("confront") && phase !== "confront" && forkChoice && (
              <CollapsedPhaseCard
                title="Phase 3: Confront — Epistemic Fork"
                summary={{
                  "Fork chosen": forkChoice.selected,
                  Rationale: forkChoice.rationale.slice(0, 60) + "...",
                }}
              />
            )}

            {completedPhases.includes("commit") && phase !== "commit" && (
              <CollapsedPhaseCard
                title="Phase 4: Commit — Calibrated Commit"
                summary={{
                  "Calibration delta": `${calibrationDelta > 0 ? "+" : ""}${calibrationDelta}`,
                  Overconfident: `${overconfidentClaims.length} claims`,
                }}
              />
            )}

            {/* ═══ PHASE 1: DEFINE ═══ */}
            {phase === "define" && (
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4 animate-in">
                <div>
                  <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wide">
                    Phase 1 · Define Your Intent
                  </p>
                  <h2 className="text-lg font-semibold text-[var(--foreground)] mt-1">
                    Before we retrieve sources
                  </h2>
                  <p className="text-sm text-[var(--muted)] mt-1">
                    PDBP shapes retrieval and output to your decision, not a generic essay.
                  </p>
                </div>
                <label className="block">
                  <span className="text-xs font-medium text-[var(--foreground)]">
                    What decision does this research support?
                  </span>
                  <textarea value={decision} onChange={(e) => setDecision(e.target.value)} rows={2}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm" />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-[var(--foreground)]">Stakes level</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {([ ["exploratory", "Exploratory"], ["operational", "Operational"], ["irreversible", "Irreversible"] ] as const).map(([val, lbl]) => (
                      <button key={val} type="button" onClick={() => setStakes(val)}
                        className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                          stakes === val
                            ? val === "irreversible"
                              ? "border-red-500 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300"
                              : "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                            : "border-[var(--border)] hover:border-[var(--accent)]/50"
                        }`}>
                        {lbl}
                      </button>
                    ))}
                  </div>
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-[var(--foreground)]">
                    What would &quot;good enough&quot; look like?
                  </span>
                  <textarea value={goodEnough} onChange={(e) => setGoodEnough(e.target.value)} rows={2}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm" />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-[var(--foreground)]">Act by (optional)</span>
                  <input type="text" value={deadline} onChange={(e) => setDeadline(e.target.value)}
                    placeholder="e.g. This week"
                    className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm" />
                </label>
                <button type="button" onClick={handleDefineSubmit}
                  className="w-full py-3 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                  Generate Decision Brief →
                </button>
              </div>
            )}

            {/* ═══ PHASE 2: REVIEW ═══ */}
            {phase === "review" && (
              <div className="space-y-6 animate-in">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wide">
                      Phase 2 · Review Decision Brief
                    </p>
                    <h1 className="text-lg font-medium text-[var(--foreground)]">{data.query}</h1>
                    <p className="text-xs text-[var(--muted)] mt-0.5">
                      {data.sources.length} sources · Anti-closure format
                    </p>
                  </div>
                </div>

                {loadLevel === "high" ? (
                  <div className="rounded-xl border border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-800 p-4">
                    <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2">
                      🎯 Key Claims Only (simplified for current reading pace)
                    </p>
                    <div className="space-y-2">
                      {brief.sourcedFindings.slice(0, 3).map((c) => (
                        <p key={c.id} className="text-sm text-[var(--foreground)]">• {c.text}</p>
                      ))}
                    </div>
                    <button type="button" onClick={() => setCognitiveLoad("low")}
                      className="mt-3 text-xs text-blue-600 hover:underline">
                      Show full Decision Brief →
                    </button>
                  </div>
                ) : (
                  <DecisionBriefView brief={brief}
                    onCitationClick={handleCitationClick}
                    showNarrative={showNarrative}
                    onToggleNarrative={() => setShowNarrative(!showNarrative)} />
                )}

                <SourceCards sources={data.sources} highlightedId={highlightedSource} />

                <button type="button" onClick={handleReviewContinue}
                  className="w-full py-3 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:opacity-90">
                  {needsFork ? "Continue to Epistemic Fork →" : "Continue to Calibrated Commit →"}
                </button>
              </div>
            )}

            {/* ═══ PHASE 3: CONFRONT ═══ */}
            {phase === "confront" && brief.epistemicFork && (
              <div className="space-y-4 animate-in">
                <div>
                  <p className="text-xs font-semibold text-violet-700 dark:text-violet-300 uppercase tracking-wide">
                    Phase 3 · Epistemic Fork (irreversible stakes)
                  </p>
                  <p className="text-sm text-[var(--muted)] mt-1">
                    Two defensible readings from the same sources. Select one and document why.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {([ ["conservative", brief.epistemicFork.conservative], ["expansive", brief.epistemicFork.expansive] ] as const).map(([key, fd]) => (
                    <button key={key} type="button" onClick={() => setForkSelected(key)}
                      className={`text-left rounded-xl border p-4 transition-colors ${
                        forkSelected === key
                          ? "border-violet-500 bg-violet-100/50 dark:bg-violet-900/30"
                          : "border-[var(--border)] bg-[var(--surface)] hover:border-violet-400"
                      }`}>
                      <p className="text-xs font-bold text-violet-700 dark:text-violet-300">{fd.title}</p>
                      <p className="text-sm text-[var(--foreground)] mt-2">{fd.summary}</p>
                      <p className="text-[10px] text-[var(--muted)] mt-2 italic">{fd.emphasis}</p>
                    </button>
                  ))}
                </div>
                {forkSelected && (
                  <div>
                    <label className="text-xs font-medium">
                      I choose {forkSelected} because... (min 15 characters)
                    </label>
                    <textarea value={forkRationale} onChange={(e) => setForkRationale(e.target.value)}
                      rows={2} className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm" />
                    <button type="button" onClick={handleForkSubmit}
                      disabled={forkRationale.trim().length < 15}
                      className="mt-3 w-full py-3 rounded-xl bg-violet-600 text-white text-sm font-semibold disabled:opacity-40">
                      Commit to this reading →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ═══ PHASE 4: COMMIT ═══ */}
            {phase === "commit" && (
              <div className="space-y-4 animate-in">
                <div>
                  <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wide">
                    Phase {needsFork ? 4 : 3} · Calibrated Commit
                  </p>
                  <h2 className="text-lg font-semibold text-[var(--foreground)] mt-1">
                    {!commitRevealed ? "Rate before you see evidence" : "Calibration reveal"}
                  </h2>
                  <p className="text-sm text-[var(--muted)] mt-1">
                    {!commitRevealed
                      ? "How much would you trust each claim? (1 = low, 5 = high). No sources shown."
                      : "Compare your ratings to claim type and sources."}
                  </p>
                </div>

                {!commitRevealed ? (
                  <div className="space-y-4">
                    {brief.calibratedCommit.blindClaims.map((claim) => (
                      <div key={claim.id} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
                        <p className="text-sm text-[var(--foreground)]">{claim.text}</p>
                        <div className="flex gap-2 mt-3">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <button key={n} type="button"
                              onClick={() => setRatings((r) => ({ ...r, [claim.id]: n }))}
                              className={`w-8 h-8 rounded-lg text-xs font-medium border ${
                                ratings[claim.id] === n
                                  ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                                  : "border-[var(--border)]"
                              }`}>
                              {n}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={handleReveal}
                      disabled={brief.calibratedCommit.blindClaims.some((c) => ratings[c.id] === undefined)}
                      className="w-full py-3 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold disabled:opacity-40">
                      Reveal Evidence
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {brief.calibratedCommit.blindClaims.map((claim) => {
                      const rev = revealMap[claim.id];
                      const userRating = ratings[claim.id];
                      const overconfident = userRating >= 4 && rev?.mismatchAlert;
                      return (
                        <div key={claim.id} className={`rounded-lg border p-3 ${
                          overconfident ? "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20" : "border-[var(--border)]"
                        }`}>
                          <p className="text-sm">{claim.text}</p>
                          <p className="text-xs mt-2">Your rating: <strong>{userRating}/5</strong></p>
                          {rev && (
                            <>
                              <span className={`inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full border ${claimTypeColor(rev.type)}`}>
                                {claimTypeLabel(rev.type)}
                              </span>
                              <p className="text-[10px] text-[var(--muted)] mt-1">
                                Sources: {rev.sourceIds.map((id) => `[${id}]`).join(" ")}
                              </p>
                              {rev.mismatchAlert && (
                                <p className="text-xs text-amber-700 dark:text-amber-300 mt-2 font-medium">
                                  ⚠ {rev.mismatchAlert}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })}
                    <label className="block">
                      <span className="text-xs font-medium">
                        One sentence: why you trust (or distrust) this brief (min 10 chars)
                      </span>
                      <textarea value={commitRationale} onChange={(e) => setCommitRationale(e.target.value)}
                        rows={2} className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm" />
                    </label>
                    <button type="button" onClick={handleCommitComplete}
                      disabled={commitRationale.trim().length < 10}
                      className="w-full py-3 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold disabled:opacity-40">
                      Complete Protocol →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ═══ PHASE 5: REFLECT ═══ */}
            {phase === "reflect" && (
              <div className="animate-in">
                <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wide mb-4">
                  Phase {phases.length} · Reflect
                </p>
                <SessionSummary
                  researchDebtScore={researchDebtScore}
                  calibrationDelta={calibrationDelta}
                  overconfidentClaims={overconfidentClaims}
                  forkChoice={forkChoice}
                />
              </div>
            )}

            {/* Floating Research Debt Ring */}
            <FloatingDebtRing score={researchDebtScore} />
          </main>
        </div>
      )}
    </CognitiveLoadMonitor>
  );
}

import Link from "next/link";

function Header({ query, cognitiveLoad }: { query: string; cognitiveLoad: LoadLevel }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <svg className="h-6 w-6 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="font-semibold text-[var(--foreground)] hidden sm:inline">Perplexity</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent-soft)] text-[var(--accent)] font-medium hidden sm:inline">PDBP</span>
        </Link>
        <div className="flex-1 max-w-2xl">
          <SearchBar initialQuery={query} compact />
        </div>
        <LoadLevelBadge level={cognitiveLoad} />
      </div>
    </header>
  );
}

function FloatingDebtRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 18;
  const dashOffset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "stroke-emerald-500" : score >= 50 ? "stroke-amber-500" : "stroke-red-400";
  const textColor = score >= 80 ? "text-emerald-500" : score >= 50 ? "text-amber-500" : "text-red-400";

  return (
    <div className="fixed bottom-6 right-6 z-20">
      <div className="relative w-16 h-16 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-lg flex items-center justify-center">
        <svg className="absolute inset-0 w-16 h-16 -rotate-90" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="none" stroke="var(--border)" strokeWidth="2.5" />
          <circle cx="20" cy="20" r="18" fill="none" className={color} strokeWidth="2.5"
            strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 0.8s ease-out" }} />
        </svg>
        <div className="flex flex-col items-center">
          <span className={`text-xs font-bold ${textColor}`}>{score}%</span>
          <span className="text-[7px] text-[var(--muted)]">debt</span>
        </div>
      </div>
    </div>
  );
}
