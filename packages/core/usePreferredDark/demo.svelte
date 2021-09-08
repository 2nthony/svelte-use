<script lang="ts">
  import { usePreferredDark } from '.'

  const isDark = usePreferredDark()
</script>

<note class="mb-2">Prefers Dark:</note>

<div>{$isDark}</div>
