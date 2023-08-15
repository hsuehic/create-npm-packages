<!--header-->

# cnp/define-type

> Enforce type anotation for array declaration.

<!--header-->

<!--cases-->

## Cases

### ✅ Correct

```ts
const foo: number = 1;
```

```ts
let foo: number;
```

### ❌ Incorrect

```ts
const foo = 1;
```

Errors:
Add type annotation for declaration.

```ts
let foo;
```

Errors:
Add type annotation for declaration.

<!--cases-->

## Rule Details

This rule aimed at enforcing adding type annotation for declaration.

Examples of **incorrect** code:

```js
var example = 1;
```

Examples of **correct** code:

```js
var foo = 1;
```

## Options

Nothing.

<!--footer-->

## Implementation

- [Rule source](../../src/rules/define-type.ts)
- [Test source](../../tests/rules/define-type.ts)
<!--footer-->
