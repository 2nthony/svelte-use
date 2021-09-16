---
category: Sensors
---

# useMutationObserver

Watch for changes being made to the DOM tree. [MutationObserver MDN](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

## Usage

```html
<script>
  import { useMutationObserver } from '@svelte-use/core'

  let el
  let messages = []

  onMount(() => {
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
  })
</script>
```
