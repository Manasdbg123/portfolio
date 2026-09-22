import React, { useEffect, useRef, useState } from "react";
import "./cursor.css";

// Desktop-only custom cursor (disabled on touch devices — there's no
// pointer to follow there). Tracking the mouse 1:1, with no inertia or
// spring, isn't the kind of motion prefers-reduced-motion targets, so it
// isn't gated behind that preference. Reads data-cursor="label" off the
// hovered element (or an ancestor) to show contextual text.
export default function CustomCursor() {
  const dotRef = useRef(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);

    let x = 0, y = 0, raf;
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      const target = e.target.closest?.("[data-cursor]");
      setLabel(target ? target.getAttribute("data-cursor") : "");
      setActive(!!target);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div ref={dotRef} className={`os-cursor ${active ? "is-active" : ""}`} aria-hidden="true">
      <div className="os-cursor-dot" />
      {label && <div className="os-cursor-label">{label}</div>}
    </div>
  );
}
