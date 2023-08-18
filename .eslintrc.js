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
  rules: {
    '@typescript-eslint/naming-convention': 'off',
  },
  ignorePatterns: ['packages/*/dist/**/*'],
};
