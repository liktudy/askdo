import { execFileSync } from "node:child_process";

const run = (label, command, args) => {
  console.log(`\n> ${label}`);
  execFileSync(command, args, { stdio: "inherit" });
};

run("JSON parse", "node", ["scripts/check-json.js"]);
run("Codex manifest sync", "node", ["scripts/generate-manifests.js", "--check"]);
run("OpenCode syntax", "node", ["--check", "platforms/opencode/lib/orchestrator.js"]);
run("OpenCode smoke", "node", ["scripts/smoke-opencode.js"]);
run("Asset boundary", "node", ["scripts/check-assets.js"]);

console.log("\nAskdo check OK");
