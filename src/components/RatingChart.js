import React, { useMemo } from "react";

// Rating after every rated contest, drawn as an area chart.
export default function RatingChart({ history, color }) {
  const W = 600;
  const H = 150;
  const pad = 8;
  const chart = useMemo(() => {
    if (!history || history.length < 2) return null;
    const rs = history.map((h) => h.r);
    const min = Math.floor((Math.min(...rs) - 50) / 100) * 100;
    const max = Math.ceil((Math.max(...rs) + 50) / 100) * 100;
    const x = (i) => pad + (i / (history.length - 1)) * (W - pad * 2);
    const y = (r) => H - pad - ((r - min) / (max - min)) * (H - pad * 2);
    const line = history.map((h, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(h.r).toFixed(1)}`).join(" ");
    const peakIdx = rs.indexOf(Math.max(...rs));
    return { line, area: `${line} L${x(history.length - 1)},${H} L${x(0)},${H} Z`, peak: { x: x(peakIdx), y: y(rs[peakIdx]), r: rs[peakIdx] }, min, max };
  }, [history]);

  if (!chart) return null;
  const first = new Date(history[0].t * 1000).getFullYear();
  const last = new Date(history[history.length - 1].t * 1000).getFullYear();
  return (
    <figure className="rating-chart">
      <figcaption>
        <span>Rating history</span>
        <span>{history.length} rated contests · {first === last ? first : `${first}–${last}`}</span>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label={`Codeforces rating over ${history.length} contests, peaking at ${chart.peak.r}`}>
        <defs>
          <linearGradient id="cf-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.45" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={chart.area} fill="url(#cf-area)" />
        <path d={chart.line} fill="none" stroke={color} strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        <circle cx={chart.peak.x} cy={chart.peak.y} r="5" fill="#fff" stroke={color} strokeWidth="3" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="rating-chart-scale"><span>{chart.min}</span><span>Peak {chart.peak.r}</span><span>{chart.max}</span></div>
    </figure>
  );
}
