import { Readable } from 'svelte/store'
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
