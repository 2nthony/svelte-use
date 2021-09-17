import { MaybeWritable, RemovableWritable } from '@svelte-use/shared'
import { useStorage, StorageOptions } from '../useStorage'
import { defaultWindow } from '../_configurable'

export function useLocalStorage(
  key: string,
  initialValue: MaybeWritable<string>,
  options?: StorageOptions<string>,
): RemovableWritable<string>
export function useLocalStorage(
  key: string,
  initialValue: MaybeWritable<boolean>,
  options?: StorageOptions<boolean>,
): RemovableWritable<boolean>
export function useLocalStorage(
  key: string,
  initialValue: MaybeWritable<number>,
  options?: StorageOptions<number>,
): RemovableWritable<number>
export function useLocalStorage<T>(
  key: string,
  initialValue: MaybeWritable<T>,
  options?: StorageOptions<T>,
): RemovableWritable<T>
export function useLocalStorage<T = unknown>(
  key: string,
  initialValue: MaybeWritable<null>,
  options?: StorageOptions<T>,
): RemovableWritable<T>

/**
 * Reactive LocalStorage
 *
 * @see https://svelte-use.vercel.app/core/useLocalStorage
 * @param key
 * @param initialValue
 * @param options
 */
export function useLocalStorage<
  T extends boolean | object | number | string | null,
>(
  key: string,
  initialValue: MaybeWritable<T>,
  options: StorageOptions<T> = {},
): RemovableWritable<T> {
  const { window = defaultWindow } = options

  return useStorage(key, initialValue, window?.localStorage, options)
}
