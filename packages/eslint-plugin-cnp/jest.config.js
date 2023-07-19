module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['./src/rules/*.ts'],
  testMatch: ['**/tests/**/*.ts'],
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  coverageDirectory: '../../reports',
};
