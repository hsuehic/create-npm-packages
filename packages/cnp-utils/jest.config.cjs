module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: ['./src/**/*.ts'],
  testMatch: ['**/tests/**/*.ts'],
  moduleNameMapper: {
    '\\.\\./src/(.+)\\.js': '../src/$1',
  },
  coverageReporters: ['json', 'html', 'text', 'text-summary', 'cobertura'],
  coverageDirectory: './reports',
  transform: {
    '^.+\\.tsx?$': ['esbuild-jest'],
  },
};
