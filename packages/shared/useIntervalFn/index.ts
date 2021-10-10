import { tryOnDestroy } from '../tryOnDestroy'
import { writable } from '../writable'
import { Fn, isClient, Pausable } from '../utils'

export interface IntervalFnOptions {
  /**
   * Start the timer immediately
   *
   * @default true
   */
  immediate?: boolean

  /**
   * Execute the callback immediate after calling this function
   *
   * @default false
   */
  immediateCallback?: boolean
}

/**
 * Wrapper for `setInterval` with controls
 *
 * @param cb
 * @param interval
 * @param options
 */
export function useIntervalFn(
  cb: Fn,
  interval = 1000,
  options: IntervalFnOptions = {},
): Pausable {
  const { immediate = true, immediateCallback = false } = options

  let timer: any = null
  const isActive = writable(false)

  function clean() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  function pause() {
    isActive.set(false)
    clean()
  }

  function resume() {
    if (interval <= 0) {
      return
    }
    isActive.set(true)
    if (immediateCallback) {
      cb()
    }
    clean()
    timer = setInterval(cb, interval)
  }

  if (immediate && isClient) {
    resume()
  }

  tryOnDestroy(pause)

  return {
    isActive,
    pause,
    resume,
  }
}
