import { diffChecker } from './diffChecker';
import { resultFormatter } from './resultFormatter';
import { JsonSummary, CoverageDiffOutput, ConfigOptions } from './common';

export const defaultOptions: ConfigOptions = {
  checkCriteria: ['lines', 'branches', 'functions', 'statements'],
  coverageThreshold: 100,
  coverageDecreaseThreshold: 0
};

/**
 * Compares two Istanbul json-summary formatted coverage objects and outputs the
 *   diff between them.
 */
export function diff(
  base: JsonSummary,
  head: JsonSummary,
  options = defaultOptions
): CoverageDiffOutput {
  const { checkCriteria, coverageThreshold, coverageDecreaseThreshold } =
    options;

  const { regression, files, totals, diff } = diffChecker(
    base,
    head,
    checkCriteria,
    coverageThreshold,
    coverageDecreaseThreshold
  );

  const results = resultFormatter(files, totals);

  return {
    diff,
    results,
    regression
  };
}
export {
  JsonSummary as IJsonSummary,
  CoverageDiffOutput as ICoverageDiffOutput,
  ConfigOptions as IConfigOptions
};
export default diff;
