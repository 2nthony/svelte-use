<script lang="ts">
  import { writable } from '@svelte-use/store'
  import { useIntervalFn } from '.'

  const greetings = [
    'Hello',
    'Hi',
    'Yo!',
    'Hey',
    'Hola',
    'こんにちは',
    'Bonjour',
    'Salut!',
    '你好',
  ]
  const word = writable(greetings[0])

  const { pause, resume, isActive } = useIntervalFn(() => {
    word.set(greetings[Math.round(Math.random() * (greetings.length - 1))])
  }, 500)
</script>

<p>{$word}</p>
{#if $isActive}
  <button class="orange" on:click={pause}>Pause</button>
{:else}
  <button on:click={resume}>Resume</button>
{/if}
