import { Writable } from 'svelte/store'
import { noop, Stopable } from '../utils'
import { TimeoutFnOptions, useTimeoutFn } from '../useTimeoutFn'
import { readable } from '../readable'

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

  const controls = useTimeoutFn(noop, interval, options)

  const ready = readable(true, (set) => {
    controls.isPending.subscribe((value) => set(!value))
  })

  if (exposeControls) {
    return {
      ready,
      ...controls,
    }
  } else {
    return ready
  }
}
