module.exports = {
  root: true,
  extends: ['cnp'],
  overrides: [
    {
      files: '*.ts?(x)',
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
  ],
  ignorePatterns: ['dist/**/*'],
};
