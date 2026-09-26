import React from "react";
import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href="#about">Back to top ↑</a>
      </div>
    </footer>
  );
}
