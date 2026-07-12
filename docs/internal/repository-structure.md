# Ortho Demo Repository Structure

This is the **public-facing** Ortho repository designed for:
- Hackathons and demos
- Developer evaluation and exploration
- Events and conferences
- Future open-source adoption

---

## Directory Layout

```
ortho-demo/
│
├── README.md                 # Hero messaging + quick start (30-second intro)
├── LICENSE                   # Apache 2.0 or MIT
├── CONTRIBUTING.md           # Contribution guidelines
├── CHANGELOG.md              # Version history (visible to public)
├── ROADMAP.md                # High-level future vision (not internal details)
│
├── docs/                     # User-facing documentation
│   ├── installation.md       # Install Ortho (pip/npm)
│   ├── quick-start.md        # First 5 minutes
│   ├── architecture.md       # How Ortho works (30,000 ft view)
│   ├── cli.md                # CLI command reference
│   ├── examples.md           # Real repo analysis examples
│   └── faq.md                # Common questions
│
├── examples/                 # Real repository examples
│   ├── fastapi/              # Real FastAPI analysis output
│   │   ├── architecture.json # Detected architecture report
│   │   ├── symbols.json      # Extracted symbols
│   │   ├── dependencies.json # Dependency graph
│   │   └── README.md         # How to interpret results
│   ├── langchain/            # Real LangChain analysis output
│   ├── flask/                # Real Flask analysis output
│   └── README.md             # Example gallery guide
│
├── demo/                     # Hackathon + presentation materials
│   ├── demo.md               # Live demo script
│   ├── hero.gif              # Hero animation (Ortho workflow)
│   ├── screenshots/          # PNG screenshots for slides
│   │   ├── scan.png
│   │   ├── architecture.png
│   │   ├── context.png
│   │   └── analysis.png
│   └── one-pager.pdf         # One-page Ortho summary
│
├── web/                      # Landing page (React + Tailwind)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── landing/      # Hero, features, workflow, CTA sections
│   │   │   └── ui/           # Reusable UI components
│   │   ├── pages/            # Landing.jsx
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json          # React dependencies
│   ├── tailwind.config.js    # Tailwind theme
│   ├── craco.config.js       # Build config
│   └── README.md             # Frontend setup instructions
│
├── src/                      # Production-ready Ortho code (Python)
│   ├── cli/                  # CLI entry point
│   │   ├── commands/
│   │   │   ├── init.py       # ortho init
│   │   │   ├── scan.py       # ortho scan
│   │   │   ├── analyze.py    # ortho analyze
│   │   │   └── context.py    # ortho context
│   │   └── main.py
│   ├── scanner/              # Repository scanner
│   │   ├── python_scanner.py
│   │   └── symbol_extractor.py
│   ├── parser/               # AST parsing + extraction
│   │   ├── call_graph.py
│   │   ├── import_graph.py
│   │   └── dependency_parser.py
│   ├── architecture/         # Architecture detection
│   │   ├── detector.py
│   │   ├── layered.py
│   │   ├── microservices.py
│   │   └── patterns.py
│   ├── search/               # Context search (FTS5 + semantic)
│   │   ├── bm25_search.py
│   │   └── semantic_search.py
│   ├── storage/              # SQLite + migrations
│   │   ├── db.py
│   │   └── migrations/
│   └── utils/                # Shared utilities
│       ├── config.py
│       └── types.py
│
├── tests/                    # Test suite
│   ├── test_scanner.py
│   ├── test_parser.py
│   ├── test_architecture.py
│   ├── test_search.py
│   └── fixtures/             # Test data
│
├── .github/
│   ├── workflows/
│   │   ├── tests.yml         # Run tests on push
│   │   ├── lint.yml          # Lint check
│   │   └── release.yml       # Release automation
│   └── ISSUE_TEMPLATE/
│
├── .gitignore
├── pyproject.toml            # Python package metadata
├── poetry.lock               # Python dependencies locked
├── requirements.txt          # For pip install
├── Makefile                  # Common tasks (test, build, demo)
└── .env.example              # Example config


```

---

## Key Principles

### 1. **What's Included**
- Production-ready Ortho components (scanner, parser, architecture detection, search)
- Landing page (React) for showcasing
- Real examples (output from scanning FastAPI, LangChain, Flask)
- Documentation aimed at **users**, not developers
- Demo materials for presentations

