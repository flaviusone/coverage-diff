import { IJsonSummary } from './common';

export const fileNotCovered: IJsonSummary = {
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

export const fileHalfCovered: IJsonSummary = {
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

export const fileFullCovered: IJsonSummary = {
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

export const newFile: IJsonSummary = {
  ...fileFullCovered,
  fileB: {
    ...fileFullCovered.fileA
  }
};
