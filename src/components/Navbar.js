import React, { useEffect, useState } from "react";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";
import { navItems, profile } from "../data/profile";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in the middle of the screen.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock page scroll behind the open phone menu, and close it with Escape.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""} ${open ? "nav-open" : ""}`}>
      <div className="container nav-inner">
        <a href="#about" className="nav-logo" onClick={() => setOpen(false)} aria-label="Kaustuk Raj, back to top">
          <span className="nav-logo-mark">KR</span>
          <span className="nav-logo-text">{profile.shortName}</span>
        </a>

        <nav className="nav-links" aria-label="Sections">
          {navItems.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={active === id ? "is-active" : ""}>
              {label}
            </a>
          ))}
        </nav>

        <a className="btn btn-small btn-primary nav-resume" href={profile.resume} target="_blank" rel="noreferrer">
          <FiDownload /> Résumé
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav aria-label="Sections">
          {navItems.map(({ id, label }, i) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} style={{ animationDelay: `${i * 45}ms` }}>
              {label}
            </a>
          ))}
        </nav>
        <a className="btn btn-primary" href={profile.resume} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
          <FiDownload /> Download résumé
        </a>
      </div>
    </header>
  );
}
