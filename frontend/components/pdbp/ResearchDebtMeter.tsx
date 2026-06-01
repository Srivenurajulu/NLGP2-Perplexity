"use client";

import { useState, useEffect, useMemo } from "react";

interface ResearchDebtProps {
  contractCriteriaMet: number;
  contractCriteriaTotal: number;
  sourcesInspected: number;
  sourcesTotal: number;
  conflictsResolved: number;
  conflictsTotal: number;
  dutiesCompleted: number;
  dutiesTotal: number;
  commitCompleted: boolean;
  forkCompleted: boolean;
  forkRequired: boolean;
}

export default function ResearchDebtMeter({
  contractCriteriaMet,
  contractCriteriaTotal,
  sourcesInspected,
  sourcesTotal,
  conflictsResolved,
  conflictsTotal,
  dutiesCompleted,
  dutiesTotal,
  commitCompleted,
  forkCompleted,
  forkRequired,
}: ResearchDebtProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  const dimensions = useMemo(() => {
    const items = [
      {
        label: "Contract criteria answered",
        done: contractCriteriaMet,
        total: contractCriteriaTotal,
        weight: 0.25,
      },
      {
        label: "Sources inspected",
        done: sourcesInspected,
        total: sourcesTotal,
        weight: 0.2,
      },
      {
        label: "Source conflicts reviewed",
        done: conflictsResolved,
        total: conflictsTotal,
        weight: 0.15,
      },
      {
        label: "Verification duties completed",
        done: dutiesCompleted,
        total: dutiesTotal,
        weight: 0.2,
      },
      {
        label: "Judgment commit",
        done: commitCompleted ? 1 : 0,
        total: 1,
        weight: 0.15,
      },
    ];

    if (forkRequired) {
      items.push({
        label: "Epistemic fork selected",
        done: forkCompleted ? 1 : 0,
        total: 1,
        weight: 0.05,
      });
    }

    return items;
  }, [
    contractCriteriaMet,
    contractCriteriaTotal,
    sourcesInspected,
    sourcesTotal,
    conflictsResolved,
    conflictsTotal,
    dutiesCompleted,
    dutiesTotal,
    commitCompleted,
    forkCompleted,
    forkRequired,
  ]);

  const rawScore = useMemo(() => {
    let totalWeight = 0;
    let weightedSum = 0;
    for (const d of dimensions) {
      const ratio = d.total > 0 ? d.done / d.total : 0;
      weightedSum += ratio * d.weight;
      totalWeight += d.weight;
    }
    return totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 100) : 0;
  }, [dimensions]);

  useEffect(() => {
    const duration = 800;
    const start = animatedScore;
    const diff = rawScore - start;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(start + diff * eased));
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawScore]);

  const scoreColor =
    animatedScore >= 80
      ? "text-emerald-500"
      : animatedScore >= 50
      ? "text-amber-500"
      : "text-red-400";

  const ringColor =
    animatedScore >= 80
      ? "stroke-emerald-500"
      : animatedScore >= 50
      ? "stroke-amber-500"
      : "stroke-red-400";

  const circumference = 2 * Math.PI * 42;
  const dashOffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="flex items-center gap-2 mb-3">
        <svg className="h-4 w-4 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h3 className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide">
          Research Progress
        </h3>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
            <circle
              cx="48" cy="48" r="42"
              fill="none"
              stroke="var(--border)"
              strokeWidth="6"
            />
            <circle
              cx="48" cy="48" r="42"
              fill="none"
              className={ringColor}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-xl font-bold ${scoreColor}`}>
              {animatedScore}%
            </span>
            <span className="text-[9px] text-[var(--muted)]">covered</span>
          </div>
        </div>

        <div className="flex-1 text-[11px] text-[var(--muted)] leading-relaxed">
          {animatedScore < 40 && (
            <p>Most of your research checklist is still open. Review the duties and sources before acting.</p>
          )}
          {animatedScore >= 40 && animatedScore < 75 && (
            <p>You have made progress. Some contract criteria and source reviews remain before this research is decision-ready.</p>
          )}
          {animatedScore >= 75 && animatedScore < 100 && (
            <p>Nearly there. A few items remain — complete them to reach full decision readiness.</p>
          )}
          {animatedScore >= 100 && (
            <p>All research dimensions covered. You are ready to act with confidence in your process.</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {dimensions.map((d, i) => {
          const ratio = d.total > 0 ? d.done / d.total : 0;
          const pct = Math.round(ratio * 100);
          return (
            <div key={i}>
              <div className="flex justify-between text-[10px] mb-0.5">
                <span className="text-[var(--muted)]">{d.label}</span>
                <span className="text-[var(--foreground)] font-medium">
                  {d.done}/{d.total}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    pct >= 100
                      ? "bg-emerald-500"
                      : pct >= 50
                      ? "bg-amber-400"
                      : "bg-red-400"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
