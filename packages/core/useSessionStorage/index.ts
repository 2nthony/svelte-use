import { MaybeWritable, RemovableWritable } from '@svelte-use/shared'
import { useStorage, StorageOptions } from '../useStorage'
import { defaultWindow } from '../_configurable'

export function useSessionStorage(
  key: string,
  initialValue: MaybeWritable<string>,
  options?: StorageOptions<string>,
): RemovableWritable<string>
export function useSessionStorage(
  key: string,
  initialValue: MaybeWritable<boolean>,
  options?: StorageOptions<boolean>,
): RemovableWritable<boolean>
export function useSessionStorage(
  key: string,
  initialValue: MaybeWritable<number>,
  options?: StorageOptions<number>,
): RemovableWritable<number>
export function useSessionStorage<T>(
  key: string,
  initialValue: MaybeWritable<T>,
  options?: StorageOptions<T>,
): RemovableWritable<T>
export function useSessionStorage<T = unknown>(
  key: string,
  initialValue: MaybeWritable<null>,
  options?: StorageOptions<T>,
): RemovableWritable<T>

/**
 * Reactive SessionStorage
 *
 * @see https://svelte-use.vercel.app/core/useSessionStorage
 * @param key
 * @param initialValue
 * @param options
 */
export function useSessionStorage<
  T extends boolean | object | number | string | null,
>(
  key: string,
  initialValue: MaybeWritable<T>,
  options: StorageOptions<T> = {},
): RemovableWritable<T> {
  const { window = defaultWindow } = options

  return useStorage(key, initialValue, window?.sessionStorage, options)
}
