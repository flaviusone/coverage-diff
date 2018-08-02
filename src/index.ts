import { diffChecker } from './diffChecker';
import { resultFormatter } from './resultFormatter';
import {
  IJsonSummary,
  ICoverageDiffOutput,
  IConfigOptions,
  ITotalResultFormat
} from './common';

export const defaultOptions: IConfigOptions = {
  checkCriteria: ['lines', 'branches', 'functions', 'statements'],
  coverageThreshold: 1
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
  const { regression, files, totals, diff } = diffChecker(
    base,
    head,
    options.checkCriteria,
    options.coverageThreshold
  );
  const totalResults: ITotalResultFormat = {
    totals: head.total,
    ...totals
  };
  const results = resultFormatter(files, totalResults);

  return {
    diff,
    results,
    regression
  };
}

export default diff;
