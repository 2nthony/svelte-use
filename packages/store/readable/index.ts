import { noop } from '@svelte-use/shared'
import {
  readable as _readable,
  Readable,
  StartStopNotifier,
} from 'svelte/store'
import { writable } from '../writable'

export function readable<T>(
  value: T,
  start: StartStopNotifier<T> = noop,
): Readable<T> {
  return {
    subscribe: writable(value, start).subscribe,
  }
}
