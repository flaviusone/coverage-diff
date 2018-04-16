module.exports = {
  clearMocks: true,
  transform: {
    '^.+\\.(js|ts)$': 'ts-jest'
  },
  testMatch: ['**/?(*.)test.(js|ts)'],
  moduleFileExtensions: ['ts', 'js', 'json']
};
