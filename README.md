# Ortho

> AI shouldn't guess. It should understand.

**Ortho** is the engineering intelligence layer for AI. It reads your repository, understands your architecture, and assembles the exact context a model needs to make safe, informed engineering decisions.

## The Problem

AI coding tools generate confident code with no understanding of your system. They edit the wrong files, cross architectural boundaries, and miss dependencies that decide whether a change is safe. The result: rework, bugs, and broken abstractions.

## The Solution

Ortho sits between your codebase and your AI. It:

1. **Scans your repository** — indexes symbols, imports, and the call graph
2. **Detects your architecture** — identifies patterns: layered, hexagonal, MVC, microservices
3. **Finds relevant files** — answers "what matters for this change?" by analyzing evidence
4. **Measures impact** — shows what breaks before you change it
5. **Packages context** — hands Claude (or any AI) the exact context it needs

The result: AI that understands your project, respects its structure, and makes safer decisions.

## How It Works

```
Your Codebase
    ↓
[Repository Scanning] → symbols, imports, call graph
    ↓
[Architecture Analysis] → detect patterns & structure
    ↓
[Context Assembly] → rank files by relevance & evidence
    ↓
Claude (or any AI model)
    ↓
Safe, Informed Code Decisions ✓
```

## Features

- **Repository Intelligence** — Fast indexing of code structure
- **Architecture Detection** — Automatic pattern recognition (layered, hexagonal, MVC)
- **Smart Context** — Finds and ranks relevant files by evidence
- **Impact Analysis** — Shows dependencies and change blast radius
- **AI Ready** — Packages context for Claude, GPT, or any model
- **Local First** — Runs on your machine, no cloud, no telemetry

## Status

**Currently in development** — the landing page and early access signup are live. The full CLI tool and architecture analysis will arrive soon.

[Join the waitlist →](https://AdithyaK3106.github.io/Ortho-Community)

## Get Started

Visit the **[Ortho landing page](https://AdithyaK3106.github.io/Ortho-Community)** to learn more and join the waitlist for early access.

## Architecture

### Frontend
- **React** landing page with hot reload
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Three.js** for 3D background effects

### Backend
- **FastAPI** server for the waitlist API
- **MongoDB Atlas** for data persistence
- **Async/await** for high performance
- **CORS** configured for production

### Deployment
- **GitHub Pages** for static hosting
- **GitHub Actions** for automated CI/CD
- **Master branch** triggers automatic deployments

## Documentation

- [Installation Guide](docs/installation.md) — How to install Ortho
- [CLI Reference](docs/cli.md) — Command-line interface
- [Architecture Guide](docs/architecture.md) — How Ortho works
- [FAQ](docs/faq.md) — Common questions
- [Contributing](docs/CONTRIBUTING.md) — How to contribute

## License

Apache License 2.0 — See [LICENSE](LICENSE) for details.

## Community

- **Email:** urbrain369@gmail.com
- **GitHub:** [AdithyaK3106/Ortho-Community](https://github.com/AdithyaK3106/Ortho-Community)
- **Website:** [Ortho Landing Page](https://AdithyaK3106.github.io/Ortho-Community)

---

**AI shouldn't guess. It should understand.**

Built by [Adithya K](https://github.com/AdithyaK3106) • [Apache 2.0](LICENSE)
