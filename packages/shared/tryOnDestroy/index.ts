import { onDestroy } from 'svelte'
import { Fn, tryGetCurrentComponent } from '../utils'

/**
 * Call onDestroy() if it's inside a component lifecycle, if not, do nothing.
 *
 * @param fn
 */
export function tryOnDestroy(fn: Fn) {
  if (tryGetCurrentComponent()) {
    onDestroy(fn)
  }
}
