---
category: State
---

# useStorage

Reactive [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)/[SessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)

## Usage

```html
<script>
  import { useStorage } from '@svelte-use/core'

  // bind object
  const state = useStorage('my-store', { hello: 'hi', greeting: 'Hello' }) // returns Writable<object>

  // bind boolean
  const flag = useStorage('my-flag', true) // returns Writable<boolean>

  // bind number
  const count = useStorage('my-count', 0) // returns Writable<number>

  // bind string with SessionStorage
  const id = useStorage('my-id', 'some-string-id', sessionStorage) // returns Writable<string>

  // delete data from storage
  $state = null
</script>
```

## Custom Serialization

By default, `useStorage` will smartly use the corresponding serializer based on the data type of provided default value. For example, `JSON.stringify` / `JSON.parse` will be used for objects, `Number.toString` / `parseFloat` for numbers, etc.

You can also provide your own serialization function to `useStorage`:

```html
<script>
  import { useStorage } from '@svelte-use/core'

  useStorage(
    'key',
    {},
    {
      serializer: {
        read: (v: any) => v ? JSON.parse(v) : null,
        write: (v: any) => JSON.stringify(v),
      }
    }
  })
</script>
```

Please note when you provide `null` as the default value, `useStorage` can't assume the data type from it. In this case, you can provide a custom serializer or reuse the built-in ones explicitly.

```html
<script>
  import { useStorage, StorageSerializers } from '@svelte-use/core'

  const objectLike = useStorage('key', null, {
    serializer: StorageSerializers.object,
  })
  $objectLike = { foo: 'bar' }
</script>
```
