import {
  MaybeWritable,
  RemovableWritable,
  toWritable,
  unstore,
} from '@svelte-use/shared'
import { useEventListener } from '../useEventListener'
import { ConfigurableWindow, defaultWindow } from '../_configurable'

export type Serializer<T> = {
  read(raw: string): T
  write(value: T): string
}

export const StorageSerializers: Record<
  'boolean' | 'object' | 'number' | 'string' | 'any',
  Serializer<any>
> = {
  boolean: {
    read: (v: any) => v === 'true',
    write: (v: any) => String(v),
  },
  object: {
    read: (v: any) => JSON.parse(v),
    write: (v: any) => JSON.stringify(v),
  },
  number: {
    read: (v: any) => Number.parseFloat(v),
    write: (v: any) => String(v),
  },
  string: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },
  any: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },
}

export type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

export interface StorageOptions<T> extends ConfigurableWindow {
  /**
   * Listen to storage changes, useful for multiple tabs application
   *
   * @default true
   */
  listenToStorageChanges?: boolean

  /**
   * Custom data serialization
   */
  serializer?: Serializer<T>

  /**
   * On error callback
   *
   * Default lo error to `console.error`
   */
  onError?: (error: unknown) => void
}

export function useStorage(
  key: string,
  initialValue: MaybeWritable<string>,
  storage?: StorageLike,
  options?: StorageOptions<string>,
): RemovableWritable<string>
export function useStorage(
  key: string,
  initialValue: MaybeWritable<boolean>,
  storage?: StorageLike,
  options?: StorageOptions<boolean>,
): RemovableWritable<boolean>
export function useStorage(
  key: string,
  initialValue: MaybeWritable<number>,
  storage?: StorageLike,
  options?: StorageOptions<number>,
): RemovableWritable<number>
export function useStorage<T>(
  key: string,
  initialValue: MaybeWritable<T>,
  storage?: StorageLike,
  options?: StorageOptions<T>,
): RemovableWritable<T>
export function useStorage<T = unknown>(
  key: string,
  initialValue: MaybeWritable<null>,
  storage?: StorageLike,
  options?: StorageOptions<T>,
): RemovableWritable<T>

/**
 * Reactive LocalStorage/SessionStorage
 *
 * @see https://svelte-use.vercel.app/core/useStorage
 * @param key
 * @param initialValue
 * @param storage
 * @param options
 */
export function useStorage<T extends boolean | object | number | string | null>(
  key: string,
  initialValue: MaybeWritable<T>,
  storage: StorageLike | undefined = defaultWindow?.localStorage,
  options: StorageOptions<T> = {},
): RemovableWritable<T> {
  const {
    listenToStorageChanges = true,
    window = defaultWindow,
    onError = (e) => {
      console.error(e)
    },
  } = options

  const rawInit: T = unstore(initialValue)

  // https://github.com/vueuse/vueuse/blob/706a04921c6bb81a5fc3687c2b2748a81f5e9a21/packages/core/useStorage/index.ts#L98
  const type =
    rawInit == null
      ? 'any'
      : typeof rawInit === 'boolean'
      ? 'boolean'
      : typeof rawInit === 'string'
      ? 'string'
      : typeof rawInit === 'object'
      ? 'object'
      : Array.isArray(rawInit)
      ? 'object'
      : !Number.isNaN(rawInit)
      ? 'number'
      : 'any'

  const data = toWritable(initialValue) as RemovableWritable<T>
  const serializer = options.serializer ?? StorageSerializers[type]

  function read(event?: StorageEvent) {
    if (!storage || (event && event.key !== key)) {
      return
    }

    try {
      const rawValue = event ? event.newValue : storage.getItem(key)
      if (rawValue == null) {
        data.set(rawInit)
        if (rawInit !== null) {
          storage.setItem(key, serializer.write(rawInit))
        }
      } else {
        data.set(serializer.read(rawValue))
      }
    } catch (e) {
      onError(e)
    }
  }

  read()

  if (window && listenToStorageChanges) {
    useEventListener(window, 'storage', read)
  }

  if (storage) {
    data.subscribe((value) => {
      try {
        if (value == null) {
          storage.removeItem(key)
        } else {
          storage.setItem(key, serializer.write(value))
        }
      } catch (e) {
        onError(e)
      }
    })
  }

  return data
}
