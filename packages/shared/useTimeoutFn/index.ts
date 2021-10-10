import { isClient, Stopable } from '../utils'
import { writable } from '../writable'
import { tryOnDestroy } from '../tryOnDestroy'

export interface TimeoutFnOptions {
  /**
   * Start the timer immediate after calling this function
   *
   * @default true
   */
  immediate?: boolean
}

/**
 * Wrapper for `setTimeout` with controls.
 *
 * @param fn
 * @param interval
 * @param options
 */
export function useTimeoutFn(
  cb: (...args: unknown[]) => any,
  interval: number,
  options: TimeoutFnOptions = {},
): Stopable {
  const { immediate = true } = options

  const isPending = writable(false)

  let timer: number | null = null

  function clear() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  function stop() {
    isPending.set(false)
    clear()
  }

  function start(...args: unknown[]) {
    clear()
    isPending.set(true)
    timer = setTimeout(() => {
      isPending.set(false)
      timer = null
      cb(...args)
    }, interval) as unknown as number
  }

  if (immediate) {
    isPending.set(true)
    if (isClient) {
      start()
    }
  }

  tryOnDestroy(stop)

  return {
    isPending,
    start,
    stop,
  }
}
