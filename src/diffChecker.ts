import { coverageDiffer } from './coverageDiffer';
import { objectToMap, mapToObject } from './helpers';
import { getSummaryPercentages } from './helpers';
import { defaultOptions } from './index';
import { IJsonSummary, IFileResultFormat, IDiffCheckResults } from './common';
/**
 * Takes a json-summary formatted object (a diff) and checks if per-file
 *   coverage changed (increase/decrease).
 * Returns a structured result and regression status.
 */
export const diffChecker = (
  base: IJsonSummary,
  head: IJsonSummary,
  checkCriteria = defaultOptions.checkCriteria!,
  coverageThreshold = defaultOptions.coverageThreshold!,
  coverageDecreaseTreshold = defaultOptions.coverageDecreaseTreshold!
): IDiffCheckResults => {
  let regression = false;
  const diff = coverageDiffer(base, head);
  const diffMap = objectToMap(diff);
  const percentageMap: Map<string, IFileResultFormat> = new Map();
  const nonZeroTest = (x: number) => x !== 0;
  const coverageDecreased = (x: number) =>
    x < 0 ? Math.abs(x) >= coverageDecreaseTreshold : false;
  const isBelowTreshold = (x: number) => x < coverageThreshold;

  diffMap.forEach((v, k) => {
    const diffPercentages = getSummaryPercentages(v);
    const headPercentages = getSummaryPercentages(head[k]);

    const diffCriteria = checkCriteria.map(
      criteria => diffPercentages[criteria]
    );

    const tresholdCriteria = checkCriteria.map(
      criteria => headPercentages[criteria]
    );

    const decreased = diffCriteria.some(coverageDecreased);
    const belowTreshold = tresholdCriteria.some(isBelowTreshold);

    // Coverage decreased on a file or under treshold. Set regression flag true.
    if ((decreased || belowTreshold) && k !== 'total') {
      regression = true;
    }

    // Skip unchanged files.
    if (diffCriteria.some(nonZeroTest)) {
      percentageMap.set(k, {
        deltas: {
          ...diffPercentages
        },
        decreased
      });
    }
  });

  let totals = percentageMap.get('total');

  if (!totals) {
    totals = {
      deltas: { lines: 0, functions: 0, statements: 0, branches: 0 },
      decreased: false
    };
  }

  // Exclude total from files output.
  percentageMap.delete('total');

  return { files: mapToObject(percentageMap), diff, totals, regression };
};
