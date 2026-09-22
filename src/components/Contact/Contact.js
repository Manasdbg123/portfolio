import React from "react";
import { Link } from "react-router-dom";
import useReveal from "../../lib/useReveal";
import "./contact.css";

export default function Contact() {
  const ref = useReveal();
  return (
    <section className="os-section os-contact" id="contact" ref={ref}>
      <div className="os-container">
        <div className="os-eyebrow os-reveal">CONTACT</div>
        <h2 className="os-h1 os-reveal os-contact-heading">
          LET'S BUILD
          <br />
          SOMETHING <span className="os-accent">WORTH SHIPPING.</span>
        </h2>

        <div className="os-reveal os-contact-links">
          <a className="os-link-underline os-mono" href="https://github.com/Manasdbg123" target="_blank" rel="noreferrer" data-cursor="OPEN">
            GitHub
          </a>
          <a className="os-link-underline os-mono" href="https://www.linkedin.com/in/kaustuk-raj-63a240226/" target="_blank" rel="noreferrer" data-cursor="OPEN">
            LinkedIn
          </a>
          <a className="os-link-underline os-mono" href="https://codeforces.com/profile/manasraj123" target="_blank" rel="noreferrer" data-cursor="OPEN">
            Codeforces
          </a>
          <a className="os-link-underline os-mono" href="https://leetcode.com/u/manas-12345/" target="_blank" rel="noreferrer" data-cursor="OPEN">
            LeetCode
          </a>
          <Link className="os-link-underline os-mono" to="/resume" data-cursor="VIEW">
            Resume
          </Link>
        </div>
      </div>
    </section>
  );
}
