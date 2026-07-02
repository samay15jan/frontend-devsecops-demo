import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./Login";
import Dashboard from "./Dashboard";

/**
 * App
 * Root component - sets up client-side routing between the Login page
 * and the Dashboard page.
 *
 * NOTE ON ROUTER CHOICE: this app uses HashRouter (URLs like
 * /#/dashboard) instead of BrowserRouter specifically because it is
 * deployed as a static site to GitHub Pages, which has no server-side
 * component to rewrite deep-link requests (e.g. a direct visit to
 * /dashboard) back to index.html. HashRouter keeps all routing on the
 * client side after the single index.html loads, so it works correctly
 * on GitHub Pages without extra 404.html redirect tricks. If you deploy
 * this app to a host that supports rewrites (Vercel, Netlify, Nginx,
 * etc.), switching to BrowserRouter would give cleaner URLs.
 *
 * Note: route access here is NOT a security boundary. Anyone can type
 * /#/dashboard directly into the address bar in this demo. A real app
 * must protect sensitive routes/data server-side (API authorization
 * checks), not merely hide UI on the client.
 */
function App() {
  return (
    <HashRouter>
      <div className="app-shell">
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
