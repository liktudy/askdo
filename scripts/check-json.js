import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const repoRoot = execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();

const gitList = (args) =>
  execFileSync("git", args, { cwd: repoRoot, encoding: "utf8" })
    .split(/\r?\n/)
    .filter(Boolean);

const files = [
  ...gitList(["ls-files"]),
  ...gitList(["ls-files", "--others", "--exclude-standard"]),
]
  .filter((file) => file.endsWith(".json"))
  .filter((file, index, all) => all.indexOf(file) === index);

const failures = [];

for (const file of files) {
  const fullPath = path.join(repoRoot, file);
  try {
    JSON.parse(fs.readFileSync(fullPath, "utf8"));
  } catch (error) {
    failures.push(`${file}: ${error.message}`);
  }
}

if (failures.length) {
  console.error("JSON parse failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Source JSON parse OK: ${files.length} files`);
