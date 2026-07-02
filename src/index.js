import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Standard React 18 root render. No security concerns here -
// this file is intentionally minimal and framework-generated.
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
