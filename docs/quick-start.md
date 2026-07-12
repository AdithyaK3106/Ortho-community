# Quick Start

Get Ortho running in your repo in 5 minutes.

## Prerequisites

- Python 3.9+
- `pip` or similar package manager

## Step 1: Install

```bash
pip install ortho
```

Verify installation:
```bash
ortho --version
```

## Step 2: Initialize

Navigate to your Python repository and initialize Ortho:

```bash
cd your-repo
ortho init
```

This creates:
- `.ortho/` directory (contains configuration and data)
- `.ortho/config.yaml` (you can customize this)
- `.ortho/ortho.db` (SQLite database with indexed code)

## Step 3: Scan

Index your codebase:

```bash
ortho scan
```

Ortho will:
1. Find all Python files
2. Extract symbols (functions, classes, variables)
3. Build call graphs
4. Analyze imports and dependencies
5. Detect architecture patterns
6. Index everything in the database

**Typical scan time:** 2-10 seconds for small-to-medium repos

## Step 4: Explore

Now you can use Ortho to understand your code:

### See architecture
```bash
ortho analyze --architecture
```

Output:
```json
{
  "style": "layered",
  "confidence": 0.85,
  "layers": [
    {"name": "data", "file_count": 8},
    {"name": "business", "file_count": 12},
    {"name": "api", "file_count": 5}
  ]
}
```

### Find relevant code
```bash
ortho context --query "user authentication"
```

Output shows:
- Top matching files by relevance
- Dependencies needed
- Which functions call which
- Architecture context

### Analyze impact
```bash
ortho analyze --impact src/auth/models.py
```

Output shows:
- What depends on this file
- Risk assessment
- Cascade effects

---

## Common Commands

### Scan your repo
```bash
ortho scan
```

### Update after code changes
```bash
ortho scan --incremental
```

### Search for code
```bash
ortho context --query "your search"
```

### Show architecture
```bash
ortho analyze --architecture
```

### Analyze impact
```bash
ortho analyze --impact path/to/file.py
```

### Check for circular dependencies
```bash
ortho analyze --cycles
```

---

## Next Steps

1. **Read the CLI Reference** — See all available commands: `docs/cli.md`
2. **Explore Examples** — Look at real analyses: `examples/`
3. **Understand Architecture** — Learn how Ortho works: `docs/architecture.md`
4. **Ask Questions** — Check FAQ: `docs/faq.md`

---

## Troubleshooting

### "ModuleNotFoundError" when scanning
Make sure your project structure follows Python conventions:
- Use `__init__.py` files in packages
- Use relative imports correctly

### "No symbols found"
The repo might be empty or use unusual structure. Try:
```bash
ortho scan --verbose
```

### Performance issues with large repos
Ortho is optimized for repos up to 100k files. For larger codebases, consider:
- Scanning only specific directories
- Using `.orthoignore` file (like `.gitignore`)

---

## What's Next?

**For developers:**
- Use `ortho context` to find relevant code
- Use `ortho analyze --impact` before refactoring

**For AI integration:**
- Ortho prepares context for LLMs
- Works with any AI model (OpenAI, Claude, Gemini, etc.)

**For teams:**
- Share Ortho output in code reviews
- Use impact analysis for planning changes

---

Ready? Start with:
```bash
ortho scan
```

Questions? See [FAQ](faq.md) or open an issue on GitHub.
