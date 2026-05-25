"use client";

import { DecisionBrief, Source } from "@/lib/types";
import { claimTypeColor, claimTypeLabel } from "@/lib/utils";

interface DecisionBriefViewProps {
  brief: DecisionBrief;
  sources: Source[];
  onCitationClick?: (id: number) => void;
  showNarrative?: boolean;
  onToggleNarrative?: () => void;
}

export default function DecisionBriefView({
  brief,
  sources,
  onCitationClick,
  showNarrative,
  onToggleNarrative,
}: DecisionBriefViewProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-soft)]/50 p-4">
        <p className="text-xs font-semibold text-[var(--accent)]">Intent Contract (pinned)</p>
        <p className="text-sm text-[var(--foreground)] mt-1">{brief.intentContract.decision}</p>
        <div className="flex flex-wrap gap-2 mt-2 text-[10px]">
          <span className="px-2 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--border)]">
            Stakes: {brief.intentContract.stakes}
          </span>
          {brief.intentContract.deadline && (
            <span className="px-2 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--border)]">
              By: {brief.intentContract.deadline}
            </span>
          )}
        </div>
        <p className="text-xs text-[var(--muted)] mt-2">
          Good enough: {brief.intentContract.goodEnough}
        </p>
      </div>

      <BriefSection title="Sourced findings" subtitle="Directly supported by retrieved sources">
        {brief.sourcedFindings.map((c) => (
          <ClaimCard key={c.id} claim={c} onCitationClick={onCitationClick} />
        ))}
      </BriefSection>

      <BriefSection title="Inferred conclusions" subtitle="Synthesis across sources; verify reasoning">
        {brief.inferredConclusions.map((c) => (
          <ClaimCard key={c.id} claim={c} showChain onCitationClick={onCitationClick} />
        ))}
      </BriefSection>

      <BriefSection title="Not retrieved / not addressed" subtitle="Resists false completeness">
        <ul className="space-y-2">
          {brief.notAddressed.map((gap, i) => (
            <li
              key={i}
              className="text-sm text-[var(--foreground)] rounded-lg border border-amber-200 bg-amber-50/80 dark:bg-amber-950/30 dark:border-amber-800/50 px-3 py-2"
            >
              {gap}
            </li>
          ))}
        </ul>
      </BriefSection>

      <BriefSection title="Your verification duties" subtitle="Ranked for your contract (you perform these)">
        <ol className="space-y-3">
          {brief.verificationDuties
            .sort((a, b) => a.priority - b.priority)
            .map((d) => (
              <li
                key={d.id}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3"
              >
                <span className="text-[10px] font-bold text-[var(--accent)]">
                  Priority {d.priority}
                </span>
                <p className="text-sm text-[var(--foreground)] mt-1">{d.action}</p>
                <p className="text-xs text-[var(--muted)] mt-1">{d.why}</p>
              </li>
            ))}
        </ol>
      </BriefSection>

      {brief.sourceDisagreements.length > 0 && (
        <BriefSection title="Source disagreement map" subtitle="We do not pick a winner">
          {brief.sourceDisagreements.map((d, i) => (
            <div key={i} className="rounded-lg border border-[var(--border)] p-3 space-y-2">
              <p className="text-xs font-semibold">{d.topic}</p>
              <p className="text-xs">
                A: {d.positionA.claim}{" "}
                {d.positionA.sourceIds.map((id) => `[${id}]`).join(" ")}
              </p>
              <p className="text-xs">
                B: {d.positionB.claim}{" "}
                {d.positionB.sourceIds.map((id) => `[${id}]`).join(" ")}
              </p>
            </div>
          ))}
        </BriefSection>
      )}

      {brief.narrativeSummary && onToggleNarrative && (
        <div>
          <button
            type="button"
            onClick={onToggleNarrative}
            className="text-xs text-[var(--accent)] font-medium hover:underline"
          >
            {showNarrative ? "Hide" : "Show"} legacy narrative summary
          </button>
          {showNarrative && (
            <p className="mt-2 text-sm text-[var(--muted)] italic border-l-2 border-[var(--border)] pl-3">
              {brief.narrativeSummary}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function BriefSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="text-sm font-semibold text-[var(--foreground)]">{title}</h3>
      <p className="text-[10px] text-[var(--muted)] mb-2">{subtitle}</p>
      {children}
    </section>
  );
}

function ClaimCard({
  claim,
  showChain,
  onCitationClick,
}: {
  claim: {
    id: string;
    text: string;
    type: string;
    sourceIds: number[];
    reasoningChain?: string;
  };
  showChain?: boolean;
  onCitationClick?: (id: number) => void;
}) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 mb-2">
      <span
        className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${claimTypeColor(claim.type)}`}
      >
        {claimTypeLabel(claim.type)}
      </span>
      <p className="text-sm text-[var(--foreground)] mt-2">{claim.text}</p>
      <div className="flex gap-1 mt-2">
        {claim.sourceIds.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => onCitationClick?.(id)}
            className="min-w-[18px] h-[18px] text-[10px] font-semibold rounded bg-[var(--accent-soft)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
          >
            {id}
          </button>
        ))}
      </div>
      {showChain && claim.reasoningChain && (
        <p className="text-[10px] text-[var(--muted)] mt-2 italic">{claim.reasoningChain}</p>
      )}
    </div>
  );
}
