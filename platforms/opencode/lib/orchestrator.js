import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

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

const defaultProjectConfig = {
  product: "Askdo",
  version: "0.1.5",
  kits_dir: "./askdo/kits",
  runs_dir: "./askdo/runs",
  asset_roots: {
    kits: ["./askdo/kits"],
    runs: ["./askdo/runs"],
    deliverables: ["./askdo/deliverables"],
  },
  language: {
    internal_source: "en",
    kit_source_default: "en",
    deliverable_default: "en",
    ask_when_unspecified: true,
  },
  capability_exposure: {
    public: [
      "askdo-intake",
      "askdo-list-kits",
      "askdo-check",
      "askdo-build-kit",
      "askdo-run-kit",
      "askdo-audit-kit",
      "askdo-level",
    ],
    internal_keyword_only: ["askdo-internal-workshop", "askdo-evolve"],
    maintenance: [],
  },
  ownership: "user-managed",
  uninstall_policy: "preserve_kits",
};

const configPathFor = (worktree) => path.join(worktree, "askdo", "config.json");

const normalizeConfig = (config = {}) => ({
  ...defaultProjectConfig,
  ...config,
  asset_roots: {
    ...defaultProjectConfig.asset_roots,
    ...(config.asset_roots || {}),
  },
  language: {
    ...defaultProjectConfig.language,
    ...(config.language || {}),
  },
  capability_exposure: {
    ...defaultProjectConfig.capability_exposure,
    ...(config.capability_exposure || {}),
  },
});

const ensureProjectConfig = (worktree) => {
  const filePath = configPathFor(worktree);
  const existing = readJson(filePath);
  if (!existing) {
    writeJson(filePath, defaultProjectConfig);
    return defaultProjectConfig;
  }
  return normalizeConfig(existing);
};

const resolveProjectPath = (worktree, value) =>
  path.isAbsolute(value) ? value : path.join(worktree, value);

const firstAssetRoot = (worktree, type, legacyKey, fallback) => {
  const config = ensureProjectConfig(worktree);
  const roots = config.asset_roots?.[type] || [];
  return resolveProjectPath(worktree, roots[0] || config[legacyKey] || fallback);
};

const assetRootsFor = (worktree, type, legacyKey, fallback) => {
  const config = ensureProjectConfig(worktree);
  const roots = [
    ...(config.asset_roots?.[type] || []),
    config[legacyKey],
    fallback,
  ].filter(Boolean);
  return [...new Set(roots.map((root) => resolveProjectPath(worktree, root)))];
};

const kitRootFor = (worktree) => firstAssetRoot(worktree, "kits", "kits_dir", "./askdo/kits");

const runRootFor = (worktree) => firstAssetRoot(worktree, "runs", "runs_dir", "./askdo/runs");

const relativeArtifactPath = (worktree, filePath) =>
  path.relative(worktree, filePath).replace(/\\/g, "/");

const isConfirmPlanning = (input) =>
  ["confirm_planning_frame", "confirm", "1", "确认"].includes(cleanInput(input));

const requiredKitFiles = ["kit.json", "ENTRY.md", "FLOW.md", "MATES.md", "ROLES.json", "ROSTER.json"];

const hasContextContract = (role) => {
  const contract = role?.context_contract;
  return Boolean(
    contract
      && Array.isArray(contract.inputs)
      && Array.isArray(contract.exclusions)
      && Array.isArray(contract.return_packet)
      && typeof contract.memory_write === "string",
  );
};

const readKitSummary = (worktree, kitDir, rootDir) => {
  const kitPath = path.join(kitDir, "kit.json");
  const kit = readJson(kitPath);
  if (!kit) return null;
  const missing_files = requiredKitFiles.filter((file) => !fs.existsSync(path.join(kitDir, file)));
  return {
    id: kit.id || path.basename(kitDir),
    name: kit.name || kit.id || path.basename(kitDir),
    status: kit.status || "unknown",
    approval_status: kit.build_approval?.status || "unknown",
    last_run_at: kit.performance?.last_run_at || null,
    last_audit_verdict: kit.quality?.last_audit_verdict || null,
    maturity: kit.quality?.maturity || null,
    source_root: relativeArtifactPath(worktree, kitDir),
    registry_root: relativeArtifactPath(worktree, rootDir),
    missing_files,
    kit,
  };
};

