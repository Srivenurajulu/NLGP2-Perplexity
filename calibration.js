const DEMO_HISTORY = [
    {
      id: "s1",
      date: "2026-05-18",
      query: "AI search market size projections",
      claims: [
        { text: "$28.4B figure is reliable for board-level planning", userRating: 5, actualType: "factual", sourceStrength: "weak", wasOverconfident: true, wasUnderconfident: false },
        { text: "Enterprise is definitively the primary growth driver", userRating: 4, actualType: "inferential", sourceStrength: "moderate", wasOverconfident: true, wasUnderconfident: false },
        { text: "Citation-heavy products will capture 12-15% share", userRating: 3, actualType: "inferential", sourceStrength: "weak", wasOverconfident: false, wasUnderconfident: false },
      ],
      overallDelta: 1.3,
    },
    {
      id: "s2",
      date: "2026-05-19",
      query: "Perplexity vs ChatGPT comparison",
      claims: [
        { text: "More citations means more trustworthy output", userRating: 4, actualType: "inferential", sourceStrength: "weak", wasOverconfident: true, wasUnderconfident: false },
        { text: "Perplexity Pro is more accurate than free tier", userRating: 5, actualType: "factual", sourceStrength: "weak", wasOverconfident: true, wasUnderconfident: false },
        { text: "ChatGPT cannot support serious research", userRating: 2, actualType: "normative", sourceStrength: "moderate", wasOverconfident: false, wasUnderconfident: false },
      ],
      overallDelta: 1.7,
    },
    {
      id: "s3",
      date: "2026-05-20",
      query: "FDA AI medical device guidance",
      claims: [
        { text: "PCCP means we can ship updates without FDA interaction", userRating: 3, actualType: "factual", sourceStrength: "moderate", wasOverconfident: true, wasUnderconfident: false },
        { text: "950+ approvals mean gen-AI clinical tools are proven safe", userRating: 2, actualType: "inferential", sourceStrength: "weak", wasOverconfident: false, wasUnderconfident: false },
        { text: "This brief is sufficient for regulatory sign-off", userRating: 1, actualType: "normative", sourceStrength: "weak", wasOverconfident: false, wasUnderconfident: false },
      ],
      overallDelta: 0.3,
    },
    {
      id: "s4",
      date: "2026-05-21",
      query: "Senior PM interview preparation",
      claims: [
        { text: "Product sense is ~40% of loop weight at all FAANG companies", userRating: 3, actualType: "inferential", sourceStrength: "moderate", wasOverconfident: false, wasUnderconfident: false },
        { text: "4-6 weeks prep is sufficient for any senior candidate", userRating: 4, actualType: "inferential", sourceStrength: "weak", wasOverconfident: true, wasUnderconfident: false },
        { text: "Tailoring stories to culture principles is always authentic", userRating: 2, actualType: "normative", sourceStrength: "moderate", wasOverconfident: false, wasUnderconfident: true },
      ],
      overallDelta: 0.7,
    },
    {
      id: "s5",
      date: "2026-05-22",
      query: "AI search competitive analysis",
      claims: [
        { text: "Market is winner-take-all in AI search", userRating: 3, actualType: "normative", sourceStrength: "weak", wasOverconfident: false, wasUnderconfident: false },
        { text: "Enterprise segment will drive 60% of revenue", userRating: 2, actualType: "inferential", sourceStrength: "moderate", wasOverconfident: false, wasUnderconfident: true },
        { text: "Citation accuracy is improving across all platforms", userRating: 4, actualType: "factual", sourceStrength: "weak", wasOverconfident: true, wasUnderconfident: false },
      ],
      overallDelta: 0.3,
    },
    {
      id: "s6",
      date: "2026-05-23",
      query: "Remote work productivity data",
      claims: [
        { text: "Remote workers are 15% more productive", userRating: 2, actualType: "factual", sourceStrength: "weak", wasOverconfident: false, wasUnderconfident: false },
        { text: "Hybrid is optimal for most knowledge workers", userRating: 3, actualType: "normative", sourceStrength: "moderate", wasOverconfident: false, wasUnderconfident: false },
        { text: "Productivity gains persist beyond initial novelty", userRating: 2, actualType: "inferential", sourceStrength: "weak", wasOverconfident: false, wasUnderconfident: false },
      ],
      overallDelta: -0.3,
    },
];

function init() {
    renderDashboard();
}

