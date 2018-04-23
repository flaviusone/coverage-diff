import { coverageDiffer } from './coverageDiffer';
import {
  fileFullCovered,
  fileHalfCovered,
  fileNotCovered,
  newFile
} from './summaries.fixture';

describe('coverageDiffer', () => {
  describe('file coverage increased ', () => {
    it('should match snapshot', () => {
      expect(coverageDiffer(fileNotCovered, fileHalfCovered)).toMatchSnapshot();
    });
  });

  describe('file coverage decreased ', () => {
    it('should match snapshot', () => {
      expect(
        coverageDiffer(fileFullCovered, fileHalfCovered)
      ).toMatchSnapshot();
    });
  });

  describe('new file ', () => {
    it('should match snapshot', () => {
      expect(coverageDiffer(fileFullCovered, newFile)).toMatchSnapshot();
    });
  });
});
