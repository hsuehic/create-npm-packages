module.exports = {
  root: true,
  extends: ['cnp/node'],
  overrides: [
    {
      files: '*.ts?(x)',
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
  ],
  ignorePatterns: ['packages/*/dist/**/*'],
};
