import { IConfigOptions, ICoverageDiffOutput } from './common';
import * as coverageDiffer from './coverageDiffer';
import * as diffChecker from './diffChecker';
import * as resultFormatter from './resultFormatter';
import * as coverageDiff from './index';

jest.mock('./diffChecker');
jest.mock('./resultFormatter');
jest.mock('./coverageDiffer');

import { fileNotCovered, fileFullCovered } from './summaries.fixture';

const coverageDifferSpy = jest.spyOn(coverageDiffer, 'coverageDiffer');
const diffCheckerSpy = jest.spyOn(diffChecker, 'diffChecker');
const resultFormatterSpy = jest.spyOn(resultFormatter, 'resultFormatter');
const mockedOptions: IConfigOptions = { checkCriteria: ['lines'] };

describe('diff', () => {
  describe('default options', () => {
    let diffOutput: ICoverageDiffOutput;
    beforeEach(() => {
      diffOutput = coverageDiff.diff(fileNotCovered, fileFullCovered);
    });

    it('should call the coverageDiffer module', () => {
      expect(coverageDifferSpy).toHaveBeenCalledWith(
        fileNotCovered,
        fileFullCovered
      );
    });

    it('should call the diffChecker module', () => {
      expect(diffCheckerSpy).toHaveBeenCalledWith(
        'coverageDiffer mock',
        coverageDiff.defaultOptions.checkCriteria
      );
    });

    it('should call the resultFormatter module', () => {
      expect(resultFormatterSpy).toHaveBeenCalledWith('foobar');
    });

    it('should return diff info', () => {
      expect(diffOutput).toEqual({
        diff: 'coverageDiffer mock',
        results: 'resultFormatter mock',
        regression: 'foo'
      });
    });
  });
  describe('custom Options', () => {
    beforeEach(() => {
      coverageDiff.diff(fileNotCovered, fileFullCovered, mockedOptions);
    });
    it('should call the diffChecker module', () => {
      expect(diffCheckerSpy).toHaveBeenCalledWith(
        'coverageDiffer mock',
        mockedOptions.checkCriteria
      );
    });
  });
});
