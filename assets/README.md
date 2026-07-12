# Assets

Visuals referenced by the README, docs, and landing page. Every important concept gets one visual; each must be captured from real Ortho output — no mockups.

| File | Shows | Used in |
|------|-------|---------|
| `hero.gif` | Full workflow: question → scan → architecture → context → Claude → decision | README hero |
| `scan.gif` | `ortho scan` indexing a repository | docs/quick-start.md |
| `architecture.png` | `ortho analyze --architecture` report (FastAPI) | README example |
| `context.png` | `ortho context` output: relevant files + dependencies | README example |
| `impact.png` | `ortho analyze --impact` blast radius | docs/cli.md |
| `demo.mp4` | 60–90s end-to-end demo for talks and hackathons | landing page, presentations |

## Capture guidelines

- Record against a real public repository (FastAPI preferred, matches README example)
- Terminal: dark theme, 100×30, readable font size
- GIFs under 5 MB (GitHub renders inline); trim dead time between commands
- PNG screenshots at 2× for retina, displayed at width 720
