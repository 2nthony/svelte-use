---
category: Animation
---

# useTimeout

Update value after a given time with controls.

## Usage

```html
<script>
  import { useTimeout } from '@svelte-use/core'

  const ready = useTimeout(1000)
</script>
```

```html
<script>
  import { useTimeout, promiseTimeout } from '@svelte-use/core'

  const { ready, start, stop } = useTimeout(1000, { controls: true })

  console.log($ready) // false

  await promiseTimeout(1200)

  console.log($ready) // true
</script>
```
