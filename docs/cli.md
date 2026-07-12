# CLI Reference

All Ortho commands and options.

---

## Global Options

```
--version          Show Ortho version
--help             Show help for any command
--verbose          Show detailed output
--config PATH      Use custom config file (default: .ortho/config.yaml)
```

---

## ortho init

Initialize Ortho in your repository.

```bash
ortho init [OPTIONS]
```

### Options

```
--force            Overwrite existing configuration
--python-only      Index only Python files (default: auto-detect)
```

### What it does

- Creates `.ortho/` directory
- Generates `config.yaml` with sensible defaults
- Initializes SQLite database

### Example

```bash
ortho init
# Creates:
# .ortho/config.yaml
# .ortho/ortho.db
```

---

## ortho scan

Index your codebase.

```bash
ortho scan [OPTIONS] [PATH]
```

### Options

```
PATH               Directory to scan (default: current directory)
--incremental      Only scan changed files (uses git history)
--force            Re-scan everything (ignore cache)
--python           Scan Python files only
--verbose          Show detailed progress
```

### What it does

1. Discovers all code files
2. Extracts symbols (functions, classes, types)
3. Builds call graphs
4. Analyzes imports and dependencies
5. Detects architecture patterns
6. Stores results in `.ortho/ortho.db`

### Examples

```bash
# Scan entire repo
ortho scan

# Scan specific directory
ortho scan src/

# Incremental scan (faster after changes)
ortho scan --incremental

# Re-scan everything
ortho scan --force
```

### Performance

- **Small repo** (< 10k lines): 1-2 seconds
- **Medium repo** (10k-100k lines): 5-30 seconds
- **Large repo** (> 100k lines): 1-5 minutes

---

## ortho analyze

Analyze your codebase for insights.

```bash
ortho analyze [SUBCOMMAND] [OPTIONS]
```

### Subcommands

#### --architecture

Detect and display architecture pattern.

```bash
ortho analyze --architecture
```

**Output:**
```json
{
  "style": "layered",
  "confidence": 0.88,
  "description": "Clear separation of concerns with data, business, and presentation layers",
  "layers": [
    {
      "name": "data",
      "description": "Database models, repositories",
      "file_count": 8,
      "depth": 0
    },
    {
      "name": "business",
      "description": "Business logic, use cases",
      "file_count": 12,
      "depth": 1
    },
    {
      "name": "api",
      "description": "API endpoints, handlers",
      "file_count": 5,
      "depth": 2
    }
  ]
}
```

#### --impact FILE

Show what would be affected if FILE changes.

```bash
ortho analyze --impact src/auth/models.py
```

**Output:**
```json
{
  "file": "src/auth/models.py",
  "blast_radius": {
    "direct_dependents": ["src/auth/handlers.py", "src/db/migrations.py"],
    "indirect_dependents": ["src/api/routes.py", "tests/test_auth.py"],
    "risk_level": "HIGH",
    "total_affected": 4
  },
  "recommendations": [
    "Run affected tests before merging",
    "Review imports in dependent files",
    "Consider deprecation path for breaking changes"
  ]
}
```

#### --cycles

Find circular dependencies.

```bash
ortho analyze --cycles
```

**Output:**
```json
{
  "has_cycles": true,
  "cycles": [
    {
      "cycle": ["models.py", "handlers.py", "schema.py", "models.py"],
      "severity": "MEDIUM"
    }
  ],
  "recommendations": [
    "Break cycle by extracting shared types to new module"
  ]
}
```

#### --debt

Code quality and technical debt assessment.

```bash
ortho analyze --debt
```

**Output:**
```json
{
  "score": 72,
  "issues": [
    {
      "type": "large_function",
      "severity": "MEDIUM",
      "count": 3,
      "examples": ["src/auth/core.py:authenticate"]
    },
    {
      "type": "deep_nesting",
      "severity": "LOW",
      "count": 5
    }
  ]
}
```

### Example

```bash
ortho analyze --architecture
ortho analyze --impact src/models/user.py
ortho analyze --cycles
ortho analyze --debt
```

---

## ortho context

Search and retrieve relevant code context.

```bash
ortho context [OPTIONS] --query "SEARCH TERM"
```

### Options

```
--query TEXT       Search query (required)
--limit N          Max results to return (default: 10)
--type TYPE        Filter by symbol type: function, class, module (default: all)
--format FORMAT    Output format: json, text (default: text)
```

### What it does

1. Searches all indexed symbols
2. Ranks by relevance (BM25 + semantic)
3. Shows dependency context
4. Indicates which files import/call results

### Examples

```bash
# Find authentication flow
ortho context --query "authentication"

# Find User class
ortho context --query "User" --type class

# Get JSON output
ortho context --query "database" --format json --limit 20
```

**Output (text):**
```
Results for "authentication" (5 matches)

1. authenticate_user() [function]
   File: src/auth/core.py:42
   Imports: jwt, hashlib
   Called by: login_handler, refresh_token
   Dependencies: db.get_user, cache.get_session
   Relevance: 100%

2. AuthHandler [class]
   File: src/auth/handlers.py:15
   Methods: login, logout, refresh
   Calls: authenticate_user, send_email
   Relevance: 92%

3. auth_middleware() [function]
   File: src/api/middleware.py:8
   Wraps: all API endpoints
   Calls: authenticate_user, cache.get_session
   Relevance: 87%
```

---

## ortho status

Show repository and indexing status.

```bash
ortho status
```

**Output:**
```
Repository: /path/to/repo
Status: INDEXED
Last scan: 2 hours ago
Files indexed: 248
Symbols: 1,245
Dependencies: 3,892

Architecture: layered (0.88 confidence)
Code quality: 72/100
Technical debt: 14 issues
```

---

## ortho update

Update index after code changes.

```bash
ortho update [OPTIONS]
```

### Options

```
--incremental      Only update changed files (default: true)
--full             Re-scan entire repo
```

---

## Examples

### Find all functions in a module
```bash
ortho context --query "module:auth" --type function
```

### Understand dependency chain
```bash
ortho context --query "database migration" --format json
```

### Check impact before refactoring
```bash
ortho analyze --impact src/core/models.py
```

### Assess technical debt
```bash
ortho analyze --debt
```

---

## Help

Get help for any command:

```bash
ortho --help
ortho scan --help
ortho analyze --help
ortho context --help
```

---

## Configuration

Ortho settings are in `.ortho/config.yaml`:

```yaml
# Repository to scan
repository:
  root: .
  languages: [python]

# Indexing options
indexing:
  incremental: true
  max_depth: 10
  ignore_files:
    - "*.test.py"
    - "venv/"
    - "__pycache__/"

# Search options
search:
  algorithm: "bm25"  # or "semantic"
  limit: 10

# Architecture detection
architecture:
  patterns: [layered, hexagonal, microservices, mvc, flat]
  confidence_threshold: 0.5
```

Customize by editing `.ortho/config.yaml` after `ortho init`.

---

## Performance Tips

1. **First scan is slow** — Ortho builds full index
2. **Use `--incremental`** — Fast updates after changes
3. **Large repos?** — Consider `.orthoignore` files
4. **Semantic search** — Coming in Phase 2 (currently BM25)

---

Need help? See [Quick Start](quick-start.md) or [FAQ](faq.md).
