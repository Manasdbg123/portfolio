import React, { useState } from "react";
import useReveal from "../../lib/useReveal";
import "./system.css";

// A real, composite backend architecture — every node is a technology
// actually used across the flagship projects, and every project listed
// on a node is a real repository (see src/data/projects.js).
const LAYERS = [
  {
    id: "client",
    nodes: [{ id: "client", label: "CLIENT", desc: "React / TypeScript single-page apps.", projects: ["OmniWork Platform", "NestXchange", "SeatRush"] }],
  },
  {
    id: "edge",
    nodes: [
      { id: "gateway", label: "API GATEWAY", desc: "Single entry point that routes requests to the right service.", projects: ["OmniWork Platform", "Food Delivery Platform"] },
      { id: "auth", label: "AUTH", desc: "JWT access tokens, rotating hashed refresh tokens, bcrypt.", projects: ["DriveX", "NestXchange", "RentNest"] },
    ],
  },
  {
    id: "core",
    nodes: [
      { id: "springboot", label: "SPRING BOOT", desc: "Domain services — REST APIs, validation, transactions.", projects: ["OmniWork Platform", "DriveX", "Food Delivery Platform"] },
      { id: "fastapi", label: "FASTAPI", desc: "Async Python services for booking and agent orchestration.", projects: ["SeatRush", "Agent Orchestration Engine"] },
    ],
  },
  {
    id: "data",
    nodes: [
      { id: "postgres", label: "POSTGRESQL", desc: "Primary datastore with Flyway-managed migrations.", projects: ["DriveX", "NestXchange", "Agent Orchestration Engine"] },
      { id: "redis", label: "REDIS", desc: "Seat holds, idempotency keys, short-lived locks.", projects: ["SeatRush"] },
      { id: "kafka", label: "KAFKA", desc: "Asynchronous event processing and service decoupling.", projects: ["OmniWork Platform", "Food Delivery Platform"] },
    ],
  },
  {
    id: "ops",
    nodes: [{ id: "docker", label: "DOCKER / K8S", desc: "Containerized services; OmniWork ships Kubernetes manifests.", projects: ["OmniWork Platform", "SeatRush", "DriveX"] }],
  },
];

export default function SystemArchitecture() {
  const ref = useReveal();
  const [hovered, setHovered] = useState(null);

  return (
    <section className="os-section" id="system" ref={ref}>
      <div className="os-container">
        <div className="os-eyebrow os-reveal">SYSTEM</div>
        <h2 className="os-h2 os-reveal">Interactive backend architecture.</h2>
        <p className="os-body os-reveal" style={{ marginBottom: 48 }}>
          A composite of the request paths and infrastructure actually used across
          my backend projects. Hover a node to see what it does and where it's used.
        </p>

        <div className="os-reveal os-system-graph" role="group" aria-label="Backend architecture diagram">
          {LAYERS.map((layer, li) => (
            <React.Fragment key={layer.id}>
              <div className="os-system-layer">
                {layer.nodes.map((n) => (
                  <button
                    key={n.id}
                    className={`os-system-node ${hovered === n.id ? "is-hovered" : ""}`}
                    onMouseEnter={() => setHovered(n.id)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(n.id)}
                    onBlur={() => setHovered(null)}
                    data-cursor="EXPLORE"
                    type="button"
                  >
                    {n.label}
                  </button>
                ))}
              </div>
              {li < LAYERS.length - 1 && <div className="os-system-connector" aria-hidden="true" />}
            </React.Fragment>
          ))}
        </div>

        <div className="os-system-detail os-mono" aria-live="polite">
          {(() => {
            const node = LAYERS.flatMap((l) => l.nodes).find((n) => n.id === hovered);
            if (!node) return <span className="os-text-faint">Hover a node to inspect it.</span>;
            return (
              <>
                <strong className="os-accent">{node.label}</strong>
                <span className="os-system-detail-desc">{node.desc}</span>
                <span className="os-system-detail-projects">
                  {node.projects.map((p) => (
                    <span key={p} className="os-tag">{p}</span>
                  ))}
                </span>
              </>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
