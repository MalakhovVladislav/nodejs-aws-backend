module.exports = {
  clearMocks: false,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",

  testEnvironment: "node",
  testMatch: [
    "<rootDir>/src/**/*.test.ts"
  ],
  moduleNameMapper: {
    "^@handlers(.*)$": "<rootDir>/src/handlers/$1",
    "^@libs(.*)$": "<rootDir>/src/libs/$1",
    "^@services(.*)$": "<rootDir>/src/services/$1",
    "^@models(.*)$": "<rootDir>/src/models/$1",
  },
};