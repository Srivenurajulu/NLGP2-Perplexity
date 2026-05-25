"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface SearchBarProps {
  initialQuery?: string;
  compact?: boolean;
}

export default function SearchBar({
  initialQuery = "",
  compact = false,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    window.location.href = `/search/${encodeURIComponent(trimmed)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={`flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm transition-shadow focus-within:shadow-md focus-within:border-[var(--accent)] ${
          compact ? "px-4 py-2.5" : "px-5 py-3.5"
        }`}
      >
        <SearchIcon />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything..."
          className={`flex-1 bg-transparent outline-none text-[var(--foreground)] placeholder:text-[var(--muted)] ${
            compact ? "text-sm" : "text-base"
          }`}
        />
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 rounded-lg bg-[var(--accent-soft)] px-2 py-1 text-xs font-medium text-[var(--accent)]">
            Pro
          </span>
          <button
            type="submit"
            className="rounded-xl bg-[var(--accent)] p-2 text-white hover:opacity-90 transition-opacity"
            aria-label="Search"
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
    </form>
  );
}

function SearchIcon() {
  return (
    <svg
      className="h-5 w-5 text-[var(--muted)] shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
