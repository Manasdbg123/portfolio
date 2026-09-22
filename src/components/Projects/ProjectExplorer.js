import React, { useMemo, useState } from "react";
import useReveal from "../../lib/useReveal";
import { explorerProjects, experimentProjects, REPO_COUNT, GITHUB_PROFILE } from "../../data/projects";
import "./projects.css";

const FILTERS = ["All", "Backend", "Full Stack", "AI", "AI / Backend", "Web"];

export default function ProjectExplorer() {
  const ref = useReveal();
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => {
    return explorerProjects.filter((p) => {
      const matchesFilter = filter === "All" || p.category === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline?.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <section className="os-section" id="projects" ref={ref}>
      <div className="os-container">
        <div className="os-eyebrow os-reveal">ALL PROJECTS</div>
        <h2 className="os-h2 os-reveal">{REPO_COUNT} repositories on GitHub.</h2>
        <p className="os-body os-reveal" style={{ marginBottom: 32 }}>
          Every substantial repository, searchable and filterable — expand a
          card for the full write-up. Smaller experiments and DSA practice
          are listed further down.
        </p>

        <div className="os-reveal os-explorer-controls">
          <div className="os-explorer-search">
            <span className="os-mono">⌘K</span>
            <input
              type="text"
              placeholder="Search projects… (spring, kafka, ai, react)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search projects"
            />
          </div>
          <div className="os-explorer-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`os-filter-chip ${filter === f ? "is-active" : ""}`}
                onClick={() => setFilter(f)}
                type="button"
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="os-mono os-reveal" style={{ margin: "18px 0", color: "var(--os-text-faint)" }}>
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </div>

        <div className="os-explorer-list os-reveal">
          {filtered.map((p, i) => {
            const isOpen = expanded === p.slug;
            return (
              <div key={p.slug} className={`os-explorer-item ${isOpen ? "is-open" : ""}`}>
                <button
                  type="button"
                  className="os-explorer-row"
                  onClick={() => setExpanded(isOpen ? null : p.slug)}
                  aria-expanded={isOpen}
                  data-cursor="EXPLAIN"
                >
                  <span className="os-mono os-explorer-index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="os-explorer-main">
                    <span className="os-explorer-name">
                      {p.name}
                      {p.tier === "flagship" && <span className="os-tag os-tag-accent">FLAGSHIP</span>}
                    </span>
                    <span className="os-explorer-tagline">{p.tagline}</span>
                    <span className="os-explorer-preview">
                      {p.highlights ? p.highlights[0] : p.description}
                    </span>
                  </span>
                  <span className="os-explorer-tech">
                    {p.technologies.slice(0, 4).map((t) => (
                      <span className="os-tag" key={t}>{t}</span>
                    ))}
                  </span>
                  <span className={`os-explorer-arrow ${isOpen ? "is-open" : ""}`} aria-hidden="true">⌄</span>
                </button>

                {isOpen && (
                  <div className="os-explorer-expand">
                    <p className="os-body">{p.description}</p>
                    {p.highlights && (
                      <ul className="os-explorer-highlights">
                        {p.highlights.map((h) => (
                          <li key={h} className="os-body">{h}</li>
                        ))}
                      </ul>
                    )}
                    <div className="os-explorer-expand-tech">
                      {p.technologies.map((t) => (
                        <span className="os-tag" key={t}>{t}</span>
                      ))}
                    </div>
                    <div className="os-explorer-expand-actions">
                      <a className="os-btn" href={p.githubUrl} target="_blank" rel="noreferrer" data-cursor="OPEN">
                        View source ↗
                      </a>
                      {p.liveUrl && (
                        <a className="os-btn" href={p.liveUrl} target="_blank" rel="noreferrer" data-cursor="OPEN">
                          Live demo ↗
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="os-explorer-empty os-mono">No projects match "{query}".</div>
          )}
        </div>

        <div className="os-reveal os-experiments">
          <div className="os-mono os-stack-group-title" style={{ marginTop: 56, marginBottom: 16 }}>
            EXPERIMENTS &amp; DSA
          </div>
          <div className="os-experiments-grid">
            {experimentProjects.map((p) => (
              <a key={p.slug} href={p.githubUrl} target="_blank" rel="noreferrer" className="os-experiment-chip" data-cursor="VIEW">
                <span>{p.name}</span>
                <span className="os-mono os-experiment-lang">{p.language}</span>
              </a>
            ))}
            <a href={GITHUB_PROFILE} target="_blank" rel="noreferrer" className="os-experiment-chip os-experiment-more" data-cursor="OPEN">
              + view all on GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
