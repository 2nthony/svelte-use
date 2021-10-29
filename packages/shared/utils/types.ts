import { Readable, Updater, Writable } from 'svelte/store'
/**
 * Any function
 */
export type Fn = (...args: any[]) => void

/**
 * Any promise function
 */
export type PromiseFn<T> = (...args: any[]) => Promise<T>

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

/**
 * Maybe it's a Writable, or not.
 *
 * ```ts
 * type Writable = T | Writable<T>
 * ```
 */
export type MaybeWritable<T> = T | Writable<T>

export type MaybeElementReadable = MaybeReadable<
  HTMLElement | SVGElement | undefined | null
>

/**
 * A writable that allow to set/update `null` or `undefined`
 */
export type RemovableWritable<T> = Writable<T> & {
  set(this: void, value: T | null | undefined): void
  update(this: void, updater: Updater<T | null | undefined>): void
}

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

export interface Pausable {
  /**
   * A readable indicate whether a pausable instance is active
   */
  isActive: Writable<boolean>

  /**
   * Temporary pause the effect from executing
   */
  pause: Fn

  /**
   * Resume the efffects
   */
  resume: Fn
}
