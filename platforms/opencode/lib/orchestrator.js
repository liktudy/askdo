import fs from "node:fs";
import path from "node:path";

const nowIso = () => new Date().toISOString();

const ensureDir = (dirPath) => {
  fs.mkdirSync(dirPath, { recursive: true });
};

const readJson = (filePath) => {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const writeJson = (filePath, value) => {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
};

const writeText = (filePath, value) => {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, value, "utf8");
};

const cleanInput = (input) => (input || "").trim();

const slugify = (value) => {
  const ascii = value
    .toLowerCase()
    .replace(/[^\x00-\x7F]+/g, " ask ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 52);
  return ascii || "askdo-generated-kit";
};

const statePathFor = ({ worktree, sessionID }) =>
  path.join(worktree, "askdo", ".state", "opencode", `${sessionID || "default"}.json`);

const loadState = (ctx) => readJson(statePathFor(ctx));

const saveState = (ctx, state) => writeJson(statePathFor(ctx), state);

const format = (payload) => JSON.stringify(payload, null, 2);

const isConfirmPlanning = (input) =>
  ["confirm_planning_frame", "confirm", "1", "确认"].includes(cleanInput(input));

const makePlanningFrame = (ask) => ({
  objective: ask,
  scope: "The selected Askdo business scenario inside current project boundaries.",
  audience: "The user as final decision-maker.",
  artifact_type: "Markdown result by default; CSV or JSON when the scenario benefits from structured data.",
  source_inputs: ["User ask", "Askdo source-of-truth files", "Public or project evidence when required"],
  constraints: [
    "User has final decision authority.",
    "Newly generated kits require approval before execution.",
    "Boundary ambiguity must be escalated.",
  ],
  risk_tolerance: "normal unless the ask implies high-risk, financial, legal, medical, destructive, irreversible, or structural work.",
  execution_depth: "Produce one complete, reviewable result for the selected scenario.",
  success_criteria: [
    "The scenario has a concrete result artifact.",
    "The run can close with a useful answer or an explicit blocked decision.",
    "Facts, assumptions, inferences, and unknowns are separated when material.",
  ],
  closure_logic: "Askdo returns a result artifact or a blocked decision request with explicit choices.",
});

const makeScenarioOptions = (state) => [
  {
    id: "direct-result-kit",
    name: "Direct Result Kit",
    outcome: "Build or reuse a kit, request approval when needed, then run it to produce the requested result.",
    likely_kit_path: "build_or_reuse",
    recommended: true,
  },
  {
    id: "research-first-kit",
    name: "Research First Kit",
    outcome: "Produce a research or planning result before creating a heavier execution flow.",
    likely_kit_path: "build_new_kit",
    recommended: false,
  },
  {
    id: "revise-before-build",
    name: "Revise Before Build",
    outcome: "Stop and revise the ask or planning frame before any kit generation.",
    likely_kit_path: "none",
    recommended: false,
  },
].map((option) => ({
  ...option,
  planning_frame: state.planning_frame,
  planning_decisions_applied: ["Scenario planning frame confirmed by user."],
  expected_artifacts: ["RESULT.md", "RUN_RESULT.json"],
  feasibility: "medium",
  risk_notes: ["Risk depends on the concrete ask and must be checked before execution."],
  closure_logic: "The scenario closes with a reviewable result or an explicit blocked decision.",
}));

const kitDirFor = (worktree, kitId) => path.join(worktree, "askdo", "kits", kitId);

const createPendingKit = ({ worktree, ask, selectedScenario }) => {
  const kitId = slugify(ask);
  const kitDir = kitDirFor(worktree, kitId);
  const decisionId = `${kitId}-build-approval`;

  ensureDir(kitDir);

  writeJson(path.join(kitDir, "kit.json"), {
    id: kitId,
    name: kitId.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" "),
    status: "under_review",
    purpose: `Handle the selected Askdo scenario: ${selectedScenario.name}.`,
    entry_file: "ENTRY.md",
    flow_file: "FLOW.md",
    mates_file: "MATES.md",
    roles_file: "ROLES.json",
    roster_file: "ROSTER.json",
    approval: {
      required: true,
      risk_level: "normal",
    },
    build_approval: {
      required: true,
      status: "pending",
      approved_at: null,
    },
    performance: {
      run_count: 0,
      success_count: 0,
      failure_count: 0,
      last_run_at: null,
    },
  });

  writeText(
    path.join(kitDir, "ENTRY.md"),
    `# ${kitId} Entry

## Purpose

${selectedScenario.outcome}

## Run Gate

This kit can run only when:

- \`kit.json\` status is \`active\`.
- \`build_approval.status\` is \`approved\`.
- the ask fits this kit boundary.

## Inputs

- Original ask: ${ask}
- Selected scenario: ${selectedScenario.name}

## Outputs

- \`RESULT.md\`
- \`RUN_RESULT.json\`
`,
  );

  writeText(
    path.join(kitDir, "FLOW.md"),
    `# ${kitId} Flow

## Flow Map

\`\`\`mermaid
flowchart TD
  A["Receive selected scenario"] --> B{"Kit approved and active?"}
  B -- "No" --> C["Return approval decision request"]
  C --> Z["Stop"]
  B -- "Yes" --> D{"Ask fits kit boundary?"}
  D -- "No" --> E["Refuse or revise"]
  D -- "Yes" --> F["Execute scenario assignments"]
  F --> G["Review result"]
  G --> H{"Review passed?"}
  H -- "No" --> I["Revise result"]
  I --> G
  H -- "Yes" --> J["Deliver result"]
\`\`\`
`,
  );

  writeText(
    path.join(kitDir, "MATES.md"),
    `# ${kitId} Mates

Roles are defined in \`ROLES.json\`. Concrete mates are defined in \`ROSTER.json\`.
`,
  );

  writeJson(path.join(kitDir, "ROLES.json"), {
    crew: {
      id: "default-crew",
      name: "Default Askdo Crew",
      purpose: "Execute and review the selected Askdo scenario.",
    },
    roles: [
      {
        id: "scenario-runner",
        name: "Scenario Runner",
        archetype: "scenario-execution",
        accountability: "Execute the selected scenario inside the confirmed planning frame.",
        boundary: "Owns result drafting and escalates unclear boundaries.",
        default_permission: "L0 Observer",
        acceptance_checks: ["Result matches selected scenario.", "Uncertainty is stated."],
        scenario_bindings: [
          {
            scenario: selectedScenario.id,
            responsibility_adjustment: "Execute this selected Askdo scenario.",
            permission_adjustment: "none",
          },
        ],
      },
      {
        id: "result-reviewer",
        name: "Result Reviewer",
        archetype: "quality-review",
        accountability: "Review correctness, boundary fit, and usefulness.",
        boundary: "Owns review and does not expand scope without approval.",
        default_permission: "L0 Observer",
        acceptance_checks: ["Claims are supported or marked uncertain.", "Result closes the ask."],
        scenario_bindings: [
          {
            scenario: selectedScenario.id,
            responsibility_adjustment: "Review this selected Askdo scenario result.",
            permission_adjustment: "none",
          },
        ],
      },
    ],
  });

  writeJson(path.join(kitDir, "ROSTER.json"), {
    mates: [
      {
        id: "scenario-worker",
        role_id: "scenario-runner",
        responsibility: "Draft the result for the selected scenario.",
        permission: "L0 Observer",
        status: "active",
      },
      {
        id: "quality-checker",
        role_id: "result-reviewer",
        responsibility: "Check result quality, boundaries, and uncertainty.",
        permission: "L0 Observer",
        status: "active",
      },
    ],
  });

  writeText(
    path.join(kitDir, "DECISION_REQUEST.md"),
    `# Decision Request

Decision ID: ${decisionId}

Kit: \`${kitId}\`

Requested action: Approve and run this newly generated Askdo kit.

Reason: Newly generated kits must be approved before execution.

Risk level: normal

## Choices

1. \`approve_and_run\` - Approve this kit and continue execution.
2. \`revise_kit\` - Revise the kit before execution.
3. \`reject\` - Do not run this kit.
`,
  );

  writeJson(path.join(kitDir, "DECISION_REQUEST.json"), {
    decision_id: decisionId,
    kit_id: kitId,
    kind: "build_approval",
    requested_action: "Approve and run this newly generated Askdo kit.",
    reason: "Newly generated kits must be approved before execution.",
    risk_level: "normal",
    expected_result: "Askdo will activate the kit and execute the selected scenario.",
    affected_areas: [
      `askdo/kits/${kitId}/kit.json`,
      `askdo/kits/${kitId}/ENTRY.md`,
      `askdo/kits/${kitId}/FLOW.md`,
      `askdo/kits/${kitId}/MATES.md`,
      `askdo/kits/${kitId}/ROLES.json`,
      `askdo/kits/${kitId}/ROSTER.json`,
    ],
    choices: [
      { id: "approve_and_run", label: "Approve and run", effect: "Activate and run the kit." },
      { id: "revise_kit", label: "Revise kit", effect: "Keep the kit pending for revision." },
      { id: "reject", label: "Reject", effect: "Do not activate or run the kit." },
    ],
    default_choice: "revise_kit",
    status: "pending",
    selected_choice: null,
    decided_at: null,
  });

  return { kitId, decisionId };
};

