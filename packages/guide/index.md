# Get Started

Svelte Use is a collection of utility functions.

## Installation

### NPM

```bash
npm i @svelte-use/core
# yarn add @svelte-use
# pnpm i @svelte-use/core
```

## Usage Example

Simply importing the functions you need from `@svelte-use/core`

```html
<script>
  import { usePreferredDark, useLocalStorage } from '@svelte-use/core'

  // is user prefers dark theme
  const isDark = usePreferredDark()

  // persist state in localStorage
  const storage = useLocalStorage({
    'my-storage',
    {
      name: 'Apple',
      color: 'red'
    }
  })
</script>
```

Refer to [functions list](/functions) for more details.

:::warning

We use the `writable` as element binding a lot in usage example.

```js
const el = writable()
<div bind:this={$el}></div>
```

:::
