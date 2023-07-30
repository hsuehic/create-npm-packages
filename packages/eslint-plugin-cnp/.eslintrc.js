module.exports = {
  overrides: [
    {
      files: ['./scripts/**/*'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: 'tsconfig.json',
      },
      rules: {
        'cnp/no-console': 'off',
      },
    },
  ],
};
