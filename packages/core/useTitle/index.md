---
category: Browser
---

# useTitle

Reactive document title.

## Usage

```html
<script>
  import { useTitle } from '@svelte-use/core'

  const title = useTitle()
  console.log($title) // print current title
  $title = 'Hello' // change current title
</script>
```

Set initial title immediately

```html
<script>
  const title = useTitle('New Title')
</script>
```
