import { ConfigOptions, CoverageDiffOutput } from './common';
import * as diffChecker from './diffChecker';
import * as resultFormatter from './resultFormatter';
import * as coverageDiff from './index';

jest.mock('./diffChecker');
jest.mock('./resultFormatter');

import { fileNotCovered, fileFullCovered } from './summaries.fixture';

const diffCheckerSpy = jest.spyOn(diffChecker, 'diffChecker');
const resultFormatterSpy = jest.spyOn(resultFormatter, 'resultFormatter');

describe('diff', () => {
  describe('default options', () => {
    let diffOutput: CoverageDiffOutput;
    beforeEach(() => {
      diffOutput = coverageDiff.diff(fileNotCovered, fileFullCovered);
    });

    it('should call the diffChecker module', () => {
      expect(diffCheckerSpy).toHaveBeenCalledWith(
        fileNotCovered,
        fileFullCovered,
        coverageDiff.defaultOptions.checkCriteria,
        coverageDiff.defaultOptions.coverageThreshold,
        coverageDiff.defaultOptions.coverageDecreaseThreshold,
        coverageDiff.defaultOptions.newFileCoverageThreshold // will be undefined - defaults to coverageThreshold in diffChecker
      );
    });

    it('should call the resultFormatter module', () => {
      expect(resultFormatterSpy).toHaveBeenCalledWith('mockedFiles', {
        deltas: 'mockedTotals',
        pcts: 'mockedPcts'
      });
    });

    it('should return diff info', () => {
      expect(diffOutput).toEqual({
        diff: 'mocked diff',
        results: 'resultFormatter mock',
        regression: 'mockedRegression'
      });
    });
  });
  describe('custom Options', () => {
    it('should call the diffChecker module', () => {
      const mockedOptions: ConfigOptions = {
        checkCriteria: ['lines'],
        coverageThreshold: 100,
        coverageDecreaseThreshold: 0,
        newFileCoverageThreshold: 1,
        customFormatter: jest.fn()
      };

      coverageDiff.diff(fileNotCovered, fileFullCovered, mockedOptions);

      expect(diffCheckerSpy).toHaveBeenCalledWith(
        fileNotCovered,
        fileFullCovered,
        mockedOptions.checkCriteria,
        mockedOptions.coverageThreshold,
        mockedOptions.coverageDecreaseThreshold,
        mockedOptions.newFileCoverageThreshold
      );
      expect(mockedOptions.customFormatter).toHaveBeenCalledWith(
        'mockedFiles',
        {
          deltas: 'mockedTotals',
          pcts: 'mockedPcts'
        }
      );
    });
  });
});
