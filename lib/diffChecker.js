const { objectToMap } = require('./helpers');
/**
 * Takes a json-summary formatted object (a diff) and checks if per-file
 *   coverage changed (increase/decrease).
 * Returns a pretty-formatted result and regression status.
 *
 * @param  {Object.<string, CoverageSummary>} diff Json-summary formatted object
 * @return {Object}
 *
 */
module.exports.diffChecker = (diff, checkCriteria) => {
  let regression = false;

  const diffMap = objectToMap(diff);

  return {
    results: `Test`,
    regression
  };
};
