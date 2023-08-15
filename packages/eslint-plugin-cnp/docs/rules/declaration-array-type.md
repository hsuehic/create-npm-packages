<!--header-->

# cnp/declaration-array-type

> Add explicit type declarations for array variables whose type can not be inferred
>
> - ⭐️ This rule is included in `plugin:cnp/recommended` preset.

<!--header-->

<!--cases-->

## Cases

### ✅ Correct

```ts
let a: number[] = [];
```

```ts
let a = Array<number>();
```

```ts
let a = Array<number>(5);
```

```ts
let a = new Array<number>();
```

```ts
let a = new Array<number>(5);
```

### ❌ Incorrect

```ts
let a = [];
```

Errors:
Add explicit type declarations for array variables whose type can not be inferred

```ts
let a = Array();
```

Errors:
Add explicit type declarations for array variables whose type can not be inferred

```ts
let a = Array(5);
```

Errors:
Add explicit type declarations for array variables whose type can not be inferred

```ts
let a = new Array();
```

Errors:
Add explicit type declarations for array variables whose type can not be inferred

```ts
let a = [];
let b = new Array(5);
let c = new Array(5);
let d = new Array<number>(5);
```

Errors:
Add explicit type declarations for array variables whose type can not be inferred
Add explicit type declarations for array variables whose type can not be inferred
Add explicit type declarations for array variables whose type can not be inferred

<!--cases-->

(TODO: why is this rule useful?)

## Rule Details

(TODO: how does this rule check code?)

## Options

(TODO: what do options exist?)

<!--footer-->

## Implementation

- [Rule source](../../src/rules/declaration-array-type.ts)
- [Test source](../../tests/rules/declaration-array-type.ts)
<!--footer-->
