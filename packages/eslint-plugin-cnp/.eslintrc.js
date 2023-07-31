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
    'cnp/only-import-export': 'off',
  },
};
