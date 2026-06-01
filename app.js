// Mock Data (Ported from pdbp-data.ts)
const DEMO_QUERIES = [
    "What are the market size projections for AI search in 2026?",
    "Compare Perplexity vs ChatGPT for research workflows",
    "How should I prepare for a senior PM interview at a FAANG company?",
    "Latest FDA guidance on AI medical devices",
];

function buildMarketBrief() {
    return {
        stakes: "operational",
        sourcedFindings: [
            { text: "Multiple analyst reports cite ~$28.4B global AI search market size by 2026.", type: "factual", sources: [1] },
            { text: "North America ~42% share; Asia-Pacific ~31% (single report).", type: "factual", sources: [1] },
            { text: "Tow Center (2025) found material citation errors across AI search engines.", type: "factual", sources: [5] },
        ],
        inferredConclusions: [
            { text: "Enterprise adoption is the primary growth driver for 2026 projections.", type: "inferential", sources: [2, 3] },
            { text: "Citation-heavy search may reach 12-15% share by 2026.", type: "inferential", sources: [4] },
        ],
        verificationDuties: [
            { action: "Open [1] and confirm $28.4B includes the same market definition you use internally." },
            { action: "Cross-check CAGR with a second analyst before financial modeling." },
            { action: "Read [5] methodology before citing accuracy stats externally." }
        ],
        calibratedCommit: {
            claims: [
                { id: "bc1", text: "The $28.4B figure is reliable for board-level planning." },
                { id: "bc2", text: "Enterprise is definitively the primary growth driver." },
                { id: "bc3", text: "Citation-heavy products will capture 12-15% share." }
            ],
            reveals: [
                { id: "bc1", type: "factual", sources: [1], mismatch: "Single analyst source; market definition unverified for your context." },
                { id: "bc2", type: "inferential", sources: [2, 3], mismatch: "Inference, not direct quote. Consumer majority still cited in [1]." },
                { id: "bc3", type: "inferential", sources: [4], mismatch: "Forward projection from one source; high uncertainty." }
            ]
        }
    };
}

function buildFdaBrief() {
    return {
        stakes: "irreversible",
        sourcedFindings: [
            { text: "FDA regulates AI/ML devices under SaMD pathways; 950+ AI devices authorized (predominantly radiology/cardiology).", type: "factual", sources: [1, 2] },
            { text: "2025 PCCP final guidance allows pre-specified algorithm changes without new review if conditions met.", type: "factual", sources: [1] },
            { text: "FDA guidance is non-binding; statutory/regulatory requirements still govern.", type: "factual", sources: [1] },
        ],
        inferredConclusions: [
            { text: "Generative AI in clinical settings faces heightened human-in-the-loop expectations (2026 draft).", type: "inferential", sources: [3] }
        ],
        verificationDuties: [
            { action: "Regulatory affairs review of PCCP applicability to your change protocol." },
            { action: "Confirm draft gen-AI guidance [3] status (draft vs final)." }
        ],
        epistemicFork: {
            conservative: {
                title: "Conservative regulatory reading",
                summary: "Treat draft gen-AI guidance as early signal only. Plan De Novo or 510(k) with conservative clinical evidence and limit autonomous outputs."
            },
            expansive: {
                title: "Expansive regulatory reading",
                summary: "Leverage PCCP [1] for iterative ML updates and align with draft gen-AI transparency expectations to accelerate pathway."
            }
        },
        calibratedCommit: {
            claims: [
                { id: "bc1", text: "PCCP means we can ship algorithm updates without any FDA interaction." },
                { id: "bc2", text: "950+ approvals mean gen-AI clinical tools are proven safe." },
                { id: "bc3", text: "This brief is sufficient for regulatory sign-off." }
            ],
            reveals: [
                { id: "bc1", type: "factual", sources: [1], mismatch: "PCCP requires pre-specified change protocols; not blanket freedom." },
                { id: "bc2", type: "inferential", sources: [2], mismatch: "Prior devices are mostly narrow modalities; poor generalization." },
                { id: "bc3", type: "normative", sources: [1], mismatch: "Explicitly not legal advice; RA review required." }
            ]
        }
    };
}

