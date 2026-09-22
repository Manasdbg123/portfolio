import React, { useRef, useState } from "react";
import useReveal from "../../lib/useReveal";
import { flagshipProjects, REPO_COUNT, codingStats, experience } from "../../data/projects";
import "./terminal.css";

const HELP = [
  "help        show this list",
  "about       who I am",
  "skills      core technologies",
  "projects    featured repositories",
  "system      backend architecture summary",
  "experience  where I've worked",
  "profile     competitive programming stats",
  "github      open my GitHub profile",
  "contact     how to reach me",
  "clear       clear the terminal",
];

function run(cmd) {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case "help":
      return HELP;
    case "about":
      return [
        "Kumar Kaustuk Raj — Software Developer.",
        "Building AI-driven backend systems: agentic LLM workflows, RAG pipelines, REST services.",
        "B.Tech CSE, NIT Andhra Pradesh (2021-2025).",
        "Java / Spring Boot / Python / FastAPI / Distributed Systems.",
      ];
    case "skills":
      return ["Java, Python, TypeScript, SQL", "Spring Boot, FastAPI, React", "PostgreSQL, MySQL, Redis, Kafka", "LLM Agents, RAG, Docker, Kubernetes"];
    case "projects":
      return [
        `Loading repository index...`,
        `${REPO_COUNT} repositories discovered.`,
        "",
        "Featured:",
        ...flagshipProjects.map((p) => `  - ${p.name}`),
      ];
    case "system":
      return ["CLIENT -> API GATEWAY -> SPRING BOOT / FASTAPI -> POSTGRESQL / REDIS / KAFKA -> DOCKER"];
    case "experience":
      return experience.flatMap((job) => [
        `${job.role} @ ${job.company} (${job.period})`,
        ...job.highlights.map((h) => `  - ${h}`),
        "",
      ]);
    case "profile":
      return [
        `Codeforces: ${codingStats.codeforcesRating} (${codingStats.codeforcesTitle}) — ${codingStats.codeforcesGlobalRank}`,
        `LeetCode: ${codingStats.leetcodeRating} (${codingStats.leetcodeTitle}) — ${codingStats.leetcodeGlobalRank}`,
        `Problems solved: ${codingStats.problemsSolved} (Codeforces, LeetCode, GeeksforGeeks, InterviewBit)`,
      ];
    case "github":
      window.open("https://github.com/Manasdbg123", "_blank", "noopener,noreferrer");
      return ["Opening https://github.com/Manasdbg123 ..."];
    case "contact":
      return ["LinkedIn: linkedin.com/in/kaustuk-raj-63a240226", "GitHub: github.com/Manasdbg123", "Email: on résumé"];
    case "":
      return [];
    case "clear":
      return "__CLEAR__";
    default:
      return [`command not found: ${cmd}`, "type 'help' for a list of commands"];
  }
}

export default function Terminal() {
  const ref = useReveal();
  const [history, setHistory] = useState([
    { type: "out", text: "Welcome. Type 'help' to get started." },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    const cmd = input;
    const result = run(cmd);
    if (result === "__CLEAR__") {
      setHistory([]);
    } else {
      setHistory((h) => [
        ...h,
        { type: "cmd", text: cmd },
        ...result.map((line) => ({ type: "out", text: line })),
      ]);
    }
    setInput("");
  };

  return (
    <section className="os-section" id="terminal" ref={ref}>
      <div className="os-container">
        <div className="os-eyebrow os-reveal">TERMINAL</div>
        <h2 className="os-h2 os-reveal">Explore it as a shell.</h2>
        <p className="os-body os-reveal" style={{ marginBottom: 32 }}>
          Optional — try <code>projects</code>, <code>system</code>, or{" "}
          <code>help</code>.
        </p>

        <div className="os-terminal os-reveal" onClick={() => inputRef.current?.focus()}>
          <div className="os-terminal-titlebar">
            <span className="os-terminal-dot" style={{ background: "#ff5f56" }} />
            <span className="os-terminal-dot" style={{ background: "#ffbd2e" }} />
            <span className="os-terminal-dot" style={{ background: "#27c93f" }} />
            <span className="os-mono os-terminal-title">manas@engineering-os</span>
          </div>
          <div className="os-terminal-body">
            {history.map((line, i) => (
              <div key={i} className={`os-terminal-line ${line.type === "cmd" ? "os-terminal-cmd" : ""}`}>
                {line.type === "cmd" ? <span className="os-terminal-prompt">$ {line.text}</span> : line.text}
              </div>
            ))}
            <form onSubmit={submit} className="os-terminal-line os-terminal-input-row">
              <span className="os-terminal-prompt">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
                spellCheck="false"
                aria-label="Terminal command input"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
