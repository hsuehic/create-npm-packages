export const TYPESCRIPT = 'typescript';
export const JAVASCRIPT = 'javascript';
export const LANGUAGES = [TYPESCRIPT, JAVASCRIPT] as const;

export type LanguageType = (typeof LANGUAGES)[number];

export const MODULE_TYPE_ESM = 'ES6';
export const MODULE_TYPE_COMMONJS = 'CommonJS';
export const MODULE_TYPS = [MODULE_TYPE_COMMONJS, MODULE_TYPE_ESM] as const;

export type ModuleTypeType = (typeof MODULE_TYPS)[number];

export const ESLINT = 'eslint';
export const STYLELINT = 'stylelint';
export const COMMITLINT = 'commitlint';

export const LINTS = [ESLINT, STYLELINT, COMMITLINT] as const;

export type LintType = (typeof LINTS)[number];

export const TEMPLATES = [
  'hsuehic/cnp-template-javascript',
  'hsuehic/cnp-template-typescript',
  'hsuehic/cnp-template-typescript-eslint-plugin',
];

export const REG_TEMPLATE =
  /^([A-Za-z][A-Za-z1-9-_]*[A-Za-z1-9]+)\/([A-Za-z][A-Za-z1-9-_]*[A-Za-z1-9]+)$/;
export const REG_PACKAGE_NAME = /^[A-Za-z][A-Za-z1-9-_]*[A-Za-z1-9]+$/;
export const REG_SCOPED_PACKAGE_NAME =
  /^@([A-Za-z][A-Za-z1-9-_]*[A-Za-z1-9]+)\/([A-Za-z][A-Za-z1-9-_]*[A-Za-z1-9]+)$/;
