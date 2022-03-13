import { diffChecker } from './diffChecker';
import {
  fileFullCovered,
  onlyLinesIncreased,
  fileNotCovered,
  fileHalfCovered,
  fileFullCoveredfileHalfCovered
} from './summaries.fixture';
import { DiffCheckResults } from './common';
import { expectToMatchObject } from './testHelpers';

describe('diffChecker', () => {
  let result: DiffCheckResults;
  describe('coverage increased', () => {
    beforeEach(() => {
      result = diffChecker(fileNotCovered, fileFullCovered);
    });
    it('should not regress', () => {
      expect(result.regression).toBe(false);
    });

    it('outputs correct total percentages for file', () => {
      expectToMatchObject(result.files['fileA'], {
        decreased: false,
        pcts: {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100
        }
      });
    });
    it('outputs correct deltas for file', () => {
      expectToMatchObject(result.files['fileA'], {
        deltas: {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100
        }
      });
    });
  });

  describe('coverage decreased', () => {
    beforeEach(() => {
      result = diffChecker(fileFullCovered, fileNotCovered);
    });
    it('should not regress', () => {
      expect(result.regression).toBe(true);
    });

    it('outputs correct total percentages for file', () => {
      expectToMatchObject(result.files['fileA'], {
        decreased: true,
        pcts: {
          branches: 0,
          functions: 0,
          lines: 0,
          statements: 0
        }
      });
    });
    it('outputs correct deltas for file', () => {
      expectToMatchObject(result.files['fileA'], {
        deltas: {
          branches: -100,
          functions: -100,
          lines: -100,
          statements: -100
        }
      });
    });
  });

  describe('coverage decreased over total threshold', () => {
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

    it('should not regress', () => {
      // Total is now 50% but overall threshold is 40% so it still passes.
      expect(result.regression).toBe(false);
    });

    it('outputs correct total percentages', () => {
      expectToMatchObject(result.totals, {
        decreased: false, // Threshold is 100
        pcts: {
          branches: 50,
          functions: 50,
          lines: 50,
          statements: 50
        }
      });
    });
  });

  describe('skip non changed files', () => {
    it('should skip non changed files', () => {
      result = diffChecker(fileFullCovered, fileFullCovered);
      expect(result.files).toEqual({});
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
    it('should only check lines', () => {
      result = diffChecker(fileHalfCovered, onlyLinesIncreased, ['lines']);

      expect(result.files['fileA'].deltas.lines).toEqual(50);
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
