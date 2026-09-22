import React from "react";

// Each project gets a diagram that matches its actual mechanism —
// not a generic animation reused everywhere.
const STEPS = {
  microservices: ["CLIENT", "API GATEWAY", "DISCOVERY", "SERVICES", "DATABASE"],
  webapp: ["UI", "INTERACTION", "STATE", "API", "RESULT"],
  "ai-pipeline": ["INPUT", "PREPROCESS", "MODEL / INFERENCE", "AUDIT LOG", "OUTPUT"],
  queue: ["REQUEST", "HOLD (REDIS)", "IDEMPOTENCY CHECK", "COMMIT", "CONFIRMED"],
};

function LinearDiagram({ steps }) {
  return (
    <div className="os-diagram os-diagram-linear">
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div className="os-diagram-step">{s}</div>
          {i < steps.length - 1 && <div className="os-diagram-arrow">→</div>}
        </React.Fragment>
      ))}
    </div>
  );
}

function ConcurrencyDiagram() {
  return (
    <div className="os-diagram os-diagram-concurrency">
      <div className="os-diagram-row">
        <div className="os-diagram-step">USER A</div>
        <div className="os-diagram-step">USER B</div>
      </div>
      <div className="os-diagram-arrow os-diagram-arrow-down">↓ ↓</div>
      <div className="os-diagram-step os-diagram-step-wide">SAME VEHICLE, SAME WINDOW</div>
      <div className="os-diagram-arrow os-diagram-arrow-down">↓</div>
      <div className="os-diagram-step os-diagram-step-wide">VERSION CHECK (OPTIMISTIC LOCK)</div>
      <div className="os-diagram-arrow os-diagram-arrow-down">↓</div>
      <div className="os-diagram-row">
        <div className="os-diagram-step os-diagram-step-ok">A → CONFIRMED</div>
        <div className="os-diagram-step os-diagram-step-fail">B → CONFLICT</div>
      </div>
    </div>
  );
}

export default function ProjectDiagram({ type }) {
  if (type === "concurrency") return <ConcurrencyDiagram />;
  const steps = STEPS[type] || STEPS.webapp;
  return <LinearDiagram steps={steps} />;
}
