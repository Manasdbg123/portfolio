import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Particle from "./Particle";

function CodingProfile() {
  return (
    <Container fluid className="resume-section">
      <Particle />

      <Container>
        <h1 className="project-heading" style={{ marginBottom: "30px" }}>
          My <strong className="purple">Coding Profiles</strong>
        </h1>

        <Row className="justify-content-center">

          {/* ✅ Custom Codeforces Card */}
          <Col md={6} className="text-center mb-5">
            <h2 className="purple" style={{ marginBottom: "20px" }}>
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/codeforces-3521352-2944791.png"
                alt="Codeforces Logo"
                style={{ width: "40px", marginRight: "10px", verticalAlign: "middle" }}
              />
              Codeforces
            </h2>

            <div
              style={{
                backgroundColor: "#1a1a1a",
                padding: "20px",
                borderRadius: "10px",
                maxWidth: "500px",
                margin: "0 auto",
                color: "#ffffff",
                boxShadow: "0 0 10px rgba(0,0,0,0.5)",
              }}
            >
              <h3 style={{ fontWeight: "bold", color: "#f92672" }}>manasraj123</h3>
              <hr style={{ backgroundColor: "#333", border: "none", height: "1px" }} />

              <div style={{ textAlign: "left", fontSize: "1.05rem", lineHeight: "2rem" }}>
                <p>
                  <strong>Rating:</strong> <span style={{ color: "#f39c12" }}>1913</span>{" "}
                  <span style={{ color: "#a29bfe" }}> (Candidate Master)</span>
                </p>
                <p>
                  <strong>Max Rating:</strong> <span style={{ color: "#00cec9" }}>1919</span>
                </p>
                <p>
                  <strong>Global Rank:</strong> Top 2.5%
                </p>
                <p>
                  <strong>Contests Participated:</strong> 53
                </p>
              </div>
              <a href="https://codeforces.com/profile/manasraj123" target="_blank" rel="noreferrer">
               
              
                Visit Codeforces
              </a>
            </div>
          </Col>

          {/* ✅ LeetCode Card */}
          <Col md={6} className="text-center mb-5">
            <h2 className="purple" style={{ marginBottom: "20px" }}>
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/leetcode-3522842-2944960.png"
                alt="LeetCode Logo"
                style={{ width: "35px", marginRight: "10px", verticalAlign: "middle" }}
              />
              LeetCode
            </h2>

            <a
              href="https://leetcode.com/u/manas-12345/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://leetcard.jacoblin.cool/manas-12345?ext=heatmap"
                alt="LeetCode stats"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  borderRadius: "10px",
                  marginBottom: "15px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                }}
              />
            </a>

            <p style={{ color: "white", marginTop: "10px", fontSize: "1.1rem" }}>
              <strong>Rating:</strong> 2183 (Guardian) <br />
              <strong>Top Global Rank:</strong> 11
            </p>

            <Button
              variant="warning"
              href="https://leetcode.com/u/manas-12345/"
              target="_blank"
              rel="noreferrer"
            >
              Visit LeetCode
            </Button>
          </Col>

          {/* ✅ GitHub Section */}
          <Col md={12} className="text-center mt-5">
            <h2 className="purple" style={{ marginBottom: "20px" }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="GitHub Logo"
                style={{ width: "35px", marginRight: "10px", verticalAlign: "middle" }}
              />
              GitHub
            </h2>

            <a
              href="https://github.com/Manasdbg123"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://github-readme-stats.vercel.app/api?username=Manasdbg123&show_icons=true&theme=radical"
                alt="GitHub Stats"
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  borderRadius: "10px",
                  marginBottom: "15px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                }}
              />
            </a>

            <Button
              variant="dark"
              href="https://github.com/Manasdbg123"
              target="_blank"
              rel="noreferrer"
            >
              Visit GitHub
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default CodingProfile;
