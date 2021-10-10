import { writable } from '../writable'
import { Writable } from 'svelte/store'
import { useIntervalFn } from '../useIntervalFn'
import { Pausable } from '../utils'

export interface IntervalOptions<Controls extends boolean> {
  /**
   * Expose the controls
   *
   * @default false
   */
  controls?: Controls

  /**
   * Execute the update immediately on calling
   *
   * @default true
   */
  immediate?: boolean
}

export function useInterval(
  interval?: number,
  options?: IntervalOptions<false>,
): Writable<number>
export function useInterval(
  interval: number,
  options: IntervalOptions<true>,
): { counter: Writable<number> } & Pausable
export function useInterval(
  interval = 1000,
  options: IntervalOptions<boolean> = {},
) {
  const { controls: exposeControls = false, immediate = true } = options

  const counter = writable(0)
  const controls = useIntervalFn(
    () => {
      counter.update((c) => (c += 1))
    },
    interval,
    { immediate },
  )

  if (exposeControls) {
    return {
      counter,
      ...controls,
    }
  }
  return counter
}
