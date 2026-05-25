import { DecisionBrief, SearchResponse, StakesLevel } from "../types";

export const DEMO_QUERIES = [
  "What are the market size projections for AI search in 2026?",
  "Compare Perplexity vs ChatGPT for research workflows",
  "How should I prepare for a senior PM interview at a FAANG company?",
  "Latest FDA guidance on AI medical devices",
];

function defaultContract(
  query: string,
  stakes: StakesLevel
): DecisionBrief["intentContract"] {
  return {
    decision: `Inform research and next steps for: ${query}`,
    stakes,
    goodEnough: "I can explain key claims, gaps, and what I still need to verify before acting.",
    deadline: "This week",
  };
}

export function buildMarketBrief(): DecisionBrief {
  return {
    intentContract: defaultContract(DEMO_QUERIES[0], "operational"),
    sourcedFindings: [
      {
        id: "sf1",
        text: "Multiple analyst reports cite ~$28.4B global AI search market size by 2026.",
        type: "factual",
        sourceIds: [1],
      },
      {
        id: "sf2",
        text: "North America ~42% share; Asia-Pacific ~31% (single report).",
        type: "factual",
        sourceIds: [1],
      },
      {
        id: "sf3",
        text: "Tow Center (2025) found material citation errors across AI search engines.",
        type: "factual",
        sourceIds: [5],
      },
    ],
    inferredConclusions: [
      {
        id: "ic1",
        text: "Enterprise adoption is the primary growth driver for 2026 projections.",
        type: "inferential",
        sourceIds: [2, 3],
        reasoningChain: "Sources [2][3] emphasize enterprise velocity; consumer share inferred from segment split in [1].",
      },
      {
        id: "ic2",
        text: "Citation-heavy search may reach 12-15% share by 2026.",
        type: "inferential",
        sourceIds: [4],
        reasoningChain: "Single analyst projection [4]; assumes no platform consolidation.",
      },
    ],
    notAddressed: [
      "Your specific product category (B2B vs consumer) was not specified in retrieval.",
      "No sensitivity analysis if CAGR assumptions in [1] are wrong by 10 points.",
      "Competitive response from Google/Apple bundled search not modeled.",
    ],
    verificationDuties: [
      {
        id: "vd1",
        priority: 1,
        action: "Open [1] and confirm $28.4B includes the same market definition you use internally.",
        why: "Market size claims are highly definition-sensitive.",
        relatedClaimIds: ["sf1"],
      },
      {
        id: "vd2",
        priority: 2,
        action: "Cross-check CAGR with a second analyst (not in brief) before financial modeling.",
        why: "Single-source CAGR drives most downstream forecasts.",
        relatedClaimIds: ["sf1", "ic1"],
      },
      {
        id: "vd3",
        priority: 3,
        action: "Read [5] methodology before citing accuracy stats externally.",
        why: "Citation error rates are test-design dependent.",
        relatedClaimIds: ["sf3"],
      },
    ],
    sourceDisagreements: [
      {
        topic: "Growth driver emphasis",
        positionA: {
          claim: "Enterprise leads growth",
          sourceIds: [2, 3],
        },
        positionB: {
          claim: "Consumer still majority revenue share",
          sourceIds: [1],
        },
      },
    ],
    narrativeSummary:
      "The AI search market is projected around $28.4B by 2026 with strong enterprise momentum, but definitions and single-source projections require verification before strategic decisions.",
    calibratedCommit: {
      blindClaims: [
        { id: "bc1", text: "The $28.4B figure is reliable for board-level planning." },
        { id: "bc2", text: "Enterprise is definitively the primary growth driver." },
        { id: "bc3", text: "Citation-heavy products will capture 12-15% share." },
      ],
      reveals: [
        {
          claimId: "bc1",
          type: "factual",
          sourceIds: [1],
          mismatchAlert: "Single analyst source; market definition unverified for your context.",
        },
        {
          claimId: "bc2",
          type: "inferential",
          sourceIds: [2, 3],
          mismatchAlert: "Inference, not direct quote. Consumer majority still cited in [1].",
        },
        {
          claimId: "bc3",
          type: "inferential",
          sourceIds: [4],
          mismatchAlert: "Forward projection from one source; high uncertainty.",
        },
      ],
    },
  };
}

