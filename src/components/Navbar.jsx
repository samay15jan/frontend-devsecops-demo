import React from "react";
import { Link } from "react-router-dom";

/**
 * Navbar
 * Simple presentational navigation component.
 * No security-sensitive logic lives here; it only renders static links.
 */
function Navbar() {
  return (
    <nav className="navbar">
      <strong>DevSecOps Demo</strong>
      <div>
        <Link to="/">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}

export default Navbar;
