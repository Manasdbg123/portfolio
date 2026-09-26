import React, { useState } from "react";
import { FiArrowUpRight, FiChevronDown, FiGithub } from "react-icons/fi";
import { featuredProjects, moreProjects, profile } from "../data/profile";
import SectionHeader from "./SectionHeader";
import TiltCard from "./TiltCard";
import { TechTag } from "./techIcons";

function ProjectLinks({ github, live }) {
  return (
    <div className="project-links">
      <a href={github} target="_blank" rel="noreferrer" className="link-btn">
        <FiGithub /> Code
      </a>
      {live && (
        <a href={live} target="_blank" rel="noreferrer" className="link-btn">
          <FiArrowUpRight /> Live demo
        </a>
      )}
    </div>
  );
}

const INITIAL_MORE = 6;

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? moreProjects : moreProjects.slice(0, INITIAL_MORE);

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Projects"
          title="Selected work"
          intro="The two projects on my résumé in detail, followed by more of what I've built. Every card links to its source code."
        />

        <div className="featured-grid">
          {featuredProjects.map((p, i) => (
            <TiltCard key={p.name} className="card project-featured" reveal delay={i * 80}>
              <div className="project-featured-top">
                <span className="project-badge">Featured</span>
                <span className="project-period">{p.period}</span>
              </div>
              <h3 className="card-title card-title-lg">{p.name}</h3>
              <p className="project-summary">{p.summary}</p>
              <ul className="highlights">
                {p.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
              <div className="tags">
                {p.technologies.map((t) => <TechTag key={t} name={t} />)}
              </div>
              <ProjectLinks github={p.github} live={p.live} />
            </TiltCard>
          ))}
        </div>

        <h3 className="subheading reveal">More projects</h3>
        <div className="project-grid">
          {visible.map((p) => (
            <TiltCard key={p.name} className="card project-card" reveal>
              <h4 className="card-title">{p.name}</h4>
              <p className="project-summary">{p.summary}</p>
              <div className="tags tags-small">
                {p.technologies.map((t) => <TechTag key={t} name={t} />)}
              </div>
              <ProjectLinks github={p.github} live={p.live} />
            </TiltCard>
          ))}
        </div>

        <div className="center-row">
          {moreProjects.length > INITIAL_MORE && (
            <button type="button" className="btn btn-ghost" onClick={() => setShowAll((v) => !v)} aria-expanded={showAll}>
              {showAll ? "Show fewer" : `Show all ${moreProjects.length} projects`}
              <FiChevronDown className={showAll ? "flip" : ""} />
            </button>
          )}
          <a className="btn btn-ghost" href={profile.links.github} target="_blank" rel="noreferrer">
            <FiGithub /> Everything on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
