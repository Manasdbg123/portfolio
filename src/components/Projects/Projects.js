import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

// Replace these with your actual image files for each project
import sketchgan from "../../Assets/Projects/ganlogo.png";
import recipeblog from "../../Assets/Projects/recipe.png";
import hospital from "../../Assets/Projects/hospitallogo.png";
import cart from "../../Assets/Projects/shopping_cart.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My <strong className="purple">Projects</strong>
        </h1>
        <p style={{ color: "white" }}>
          These are some of the real-world applications and systems I've built.
        </p>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={sketchgan}
              isBlog={false}
              title="Sketch-to-Face GAN"
              description="Trained a GAN using U-Net and deep convolutional layers to convert sketches into realistic faces. Improved image fidelity by 15% and reduced model training time by 30% through optimized architecture and data preprocessing."
              ghLink="https://github.com/Manasdbg123/Sketch-to-Real-image-Transformation-using-Gan"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={recipeblog}
              isBlog={false}
              title="Recipe Blog"
              description="A full-stack platform hosting 200+ recipes, complete with search, comment, and rating functionality. Includes an admin dashboard for content moderation. Tech stack: Node.js, Express.js, MongoDB, EJS."
              ghLink="https://github.com/Manasdbg123/Recipe-Blog-main"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={hospital}
              isBlog={false}
              title="Hospital Management System"
              description="Spring Boot + Java-based system for managing patients, appointments, and staff with secure authentication using Spring Security. RESTful APIs enable seamless integration between modules. Tech: Spring Boot, MySQL, Maven."
              ghLink="https://github.com/Manasdbg123/Hospital-Management-System"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={cart}
              isBlog={false}
              title="Shopping Cart Application"
              description="E-commerce platform with product catalog, user login, cart management, and secure checkout. Built using Spring Boot, JPA, Hibernate, and RESTful APIs. Tech: Java, Spring Boot, MySQL."
              ghLink="https://github.com/Manasdbg123/Shoping-cart"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
