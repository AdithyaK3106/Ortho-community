# Ortho demo dashboard

Interactive, self-contained demo telling one story in three screens:

1. **Repository** — *What is this repository?* (architecture, layers, subsystems, health)
2. **Impact** — *What happens if I change this file?* (blast radius, risk, evidence)
3. **Trust** — *Why should I trust these results?* (ground truth, benchmark framework, honest findings)

## Run it

Open `index.html` in a browser. No build step, no server, no dependencies.

- Switch repositories with the dropdown in the header (or `?repo=<name>` in the URL).
- Deep links skip the intro: `index.html?repo=click#impact`, `#trust`, `#repo`.

## Add a repo

All numbers are produced by the **real Ortho pipeline** (the same `OrthoAdapter`
used by the benchmark framework). Nothing is mocked. To analyze a repo and add
it to the dashboard (needs the repo's Python env with tree-sitter):

```bash
python generate_data.py flask            # a directory under repos/
python generate_data.py click requests   # several at once
python generate_data.py --all            # everything under repos/
python generate_data.py C:\path\to\repo  # or any path
```

Each run writes `data/<name>.js` and registers the repo in `data/manifest.js`;
the dashboard picks it up on next load. Large repos are handled automatically:
the graph draws the 400 most-connected files, stored dependent lists are capped
at 60 per file (exact counts still shown), and the file picker renders 400 rows
at a time with search over everything.

The Trust view (benchmark framework, golden results, ground-truth datasets) is
the same for every repo — it describes how Ortho itself is validated.
