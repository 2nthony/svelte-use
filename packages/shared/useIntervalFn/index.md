---
category: Animation
---

# useIntervalFn

Wrapper for `setInterval` with controls

## Usage

```html
<script>
  import { useIntervalFn } from '@svelte-use/core'

  const { pause, resume, isActive } = useIntervalFn(() => {
    // do something
  }, 1000)
</script>
```