const listKits = (worktree) => {
  const roots = assetRootsFor(worktree, "kits", "kits_dir", "./askdo/kits");
  const seen = new Set();
  const kits = [];
  const warnings = [];

  for (const root of roots) {
    if (!fs.existsSync(root)) {
      warnings.push({ type: "missing_root", path: relativeArtifactPath(worktree, root) });
      continue;
    }

    for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const kitDir = path.join(root, entry.name);
      const kitPath = path.join(kitDir, "kit.json");
      if (!fs.existsSync(kitPath) || seen.has(kitPath)) continue;
      seen.add(kitPath);
      const summary = readKitSummary(worktree, kitDir, root);
      if (summary) kits.push(summary);
    }
  }

  return {
    status: "completed",
    mode: "list_kits",
    kit_count: kits.length,
    kits: kits.map(({ kit, ...summary }) => summary),
    warnings,
  };
};

const findKit = (worktree, input) => {
  const target = cleanInput(input);
  const result = listKits(worktree);
  if (!target) return { result, kit: null, error: "Missing kit id or name." };

  const lowerTarget = target.toLowerCase();
  const kitSummary = result.kits.find((kit) =>
    [kit.id, kit.name, kit.source_root].some((value) => (value || "").toLowerCase() === lowerTarget),
  ) || result.kits.find((kit) =>
    [kit.id, kit.name, kit.source_root].some((value) => (value || "").toLowerCase().includes(lowerTarget)),
  );

  if (!kitSummary) return { result, kit: null, error: `Kit not found: ${target}` };
  const kitDir = resolveProjectPath(worktree, kitSummary.source_root);
  return {
    result,
    kit: readKitSummary(worktree, kitDir, resolveProjectPath(worktree, kitSummary.registry_root)),
    error: null,
  };
};

