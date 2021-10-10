---
category: Sensors
---

# onClickOutside

List for clicks outside of an element. Useful for modal or dropdown.

## Usage

```js
<script>
  import { writable, onClickOutside } from '@svelte-use/core'

  const target = writable()

  onClickOutside(target, (event) => {
    // do something
  })
</script>

<div bind:this={$target}>Hello World</div>
<div>Outside element</div>
```

> This function uses [Event.composedPath()](https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath) which is NOT supported by IE 11, Edge 18 and below. If you are targeting these browsers, we recommend you to include [this code snippet](https://gist.github.com/sibbng/13e83b1dd1b733317ce0130ef07d4efd) on your project.
