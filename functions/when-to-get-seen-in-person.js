// functions/when-to-get-seen-in-person.js — per-route <head> (see functions/_data/routeHeads.js).
import { rewriteRouteHead } from "./_lib/routeHead.js";
export const onRequest = (context) => rewriteRouteHead(context, "/when-to-get-seen-in-person");
