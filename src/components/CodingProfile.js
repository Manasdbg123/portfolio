import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Particle from "./Particle";

const CodingProfile = () => (
  <Container fluid className="resume-section position-relative">
    <Particle />

    <Container className="py-5">
      <h1 className="text-center text-light mb-5">
        My <span className="text-info">Coding Profiles</span>
      </h1>

      <Row className="g-4 justify-content-center">
        {/* Codeforces */}
        <Col md={6} lg={4}>
          <Card
            className="h-100 shadow-sm border-3 border-pink rounded-4 card-hover"
            style={{ borderColor: "#f92672", backgroundColor: "#1a1a1a", color: "white" }}
          >
            <Card.Header className="text-center bg-dark text-light rounded-top-4">
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/codeforces-3521352-2944791.png"
                alt="CF"
                style={{ width: 30, marginRight: 8 }}
              />
              <span className="h5 mb-0">Codeforces</span>
            </Card.Header>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="text-center text-danger">manasraj123</Card.Title>
              <hr className="border-secondary" />
              <Card.Text as="div">
                <p><strong>Rating:</strong> <span className="text-warning">1919</span> <small className="text-info">(Candidate Master)</small></p>
                <p><strong>Max Rating:</strong> <span className="text-info">1919</span></p>
                <p><strong>Global Rank:</strong> Top 2.5%</p>
                <p><strong>Best Global Rank in Contest:</strong> 53</p>
              </Card.Text>
              <Button
                variant="outline-light"
                href="https://codeforces.com/profile/manasraj123"
                target="_blank"
                className="mt-auto"
              >
                Visit Codeforces
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* LeetCode */}
        <Col md={6} lg={4}>
          <Card
            className="h-100 shadow-sm border-3 border-warning rounded-4 card-hover"
            style={{ borderColor: "#f1c40f", backgroundColor: "#1a1a1a", color: "white" }}
          >
            <Card.Header className="text-center bg-dark text-light rounded-top-4">
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/leetcode-3522842-2944960.png"
                alt="LC"
                style={{ width: 30, marginRight: 8 }}
              />
              <span className="h5 mb-0">LeetCode</span>
            </Card.Header>
            <Card.Body className="d-flex flex-column align-items-center">
              <a
                href="https://leetcode.com/u/manas-12345/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://leetcard.jacoblin.cool/manas-12345?ext=heatmap"
                  alt="LeetCode Stats"
                  className="img-fluid mb-3 rounded shadow"
                />
              </a>
              <Card.Text className="text-center mb-4">
                <p><strong>Rating:</strong> 2183 (Guardian)</p>
                <p><strong>Best Global Rank in contest:</strong> 11</p>
              </Card.Text>
              <Button
                variant="outline-warning"
                href="https://leetcode.com/u/manas-12345/"
                target="_blank"
                className="mt-auto"
              >
                Visit LeetCode
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* GitHub */}
        <Col md={6} lg={4}>
          <Card
            className="h-100 shadow-sm border-3 border-success rounded-4 card-hover"
            style={{ borderColor: "#2ecc71", backgroundColor: "#1a1a1a", color: "white" }}
          >
            <Card.Header className="text-center bg-dark text-light rounded-top-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="GH"
                style={{ width: 30, marginRight: 8 }}
              />
              <span className="h5 mb-0">GitHub</span>
            </Card.Header>
            <Card.Body className="d-flex flex-column align-items-center">
              <a
                href="https://github.com/Manasdbg123"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://github-readme-stats.vercel.app/api?username=Manasdbg123&show_icons=true&theme=dark"
                  alt="GitHub Stats"
                  className="img-fluid mb-3 rounded shadow"
                />
              </a>
              <Button
                variant="outline-success"
                href="https://github.com/Manasdbg123"
                target="_blank"
                className="mt-auto"
              >
                Visit GitHub
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </Container>
);

export default CodingProfile;
