import { Fn } from './types'

/**
 *  Run a function
 */
export const run = (fn: Fn, ...args: any[]) => {
  fn(...args)
}

/**
 * Run all functions
 */
export const runAll = (fns: Fn[], ...args: any[]) => {
  fns.forEach((fn) => run(fn, ...args))
}
