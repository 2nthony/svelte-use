import { noop } from '../utils'
import { Readable, StartStopNotifier } from 'svelte/store'
import { writable } from '../writable'

export function readable<T>(
  value?: T,
  start: StartStopNotifier<T> = noop,
): Readable<T> {
  return {
    subscribe: writable(value, start).subscribe,
  }
}
