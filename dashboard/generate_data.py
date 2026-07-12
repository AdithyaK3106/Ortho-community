#!/usr/bin/env python3
"""Dashboard data generator wrapper for ortho-demo.

This script imports the shared dashboard generator from packages/ and uses it
to regenerate all dashboard data files. This keeps the generator modular and
version-controlled in the main repo.

Usage:
    python generate_data.py                # default: flask
    python generate_data.py click requests
    python generate_data.py --all          # every directory under repos/
"""

import sys
from pathlib import Path

# Add main repo packages to path
REPO = Path(__file__).resolve().parents[2]  # ortho repo root
sys.path.insert(0, str(REPO / "packages" / "dashboard-generator" / "src"))
sys.path.insert(0, str(REPO / "benchmarks"))
sys.path.insert(0, str(REPO))

from dashboard_generator.generator import run

if __name__ == "__main__":
    args = sys.argv[1:] or ["flask"]
    if args == ["--all"]:
        args = sorted(p.name for p in (REPO / "repos").iterdir() if p.is_dir())
    for name in args:
        run(name)
