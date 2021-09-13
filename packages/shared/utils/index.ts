import {get_current_component} from 'svelte/internal'

export * from './is'
export * from './types'
export * from './fn'

/**
 * Safe `get_current_component`. Call `get_current_component()` without throw error.
 */
export function tryGetCurrentComponent() {
  let currentComponent

  try {
    currentComponent = get_current_component()
  } catch (_) {}

  return currentComponent
}
