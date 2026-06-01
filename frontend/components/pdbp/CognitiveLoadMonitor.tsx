"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export type LoadLevel = "low" | "medium" | "high";

interface CognitiveLoadMonitorProps {
  children: (loadLevel: LoadLevel) => React.ReactNode;
  onLoadChange?: (level: LoadLevel) => void;
}

/**
 * Cognitive Load Adaptive Interface
 *
 * Measures proxy signals for cognitive load:
 * - Scroll velocity (fast scrolling = skimming = high load)
 * - Hover dwell time on elements (long dwells = processing difficulty)
 * - Tab visibility changes (frequent tab-switching = comparison behavior)
 * - Time between interactions (long pauses = processing or confusion)
 *
 * Adapts information density based on inferred cognitive state.
 */
export default function CognitiveLoadMonitor({
  children,
  onLoadChange,
}: CognitiveLoadMonitorProps) {
  const [loadLevel, setLoadLevel] = useState<LoadLevel>("medium");
  const scrollVelocities = useRef<number[]>([]);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);
  const tabSwitchCount = useRef(0);
  const lastInteraction = useRef(0);
  const interactionGaps = useRef<number[]>([]);

  useEffect(() => {
    lastScrollTime.current = Date.now();
    lastInteraction.current = Date.now();
  }, []);

  const updateLoad = useCallback(() => {
    // Scroll velocity analysis — last 10 readings
    const avgScrollVelocity =
      scrollVelocities.current.length > 0
        ? scrollVelocities.current.reduce((a, b) => a + b, 0) /
          scrollVelocities.current.length
        : 0;

    // Interaction gap analysis
    const avgGap =
      interactionGaps.current.length > 0
        ? interactionGaps.current.reduce((a, b) => a + b, 0) /
          interactionGaps.current.length
        : 2000;

    // Composite score (0 = low load, 1 = high load)
    let score = 0;

    // Fast scrolling suggests skimming (high load or disengagement)
    if (avgScrollVelocity > 800) score += 0.4;
    else if (avgScrollVelocity > 400) score += 0.2;

    // Frequent tab switching suggests comparison/confusion
    if (tabSwitchCount.current > 3) score += 0.3;
    else if (tabSwitchCount.current > 1) score += 0.15;

    // Long interaction gaps suggest deep processing or confusion
    if (avgGap > 8000) score += 0.3;
    else if (avgGap > 4000) score += 0.15;

    let newLevel: LoadLevel;
    if (score >= 0.5) newLevel = "high";
    else if (score >= 0.25) newLevel = "medium";
    else newLevel = "low";

    setLoadLevel((prev) => {
      if (prev !== newLevel) {
        onLoadChange?.(newLevel);
      }
      return newLevel;
    });
  }, [onLoadChange]);

  useEffect(() => {
    function handleScroll() {
      const now = Date.now();
      const dt = now - lastScrollTime.current;
      if (dt > 0) {
        const velocity = Math.abs(window.scrollY - lastScrollY.current) / (dt / 1000);
        scrollVelocities.current.push(velocity);
        if (scrollVelocities.current.length > 10)
          scrollVelocities.current.shift();
      }
      lastScrollY.current = window.scrollY;
      lastScrollTime.current = now;

      const gap = now - lastInteraction.current;
      interactionGaps.current.push(gap);
      if (interactionGaps.current.length > 10)
        interactionGaps.current.shift();
      lastInteraction.current = now;
    }

    function handleVisibility() {
      if (document.hidden) {
        tabSwitchCount.current += 1;
      }
    }

    function handleClick() {
      const now = Date.now();
      const gap = now - lastInteraction.current;
      interactionGaps.current.push(gap);
      if (interactionGaps.current.length > 10)
        interactionGaps.current.shift();
      lastInteraction.current = now;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("click", handleClick);

    const interval = setInterval(updateLoad, 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("click", handleClick);
      clearInterval(interval);
    };
  }, [updateLoad]);

  return <>{children(loadLevel)}</>;
}

/**
 * Adaptive content wrapper — shows different levels of detail
 * based on the current cognitive load level.
 */
export function AdaptiveContent({
  loadLevel,
  full,
  condensed,
  minimal,
}: {
  loadLevel: LoadLevel;
  full: React.ReactNode;
  condensed: React.ReactNode;
  minimal: React.ReactNode;
}) {
  return (
    <div className="transition-all duration-500 ease-in-out">
      {loadLevel === "low" && full}
      {loadLevel === "medium" && condensed}
      {loadLevel === "high" && minimal}
    </div>
  );
}

/**
 * Load level indicator badge — shows current cognitive load state.
 */
export function LoadLevelBadge({ level }: { level: LoadLevel }) {
  const config = {
    low: {
      label: "Full detail",
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: "📊",
    },
    medium: {
      label: "Standard view",
      color: "bg-amber-100 text-amber-800 border-amber-200",
      icon: "📋",
    },
    high: {
      label: "Key claims only",
      color: "bg-red-100 text-red-800 border-red-200",
      icon: "🎯",
    },
  };

  const c = config[level];

  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${c.color}`}
    >
      <span>{c.icon}</span>
      {c.label}
    </span>
  );
}
