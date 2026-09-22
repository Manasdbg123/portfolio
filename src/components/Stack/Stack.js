import React, { useMemo } from "react";
import useReveal from "../../lib/useReveal";
import projects from "../../data/projects";
import "./stack.css";

// Derives a technology → project-count table directly from the project
// registry, so the stack section can never drift from what's actually
// in the repositories.
function buildStack() {
  const counts = {};
  projects.forEach((p) => {
    (p.technologies || []).forEach((t) => {
      counts[t] = (counts[t] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
}

const GROUPS = {
  Languages: ["Java", "Python", "TypeScript", "JavaScript"],
  "Frameworks & Runtimes": ["Spring Boot", "FastAPI", "Flask", "Express", "React"],
  "Data & Messaging": ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Kafka", "SQLAlchemy", "Hibernate", "Flyway"],
  "Security & API": ["Spring Security", "JWT", "Swagger / OpenAPI", "Stripe"],
  "Infra & AI": ["Docker", "Kubernetes", "Anthropic", "LangChain", "PyTorch", "scikit-learn"],
};

export default function Stack() {
  const ref = useReveal();
  const stack = useMemo(buildStack, []);
  const byName = useMemo(() => Object.fromEntries(stack.map((s) => [s.name, s.count])), [stack]);

  return (
    <section className="os-section" id="stack" ref={ref}>
      <div className="os-container">
        <div className="os-eyebrow os-reveal">STACK</div>
        <h2 className="os-h2 os-reveal">Technology ecosystem.</h2>
        <p className="os-body os-reveal" style={{ marginBottom: 40 }}>
          Counted directly from the project registry — the number next to each
          technology is how many of my repositories actually use it.
        </p>

        <div className="os-stack-groups os-reveal">
          {Object.entries(GROUPS).map(([group, techs]) => {
            const present = techs.filter((t) => byName[t]);
            if (!present.length) return null;
            return (
              <div className="os-stack-group" key={group}>
                <div className="os-mono os-stack-group-title">{group}</div>
                <div className="os-stack-chips">
                  {present
                    .sort((a, b) => byName[b] - byName[a])
                    .map((t) => (
                      <span className="os-stack-chip" key={t}>
                        {t}
                        <span className="os-stack-chip-count">{byName[t]}</span>
                      </span>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