const mockResponses = {
    market: {
        query: DEMO_QUERIES[0],
        sources: [
            { id: 1, title: "AI Search Market Report 2025-2030", domain: "marketsandmarkets.com", snippet: "$28.4B by 2026, 34.2% CAGR." },
            { id: 2, title: "Conversational Search Trends", domain: "gartner.com", snippet: "Enterprise adoption as growth driver." },
            { id: 3, title: "Enterprise AI Search Study", domain: "forrester.com", snippet: "Enterprise segment fastest growing." },
            { id: 4, title: "Competitive Landscape 2026", domain: "cbinsights.com", snippet: "12-15% share for citation-heavy search." },
            { id: 5, title: "Trust in AI Search", domain: "cjr.org", snippet: "Citation accuracy concerns." },
        ],
        brief: buildMarketBrief()
    },
    fda: {
        query: DEMO_QUERIES[3],
        sources: [
            { id: 1, title: "FDA AI/ML Guidance Hub", domain: "fda.gov", snippet: "SaMD and PCCP." },
            { id: 2, title: "AI Device Database", domain: "fda.gov", snippet: "950+ authorizations." },
            { id: 3, title: "Gen-AI Clinical Draft", domain: "fda.gov", snippet: "Human-in-the-loop." },
        ],
        brief: buildFdaBrief()
    }
};

// State
let currentQuery = "";
let currentData = null;
let currentContract = null;
let commitRatings = {};
let sourcesInspected = new Set();
let forkCompleted = false;
let commitCompleted = false;

// DOM Elements
const viewHome = document.getElementById('view-home');
const viewLoading = document.getElementById('view-loading');
const viewResults = document.getElementById('view-results');
const logoBtn = document.getElementById('logo-btn');
const headerSearchContainer = document.getElementById('header-search-container');
const homeSearchForm = document.getElementById('home-search-form');
const headerSearchForm = document.getElementById('header-search-form');
const homeSearchInput = document.getElementById('home-search-input');
const headerSearchInput = document.getElementById('header-search-input');
const demoQueriesContainer = document.getElementById('demo-queries-container');
const protocolModulesContainer = document.getElementById('protocol-modules-container');

// Modal Elements
const modalIntent = document.getElementById('modal-intent');
const intentForm = document.getElementById('intent-form');
const intentQueryInput = document.getElementById('intent-query');
const intentStakesSelect = document.getElementById('intent-stakes');
const btnCancelIntent = document.getElementById('btn-cancel-intent');

const modalCommit = document.getElementById('modal-commit');
const commitViewRate = document.getElementById('commit-view-rate');
const commitViewReveal = document.getElementById('commit-view-reveal');
const btnStartCommit = document.getElementById('btn-start-commit');
const btnCloseCommit = document.getElementById('btn-close-commit');
const btnSubmitRatings = document.getElementById('btn-submit-ratings');
const btnFinishCommit = document.getElementById('btn-finish-commit');
const badgeCommitDone = document.getElementById('badge-commit-done');

// Init
function init() {
    renderHome();
    setupEventListeners();
}

function renderHome() {
    // Populate demo queries
    demoQueriesContainer.innerHTML = DEMO_QUERIES.map(q => 
        `<button class="text-xs px-3 py-2 rounded-full border border-border bg-surface hover:border-accent hover:text-accent transition-colors demo-query-btn" data-query="${q}">${q}</button>`
    ).join('');

    // Protocol Modules
    const modules = [
        { label: "Intent Contract", desc: "Define decision, stakes, and good enough before retrieval", icon: "📋" },
        { label: "Decision Brief", desc: "Sourced / inferred / gaps / your duties", icon: "📄" },
        { label: "Epistemic Fork", desc: "Two honest readings from same sources", icon: "🔀" },
        { label: "Calibrated Commit", desc: "Rate claims blind, then compare to evidence", icon: "🎯" },
        { label: "Research Debt", desc: "Progress meter for your verification duties", icon: "📊" },
    ];

    protocolModulesContainer.innerHTML = modules.map(m => `
        <div class="rounded-xl border border-border bg-surface p-3">
            <div class="flex items-center gap-1.5 mb-1">
                <span class="text-sm">${m.icon}</span>
                <p class="text-xs font-semibold text-accent">${m.label}</p>
            </div>
            <p class="text-[10px] text-muted mt-1">${m.desc}</p>
        </div>
    `).join('');
}