const auditKit = (worktree, input) => {
  const { result, kit, error } = findKit(worktree, input);
  if (error) {
    return {
      status: "blocked",
      mode: "audit_kit",
      message: error,
      available_kits: result.kits.map((item) => ({ id: item.id, name: item.name, source_root: item.source_root })),
    };
  }

  const blocking_issues = [];
  const improvement_notes = [];
  const scores = {
    structure: 10,
    boundary: 8,
    flow: 8,
    crew: 8,
    context_contract: 8,
    approval: 10,
    output: 8,
    reuse: 7,
    language: 8,
  };

  if (kit.missing_files.length) {
    scores.structure = Math.max(0, 10 - kit.missing_files.length * 2);
    blocking_issues.push({
      id: "missing-required-files",
      type: "structure",
      priority: "high",
      blocking: true,
      summary: `Missing required files: ${kit.missing_files.join(", ")}`,
      recommendation: "Add the missing formal kit source files before running or approving this kit.",
      current_loop_action: "revise_now",
      next_trigger: "kit approval review",
    });
  }

  if (kit.status !== "active") {
    scores.approval = Math.min(scores.approval, 6);
    blocking_issues.push({
      id: "kit-not-active",
      type: "lifecycle",
      priority: "high",
      blocking: true,
      summary: `Kit status is ${kit.status}, not active.`,
      recommendation: "Resolve lifecycle status before execution.",
      current_loop_action: "ask_user",
      next_trigger: "user lifecycle decision",
    });
  }

  if (kit.approval_status !== "approved") {
    scores.approval = Math.min(scores.approval, 5);
    blocking_issues.push({
      id: "build-approval-not-approved",
      type: "approval",
      priority: "high",
      blocking: true,
      summary: `Build approval is ${kit.approval_status}, not approved.`,
      recommendation: "Use a decision gate before execution.",
      current_loop_action: "ask_user",
      next_trigger: "build approval decision",
    });
  }

  const rolesDoc = readJson(path.join(worktree, kit.source_root, "ROLES.json"));
  const roles = Array.isArray(rolesDoc?.roles) ? rolesDoc.roles : [];
  const rolesMissingContextContract = roles.filter((role) => !hasContextContract(role)).map((role) => role.id || role.name || "unknown-role");
  if (rolesMissingContextContract.length) {
    scores.context_contract = Math.max(0, 10 - rolesMissingContextContract.length * 2);
    improvement_notes.push({
      id: "missing-context-contracts",
      type: "context_contract",
      priority: "normal",
      blocking: false,
      summary: `Roles missing context contracts: ${rolesMissingContextContract.join(", ")}`,
      recommendation: "Add inputs, exclusions, return_packet, and memory_write to each role before the next run review.",
      current_loop_action: "record_level_note",
      next_trigger: "next kit audit or run review",
    });
  }

  if (!kit.maturity) {
    improvement_notes.push({
      id: "missing-maturity-signal",
      type: "lifecycle",
      priority: "normal",
      blocking: false,
      summary: "Kit has no quality maturity signal.",
      recommendation: "Set quality.maturity after the next deep audit or stable reuse milestone.",
      current_loop_action: "record_level_note",
      next_trigger: "next deep audit or stable reuse milestone",
    });
  }

  if (!kit.last_audit_verdict) {
    improvement_notes.push({
      id: "missing-audit-verdict",
      type: "lifecycle",
      priority: "normal",
      blocking: false,
      summary: "Kit has no last audit verdict.",
      recommendation: "Run a deep kit audit and record last_audit_verdict when the findings matter.",
      current_loop_action: "record_level_note",
      next_trigger: "next deep kit audit",
    });
  }

  const verdict = blocking_issues.length
    ? "revise_before_run"
    : improvement_notes.length
      ? "pass_with_level_notes"
      : "pass";

  return {
    schema_version: "1.0",
    status: "completed",
    mode: "audit_kit",
    scope: "external_kit",
    target: { id: kit.id, path: kit.source_root },
    verdict,
    generated_at: nowIso(),
    scores,
    blocking_issues,
    improvement_notes,
    recommended_next_action: blocking_issues.length ? "revise_kit" : improvement_notes.length ? "record_level_and_run" : "approve_and_run",
    unknowns: result.warnings.map((warning) => `Registry warning: ${warning.type} ${warning.path}`),
  };
};

