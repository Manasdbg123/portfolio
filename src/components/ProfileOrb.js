import React, { useRef } from "react";
import photo from "../images/profile.jpg";
import { TechIcon } from "./techIcons";
import useMedia, { FINE_POINTER, REDUCED_MOTION } from "../hooks/useMedia";

// The large circular portrait, held inside two orbiting 3D rings with the
// core technologies floating around it. It leans towards the pointer on
// desktop and sways gently on its own on touch screens.
const BADGES = [
  { name: "Java", pos: "b1" },
  { name: "Spring Boot", pos: "b2" },
  { name: "Python", pos: "b3" },
  { name: "FastAPI", pos: "b4" },
  { name: "LLM Agents", pos: "b5" },
];

export default function ProfileOrb({ name }) {
  const ref = useRef(null);
  const finePointer = useMedia(FINE_POINTER);
  const reducedMotion = useMedia(REDUCED_MOTION);
  const canTilt = finePointer && !reducedMotion;

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--orb-rx", `${-y * 16}deg`);
    el.style.setProperty("--orb-ry", `${x * 16}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--orb-rx", "0deg");
    ref.current?.style.setProperty("--orb-ry", "0deg");
  };

  return (
    <div
      className={`orb ${canTilt ? "" : "orb-sway"}`}
      ref={ref}
      onMouseMove={canTilt ? onMove : undefined}
      onMouseLeave={canTilt ? onLeave : undefined}
    >
      <div className="orb-stage">
        <span className="orb-ring orb-ring-1" aria-hidden="true"><i /></span>
        <span className="orb-ring orb-ring-2" aria-hidden="true"><i /></span>
        <div className="orb-photo">
          <img src={photo} alt={`Portrait of ${name}`} width="900" height="900" />
        </div>
        {BADGES.map(({ name: tech, pos }) => (
          <span key={tech} className={`orb-badge orb-${pos}`}>
            <TechIcon name={tech} /> {tech}
          </span>
        ))}
      </div>
      <span className="orb-status">
        <span className="orb-status-dot" /> Open to opportunities
      </span>
    </div>
  );
}
