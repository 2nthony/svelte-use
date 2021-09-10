import { Fn, MaybeReadable } from '@svelte-use/shared';
interface InferEventTarget<Events> {
    addEventListener(event: Events, fn?: any, options?: any): any;
    removeEventListener(event: Events, fn?: any, options?: any): any;
}
export declare type WindowEventName = keyof WindowEventMap;
export declare type DocumentEventName = keyof DocumentEventMap;
export declare type GeneralEventListener<E = Event> = {
    (evt: E): void;
};
/**
 * Register using addEventListener on mount, and removeEventListener automatically on destory
 *
 * Overload 1: Omitted Window target
 *
 * @see https://svelte-use.vercel.app/useEventListener
 * @param event
 * @param listener
 * @param options
 */
export declare function useEventListener<E extends keyof WindowEventMap>(event: E, listener: (this: Window, ev: WindowEventMap[E]) => any, options?: Boolean | AddEventListenerOptions): Fn;
/**
 * Register using addEventListener on mount, and removeEventListener automatically on destory
 *
 * Overload 2: Explicitly Window target
 *
 * @see https://svelte-use.vercel.app/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export declare function useEventListener<E extends keyof WindowEventMap>(target: Window, event: E, listener: (this: Window, ev: WindowEventMap[E]) => any, options?: Boolean | AddEventListenerOptions): Fn;
/**
 * Register using addEventListener on mount, and removeEventListener automatically on destory
 *
 * Overload 3: Explicitly Document target
 *
 * @see https://svelte-use.vercel.app/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export declare function useEventListener<E extends keyof DocumentEventMap>(target: Document, event: E, listener: (this: Window, ev: DocumentEventMap[E]) => any, options?: Boolean | AddEventListenerOptions): Fn;
/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 4: Custom event target with event type infer
 *
 * @see https://svelte-use.vercel.app/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export declare function useEventListener<Names extends string, EventType = Event>(target: InferEventTarget<Names>, event: Names, listener: GeneralEventListener<EventType>, options?: boolean | AddEventListenerOptions): Fn;
/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 5: Custom event target fallback
 *
 * @see https://svelte-use.vercel.app/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export declare function useEventListener<EventType = Event>(target: MaybeReadable<EventTarget | null | undefined>, event: string, listener: GeneralEventListener<EventType>, options?: boolean | AddEventListenerOptions): Fn;
export {};
