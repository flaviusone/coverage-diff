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
 *
 * @return {CoverageDiffOutput}
 */
module.exports.coverageDiff = (base, head) => {
  const diff = coverageDiffer(base, head);
  const { regression, results } = diffChecker(diff);

  return {
    diff,
    results,
    regression
  };
};

const diffChecker = diff => {
  return {
    results: `Test`,
    regression: false
  };
};

/**
 * Compares two Istanbul json-summary formatted coverage objects and outputs the
 *   diff between them.
 *
 * @param  {Object.<string, CoverageSummary>} base json-summary formatted object
 *   for the base branch.
 * @param  {Object.<string, CoverageSummary>} head json-summary formatted object
 *   for the head branch.
 *
 * @return {Object.<string, CoverageSummary>}
 */
const coverageDiffer = (base, head) => {
  let diff = {};

  const baseMap = new Map(Object.entries(base));
  const headMap = new Map(Object.entries(head));
  const diffMap = new Map();

  // Compare head against base for changed/added files.
  headMap.forEach((v, k) => {
    diffMap.set(k, diffSummary(v, baseMap.get(k)));
  });

  diffMap.forEach((v, k) => {
    diff[k] = v;
  });
  return diff;
};

/**
 * Returns the diff of two CoverageSummary objects.
 * @param  {CoverageSummary} summaryA
 * @param  {CoverageSummary} summaryB
 * @return {CoverageSummary}
 */
const diffSummary = (summaryA, summaryB) => {
  if (!summaryB) return summaryA; // Empty summary.

  return {
    lines: diffInfo(summaryA.lines, summaryB.lines),
    statements: diffInfo(summaryA.statements, summaryB.statements),
    functions: diffInfo(summaryA.functions, summaryB.functions),
    branches: diffInfo(summaryA.branches, summaryB.branches)
  };
};

/**
 * Returns the diff of two CoverageInfo objects.
 * @param  {CoverageInfo} infoA
 * @param  {CoverageInfo} infoB
 * @return {CoverageInfo}
 */
const diffInfo = (infoA, infoB) => {
  return {
    total: infoA.total - infoB.total,
    covered: infoA.covered - infoB.covered,
    skipped: infoA.skipped - infoB.skipped,
    pct: Math.round((infoA.pct - infoB.pct) * 100) / 100
  };
};
