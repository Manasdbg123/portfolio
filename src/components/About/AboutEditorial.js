import React from "react";
import useReveal from "../../lib/useReveal";
import { codingStats } from "../../data/projects";
import portrait from "../../Assets/kaustuk-photo.jpeg";
import "./about-editorial.css";

export default function AboutEditorial() {
  const ref = useReveal();
  return (
    <section className="os-section" id="about" ref={ref}>
      <div className="os-container os-about-grid">
        <div>
          <div className="os-eyebrow os-reveal">ABOUT</div>
          <h2 className="os-h2 os-reveal os-about-statement">
            I BUILD
            <br />
            <span className="os-accent">RELIABLE</span>
            <br />
            SYSTEMS.
          </h2>
          <div className="os-about-portrait os-reveal">
            <span className="os-about-portrait-corner os-about-portrait-corner-tl" aria-hidden="true" />
            <span className="os-about-portrait-corner os-about-portrait-corner-br" aria-hidden="true" />
            <img src={portrait} alt="Kumar Kaustuk Raj" />
            <div className="os-about-portrait-caption os-mono">
              <span>KUMAR KAUSTUK RAJ</span>
              <span className="os-about-portrait-status">
                <span className="os-about-portrait-dot" /> AVAILABLE
              </span>
            </div>
          </div>
        </div>
        <div className="os-reveal">
          <p className="os-body">
            I'm a Software Developer building AI-driven backend systems —
            agentic LLM workflows, RAG pipelines, and the REST services and
            data layers underneath them. B.Tech in Computer Science from{" "}
            <strong className="os-text-strong">NIT Andhra Pradesh</strong>{" "}
            (2021–2025).
          </p>
          <p className="os-body">
            Most of what I build is in <strong className="os-text-strong">Java and
            Spring Boot</strong>, with Python/FastAPI for AI and data-heavy work.
            I reach for PostgreSQL and Redis for state, Kafka when services need
            to talk asynchronously, and Docker/Kubernetes to run it all.
          </p>
          <p className="os-body">
            Outside of building, I compete: <strong className="os-text-strong">
            {codingStats.problemsSolved} problems solved</strong> across
            Codeforces, LeetCode, GeeksforGeeks and InterviewBit —{" "}
            {codingStats.codeforcesTitle} on Codeforces,{" "}
            {codingStats.leetcodeTitle} on LeetCode. The terminal below has
            the exact numbers.
          </p>
          <div className="os-about-stats">
            <div className="os-about-stat">
              <div className="os-mono os-accent">{codingStats.codeforcesRating}</div>
              <div className="os-mono os-about-stat-label">Codeforces ({codingStats.codeforcesTitle})</div>
            </div>
            <div className="os-about-stat">
              <div className="os-mono os-accent">{codingStats.leetcodeRating}</div>
              <div className="os-mono os-about-stat-label">LeetCode Rating ({codingStats.leetcodeTitle})</div>
            </div>
            <div className="os-about-stat">
              <div className="os-mono os-accent">{codingStats.problemsSolved}</div>
              <div className="os-mono os-about-stat-label">Problems solved</div>
            </div>
            <div className="os-about-stat">
              <div className="os-mono os-accent">42</div>
              <div className="os-mono os-about-stat-label">Public repositories</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
