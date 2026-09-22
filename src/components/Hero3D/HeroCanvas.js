import React, { useEffect, useRef } from "react";

// Lazily mounts the Three.js/GSAP hero scene into a container div. Kept as
// its own component (rather than inline in Hero.js) so the ~150KB
// three+gsap payload is only pulled in via dynamic import when the
// capability gate in Hero.js decides the visitor can actually use it.
export default function HeroCanvas({ scrollTriggerRef, reducedMotion }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let disposed = false;
    let handle = null;

    import("./HeroScene").then(({ mountHeroScene }) => {
      if (disposed || !containerRef.current) return;
      handle = mountHeroScene(containerRef.current, {
        scrollTriggerElement: scrollTriggerRef?.current || undefined,
        reducedMotion,
      });
    });

    return () => {
      disposed = true;
      if (handle) handle.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="os-hero-canvas" ref={containerRef} aria-hidden="true" />;
}
