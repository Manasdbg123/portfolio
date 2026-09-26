import React from "react";

// A circular rating gauge: the coloured arc shows progress through the
// current rating band, with the profile picture in the middle.
export default function RatingRing({ progress, color, image, alt, size = 220, children }) {
  const stroke = 12;
  const r = (size - stroke) / 2 - 6;
  const c = 2 * Math.PI * r;
  const p = Math.max(0.04, Math.min(1, progress));
  const id = `ring-${alt.replace(/\W/g, "")}`;
  return (
    <div className="ring" style={{ "--ring": color, width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth={stroke} />
        {/* tick marks around the dial */}
        {Array.from({ length: 60 }).map((_, i) => (
          <line
            key={i}
            x1={size / 2}
            y1={4}
            x2={size / 2}
            y2={i % 5 === 0 ? 10 : 7}
            stroke="rgba(148,163,184,0.35)"
            strokeWidth="1.2"
            transform={`rotate(${i * 6} ${size / 2} ${size / 2})`}
          />
        ))}
        <circle
          className="ring-arc"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c * p} ${c}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="ring-center" style={{ inset: stroke + 18 }}>
        <img src={image} alt={alt} loading="lazy" />
      </div>
      {children}
    </div>
  );
}
