# eslint-config-cnp

[![npm version](https://img.shields.io/npm/v/eslint-config-cnp.svg)](https://www.npmjs.com/package/eslint-config-cnp)
[![Downloads/month](https://img.shields.io/npm/dm/eslint-config-cnp.svg)](http://www.npmtrends.com/eslint-config-cnp)
[![Release](https://github.com/hsuehic/eslint-config-cnp/actions/workflows/release.yaml/badge.svg)](https://github.com/hsuehic/eslint-config-cnp/actions/workflows/release.yaml/badge.svg?branch=main)
[![Testing](https://github.com/hsuehic/eslint-config-cnp/actions/workflows/test.yaml/badge.svg)](https://github.com/hsuehic/eslint-config-cnp/actions/workflows/test.yaml/badge.svg?branch=main)
[![Linting](https://github.com/hsuehic/eslint-config-cnp/actions/workflows/lint.yaml/badge.svg)](https://github.com/hsuehic/eslint-config-cnp/actions/workflows/lint.yaml/badge.svg?branch=main)
[![Build](https://github.com/hsuehic/eslint-config-cnp/actions/workflows/build.yaml/badge.svg)](https://github.com/hsuehic/create-npm-package/actions/workflows/build.yaml/badge.svg?branch=main)
[![codecov](https://codecov.io/gh/hsuehic/eslint-config-cnp/branch/main/graph/badge.svg?token=PKEVM146B1)](https://codecov.io/gh/hsuehic/create-npm-package)

> Set up a npm package by running one command

## Usage

- Install

```bash
npm i eslint-config-cnp -D
```

- For node.js npm package
`.eslintrc.js`

```js
module.export = {
  root: true,
  extends: ['cnp'],
};
```

- If jest is using
`.eslintrc.js`

```js
module.export = {
  root: true,
  extends: ['cnp', 'cnp/jest'], // test files should match the patterns ['test/**', '**/__tests__/**/*', '**/*.{spec,test}.*']
};
```

- If react is using
`.eslintrc.js`

```js
module.export = {
  root: true,
  extends: ['cnp/react'],
};
```
