import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { SiCodeforces, SiLeetcode } from "react-icons/si";
import { FaTrophy } from "react-icons/fa";
import { achievements } from "../data/profile";
import SectionHeader from "./SectionHeader";
import TiltCard from "./TiltCard";

const ICONS = { Codeforces: SiCodeforces, LeetCode: SiLeetcode };

export default function Achievements() {
  return (
    <section id="achievements" className="section">
      <div className="container">
        <SectionHeader eyebrow="Achievements" title="Competitive programming" />
        <div className="achievements-grid">
          {achievements.map((a, i) => {
            const Icon = ICONS[a.platform] || FaTrophy;
            const body = (
              <>
                <span className="achievement-icon"><Icon aria-hidden="true" /></span>
                <p className="achievement-platform">{a.platform}</p>
                <p className="achievement-value gradient-text">{a.value}</p>
                <h3 className="achievement-title">{a.title}</h3>
                <p className="achievement-detail">{a.detail}</p>
                {a.link && (
                  <span className="achievement-link">
                    View profile <FiArrowUpRight />
                  </span>
                )}
              </>
            );
            return a.link ? (
              <TiltCard
                key={a.platform}
                as="a"
                href={a.link}
                target="_blank"
                rel="noreferrer"
                className="card achievement"
                reveal
                delay={i * 80}
              >
                {body}
              </TiltCard>
            ) : (
              <TiltCard key={a.platform} className="card achievement" reveal delay={i * 80}>
                {body}
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
