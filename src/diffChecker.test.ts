import { diffChecker } from './diffChecker';
import {
  fileFullCovered,
  onlyLinesIncreased,
  fileNotCovered,
  fileHalfCovered,
  fileFullCoveredfileHalfCovered
} from './summaries.fixture';
import { IDiffCheckResults } from './common';

describe('diffChecker', () => {
  describe('coverage increased', () => {
    it('should match snapshot', () => {
      expect(diffChecker(fileNotCovered, fileFullCovered)).toMatchSnapshot();
    });
  });
  describe('coverage decreased', () => {
    it('should match snapshot', () => {
      expect(diffChecker(fileFullCovered, fileNotCovered)).toMatchSnapshot();
    });
  });
  describe('coverage decreased over total threshold', () => {
    let result: IDiffCheckResults;
    beforeEach(() => {
      // Set coverageDecreaseThreshold to 100% so we only test coverageThreshold.
      result = diffChecker(
        fileFullCovered,
        fileHalfCovered,
        undefined,
        40,
        100
      );
    });
    it('should match snapshot', () => {
      expect(result).toMatchSnapshot();
    });

    it('should not regress', () => {
      expect(result.regression).toBe(false);
    });
  });
  describe('skip non changed files', () => {
    it('should match snapshot', () => {
      expect(diffChecker(fileFullCovered, fileFullCovered)).toMatchSnapshot();
    });

    it('should return total percentages', () => {
      expect(
        diffChecker(fileFullCovered, fileFullCovered, undefined, 0).totals
      ).toMatchObject({
        deltas: { lines: 0, functions: 0, statements: 0, branches: 0 },
        pcts: {
          lines: 100,
          functions: 100,
          statements: 100,
          branches: 100
        }
      });
    });
  });
  describe('only check lines', () => {
    it('should match snapshot', () => {
      expect(
        diffChecker(fileHalfCovered, onlyLinesIncreased, ['lines'])
      ).toMatchSnapshot();
    });
  });
  describe('total decreased', () => {
    it('should not regress', () => {
      // Set coverageThreshold to 0 as we have a new file half covered.
      expect(
        diffChecker(
          fileFullCovered,
          fileFullCoveredfileHalfCovered,
          undefined,
          0
        ).regression
      ).toBe(false);
    });
  });
});
