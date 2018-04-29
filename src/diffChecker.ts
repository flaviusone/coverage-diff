import { objectToMap, mapToObject } from './helpers';
import { getSummaryPercentages } from './helpers';
import {
  IJsonSummary,
  IFilesResults,
  IFileResultFormat,
  Criteria
} from './common';
/**
 * Takes a json-summary formatted object (a diff) and checks if per-file
 *   coverage changed (increase/decrease).
 * Returns a pretty-formatted result and regression status.
 */
export const diffChecker = (
  diff: IJsonSummary,
  checkCriteria: Criteria[]
): { files: IFilesResults; regression: boolean } => {
  let regression = false;
  const diffMap = objectToMap(diff);
  const percentageMap: Map<string, IFileResultFormat> = new Map();
  const isBelowThreshold = (x: number) => x < 0;
  const nonZeroTest = (x: number) => x !== 0;

  // TODO total will have custom formatting in a future release. Exclude for now.
  diffMap.delete('total');

  diffMap.forEach((v, k) => {
    const percentages = getSummaryPercentages(v);

    const diffCriteria = checkCriteria.map(criteria => percentages[criteria]);

    const decreased = diffCriteria.some(isBelowThreshold);

    // Coverage decreased on a file. Set regression flag true.
    if (decreased) {
      regression = true;
    }

    // Skip unchanged files.
    if (diffCriteria.some(nonZeroTest)) {
      percentageMap.set(k, {
        deltas: {
          ...percentages
        },
        decreased
      });
    }
  });

  return {
    files: mapToObject(percentageMap),
    regression
  };
};
