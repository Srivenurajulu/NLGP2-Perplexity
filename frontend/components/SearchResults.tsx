"use client";

import CalibratedCommitGate from "@/components/pdbp/CalibratedCommitGate";
import CognitiveLoadMonitor, {
  LoadLevelBadge,
  type LoadLevel,
} from "@/components/pdbp/CognitiveLoadMonitor";
import DecisionBriefView from "@/components/pdbp/DecisionBriefView";
import EpistemicForkSelector from "@/components/pdbp/EpistemicForkSelector";
import IntentContractModal from "@/components/pdbp/IntentContractModal";
import ResearchDebtMeter from "@/components/pdbp/ResearchDebtMeter";
import FollowUpBar from "@/components/FollowUpBar";
import SearchBar from "@/components/SearchBar";
import SourceCards from "@/components/SourceCards";
import { IntentContract, SearchResponse } from "@/lib/types";
import { findMockResponse } from "@/lib/mock/pdbp-data";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

interface SearchResultsProps {
  query: string;
}

export default function SearchResults({ query }: SearchResultsProps) {
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contract, setContract] = useState<IntentContract | null>(null);
  const [showContractModal, setShowContractModal] = useState(false);
  const [showCommitGate, setShowCommitGate] = useState(false);
  const [commitDone, setCommitDone] = useState(false);
  const [forkDone, setForkDone] = useState(false);
  const [showNarrative, setShowNarrative] = useState(false);
  const [highlightedSource, setHighlightedSource] = useState<number | null>(null);
  const [cognitiveLoad, setCognitiveLoad] = useState<LoadLevel>("medium");
  const [sourcesInspected, setSourcesInspected] = useState<Set<number>>(new Set());

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      setError(null);
      try {
        // Simulate network delay for demo
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const json = findMockResponse(query);
        setData(json);
        setShowContractModal(true);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [query]);

  function handleContractSubmit(c: IntentContract) {
    setContract(c);
    setShowContractModal(false);
    if (data) {
      setData({
        ...data,
        decisionBrief: {
          ...data.decisionBrief,
          intentContract: c,
        },
      });
    }
  }

  const handleCitationClick = useCallback(
    (id: number) => {
      setHighlightedSource(id);
      setSourcesInspected((prev) => new Set(prev).add(id));
      document
        .getElementById(`source-${id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    []
  );

  const brief = data?.decisionBrief;
  const needsFork =
    brief?.intentContract.stakes === "irreversible" && brief?.epistemicFork;
  const forkRequired = needsFork && !forkDone;

  // Research debt calculations
  const contractCriteriaTotal = 3; // decision, stakes, good enough
  const contractCriteriaMet = contract ? 3 : 0;
  const totalSources = data?.sources.length ?? 0;
  const totalConflicts = brief?.sourceDisagreements.length ?? 0;
  const totalDuties = brief?.verificationDuties.length ?? 0;

  return (
    <CognitiveLoadMonitor onLoadChange={setCognitiveLoad}>
      {(loadLevel) => (
        <div className="min-h-screen bg-[var(--background)]">
          <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
              <a href="/" className="flex items-center gap-2 shrink-0">
                <Logo />
              </a>
              <div className="flex-1 max-w-2xl">
                <SearchBar initialQuery={query} compact />
              </div>
              <LoadLevelBadge level={loadLevel} />
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 py-6">
            {loading && <LoadingState query={query} />}
            {error && <p className="text-center py-20 text-red-500">{error}</p>}

            {data && brief && contract && !loading && (
              <>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wide">
                      Decision Brief Protocol
                    </p>
                    <h1 className="text-lg font-medium text-[var(--foreground)]">{data.query}</h1>
                    <p className="text-xs text-[var(--muted)] mt-0.5">
                      {data.sources.length} sources · Anti-closure format · Cognitive load: {loadLevel}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {!commitDone && (
                      <button
                        type="button"
                        onClick={() => setShowCommitGate(true)}
                        className="px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-sm font-medium"
                      >
                        Calibrated Commit
                      </button>
                    )}
                    {commitDone && (
                      <span className="px-3 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-medium dark:bg-emerald-900/40 dark:text-emerald-200">
                        Commit complete
                      </span>
                    )}
                    <a
                      href="/calibration"
                      className="px-4 py-2 rounded-xl border border-[var(--border)] text-sm text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                    >
                      Calibration Dashboard
                    </a>
                  </div>
                </div>

                {brief.intentContract.stakes === "irreversible" && (
                  <div className="mb-4 rounded-xl border border-red-300 bg-red-50 dark:bg-red-950/30 dark:border-red-800 px-4 py-3 text-sm">
                    <strong>Irreversible stakes:</strong> Complete Epistemic Fork (if shown) and
                    Calibrated Commit before acting on this brief.
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
                  <div className="space-y-6">
                    {needsFork && brief.epistemicFork && (
                      <EpistemicForkSelector
                        fork={brief.epistemicFork}
                        onSelect={() => setForkDone(true)}
                      />
                    )}
                    {forkRequired && (
                      <p className="text-xs text-amber-600 dark:text-amber-400">
                        Select an epistemic fork above to proceed with full protocol.
                      </p>
                    )}

                    {/* Adaptive content based on cognitive load */}
                    {loadLevel === "high" ? (
                      <div className="rounded-xl border border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-800 p-4">
                        <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2">
                          🎯 Key Claims Only (simplified for current reading pace)
                        </p>
                        <div className="space-y-2">
                          {brief.sourcedFindings.slice(0, 3).map((c) => (
                            <p key={c.id} className="text-sm text-[var(--foreground)]">
                              • {c.text}
                            </p>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => setCognitiveLoad("low")}
                          className="mt-3 text-xs text-blue-600 hover:underline"
                        >
                          Show full Decision Brief →
                        </button>
                      </div>
                    ) : (
                      <DecisionBriefView
                        brief={brief}
                        sources={data.sources}
                        onCitationClick={handleCitationClick}
                        showNarrative={showNarrative}
                        onToggleNarrative={() => setShowNarrative(!showNarrative)}
                      />
                    )}

                    <FollowUpBar followUps={data.followUps} />
                  </div>
                  <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
                    {/* Research Debt Meter — Solution 4 */}
                    <ResearchDebtMeter
                      contractCriteriaMet={contractCriteriaMet}
                      contractCriteriaTotal={contractCriteriaTotal}
                      sourcesInspected={sourcesInspected.size}
                      sourcesTotal={totalSources}
                      conflictsResolved={0}
                      conflictsTotal={totalConflicts}
                      dutiesCompleted={0}
                      dutiesTotal={totalDuties}
                      commitCompleted={commitDone}
                      forkCompleted={forkDone}
                      forkRequired={!!needsFork}
                    />
                    <SourceCards sources={data.sources} highlightedId={highlightedSource} />
                  </div>
                </div>
              </>
            )}
          </main>

          {showContractModal && data && (
            <IntentContractModal
              query={query}
              initial={data.decisionBrief.intentContract}
              onSubmit={handleContractSubmit}
            />
          )}

          {showCommitGate && brief && (
            <CalibratedCommitGate
              blindClaims={brief.calibratedCommit.blindClaims}
              reveals={brief.calibratedCommit.reveals}
              onComplete={() => {
                setCommitDone(true);
                setShowCommitGate(false);
              }}
              onClose={() => setShowCommitGate(false)}
            />
          )}
        </div>
      )}
    </CognitiveLoadMonitor>
  );
}

function LoadingState({ query }: { query: string }) {
  return (
    <div className="py-8 space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-4 w-4 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
        <p className="text-sm text-[var(--muted)]">Building Decision Brief for &quot;{query}&quot;...</p>
      </div>
      <div className="space-y-3 animate-pulse">
        <div className="h-4 bg-[var(--border)] rounded w-3/4" />
        <div className="h-4 bg-[var(--border)] rounded w-full" />
        <div className="h-4 bg-[var(--border)] rounded w-5/6" />
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg className="h-6 w-6 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
      <span className="font-semibold text-[var(--foreground)] hidden sm:inline">Perplexity</span>
      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent-soft)] text-[var(--accent)] font-medium hidden sm:inline">
        PDBP
      </span>
    </div>
  );
}
