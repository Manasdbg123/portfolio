import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";

import { CgGitFork, CgFileDocument } from "react-icons/cg";
import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
} from "react-icons/ai";
import { SiCodeforces } from "react-icons/si";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container fluid>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="text-info fw-bold fs-4">
  Kaustuk.
</Navbar.Brand>


        {/* Toggle for Mobile */}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => updateExpanded(expand ? false : "expanded")}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>

        {/* Collapsible Nav */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto pe-2" defaultActiveKey="#home">
            <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
              <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
            </Nav.Link>

            <Nav.Link as={Link} to="/about" onClick={() => updateExpanded(false)}>
              <AiOutlineUser style={{ marginBottom: "2px" }} /> About
            </Nav.Link>

            <Nav.Link as={Link} to="/project" onClick={() => updateExpanded(false)}>
              <AiOutlineFundProjectionScreen style={{ marginBottom: "2px" }} /> Projects
            </Nav.Link>

            <Nav.Link as={Link} to="/resume" onClick={() => updateExpanded(false)}>
              <CgFileDocument style={{ marginBottom: "2px" }} /> Resume
            </Nav.Link>

            <Nav.Link as={Link} to="/codingprofile" onClick={() => updateExpanded(false)}>
              <SiCodeforces style={{ marginBottom: "2px" }} /> Coding Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* ⭐ GitHub Button – outside Nav for alignment */}
        <div className="me-4 d-none d-md-block">
          <Button
            href="https://github.com/Manasdbg123/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="fork-btn-inner d-flex align-items-center gap-2"
            title="Star/Fork this portfolio on GitHub"
            style={{
              backgroundColor: "#151515",
              border: "1px solid #f1c40f",
              color: "#f1c40f",
              padding: "6px 12px",
              borderRadius: "8px",
              boxShadow: "0 0 8px rgba(241, 196, 15, 0.4)",
            }}
          >
            <CgGitFork style={{ fontSize: "1.3rem" }} />
            <AiFillStar style={{ fontSize: "1.2rem" }} />
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
