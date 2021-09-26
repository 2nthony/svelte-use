<script lang="ts">
  import { writable } from '@svelte-use/store'
  import { onClickOutside, onClickOutside } from '.'

  const modal = writable(false)
  const modalEl = writable<HTMLDivElement>()

  onClickOutside(modalEl, (event) => {
    console.log(event)
    $modal = false
  })

  const dropdown = writable(false)
  const dropdownEl = writable<HTMLDivElement>()

  onClickOutside(
    dropdownEl,
    (event) => {
      console.log(event)
      $dropdown = false
    },
    { event: 'mousedown' },
  )
</script>

<button on:click={() => ($modal = true)}>Open Modal</button>
<div class="relative inline-block ml-2">
  <button on:click={() => ($dropdown = true)}>Open Dropdown</button>

  {#if $dropdown}
    <div bind:this={$dropdownEl} class="dropdown-inner">
      Click outside of the dropdown to close it.
    </div>
  {/if}
</div>

{#if $modal}
  <div bind:this={$modalEl} class="modal">
    <div class="inner">
      <button
        on:click={() => ($modal = false)}
        title="Close"
        class="button small"
      >
        X
      </button>
      <p class="heading">Demo Modal</p>
      <p>Click outside of the modal to close it.</p>
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 420px;
    max-width: 100%;
    z-index: 10;
  }
  .inner {
    background-color: var(--c-bg);
    padding: 0.4em 2em;
    border-radius: 5px;
    border: 1px solid var(--c-divider-light);
    box-shadow: 2px 2px 10px rgba(10, 10, 10, 0.1);
  }
  .dropdown-inner {
    background-color: var(--c-bg);
    padding: 0.5em;
    position: absolute;
    left: 0;
    border-radius: 5px;
    border: 1px solid var(--c-divider-light);
    box-shadow: 2px 2px 5px rgba(10, 10, 10, 0.1);
  }
  .heading {
    font-weight: bold;
    font-size: 1.4rem;
    margin-bottom: 2rem;
  }
  .button {
    position: absolute;
    top: -0.9rem;
    right: -0.5rem;
    font-weight: bold;
  }
</style>
