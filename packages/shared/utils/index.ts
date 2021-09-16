import { get_current_component } from 'svelte/internal'
import { get, readable } from '@svelte-use/store'
import { MaybeReadable } from './types'
import { isReadable } from './is'
import { Readable } from 'svelte/store'

export * from './is'
export * from './types'
export * from './fn'

/**
 * Silent `get_current_component`. Call `get_current_component()` without throw error.
 */
export function tryGetCurrentComponent() {
  let currentComponent

  try {
    currentComponent = get_current_component()
  } catch (_) {}

  return currentComponent
}

export function promiseTimeout(
  ms: number,
  throwOnTimeout = false,
  reason = 'Timeout',
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (throwOnTimeout) {
      setTimeout(() => reject(reason), ms)
    } else {
      setTimeout(resolve, ms)
    }
  })
}

export function unReadable<T>(val: MaybeReadable<T>): T {
  return isReadable(val) ? get(val) : val
}

export function toReadable<T>(val: MaybeReadable<T>): Readable<T> {
  return isReadable(val) ? val : readable(val)
}