export function buildCompareBrief(): DecisionBrief {
  return {
    intentContract: defaultContract(DEMO_QUERIES[1], "operational"),
    sourcedFindings: [
      {
        id: "sf1",
        text: "Perplexity averages 21.87 citations/response vs ChatGPT Search ~7.92 (Qwairy 2026).",
        type: "factual",
        sourceIds: [1],
      },
      {
        id: "sf2",
        text: "Tow Center: Perplexity incorrect on 37% of news-attribution tests; Pro tier more definitive when wrong.",
        type: "factual",
        sourceIds: [3],
      },
    ],
    inferredConclusions: [
      {
        id: "ic1",
        text: "Perplexity is stronger for citation-audit research workflows.",
        type: "normative",
        sourceIds: [1, 2],
        reasoningChain: "Combines citation density [1] with audit-trail value [2]; normative for your workflow.",
      },
      {
        id: "ic2",
        text: "ChatGPT is stronger for multi-turn iterative drafting.",
        type: "normative",
        sourceIds: [4],
        reasoningChain: "Based on session memory features [4], not head-to-head task study in brief.",
      },
    ],
    notAddressed: [
      "Your team budget, procurement, and data residency requirements.",
      "Integration with Zotero, Notion, or internal knowledge bases.",
      "Cost per research session at your query volume.",
    ],
    verificationDuties: [
      {
        id: "vd1",
        priority: 1,
        action: "Run the same 5 queries on both tools and compare citation accuracy yourself.",
        why: "Benchmarks may not match your domain.",
        relatedClaimIds: ["sf1", "sf2"],
      },
      {
        id: "vd2",
        priority: 2,
        action: "Review Tow Center test cases [3] for relevance to your use case.",
        why: "News attribution ≠ code research ≠ policy analysis.",
        relatedClaimIds: ["sf2"],
      },
    ],
    sourceDisagreements: [
      {
        topic: "Does citation density improve outcomes?",
        positionA: {
          claim: "More citations = better audit trail",
          sourceIds: [1, 2],
        },
        positionB: {
          claim: "Density may increase skimming without verification",
          sourceIds: [3],
        },
      },
    ],
    narrativeSummary:
      "Perplexity leads on citation surface area; ChatGPT on conversational iteration. Choice depends on whether you optimize for auditability or drafting loops.",
    calibratedCommit: {
      blindClaims: [
        { id: "bc1", text: "More citations means more trustworthy research output." },
        { id: "bc2", text: "Perplexity Pro is more accurate than free tier." },
        { id: "bc3", text: "ChatGPT cannot support serious research workflows." },
      ],
      reveals: [
        {
          claimId: "bc1",
          type: "inferential",
          sourceIds: [1, 3],
          mismatchAlert: "Density ≠ accuracy. Tow Center shows persistent errors.",
        },
        {
          claimId: "bc2",
          type: "factual",
          sourceIds: [3],
          mismatchAlert: "Source says Pro was MORE definitively wrong in tests.",
        },
        {
          claimId: "bc3",
          type: "normative",
          sourceIds: [4],
          mismatchAlert: "Overgeneralization; ChatGPT has distinct strengths.",
        },
      ],
    },
  };
}

