import { coverageDiffer } from './coverageDiffer';
import { diffChecker } from './diffChecker';
import { resultFormatter } from './resultFormatter';
import { IJsonSummary, ICoverageDiffOutput, IConfigOptions } from './common';

export const defaultOptions: IConfigOptions = {
  checkCriteria: ['lines', 'branches', 'functions', 'statements']
};

/**
 * Compares two Istanbul json-summary formatted coverage objects and outputs the
 *   diff between them.
 */
export function diff(
  base: IJsonSummary,
  head: IJsonSummary,
  options: IConfigOptions = defaultOptions
): ICoverageDiffOutput {
  const diff = coverageDiffer(base, head);
  const { regression, files } = diffChecker(diff, options.checkCriteria);
  const results = resultFormatter(files);

  return {
    diff,
    results,
    regression
  };
}

export default diff;
