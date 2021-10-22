import { Fn, Pausable, tryOnDestroy, writable } from "@svelte-use/shared";
import { get } from "svelte/store";
import { ConfigurableWindow, defaultWindow } from "../_configurable";

export interface RafFnOptions extends ConfigurableWindow {
  /**
   * Start the requestAnimationFrame loop immediately on creation
   *
   * @default true
   */
  immediate?: boolean
}

/**
 * Call function on every `requestAnimationFrame`. With controls of pausing and resuming.
 *
 * @see https://svelte-use.vercel.app/core/useRafFn
 * @param fn
 * @param options
 */
export function useRafFn(fn: Fn, options: RafFnOptions = {}): Pausable {
  const { immediate = true, window = defaultWindow } = options

  const isActive = writable(false)

  function loop() {
    if (!get(isActive)) {
      return
    }

    fn()

    if (window) {
      window.requestAnimationFrame(loop)
    }
  }

  function resume() {
    if (!get(isActive)) {
      isActive.set(true)
      loop()
    }
  }

  function pause() {
    isActive.set(false)
  }

  if (immediate) {
    resume()
  }

  tryOnDestroy(pause)

  return {
    isActive,
    resume,
    pause,
  }
}
