import { useEffect, useRef } from "react";

/**
 * Adds `.is-visible` to elements with the given selector inside the
 * returned ref once they cross the viewport, producing the scroll-reveal
 * motion used on every section. Only skipped (shown instantly) if
 * IntersectionObserver itself is unavailable — prefers-reduced-motion
 * shortens the stagger rather than removing the motion outright, since
 * that OS setting defaults to on for a large share of visitors and fully
 * skipping it was leaving every section but the hero completely static.
 */
export default function useReveal(selector = ".os-reveal") {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.querySelectorAll(selector);

    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-visible"));
      return undefined;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stagger = reduced ? 15 : 60;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("is-visible"), i * stagger);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    els.forEach((el) => io.observe(el));

    // Safety net: some environments (background/inactive tabs, certain
    // embedded webviews) throttle IntersectionObserver callbacks so they
    // never fire at all. Content must never stay permanently invisible
    // because of that, so force it visible after a short grace period
    // regardless of whether the observer ever reported anything.
    const fallback = setTimeout(() => {
      els.forEach((el) => el.classList.add("is-visible"));
    }, 1200);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, [selector]);

  return ref;
}

export function usePrefersReducedMotion() {
  const ref = useRef(false);
  if (typeof window !== "undefined") {
    ref.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return ref.current;
}
