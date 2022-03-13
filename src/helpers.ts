import { CoverageSummary } from './common';

// Typing this is so complex. Better to inline the code altogether.
export const mapToObject = <T extends {}>(
  map: Map<string, T>
): { [key: string]: T } => {
  let objMap: { [key: string]: T } = {};
  map.forEach((v, k) => {
    objMap[k] = v;
  });
  return objMap;
};

export const objectToMap = <T extends {}>(obj: {
  [key: string]: T;
}): Map<string, T> => new Map(Object.entries(obj));

export const getSummaryPercentages = (summary: CoverageSummary) => ({
  lines: summary.lines.pct,
  statements: summary.statements.pct,
  functions: summary.functions.pct,
  branches: summary.branches.pct
});
