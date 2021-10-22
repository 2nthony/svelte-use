<script lang="ts">
  import { useRafFn } from '.'
  import { writable } from '@svelte-use/shared'

  const count = writable(0)
  const { pause, resume } = useRafFn(() => {
    $count += 1
  })
</script>

<div>Count: {$count}</div>
