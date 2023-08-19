// constants for managing dependencies for lint

export const ESLINT_CONFIG_PACKAGE = 'eslint-config-cnp';
export const STYLELINT_CONFIG_PACKAGE = 'stylelint-config-cnp';
export const COMMITLINT_CONFIG_PACKAGE = '@commitlint/config-conventional';
export const NPMPACKAGEJSONLINT_CONFIG_PACKAGE =
  'npm-package-json-lint-config-default';

export const COMMITLINT_CLI_PACKAGE = '@commitlint/cli';
export const NPMPACKAGEJSONLINT_CLI_PACKAGE = 'npm-package-json-lint';

export const LINT_TYPES = {
  eslint: 'ESLint',
  stylelint: 'Stylelint',
  commitlint: 'Commitlint',
  npmPackageJsonLint: 'NpmPackageJsonLint',
  markdownlint: 'Markdownlint',
} as const;

export type LintType = typeof LINT_TYPES;
export type LintTypeKey = keyof LintType;
export type LintTypeValue = LintType[LintTypeKey];

export const ESLINT_CONFIGS = {
  typescript: 'typescript',
  react: 'react',
  cssModule: 'css-module',
  jest: 'jest',
} as const;

export type EslintConfig = typeof ESLINT_CONFIGS;
export type EslintConfigKey = keyof EslintConfig;
export type EslintConfigValue = EslintConfig[EslintConfigKey];

export const STYLELINT_CONFIGS = {
  sass: 'sass',
  less: 'less',
} as const;

export type StylelintConfig = typeof STYLELINT_CONFIGS;
export type StylelintConfigKey = keyof StylelintConfig;
export type StylelintConfigValue = StylelintConfig[StylelintConfigKey];
