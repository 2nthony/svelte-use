# Svelte Use

> Fork from [@vueuse/vueuse](https://github.com/vueuse/vueuse)

## Install

```bash
npm i @svelte-use/core
```

## Usage

```html
<script>
  import { usePreferredDark, usePreferredDark } from '@svelte-use/core'

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

Refer to [functions list](http://svelte-use.vercel.app/functions) or [documentations](http://svelte-use.vercel.app/) for more detauls.

## Thanks

This project is heavily inspired by the following awesome projects.

- [vueuse/vueuse](https://github.com/vueuse/vueuse)

## License

[MIT license](./LICENSE) © 2021-PRESENT [2nthony](https://github.com/evillt)
