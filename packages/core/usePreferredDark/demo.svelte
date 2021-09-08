<script lang="ts">
  import { usePreferredDark } from '.'

  const prefersDark = usePreferredDark()
</script>

<note class="mb-2">Prefers Dark:</note>

<div>{$prefersDark}</div>
