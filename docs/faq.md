# Frequently Asked Questions

---

## Installation & Setup

### Q: Does Ortho require internet?
**A:** No. Ortho is completely offline and local-first. Everything runs on your machine.

### Q: What Python versions does Ortho support?
**A:** Python 3.9, 3.10, 3.11, 3.12. We recommend Python 3.10+.

### Q: Can I use Ortho on Windows?
**A:** Yes! Ortho works on Windows, macOS, and Linux. No special setup needed.

### Q: How much disk space does Ortho need?
**A:** Depends on repo size:
- Small repo (10k lines): 10-20 MB
- Medium repo (100k lines): 100-500 MB
- Large repo (1M lines): 1-2 GB

### Q: Can I install Ortho globally?
**A:** Yes, use `pip install ortho`. We recommend using a virtual environment though.

---

## Usage

### Q: How do I scan my repository?
**A:** Three steps:
```bash
ortho init          # Set up Ortho
ortho scan          # Index your code
ortho analyze       # Analyze results
```

### Q: How long does scanning take?
**A:** Typically:
- Small repo: 1-2 seconds
- Medium repo: 5-30 seconds
- Large repo: 1-5 minutes

First scan is slower (builds full index). After that, use `ortho scan --incremental` for faster updates.

### Q: What languages does Ortho support?
**A:** Currently: **Python** (Phase 1)

Coming soon: TypeScript, JavaScript, Go, Java

### Q: Can I analyze multiple languages at once?
**A:** Not yet. Phase 2 adds multi-language support.

### Q: How do I search for code?
**A:** Use `ortho context`:
```bash
ortho context --query "authentication"
ortho context --query "User" --type class
```

### Q: Can I combine search with filters?
**A:** Yes:
```bash
ortho context --query "database" --type function --limit 20
```

### Q: What does "confidence" mean in architecture detection?
**A:** It's how confident Ortho is that detected pattern is correct (0.0 to 1.0).
- `0.9+`: Very confident (layered/hexagonal)
- `0.7-0.9`: Fairly confident (likely pattern with mixed signals)
- `0.5-0.7`: Uncertain (multiple patterns similar strength)
- `<0.5`: No clear pattern (probably flat or mixed)

---

## Architecture Detection

### Q: Why doesn't my code match my intended architecture?
**A:** Ortho detects actual structure, not claimed structure. Common reasons:
- Cross-layer imports (breaks layering)
- Tight coupling (breaks microservices)
- Mixed patterns (not pure architectural style)

**Solution:** Use results to refactor code toward intended architecture.

### Q: Can Ortho detect my custom architecture?
**A:** Currently, Ortho detects 5 standard patterns. Custom detection coming in Phase 2.

For now: Use `ortho analyze --debt` to understand your code structure.

### Q: What if my repo is too small to detect architecture?
**A:** Repos with < 10 files may show `UNKNOWN` architecture. That's normal.

Add more structure or code for Ortho to analyze.

---

## Integration with AI

### Q: How do I use Ortho with ChatGPT?
**A:** Use `ortho context` to get relevant code, then paste into ChatGPT:
```bash
ortho context --query "authentication flow" --format json
```

Copy the JSON results into your prompt.

### Q: Does Ortho work with Claude?
**A:** Yes! Same approach:
```bash
ortho context --query "your-question" --format json
```

Paste into Claude.

### Q: Can Ortho send code to external AI services?
**A:** No. Ortho is local-only. You control what you send to AI.

### Q: Should I use Ortho context or just copy-paste code?
**A:** Always use Ortho context. It:
- Finds relevant code automatically
- Shows dependencies you might miss
- Includes architectural context
- Prevents "wrong file" mistakes

---

## Performance

### Q: Why is scanning slow on my large repo?
**A:** Common reasons:
1. **Many small files** — AST parsing each file takes time
2. **Large files** — Parsing 10k-line files is slower
3. **Slow disk** — Network drives, USB, or old spinning disks
4. **Other processes** — CPU/disk contention

**Solution:** Run scan when system is idle, or use `--incremental` for updates.

### Q: Can I speed up scanning?
**A:** Yes:
- Use SSD (not USB or network drive)
- Close other applications
- Use `ortho scan --incremental` for updates

### Q: Why is context search slow?
**A:** Typically < 100ms. If slower:
1. First search rebuilds search index
2. Very large repos take longer
3. Complex queries take longer

