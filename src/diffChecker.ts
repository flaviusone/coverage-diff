import { coverageDiffer } from './coverageDiffer';
import { objectToMap, mapToObject } from './helpers';
import { getSummaryPercentages } from './helpers';
import { defaultOptions } from './index';
import {
  JsonSummary,
  FileResultFormat,
  DiffCheckResults,
  CoverageSummary,
  Criteria
} from './common';
/**
 * Takes a json-summary formatted object (a diff) and checks if per-file
 *   coverage changed (increase/decrease).
 * Returns a structured result and regression status.
 */
export const diffChecker = (
  base: JsonSummary,
  head: JsonSummary,
  checkCriteria = defaultOptions.checkCriteria!,
  coverageThreshold = defaultOptions.coverageThreshold!,
  coverageDecreaseThreshold = defaultOptions.coverageDecreaseThreshold!
): DiffCheckResults => {
  let regression = false;
  const diff = coverageDiffer(base, head);
  const diffMap = objectToMap(diff);
  const percentageMap: Map<string, FileResultFormat> = new Map();
  const nonZeroTest = (x: number) => x !== 0;
  const coverageDecreased = (x: number) =>
    x < 0 ? Math.abs(x) >= coverageDecreaseThreshold : false;
  const isBelowThreshold = (x: number) => x < coverageThreshold;

  diffMap.forEach((v, k) => {
    const diffPercentages = getSummaryPercentages(v);

    // Only check files that changed coverage.
    if (Object.values(diffPercentages).some(nonZeroTest)) {
      const decreased = checkCoverageForCondition(
        v,
        checkCriteria,
        coverageDecreased
      );
      const belowThreshold = checkCoverageForCondition(
        head[k],
        checkCriteria,
        isBelowThreshold
      );

      // Coverage decreased on a file or under threshold, regress.
      // Ignore the total field as we check only files.
      if ((decreased || belowThreshold) && k !== 'total') {
        regression = true;
      }

      percentageMap.set(k, {
        deltas: {
          ...diffPercentages
        },
        pcts: getSummaryPercentages(head[k]),
        decreased
      });
    }
  });

  let totals = percentageMap.get('total');

  if (!totals) {
    totals = {
      deltas: { lines: 0, functions: 0, statements: 0, branches: 0 },
      pcts: {
        lines: head.total.lines.pct,
        functions: head.total.functions.pct,
        statements: head.total.statements.pct,
        branches: head.total.branches.pct
      },
      decreased: false
    };
  }

  // Exclude total from files output.
  percentageMap.delete('total');

  return { files: mapToObject(percentageMap), diff, totals, regression };
};

const checkCoverageForCondition = (
  coverage: CoverageSummary,
  checkCriteria: Criteria[],
  condition: (x: number) => boolean
) => {
  const diffPercentages = getSummaryPercentages(coverage);

  const values = checkCriteria.map((criteria) => diffPercentages[criteria]);

  return values.some(condition);
};
