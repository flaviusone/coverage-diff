/* eslint-disable no-undef */
export interface ICoverageSummary {
  lines: ICoverageInfo;
  statements: ICoverageInfo;
  functions: ICoverageInfo;
  branches: ICoverageInfo;
}

export interface ICoverageInfo {
  total: number;
  covered: number;
  skipped: number;
  pct: number; // Coverage percentage (covered/total ratio).
}

export interface IJsonSummary {
  [key: string]: ICoverageSummary;
}

export interface ICoverageDiffOutput {
  diff: IJsonSummary;
  results: string;
  regression: boolean;
}

export type Criteria = 'lines' | 'branches' | 'functions' | 'statements';

export interface IConfigOptions {
  checkCriteria: Array<Criteria>;
}

export interface IFilesResults {
  [key: string]: IFileResultFormat;
}

export interface IFileResultFormat {
  deltas: {
    lines: number;
    functions: number;
    statements: number;
    branches: number;
  };
  decreased: boolean;
}

export interface ITotalResultFormat extends IFileResultFormat {
  totals: ICoverageSummary;
}