const approveKit = ({ worktree, kitId }) => {
  const kitDir = kitDirFor(worktree, kitId);
  const kitPath = path.join(kitDir, "kit.json");
  const decisionPath = path.join(kitDir, "DECISION_REQUEST.json");
  const kit = readJson(kitPath);
  const decision = readJson(decisionPath);
  if (!kit || !decision) throw new Error(`Missing approval files for ${kitId}`);

  kit.status = "active";
  kit.build_approval.status = "approved";
  kit.build_approval.approved_at = nowIso();
  writeJson(kitPath, kit);

  decision.status = "approved";
  decision.selected_choice = "approve_and_run";
  decision.decided_at = nowIso();
  writeJson(decisionPath, decision);
};

const runKit = ({ worktree, kitId, ask, selectedScenario }) => {
  const runId = `${kitId}-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`;
  const runDir = path.join(worktree, "askdo", "runs", runId);
  ensureDir(runDir);

  writeText(
    path.join(runDir, "RESULT.md"),
    `# Askdo Result

Run ID: ${runId}

Kit: \`${kitId}\`

## Ask

${ask}

## Selected Scenario

${selectedScenario.name}

## Result

Askdo advanced through intake, planning confirmation, scenario selection, kit approval, and run entry.

The OpenCode model should now produce the substantive domain answer inside this confirmed kit boundary, using current evidence when required.
`,
  );

  writeJson(path.join(runDir, "RUN_RESULT.json"), {
    run_id: runId,
    kit_id: kitId,
    status: "completed",
    created_at: nowIso(),
    artifacts: [`askdo/runs/${runId}/RESULT.md`, `askdo/runs/${runId}/RUN_RESULT.json`],
  });

  const kitPath = path.join(kitDirFor(worktree, kitId), "kit.json");
  const kit = readJson(kitPath);
  if (kit) {
    kit.performance.run_count += 1;
    kit.performance.success_count += 1;
    kit.performance.last_run_at = nowIso();
    writeJson(kitPath, kit);
  }

  return { runId };
};

