import { objectToMap, mapToObject } from './helpers';
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
 *
 * @return {Object}
 *
 * Example return object
 *  {
 *    files: {
 *     file_1 : {
 *       deltas: {
 *          lines: 80.2,
 *          functions: 0,
 *          branches: 1,
 *          statements: -2
 *        },
 *        increased: false
 *      }
 *   },
 *   regression: true
 * }
 *
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
    const { pct: lines } = v.lines;
    const { pct: statements } = v.statements;
    const { pct: functions } = v.functions;
    const { pct: branches } = v.branches;

    const percentages = {
      lines,
      statements,
      functions,
      branches
    };

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
          lines,
          statements,
          functions,
          branches
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
