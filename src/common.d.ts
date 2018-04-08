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

export interface IResultFormat {
  files: {
    [key: string]: {
      deltas: {
        lines: number;
        functions: number;
        statements: number;
        branches: number;
      };
      increased: boolean;
    };
  };
}
