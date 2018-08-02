import { IJsonSummary } from './common';

export const fileFullCovered: IJsonSummary = {
  total: {
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
  },
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

export const fileFullCoveredfileHalfCovered: IJsonSummary = {
  ...fileFullCovered,
  fileB: {
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
  },
  total: {
    lines: {
      total: 4,
      covered: 3,
      skipped: 0,
      pct: 75
    },
    statements: {
      total: 4,
      covered: 3,
      skipped: 0,
      pct: 75
    },
    functions: {
      total: 4,
      covered: 3,
      skipped: 0,
      pct: 75
    },
    branches: {
      total: 4,
      covered: 3,
      skipped: 0,
      pct: 75
    }
  }
};

export const fileNotCovered: IJsonSummary = {
  total: {
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
  },
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
  total: {
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
  },
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

export const coverageNotChanged: IJsonSummary = {
  ...fileFullCovered,
  fileA: {
    lines: {
      total: 2,
      covered: 1,
      skipped: 0,
      pct: 0
    },
    statements: {
      total: 2,
      covered: 1,
      skipped: 0,
      pct: 0
    },
    functions: {
      total: 2,
      covered: 1,
      skipped: 0,
      pct: 0
    },
    branches: {
      total: 2,
      covered: 1,
      skipped: 0,
      pct: 0
    }
  }
};

export const coverageDecreased: IJsonSummary = {
  total: {
    lines: {
      total: 0,
      covered: 1,
      skipped: 0,
      pct: 50
    },
    statements: {
      total: 0,
      covered: 1,
      skipped: 0,
      pct: 50
    },
    functions: {
      total: 0,
      covered: 1,
      skipped: 0,
      pct: 50
    },
    branches: {
      total: 0,
      covered: 1,
      skipped: 0,
      pct: 50
    }
  },
  fileA: {
    lines: {
      total: 0,
      covered: -1,
      skipped: 0,
      pct: -50
    },
    statements: {
      total: 0,
      covered: -1,
      skipped: 0,
      pct: -50
    },
    functions: {
      total: 0,
      covered: -1,
      skipped: 0,
      pct: -50
    },
    branches: {
      total: 0,
      covered: -1,
      skipped: 0,
      pct: -50
    }
  }
};

export const totalDecreased: IJsonSummary = {
  ...coverageNotChanged,
  total: {
    lines: {
      total: 2,
      covered: 1,
      skipped: 0,
      pct: -50
    },
    statements: {
      total: 2,
      covered: 1,
      skipped: 0,
      pct: -50
    },
    functions: {
      total: 2,
      covered: 1,
      skipped: 0,
      pct: -50
    },
    branches: {
      total: 2,
      covered: 1,
      skipped: 0,
      pct: -50
    }
  }
};

export const onlyLinesIncreased: IJsonSummary = {
  ...fileHalfCovered,
  fileA: {
    ...fileHalfCovered.fileA,
    lines: {
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
