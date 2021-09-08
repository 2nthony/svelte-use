/**
 * Shorthand for watching value to be truthy
 */
export function whenever<T>(source: T, cb: Function) {
  if (source) {
    cb()
  }
}
