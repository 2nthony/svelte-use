import { Writable } from 'svelte/store'
import { noop, Stopable } from '../utils'
import { TimeoutFnOptions, useTimeoutFn } from '../useTimeoutFn'
import { writable } from '@svelte-use/store'

export interface TimeoutOptions<Controls extends boolean>
  extends TimeoutFnOptions {
  /**
   * Expose more controls
   *
   * @default false
   */
  controls?: Controls
}

/**
 * Update value after a given time with controls.
 *
 * @see https://svelte-use.vercel.app/core/useTimeout
 * @param interval
 * @param options
 */
export function useTimeout(
  interval?: number,
  options?: TimeoutOptions<false>,
): Writable<boolean>
export function useTimeout(
  interval: number,
  options: TimeoutOptions<true>,
): {
  ready: Writable<boolean>
} & Stopable
export function useTimeout(
  interval = 1000,
  options: TimeoutOptions<boolean> = {},
) {
  const { controls: exposeControls = false } = options

  const ready = writable(false)

  const controls = useTimeoutFn(noop, interval, options)
  controls.isPending.subscribe(ready.set)

  if (exposeControls) {
    return {
      ready,
      ...controls,
    }
  } else {
    return ready
  }
}
