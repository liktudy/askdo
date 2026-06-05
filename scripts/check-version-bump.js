import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const repoRoot = execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();

const git = (args) => execFileSync("git", args, { cwd: repoRoot, encoding: "utf8" }).trim();
const list = (args) => {
  const output = git(args);
  return output ? output.split(/\r?\n/).filter(Boolean) : [];
};

let base = "";
try {
  base = git(["merge-base", "HEAD", "@{upstream}"]);
} catch {
  try {
    base = git(["rev-parse", "HEAD~1"]);
  } catch {
    console.warn("No upstream or previous commit found; skipping version bump check.");
    process.exit(0);
  }
}

const changed = list(["diff", "--name-only", `${base}..HEAD`]);
const productChanged = changed.some((file) =>
  !file.startsWith("askdo/")
  && !file.startsWith("runs/")
  && !file.startsWith("outputs/")
  && (
    file === "AGENTS.md"
    || file === "README.md"
    || file === "CHANGELOG.md"
    || file === "package.json"
    || file.startsWith("brain/")
    || file.startsWith("docs/")
    || file.startsWith("kits/")
    || file.startsWith("platforms/")
    || file.startsWith("skills/")
    || file.startsWith("templates/")
    || file.startsWith("scripts/")
  )
);

if (!productChanged) {
  console.log("No product source changes requiring version bump.");
  process.exit(0);
}

const packageChanged = changed.includes("package.json");
const changelogChanged = changed.includes("CHANGELOG.md");

if (!packageChanged || !changelogChanged) {
  console.error("Product source changed without version release metadata.");
  console.error("Run `npm run release:patch` before pushing product changes.");
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(path.join(repoRoot, "package.json"), "utf8"));
const codexManifest = JSON.parse(fs.readFileSync(path.join(repoRoot, "platforms", "codex", ".codex-plugin", "plugin.json"), "utf8"));
const projectConfig = JSON.parse(fs.readFileSync(path.join(repoRoot, "templates", "project", "config.json"), "utf8"));
const runtimeText = fs.readFileSync(path.join(repoRoot, "platforms", "opencode", "lib", "orchestrator.js"), "utf8");

const versions = [
  ["package.json", packageJson.version],
  ["platforms/codex/.codex-plugin/plugin.json", codexManifest.version],
  ["templates/project/config.json", projectConfig.version],
];

const mismatch = versions.filter(([, version]) => version !== packageJson.version);
if (mismatch.length || !runtimeText.includes(`version: "${packageJson.version}"`)) {
  console.error("Version surfaces are not synchronized.");
  for (const [file, version] of versions) console.error(`- ${file}: ${version}`);
  console.error("- platforms/opencode/lib/orchestrator.js: check defaultProjectConfig.version");
  process.exit(1);
}

console.log(`Version bump check OK: ${packageJson.version}`);
