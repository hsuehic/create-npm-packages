# styleling-config-cnp

[![npm version](https://img.shields.io/npm/v/stylelint-config-cnp.svg)](https://www.npmjs.com/package/stylelint-config-cnp)
[![Downloads/month](https://img.shields.io/npm/dm/stylelint-config-cnp.svg)](http://www.npmtrends.com/stylelint-config-cnp)
[![Release](https://github.com/hsuehic/create-npm-packages/actions/workflows/release.yml/badge.svg)](https://github.com/hsuehic/create-npm-packages/actions/workflows/release.yml/badge.svg?branch=main)
[![Testing](https://github.com/hsuehic/create-npm-packages/actions/workflows/test.yml/badge.svg)](https://github.com/hsuehic/create-npm-packages/actions/workflows/test.yml/badge.svg?branch=main)
[![Linting](https://github.com/hsuehic/create-npm-packages/actions/workflows/lint.yml/badge.svg)](https://github.com/hsuehic/create-npm-packages/actions/workflows/lint.yml/badge.svg?branch=main)
[![Build](https://github.com/hsuehic/create-npm-packages/actions/workflows/build.yml/badge.svg)](https://github.com/hsuehic/create-npm-packages/actions/workflows/build.yml/badge.svg?branch=main)
[![codecov](https://codecov.io/gh/hsuehic/create-npm-packages/branch/main/graph/badge.svg?token=38H26EP6UM)](https://codecov.io/gh/hsuehic/create-npm-packages)

> Sharable styleling configuration for [create-npm-package](https://github.com/hsuehic/create-npm-packages/packages/create-npm-packages/README.md)

## Requirement

- Configuration for VSCode `.vscode/settings.json`

```json
{
  "[css]": {
    "editor.defaultFormatter": "stylelint.vscode-stylelint"
  },
  "[less]": {
    "editor.defaultFormatter": "stylelint.vscode-stylelint"
  },
  "[scss]": {
    "editor.defaultFormatter": "stylelint.vscode-stylelint"
  },
  "stylelint.validate": ["css", "less", "postcss", "scss"],
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  }
}
```

## Install and Configuration

- Install

```bash
npm install stylelint-config-cnp postcss@^8.4.25 -D
```

- Stylelint Config
  `.styleintrc.js`

```js
module.exports = {
  root: true,
  extends: ['stylelint-config-cnp'],
};
```

- Use with SCSS
  `.styleintrc.js`

```js
module.exports = {
  root: true,
  extends: ['stylelint-config-cnp', 'stylelint-config-cnp/scss'],
};
```

- Use with less
  `.styleintrc.js`

```js
module.exports = {
  root: true,
  extends: ['stylelint-config-cnp', 'stylelint-config-cnp/less'],
};
```
