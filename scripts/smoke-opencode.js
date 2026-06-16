import { runAskdoTurn } from "../platforms/opencode/lib/orchestrator.js";

const context = {
  worktree: process.cwd(),
  sessionID: "smoke-opencode",
};

const list = JSON.parse(await runAskdoTurn({ input: "", mode: "list_kits", context }));
const audit = JSON.parse(await runAskdoTurn({ input: "daily-brief-kit", mode: "audit_kit", context }));
const internal = JSON.parse(await runAskdoTurn({ input: "", mode: "internal_workshop", context }));
const evolve = JSON.parse(await runAskdoTurn({ input: "", mode: "evolve", context }));

if (list.status !== "completed" || typeof list.kit_count !== "number") {
  throw new Error("list_kits smoke failed");
}

if (audit.status !== "completed" || !audit.verdict) {
  throw new Error("audit_kit smoke failed");
}

if (internal.status !== "completed" || !internal.verdict) {
  throw new Error("internal_workshop smoke failed");
}

if (evolve.status !== "completed" || evolve.scope !== "askdo_product_evolution") {
  throw new Error("evolve smoke failed");
}

console.log(JSON.stringify({
  list_kits: list.kit_count,
  audit_kit: audit.verdict,
  internal_workshop: internal.verdict,
  evolve: evolve.recommended_next_action,
}, null, 2));
