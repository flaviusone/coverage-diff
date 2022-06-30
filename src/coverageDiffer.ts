import { objectToMap, mapToObject } from './helpers';
import { JsonSummary, CoverageSummary, CoverageInfo } from './common';

/**
 * Compares two Istanbul json-summary formatted coverage objects and outputs the
 *   diff between them.
 */
export const coverageDiffer = (
  base: JsonSummary,
  head: JsonSummary
): JsonSummary => {
  const baseMap = objectToMap(base);
  const headMap = objectToMap(head);
  const diffMap = new Map<string, CoverageSummary>();

  // Compare head against base for changed/added files.
  headMap.forEach((v, k) => {
    const fileSummary = baseMap.get(k);

    if (fileSummary) {
      // Changed file.
      diffMap.set(k, diffSummary(v, fileSummary));
    } else {
      // New file.
      diffMap.set(k, { ...v, isNewFile: true });
    }
  });

  return mapToObject(diffMap);
};

/**
 * Returns the diff of two CoverageSummary objects.
 */
const diffSummary = (
  summaryA: CoverageSummary,
  summaryB: CoverageSummary
): CoverageSummary => {
  return {
    lines: diffInfo(summaryA.lines, summaryB.lines),
    statements: diffInfo(summaryA.statements, summaryB.statements),
    functions: diffInfo(summaryA.functions, summaryB.functions),
    branches: diffInfo(summaryA.branches, summaryB.branches),
    isNewFile: false
  };
};

/**
 * Returns the diff of two CoverageInfo objects.
 */
const diffInfo = (infoA: CoverageInfo, infoB: CoverageInfo): CoverageInfo => {
  return {
    total: infoA.total - infoB.total,
    covered: infoA.covered - infoB.covered,
    skipped: infoA.skipped - infoB.skipped,
    pct: Math.round((infoA.pct - infoB.pct) * 100) / 100
  };
};
