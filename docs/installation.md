# Installation

Get Ortho set up on your system.

---

## System Requirements

- **Python:** 3.9 or later
- **OS:** Linux, macOS, or Windows
- **Disk space:** ~50MB for installation + depends on repo size
- **RAM:** 2GB minimum (4GB+ recommended for large repos)

---

## Install via pip

The easiest way. Works on all platforms.

### Standard Installation

```bash
pip install ortho
```

Verify:
```bash
ortho --version
```

### With Development Tools

If you plan to contribute:

```bash
pip install ortho[dev]
```

This adds:
- `pytest` (testing)
- `ruff` (linting)
- `mypy` (type checking)

---

## Install from Source

Clone and install locally.

```bash
git clone https://github.com/ortho-ai/ortho.git
cd ortho

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install in editable mode
pip install -e ".[dev]"

# Verify
ortho --version
```

---

## Docker (Coming Soon)

Docker image will be available soon:

```bash
docker run -it ortho:latest ortho scan /repo
```

---

## Virtual Environment (Recommended)

It's best practice to use a virtual environment.

### With venv (built-in)

```bash
# Create virtual environment
python -m venv ortho-env

# Activate it
# On macOS/Linux:
source ortho-env/bin/activate

# On Windows:
ortho-env\Scripts\activate

# Install Ortho
pip install ortho

# Verify
ortho --version
```

### With conda

```bash
# Create environment
conda create -n ortho python=3.11

# Activate
conda activate ortho

# Install
pip install ortho
```

---

## Platform-Specific Notes

### macOS

No special requirements. Standard installation works:

```bash
pip install ortho
ortho --version
```

### Linux

No special requirements. Works with:
- Ubuntu 20.04+
- Debian 10+
- Fedora 35+
- Others (Python 3.9+)

### Windows

Use PowerShell or Command Prompt:

```cmd
pip install ortho
ortho --version
```

Or use Windows Subsystem for Linux (WSL) for better Python experience:

```bash
wsl
pip install ortho
ortho --version
```

---

## Upgrade

Update to the latest version:

```bash
pip install --upgrade ortho
```

Or to a specific version:

```bash
pip install ortho==0.2.0
```

---

## Uninstall

Remove Ortho completely:

```bash
pip uninstall ortho
```

This does NOT remove `.ortho/` directories in your repos. To remove them manually:

```bash
rm -rf .ortho/
```

---

## Verify Installation

Check that Ortho is properly installed:

```bash
# Show version
ortho --version

# Show help
ortho --help

# Check Python environment
which ortho  # or `where ortho` on Windows
```

---

## Troubleshooting

### "command not found: ortho"

**Cause:** Python Scripts directory not in PATH.

**Solution:** Reinstall with explicit path:

```bash
python -m pip install --user ortho
```

Or add Python Scripts to PATH:
- **macOS/Linux:** Add `~/.local/bin` to `$PATH`
- **Windows:** Add Python Scripts folder to System PATH

### "ModuleNotFoundError: No module named 'ortho'"

**Cause:** Installation incomplete or corrupted.

**Solution:** Reinstall:

```bash
pip uninstall ortho
pip install ortho --force-reinstall
```

### "Python version X.Y not supported"

**Cause:** You have Python 3.8 or earlier.

**Solution:** Install Python 3.9+:

```bash
# Check your Python version
python --version

# Install newer Python from python.org or package manager
```

### Permission errors on Linux/macOS

**Cause:** Trying to install to system Python.

**Solution:** Use virtual environment or `--user` flag:

```bash
pip install --user ortho
```

---

## Next Steps

After installation:

1. **Quick Start** — Get up and running in 5 minutes: `docs/quick-start.md`
2. **CLI Reference** — Learn all commands: `docs/cli.md`
3. **Examples** — See real usage: `examples/`

---

## Getting Help

- **Installation issues?** Check above or open an issue on GitHub
- **Not sure what to do next?** See [Quick Start](quick-start.md)
- **Have questions?** See [FAQ](faq.md)

---

Ready? Run your first scan:

```bash
cd your-repo
ortho init
ortho scan
```
