import React, { useState } from "react";
import useReveal from "../../lib/useReveal";
import useCanRender3D from "../../lib/useCanRender3D";
import { flagshipProjects } from "../../data/projects";
import ProjectDiagram from "./ProjectDiagram";
import ProjectCarousel3D from "../Carousel3D/ProjectCarousel3D";
import "./projects.css";

export default function FeaturedProjects() {
  const ref = useReveal();
  const { can: can3D, reducedMotion } = useCanRender3D();
  const [active, setActive] = useState(flagshipProjects[0].slug);
  const project = flagshipProjects.find((p) => p.slug === active);

  return (
    <section className="os-section" id="work" ref={ref}>
      <div className="os-container">
        <div className="os-eyebrow os-reveal">FEATURED PROJECTS</div>
        <h2 className="os-h2 os-reveal">Case studies, not cards.</h2>
        <p className="os-body os-reveal" style={{ marginBottom: 40 }}>
          {flagshipProjects.length} systems selected for engineering depth. Each
          one is the actual architecture from its repository.
        </p>

        {can3D && (
          <div className="os-carousel3d-fade-in">
            <ProjectCarousel3D
              projects={flagshipProjects}
              activeSlug={active}
              onSelect={setActive}
              reducedMotion={reducedMotion}
            />
          </div>
        )}

        <div className="os-reveal os-featured">
          <div className="os-featured-tabs" role="tablist" aria-label="Featured projects">
            {flagshipProjects.map((p) => (
              <button
                key={p.slug}
                role="tab"
                aria-selected={active === p.slug}
                className={`os-featured-tab ${active === p.slug ? "is-active" : ""}`}
                onClick={() => setActive(p.slug)}
                type="button"
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="os-featured-body">
            <div className="os-featured-case">
              <div className="os-mono os-featured-tagline">{project.tagline}</div>

              <div className="os-featured-story">
                <div>
                  <div className="os-mono os-featured-label">PROBLEM</div>
                  <p className="os-body">{project.story.problem}</p>
                </div>
                <div>
                  <div className="os-mono os-featured-label">ARCHITECTURE</div>
                  <p className="os-body">{project.story.architecture}</p>
                </div>
                <div>
                  <div className="os-mono os-featured-label">ENGINEERING CHALLENGE</div>
                  <p className="os-body">{project.story.challenge}</p>
                </div>
                <div>
                  <div className="os-mono os-featured-label">RESULT</div>
                  <p className="os-body">{project.story.result}</p>
                </div>
              </div>

              <div className="os-featured-tech">
                {project.technologies.map((t) => (
                  <span className="os-tag" key={t}>{t}</span>
                ))}
              </div>

              <div className="os-featured-actions">
                <a className="os-btn os-btn-primary" href={project.githubUrl} target="_blank" rel="noreferrer" data-cursor="OPEN">
                  View source ↗
                </a>
                {project.liveUrl && (
                  <a className="os-btn" href={project.liveUrl} target="_blank" rel="noreferrer" data-cursor="OPEN">
                    Live demo ↗
                  </a>
                )}
              </div>
            </div>

            <div className="os-featured-visual">
              <div className="os-mono os-featured-label">{project.diagram === "concurrency" ? "CONCURRENCY CONTROL" : "REQUEST FLOW"}</div>
              <ProjectDiagram type={project.diagram} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
