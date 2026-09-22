import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I'm currently pursuing a B.Tech in Computer Science and Engineering at 
              <i>
                <b className="purple"> NIT Andhra Pradesh</b>
              </i>, with strong problem-solving skills and a deep passion for software development.
              <br />
              <br />
              I am fluent in languages like{" "}
              <i>
                <b className="purple">Java, Python, C++, JavaScript, and SQL.</b>
              </i>
              <br />
              <br />
              My core interests lie in{" "}
              <i>
                <b className="purple">Backend Development, Full-Stack Systems, and AI using GANs</b>
              </i>, and I enjoy architecting scalable and secure applications.
              <br />
              <br />
              I’ve built and deployed real-world applications like a{" "}
              <b className="purple">Hospital Management System, Recipe Blog</b>, and{" "}
              <b className="purple">GAN-based Sketch-to-Face Transformer</b>, and I’m an active contributor in coding contests.
              <br />
              <br />
              I've solved over <b className="purple">2000+ DSA problems</b> and achieved rankings such as{" "}
              <b className="purple">Candidate Master on Codeforces</b> and{" "}
              <b className="purple">Guardian on LeetCode</b>.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect</span> with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/Manasdbg123"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/kaustuk-raj-63a240226/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
