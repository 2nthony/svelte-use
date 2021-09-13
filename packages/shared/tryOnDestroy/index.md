---
category: Component
---

# tryOnDestroy

Safe `onDestroy`. Call `onDestroy()` if it's inside a component lifecycle, if not, do nothing.

## Usage

```js
import { tryOnDestroy } from '@svelte-use/core'

tryOnDestroy(() => {})
```