const internalWorkshop = (worktree) => {
  const sourceFiles = [
    "AGENTS.md",
    "README.md",
    "docs/QUALITY_AND_ASSET_GOVERNANCE.md",
    "brain/schemas/internal-workshop.schema.json",
    "brain/schemas/evolution.schema.json",
    "brain/flows/EVOLVE_ASKDO.md",
    "templates/internal-workshop/INTERNAL_WORKSHOP_REPORT.md",
    "templates/internal-workshop/INTERNAL_WORKSHOP_REPORT.json",
    "templates/evolution/EVOLUTION_REPORT.md",
    "templates/evolution/EVOLUTION_REPORT.json",
    "skills/askdo-internal-workshop/SKILL.md",
    "skills/askdo-evolve/SKILL.md",
    "platforms/opencode/lib/orchestrator.js",
    "platforms/opencode/.opencode/plugins/askdo.js",
    "platforms/codex/.codex-plugin/plugin.json",
  ];
  const findings = [];
  const missing = sourceFiles.filter((file) => !fs.existsSync(path.join(worktree, file)));

  if (missing.length) {
    findings.push({
      id: "missing-internal-source-files",
      category: "structural_decision_required",
      priority: "high",
      summary: `Missing internal source files: ${missing.join(", ")}`,
      evidence: missing.map((file) => ({ file, note: "Expected internal workshop source file is missing." })),
      recommendation: "Restore missing internal self-review files before relying on internal workshop output.",
    });
  }

  const codexManifest = readJson(path.join(worktree, "platforms", "codex", ".codex-plugin", "plugin.json"));
  const codexSkills = new Set((codexManifest?.skills || []).map((skill) => skill.replace("../../skills/", "")));
  for (const skill of ["askdo-list-kits", "askdo-audit-kit", "askdo-internal-workshop", "askdo-evolve"]) {
    if (!codexSkills.has(skill)) {
      findings.push({
        id: `${skill}-missing-from-codex`,
        category: "platform_adapter_update",
        priority: "normal",
        summary: `${skill} is not registered in the Codex plugin manifest.`,
        evidence: [{ file: "platforms/codex/.codex-plugin/plugin.json", note: "Manifest skill list does not include the capability." }],
        recommendation: "Add the skill to the Codex plugin manifest.",
      });
    }
  }

  const opencodePlugin = path.join(worktree, "platforms", "opencode", ".opencode", "plugins", "askdo.js");
  const pluginText = fs.existsSync(opencodePlugin) ? fs.readFileSync(opencodePlugin, "utf8") : "";
  for (const phrase of ["askdo-list-kits", "askdo-audit-kit", "askdo-internal-workshop", "askdo-evolve"]) {
    if (!pluginText.includes(phrase)) {
      findings.push({
        id: `${phrase}-missing-from-opencode-bootstrap`,
        category: "platform_adapter_update",
        priority: "normal",
        summary: `${phrase} is not described in the OpenCode bootstrap context.`,
        evidence: [{ file: "platforms/opencode/.opencode/plugins/askdo.js", note: "Bootstrap text does not mention the capability." }],
        recommendation: "Add the capability boundary to OpenCode bootstrap text.",
      });
    }
  }

  const structural = findings.some((finding) => finding.category === "structural_decision_required");
  const verdict = structural ? "structural_decision_required" : findings.length ? "safe_sync_updates_available" : "pass";

  return {
    schema_version: "1.0",
    status: "completed",
    mode: "internal_workshop",
    scope: "internal_askdo",
    target: { id: "askdo", path: "." },
    verdict,
    generated_at: nowIso(),
    scores: {
      source_consistency: missing.length ? 6 : 9,
      schema_template_alignment: fs.existsSync(path.join(worktree, "brain", "schemas", "internal-workshop.schema.json")) ? 9 : 4,
      skill_boundary_clarity: 9,
      platform_adapter_alignment: findings.some((finding) => finding.category === "platform_adapter_update") ? 7 : 9,
      capability_exposure: 9,
      language_policy_alignment: 9,
    },
    findings,
    proposed_decisions: structural
      ? [{
          id: "restore-internal-workshop-source",
          decision_needed: "Restore missing internal workshop source files before the next maintenance run.",
          options: ["restore_missing_sources", "defer_to_internal_backlog"],
        }]
      : [],
    backlog_items: findings.map((finding) => ({
      id: finding.id,
      status: finding.category === "structural_decision_required" ? "needs_decision" : "accepted",
      priority: finding.priority,
      summary: finding.summary,
      owner_area: finding.category === "platform_adapter_update" ? "platforms" : "product",
    })),
    recommended_next_action: structural ? "create_decision_request" : findings.length ? "apply_safe_sync_updates" : "stop",
    unknowns: [],
  };
};

