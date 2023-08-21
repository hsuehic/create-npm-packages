module.exports = {
  overrides: [
    {
      files: ['./scripts/**/*'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: 'tsconfig.json',
      },
    },
  ],
  rules: {
    '@typescript-eslint/naming-convention': 'off',
    'cnp/only-import-export': 'off',
  },
};
