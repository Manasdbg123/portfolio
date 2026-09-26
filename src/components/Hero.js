import React from "react";
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail, FiMapPin } from "react-icons/fi";
import { profile, stats } from "../data/profile";
import ProfileOrb from "./ProfileOrb";

// The first screen is the full "About" section: who Kaustuk is, what he does,
// the key facts and numbers, and the portrait.
export default function Hero() {
  return (
    <section id="about" className="hero">
      <div className="container hero-grid">
        <div className="hero-visual reveal">
          <ProfileOrb name={profile.name} />
        </div>

        <div className="hero-copy">
          <p className="eyebrow reveal">
            <FiMapPin /> {profile.role} · {profile.location}
          </p>
          <h1 className="hero-name reveal">
            Hi, I'm <span className="gradient-text">{profile.name}</span>
          </h1>
          <p className="hero-headline reveal">{profile.headline}</p>

          <div className="hero-about reveal">
            {profile.about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <dl className="hero-facts reveal">
            {profile.facts.map(({ label, value }) => (
              <div key={label} className="hero-fact">
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <div className="hero-stats reveal">
            {stats.map((s) => (
              <div key={s.label} className="stat">
                <span className="stat-value gradient-text">{s.value}</span>
                <span className="stat-label">{s.label}</span>
                <span className="stat-note">{s.note}</span>
              </div>
            ))}
          </div>

          <div className="hero-actions reveal">
            <a className="btn btn-primary" href={profile.resume} target="_blank" rel="noreferrer">
              <FiDownload /> Download résumé
            </a>
            <a className="btn btn-ghost" href="#contact">
              Get in touch <FiArrowRight />
            </a>
            <div className="hero-socials">
              <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <FiGithub />
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <FiMail />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
