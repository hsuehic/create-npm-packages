<h1>styleling-config-cnp<h1>

Styleling configuration for [create-npm-package](../create-npm-package/README.md)

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
npm install @shopee/stylelint-config-sppt postcss@^8.4.25 -D
```

- Stylelint Config
  `.styleintrc.js`

```js
module.exports = {
  root: true,
  extends: ['@shopee/stylelint-config-sppt'],
};
```
