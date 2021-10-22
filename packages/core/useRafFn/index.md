---
category: Animation
---

# useRafFn

Call function on every `requestAnimationFrame`. With controls of pausing and resuming.

## Usage

```html
<script>
import { writable } from '@svelte-use/shared'
import { useRafFn } from '@svelte-use/core'

const count = writable(0)

const { pause, resume } = useRafFn(() => {
  $count++
  console.log($count)
})
</script>
```
