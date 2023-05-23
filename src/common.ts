/* eslint-disable no-undef */
export interface CoverageSummary {
  lines: CoverageInfo;
  statements: CoverageInfo;
  functions: CoverageInfo;
  branches: CoverageInfo;
  isNewFile: boolean;
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
  belowThreshold: boolean;
}

export type Criteria = 'lines' | 'branches' | 'functions' | 'statements';

export interface ConfigOptions {
  checkCriteria?: Array<Criteria>;
  /* Fail coverage check if per-file coverage is lower */
  coverageThreshold?: number;
  /* Fail coverage check if per-file coverage decrease is lower */
  coverageDecreaseThreshold?: number;
  /* Fail coverage check if per-file coverage is lower than this for new files only */
  newFileCoverageThreshold?: number;
  /* Function to generate a custom output based on the diff */
  customFormatter?: (files: FilesResults, totals: FileResultFormat) => string;
}

export interface DiffCheckResults {
  files: FilesResults;
  totals: FileResultFormat;
  diff: JsonSummary;
  regression: boolean;
  belowThreshold: boolean;
}

export interface FilesResults {
  [key: string]: FileResultFormat;
}

export interface FileResultFormat {
  deltas: FileResultFields;
  pcts: FileResultFields;
  decreased: boolean;
  belowThreshold: boolean;
  isNewFile: boolean;
}

export interface FileResultFields {
  lines: number;
  functions: number;
  statements: number;
  branches: number;
}
