/**
 * NextJS does not have the "window" object at the initial load (SSR)
 * therefore, we need to wait until the window object is available.
 *
 * This function wraps a callback to trigger later, once the code is rendered
 * on the client.
 * By default, it returns null when in SSR mode.
 * @param thenDo
 * @param ifNotReturn
 */
export function waitForWindow<T = unknown>(
  thenDo: () => T,
  ifNotReturn: unknown = null
) {
  if (typeof window !== "undefined") {
    return thenDo() as T;
  }

  return ifNotReturn as T;
}
