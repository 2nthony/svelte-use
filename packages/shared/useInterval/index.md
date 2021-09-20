---
category: Animation
---

# useInterval

Reactive counter increases on every interval

## Usage

```html
<script>
  import { useInterval } from '@svelte-use/core'

  // count will increase every 200ms
  const counter = useInterval(200)

  // with controls
  const { counter, pause, resume } = useInterval(200, { controls: true })
</script>
```
