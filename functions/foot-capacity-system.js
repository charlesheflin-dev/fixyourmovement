// functions/foot-capacity-system.js — per-route <head> (see functions/_data/routeHeads.js).
import { rewriteRouteHead } from "./_lib/routeHead.js";
export const onRequest = (context) => rewriteRouteHead(context, "/foot-capacity-system");
