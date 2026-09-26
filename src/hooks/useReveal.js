import { useEffect } from "react";

// Adds "is-visible" to every .reveal element the first time it scrolls into
// view, which plays its 3D entrance. Elements added later (for example by
// "Show all projects") are picked up too. Without IntersectionObserver
// everything is simply shown.
export default function useReveal() {
  useEffect(() => {
    const pending = () => Array.from(document.querySelectorAll(".reveal:not(.is-visible)"));
    if (!("IntersectionObserver" in window)) {
      pending().forEach((el) => el.classList.add("is-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Also show anything already scrolled past, e.g. after jumping to
          // #contact from the menu, so no section is left invisible.
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    const watch = () => pending().forEach((el) => observer.observe(el));
    watch();
    const mutations = new MutationObserver(watch);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);
}
