<script lang="ts">
  import { useInterval } from '.'

  const counter = useInterval(200)
</script>

<p>Interval fired: {$counter}</p>
