"use client";

export type ProtocolPhase = "define" | "review" | "confront" | "commit" | "reflect";

interface PhaseProgressBarProps {
  currentPhase: ProtocolPhase;
  completedPhases: ProtocolPhase[];
  phases: { key: ProtocolPhase; label: string }[];
}

export default function PhaseProgressBar({
  currentPhase,
  completedPhases,
  phases,
}: PhaseProgressBarProps) {
  const currentIdx = phases.findIndex((p) => p.key === currentPhase);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wide">
          Phase {currentIdx + 1} of {phases.length}: {phases[currentIdx]?.label}
        </p>
      </div>
      <div className="flex gap-1.5">
        {phases.map((phase) => {
          const isCompleted = completedPhases.includes(phase.key);
          const isCurrent = phase.key === currentPhase;
          return (
            <div key={phase.key} className="flex-1 flex flex-col gap-1">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  isCompleted
                    ? "bg-emerald-500"
                    : isCurrent
                    ? "bg-[var(--accent)]"
                    : "bg-[var(--border)]"
                }`}
              />
              <span
                className={`text-[9px] text-center transition-colors ${
                  isCompleted
                    ? "text-emerald-600 font-medium"
                    : isCurrent
                    ? "text-[var(--accent)] font-medium"
                    : "text-[var(--muted)]"
                }`}
              >
                {isCompleted ? "✓ " : ""}
                {phase.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CollapsedPhaseCard({
  title,
  summary,
  onExpand,
}: {
  title: string;
  summary: Record<string, string>;
  onExpand?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onExpand}
      className="w-full text-left rounded-xl border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800 p-3 transition-all hover:shadow-sm"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-emerald-600 text-xs">✓</span>
        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          {title}
        </span>
        <span className="text-[9px] text-[var(--muted)] ml-auto">click to review</span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {Object.entries(summary).map(([key, value]) => (
          <span key={key} className="text-[10px] text-[var(--muted)]">
            <strong className="text-[var(--foreground)]">{key}:</strong> {value}
          </span>
        ))}
      </div>
    </button>
  );
}
