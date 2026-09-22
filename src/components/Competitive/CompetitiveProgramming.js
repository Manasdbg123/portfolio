import React from "react";
import useReveal from "../../lib/useReveal";
import { codingStats } from "../../data/projects";
import "./competitive.css";

// A visible, on-homepage showcase of verified competitive-programming
// results — sourced from the résumé (see codingStats in data/projects.js).
export default function CompetitiveProgramming() {
  const ref = useReveal();
  return (
    <section className="os-section" id="competitive" ref={ref}>
      <div className="os-container">
        <div className="os-eyebrow os-reveal">COMPETITIVE PROGRAMMING</div>
        <h2 className="os-h2 os-reveal">{codingStats.problemsSolved} problems. Two rated profiles.</h2>
        <p className="os-body os-reveal" style={{ marginBottom: 40 }}>
          Across Codeforces, LeetCode, GeeksforGeeks and InterviewBit — the two
          rated accounts below.
        </p>

        <div className="os-cp-grid os-reveal">
          <a
            className="os-cp-card"
            href="https://codeforces.com/profile/manasraj123"
            target="_blank"
            rel="noreferrer"
            data-cursor="OPEN"
          >
            <div className="os-cp-card-head">
              <span className="os-mono os-cp-platform">CODEFORCES</span>
              <span className="os-tag os-tag-accent">{codingStats.codeforcesTitle.toUpperCase()}</span>
            </div>
            <div className="os-cp-rating">{codingStats.codeforcesRating}</div>
            <div className="os-cp-meta os-mono">{codingStats.codeforcesGlobalRank}</div>
            <div className="os-cp-handle os-mono">@manasraj123 ↗</div>
          </a>

          <a
            className="os-cp-card"
            href="https://leetcode.com/u/manas-12345/"
            target="_blank"
            rel="noreferrer"
            data-cursor="OPEN"
          >
            <div className="os-cp-card-head">
              <span className="os-mono os-cp-platform">LEETCODE</span>
              <span className="os-tag os-tag-accent">{codingStats.leetcodeTitle.toUpperCase()}</span>
            </div>
            <div className="os-cp-rating">{codingStats.leetcodeRating}</div>
            <div className="os-cp-meta os-mono">{codingStats.leetcodeGlobalRank}</div>
            <div className="os-cp-handle os-mono">@manas-12345 ↗</div>
          </a>

          <div className="os-cp-card os-cp-card-static">
            <div className="os-cp-card-head">
              <span className="os-mono os-cp-platform">ALL PLATFORMS</span>
            </div>
            <div className="os-cp-rating">{codingStats.problemsSolved}</div>
            <div className="os-cp-meta os-mono">Problems solved</div>
            <div className="os-cp-handle os-mono">Codeforces · LeetCode · GFG · InterviewBit</div>
          </div>
        </div>
      </div>
    </section>
  );
}
