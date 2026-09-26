import React from "react";
import { skillGroups } from "../data/profile";
import SectionHeader from "./SectionHeader";
import TiltCard from "./TiltCard";
import { TechIcon } from "./techIcons";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Skills"
          title="Technologies I work with"
          intro="The tools I use in my work and projects, grouped by area."
        />
        <div className="skills-grid">
          {skillGroups.map((group, i) => (
            <TiltCard key={group.title} className="card skill-card" reveal delay={i * 60}>
              <h3 className="skill-title">{group.title}</h3>
              <ul className="skill-list">
                {group.items.map((item) => (
                  <li key={item}>
                    <TechIcon name={item} />
                    {item}
                  </li>
                ))}
              </ul>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
