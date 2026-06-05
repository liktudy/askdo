import { execFileSync } from "node:child_process";

const strict = process.argv.includes("--strict");
const output = execFileSync("git", ["ls-files", "askdo"], { encoding: "utf8" }).trim();
const tracked = output ? output.split(/\r?\n/).filter(Boolean) : [];

if (!tracked.length) {
  console.log("Asset boundary OK: no tracked askdo/ user assets.");
  process.exit(0);
}

const message = [
  `Asset boundary warning: ${tracked.length} tracked files under askdo/.`,
  "Askdo product source should eventually move user kits/config to examples, fixtures, or external asset roots.",
  "Run this check with --strict after the migration is approved.",
].join("\n");

if (strict) {
  console.error(message);
  process.exit(1);
}

console.warn(message);
