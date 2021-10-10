import { get_current_component } from 'svelte/internal'
import { readable } from '../readable'
import { get } from 'svelte/store'
import { MaybeReadable, MaybeWritable } from './types'
import { isReadable, isWritable } from './is'
import { Readable, writable, Writable } from 'svelte/store'

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

export function unstore<T>(val: MaybeReadable<T>): T {
  return isReadable(val) ? get(val) : val
}

export function toReadable<T>(val: MaybeReadable<T>): Readable<T> {
  return isReadable(val) ? val : readable(val)
}

export function toWritable<T>(val: MaybeWritable<T>): Writable<T> {
  return isWritable(val) ? val : writable(val)
}
