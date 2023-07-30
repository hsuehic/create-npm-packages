module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['./src/rules/*.ts'],
  testMatch: ['**/tests/**/*.ts'],
  coverageReporters: ['json', 'html', 'text', 'text-summary', 'cobertura'],
  coverageDirectory: './reports',
};
