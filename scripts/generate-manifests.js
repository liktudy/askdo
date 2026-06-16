import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));
const formatJson = (value) => `${JSON.stringify(value, null, 2)}\n`;

const packageJson = readJson(path.join(repoRoot, "package.json"));
const skillsDir = path.join(repoRoot, "skills");
const manifestPath = path.join(repoRoot, "platforms", "codex", ".codex-plugin", "plugin.json");

const preferredSkillOrder = [
  "askdo-intake",
  "askdo-list-kits",
  "askdo-build-kit",
  "askdo-run-kit",
  "askdo-check",
  "askdo-audit-kit",
  "askdo-internal-workshop",
  "askdo-evolve",
  "askdo-level",
];

const skillNames = fs
  .readdirSync(skillsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const orderedSkills = [
  ...preferredSkillOrder.filter((skill) => skillNames.includes(skill)),
  ...skillNames.filter((skill) => !preferredSkillOrder.includes(skill)).sort(),
];

const nextManifest = {
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  entry: "../../AGENTS.md",
  skills: orderedSkills.map((skill) => `../../skills/${skill}`),
};

const nextText = formatJson(nextManifest);
const normalizeText = (text) => text.replace(/\r\n/g, "\n");
const currentText = fs.existsSync(manifestPath) ? fs.readFileSync(manifestPath, "utf8") : "";
const checkOnly = process.argv.includes("--check");

if (checkOnly) {
  if (normalizeText(currentText) !== normalizeText(nextText)) {
    console.error("Codex plugin manifest is out of sync. Run `npm run manifests:generate`.");
    process.exit(1);
  }
  console.log("Codex plugin manifest is in sync.");
  process.exit(0);
}

fs.writeFileSync(manifestPath, nextText, "utf8");
console.log(`Wrote ${path.relative(repoRoot, manifestPath)}`);