const evolveAskdo = (worktree) => {
  const requiredEvolutionFiles = [
    "brain/flows/EVOLVE_ASKDO.md",
    "brain/schemas/evolution.schema.json",
    "templates/evolution/EVOLUTION_REPORT.md",
    "templates/evolution/EVOLUTION_REPORT.json",
    "skills/askdo-evolve/SKILL.md",
  ];
  const signals = [];
  const candidates = [];
  const decisions_required = [];
  const actions_taken = [];
  const learning_records = [];
  const verification = [];

  const missingEvolutionFiles = requiredEvolutionFiles.filter((file) => !fs.existsSync(path.join(worktree, file)));
  if (missingEvolutionFiles.length) {
    signals.push({
      id: "missing-evolution-source",
      type: "missing_contract",
      summary: "Product evolution capability is referenced but missing source files.",
      evidence: missingEvolutionFiles.map((file) => ({ file, note: "Expected product evolution source file is missing." })),
    });
    candidates.push({
      id: "restore-evolution-source",
      summary: "Restore missing product evolution source files.",
      impact: "Askdo cannot run a complete product evolution loop without the flow, schema, templates, and skill.",
      risk_level: "normal",
      authority_domain: "product_maintainer",
      current_loop_action: "request_decision",
      evidence: missingEvolutionFiles.map((file) => ({ file, note: "Missing evolution source." })),
    });
    decisions_required.push({
      candidate_id: "restore-evolution-source",
      decision_needed: "Restore or intentionally remove the product evolution capability.",
      options: ["restore_evolution_source", "remove_evolution_capability"],
    });
  }

  const codexManifest = readJson(path.join(worktree, "platforms", "codex", ".codex-plugin", "plugin.json"));
  const codexSkills = new Set((codexManifest?.skills || []).map((skill) => skill.replace("../../skills/", "")));
  if (!codexSkills.has("askdo-evolve")) {
    signals.push({
      id: "evolve-missing-from-codex",
      type: "drift",
      summary: "askdo-evolve is not registered in the Codex plugin manifest.",
      evidence: [{ file: "platforms/codex/.codex-plugin/plugin.json", note: "Skill list does not include askdo-evolve." }],
    });
    candidates.push({
      id: "register-evolve-codex",
      summary: "Register askdo-evolve in the Codex manifest.",
      impact: "Product maintainer maintenance capability is not available through the Codex platform package.",
      risk_level: "low",
      authority_domain: "product_maintainer",
      current_loop_action: "apply_now",
      evidence: [{ file: "platforms/codex/.codex-plugin/plugin.json", note: "Missing askdo-evolve entry." }],
    });
  }

  const opencodePlugin = path.join(worktree, "platforms", "opencode", ".opencode", "plugins", "askdo.js");
  const pluginText = fs.existsSync(opencodePlugin) ? fs.readFileSync(opencodePlugin, "utf8") : "";
  if (!pluginText.includes("askdo-evolve")) {
    signals.push({
      id: "evolve-missing-from-opencode-bootstrap",
      type: "drift",
      summary: "askdo-evolve is not described in the OpenCode bootstrap context.",
      evidence: [{ file: "platforms/opencode/.opencode/plugins/askdo.js", note: "Bootstrap text does not mention askdo-evolve." }],
    });
    candidates.push({
      id: "describe-evolve-opencode",
      summary: "Describe askdo-evolve in the OpenCode bootstrap context.",
      impact: "OpenCode users acting as product maintainers may not discover the internal evolution capability.",
      risk_level: "low",
      authority_domain: "product_maintainer",
      current_loop_action: "apply_now",
      evidence: [{ file: "platforms/opencode/.opencode/plugins/askdo.js", note: "Missing askdo-evolve bootstrap text." }],
    });
  }

  const trackedAskdo = (() => {
    try {
      const gitDir = path.join(worktree, ".git");
      if (!fs.existsSync(gitDir)) return [];
      const output = execFileSync("git", ["ls-files", "askdo"], { cwd: worktree, encoding: "utf8" }).trim();
      return output ? output.split(/\r?\n/).filter(Boolean) : [];
    } catch {
      return [];
    }
  })();
  if (trackedAskdo.length) {
    signals.push({
      id: "tracked-user-assets",
      type: "runtime_evidence",
      summary: "Tracked askdo/ user assets still exist in product source.",
      evidence: [{ file: "scripts/check-assets.js", note: `${trackedAskdo.length} tracked askdo/ files require a concrete migration trigger before adding more.` }],
    });
    candidates.push({
      id: "decide-user-asset-migration",
      summary: "Decide the migration trigger for tracked askdo/ user assets.",
      impact: "Asset ownership remains noisy until the product maintainer decides whether and when to migrate legacy tracked user assets.",
      risk_level: "normal",
      authority_domain: "product_maintainer",
      current_loop_action: "request_decision",
      evidence: [{ file: "scripts/check-assets.js", note: "Asset boundary check reports tracked askdo/ files." }],
    });
    decisions_required.push({
      candidate_id: "decide-user-asset-migration",
      decision_needed: "Choose the product-maintainer trigger for migrating or retaining legacy tracked askdo/ assets.",
      options: ["migrate_legacy_assets_now", "retain_until_specific_release", "convert_to_fixtures"],
    });
  }

  if (!signals.length) {
    learning_records.push({
      id: "evolution-loop-clean",
      summary: "No current product evolution signal required a change.",
      implication: "Continue using check and smoke output as the first runtime evidence source for product evolution.",
    });
  }

  verification.push({
    command: "npm.cmd run check",
    status: "not_run",
    summary: "Run after applying product evolution changes.",
  });

  return {
    schema_version: "1.0",
    status: "completed",
    mode: "evolve",
    scope: "askdo_product_evolution",
    target: { id: "askdo", path: "." },
    generated_at: nowIso(),
    signals,
    candidates,
    actions_taken,
    decisions_required,
    learning_records,
    verification,
    recommended_next_action: decisions_required.length
      ? "request_product_maintainer_decision"
      : candidates.some((candidate) => candidate.current_loop_action === "apply_now")
        ? "apply_safe_changes"
        : "record_learning_only",
  };
};

