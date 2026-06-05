import { runAskdoTurn } from "../platforms/opencode/lib/orchestrator.js";

const context = {
  worktree: process.cwd(),
  sessionID: "smoke-opencode",
};

const list = JSON.parse(await runAskdoTurn({ input: "", mode: "list_kits", context }));
const audit = JSON.parse(await runAskdoTurn({ input: "daily-brief-kit", mode: "audit_kit", context }));
const internal = JSON.parse(await runAskdoTurn({ input: "", mode: "internal_workshop", context }));

if (list.status !== "completed" || typeof list.kit_count !== "number") {
  throw new Error("list_kits smoke failed");
}

if (audit.status !== "completed" || !audit.verdict) {
  throw new Error("audit_kit smoke failed");
}

if (internal.status !== "completed" || !internal.verdict) {
  throw new Error("internal_workshop smoke failed");
}

console.log(JSON.stringify({
  list_kits: list.kit_count,
  audit_kit: audit.verdict,
  internal_workshop: internal.verdict,
}, null, 2));
