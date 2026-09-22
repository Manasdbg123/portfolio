import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Kumar Kaustuk Raj</span> from <span className="purple">India</span>. 
            <br />
            <br />
            I’m a B.Tech Computer Science and Engineering student at 
            <span className="purple"> NIT Andhra Pradesh</span>, graduating in 2025 with a current CGPA of 7.0.
            <br />
            <br />
            I have hands-on experience building scalable systems and full-stack applications using 
            <span className="purple"> Java, Spring Boot, RESTful APIs, MongoDB, and MySQL</span>. 
            Some of my notable projects include:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> <span className="purple">Sketch-to-Face GAN</span>: Enhanced image realism by 15% using optimized U-Net based GANs.
            </li>
            <li className="about-activity">
              <ImPointRight /> <span className="purple">Recipe Blog</span>: A dynamic platform with 200+ recipes and user interactions via comments and ratings.
            </li>
            <li className="about-activity">
              <ImPointRight /> <span className="purple">Hospital Management System</span>: Developed with Spring Boot for secure and efficient hospital operations.
            </li>
            <li className="about-activity">
              <ImPointRight /> <span className="purple">Shopping Cart App</span>: E-commerce app supporting user authentication and secure checkout.
            </li>
          </ul>

          <p>
            I’ve also solved over <span className="purple">2000+ DSA problems</span> across platforms like 
            <span className="purple"> Codeforces, LeetCode, and GFG</span>. I'm proud to be a:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Candidate Master on Codeforces (Rating: 1913)
            </li>
            <li className="about-activity">
              <ImPointRight /> Guardian on LeetCode (Rating: 2183)
            </li>
            <li className="about-activity">
              <ImPointRight /> Global Rank 11 in a Leetcode Contest
            </li>
          </ul>

          <p>
            I actively contribute to campus communities and have held roles in organizing events at 
            <span className="purple"> NIT AP Tech Fest</span> and <span className="purple">Praayatnam</span>.
          </p>

          <p>
            Beyond Coding, I Enjoy:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Solving algorithmic challenges and participating in coding contests
            </li>
            <li className="about-activity">
              <ImPointRight /> Learning new tech stacks and backend architectures
            </li>
            <li className="about-activity">
              <ImPointRight /> Exploring development tools, automation, and open-source contributions
            </li>
          </ul>

          <p style={{ color: "#628c88d5" }}>
            "Motivation is temporary, consistency is permanent!"
          </p>
          <footer className="blockquote-footer">Kelly Slater</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
