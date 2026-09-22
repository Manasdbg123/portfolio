import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./nav.css";

const LINKS = [
  { href: "#system", label: "SYSTEM" },
  { href: "#stack", label: "STACK" },
  { href: "#work", label: "WORK" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#experience", label: "EXPERIENCE" },
  { href: "#about", label: "ABOUT" },
  { href: "#competitive", label: "CP" },
  { href: "#contact", label: "CONTACT" },
];

export default function OsNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`os-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="os-container os-nav-inner">
        <Link to="/" className="os-nav-brand os-mono" onClick={() => setOpen(false)}>
          MANAS<span className="os-accent">.</span>
        </Link>

        {onHome && (
          <nav className="os-nav-links os-mono" aria-label="Section navigation">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
          </nav>
        )}

        <button
          className="os-nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="os-nav-mobile os-mono">
          {onHome ? (
            LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))
          ) : (
            <Link to="/" onClick={() => setOpen(false)}>HOME</Link>
          )}
          <Link to="/resume" onClick={() => setOpen(false)}>RESUME</Link>
          <Link to="/codingprofile" onClick={() => setOpen(false)}>CODING PROFILE</Link>
        </div>
      )}
    </header>
  );
}
