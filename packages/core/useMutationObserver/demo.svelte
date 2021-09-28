<script lang="ts">
  import { writable } from '@svelte-use/store'
  import { useMutationObserver } from '.'

  const el = writable<HTMLDivElement>()

  let messages: string[] = []
  let className = ''
  let style = ''

  useMutationObserver(
    el,
    (mutations) => {
      const mutation = mutations[0]

      if (!mutation) {
        return
      }

      messages.push(mutation.attributeName!)
      messages = messages
    },
    { attributes: true },
  )

  setTimeout(() => {
    className = 'test test2'
  }, 1000)

  setTimeout(() => {
    style = 'color: red'
  }, 1550)
</script>

<div bind:this={$el} class={className} {style}>
  {#each messages as text}
    <div>Mutation Attribute: {text}</div>
  {/each}
</div>