const makePlanningFrame = (ask) => ({
  objective: ask,
  scope: "The selected Askdo business scenario inside current project boundaries.",
  audience: "The kit owner or run decision-maker.",
  artifact_type: "Markdown result by default; CSV or JSON when the scenario benefits from structured data.",
  source_inputs: ["User ask", "Askdo source-of-truth files", "Public or project evidence when required"],
  constraints: [
    "Kit owner or run decision-maker has final authority for generated kit work.",
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

const kitDirFor = (worktree, kitId) => path.join(kitRootFor(worktree), kitId);

const createPendingKit = ({ worktree, ask, selectedScenario }) => {
  const kitId = slugify(ask);
  const kitDir = kitDirFor(worktree, kitId);
  const decisionId = `${kitId}-build-approval`;

  ensureDir(kitDir);

  writeJson(path.join(kitDir, "kit.json"), {
    id: kitId,
    name: kitId.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" "),
    version: "0.1.0",
    status: "under_review",
    purpose: `Handle the selected Askdo scenario: ${selectedScenario.name}.`,
    mission: {
      why: selectedScenario.outcome,
      success_looks_like: [
        "The run produces a reviewable result that satisfies the selected scenario closure logic.",
      ],
      constraints: [
        "Stay inside the confirmed planning frame, Askdo approval rules, and available evidence.",
      ],
      out_of_scope: [
        "Do not expand the kit boundary or permissions without a user decision.",
      ],
    },
    entry_file: "ENTRY.md",
    flow_file: "FLOW.md",
    mates_file: "MATES.md",
    roles_file: "ROLES.json",
    roster_file: "ROSTER.json",
    source_root: ".",
    run_root: "./runs",
    deliverable_root: "./deliverables",
    language: {
      source: "en",
      deliverable_default: ensureProjectConfig(worktree).language.deliverable_default,
    },
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
      review_failure_count: 0,
      reuse_count: 0,
      delivery_count: 0,
      level_note_count: 0,
      last_run_at: null,
      last_success_at: null,
      last_audit_at: null,
    },
    quality: {
      maturity: "draft",
      last_audit_verdict: null,
      last_audit_at: null,
      level_note_count: 0,
    },
  });

  writeText(
    path.join(kitDir, "ENTRY.md"),
    `# ${kitId} Entry

## Purpose

${selectedScenario.outcome}

## Mission

Why this kit exists:

${selectedScenario.outcome}

Success looks like:

- The run produces a reviewable result that satisfies the selected scenario closure logic.

Constraints:

- Stay inside the confirmed planning frame, Askdo approval rules, and available evidence.

Out of scope:

- Do not expand the kit boundary or permissions without a user decision.

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
  H -- "Yes" --> K{"Useful non-blocking improvements?"}
  K -- "Yes" --> L["Record level notes"]
  K -- "No" --> J["Deliver result"]
  L --> J
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
        context_contract: {
          inputs: [
            "selected scenario",
            "kit mission",
            "user ask",
            "approved constraints",
            "allowed evidence",
          ],
          exclusions: [
            "reviewer critique scratchpad",
            "unrelated run history",
            "unapproved boundary-expanding context",
          ],
          return_packet: [
            "result draft",
            "evidence used",
            "assumptions",
            "unknowns",
            "boundary questions",
          ],
          memory_write: "none",
        },
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
        context_contract: {
          inputs: [
            "kit mission",
            "selected scenario",
            "result draft",
            "acceptance checks",
            "risk and permission rules",
          ],
          exclusions: [
            "runner scratchpad unless needed as evidence",
            "unrelated kit history",
            "unapproved new objectives",
          ],
          return_packet: [
            "blocking issues",
            "non-blocking level notes with evidence and implication",
            "approval recommendation",
            "remaining unknowns",
          ],
          memory_write: "propose_level_note",
        },
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
      relativeArtifactPath(worktree, path.join(kitDir, "kit.json")),
      relativeArtifactPath(worktree, path.join(kitDir, "ENTRY.md")),
      relativeArtifactPath(worktree, path.join(kitDir, "FLOW.md")),
      relativeArtifactPath(worktree, path.join(kitDir, "MATES.md")),
      relativeArtifactPath(worktree, path.join(kitDir, "ROLES.json")),
      relativeArtifactPath(worktree, path.join(kitDir, "ROSTER.json")),
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

  return {
    kitId,
    decisionId,
    decisionRequestPath: relativeArtifactPath(worktree, path.join(kitDir, "DECISION_REQUEST.md")),
  };
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
  const runDir = path.join(runRootFor(worktree), runId);
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
    artifacts: [
      relativeArtifactPath(worktree, path.join(runDir, "RESULT.md")),
      relativeArtifactPath(worktree, path.join(runDir, "RUN_RESULT.json")),
    ],
  });

  const kitPath = path.join(kitDirFor(worktree, kitId), "kit.json");
  const kit = readJson(kitPath);
  if (kit) {
    const completedAt = nowIso();
    kit.performance.run_count += 1;
    kit.performance.success_count += 1;
    kit.performance.last_run_at = completedAt;
    kit.performance.last_success_at = completedAt;
    writeJson(kitPath, kit);
  }

  return { runId };
};

export const runAskdoTurn = async ({ input, mode = "ask", context }) => {
  const worktree = context.worktree || context.directory || process.cwd();
  const sessionID = context.sessionID || "default";
  const ctx = { worktree, sessionID };
  const text = cleanInput(input);
  ensureProjectConfig(worktree);
  const state = loadState(ctx);

  if (mode === "reset") {
    const filePath = statePathFor(ctx);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    return format({ status: "reset", message: "Askdo OpenCode state cleared." });
  }

  if (mode === "list_kits") {
    return format(listKits(worktree));
  }

  if (mode === "audit_kit") {
    return format(auditKit(worktree, text));
  }

  if (mode === "internal_workshop") {
    return format(internalWorkshop(worktree));
  }

  if (mode === "evolve") {
    return format(evolveAskdo(worktree));
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
      decision_request: kit.decisionRequestPath,
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
      artifacts: [
        relativeArtifactPath(worktree, path.join(runRootFor(worktree), run.runId, "RESULT.md")),
        relativeArtifactPath(worktree, path.join(runRootFor(worktree), run.runId, "RUN_RESULT.json")),
      ],
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