export const runAskdoTurn = async ({ input, mode = "ask", context }) => {
  const worktree = context.worktree || context.directory || process.cwd();
  const sessionID = context.sessionID || "default";
  const ctx = { worktree, sessionID };
  const text = cleanInput(input);
  const state = loadState(ctx);

  if (mode === "reset") {
    const filePath = statePathFor(ctx);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    return format({ status: "reset", message: "Askdo OpenCode state cleared." });
  }

  if (state?.status === "waiting_for_planning_confirmation") {
    if (!isConfirmPlanning(text)) {
      state.status = "waiting_for_planning_revision";
      state.revision_request = text;
      state.updated_at = nowIso();
      saveState(ctx, state);
      return format({
        status: state.status,
        message: "Planning revision recorded. Confirm the revised frame before scenario recommendation.",
        expected_input: "confirm_planning_frame",
      });
    }

    state.status = "waiting_for_scenario_selection";
    state.scenario_options = makeScenarioOptions(state);
    state.updated_at = nowIso();
    saveState(ctx, state);
    return format({
      status: state.status,
      message: "Scenario planning gate resolved. Choose one scenario before kit generation or execution.",
      scenario_options: state.scenario_options,
      choices: state.scenario_options.map((option, index) => `${index + 1}:${option.id}`),
      recommended: "1:direct-result-kit",
    });
  }

  if (state?.status === "waiting_for_scenario_selection") {
    const index = Number.parseInt(text, 10) - 1;
    const selected = state.scenario_options.find((option) => option.id === text) || state.scenario_options[index];
    if (!selected) {
      return format({
        status: state.status,
        message: "Invalid scenario selection. Choose a scenario number or id.",
        choices: state.scenario_options.map((option, index) => `${index + 1}:${option.id}`),
      });
    }

    const kit = createPendingKit({ worktree, ask: state.ask, selectedScenario: selected });
    state.status = "waiting_for_kit_approval";
    state.selected_scenario = selected;
    state.kit_id = kit.kitId;
    state.pending_decision = {
      decision_id: kit.decisionId,
      choices: ["approve_and_run", "revise_kit", "reject"],
    };
    state.updated_at = nowIso();
    saveState(ctx, state);
    return format({
      status: state.status,
      message: "Pending kit generated. Askdo must stop until user decision.",
      kit_id: kit.kitId,
      decision_request: `askdo/kits/${kit.kitId}/DECISION_REQUEST.md`,
      choices: state.pending_decision.choices,
    });
  }

  if (state?.status === "waiting_for_kit_approval") {
    if (text === "reject") {
      state.status = "rejected";
      state.updated_at = nowIso();
      saveState(ctx, state);
      return format({ status: "rejected", message: "Askdo execution rejected." });
    }

    if (text === "revise_kit") {
      state.status = "revision_requested";
      state.updated_at = nowIso();
      saveState(ctx, state);
      return format({ status: "revision_requested", message: "Provide kit revision details." });
    }

    if (text !== "approve_and_run") {
      return format({
        status: state.status,
        message: "Askdo is waiting for an explicit kit approval decision.",
        choices: ["approve_and_run", "revise_kit", "reject"],
      });
    }

    approveKit({ worktree, kitId: state.kit_id });
    const run = runKit({
      worktree,
      kitId: state.kit_id,
      ask: state.ask,
      selectedScenario: state.selected_scenario,
    });
    state.status = "completed";
    state.run_id = run.runId;
    state.updated_at = nowIso();
    saveState(ctx, state);
    return format({
      status: "completed",
      message: "Askdo approved and ran the selected kit.",
      kit_id: state.kit_id,
      run_id: run.runId,
      artifacts: [`askdo/runs/${run.runId}/RESULT.md`, `askdo/runs/${run.runId}/RUN_RESULT.json`],
    });
  }

  const nextState = {
    session_id: sessionID,
    status: "waiting_for_planning_confirmation",
    ask: text,
    mode,
    planning_frame: makePlanningFrame(text),
    created_at: nowIso(),
    updated_at: nowIso(),
  };
  saveState(ctx, nextState);

  return format({
    status: "waiting_for_planning_confirmation",
    message: "Askdo intake complete. Confirm planning before scenario recommendation.",
    planning_frame: nextState.planning_frame,
    choices: ["confirm_planning_frame", "revise_planning_frame", "stop"],
    recommended: "confirm_planning_frame",
  });
};
