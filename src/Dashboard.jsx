import React from "react";
import CommentBox from "./components/CommentBox";

/**
 * Dashboard
 * ---------------------------------------------------------------------
 * Simple landing page shown after "login". Hosts the CommentBox
 * component, which is where the DOM-XSS teaching example lives (see
 * src/components/CommentBox.jsx for the insecure-vs-secure comparison).
 * ---------------------------------------------------------------------
 */
function Dashboard() {
  return (
    <div style={{ width: "100%", maxWidth: 500 }}>
      <div className="card">
        <h1>Dashboard</h1>
        <p style={{ color: "#a9bcd0" }}>
          Welcome back! This is a mock authenticated area used to
          demonstrate frontend security scanning in the CI/CD pipeline.
        </p>

        <hr className="section-divider" />

        <h2 style={{ fontSize: "1rem" }}>Session Notes</h2>
        <p className="code-note">
          In a production app, this page would only render after the
          server confirms a valid session (e.g. via an httpOnly, Secure,
          SameSite=strict cookie) - never based solely on client-side
          navigation like this demo does.
        </p>
      </div>

      <CommentBox />
    </div>
  );
}

export default Dashboard;