export function buildInterviewBrief(): DecisionBrief {
  return {
    intentContract: {
      decision: "Prepare for senior PM interview at a FAANG company",
      stakes: "irreversible",
      goodEnough: "I have a verified prep plan aligned to target company loop and my experience level.",
      deadline: "Interview in 4-6 weeks",
    },
    sourcedFindings: [
      {
        id: "sf1",
        text: "Senior PM loops commonly weight product sense, execution/analytics, and leadership stories.",
        type: "factual",
        sourceIds: [1, 3],
      },
    ],
    inferredConclusions: [
      {
        id: "ic1",
        text: "4-6 weeks structured prep with weekly mocks is typical for successful candidates.",
        type: "inferential",
        sourceIds: [1],
        reasoningChain: "Synthesized from prep guides [1]; not a controlled study.",
      },
      {
        id: "ic2",
        text: "Company-specific culture signals (LPs, Googleyness, etc.) should shape story selection.",
        type: "normative",
        sourceIds: [2],
        reasoningChain: "Normative recommendation from interview prep literature.",
      },
    ],
    notAddressed: [
      "Which FAANG company and level (L5 vs L6) changes loop design.",
      "Compensation negotiation phase not covered.",
      "Internal referral strategy not retrieved.",
    ],
    verificationDuties: [
      {
        id: "vd1",
        priority: 1,
        action: "Confirm 2026 loop format with employees at target company.",
        why: "Interview processes change faster than blog posts.",
        relatedClaimIds: ["sf1"],
      },
      {
        id: "vd2",
        priority: 2,
        action: "Validate SQL/analytics depth with recent interviewees.",
        why: "Guides may underweight analytics for your target team.",
        relatedClaimIds: ["sf1"],
      },
    ],
    sourceDisagreements: [],
    epistemicFork: {
      conservative: {
        title: "Conservative reading",
        summary:
          "Prioritize depth over breadth: fewer stories, heavily rehearsed, with quantified impact. De-emphasize framework jargon.",
        emphasis: "Sources stress leadership evidence and metrics [1][3].",
      },
      expansive: {
        title: "Expansive reading",
        summary:
          "Cover wide loop surface area early: daily product sense drills, SQL, and culture essays. Accept risk of shallow stories.",
        emphasis: "Sources recommend broad prep calendars [1].",
      },
    },
    narrativeSummary:
      "Senior FAANG PM prep requires loop-specific depth; generic guides are a starting point only.",
    calibratedCommit: {
      blindClaims: [
        { id: "bc1", text: "Product sense is ~40% of the loop weight at all FAANG companies." },
        { id: "bc2", text: "4-6 weeks prep is sufficient for any senior candidate." },
        { id: "bc3", text: "Tailoring stories to culture principles is always authentic." },
      ],
      reveals: [
        {
          claimId: "bc1",
          type: "inferential",
          sourceIds: [1, 2],
          mismatchAlert: "Weighting varies by company; not uniformly 40%.",
        },
        {
          claimId: "bc2",
          type: "inferential",
          sourceIds: [1],
          mismatchAlert: "Depends on baseline; weak analytics may need longer.",
        },
        {
          claimId: "bc3",
          type: "normative",
          sourceIds: [2],
          mismatchAlert: "Authenticity risk if stories are forced to fit principles.",
        },
      ],
    },
  };
}

