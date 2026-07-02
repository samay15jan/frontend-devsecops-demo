import React, { useState } from "react";
import DOMPurify from "dompurify";

/**
 * CommentBox
 * ---------------------------------------------------------------------
 * This component exists purely to give security scanners (ESLint
 * security plugins, SonarQube, manual code review) something realistic
 * to detect: a classic DOM-based Cross-Site Scripting (XSS) pattern.
 *
 * Both an INSECURE and a SECURE implementation are included side by
 * side, clearly labelled, so this file doubles as teaching material.
 * Only the SECURE version is actually rendered by default (see the
 * `useSecureRenderer` flag) so the shipped app is not itself vulnerable.
 * ---------------------------------------------------------------------
 */
function CommentBox() {
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState("");

  // Toggle this to false ONLY for local demonstration/scanning purposes.
  // Keeping it true means the deployed app always uses the safe path.
  const useSecureRenderer = true;

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(comment);
  }

  return (
    <div className="card" style={{ marginTop: "1.5rem" }}>
      <h2>
        Leave a Comment
        {useSecureRenderer ? (
          <span className="badge-secure">SECURE</span>
        ) : (
          <span className="badge-insecure">INSECURE DEMO</span>
        )}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="comment">
            Comment (try entering: &lt;img src=x onerror=alert(1)&gt;)
          </label>
          <input
            id="comment"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button className="btn-primary" type="submit">
          Post Comment
        </button>
      </form>

      {submitted && (
        <div style={{ marginTop: "1rem" }}>
          {/*
            ---------------------------------------------------------------
            INSECURE EXAMPLE (commented out / gated behind useSecureRenderer):

            Rendering raw, unsanitized user input via dangerouslySetInnerHTML
            allows an attacker to inject arbitrary HTML/JavaScript, leading
            to DOM-based XSS. This is exactly the kind of pattern that
            ESLint's `eslint-plugin-no-unsanitized` and SonarQube's
            javascript:S5696 / OWASP A03 (Injection) rules are designed to
            flag automatically.

            {!useSecureRenderer && (
              <div dangerouslySetInnerHTML={{ __html: submitted }} />
            )}
            ---------------------------------------------------------------
          */}

          {/*
            SECURE VERSION:
            1) Prefer plain text rendering (React escapes it automatically), or
            2) If HTML rendering is truly required, sanitize with DOMPurify
               before handing it to dangerouslySetInnerHTML.
            Both safe options are shown below; we use option 2 here since
            this component's purpose is to demonstrate the sanitized path.
          */}
          {useSecureRenderer && (
            <div
              className="code-note"
              // eslint-disable-next-line react/no-danger -- input is sanitized by DOMPurify immediately above
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(submitted, { ALLOWED_TAGS: [] }),
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default CommentBox;
