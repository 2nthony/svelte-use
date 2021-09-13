import { Fn } from '.'

export const run = (fn: Fn, ...args: any[]): void => {
  fn(...args)
}

export const runAll = (fns: Fn[], ...args: any[]) => {
  fns.forEach((fn) => run(fn, ...args))
}
