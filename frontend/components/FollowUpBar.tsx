"use client";

import { useRouter } from "next/navigation";

interface FollowUpBarProps {
  followUps: string[];
}

export default function FollowUpBar({ followUps }: FollowUpBarProps) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border)]">
      <span className="text-xs text-[var(--muted)] w-full mb-1">Related</span>
      {followUps.map((q) => (
        <button
          key={q}
          type="button"
          onClick={() => router.push(`/search/${encodeURIComponent(q)}`)}
          className="text-xs px-3 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
