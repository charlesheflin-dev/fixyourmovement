// scripts/prerender.mjs — build-time prerender (SPEC-ai-discoverability-fixes item 7).
// Runs after `vite build` (client -> dist/) and `vite build --ssr src/entry-server.tsx` (-> dist-ssr/).
// For each public route below it renders the real React tree to HTML and writes it into a copy
// of the built shell, so the first HTML response carries the page's visible text (prices,
// program, guarantee) for crawlers and no-JS readers. src/main.tsx hydrates that markup.
//
// Where each file goes (Cloudflare Pages, Pretty URLs):
//   /x  -> dist/x.html            served as a static asset at /x (shadows the "/* /index.html 200"
//                                 SPA fallback, like public/support.html); functions/x.js still
//                                 rewrites its <head> via context.next().
//   /   -> dist/home.html         served for "/" by functions/index.js. dist/index.html stays the
//                                 untouched shell because it is the SPA fallback for every other
//                                 route, the 404 body and the LP A/B champion.
import fs from "node:fs";
import path from "node:path";
import { Writable } from "node:stream";
import { fileURLToPath, pathToFileURL } from "node:url";
import { renderToPipeableStream } from "react-dom/server";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const SSR_ENTRY = path.join(ROOT, "dist-ssr", "entry-server.js");

const ROUTES = [
  ["/", "home.html"],
  ["/foot-capacity-system", "foot-capacity-system.html"],
  ["/refund-policy", "refund-policy.html"],
  ["/dr-jonathan-schutza", "dr-jonathan-schutza.html"],
  ["/when-to-get-seen-in-person", "when-to-get-seen-in-person.html"],
  ["/testimonials", "testimonials.html"],
  ["/checkout", "checkout.html"],
];

const ROOT_DIV = '<div id="root"></div>';

function renderToHtml(element) {
  return new Promise((resolve, reject) => {
    let html = "";
    let failed = null;
    const sink = new Writable({
      write(chunk, _enc, cb) { html += chunk.toString(); cb(); },
    });
    sink.on("finish", () => (failed ? reject(failed) : resolve(html)));
    const stream = renderToPipeableStream(element, {
      // Wait for every lazy route chunk so the output is complete markup with no streaming scripts.
      onAllReady() { stream.pipe(sink); },
      onShellError(err) { reject(err); },
      onError(err) { failed = failed || err; },
    });
  });
}

const shell = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
if (shell.split(ROOT_DIV).length !== 2) {
  throw new Error(`prerender: expected exactly one ${ROOT_DIV} in dist/index.html`);
}

const { appFor } = await import(pathToFileURL(SSR_ENTRY).href);

for (const [route, file] of ROUTES) {
  const html = await renderToHtml(appFor(route));
  if (html.length < 500 || /<script/i.test(html)) {
    throw new Error(`prerender: unexpected output for ${route} (${html.length} chars)`);
  }
  const page = shell.replace(ROOT_DIV, `<div id="root" data-prerendered="${route}">${html}</div>`);
  fs.writeFileSync(path.join(DIST, file), page);
  console.log(`prerender: ${route} -> dist/${file} (${html.length} chars of markup)`);
}
