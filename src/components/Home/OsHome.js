import React, { useRef } from "react";
import Hero from "../Hero/Hero";
import SystemArchitecture from "../System/SystemArchitecture";
import Stack from "../Stack/Stack";
import FeaturedProjects from "../Projects/FeaturedProjects";
import ProjectExplorer from "../Projects/ProjectExplorer";
import AboutEditorial from "../About/AboutEditorial";
import Experience from "../Experience/Experience";
import CompetitiveProgramming from "../Competitive/CompetitiveProgramming";
import Terminal from "../Terminal/Terminal";
import Contact from "../Contact/Contact";
import useSectionMorph from "../../lib/useSectionMorph";

export default function OsHome() {
  const containerRef = useRef(null);
  useSectionMorph(containerRef);

  return (
    <div ref={containerRef}>
      <Hero />
      <SystemArchitecture />
      <Stack />
      <FeaturedProjects />
      <ProjectExplorer />
      <Experience />
      <AboutEditorial />
      <CompetitiveProgramming />
      <Terminal />
      <Contact />
    </div>
  );
}
