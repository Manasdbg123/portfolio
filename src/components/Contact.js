import React from "react";
import { FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiCodeforces, SiLeetcode } from "react-icons/si";
import { profile } from "../data/profile";
import TiltCard from "./TiltCard";

export default function Contact() {
  const { links } = profile;
  return (
    <section id="contact" className="section section-last">
      <div className="container">
        <TiltCard className="card contact-card" reveal max={3}>
          <p className="eyebrow">Contact</p>
          <h2 className="section-title">Let's work together</h2>
          <p className="section-intro">
            I'm open to backend and AI engineering roles and to interesting collaborations.
            The quickest way to reach me is email.
          </p>
          <a className="btn btn-primary btn-large contact-email" href={`mailto:${profile.email}`}>
            <FiMail /> {profile.email}
          </a>
          <div className="contact-links">
            <a href={links.linkedin} target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a>
            <a href={links.github} target="_blank" rel="noreferrer"><FiGithub /> GitHub</a>
            <a href={links.codeforces} target="_blank" rel="noreferrer"><SiCodeforces /> Codeforces</a>
            <a href={links.leetcode} target="_blank" rel="noreferrer"><SiLeetcode /> LeetCode</a>
            <a href={profile.resume} target="_blank" rel="noreferrer"><FiDownload /> Résumé</a>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
