---
category: Watch
---

# whenever

Shorthand for watching value to be truthy.

## Usage

```ts
import { whenever } from '@svelte-use/core'

const ready = writable(false)
when(ready, () => console.log('ready'))
```

```ts
// this
whenever(ready, () => console.log('ready'))

// is equivalent to:
whenever(ready, (isReady) => {
  if (isReady) {
    console.log('ready')
  }
})
```
