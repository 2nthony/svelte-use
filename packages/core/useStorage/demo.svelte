<script lang="ts">
  import { dump } from 'js-yaml'
  import { useStorage } from '.'

  const state = useStorage('svelte-use-local-storage', {
    name: 'Banana',
    color: 'Yellow',
    size: 'Medium',
  })
</script>

<input bind:value={$state.name} type="text">
<input bind:value={$state.color} type="text">
<input bind:value={$state.size} type="text">

<pre lang="json">{ dump($state, { skipInvalid: true }) }</pre>
