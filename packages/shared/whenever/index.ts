import { toWritable } from '../utils'
import { Fn, MaybeWritable } from '../utils/types'

/**
 * Shorthand for watching value to be truthy
 *
 * @see https://svelte-use.vercel.app/shared/whenever
 */
export function whenever<T>(source: MaybeWritable<T>, cb: Fn) {
  const store = toWritable(source)
  let ov: T | undefined

  return store.subscribe((v) => {
    if (v) {
      cb(v, ov)
      ov = v
    }
  })
}
