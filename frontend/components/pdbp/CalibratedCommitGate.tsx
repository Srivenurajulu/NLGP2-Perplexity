"use client";

import { BlindClaim, ClaimReveal } from "@/lib/types";
import { claimTypeColor, claimTypeLabel } from "@/lib/utils";
import { useState } from "react";

interface CalibratedCommitGateProps {
  blindClaims: BlindClaim[];
  reveals: ClaimReveal[];
  onComplete: () => void;
  onClose: () => void;
}

export default function CalibratedCommitGate({
  blindClaims,
  reveals,
  onComplete,
  onClose,
}: CalibratedCommitGateProps) {
  const [phase, setPhase] = useState<"rate" | "reveal" | "done">("rate");
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [rationale, setRationale] = useState("");

  function handleReveal() {
    if (blindClaims.every((c) => ratings[c.id] !== undefined)) {
      setPhase("reveal");
    }
  }

  const revealMap = Object.fromEntries(reveals.map((r) => [r.claimId, r]));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl p-6">
        <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wide">
          Step 3 · Calibrated Commit
        </p>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mt-1">
          {phase === "rate" ? "Rate before you see evidence" : "Calibration reveal"}
        </h2>
        <p className="text-sm text-[var(--muted)] mt-1 mb-4">
          {phase === "rate"
            ? "How much would you trust each claim right now? (1 = low, 5 = high). No sources shown yet."
            : "Compare your ratings to claim type and sources. You remain the judge."}
        </p>

        {phase === "rate" && (
          <div className="space-y-4">
            {blindClaims.map((claim) => (
              <div key={claim.id} className="rounded-lg border border-[var(--border)] p-3">
                <p className="text-sm text-[var(--foreground)]">{claim.text}</p>
                <div className="flex gap-2 mt-3">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRatings((r) => ({ ...r, [claim.id]: n }))}
                      className={`w-8 h-8 rounded-lg text-xs font-medium border ${
                        ratings[claim.id] === n
                          ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                          : "border-[var(--border)]"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleReveal}
              disabled={blindClaims.some((c) => ratings[c.id] === undefined)}
              className="w-full py-3 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold disabled:opacity-40"
            >
              Reveal evidence structure
            </button>
          </div>
        )}

        {phase === "reveal" && (
          <div className="space-y-4">
            {blindClaims.map((claim) => {
              const rev = revealMap[claim.id];
              const userRating = ratings[claim.id];
              const overconfident = userRating >= 4 && rev?.mismatchAlert;

              return (
                <div
                  key={claim.id}
                  className={`rounded-lg border p-3 ${
                    overconfident
                      ? "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20"
                      : "border-[var(--border)]"
                  }`}
                >
                  <p className="text-sm">{claim.text}</p>
                  <p className="text-xs mt-2">
                    Your rating: <strong>{userRating}/5</strong>
                  </p>
                  {rev && (
                    <>
                      <span
                        className={`inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full border ${claimTypeColor(rev.type)}`}
                      >
                        {claimTypeLabel(rev.type)}
                      </span>
                      <p className="text-[10px] text-[var(--muted)] mt-1">
                        Sources: {rev.sourceIds.map((id) => `[${id}]`).join(" ")}
                      </p>
                      {rev.mismatchAlert && (
                        <p className="text-xs text-amber-700 dark:text-amber-300 mt-2 font-medium">
                          {rev.mismatchAlert}
                        </p>
                      )}
                    </>
                  )}
                </div>
              );
            })}
            <label className="block">
              <span className="text-xs font-medium">
                One sentence: why you trust (or distrust) this brief enough to act
              </span>
              <textarea
                value={rationale}
                onChange={(e) => setRationale(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
              />
            </label>
            <button
              type="button"
              onClick={() => {
                setPhase("done");
                onComplete();
              }}
              disabled={rationale.trim().length < 10}
              className="w-full py-3 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold disabled:opacity-40"
            >
              Complete judgment commit
            </button>
          </div>
        )}

        {phase === "done" && (
          <p className="text-sm text-[var(--foreground)]">
            Judgment commit recorded. You can review sources and export when ready.
          </p>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full text-xs text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          {phase === "done" ? "Close" : "Skip (not recommended for irreversible stakes)"}
        </button>
      </div>
    </div>
  );
}
