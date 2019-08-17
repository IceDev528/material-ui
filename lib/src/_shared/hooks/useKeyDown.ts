import * as React from 'react';

export const useIsomorphicEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

type KeyHandlers = Record<KeyboardEvent['key'], () => void>;

export function runKeyHandler(e: KeyboardEvent, keyHandlers: KeyHandlers) {
  const handler = keyHandlers[e.key];
  if (handler) {
    handler();
    // if event was handled prevent other side effects (e.g. page scroll)
    e.preventDefault();
  }
}

export function useKeyDown(active: boolean, keyHandlers: KeyHandlers) {
  const keyHandlersRef = React.useRef(keyHandlers);
  keyHandlersRef.current = keyHandlers;

  useIsomorphicEffect(() => {
    if (active) {
      const handleKeyDown = (event: KeyboardEvent) => {
        runKeyHandler(event, keyHandlersRef.current);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [active]);
}
