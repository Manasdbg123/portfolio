import React from "react";
import Scene3D from "./components/Scene3D";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import CodingProfiles from "./components/CodingProfiles";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import useReveal from "./hooks/useReveal";
import "./styles.css";

export default function App() {
  useReveal();
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Scene3D />
      <Navbar />
      <main id="main">
        <Hero />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <CodingProfiles />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
