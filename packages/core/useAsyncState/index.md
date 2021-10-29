---
category: Utilities
---

# useAsyncState

Reactive async state. Will not block your setup function and will trigger changes once the promise is ready.

## Usage

```html
<script>
  import axios from 'axios'
  import { useAsyncState } from '@svelte-use/core'

  const { state, isReady } = useAsyncState(
    axios
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .then((res) => res.data),
    { id: null },
  )
</script>
```
