import React, { useEffect, useState } from "react";
import Preloader from "../src/components/Pre";
import OsNavbar from "./components/Nav/OsNavbar";
import OsHome from "./components/Home/OsHome";
import CustomCursor from "./components/Cursor/CustomCursor";
import Resume from "./components/Resume/ResumeNew";
import CodingProfile from "./components/CodingProfile";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import useSmoothScroll from "./lib/useSmoothScroll";
import "./styles/os.css";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, upadateLoad] = useState(true);
  useSmoothScroll();

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <CustomCursor />
      <div className="App os-root" id={load ? "no-scroll" : "scroll"} style={{ overflowX: "hidden" }}>
        <OsNavbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<OsHome />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/codingprofile" element={<CodingProfile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <footer className="os-footer os-mono">
          <div className="os-container os-footer-inner">
            <span>© {new Date().getFullYear()} Kumar Kaustuk Raj</span>
            <span>Built with React · Deployed on Vercel</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