function renderDashboard() {
    let totalDelta = 0;
    let overCount = 0;
    let totalClaims = 0;

    DEMO_HISTORY.forEach(session => {
        totalDelta += session.overallDelta;
        session.claims.forEach(c => {
            totalClaims++;
            if(c.wasOverconfident) overCount++;
        });
    });

    const avgDelta = totalDelta / DEMO_HISTORY.length;
    
    // Update KPI cards
    const deltaEl = document.getElementById('kpi-delta');
    deltaEl.textContent = (avgDelta > 0 ? "+" : "") + avgDelta.toFixed(1);
    if(avgDelta > 0.5) deltaEl.classList.add('text-amber-500');
    else if(avgDelta < -0.5) deltaEl.classList.add('text-blue-500');
    else deltaEl.classList.add('text-emerald-500');

    document.getElementById('kpi-delta-sub').textContent = avgDelta > 0.5 ? "Overconfident trend" : avgDelta < -0.5 ? "Underconfident trend" : "Well calibrated";

    document.getElementById('kpi-over-pct').textContent = Math.round((overCount / totalClaims) * 100) + "%";
    document.getElementById('kpi-over-sub').textContent = `${overCount}/${totalClaims} total`;
    document.getElementById('kpi-sessions').textContent = DEMO_HISTORY.length;

    // Trend calculation
    const last3 = DEMO_HISTORY.slice(-3);
    const trendImproving = last3[2].overallDelta < last3[0].overallDelta;
    const trendEl = document.getElementById('kpi-trend');
    if(trendImproving) {
        trendEl.textContent = "↓ Improving";
        trendEl.classList.add('text-emerald-500');
    } else {
        trendEl.classList.add('text-amber-500');
    }

    if(avgDelta > 0.3) {
        document.getElementById('insight-warning').classList.remove('hidden');
    }

    renderChart();
}

function renderChart() {
    const container = document.getElementById('chart-bars');
    const maxDelta = 2; // Absolute max for scaling

    container.innerHTML = DEMO_HISTORY.map((d, i) => {
        const normalized = Math.max(-maxDelta, Math.min(maxDelta, d.overallDelta));
        const pctFromCenter = (normalized / maxDelta) * 50;
        const isOver = d.overallDelta > 0;
        
        const top = isOver ? `${50 - Math.abs(pctFromCenter)}%` : "50%";
        const height = `${Math.abs(pctFromCenter)}%`;
        const colorClass = isOver ? 'bg-amber-400' : 'bg-blue-400';

        return `
            <div class="flex-1 flex flex-col items-center justify-center h-full relative cursor-pointer chart-bar" data-index="${i}">
                <div class="w-full rounded transition-all opacity-80 hover:opacity-100 ${colorClass}" style="position: absolute; top: ${top}; height: ${height};"></div>
                <span class="absolute bottom-[-20px] text-[10px] text-muted">${d.date.slice(5)}</span>
            </div>
        `;
    }).join('');

    document.querySelectorAll('.chart-bar').forEach(bar => {
        bar.addEventListener('click', (e) => {
            const idx = e.currentTarget.dataset.index;
            showSessionDetail(DEMO_HISTORY[idx]);
        });
    });
}

function showSessionDetail(session) {
    const detailView = document.getElementById('session-detail');
    detailView.classList.remove('hidden');
    
    document.getElementById('detail-title').textContent = session.query;
    document.getElementById('detail-date').textContent = session.date;
    
    const deltaEl = document.getElementById('detail-delta');
    deltaEl.textContent = (session.overallDelta > 0 ? "+" : "") + session.overallDelta.toFixed(1);
    if(session.overallDelta > 0.5) deltaEl.className = "text-amber-600";
    else deltaEl.className = "text-emerald-600";

    const claimsContainer = document.getElementById('detail-claims');
    claimsContainer.innerHTML = session.claims.map(c => {
        const bgClass = c.wasOverconfident ? 'bg-amber-50 border-amber-300' : c.wasUnderconfident ? 'bg-blue-50 border-blue-300' : 'bg-surface border-border';
        
        let typeBadge = '';
        if(c.actualType === 'factual') typeBadge = '<span class="badge-emerald px-2 py-0.5 rounded text-[10px] font-bold uppercase">Factual</span>';
        if(c.actualType === 'inferential') typeBadge = '<span class="badge-amber px-2 py-0.5 rounded text-[10px] font-bold uppercase">Inferential</span>';
        if(c.actualType === 'normative') typeBadge = '<span class="badge-violet px-2 py-0.5 rounded text-[10px] font-bold uppercase">Normative</span>';

        return `
            <div class="p-4 rounded-xl border ${bgClass}">
                <p class="text-sm font-medium mb-3">${c.text}</p>
                <div class="flex flex-wrap gap-2 text-[10px]">
                    <span class="px-2 py-0.5 rounded border border-border bg-background font-medium">Your rating: ${c.userRating}/5</span>
                    ${typeBadge}
                    <span class="px-2 py-0.5 rounded border border-border bg-background text-muted">${c.sourceStrength} sources</span>
                    ${c.wasOverconfident ? '<span class="px-2 py-0.5 rounded border border-amber-300 bg-amber-200 text-amber-900 font-bold uppercase">⚠ Overconfident</span>' : ''}
                    ${c.wasUnderconfident ? '<span class="px-2 py-0.5 rounded border border-blue-300 bg-blue-200 text-blue-900 font-bold uppercase">↑ Underconfident</span>' : ''}
                </div>
            </div>
        `;
    }).join('');

    // Scroll to it
    detailView.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

document.getElementById('btn-close-detail').addEventListener('click', () => {
    document.getElementById('session-detail').classList.add('hidden');
});

init();
