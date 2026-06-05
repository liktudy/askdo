import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const releaseType = process.argv[2] || "patch";
const allowed = new Set(["patch", "minor", "major"]);

if (!allowed.has(releaseType)) {
  console.error("Usage: node scripts/release-version.js <patch|minor|major>");
  process.exit(1);
}

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));
const writeJson = (filePath, value) => {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
};

const bump = (version, type) => {
  const parts = version.split(".").map((part) => Number.parseInt(part, 10));
  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
    throw new Error(`Unsupported semver version: ${version}`);
  }
  if (type === "major") return `${parts[0] + 1}.0.0`;
  if (type === "minor") return `${parts[0]}.${parts[1] + 1}.0`;
  return `${parts[0]}.${parts[1]}.${parts[2] + 1}`;
};

const today = new Date().toISOString().slice(0, 10);
const packagePath = path.join(repoRoot, "package.json");
const packageJson = readJson(packagePath);
const nextVersion = bump(packageJson.version, releaseType);

packageJson.version = nextVersion;
writeJson(packagePath, packageJson);

const projectConfigPath = path.join(repoRoot, "templates", "project", "config.json");
const projectConfig = readJson(projectConfigPath);
projectConfig.version = nextVersion;
writeJson(projectConfigPath, projectConfig);

const opencodeRuntimePath = path.join(repoRoot, "platforms", "opencode", "lib", "orchestrator.js");
const runtimeText = fs.readFileSync(opencodeRuntimePath, "utf8");
const nextRuntimeText = runtimeText.replace(/version: "\d+\.\d+\.\d+"/, `version: "${nextVersion}"`);
if (runtimeText === nextRuntimeText) {
  throw new Error("Could not update OpenCode default project config version.");
}
fs.writeFileSync(opencodeRuntimePath, nextRuntimeText, "utf8");

execFileSync("node", ["scripts/generate-manifests.js"], { cwd: repoRoot, stdio: "inherit" });

const changelogPath = path.join(repoRoot, "CHANGELOG.md");
const changelog = fs.existsSync(changelogPath) ? fs.readFileSync(changelogPath, "utf8") : "# Changelog\n";
const sectionHeader = `## ${nextVersion} - ${today}`;
if (!changelog.includes(sectionHeader)) {
  const body = `${sectionHeader}\n\n- Release ${nextVersion}.\n\n`;
  const nextChangelog = changelog.replace(/^# Changelog\r?\n\r?\n?/, `# Changelog\n\n${body}`);
  fs.writeFileSync(changelogPath, nextChangelog, "utf8");
}

console.log(`Askdo version bumped to ${nextVersion}`);
