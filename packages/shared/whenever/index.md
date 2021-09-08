---
category: Utilities
---

# whenever

## usage

```ts
import { whenever } from 'svelteuse'

let ready = true
when(ready, (isReady) => {
  if (isReady) {
    console.log('ready')
  }
})
```
