import { coverageDiffer } from './coverageDiffer';
import { diffChecker } from './diffChecker';
import { resultFormatter } from './resultFormatter';

const defaultOptions = {
  checkCriteria: ['lines', 'branches', 'functions', 'statements']
};
/**
 * @typedef CoverageSummary
 * @type {Object}
 *
 * @property {CoverageInfo} lines
 * @property {CoverageInfo} statements
 * @property {CoverageInfo} functions
 * @property {CoverageInfo} branches
 */

/**
 * @typedef CoverageInfo
 * @type {Object}
 *
 * @property {number} total Total number of elements (lines, functions,
 *   statements, branches).
 * @property {number} covered Numner of covered elements.
 * @property {number} skipped Number of skipped elements.
 * @property {number} pct Coverage percentage (covered/total ratio).
 */

/**
 * @typedef CoverageDiffOutput
 * @type {Object}
 *
 * @property {Object.<string, CoverageSummary>} diff
 * @property {string} results
 * @property {boolean} regression True if coverage decreased.
 */

/**
 * Compares two Istanbul json-summary formatted coverage objects and outputs the
 *   diff between them.
 *
 * @param  {Object.<string, CoverageSummary>} base json-summary formatted object
 *   for the base branch.
 * @param  {Object.<string, CoverageSummary>} head json-summary formatted object
 *   for the head branch.
 * @param {Object} options Options object.
 *
 * @return {CoverageDiffOutput}
 */
export default (base, head, options = defaultOptions) => {
  const diff = coverageDiffer(base, head);
  const { regression, files } = diffChecker(diff, options.checkCriteria);
  const results = resultFormatter(files);

  return {
    diff,
    results,
    regression
  };
};
