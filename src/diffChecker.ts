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
  coverageDecreaseThreshold = defaultOptions.coverageDecreaseThreshold!,
  newFileCoverageThreshold = coverageThreshold
): DiffCheckResults => {
  let regression = false;
  let belowThreshold = false;
  const diff = coverageDiffer(base, head);
  const diffMap = objectToMap(diff);
  const percentageMap: Map<string, FileResultFormat> = new Map();
  const nonZeroTest = (x: number) => x !== 0;
  const coverageDecreased = (x: number) =>
    x < 0 ? Math.abs(x) >= coverageDecreaseThreshold : false;
    const isBelowThreshold = (x: number) => x < coverageThreshold;
    const isBelowNewFileThreshold = (x: number) => x < newFileCoverageThreshold;

  diffMap.forEach((v, k) => {
    const diffPercentages = getSummaryPercentages(v);

    let itemBelowThreshold = false;
    let decreased = false;

    // Only check files that changed coverage. or new files
    if (v.isNewFile) {
      itemBelowThreshold = checkCoverageForCondition(
        head[k],
        checkCriteria,
        isBelowNewFileThreshold
      );
    } else if (Object.values(diffPercentages).some(nonZeroTest)) {
      decreased = checkCoverageForCondition(
        v,
        checkCriteria,
        coverageDecreased
      );
      itemBelowThreshold = checkCoverageForCondition(
        head[k],
        checkCriteria,
        isBelowThreshold
      );
    } else {
      return;
    }

    // Ignore the total field as we check only files.
    if (k !== 'total') {
      // Coverage decreased on a file or under threshold, regress.
      if (decreased) {
        regression = true;
      }
      if (itemBelowThreshold) {
        belowThreshold = true;
      }
    }

    percentageMap.set(k, {
      deltas: {
        ...diffPercentages
      },
      pcts: getSummaryPercentages(head[k]),
      decreased,
      belowThreshold: itemBelowThreshold,
      isNewFile: v.isNewFile
    });
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
      decreased: false,
      belowThreshold: checkCoverageForCondition(
        head.total,
        checkCriteria,
        isBelowThreshold
      ),
      isNewFile: false
    };
  }

  // Exclude total from files output.
  percentageMap.delete('total');

  return {
    files: mapToObject(percentageMap),
    diff,
    totals,
    regression,
    belowThreshold
  };
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
