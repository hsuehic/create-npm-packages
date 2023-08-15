<!--header-->

# cnp/only-import-export

> Allow only import and export statements in index files
>
> - ⭐️ This rule is included in `plugin:cnp/recommended` preset.

<!--header-->

<!--cases-->

## Cases

### ✅ Correct

File name: `index.js`

```ts
import { Sidebar } from './sidebar';
export { Sidebar };
```

File name: `index.ts`

```ts
import { Sidebar } from './sidebar';
export { Sidebar };
```

File name: `index.js`

```ts
import { Sidebar } from './sidebar';
export default Sidebar;
```

File name: `index.js`

```ts
import Sidebar from './sidebar';
```

File name: `index.js`

```ts
export * from './sidebar';
```

### ❌ Incorrect

File name: `index.js`

```ts
import { Sidebar } from './sidebar';
const count = 0;
```

Errors:
Only import and export statements are allowed in index.js files.

File name: `index.js`

```ts
import { Sidebar } from './sidebar';
export const count = 0;
```

Errors:
Only import and export statements are allowed in index.js files.

File name: `/src/pages/catalog/index.ts`

```ts
import { Sidebar } from './sidebar';
export function Page() {}
```

Errors:
Only import and export statements are allowed in index.ts files.

File name: `index.ts`

```ts
export default function () {}
```

Errors:
Only import and export statements are allowed in index.ts files.

File name: `index.js`

```ts
export const Component = () => <div />;
```

Errors:
Only import and export statements are allowed in index.js files.

<!--cases-->

To make modules clear for comsumers, and make the modules more maintainable, without worrying about comsumers use unintended exports.

## Rule Details

Refer to [Cases](#cases)

## Options

N/A

<!--footer-->

## Implementation

- [Rule source](../../src/rules/only-import-export.ts)
- [Test source](../../tests/rules/only-import-export.ts)
<!--footer-->
