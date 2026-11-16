// Build-time entry for scripts/prerender.mjs (SPEC-ai-discoverability-fixes item 7).
// Renders the SAME App tree the browser hydrates, with a StaticRouter at the given path.
// Never loaded in the browser bundle.
import type { ReactNode } from "react";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export function appFor(path: string) {
  const Router = ({ children }: { children: ReactNode }) => (
    <StaticRouter location={path}>{children}</StaticRouter>
  );
  return <App Router={Router} />;
}
