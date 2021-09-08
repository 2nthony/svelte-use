import { useMediaQuery } from '../useMediaQuery'
import { ConfigurableWindow } from '../_configurable'

/**
 * Reactive dark theme preference.
 *
 * @param [options]
 */
export function usePreferredDark(options?: ConfigurableWindow) {
  return useMediaQuery('(prefers-color-scheme: dark)', options)
}