function setupEventListeners() {
    // Search Submissions
    homeSearchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSearch(homeSearchInput.value);
    });

    headerSearchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSearch(headerSearchInput.value);
    });

    // Demo Queries
    demoQueriesContainer.addEventListener('click', (e) => {
        if(e.target.classList.contains('demo-query-btn')) {
            handleSearch(e.target.dataset.query);
        }
    });

    // Logo Click (Go Home)
    logoBtn.addEventListener('click', () => {
        showView('home');
    });

    // Intent Contract
    intentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        currentContract = {
            decision: document.getElementById('intent-decision').value,
            stakes: intentStakesSelect.value,
            goodEnough: document.getElementById('intent-goodenough').value
        };
        modalIntent.classList.add('hidden');
        renderResults();
    });

    btnCancelIntent.addEventListener('click', () => {
        modalIntent.classList.add('hidden');
        showView('home');
    });

    // Commit Gate
    btnStartCommit.addEventListener('click', () => {
        modalCommit.classList.remove('hidden');
        commitViewRate.classList.remove('hidden');
        commitViewReveal.classList.add('hidden');
        renderCommitRatings();
    });

    btnCloseCommit.addEventListener('click', () => modalCommit.classList.add('hidden'));
    
    btnSubmitRatings.addEventListener('click', () => {
        commitViewRate.classList.add('hidden');
        commitViewReveal.classList.remove('hidden');
        renderCommitReveals();
    });

    btnFinishCommit.addEventListener('click', () => {
        modalCommit.classList.add('hidden');
        commitCompleted = true;
        btnStartCommit.classList.add('hidden');
        badgeCommitDone.classList.remove('hidden');
        updateDebtMeter();
    });

    // Fork Selection
    document.querySelectorAll('.fork-option').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.fork-option').forEach(b => b.classList.remove('border-accent', 'bg-accent-soft', 'border-violet-300', 'bg-violet-50'));
            
            if(btn.dataset.fork === 'conservative') {
                btn.classList.add('border-accent', 'bg-accent-soft');
            } else {
                btn.classList.add('border-violet-300', 'bg-violet-50');
            }
            
            forkCompleted = true;
            document.getElementById('fork-warning').classList.add('hidden');
            document.getElementById('brief-content').classList.remove('hidden', 'opacity-50', 'pointer-events-none');
            updateDebtMeter();
        });
    });
}

function handleSearch(query) {
    if(!query.trim()) return;
    
    currentQuery = query;
    headerSearchInput.value = query;
    
    // Select mock data
    const isFda = query.toLowerCase().includes('fda') || query.toLowerCase().includes('medical');
    currentData = isFda ? mockResponses.fda : mockResponses.market;
    
    // Reset state
    currentContract = null;
    commitRatings = {};
    sourcesInspected.clear();
    forkCompleted = false;
    commitCompleted = false;
    btnStartCommit.classList.remove('hidden');
    badgeCommitDone.classList.add('hidden');
    
    // Simulate Loading
    showView('loading');
    
    setTimeout(() => {
        // Show Intent Contract Modal
        intentQueryInput.value = currentQuery;
        // Default values based on mock
        document.getElementById('intent-decision').value = `Inform research and next steps for: ${currentQuery}`;
        intentStakesSelect.value = currentData.brief.stakes;
        document.getElementById('intent-goodenough').value = "I can explain key claims, gaps, and what I still need to verify.";
        
        modalIntent.classList.remove('hidden');
    }, 1500);
}

