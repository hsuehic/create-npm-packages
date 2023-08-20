module.exports = {
  overrides: [
    {
      files: '*.ts',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: 'tsconfig.json',
      },
      rules: {
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'cnp/only-import-export': 'off',
        'import/no-default-export': 'off',
      },
    },
  ],
};
