import React from "react";
import { FiAward, FiBookOpen, FiCalendar } from "react-icons/fi";
import { education } from "../data/profile";
import SectionHeader from "./SectionHeader";
import TiltCard from "./TiltCard";

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <SectionHeader eyebrow="Education" title="Academic background" />
        <ol className="timeline">
          {education.map((e) => (
            <li key={e.level} className="timeline-item reveal">
              <span className="timeline-dot" aria-hidden="true"><FiBookOpen /></span>
              <TiltCard className="card edu-card" max={4}>
                <div className="card-head">
                  <div>
                    <span className="edu-level">{e.level}</span>
                    <h3 className="card-title">{e.degree}</h3>
                    <p className="card-subtitle">{e.school}</p>
                    {e.board && <p className="edu-board">{e.board}</p>}
                  </div>
                  <div className="card-meta">
                    <span><FiCalendar /> {e.period}</span>
                  </div>
                </div>
                <div className="edu-body">
                  {e.score && (
                    <div className="edu-score">
                      <span className="edu-score-value gradient-text">{e.score.value}</span>
                      <span className="edu-score-detail">{e.score.detail}</span>
                    </div>
                  )}
                  <ul className="highlights highlights-compact">
                    {e.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
                {e.score && <FiAward className="edu-watermark" aria-hidden="true" />}
              </TiltCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
