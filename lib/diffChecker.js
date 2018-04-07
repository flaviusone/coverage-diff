const { objectToMap } = require('./helpers');
const { mapToObject } = require('./helpers');
/**
 * Takes a json-summary formatted object (a diff) and checks if per-file
 *   coverage changed (increase/decrease).
 * Returns a pretty-formatted result and regression status.
 *
 * @param  {Object.<string, CoverageSummary>} diff Json-summary formatted object
 * @param {String[]} checkCriteria One of lines, statements, functions, branches
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
module.exports.diffChecker = (diff, checkCriteria) => {
  let regression = false;
  const diffMap = objectToMap(diff);
  const percentageMap = new Map();
  const isBelowThreshold = x => x < 0;
  const nonZeroTest = x => x !== 0;

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
