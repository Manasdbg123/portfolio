import React, { useEffect, useRef } from "react";

// Lazily mounts the 3D circular project carousel. Desktop-only (see
// useCanRender3D's reasoning — a drag/scroll-driven WebGL ring fighting
// touch-scroll on a phone is exactly the class of bug that broke mobile
// before) — the caller only renders this when capable, and the existing
// tab list underneath stays fully functional everywhere as the accessible
// control and the mobile/fallback experience.
export default function ProjectCarousel3D({ projects, activeSlug, onSelect, reducedMotion }) {
  const containerRef = useRef(null);
  const handleRef = useRef(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    let disposed = false;
    import("./CarouselScene").then(({ mountCarouselScene }) => {
      if (disposed || !containerRef.current) return;
      const handle = mountCarouselScene(containerRef.current, {
        projects,
        reducedMotion,
        onSelect: (slug) => onSelectRef.current?.(slug),
      });
      handleRef.current = handle;
    });
    return () => {
      disposed = true;
      handleRef.current?.dispose();
      handleRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the 3D ring in sync when the tab list (or anything else) changes
  // the active project externally.
  useEffect(() => {
    const index = projects.findIndex((p) => p.slug === activeSlug);
    if (index >= 0) handleRef.current?.select(index);
  }, [activeSlug, projects]);

  return (
    <div className="os-carousel3d" ref={containerRef} data-cursor="DRAG">
      <div className="os-carousel3d-hint os-mono">DRAG OR SCROLL TO ROTATE · CLICK A CARD</div>
    </div>
  );
}
