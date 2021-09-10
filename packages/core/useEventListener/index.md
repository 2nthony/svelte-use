---
category: Browser
---

# useEventListener

Use EventListener with ease. Register using [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) on mount, and [removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) automatically on destory.

## Usage

```html
<script>
  import { useEventListener } from '@svelte-use/core'

  useEventListener(document, 'visibilitychange', (evt) => {
    console.log(evt)
  })
</script>
```

You can also pass a `writable/readable` as the event target, `useEventListener` will unregister the previous event and register the new one when you change the target.

```html
<script>
  import { useEventListener } from '@svelte-use/core'

  let el
  const elStore = writable(el)
  useEventListener(elStore, 'click', (evt) => {
    console.log(evt)
  })
  $: elStore.set(el) // <--
</script>

{#if cond}
<div bind:this="{el}">Div1</div>
{:else}
<div bind:this="{el}">Div2</div>
{/if}
```
