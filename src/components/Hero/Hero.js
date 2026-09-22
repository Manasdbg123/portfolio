import React, { useRef } from "react";
import useReveal from "../../lib/useReveal";
import useCanRender3D from "../../lib/useCanRender3D";
import HeroCanvas from "../Hero3D/HeroCanvas";
import portrait from "../../Assets/kaustuk-photo.jpeg";
import "./hero.css";

export default function Hero() {
  const ref = useReveal();
  const sectionRef = useRef(null);
  const { can: can3D, reducedMotion } = useCanRender3D();

  return (
    <section
      className={`os-hero ${can3D ? "os-hero-3d" : ""}`}
      id="home"
      ref={(el) => {
        sectionRef.current = el;
        ref.current = el;
      }}
    >
      {can3D && <HeroCanvas scrollTriggerRef={sectionRef} reducedMotion={reducedMotion} />}
      <div className="os-container os-hero-inner">
        <div className="os-hero-id os-reveal">
          <span className="os-hero-id-photo">
            <img src={portrait} alt="Kumar Kaustuk Raj" />
          </span>
          <span className="os-mono os-hero-tag">MANAS // ENGINEERING OS</span>
        </div>
        <h1 className="os-h1 os-reveal" style={{ transitionDelay: "60ms" }}>
          KUMAR
          <br />
          KAUSTUK RAJ
        </h1>
        <div className="os-hero-role os-reveal" style={{ transitionDelay: "140ms" }}>
          <span>SOFTWARE DEVELOPER</span>
          <span className="os-hero-dot">·</span>
          <span className="os-mono">Java / Spring Boot / AI-Driven Backend Systems</span>
        </div>
        <p className="os-body os-reveal" style={{ transitionDelay: "200ms" }}>
          I build backend systems and the agentic LLM workflows running on top
          of them — services that stay correct under concurrent load, decompose
          cleanly, and fail predictably. This site is one of them.
        </p>
        <div className="os-hero-actions os-reveal" style={{ transitionDelay: "260ms" }}>
          <a className="os-btn os-btn-primary" href="#system" data-cursor="EXPLORE">
            Explore the system
          </a>
          <a
            className="os-btn"
            href="https://github.com/Manasdbg123"
            target="_blank"
            rel="noreferrer"
            data-cursor="OPEN"
          >
            GitHub ↗
          </a>
        </div>
      </div>
      <div className="os-hero-scroll os-mono">SCROLL</div>
    </section>
  );
}
