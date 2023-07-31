# eslint-plugin-cnp

[![npm version](https://img.shields.io/npm/v/eslint-plugin-cnp.svg)](https://www.npmjs.com/package/eslint-plugin-cnp)
[![Downloads/month](https://img.shields.io/npm/dm/eslint-plugin-cnp.svg)](http://www.npmtrends.com/eslint-plugin-cnp)
[![Release](https://github.com/hsuehic/create-npm-packages/actions/workflows/release.yml/badge.svg)](https://github.com/hsuehic/create-npm-packages/actions/workflows/release.yml/badge.svg?branch=main)
[![Testing](https://github.com/hsuehic/create-npm-packages/actions/workflows/test.yml/badge.svg)](https://github.com/hsuehic/create-npm-packages/actions/workflows/test.yml/badge.svg?branch=main)
[![Linting](https://github.com/hsuehic/create-npm-packages/actions/workflows/lint.yml/badge.svg)](https://github.com/hsuehic/create-npm-packages/actions/workflows/lint.yml/badge.svg?branch=main)
[![Build](https://github.com/hsuehic/create-npm-packages/actions/workflows/build.yml/badge.svg)](https://github.com/hsuehic/create-npm-packages/actions/workflows/build.yml/badge.svg?branch=main)
[![codecov](https://codecov.io/gh/hsuehic/create-npm-packages/branch/main/graph/badge.svg?token=38H26EP6UM)](https://codecov.io/gh/hsuehic/create-npm-packages)

> Sharable ESLint Plugin for [create-npm-package](https://github.com/hsuehic/create-npm-packages/packages/create-npm-packages/README.md)

## Installation

Use [npm](https://www.npmjs.com/) or a compatibility tool to install.

```
npm install --save-dev eslint eslint-plugin-cnp
```

### Requirements

- Node.js v16.15.0 or newer versions.
- ESLint v8.41.0 or newer versions.

## Usage

JSON `.eslintrc`

```json
{
  "plugins": ["cnp"],
  "rules": {
    "sppt/no-console": "error",
    "sppt/declaration-array-type": "warn"
  }
}
```

Write your config file such as `.eslintrc.yml`.

```yml
plugins:
  - sppt
rules:
  sppt/no-console: error
```

See also [Configuring ESLint](https://eslint.org/docs/user-guide/configuring).

## Configs

- `cnp/recommended` ... enables the recommended rules.

## Rules

<!--RULE_TABLE_BEGIN-->
### Best Practices

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [cnp/declaration-array-type](./docs/rules/declaration-array-type.md) | Add explicit type declarations for array variables whose type can not be inferred | ⭐️ |
| [cnp/no-console](./docs/rules/no-console.md) | Disallow console expressions | ✒️ |
| [cnp/only-import-export](./docs/rules/only-import-export.md) | Allow only import and export statements in index files | ⭐️ |

<!--RULE_TABLE_END-->

## Semantic Versioning Policy

This plugin follows [Semantic Versioning](http://semver.org/) and [ESLint's Semantic Versioning Policy](https://github.com/eslint/eslint#semantic-versioning-policy).

## Changelog

- [GitHub Releases](./CHANGELOG.md)

## Contributing

Welcome your contribution!

See also [ESLint Contribution Guide](https://eslint.org/docs/developer-guide/contributing/).

### Development Tools

- `npm test` runs tests.
- `npm run update` updates the package version. And it updates `src/configs/recommended.ts`, `lib/index.ts`, and `README.md`'s rule table. See also [npm version CLI command](https://docs.npmjs.com/cli/version).
- `npm run add-rule <RULE_ID>` creates three files to add a new rule.

**File Structure**:

- `docs/rules/` is the directory to put documentation.
- `src/rules/` is the directory to put rule definitions.
- `scripts/` is the directory to put development scripts.
- `tests/` is the directory to put tests for `src/`.
- `.eslintignore` and `.eslintrc.js` are the configuration to lint this repository.

**Dependencies**:

This template uses [Jest](https://jestjs.io/) and [GitHub Actions](https://github.co.jp/features/actions) for tests, as same as ESLint itself. If you want to use other tools, customize it.

**Development Tools**:

- `npm run add-rule foo` command adds a rule definition.
- `npm update` command updates the following stuff by the `meta` property of rules:
  - the header of `docs/rules/*.md`.
  - `lib/configs/recommended.ts` file.
  - `lib/index.ts` file.
  - the rule table in `README.md` file.

Below is an example of README.
