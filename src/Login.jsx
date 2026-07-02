import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Login
 * ---------------------------------------------------------------------
 * Demonstrates a common frontend security pitfall: relying solely on
 * weak client-side validation for authentication, plus the corrective
 * secure pattern. Both are documented inline for the security report.
 *
 * IMPORTANT (Broken Login Flow):
 * Client-side validation is a UX convenience ONLY. It can always be
 * bypassed (disabling JS, editing the DOM, calling the API directly
 * with curl/Postman, etc.). Real authentication and authorization MUST
 * be enforced server-side. This demo has no real backend; the mock
 * `fakeAuthenticate` function stands in for a server call and is
 * clearly marked as such.
 * ---------------------------------------------------------------------
 */
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ---------------------------------------------------------------------
  // INSECURE EXAMPLE (kept for reference only, NOT called anywhere below):
  //
  // function insecureValidate() {
  //   // Weak validation: only checks that fields are non-empty.
  //   // Accepts any password length, any characters, no format check.
  //   // An attacker-controlled client (or a modified request) can send
  //   // literally anything and the UI would consider it "valid".
  //   if (email !== "" && password !== "") {
  //     return true;
  //   }
  //   return false;
  // }
  //
  // Additionally, some real-world apps make the mistake of trusting a
  // client-side "isAdmin" flag or role stored in localStorage/cookies
  // without server verification - never do this:
  //
  // const isAdmin = localStorage.getItem("isAdmin") === "true"; // INSECURE
  // ---------------------------------------------------------------------

  // SECURE VERSION: meaningful format validation as a UX nicety, while
  // treating it as advisory only. The authoritative check must still
  // happen server-side (represented here by fakeAuthenticate()).
  function secureValidate() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (password.length < 12) {
      setError("Password must be at least 12 characters long.");
      return false;
    }

    // Encourage stronger passwords (not a substitute for server-side
    // password policy enforcement, rate limiting, and hashing).
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    if (!(hasUpper && hasLower && hasNumber && hasSymbol)) {
      setError(
        "Password must include upper/lowercase letters, a number, and a symbol."
      );
      return false;
    }

    setError("");
    return true;
  }

  // Mock stand-in for a real server-side authentication call.
  // In a real app this would be:
  //   const res = await fetch("/api/login", { method: "POST", ... });
  // with the server verifying credentials against hashed passwords
  // (e.g. bcrypt/argon2), enforcing rate limiting, MFA, and issuing a
  // secure, httpOnly session cookie or short-lived token.
  function fakeAuthenticate(userEmail) {
    return { success: true, user: { email: userEmail, role: "user" } };
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!secureValidate()) {
      return;
    }

    const result = fakeAuthenticate(email);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials.");
    }
  }

  return (
    <div className="card">
      <h1>
        Login <span className="badge-secure">SECURE</span>
      </h1>
      <p style={{ color: "#a9bcd0", fontSize: "0.85rem" }}>
        This form uses meaningful client-side validation for UX, but real
        authentication is always enforced server-side.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button className="btn-primary" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
