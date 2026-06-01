"use client";

import { IntentContract, StakesLevel } from "@/lib/types";
import { useState } from "react";

interface IntentContractModalProps {
  query: string;
  initial?: IntentContract;
  onSubmit: (contract: IntentContract) => void;
}

export default function IntentContractModal({
  query,
  initial,
  onSubmit,
}: IntentContractModalProps) {
  const [decision, setDecision] = useState(
    initial?.decision ?? `Support my decision on: ${query}`
  );
  const [stakes, setStakes] = useState<StakesLevel>(
    initial?.stakes ?? "operational"
  );
  const [goodEnough, setGoodEnough] = useState(
    initial?.goodEnough ??
      "I can explain what is sourced, inferred, unknown, and what I must verify."
  );
  const [deadline, setDeadline] = useState(initial?.deadline ?? "");

  return (
    <div className="w-full max-w-lg mx-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-xl p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wide">
          Step 1 · Intent Contract
        </p>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mt-1">
          Before we retrieve sources
        </h2>
        <p className="text-sm text-[var(--muted)] mt-1">
          Perplexity Decision Brief Protocol shapes retrieval and output to your
          decision, not a generic essay.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="text-xs font-medium text-[var(--foreground)]">
            What decision does this research support?
          </span>
          <textarea
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-xs font-medium text-[var(--foreground)]">
            Stakes level
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {(
              [
                ["exploratory", "Exploratory"],
                ["operational", "Operational"],
                ["irreversible", "Irreversible"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setStakes(value)}
                className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                  stakes === value
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "border-[var(--border)] hover:border-[var(--accent)]/50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </label>

        <label className="block">
          <span className="text-xs font-medium text-[var(--foreground)]">
            What would &quot;good enough&quot; look like?
          </span>
          <textarea
            value={goodEnough}
            onChange={(e) => setGoodEnough(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-xs font-medium text-[var(--foreground)]">
            Act by (optional)
          </span>
          <input
            type="text"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="e.g. This week"
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={() =>
          onSubmit({
            decision,
            stakes,
            goodEnough,
            deadline: deadline || undefined,
          })
        }
        className="mt-6 w-full py-3 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:opacity-90"
      >
        Generate Decision Brief
      </button>
    </div>
  );
}