function renderResults() {
    showView('results');
    
    document.getElementById('results-query-title').textContent = currentQuery;
    document.getElementById('results-meta').textContent = `${currentData.sources.length} sources · Anti-closure format`;

    const isIrreversible = currentContract.stakes === 'irreversible';
    
    // Warnings and Fork setup
    if(isIrreversible) {
        document.getElementById('irreversible-warning').classList.remove('hidden');
        
        if(currentData.brief.epistemicFork) {
            document.getElementById('fork-container').classList.remove('hidden');
            document.getElementById('fork-warning').classList.remove('hidden');
            
            // Set fork text
            document.getElementById('fork-cons-title').textContent = currentData.brief.epistemicFork.conservative.title;
            document.getElementById('fork-cons-summary').textContent = currentData.brief.epistemicFork.conservative.summary;
            document.getElementById('fork-exp-title').textContent = currentData.brief.epistemicFork.expansive.title;
            document.getElementById('fork-exp-summary').textContent = currentData.brief.epistemicFork.expansive.summary;
            
            // Hide brief content until fork is resolved
            document.getElementById('brief-content').classList.add('opacity-50', 'pointer-events-none');
            // reset fork buttons
            document.querySelectorAll('.fork-option').forEach(b => b.classList.remove('border-accent', 'bg-accent-soft', 'border-violet-300', 'bg-violet-50'));
        }
    } else {
        document.getElementById('irreversible-warning').classList.add('hidden');
        document.getElementById('fork-container').classList.add('hidden');
        document.getElementById('fork-warning').classList.add('hidden');
        document.getElementById('brief-content').classList.remove('hidden', 'opacity-50', 'pointer-events-none');
        forkCompleted = true; // Not required
    }

    // Render Brief Sections
    const formatClaim = (c) => `<div class="text-sm text-foreground">
        • ${c.text} 
        ${c.sources.map(s => `<span class="cursor-pointer text-accent hover:underline text-xs" onclick="inspectSource(${s})">[${s}]</span>`).join('')}
    </div>`;

    document.getElementById('brief-findings').innerHTML = currentData.brief.sourcedFindings.map(formatClaim).join('');
    document.getElementById('brief-inferences').innerHTML = currentData.brief.inferredConclusions.map(formatClaim).join('');
    
    document.getElementById('brief-duties').innerHTML = currentData.brief.verificationDuties.map((d, i) => `
        <div class="flex gap-3 text-sm p-3 rounded-lg bg-surface border border-amber-200">
            <input type="checkbox" class="mt-1" onchange="updateDebtMeter()">
            <div><span class="font-semibold text-amber-800">Task ${i+1}:</span> ${d.action}</div>
        </div>
    `).join('');

    // Render Sources sidebar
    document.getElementById('sources-list').innerHTML = currentData.sources.map(s => `
        <div id="source-${s.id}" class="border rounded-lg p-3 bg-surface transition-all">
            <div class="flex justify-between items-start mb-1">
                <span class="text-xs font-semibold text-accent">[${s.id}]</span>
                <span class="text-[10px] text-muted">${s.domain}</span>
            </div>
            <p class="text-sm font-medium text-foreground">${s.title}</p>
            <p class="text-xs text-muted mt-1">"${s.snippet}"</p>
        </div>
    `).join('');

    updateDebtMeter();
}

function showView(viewName) {
    viewHome.classList.add('hidden');
    viewLoading.classList.add('hidden');
    viewResults.classList.add('hidden');
    
    if(viewName === 'home') {
        viewHome.classList.remove('hidden');
        headerSearchContainer.classList.add('hidden');
    } else if(viewName === 'loading') {
        viewLoading.classList.remove('hidden');
        headerSearchContainer.classList.add('hidden');
    } else if(viewName === 'results') {
        viewResults.classList.remove('hidden');
        headerSearchContainer.classList.remove('hidden');
    }
}

