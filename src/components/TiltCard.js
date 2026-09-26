import React, { useRef } from "react";
import useMedia, { FINE_POINTER, REDUCED_MOTION } from "../hooks/useMedia";

// A card that tilts towards the pointer in 3D, with a soft light following it.
// The outer element carries the scroll-in entrance (reveal) and the inner one
// the tilt, so the two transforms never fight. Touch screens and
// reduced-motion users get a still card; its entrance still plays.
export default function TiltCard({ as: Tag = "div", className = "", reveal = false, delay = 0, max = 7, children, ...rest }) {
  const ref = useRef(null);
  const finePointer = useMedia(FINE_POINTER);
  const reducedMotion = useMedia(REDUCED_MOTION);
  const canTilt = finePointer && !reducedMotion;

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * max * 2}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * max * 2}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <Tag
      ref={ref}
      className={`tilt-wrap ${reveal ? "reveal" : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      onMouseMove={canTilt ? onMove : undefined}
      onMouseLeave={canTilt ? onLeave : undefined}
      {...rest}
    >
      <div className={`tilt ${canTilt ? "tilt-on" : ""} ${className}`}>
        {children}
        {canTilt && <span className="tilt-glare" aria-hidden="true" />}
      </div>
    </Tag>
  );
}
