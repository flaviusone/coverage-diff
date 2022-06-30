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
  const coverageDecreased = (x: number) =>
    x < 0 ? Math.abs(x) >= coverageDecreaseThreshold : false;
  const isBelowThreshold = (x: number) => x < coverageThreshold;
  const isBelowNewFileThreshold = (x: number) => x < newFileCoverageThreshold;

  const checkItemBelowThreshold = (
    diff: CoverageSummary,
    coverageToCompare: CoverageSummary,
    checkCriteria: Criteria[]
  ) => {
    const condition = diff.isNewFile
      ? isBelowNewFileThreshold
      : isBelowThreshold;
    return checkCoverageForCondition(
      coverageToCompare,
      checkCriteria,
      condition
    );
  };

  const checkItemDecreased = (
    diff: CoverageSummary,
    checkCriteria: Criteria[]
  ) => {
    if (diff.isNewFile) return false;
    return checkCoverageForCondition(diff, checkCriteria, coverageDecreased);
  };

  diffMap.forEach((diff, fileName) => {
    const diffPercentages = getSummaryPercentages(diff);
    if (shouldExcludeItem(diff, diffPercentages)) {
      return;
    }

    const itemDecreased = checkItemDecreased(diff, checkCriteria);
    const itemBelowThreshold = checkItemBelowThreshold(
      diff,
      head[fileName],
      checkCriteria
    );

    // Coverage decreased on a file, regress.
    // only check file specific regressions, ignore regressions in the total, regression should still be set
    // if any non-new file was changed
    if (fileName !== 'total') {
      if (itemDecreased) {
        regression = true;
      }
    }
    // If Total or any file is below threshold, return belowThreshold as true
    if (itemBelowThreshold) {
      belowThreshold = true;
    }

    percentageMap.set(fileName, {
      deltas: {
        ...diffPercentages
      },
      pcts: getSummaryPercentages(head[fileName]),
      isNewFile: diff.isNewFile,
      decreased: itemDecreased,
      belowThreshold: itemBelowThreshold
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

const zeroTest = (x: number) => x === 0;

const shouldExcludeItem = (
  diff: CoverageSummary,
  diffPercentages: ReturnType<typeof getSummaryPercentages>
) => {
  if (diff.isNewFile) {
    return false;
  } else {
    // if every value is zero, exclude the item from the diff because nothing has changed
    return Object.values(diffPercentages).every(zeroTest);
  }
};
