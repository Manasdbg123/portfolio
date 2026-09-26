import { useEffect, useState } from "react";

// Subscribes to a CSS media query. Returns false where matchMedia is missing (tests, old browsers).
export default function useMedia(query) {
  const get = () => typeof window !== "undefined" && !!window.matchMedia && window.matchMedia(query).matches;
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [query]);
  return matches;
}

export const FINE_POINTER = "(hover: hover) and (pointer: fine)";
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
