export type MatchClassification = "fully matched" | "partial match" | "no match";

export interface InterfaceMatch {
  _id?: string; // MongoDB document ID, optional for creation
  javaClassFilename: string;
  javaInterfaceName: string;
  javaClassSummary: string;
  oasFilename: string;
  oasSummary: string;
  explanation: string;
  matchClassification: MatchClassification;
  matchPercentage: number; // 0-100
} 