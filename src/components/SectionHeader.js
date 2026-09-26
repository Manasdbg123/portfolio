import React from "react";

export default function SectionHeader({ eyebrow, title, intro }) {
  return (
    <header className="section-header reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </header>
  );
}
