import { onMount } from 'svelte'
import { tryOnDestroy } from '../tryOnDestroy'
import { Fn, noop, tryGetCurrentComponent } from '../utils'

/**
 * Call `onMount()` if it's inside a component lifecycle, if not, run just call the function.
 *
 * @param fn
 */
export function tryOnMount(fn: Fn | (() => Fn)) {
  if (tryGetCurrentComponent()) {
    onMount(fn)
  } else {
    const cb = fn() || noop
    tryOnDestroy(cb)
  }
}
