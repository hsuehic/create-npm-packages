<!--header-->

# cnp/no-console

> Disallow console expressions
> - ✒️ The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

<!--header-->

<!--cases-->
## Cases

### ✅ Correct

```ts
count(1);
```

With `options`:
```json
{"allowMethods":[]}
```


```ts
console.count(3);
```

With `options`:
```json
{"allowMethods":["count"]}
```


```ts
error(1);
```

```ts
info(1)
```

```ts
log(1);
```

```ts
profile(1);
```

```ts
time(1);
```

```ts
timeEnd(1);
```

```ts
timeStart(1);
```

### ❌ Incorrect

```ts
console.count(1);
```

With `options`:
```json
{"allowMethods":[]}
```

Errors: 
No console.count expressions are allowed


```ts
console.error(1);
```

With `options`:
```json
{"allowMethods":[]}
```

Errors: 
No console.error expressions are allowed


```ts
console.info(1);
```

With `options`:
```json
{"allowMethods":[]}
```

Errors: 
No console.info expressions are allowed


```ts
console.profile(1);
```

With `options`:
```json
{"allowMethods":[]}
```

Errors: 
No console.profile expressions are allowed


```ts
console.time(1);
```

With `options`:
```json
{"allowMethods":[]}
```

Errors: 
No console.time expressions are allowed


```ts
console.timeEnd(1);
```

With `options`:
```json
{"allowMethods":[]}
```

Errors: 
No console.timeEnd expressions are allowed


```ts
console.timeStart(1);
```

With `options`:
```json
{"allowMethods":[]}
```

Errors: 
No console.timeStart expressions are allowed

<!--cases-->







## Rule Details

(TODO: how does this rule check code?)

## Options

(TODO: what do options exist?)





<!--footer-->
## Implementation

- [Rule source](../../src/rules/no-console.ts)
- [Test source](../../tests/rules/no-console.ts)
<!--footer-->
