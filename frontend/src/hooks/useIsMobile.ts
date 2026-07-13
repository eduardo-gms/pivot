import { useState, useEffect } from 'react';

/**
 * Hook to detect mobile viewport via matchMedia.
 * Listens for changes (e.g. device rotation) and updates reactively.
 *
 * @param breakpoint - Max width in px to consider "mobile" (default: 768)
 * @returns true if the viewport width is <= breakpoint
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(`(max-width: ${breakpoint}px)`).matches
      : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}