export function buildFdaBrief(): DecisionBrief {
  return {
    intentContract: {
      decision: "Understand regulatory path for AI-enabled medical device strategy",
      stakes: "irreversible",
      goodEnough: "Legal/regulatory owner confirms pathway and open questions before commitment.",
      deadline: "Before Q3 planning",
    },
    sourcedFindings: [
      {
        id: "sf1",
        text: "FDA regulates AI/ML devices under SaMD pathways; 950+ AI devices authorized (predominantly radiology/cardiology).",
        type: "factual",
        sourceIds: [1, 2],
      },
      {
        id: "sf2",
        text: "2025 PCCP final guidance allows pre-specified algorithm changes without new review if conditions met.",
        type: "factual",
        sourceIds: [1],
      },
      {
        id: "sf3",
        text: "FDA guidance is non-binding; statutory/regulatory requirements still govern.",
        type: "factual",
        sourceIds: [1],
      },
    ],
    inferredConclusions: [
      {
        id: "ic1",
        text: "Generative AI in clinical settings faces heightened human-in-the-loop expectations (2026 draft).",
        type: "inferential",
        sourceIds: [3],
        reasoningChain: "Draft guidance [3]; not final law.",
      },
    ],
    notAddressed: [
      "Your device class (I/II/III) and predicate strategy.",
      "EU AI Act interaction with US FDA strategy.",
      "Post-market surveillance specifics for your device type.",
    ],
    verificationDuties: [
      {
        id: "vd1",
        priority: 1,
        action: "Regulatory affairs review of PCCP applicability to your change protocol.",
        why: "PCCP has strict pre-specification requirements.",
        relatedClaimIds: ["sf2"],
      },
      {
        id: "vd2",
        priority: 2,
        action: "Confirm draft gen-AI guidance [3] status (draft vs final).",
        why: "Draft guidance is not settled policy.",
        relatedClaimIds: ["ic1"],
      },
    ],
    sourceDisagreements: [
      {
        topic: "Readiness of gen-AI clinical guidance",
        positionA: {
          claim: "Draft signals direction for human-in-the-loop",
          sourceIds: [3],
        },
        positionB: {
          claim: "950+ authorizations mostly narrow radiology; may not generalize",
          sourceIds: [2],
        },
      },
    ],
    epistemicFork: {
      conservative: {
        title: "Conservative regulatory reading",
        summary:
          "Treat draft gen-AI guidance as early signal only. Plan De Novo or 510(k) with conservative clinical evidence and limit autonomous outputs.",
        emphasis: "Emphasizes [2] narrow prior authorizations and non-binding nature [1].",
      },
      expansive: {
        title: "Expansive regulatory reading",
        summary:
          "Leverage PCCP [1] for iterative ML updates and align with draft gen-AI transparency expectations to accelerate pathway.",
        emphasis: "Emphasizes [1][3] forward-looking FDA posture.",
      },
    },
    narrativeSummary:
      "FDA AI device regulation is active but non-binding guidance requires RA interpretation; do not treat this brief as legal advice.",
    calibratedCommit: {
      blindClaims: [
        { id: "bc1", text: "PCCP means we can ship algorithm updates without any FDA interaction." },
        { id: "bc2", text: "950+ approvals mean gen-AI clinical tools are proven safe." },
        { id: "bc3", text: "This brief is sufficient for regulatory sign-off." },
      ],
      reveals: [
        {
          claimId: "bc1",
          type: "factual",
          sourceIds: [1],
          mismatchAlert: "PCCP requires pre-specified change protocols; not blanket freedom.",
        },
        {
          claimId: "bc2",
          type: "inferential",
          sourceIds: [2],
          mismatchAlert: "Prior devices are mostly narrow modalities; poor generalization.",
        },
        {
          claimId: "bc3",
          type: "normative",
          sourceIds: [1],
          mismatchAlert: "Explicitly not legal advice; RA review required.",
        },
      ],
    },
  };
}

const aiSearchAnswer = `The global AI search market is projected to reach approximately **$28.4 billion by 2026**, growing at a CAGR of 34.2% from 2024.[1] Enterprise adoption drives much of this growth.[2][3] Analysts project citation-heavy search capturing 12-15% share by 2026.[4] Trust and citation accuracy remain industry risks.[5]`;

