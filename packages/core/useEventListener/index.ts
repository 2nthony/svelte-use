import { listen } from 'svelte/internal'
import { defaultWindow } from '../_configurable'
import {
  Fn,
  isString,
  noop,
  MaybeReadable,
  tryOnDestroy,
  toReadable,
} from '@svelte-use/shared'

interface InferEventTarget<Events> {
  addEventListener(event: Events, fn?: any, options?: any): any
  removeEventListener(event: Events, fn?: any, options?: any): any
}

export type WindowEventName = keyof WindowEventMap
export type DocumentEventName = keyof DocumentEventMap

export type GeneralEventListener<E = Event> = {
  (evt: E): void
}

/**
 * Register using addEventListener on mount, and removeEventListener automatically on destory
 *
 * Overload 1: Omitted Window target
 *
 * @see https://svelte-use.vercel.app/core/useEventListener
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<E extends keyof WindowEventMap>(
  event: E,
  listener: (this: Window, ev: WindowEventMap[E]) => any,
  options?: Boolean | AddEventListenerOptions,
): Fn

/**
 * Register using addEventListener on mount, and removeEventListener automatically on destory
 *
 * Overload 2: Explicitly Window target
 *
 * @see https://svelte-use.vercel.app/core/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<E extends keyof WindowEventMap>(
  target: Window,
  event: E,
  listener: (this: Window, ev: WindowEventMap[E]) => any,
  options?: Boolean | AddEventListenerOptions,
): Fn

/**
 * Register using addEventListener on mount, and removeEventListener automatically on destory
 *
 * Overload 3: Explicitly Document target
 *
 * @see https://svelte-use.vercel.app/core/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<E extends keyof DocumentEventMap>(
  target: Document,
  event: E,
  listener: (this: Window, ev: DocumentEventMap[E]) => any,
  options?: Boolean | AddEventListenerOptions,
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 4: Custom event target with event type infer
 *
 * @see https://svelte-use.vercel.app/core/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<Names extends string, EventType = Event>(
  target: InferEventTarget<Names>,
  event: Names,
  listener: GeneralEventListener<EventType>,
  options?: boolean | AddEventListenerOptions,
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 5: Custom event target fallback
 *
 * @see https://svelte-use.vercel.app/core/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<EventType = Event>(
  target: MaybeReadable<EventTarget | null | undefined>,
  event: string,
  listener: GeneralEventListener<EventType>,
  options?: boolean | AddEventListenerOptions,
): Fn

export function useEventListener(...args: any[]) {
  let target: MaybeReadable<EventTarget> | undefined
  let event: string
  let listener: any
  let options: any

  if (isString(args[0])) {
    ;[event, listener, options] = args
    target = defaultWindow
  } else {
    ;[target, event, listener, options] = args
  }

  if (!target) {
    return noop
  }

  let cleanup = noop

  const store = toReadable(target)
  store.subscribe((el) => {
    cleanup()

    if (!el) {
      return
    }

    const dispose = listen(el, event, listener, options)

    cleanup = () => {
      dispose()
      cleanup = noop
    }
  })

  const stop = () => {
    cleanup()
  }

  tryOnDestroy(stop)

  return stop
}
