---
category: Sensors
---

# useMutationObserver

Watch for changes being made to the DOM tree. [MutationObserver MDN](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

## Usage

```js
<script>
  import { writable, useMutationObserver } from '@svelte-use/core'

  const el = writable()
  let messages = []

  useMutationObserver(
    el,
    (mutations) => {
      if (!mutations[0]) {
        messages.push(mutations[0].attributeName)
        messages = messages
      }
    },
    { attributes: true },
  )
</script>

<div bind:this={$el}></div>
```
