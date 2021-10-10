import { isString, MaybeWritable, toWritable } from '@svelte-use/shared'
import { get } from 'svelte/store'
import { useMutationObserver } from '../useMutationObserver'
import { ConfigurableDocument, defaultDocument } from '../_configurable'

export interface UseTitleOptions extends ConfigurableDocument {
  /**
   * Observe `document.title` changes using MutationObserver
   *
   * @default false
   */
  observe?: boolean
}

type Title = string | null | undefined

/**
 * Reactive document title.
 *
 * @see https://svelte-use.vercel.app/core/useTitle
 * @param newTitle
 * @param options
 */
export function useTitle(
  newTitle: MaybeWritable<Title> = null,
  options: UseTitleOptions = {},
) {
  const { document = defaultDocument, observe = false } = options
  const title = toWritable(newTitle ?? document?.title ?? null)

  let oldTitle: Title = document?.title

  title.subscribe((t) => {
    if (isString(t) && t !== oldTitle && document) {
      document.title = t
    }
    oldTitle = t
  })

  if (observe && document) {
    useMutationObserver(
      document.head?.querySelector('title'),
      () => {
        if (document && document.title !== get(title)) {
          title.set(document.title)
        }
      },
      {
        childList: true,
      },
    )
  }

  return title
}
