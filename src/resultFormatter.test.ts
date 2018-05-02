import { IFilesResults, ITotalResultFormat } from './common';
import { resultFormatter } from './resultFormatter';
import { fileFullCovered } from './summaries.fixture';

const filesResults: IFilesResults = {
  file1: {
    deltas: {
      lines: 10,
      statements: -10,
      functions: 20,
      branches: -30
    },
    decreased: true
  },
  file2: {
    deltas: {
      lines: 10,
      statements: 10,
      functions: 20,
      branches: 30
    },
    decreased: false
  }
};

const totalResults: ITotalResultFormat = {
  totals: fileFullCovered.total,
  deltas: {
    lines: 100,
    functions: 100,
    branches: 100,
    statements: 100
  },
  decreased: false
};

describe('resultFormatter', () => {
  it('should format files results as markdown table', () => {
    expect(resultFormatter(filesResults, totalResults)).toMatchSnapshot();
  });

  it("should print descriptive message if coverage did't change", () => {
    expect(resultFormatter({}, totalResults)).toMatchSnapshot();
  });
});
