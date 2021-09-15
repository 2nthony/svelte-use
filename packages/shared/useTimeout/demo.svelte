<script lang="ts">
  import { useTimeout } from '.'

  const { ready, start } = useTimeout(1000, { controls: true })
</script>

<p>Ready: { $ready.toString() }</p>
<button disabled={!$ready} on:click={start}>Start Again</button>
