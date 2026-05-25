import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Perplexity Decision Brief Protocol (PDBP) | AI Judgment Infrastructure",
  description:
    "Research that resists false closure. PDBP replaces polished AI essays with judgment-ready Decision Briefs featuring Intent Contracts, Epistemic Forks, Calibrated Commits, Research Debt tracking, and Epistemic Fitness training.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
