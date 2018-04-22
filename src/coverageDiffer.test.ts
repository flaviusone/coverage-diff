import { IJsonSummary } from './common';
import { coverageDiffer } from './coverageDiffer';

const fileNotCovered: IJsonSummary = {
  fileA: {
    lines: {
      total: 2,
      covered: 0,
      skipped: 0,
      pct: 0
    },
    statements: {
      total: 2,
      covered: 0,
      skipped: 0,
      pct: 0
    },
    functions: {
      total: 2,
      covered: 0,
      skipped: 0,
      pct: 0
    },
    branches: {
      total: 2,
      covered: 0,
      skipped: 0,
      pct: 0
    }
  }
};

const fileHalfCovered: IJsonSummary = {
  fileA: {
    lines: {
      total: 2,
      covered: 1,
      skipped: 0,
      pct: 50
    },
    statements: {
      total: 2,
      covered: 1,
      skipped: 0,
      pct: 50
    },
    functions: {
      total: 2,
      covered: 1,
      skipped: 0,
      pct: 50
    },
    branches: {
      total: 2,
      covered: 1,
      skipped: 0,
      pct: 50
    }
  }
};

const fileFullCovered: IJsonSummary = {
  fileA: {
    lines: {
      total: 2,
      covered: 2,
      skipped: 0,
      pct: 100
    },
    statements: {
      total: 2,
      covered: 2,
      skipped: 0,
      pct: 100
    },
    functions: {
      total: 2,
      covered: 2,
      skipped: 0,
      pct: 100
    },
    branches: {
      total: 2,
      covered: 2,
      skipped: 0,
      pct: 100
    }
  }
};

const newFile: IJsonSummary = {
  ...fileFullCovered,
  fileB: {
    ...fileFullCovered.fileA
  }
};

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
