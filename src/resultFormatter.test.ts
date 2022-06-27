import { FilesResults, FileResultFormat } from './common';
import { resultFormatter } from './resultFormatter';

const filesResults: FilesResults = {
  file1: {
    isNewFile: false,
    deltas: {
      lines: 10,
      statements: -10,
      functions: 20,
      branches: -30
    },
    pcts: {
      lines: 80,
      statements: 20,
      functions: 3,
      branches: 14
    },
    decreased: true,
    belowThreshold: false
  },
  file2: {
    isNewFile: false,
    deltas: {
      lines: 10,
      statements: 10,
      functions: 20,
      branches: 30
    },
    pcts: {
      lines: 20,
      statements: 5,
      functions: 2,
      branches: 8
    },
    decreased: false,
    belowThreshold: false
  },
  file3: {
    isNewFile: false,
    deltas: {
      lines: 10,
      statements: 10,
      functions: 20,
      branches: 30
    },
    pcts: {
      lines: 20,
      statements: 5,
      functions: 2,
      branches: 8
    },
    decreased: false,
    belowThreshold: true
  },
  file4: {
    isNewFile: true,
    deltas: {
      lines: 10,
      statements: 10,
      functions: 20,
      branches: 30
    },
    pcts: {
      lines: 20,
      statements: 5,
      functions: 2,
      branches: 8
    },
    decreased: false,
    belowThreshold: false
  }
};

const totalResults: FileResultFormat = {
  isNewFile: false,
  deltas: {
    lines: 100,
    functions: 100,
    branches: 100,
    statements: 100
  },
  pcts: {
    lines: 100,
    statements: 100,
    functions: 100,
    branches: 100
  },
  decreased: false,
  belowThreshold: false
};

describe('resultFormatter', () => {
  it('should format files results as markdown table', () => {
    expect(resultFormatter(filesResults, totalResults)).toMatchSnapshot();
  });

  it("should print descriptive message if coverage did't change", () => {
    expect(resultFormatter({}, totalResults)).toMatchSnapshot();
  });
});
