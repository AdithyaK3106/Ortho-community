# How Ortho Works

A high-level overview of Ortho's architecture and design.

---

## Core Concept

Ortho turns your codebase into **searchable, analyzable data**.

```
Code Files
    ↓
Scanner (extract symbols, calls, imports)
    ↓
SQLite Database (searchable index)
    ↓
Query Engine (search, analyze, report)
    ↓
User (via CLI or API)
```

---

## The Three Phases

### Phase 1: Repository Intelligence (Current)

**Goal:** Index your repository and understand its structure.

**Components:**
- **Scanner** — Walks file tree, extracts Python symbols
- **Parser** — Uses AST to find functions, classes, types
- **Import Graph** — Builds import dependencies
- **Call Graph** — Maps which functions call which
- **Database** — Stores everything in SQLite for fast queries

**Output:**
- Indexed symbols with metadata
- Dependency graphs
- Search index

### Phase 2: Architectural Analysis

**Goal:** Detect and report architecture patterns.

**Components:**
- **Pattern Detectors** — Identifies layered, microservices, hexagonal, MVC patterns
- **Subsystem Detector** — Groups related code into cohesive modules
- **Debt Analyzer** — Identifies technical debt and quality issues

**Output:**
- Detected architecture style with confidence score
- Extracted layers and subsystems
- Technical debt report

### Phase 3: AI Integration (Future)

**Goal:** Prepare perfect context for AI models.

**Components:**
- **Context Assembler** — Pulls relevant code for any query
- **Semantic Search** — Finds code by meaning (not just keywords)
- **Impact Analyzer** — Shows what changes would break
- **Formatter** — Prepares context in optimal format for AI

**Output:**
- Perfect context for AI models
- Change impact assessment
- Formatted code snippets ready for LLM consumption

---

## Key Components

### Scanner

Walks your repository and identifies:
- Python files (`.py`)
- Project structure
- Dependencies (`requirements.txt`, `pyproject.toml`)
- Configuration files

**Output:** File tree with metadata

### Parser

Uses Python's `ast` module to extract:
- **Functions** — Name, parameters, return type, docstring
- **Classes** — Name, parent classes, methods
- **Imports** — All `import` and `from ... import` statements
- **Types** — Type hints where available

**Output:** Structured symbol data with relationships

### Import Graph Builder

Analyzes all imports to build:
- Who imports what
- Cyclic dependencies
- External dependencies
- Standard library usage

**Output:** Import dependency graph

### Call Graph Builder

Analyzes function calls to understand:
- Which functions call which
- Call depth and complexity
- Recursion
- Dynamic calls (best-effort)

**Output:** Call dependency graph

### Architecture Detector

Analyzes code structure to identify patterns:

**Layered Architecture**
- Clear horizontal layers (data → business → presentation)
- Unidirectional dependencies
- Example: Django, Spring Boot apps

**Microservices**
- Loose coupling between modules
- Independent data stores per service
- Message passing between services
- Example: Service-oriented Python apps

**Hexagonal (Ports & Adapters)**
- Clear domain core
- External dependencies at boundaries
- Example: Domain-driven design implementations

**MVC**
- Separate Models, Views, Controllers
- V ← C → M relationship
- Example: FastAPI with separate layers

**Flat**
- No clear structure or single file
- Everything at one level

**Detection Method:**
1. Analyze call/import graphs
2. Score against 5 pattern signatures
3. Return best match with confidence (0.0-1.0)
4. Consider edge cases and mixed patterns

### SQLite Database

Everything is stored in `.ortho/ortho.db`:

**Tables:**
- `files` — Every Python file in the repo
- `symbols` — Functions, classes, types
- `calls` — Function call relationships
- `imports` — Import statements
- `dependencies` — External dependencies
- `architectures` — Detected architecture patterns

**Indexes:**
- Full-text search on symbol names
- Fast lookups by file, type, name
- Efficient graph queries

**Benefits:**
- Fast queries (even for huge repos)
- Offline analysis (no cloud needed)
- Portable (single `.db` file)
- Queryable (standard SQL)

### Search Engine

Provides multiple search methods:

**Keyword Search (BM25)**
- Full-text search algorithm
- Ranks by relevance
- Fast, no ML required

