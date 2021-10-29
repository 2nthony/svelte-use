import { noop, PromiseFn, promiseTimeout, writable } from '@svelte-use/shared'

export interface AsyncStateOptions {
  /**
   * Delay for executeing the promise. In milliseconds.
   *
   * @default 0
   */
  delay?: number

  /**
   * Execute the promise right after the function is invoked.
   * Will apply the delay if any.
   *
   * When set to false, you will need to execute it manually.
   *
   * @default true
   */
  immediate?: boolean

  /**
   * Callback when error is caught.
   */
  onError?: (e: unknown) => void

  /**
   * Sets the state to initialState before executing the promise.
   *
   * This can be useful when calling the execute function more than once (for
   * example, to refresh data). When set to false, the current state remains
   * unchanged until the promise resolves.
   *
   * @default true
   */
  resetOnExecute?: boolean
}

/**
 * Reactive async state. Will not block your setup function and will triggers changes once
 * the promise is ready.
 *
 * @see https://svelte-use.vercel.app/core/useAsyncState
 * @param promise         The promise / async function to be resolved
 * @param initialState    The initial state, used until the first evaluation finishes
 * @param options
 */
export function useAsyncState<T>(
  promise: Promise<T> | PromiseFn<T>,
  initialState: T,
  options: AsyncStateOptions = {},
) {
  const {
    immediate = true,
    delay = 0,
    onError = noop,
    resetOnExecute = true,
  } = options

  const state = writable<T>(initialState)
  const isReady = writable(false)
  const error = writable<unknown | undefined>(undefined)

  async function execute(delay = 0, ...args: any[]) {
    if (resetOnExecute) {
      state.set(initialState)
    }
    error.set(undefined)
    isReady.set(false)

    if (delay > 0) {
      await promiseTimeout(delay)
    }

    const _promise = typeof promise === 'function' ? promise(...args) : promise

    try {
      const data = await _promise
      state.set(data)
      isReady.set(true)
    } catch (e) {
      error.set(e)
      onError(e)
    }
  }

  if (immediate) {
    execute(delay)
  }

  return {
    state,
    isReady,
    error,
    execute,
  }
}

export type UseAsyncStateReturn = ReturnType<typeof useAsyncState>
