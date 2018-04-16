import { IFilesResults } from './common';
import { resultFormatter } from './resultFormatter';

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

describe('resultFormatter', () => {
  it('should format files results as markdown table', () => {
    expect(resultFormatter(filesResults)).toMatchSnapshot();
  });
});