**Semantic Search (Planned)**
- Embedding-based search
- Understands meaning beyond keywords
- Slower but more accurate
- Coming in Phase 2

### Analysis Engine

Provides insights:

**Dependency Analysis**
- What depends on this file?
- What's the impact if we change this?
- Are there circular dependencies?

**Code Quality Analysis**
- Large functions
- Deep nesting
- Unused imports
- Code smells

**Architecture Validation**
- Does the code match claimed architecture?
- Are layers properly separated?
- Are subsystems cohesive?

---

## Data Flow

### Scanning

```
Repository
    ↓
Scanner discovers Python files
    ↓
Parser extracts symbols from each file
    ↓
Import graph builder analyzes imports
    ↓
Call graph builder analyzes calls
    ↓
Architecture detector analyzes overall structure
    ↓
All data → SQLite database
```

### Searching

```
User query: "find authentication functions"
    ↓
Search engine looks in SQLite
    ↓
Ranks results by relevance (BM25)
    ↓
Formats results with context
    ↓
Returns to user
```

### Analysis

```
User asks: "what's my architecture?"
    ↓
Architecture detector analyzes graphs
    ↓
Scores against 5 patterns
    ↓
Returns best match with confidence
    ↓
Provides layer/subsystem breakdown
```

---

## Performance Characteristics

### Scanning

| Repo Size | Time | Database Size |
|-----------|------|---------------|
| < 10k lines | 1-2s | 5-10 MB |
| 10k-100k lines | 5-30s | 50-500 MB |
| 100k-1M lines | 1-5m | 500MB-2GB |

**Optimization tricks:**
- Parallel file processing
- Incremental indexing (only re-scan changed files)
- AST caching
- Lazy loading

### Queries

| Query Type | Time |
|-----------|------|
| Symbol search | < 100ms |
| Dependency lookup | 1-10ms |
| Impact analysis | 100-500ms |
| Architecture detection | 1-5s |

All queries are fast enough for CLI usage.

---

## Design Decisions

### Why SQLite?

- ✅ Local, offline-first
- ✅ No server infrastructure
- ✅ Portable (one `.db` file)
- ✅ Queryable with SQL
- ✅ ACID guarantees
- ✅ Efficient full-text search

### Why AST instead of regex?

- ✅ Accurate (parses actual code structure)
- ✅ Handles complex syntax
- ✅ Extracts metadata (types, docstrings)
- ✅ Catches edge cases
- ✅ Faster than regex-based approaches

### Why BM25 before semantic search?

- ✅ Fast and reliable
- ✅ No ML/embeddings needed
- ✅ Good enough for keyword matching
- ✅ Semantic search added in Phase 2

### Why Python first?

- ✅ Large AI/data science ecosystem
- ✅ Clear, analyzable syntax
- ✅ Straightforward AST structure
- ✅ Foundation for multi-language support later

---

## Extensibility

### Adding Language Support

1. Create new `ScannerAdapter` for language
2. Implement symbol extraction via AST/parser
3. Register in scanner factory
4. Tests for new language

Example: `src/scanner/adapters/typescript_scanner.py`

### Custom Analysis Rules

1. Create analyzer class
2. Implement rule logic
3. Register in analysis engine
4. Store results in extensible table

Example: `ortho analyze --custom-rule my_linting_rule`

### Integration Points

- **Before scan:** Pre-processing hooks
- **After scan:** Post-processing hooks
- **Query time:** Custom ranking functions
- **Analysis time:** Custom detectors

---

## What Ortho Does NOT Do

**By Design:**

- ❌ **Execute code** — No dynamic analysis, only static
- ❌ **Modify code** — Read-only analysis
- ❌ **Go to cloud** — Everything local and offline
- ❌ **Require AI** — Works standalone, AI is optional
- ❌ **Track changes** — Git integration planned for Phase 2

---

## Next Steps

### For Users

- [Quick Start](quick-start.md) — Get running in 5 minutes
- [CLI Reference](cli.md) — All commands explained
- [FAQ](faq.md) — Common questions

### For Developers

- [Contributing](../CONTRIBUTING.md) — How to contribute
- [GitHub](https://github.com/ortho-ai/ortho) — Source code

---

Questions? See [FAQ](faq.md) or open an issue on GitHub.
