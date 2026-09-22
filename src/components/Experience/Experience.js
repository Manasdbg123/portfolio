import React from "react";
import useReveal from "../../lib/useReveal";
import { experience } from "../../data/projects";
import "./experience.css";

// Real work experience, sourced from the résumé. Not every project built at
// Wittybrains has a public repository, so it's represented here rather than
// invented into the GitHub-backed project registry.
export default function Experience() {
  const ref = useReveal();
  return (
    <section className="os-section" id="experience" ref={ref}>
      <div className="os-container">
        <div className="os-eyebrow os-reveal">EXPERIENCE</div>
        <h2 className="os-h2 os-reveal">Where I've built this.</h2>

        <div className="os-experience-list">
          {experience.map((job) => (
            <div className="os-experience-item os-reveal" key={job.company}>
              <div className="os-experience-head">
                <div>
                  <h3 className="os-h3">{job.role}</h3>
                  <div className="os-mono os-experience-company">{job.company} · {job.location}</div>
                </div>
                <div className="os-mono os-experience-period">{job.period}</div>
              </div>
              <ul className="os-experience-highlights">
                {job.highlights.map((h) => (
                  <li key={h} className="os-body">{h}</li>
                ))}
              </ul>
              <div className="os-experience-tech">
                {job.technologies.map((t) => (
                  <span className="os-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
