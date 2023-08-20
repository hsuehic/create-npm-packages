module.exports = {
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
      },
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: 'tsconfig.json',
      },
    },
  ],
};
