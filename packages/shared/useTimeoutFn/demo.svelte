<script lang="ts">
  import { useTimeoutFn } from '.'

  const defaultText = 'Please wait for 3 seconds'
  let text = defaultText

  const { isPending, start } = useTimeoutFn(() => {
    text = 'Fired!'
  }, 3000)

  function restart() {
    text = defaultText
    start()
  }
</script>

<p>{ text }</p>
<button class:disabled={$isPending} on:click={restart}>Restart</button>
