import { useEffect } from "react";

/**
 * Gives every `.os-section` inside `containerRef` a continuous,
 * scroll-scrubbed entrance — it tilts up out of a slight 3D rotation and
 * settles into place exactly in step with scroll position, the same
 * "morphs in as you scroll" language the hero's pinned camera uses,
 * instead of a single fade-in triggered once.
 *
 * This animates the section's transform only; the existing .os-reveal
 * children keep their own opacity/blur fade-in independently — the two
 * layers don't touch the same CSS properties, so they compose cleanly.
 */
export default function useSectionMorph(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let triggers = [];
    let disposed = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const sections = container.querySelectorAll(".os-section");

      sections.forEach((section) => {
        // backface-visibility avoids a Chromium compositing seam that can
        // briefly show through at a 3D-transformed element's edges.
        gsap.set(section, {
          transformPerspective: 1000,
          transformOrigin: "50% 100%",
          backfaceVisibility: "hidden",
        });
        const tween = gsap.fromTo(
          section,
          { rotateX: reduced ? 3 : 9, y: reduced ? 16 : 60, scale: reduced ? 0.99 : 0.965 },
          {
            rotateX: 0,
            y: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 95%",
              end: "top 55%",
              scrub: reduced ? 0.3 : 0.7,
            },
          }
        );
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      });

      ScrollTrigger.refresh();
    });

    return () => {
      disposed = true;
      triggers.forEach((t) => t && t.kill());
    };
  }, [containerRef]);
}