### 2. **What's NOT Included**
- Benchmarks or evaluation infrastructure
- Experimental algorithms
- Internal research notes or FRDs
- Ground truth datasets
- Unfinished orchestration or token optimizer
- Future roadmap features (only summary roadmap)
- Half-finished components
- Private credentials or API keys

### 3. **Documentation Tone**
- Outcome-focused ("AI gets better context")
- Not implementation-focused ("here's how the detector works internally")
- Clear examples, not academic
- Direct user guidance

### 4. **Code Cleanliness**
- No debug prints or TODOs
- No dead code or experimental branches
- Clean git history (linear, understandable)
- Full type hints (Python) and linting
- > 85% test coverage minimum

---

## Landing Page (web/)

The React landing page includes:
- **Hero section** — "AI shouldn't guess. It should understand."
- **Problem statement** — AI forgets, edits wrong files, breaks architecture
- **Solution flow** — Repository → Scan → Detect → Context → Better AI
- **Features list** — What Ortho actually does (no vaporware)
- **Live demo / GIF** — Show real Ortho output
- **Quick start** — Three commands to get running
- **CTA** — "Try it now" button linking to installation
- **Comparison table** — Ortho vs manual context preparation

---

## Examples (examples/)

Each example folder contains:
- **README.md** — Explanation of the repo (FastAPI, LangChain, etc.)
- **architecture.json** — Real Ortho architecture detection output
- **symbols.json** — Extracted symbols with types
- **dependencies.json** — Dependency graph
- **analysis.md** — Human-readable summary of findings

These show **real Ortho capability on real, public repos**.

---

## Demo Materials (demo/)

For conferences, hackathons, product demos:
- **demo.md** — Step-by-step live demo script
- **hero.gif** — Animated workflow visualization
- **screenshots/** — PNG images for slides
- **one-pager.pdf** — Quick summary for handing out

---

## CLI Code (src/)

Only production-ready components:
- Scanner (symbol extraction, import graph)
- Parser (AST-based, tree-sitter)
- Architecture detection (5 patterns, confidence scoring)
- Search (BM25 + semantic when embeddings exist)
- CLI commands: `ortho init`, `ortho scan`, `ortho analyze`, `ortho context`

**No experimental code.** No half-finished features.

---

## Tests (tests/)

- Comprehensive unit tests
- Real repo fixtures (FastAPI, Flask samples)
- No mocks where integration testing works
- > 85% coverage
- All tests passing (no xfail marked as known limitations)

---

## Configuration

### pyproject.toml
```toml
[project]
name = "ortho"
version = "0.1.0"
description = "The Engineering Intelligence Layer for AI"
```

### GitHub Actions
- Tests run on every push
- Linting required before merge
- Release automation

---

## First-Time User Journey

1. User lands on `ortho-demo/README.md`
2. Sees hero message in 10 seconds
3. Runs `pip install ortho`
4. Runs `ortho init` in their repo
5. Runs `ortho scan`
6. Sees architecture report
7. Runs `ortho context --query "auth flow"`
8. Gets relevant files + dependencies
9. ✓ Context ready for AI

Total time: < 5 minutes.

---

## Messaging

**Tagline:** "The Engineering Intelligence Layer for AI"

**Problem:** AI models lack codebase context, leading to:
- Forgotten imports
- Edited wrong files
- Architecture breaks
- Repeated mistakes

**Solution:** Ortho scans your repository once, detects architecture, enables intelligent context assembly for AI.

**Use cases:**
- Better code generation (AI knows what to modify)
- Architecture preservation (AI understands subsystems)
- Impact analysis (AI knows what breaks)
- Context assembly (AI gets perfect context)

---

## Repository Tone

- **Professional** — Polished, not research-y
- **User-first** — Docs for users, not developers
- **Outcome-focused** — "What can Ortho do for me?" not "How does it work?"
- **Hackathon-ready** — Easy to demo, easy to extend
- **Transparent** — Clear roadmap, honest limitations

---

## Success Metrics

If this repo succeeds:
1. ✓ Someone can fork it and run Ortho in 3 commands
2. ✓ Hackathon teams can use it immediately
3. ✓ It looks and feels like a real open-source project
4. ✓ No internal/private details leak
5. ✓ Landing page gets forks/stars
6. ✓ Users can file clear issues (good bug reports)
7. ✓ Contributors understand scope (what's in/out)

---

**Status:** Design phase  
**Next:** Move landing page code, create file structure, write documentation
