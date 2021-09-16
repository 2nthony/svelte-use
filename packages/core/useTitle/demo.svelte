<script lang="ts">
  import { useTitle } from '.'

  const title = useTitle()
</script>

<note>Title</note>
<input type="text" bind:value={$title}>