// Global function for inline onclick
window.inspectSource = function(id) {
    sourcesInspected.add(id);
    document.querySelectorAll('[id^="source-"]').forEach(el => el.classList.remove('border-accent', 'shadow-md'));
    const sourceEl = document.getElementById(`source-${id}`);
    if(sourceEl) {
        sourceEl.classList.add('border-accent', 'shadow-md');
        sourceEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    updateDebtMeter();
};

function updateDebtMeter() {
    if(!currentData) return;
    
    // Sources inspected
    const totalSources = currentData.sources.length;
    const inspectedCount = sourcesInspected.size;
    document.getElementById('metric-sources').textContent = `${inspectedCount} / ${totalSources}`;
    document.getElementById('bar-sources').style.width = `${(inspectedCount / totalSources) * 100}%`;

    // Commit Gate
    const needsFork = currentContract?.stakes === 'irreversible' && currentData.brief.epistemicFork;
    const requiredSteps = 1 + (needsFork ? 1 : 0);
    const completedSteps = (commitCompleted ? 1 : 0) + (needsFork && forkCompleted ? 1 : 0);
    
    document.getElementById('metric-commit').textContent = completedSteps === requiredSteps ? 'Complete' : 'Pending';
    document.getElementById('bar-commit').style.width = `${(completedSteps / requiredSteps) * 100}%`;
    if(completedSteps === requiredSteps) {
        document.getElementById('bar-commit').classList.replace('bg-amber-500', 'bg-emerald-500');
    } else {
        document.getElementById('bar-commit').classList.replace('bg-emerald-500', 'bg-amber-500');
    }
}

// Commit Ratings Modal Logic
function renderCommitRatings() {
    const claims = currentData.brief.calibratedCommit.claims;
    const container = document.getElementById('commit-claims-container');
    
    container.innerHTML = claims.map(c => `
        <div class="p-4 border rounded-xl">
            <p class="text-sm font-medium mb-3">${c.text}</p>
            <div class="flex gap-2 justify-between max-w-sm">
                ${[1,2,3,4,5].map(rating => `
                    <button class="w-10 h-10 rounded-full border border-border bg-surface hover:border-accent text-sm font-semibold transition-all commit-rate-btn" 
                            data-id="${c.id}" data-rating="${rating}">
                        ${rating}
                    </button>
                `).join('')}
            </div>
            <div class="flex justify-between text-[10px] text-muted mt-1 max-w-sm">
                <span>Guess</span>
                <span>Certain</span>
            </div>
        </div>
    `).join('');

    // Attach listeners
    document.querySelectorAll('.commit-rate-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const rating = e.target.dataset.rating;
            commitRatings[id] = rating;
            
            // update UI
            e.target.parentElement.querySelectorAll('.commit-rate-btn').forEach(b => {
                b.classList.remove('bg-accent', 'text-white', 'border-accent');
            });
            e.target.classList.add('bg-accent', 'text-white', 'border-accent');
            
            // check if all rated
            if(Object.keys(commitRatings).length === claims.length) {
                btnSubmitRatings.disabled = false;
            }
        });
    });
}

function renderCommitReveals() {
    const reveals = currentData.brief.calibratedCommit.reveals;
    const claims = currentData.brief.calibratedCommit.claims;
    const container = document.getElementById('commit-reveal-container');

    container.innerHTML = claims.map(c => {
        const r = reveals.find(rev => rev.id === c.id);
        const userRating = commitRatings[c.id];
        const isOverconfident = userRating >= 4 && (r.type === 'inferential' || r.type === 'normative');
        
        let typeBadge = '';
        if(r.type === 'factual') typeBadge = '<span class="badge-emerald px-2 py-0.5 rounded text-[10px] font-bold uppercase">Factual</span>';
        if(r.type === 'inferential') typeBadge = '<span class="badge-amber px-2 py-0.5 rounded text-[10px] font-bold uppercase">Inferential</span>';
        if(r.type === 'normative') typeBadge = '<span class="badge-violet px-2 py-0.5 rounded text-[10px] font-bold uppercase">Normative</span>';

        return `
        <div class="p-4 border rounded-xl ${isOverconfident ? 'border-amber-300 bg-amber-50' : 'bg-surface'}">
            <div class="flex justify-between items-start gap-4 mb-2">
                <p class="text-sm font-medium">${c.text}</p>
                <div class="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-border bg-background text-sm font-bold">
                    ${userRating}
                </div>
            </div>
            
            <div class="flex flex-wrap items-center gap-2 mb-3 mt-3">
                ${typeBadge}
                <span class="px-2 py-0.5 border border-border rounded bg-background text-[10px] text-muted">Sources: [${r.sources.join(',')}]</span>
                ${isOverconfident ? '<span class="px-2 py-0.5 border border-amber-300 bg-amber-200 text-amber-900 rounded text-[10px] font-bold uppercase">⚠ Overconfident</span>' : ''}
            </div>
            
            <div class="text-sm text-foreground bg-background border border-border p-3 rounded-lg">
                <strong>Evidence check:</strong> ${r.mismatch}
            </div>
        </div>
    `}).join('');
}

// Start
init();
