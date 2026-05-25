"use client";

import { EpistemicFork } from "@/lib/types";
import { useState } from "react";

interface EpistemicForkSelectorProps {
  fork: EpistemicFork;
  onSelect: (choice: "conservative" | "expansive", rationale: string) => void;
}

export default function EpistemicForkSelector({
  fork,
  onSelect,
}: EpistemicForkSelectorProps) {
  const [choice, setChoice] = useState<"conservative" | "expansive" | null>(null);
  const [rationale, setRationale] = useState("");

  return (
    <div className="rounded-xl border border-violet-300 dark:border-violet-700 bg-violet-50/50 dark:bg-violet-950/20 p-4 space-y-4">
      <div>
        <p className="text-xs font-semibold text-violet-700 dark:text-violet-300 uppercase tracking-wide">
          Step 2b · Epistemic Fork (irreversible stakes)
        </p>
        <p className="text-sm text-[var(--muted)] mt-1">
          Two defensible readings from the same sources. Select one and document why.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {(
          [
            ["conservative", fork.conservative],
            ["expansive", fork.expansive],
          ] as const
        ).map(([key, data]) => (
          <button
            key={key}
            type="button"
            onClick={() => setChoice(key)}
            className={`text-left rounded-xl border p-4 transition-colors ${
              choice === key
                ? "border-violet-500 bg-violet-100/50 dark:bg-violet-900/30"
                : "border-[var(--border)] bg-[var(--surface)] hover:border-violet-400"
            }`}
          >
            <p className="text-xs font-bold text-violet-700 dark:text-violet-300">
              {data.title}
            </p>
            <p className="text-sm text-[var(--foreground)] mt-2">{data.summary}</p>
            <p className="text-[10px] text-[var(--muted)] mt-2 italic">{data.emphasis}</p>
          </button>
        ))}
      </div>

      {choice && (
        <div>
          <label className="text-xs font-medium">
            I choose {choice} because... (required)
          </label>
          <textarea
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => onSelect(choice, rationale)}
            disabled={rationale.trim().length < 15}
            className="mt-3 w-full py-2 rounded-lg bg-violet-600 text-white text-sm font-medium disabled:opacity-40"
          >
            Commit to this reading
          </button>
        </div>
      )}
    </div>
  );
}
