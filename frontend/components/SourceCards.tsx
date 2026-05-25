"use client";

import { Source } from "@/lib/types";

interface SourceCardsProps {
  sources: Source[];
  highlightedId?: number | null;
}

export default function SourceCards({ sources, highlightedId }: SourceCardsProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide">
        Sources
      </h3>
      {sources.map((source) => (
        <a
          key={source.id}
          id={`source-${source.id}`}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`block rounded-xl border p-3 transition-all hover:shadow-md ${
            highlightedId === source.id
              ? "border-[var(--accent)] bg-[var(--accent-soft)] shadow-sm"
              : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/40"
          }`}
        >
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded bg-[var(--accent-soft)] text-[var(--accent)] text-[10px] font-bold">
              {source.id}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-[var(--foreground)] line-clamp-2 leading-snug">
                {source.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-[var(--accent)] truncate">
                  {source.domain}
                </span>
                <span className="text-[10px] text-[var(--muted)]">{source.date}</span>
              </div>
              <p className="text-[11px] text-[var(--muted)] mt-1.5 line-clamp-2 leading-relaxed">
                {source.snippet}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
