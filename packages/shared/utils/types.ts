import { Readable, Writable } from 'svelte/store'
/**
 * Any function
 */
export type Fn = (...args: any[]) => void

/**
 * Infers the element type of an array
 */
export type ElementOf<T> = T extends (infer E)[] ? E : never

/**
 * Maybe it's a Readable, or not.
 *
 * ```ts
 * type Readable = T | Readable<T>
 * ```
 */
export type MaybeReadable<T> = T | Readable<T>

export interface Stopable {
  /**
   * A writable indicate whether a stopable instance is executing
   */
  isPending: Writable<boolean>

  /**
   * Stop the effect from executing
   */
  stop: Fn

  /**
   * Start the effect
   */
  start: Fn
}
