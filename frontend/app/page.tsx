import SearchBar from "@/components/SearchBar";
import { DEMO_QUERIES } from "@/lib/mock/pdbp-data";

const PROTOCOL_MODULES = [
  {
    label: "Intent Contract",
    desc: "Define decision, stakes, and good enough before retrieval",
    icon: "📋",
    status: "Active",
  },
  {
    label: "Decision Brief",
    desc: "Sourced / inferred / gaps / your duties (not closure essay)",
    icon: "📄",
    status: "Active",
  },
  {
    label: "Epistemic Fork",
    desc: "Two honest readings from same sources (irreversible stakes)",
    icon: "🔀",
    status: "Active",
  },
  {
    label: "Calibrated Commit",
    desc: "Rate claims blind, then compare to evidence structure",
    icon: "🎯",
    status: "Active",
  },
  {
    label: "Research Debt",
    desc: "Progress meter: how much investigation you still owe this decision",
    icon: "📊",
    status: "New",
  },
  {
    label: "Cognitive Load Adaptive",
    desc: "UI adapts information density to your reading pace in real-time",
    icon: "🧠",
    status: "New",
  },
];

const EXPERIENCE_LINKS = [
  {
    href: "/fitness",
    label: "Epistemic Fitness",
    desc: "Daily 3-min challenges to sharpen your AI judgment skill",
    gradient: "from-violet-600 to-indigo-600",
    icon: "⚡",
  },
  {
    href: "/calibration",
    label: "Calibration Engine",
    desc: "Track your confidence calibration trends over time",
    gradient: "from-amber-500 to-orange-600",
    icon: "📈",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <header className="px-4 py-4 flex items-center justify-between max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <svg
            className="h-7 w-7 text-[var(--accent)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            />
          </svg>
          <span className="font-semibold text-lg text-[var(--foreground)]">Perplexity</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-medium">
            Decision Brief Protocol
          </span>
        </div>
        <nav className="hidden sm:flex items-center gap-3">
          <a
            href="/fitness"
            className="text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            Fitness
          </a>
          <a
            href="/calibration"
            className="text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            Calibration
          </a>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-16">
        <div className="w-full max-w-2xl text-center space-y-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-[var(--foreground)] tracking-tight">
              Research that resists false closure
            </h1>
            <p className="text-[var(--muted)] mt-3 text-sm sm:text-base max-w-lg mx-auto">
              PDBP replaces the &quot;polished essay&quot; with a judgment-ready Decision Brief.
              Built for professionals who must trust their own evaluation, not citation count.
            </p>
          </div>

          <SearchBar />

          <div className="space-y-3">
            <p className="text-xs text-[var(--muted)] uppercase tracking-wide font-medium">
              Demo queries (try irreversible stakes: FDA or PM interview)
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {DEMO_QUERIES.map((q) => (
                <a
                  key={q}
                  href={`/search/${encodeURIComponent(q)}`}
                  className="text-xs px-3 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  {q.length > 48 ? `${q.slice(0, 48)}...` : q}
                </a>
              ))}
            </div>
          </div>

          {/* Experience links — Solution 5 (Epistemic Fitness) + Calibration Engine */}
          <div className="grid sm:grid-cols-2 gap-3">
            {EXPERIENCE_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-left hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${link.gradient} flex items-center justify-center text-sm shadow-sm`}
                  >
                    {link.icon}
                  </span>
                  <span className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {link.label}
                  </span>
                </div>
                <p className="text-xs text-[var(--muted)]">{link.desc}</p>
              </a>
            ))}
          </div>

          {/* Protocol modules — all 5 solutions + existing features */}
          <div>
            <p className="text-xs text-[var(--muted)] uppercase tracking-wide font-medium mb-3">
              Protocol Modules
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
              {PROTOCOL_MODULES.map((f) => (
                <div
                  key={f.label}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-sm">{f.icon}</span>
                    <p className="text-xs font-semibold text-[var(--accent)]">{f.label}</p>
                    {f.status === "New" && (
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200 font-bold uppercase">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-[var(--muted)] mt-1">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-[10px] text-[var(--muted)]">
        NL Graduation Project ·{" "}
        <a href="/docs/ARCHITECTURE.md" className="text-[var(--accent)] hover:underline">
          Architecture v2
        </a>{" "}
        ·{" "}
        <a href="/docs/PROBLEM_STATEMENT.md" className="text-[var(--accent)] hover:underline">
          Problem Statement
        </a>
      </footer>
    </div>
  );
}
