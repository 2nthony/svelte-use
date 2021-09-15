---
category: Animation
---

# useTimeoutFn

Wrapper for `setTimeout` with controls.

## Usage

```html
<script>
  import { useTimeoutFn } from '@svelte-use/core'

  const { isPending, start, stop } = useTimeoutFn(() => {
    // do something
  }, 3000)
</script>
```
