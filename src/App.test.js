import { render, screen } from "@testing-library/react";
import App from "./App";
import { featuredProjects, skillGroups } from "./data/profile";

test("opens on the About section with the name, photo and résumé link", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Kumar Kaustuk Raj");
  expect(screen.getByAltText(/portrait of kumar kaustuk raj/i)).toBeInTheDocument();
  const resumeLinks = screen.getAllByRole("link", { name: /résumé/i });
  expect(resumeLinks.length).toBeGreaterThan(0);
  resumeLinks.forEach((a) => expect(a).toHaveAttribute("href", "/Kaustuk_Raj_CV.pdf"));
});

test("shows every section in a clear order", () => {
  render(<App />);
  const ids = Array.from(document.querySelectorAll("main > section")).map((s) => s.id);
  expect(ids).toEqual(["about", "experience", "projects", "skills", "achievements", "contact"]);
});

test("lists the résumé projects and skills", () => {
  render(<App />);
  featuredProjects.forEach((p) => expect(screen.getByRole("heading", { name: p.name })).toBeInTheDocument());
  skillGroups.forEach((g) => expect(screen.getByRole("heading", { name: g.title })).toBeInTheDocument());
});

test("never shows skills that are not on the résumé", () => {
  render(<App />);
  const text = document.body.textContent;
  ["Kubernetes", "TypeScript", "LangChain", "PyTorch", "Anthropic", "Flask", "Java 11"].forEach((word) =>
    expect(text).not.toContain(word)
  );
});
