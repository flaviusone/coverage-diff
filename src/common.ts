/* eslint-disable no-undef */
export interface CoverageSummary {
  lines: CoverageInfo;
  statements: CoverageInfo;
  functions: CoverageInfo;
  branches: CoverageInfo;
}

export interface CoverageInfo {
  total: number;
  covered: number;
  skipped: number;
  pct: number; // Coverage percentage (covered/total ratio).
}

export interface JsonSummary {
  [key: string]: CoverageSummary;
}

export interface CoverageDiffOutput {
  diff: JsonSummary;
  results: string;
  regression: boolean;
}

export type Criteria = 'lines' | 'branches' | 'functions' | 'statements';

export interface ConfigOptions {
  checkCriteria?: Array<Criteria>;
  /* Fail coverage check if per-file coverage is lower */
  coverageThreshold?: number;
  /* Fail coverage check if per-file coverage decrease is lower */
  coverageDecreaseThreshold?: number;
}

export interface DiffCheckResults {
  files: FilesResults;
  totals: FileResultFormat;
  diff: JsonSummary;
  regression: boolean;
}

export interface FilesResults {
  [key: string]: FileResultFormat;
}

export interface FileResultFormat {
  deltas: FileResultFields;
  pcts: FileResultFields;
  decreased: boolean;
}

export interface FileResultFields {
  lines: number;
  functions: number;
  statements: number;
  branches: number;
}
