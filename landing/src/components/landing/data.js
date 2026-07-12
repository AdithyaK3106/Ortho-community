// Shared static content for the Ortho landing page.
// One rule: every command shown is real, every output shape is demonstrable today.

// CLI Showcase — the demo workflow: scan → analyze → impact → context.
export const CLI_COMMANDS = [
  {
    id: "scan",
    label: "ortho scan",
    description: "index the repository — once",
    output: [
      { type: "cmd", text: "ortho scan" },
      { type: "info", text: "» detecting languages…" },
      { type: "info", text: "» parsing 1,284 files via tree-sitter" },
      { type: "ok", text: "✓ 12,847 symbols extracted" },
      { type: "ok", text: "✓ 8,431 imports resolved" },
      { type: "ok", text: "✓ 3,204 call-graph edges built" },
      { type: "muted", text: "  storage » .ortho/ortho.db  (48.2 MB)" },
      { type: "ok", text: "scan complete in 4.31s" },
    ],
  },
  {
    id: "analyze",
    label: "ortho analyze",
    description: "know your architecture",
    output: [
      { type: "cmd", text: "ortho analyze" },
      { type: "info", text: "» detecting architecture style…" },
      { type: "ok", text: "  style: LAYERED    confidence: 0.87" },
      { type: "muted", text: "  layers detected  » 3   (data / business / presentation)" },
      { type: "muted", text: "  subsystems       » 7   (louvain clustering)" },
      { type: "warn", text: "  circular deps    » 2   detected — see report" },
      { type: "muted", text: "  tech debt (avg)  » 0.24 / module" },
      { type: "ok", text: "report » .ortho/reports/architecture.md" },
    ],
  },
  {
    id: "impact",
    label: "ortho analyze --impact",
    description: "see the blast radius",
    output: [
      { type: "cmd", text: "ortho analyze --impact src/context_hub/store.py" },
      { type: "info", text: "» computing blast radius…" },
      { type: "ok", text: "  direct dependents   » 6" },
      { type: "ok", text: "  transitive          » 24" },
      { type: "warn", text: "  high-risk callers   » 3   (>= 0.8 centrality)" },
      { type: "muted", text: "   ├─ src/api/routes/context.py" },
      { type: "muted", text: "   ├─ src/cli/commands/context.py" },
      { type: "muted", text: "   └─ src/architecture/reporting.py" },
      { type: "ok", text: "  confidence » HIGH" },
    ],
  },
  {
    id: "context",
    label: "ortho context",
    description: "find the code that matters",
    output: [
      { type: "cmd", text: 'ortho context --query "authentication rate limiting"' },
      { type: "info", text: "» searching indexed symbols…" },
      { type: "ok", text: "  3 results / 0.09s" },
      { type: "muted", text: "  ─────────────────────────────────────────" },
      { type: "muted", text: "  src/auth/rate_limit.py     RateLimiter     0.94" },
      { type: "muted", text: "  src/auth/middleware.py     auth_check      0.81" },
      { type: "muted", text: "  src/config/limits.py       LIMIT_RULES     0.72" },
      { type: "ok", text: "  local » .ortho/ortho.db   (no network)" },
    ],
  },
];

// Problem section — relatable failure modes, each answered by a shipped capability.
export const PROBLEMS = [
  {
    title: "AI forgets your project.",
    problem:
      "Every session starts from zero. You paste files, re-explain conventions, repeat yourself.",
    solution:
      "Ortho indexes your repository once. Files, symbols and architecture — always in context.",
  },
  {
    title: "AI edits the wrong files.",
    problem:
      "Without knowing your call graph, the model touches modules it shouldn't and misses the ones that matter.",
    solution:
      "Ortho scans your repository first. Recommendations point to the correct files, every time.",
  },
  {
    title: "AI breaks your architecture.",
    problem:
      "Suggestions look right in isolation and quietly violate your layers and boundaries.",
    solution:
      "Ortho understands your architecture. Every recommendation respects the design you already have.",
  },
  {
    title: "AI ships breaking changes.",
    problem:
      "A change that looks safe ripples through dependents nobody thought to check.",
    solution:
      "Ortho computes the blast radius before anything changes — every dependent, every risk, visible up front.",
  },
];

// Solution flow — the pipeline, ending with the human in control.
export const FLOW_STEPS = [
  { id: 1, label: "You ask",                 detail: "a real engineering question." },
  { id: 2, label: "Repository scan",         detail: "every file, symbol and dependency." },
  { id: 3, label: "Architecture understood", detail: "layers, boundaries, patterns." },
  { id: 4, label: "Context assembled",       detail: "precise. ranked. within budget." },
  { id: 5, label: "Claude responds",         detail: "with evidence, not guesses." },
  { id: 6, label: "You decide",              detail: "impact known. you stay in control." },
];

// Pillars — what ships today is marked live; nothing planned is dressed up as live.
export const PILLARS = [
  {
    n: "01",
    title: "Repository Intelligence",
    status: "live",
    body: "Every file, symbol and dependency — indexed once, queried instantly.",
    span: "lg:col-span-6",
  },
  {
    n: "02",
    title: "Architecture Intelligence",
    status: "live",
    body: "Detects the structure the code actually has.",
    span: "lg:col-span-6",
  },
  {
    n: "03",
    title: "Context Assembly",
    status: "live",
    body: "The right files, ranked by evidence, ready for any model.",
    span: "lg:col-span-12",
  },
  {
    n: "04",
    title: "Impact Analysis",
    status: "live",
    body: "See what breaks before you change it.",
    span: "lg:col-span-6",
  },
  {
    n: "05",
    title: "Native AI Integrations",
    status: "planned",
    body: "Claude, Gemini, OpenAI and local models — wired in directly.",
    span: "lg:col-span-6",
    phase: "coming soon",
  },
];
