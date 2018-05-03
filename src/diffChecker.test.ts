import { diffChecker } from './diffChecker';
import {
  fileFullCovered,
  coverageDecreased,
  onlyLinesIncreased,
  coverageNotChanged,
  noTotal
} from './summaries.fixture';
import { Criteria } from './common';

const checkCriteria: Criteria[] = [
  'lines',
  'branches',
  'functions',
  'statements'
];

describe('diffChecker', () => {
  describe('coverage increased', () => {
    it('should match snapshot', () => {
      expect(diffChecker(fileFullCovered, checkCriteria)).toMatchSnapshot();
    });
  });
  describe('no total', () => {
    it('should match snapshot', () => {
      expect(diffChecker(noTotal, checkCriteria)).toMatchSnapshot();
    });
  });
  describe('coverage decreased', () => {
    it('should match snapshot', () => {
      expect(diffChecker(coverageDecreased, checkCriteria)).toMatchSnapshot();
    });
  });
  describe('skip non changed files', () => {
    it('should match snapshot', () => {
      expect(diffChecker(coverageNotChanged, checkCriteria)).toMatchSnapshot();
    });
  });
  describe('only check lines', () => {
    it('should match snapshot', () => {
      expect(diffChecker(onlyLinesIncreased, ['lines'])).toMatchSnapshot();
    });
  });
});
