import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "B.Tech CSE Student at NIT Andhra Pradesh",
          "Full Stack Java Developer",
          "Spring Boot & REST API Specialist",
          "AI Developer | GAN Enthusiast",
          "Competitive Programmer",
          "Codeforces Candidate Master",
          "LeetCode Guardian",
          "DSA Problem Solver (2000+ Problems)"
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
