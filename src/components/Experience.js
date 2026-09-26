import React from "react";
import { FiBriefcase, FiCalendar, FiMapPin } from "react-icons/fi";
import { experience } from "../data/profile";
import SectionHeader from "./SectionHeader";
import TiltCard from "./TiltCard";
import { TechTag } from "./techIcons";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeader eyebrow="Experience" title="Where I work and what I've built there" />

        <ol className="timeline">
          {experience.map((job) => (
            <li key={job.company} className="timeline-item reveal">
              <span className="timeline-dot" aria-hidden="true"><FiBriefcase /></span>
              <TiltCard className="card" max={4}>
                <div className="card-head">
                  <div>
                    <h3 className="card-title">{job.role}</h3>
                    <p className="card-subtitle">{job.company}</p>
                  </div>
                  <div className="card-meta">
                    <span><FiCalendar /> {job.period}</span>
                    <span><FiMapPin /> {job.location}</span>
                  </div>
                </div>
                <ul className="highlights">
                  {job.highlights.map((h) => (
                    <li key={h.title}>
                      <strong>{h.title}.</strong> {h.text}
                    </li>
                  ))}
                </ul>
                <div className="tags">
                  {job.technologies.map((t) => <TechTag key={t} name={t} />)}
                </div>
              </TiltCard>
            </li>
          ))}

        </ol>
      </div>
    </section>
  );
}
