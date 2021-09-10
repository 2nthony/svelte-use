---
category: Browser
---

# usePreferredDark

Reactive dark theme preference.

## Usage

```html
<script>
  import { usePreferredDark } from '@svelte-use/core'

  const isDark = usePreferredDark()
</script>

<p>{$isDark}</p>
```
