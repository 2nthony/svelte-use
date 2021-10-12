import { Fn, noop, runAll } from '../utils'
import { tryOnDestroy } from '../tryOnDestroy'
import {
  writable as _writable,
  get,
  Writable,
  Updater,
  Subscriber,
  StartStopNotifier,
} from 'svelte/store'

/**
 * It would be better if export this from source code
 *
 * @see https://github.com/sveltejs/svelte/blob/c040f130b761a6aae64590999516adec5bb89680/src/runtime/store/index.ts#L13
 *
 * The Svelte team will not going to exported
 * https://github.com/sveltejs/svelte/pull/5887#discussion_r598125836
 * https://github.com/sveltejs/svelte/pull/6836#issuecomment-940899369
 *
 * Keep this
 */
type Invalidator<T> = (value?: T) => void

export function writable<T>(
  value?: T,
  start: StartStopNotifier<T> = noop,
): Writable<T> {
  type Run = Subscriber<T> | Fn
  type Invalidate = Invalidator<T> | Fn

  const s = _writable(value, start)
  const runs: Set<Run> = new Set()
  const invalidates: Set<Invalidate> = new Set()

  const unsubscribe = s.subscribe(
    (val) => runAll([...runs], val),
    (val) => runAll([...invalidates], val),
  )

  function set(newValue: T): void {
    s.set(newValue)
  }

  function update(fn: Updater<T>): void {
    s.update(fn)
  }

  function subscribe(run: Run = noop, invalidate: Invalidate = noop) {
    runs.add(run)
    invalidates.add(invalidate)

    const v = get(s)
    run(v)
    invalidate(v)

    return () => {
      runs.delete(run)
      invalidates.delete(invalidate)
    }
  }

  const stop = () => {
    runs.clear()
    invalidates.clear()

    unsubscribe()
  }

  tryOnDestroy(stop)

  return {
    set,
    update,
    subscribe,
  }
}
