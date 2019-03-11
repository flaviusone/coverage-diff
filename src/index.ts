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
  coverageThreshold: 100,
  coverageDecreaseThreshold: 0
};

/**
 * Compares two Istanbul json-summary formatted coverage objects and outputs the
 *   diff between them.
 */
export function diff(
  base: IJsonSummary,
  head: IJsonSummary,
  options = defaultOptions
): ICoverageDiffOutput {
  const {
    checkCriteria,
    coverageThreshold,
    coverageDecreaseThreshold,
    coverageDecreaseTreshold: deprecatedCoverageDecreaseThreshold
  } = options;

  const { regression, files, totals, diff } = diffChecker(
    base,
    head,
    checkCriteria,
    coverageThreshold,
    coverageDecreaseThreshold !== undefined
      ? coverageDecreaseThreshold
      : deprecatedCoverageDecreaseThreshold
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
