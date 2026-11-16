import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Routes prerendered at build time (scripts/prerender.mjs, SPEC-ai-discoverability-fixes item 7)
// arrive with their markup inside #root and data-prerendered="<path>". Hydrate only when that
// path is the page actually being shown; anything else (the plain shell, or a prerendered file
// reached under another URL) is cleared and client-rendered exactly as before.
const root = document.getElementById("root");
if (root) {
  const prerendered = root.getAttribute("data-prerendered");
  if (prerendered && root.firstElementChild && prerendered === window.location.pathname) {
    hydrateRoot(root, <App />);
  } else {
    root.textContent = "";
    createRoot(root).render(<App />);
  }
}
