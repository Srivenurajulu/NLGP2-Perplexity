const CHALLENGE_BANK = [
    {
      id: "ct-1",
      type: "claim-type",
      prompt: '"Enterprise adoption is the primary growth driver for AI search market projections in 2026."',
      options: ["Factual — directly supported by a source", "Inferential — synthesized across sources", "Normative — a value judgment or recommendation"],
      correctIndex: 1,
      explanation: "This is an inference. Two analyst reports emphasize enterprise velocity, but the claim combines their findings into a broader conclusion not directly stated in any single source.",
      difficulty: "medium",
    },
    {
      id: "ct-2",
      type: "claim-type",
      prompt: '"The global AI search market is projected to reach $28.4B by 2026."',
      options: ["Factual — directly supported by a source", "Inferential — synthesized across sources", "Normative — a value judgment or recommendation"],
      correctIndex: 0,
      explanation: "This is factual — it directly cites a specific figure from an analyst report. The number can be traced to a single named source.",
      difficulty: "easy",
    },
    {
      id: "conf-1",
      type: "confidence",
      prompt: "An AI search engine cites 21 sources for a market size estimate. All 21 sources are from the same research firm. How should you calibrate your confidence?",
      options: [
        "High confidence — 21 sources is strong evidence",
        "Moderate confidence — many sources, but check independence",
        "Low confidence — source diversity matters more than count",
      ],
      correctIndex: 2,
      explanation: "Citation count without source diversity is misleading. 21 citations from the same firm is effectively one source. This is a common calibration trap in AI search.",
      difficulty: "medium",
    },
    {
      id: "gap-1",
      type: "gap-detection",
      prompt: "You asked an AI: 'Should I invest in Company X?' The AI responded with revenue growth, market position, and analyst ratings. What critical gap should you flag?",
      options: [
        "The response didn't mention the company's founding year",
        "The response didn't address risks, competitive threats, or your risk tolerance",
        "The response didn't include the CEO's biography",
      ],
      correctIndex: 1,
      explanation: "An investment decision brief that only covers upside without risks, competitive position, or your personal risk tolerance is structurally incomplete. These are decision-critical gaps.",
      difficulty: "easy",
    },
    {
      id: "se-1",
      type: "source-eval",
      prompt: "An AI search result cites 'fda.gov' for the claim that a specific AI device pathway is approved. The citation links to a general FAQ page. How should you evaluate this?",
      options: [
        "Strong evidence — fda.gov is an authoritative domain",
        "Weak evidence — the domain is authoritative but a FAQ page may not support the specific claim",
        "No evidence — government websites are unreliable",
      ],
      correctIndex: 1,
      explanation: "Domain authority ≠ claim support. The source domain (fda.gov) is authoritative, but a general FAQ page may not contain the specific regulatory detail being claimed. The citation needs inspection, not just domain trust.",
      difficulty: "medium",
    }
];

let stats = {
    totalAttempted: 0,
    totalCorrect: 0,
    streak: 0,
    bestStreak: 0,
    sessions: 0
};

let currentSession = [];
let currentIndex = 0;
let sessionCorrect = 0;
let hasAnsweredCurrent = false;

// DOM Elements
const viewDashboard = document.getElementById('view-dashboard');
const viewSession = document.getElementById('view-session');
const viewComplete = document.getElementById('view-complete');

// Stats Elements
const statAccuracy = document.getElementById('stat-accuracy');
const statCorrect = document.getElementById('stat-correct');
const statStreak = document.getElementById('stat-streak');
const statBestStreak = document.getElementById('stat-best-streak');
const statSessions = document.getElementById('stat-sessions');
const statLevel = document.getElementById('stat-level');
const statLevelSub = document.getElementById('stat-level-sub');

// Session Elements
const challengeBadge = document.getElementById('challenge-badge');
const challengeDiff = document.getElementById('challenge-diff');
const challengeProgress = document.getElementById('challenge-progress');
const progressDots = document.getElementById('progress-dots');
const challengePrompt = document.getElementById('challenge-prompt');
const challengeOptions = document.getElementById('challenge-options');
const challengeExplanation = document.getElementById('challenge-explanation');
const explTitle = document.getElementById('expl-title');
const explText = document.getElementById('expl-text');

// Buttons
const btnStart = document.getElementById('btn-start');
const btnNext = document.getElementById('btn-next');
const btnPracticeAgain = document.getElementById('btn-practice-again');

function init() {
    loadStats();
    updateDashboard();
    
    btnStart.addEventListener('click', startSession);
    btnNext.addEventListener('click', nextChallenge);
    btnPracticeAgain.addEventListener('click', startSession);
}

function loadStats() {
    const saved = localStorage.getItem('pdbp-fitness-stats');
    if(saved) {
        try {
            stats = JSON.parse(saved);
        } catch(e) {}
    }
}

function saveStats() {
    localStorage.setItem('pdbp-fitness-stats', JSON.stringify(stats));
}

