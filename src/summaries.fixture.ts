import { JsonSummary } from './common';

export const fileFullCovered: JsonSummary = {
  total: {
    isNewFile: false,
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
    isNewFile: false,
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

export const fileFullCoveredfileHalfCovered: JsonSummary = {
  ...fileFullCovered,
  fileB: {
    isNewFile: false,
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
    isNewFile: false,
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

export const fileNotCovered: JsonSummary = {
  total: {
    isNewFile: false,
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
    isNewFile: false,
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

export const fileHalfCovered: JsonSummary = {
  total: {
    isNewFile: false,
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
    isNewFile: false,
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

export const coverageNotChanged: JsonSummary = {
  ...fileFullCovered,
  fileA: {
    isNewFile: false,
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

export const coverageDecreased: JsonSummary = {
  total: {
    isNewFile: false,
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
    isNewFile: false,
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

export const totalDecreased: JsonSummary = {
  ...coverageNotChanged,
  total: {
    isNewFile: false,
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

export const onlyLinesIncreased: JsonSummary = {
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

export const newFile: JsonSummary = {
  ...fileFullCovered,
  fileB: {
    ...fileFullCovered.fileA
  }
};

export const newFileNotCovered: JsonSummary = {
  ...fileFullCovered,
  total: {
    isNewFile: false,
    lines: {
      total: 4,
      covered: 2,
      skipped: 0,
      pct: 50
    },
    statements: {
      total: 4,
      covered: 2,
      skipped: 0,
      pct: 50
    },
    functions: {
      total: 4,
      covered: 2,
      skipped: 0,
      pct: 50
    },
    branches: {
      total: 4,
      covered: 2,
      skipped: 0,
      pct: 50
    }
  },
  fileB: {
    ...fileNotCovered.fileA,
    isNewFile: true
  }
};

export const newFileHalfCovered: JsonSummary = {
  ...fileFullCovered,
  total: {
    isNewFile: false,
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
  },
  fileB: {
    ...fileHalfCovered.fileA,
    isNewFile: true
  }
};
