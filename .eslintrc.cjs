module.exports = {
  root: true,
  extends: ['cnp', 'cnp/typescript', 'cnp/jest'],
  overrides: [
    {
      files: '*.ts?(x)',
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
  ],
};