const responses: Record<string, () => SearchResponse> = {
  [DEMO_QUERIES[0].toLowerCase()]: () => ({
    query: DEMO_QUERIES[0],
    answer: aiSearchAnswer,
    sources: [
      { id: 1, title: "AI Search Market Report 2025-2030", url: "https://example.com/1", domain: "marketsandmarkets.com", snippet: "$28.4B by 2026, 34.2% CAGR.", date: "Jan 2026" },
      { id: 2, title: "Conversational Search Trends", url: "https://example.com/2", domain: "gartner.com", snippet: "Enterprise adoption as growth driver.", date: "Dec 2025" },
      { id: 3, title: "Enterprise AI Search Study", url: "https://example.com/3", domain: "forrester.com", snippet: "Enterprise segment fastest growing.", date: "Feb 2026" },
      { id: 4, title: "Competitive Landscape 2026", url: "https://example.com/4", domain: "cbinsights.com", snippet: "12-15% share for citation-heavy search.", date: "Jan 2026" },
      { id: 5, title: "Trust in AI Search", url: "https://example.com/5", domain: "cjr.org", snippet: "Citation accuracy concerns.", date: "Mar 2025" },
    ],
    decisionBrief: buildMarketBrief(),
    followUps: ["Enterprise vs consumer growth?", "Risks to projections?", "Leading vendors?"],
  }),
  [DEMO_QUERIES[1].toLowerCase()]: () => ({
    query: DEMO_QUERIES[1],
    answer: `Perplexity provides 21.87 citations per response vs ChatGPT's 7.92.[1] Tow Center found Perplexity wrong on 37% of tests; Pro more definitive when wrong.[3] ChatGPT excels at multi-turn memory.[4]`,
    sources: [
      { id: 1, title: "Citation Benchmarks 2026", url: "https://example.com/1", domain: "qwairy.ai", snippet: "21.87 vs 7.92 citations.", date: "Mar 2026" },
      { id: 2, title: "Research Workflow Comparison", url: "https://example.com/2", domain: "promptalpha.ai", snippet: "Audit trail value.", date: "Feb 2026" },
      { id: 3, title: "AI Search Citation Problem", url: "https://example.com/3", domain: "cjr.org", snippet: "37% error rate.", date: "Mar 2025" },
      { id: 4, title: "ChatGPT Memory", url: "https://example.com/4", domain: "openai.com", snippet: "Multi-turn workflows.", date: "Jan 2026" },
    ],
    decisionBrief: buildCompareBrief(),
    followUps: ["Academic review use case?", "Pricing comparison?", "Using both together?"],
  }),
  [DEMO_QUERIES[2].toLowerCase()]: () => ({
    query: DEMO_QUERIES[2],
    answer: `Senior PM interviews emphasize product sense, analytics, and leadership.[1][3] Prep timelines of 4-6 weeks with mocks are common.[1] Tailor stories to company culture.[2]`,
    sources: [
      { id: 1, title: "Senior PM Interview Guide", url: "https://example.com/1", domain: "productalliance.com", snippet: "Loop structure and prep timeline.", date: "Jan 2026" },
      { id: 2, title: "FAANG PM Breakdown", url: "https://example.com/2", domain: "igotanoffer.com", snippet: "Culture-specific signals.", date: "Feb 2026" },
      { id: 3, title: "PM Leadership Questions", url: "https://example.com/3", domain: "exponent.com", snippet: "Leadership and SQL.", date: "Dec 2025" },
    ],
    decisionBrief: buildInterviewBrief(),
    followUps: ["Amazon LP prep?", "SQL depth?", "Common mistakes?"],
  }),
  [DEMO_QUERIES[3].toLowerCase()]: () => ({
    query: DEMO_QUERIES[3],
    answer: `FDA regulates AI/ML devices under SaMD; 950+ authorized.[2] PCCP final guidance (2025) covers predetermined changes.[1] Gen-AI clinical draft (2026) stresses human-in-the-loop.[3] Guidance is non-binding.[1]`,
    sources: [
      { id: 1, title: "FDA AI/ML Guidance Hub", url: "https://example.com/1", domain: "fda.gov", snippet: "SaMD and PCCP.", date: "Jan 2026" },
      { id: 2, title: "AI Device Database", url: "https://example.com/2", domain: "fda.gov", snippet: "950+ authorizations.", date: "Feb 2026" },
      { id: 3, title: "Gen-AI Clinical Draft", url: "https://example.com/3", domain: "fda.gov", snippet: "Human-in-the-loop.", date: "Mar 2026" },
    ],
    decisionBrief: buildFdaBrief(),
    followUps: ["De Novo pathway?", "EU AI Act?", "PCCP details?"],
  }),
};

export function findMockResponse(query: string): SearchResponse {
  const normalized = query.toLowerCase().trim();
  if (responses[normalized]) return responses[normalized]();

  const keywords: [string, string][] = [
    ["market size", DEMO_QUERIES[0]],
    ["ai search", DEMO_QUERIES[0]],
    ["perplexity", DEMO_QUERIES[1]],
    ["chatgpt", DEMO_QUERIES[1]],
    ["interview", DEMO_QUERIES[2]],
    ["faang", DEMO_QUERIES[2]],
    ["fda", DEMO_QUERIES[3]],
    ["medical", DEMO_QUERIES[3]],
  ];

  for (const [kw, key] of keywords) {
    if (normalized.includes(kw)) {
      const base = responses[key.toLowerCase()]();
      return { ...base, query };
    }
  }

  const base = responses[DEMO_QUERIES[0].toLowerCase()]();
  return { ...base, query };
}
