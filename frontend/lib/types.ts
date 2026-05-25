export type ClaimType = "factual" | "inferential" | "normative";
export type StakesLevel = "exploratory" | "operational" | "irreversible";

export interface Source {
  id: number;
  title: string;
  url: string;
  domain: string;
  snippet: string;
  date: string;
}

export interface IntentContract {
  decision: string;
  stakes: StakesLevel;
  goodEnough: string;
  deadline?: string;
}

export interface BriefClaim {
  id: string;
  text: string;
  type: ClaimType;
  sourceIds: number[];
  reasoningChain?: string;
}

export interface VerificationDuty {
  id: string;
  priority: number;
  action: string;
  why: string;
  relatedClaimIds: string[];
}

export interface SourceDisagreement {
  topic: string;
  positionA: { claim: string; sourceIds: number[] };
  positionB: { claim: string; sourceIds: number[] };
}

export interface EpistemicFork {
  conservative: { title: string; summary: string; emphasis: string };
  expansive: { title: string; summary: string; emphasis: string };
}

export interface BlindClaim {
  id: string;
  text: string;
}

export interface ClaimReveal {
  claimId: string;
  type: ClaimType;
  sourceIds: number[];
  mismatchAlert?: string;
}

export interface DecisionBrief {
  intentContract: IntentContract;
  sourcedFindings: BriefClaim[];
  inferredConclusions: BriefClaim[];
  notAddressed: string[];
  verificationDuties: VerificationDuty[];
  sourceDisagreements: SourceDisagreement[];
  narrativeSummary?: string;
  epistemicFork?: EpistemicFork;
  calibratedCommit: {
    blindClaims: BlindClaim[];
    reveals: ClaimReveal[];
  };
}

export interface SearchResponse {
  query: string;
  answer: string;
  sources: Source[];
  decisionBrief: DecisionBrief;
  followUps: string[];
}

