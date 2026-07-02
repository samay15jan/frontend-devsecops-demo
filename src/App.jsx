import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./Login";
import Dashboard from "./Dashboard";

/**
 * App
 * Root component - sets up client-side routing between the Login page
 * and the Dashboard page.
 *
 * Note: route access here is NOT a security boundary. Anyone can type
 * /dashboard directly into the address bar in this demo. A real app
 * must protect sensitive routes/data server-side (API authorization
 * checks), not merely hide UI on the client.
 */
function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
