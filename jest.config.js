module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.{js,ts}', '!**/*.d.ts'],
  coverageReporters: ['lcov'],
  coverageDirectory: '<rootDir>/coverage',
  transform: {
    '^.+\\.(js|ts)$': 'ts-jest'
  },
  testMatch: ['**/?(*.)test.(js|ts)'],
  moduleFileExtensions: ['ts', 'js', 'json']
};