function updateDashboard() {
    const accuracy = stats.totalAttempted > 0 ? Math.round((stats.totalCorrect / stats.totalAttempted) * 100) : 0;
    statAccuracy.textContent = `${accuracy}%`;
    statCorrect.textContent = `${stats.totalCorrect}/${stats.totalAttempted} correct`;
    statStreak.textContent = stats.streak;
    statBestStreak.textContent = `Best: ${stats.bestStreak} days`;
    statSessions.textContent = stats.sessions;
    
    if(accuracy >= 80) { statLevel.textContent = "Expert"; statLevelSub.textContent = "Top calibration"; }
    else if(accuracy >= 60) { statLevel.textContent = "Proficient"; statLevelSub.textContent = "Keep practicing"; }
    else if(accuracy >= 40) { statLevel.textContent = "Developing"; statLevelSub.textContent = "Keep practicing"; }
    else { statLevel.textContent = "Beginner"; statLevelSub.textContent = "Keep practicing"; }
}

function startSession() {
    // Shuffle and pick 5 (or max available)
    currentSession = [...CHALLENGE_BANK].sort(() => 0.5 - Math.random()).slice(0, 5);
    currentIndex = 0;
    sessionCorrect = 0;
    
    viewDashboard.classList.add('hidden');
    viewComplete.classList.add('hidden');
    viewSession.classList.remove('hidden');
    
    renderChallenge();
}

function renderChallenge() {
    hasAnsweredCurrent = false;
    challengeExplanation.classList.add('hidden');
    
    const q = currentSession[currentIndex];
    
    // Header
    const typeLabel = q.type.split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
    challengeBadge.textContent = typeLabel;
    
    // Set badge color class based on type
    challengeBadge.className = "text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide border ";
    if(q.type === 'claim-type') challengeBadge.className += 'badge-emerald';
    else if(q.type === 'confidence') challengeBadge.className += 'badge-amber';
    else if(q.type === 'gap-detection') challengeBadge.className += 'badge-red';
    else challengeBadge.className += 'badge-violet';

    challengeDiff.textContent = q.difficulty;
    challengeProgress.textContent = `${currentIndex + 1} / ${currentSession.length}`;
    
    // Progress dots
    progressDots.innerHTML = currentSession.map((_, i) => `
        <div class="h-1.5 flex-1 rounded-full transition-colors ${i < currentIndex ? 'bg-accent' : i === currentIndex ? 'bg-accent opacity-50' : 'bg-surface border border-border'}"></div>
    `).join('');
    
    // Question
    challengePrompt.textContent = q.prompt;
    
    // Options
    challengeOptions.innerHTML = q.options.map((opt, i) => `
        <button class="w-full text-left rounded-xl border border-border p-4 hover:border-accent transition-all option-btn bg-surface" data-index="${i}">
            <div class="flex items-start gap-4">
                <span class="shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center text-xs font-bold text-muted bg-background">
                    ${String.fromCharCode(65 + i)}
                </span>
                <span class="text-base text-foreground mt-1">${opt}</span>
            </div>
        </button>
    `).join('');
    
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if(hasAnsweredCurrent) return;
            hasAnsweredCurrent = true;
            
            const selectedIdx = parseInt(e.currentTarget.dataset.index);
            const isCorrect = selectedIdx === q.correctIndex;
            
            if(isCorrect) sessionCorrect++;
            
            // UI Feedback
            e.currentTarget.classList.add('border-accent', 'bg-accent-soft');
            if(!isCorrect) {
                e.currentTarget.classList.replace('border-accent', 'border-red-400');
                e.currentTarget.classList.replace('bg-accent-soft', 'bg-red-50');
            }
            
            // Highlight correct one if wrong
            if(!isCorrect) {
                const correctBtn = document.querySelector(`.option-btn[data-index="${q.correctIndex}"]`);
                correctBtn.classList.add('border-emerald-400', 'bg-emerald-50');
            }
            
            // Show Explanation
            explTitle.textContent = isCorrect ? "✓ Correct" : "✗ Not quite";
            explTitle.className = `text-sm font-semibold mb-2 ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`;
            explText.textContent = q.explanation;
            challengeExplanation.classList.remove('hidden');
            
            // Update button text if last
            if(currentIndex === currentSession.length - 1) {
                btnNext.textContent = "Complete Session";
            } else {
                btnNext.textContent = "Next Challenge";
            }
        });
    });
}

function nextChallenge() {
    currentIndex++;
    if(currentIndex >= currentSession.length) {
        finishSession();
    } else {
        renderChallenge();
    }
}

function finishSession() {
    stats.totalAttempted += currentSession.length;
    stats.totalCorrect += sessionCorrect;
    stats.sessions += 1;
    stats.streak += 1;
    if(stats.streak > stats.bestStreak) stats.bestStreak = stats.streak;
    
    saveStats();
    updateDashboard();
    
    viewSession.classList.add('hidden');
    viewComplete.classList.remove('hidden');
    
    const pct = Math.round((sessionCorrect / currentSession.length) * 100);
    document.getElementById('result-score').textContent = `${sessionCorrect}/${currentSession.length}`;
    document.getElementById('result-pct').textContent = `${pct}% accuracy`;
}

init();