**Solution:** Subsequent searches are cached and faster.

### Q: Can I index only part of my repo?
**A:** Yes:
```bash
ortho scan src/      # Scan only src/
ortho scan models/   # Scan only models/
```

Or create `.orthoignore` file (like `.gitignore`).

---

## Output & Analysis

### Q: What does "blast radius" mean in impact analysis?
**A:** It's the number of files/functions affected if you change a file:
- **Direct:** Files that import from your file
- **Indirect:** Files that import from direct dependents
- **Risk level:** HIGH (many dependents) / MEDIUM / LOW

### Q: How do I interpret architecture layers?
**A:** In layered architecture:
- **Layer 0 (bottom):** Data/database layer
- **Layer 1 (middle):** Business logic layer
- **Layer 2 (top):** Presentation/API layer

Only Layer N should depend on Layer N-1 (unidirectional).

### Q: What are "subsystems"?
**A:** Cohesive groups of related code. Ortho detects them using graph analysis:
- Usually corresponds to Python packages
- Can span multiple packages
- Useful for understanding code organization

### Q: Can I export analysis results?
**A:** Yes, use `--format json`:
```bash
ortho analyze --architecture --format json > architecture.json
ortho context --query "something" --format json > results.json
```

---

## Troubleshooting

### Q: "No symbols found" error
**A:** Likely causes:
1. Empty repository
2. No Python files (`.py`)
3. Files not importable (missing `__init__.py`)

**Solution:** Check `ortho scan --verbose` for details.

### Q: "ModuleNotFoundError" during scan
**A:** Ortho found import that can't resolve.

**Solution:** This is OK (external dependencies). Check `ortho scan --verbose` for details.

### Q: Getting different results on different runs
**A:** Ortho is deterministic. If results differ:
1. Repo has changed (different code)
2. Configuration changed
3. Bug (please report)

Run `ortho scan --force` to re-index everything.

### Q: ".ortho" directory is growing huge
**A:** SQLite database grows with repo size. That's normal:
- Small repo: 10-20 MB
- Large repo: 1-2 GB

To clean: Delete `.ortho/` and re-run `ortho scan`.

### Q: Can't find `.ortho` directory
**A:** It's hidden by default:
- **macOS/Linux:** Show hidden files with `Cmd+Shift+.` or `ls -la`
- **Windows:** Show hidden files in folder options

### Q: Permission denied errors
**A:** Ortho needs read access to your repo:
```bash
chmod 755 ~/.ortho/    # macOS/Linux
# Windows: Right-click folder → Properties → Security
```

---

## Configuration

### Q: Where is the configuration file?
**A:** `.ortho/config.yaml` in your repository root. Create with `ortho init`.

### Q: What options can I configure?
**A:** Main options:
```yaml
indexing:
  incremental: true
  ignore_files: ["*.test.py", "venv/"]
  max_depth: 10

search:
  algorithm: "bm25"      # or "semantic" in Phase 2
  limit: 10

architecture:
  confidence_threshold: 0.5
```

### Q: Can I use multiple configurations?
**A:** Yes, use `--config` flag:
```bash
ortho scan --config .ortho/prod.yaml
```

---

## Contributing & Development

### Q: How can I contribute to Ortho?
**A:** See [CONTRIBUTING.md](../CONTRIBUTING.md). We welcome:
- Bug reports
- Feature requests
- Code contributions
- Documentation improvements

### Q: Where's the source code?
**A:** GitHub: https://github.com/ortho-ai/ortho

### Q: Can I fork Ortho?
**A:** Yes! Ortho is open source (Apache 2.0). Fork away.

---

## Roadmap & Future

### Q: When will you add TypeScript support?
**A:** Phase 2 (planned Q3 2026). Follow GitHub for updates.

### Q: When will semantic search be available?
**A:** Phase 2. Currently using BM25 (still very good).

### Q: Will Ortho ever charge for features?
**A:** No. Ortho is open source and free forever.

### Q: Can I use Ortho commercially?
**A:** Yes! Apache 2.0 license allows commercial use.

---

## Still Have Questions?

- 📖 Read the [documentation](docs/)
- ðŸ› [Report a bug](https://github.com/ortho-ai/ortho/issues)
- 💬 [Start a discussion](https://github.com/ortho-ai/ortho/discussions)
- 🆘 [Email us](mailto:hello@ortho.ai)

---

Last updated: 2026-07-09

