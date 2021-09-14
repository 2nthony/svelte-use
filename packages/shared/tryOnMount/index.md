---
category: Component
---

# tryOnMount

Safe `onMount`. Call `onMount()` if it's inside a component lifecycle, if not, run just call the function.

## Usage

```js
import { tryOnMount } from '@svelte-use/core'

tryOnMount(() => {})
```
