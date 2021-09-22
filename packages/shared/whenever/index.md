---
category: Utilities
---

# whenever

Shorthand for watching value to be truthy.

## usage

```ts
import { whenever } from '@svelte-use/core'

let ready = true
when(ready, (isReady) => {
  if (isReady) {
    console.log('ready')
  }
})
```
