import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { tool } from "@opencode-ai/plugin";
import { runAskdoTurn } from "../../lib/orchestrator.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../../../..");
const askdoSkillsDir = path.join(repoRoot, "skills");
const askdoEntryPath = path.join(repoRoot, "AGENTS.md");

let bootstrapCache;

const readText = (filePath) => {
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf8");
};

const getBootstrapContent = () => {
  if (bootstrapCache !== undefined) return bootstrapCache;

  const entry = readText(askdoEntryPath);
  if (!entry) {
    bootstrapCache = null;
    return bootstrapCache;
  }

  bootstrapCache = `
ASKDO_BOOTSTRAP_CONTEXT

You have Askdo installed for OpenCode.

Use Askdo when the user asks to handle a business ask, build or reuse a kit,
run a flow, prepare a result, validate Askdo assets, list kits, audit a kit,
or level up a kit from meaningful feedback. Use internal workshop capability
only when the user explicitly asks to review Askdo itself.

OpenCode mapping:
- Prefer the Askdo `askdo` tool when available. It is the product entry and
  owns intake, planning gates, scenario selection, kit approval, and run state.
- Use OpenCode's native skill tool to list and load Askdo skills.
- Start with the askdo-intake skill for a natural-language business ask.
- Use askdo-list-kits when the user asks to show, search, or inventory kits.
- Use askdo-build-kit only when no existing kit fits the ask.
- Use askdo-run-kit when a kit should be executed or prepared.
- Use askdo-check for preflight validation.
- Use askdo-audit-kit for deep external user kit quality review.
- Use askdo-internal-workshop only for keyword-triggered Askdo self review.
- Use askdo-level after a run when reusable learning should be captured.

Askdo source of truth:

${entry}
`;

  return bootstrapCache;
};

export const AskdoPlugin = async () => ({
  tool: {
    askdo: tool({
      description:
        "Run Askdo as a single orchestrated entry: refine an ask, confirm planning, select scenario, build or reuse a kit, request approval, run, list kits, audit kits, or run an internal Askdo workshop.",
      args: {
        input: tool.schema
          .string()
          .describe(
            "User ask or decision input, for example 'use askdo: ...', 'confirm_planning_frame', '1', or 'approve_and_run'.",
          ),
        mode: tool.schema
          .string()
          .optional()
          .describe("Optional mode: ask, decision, resume, reset, list_kits, audit_kit, or internal_workshop. Defaults to ask."),
      },
      async execute(args, context) {
        return await runAskdoTurn({
          input: args.input,
          mode: args.mode || "ask",
          context,
        });
      },
    }),
  },

  config: async (config) => {
    config.skills = config.skills || {};
    config.skills.paths = config.skills.paths || [];

    if (!config.skills.paths.includes(askdoSkillsDir)) {
      config.skills.paths.push(askdoSkillsDir);
    }
  },

  "experimental.chat.messages.transform": async (_input, output) => {
    const bootstrap = getBootstrapContent();
    if (!bootstrap || !output.messages.length) return;

    const firstUser = output.messages.find((message) => message.info.role === "user");
    if (!firstUser || !firstUser.parts.length) return;

    const alreadyInjected = firstUser.parts.some(
      (part) => part.type === "text" && part.text.includes("ASKDO_BOOTSTRAP_CONTEXT"),
    );
    if (alreadyInjected) return;

    const referencePart = firstUser.parts[0];
    firstUser.parts.unshift({
      ...referencePart,
      type: "text",
      text: bootstrap,
    });
  },
});
