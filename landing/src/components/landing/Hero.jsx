import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

/**
 * Hero — auto-playing guided product demo.
 * The terminal loops through 8 scenes for ~25s:
 * you ask -> scanning -> architecture -> relevant files ->
 * context package -> recommendation -> explanation -> evidence -> review.
 */

const QUERY = "Add authentication.";

const SCENES = [
  {
    id: "ask",
    label: "01 · you ask",
    dur: 2600,
    lines: [
      { style: "user", text: QUERY },
    ],
  },
  {
    id: "scan",
    label: "02 · repository scanning",
    dur: 2600,
    lines: [
      { style: "user", text: QUERY },
      { style: "sep", text: "" },
      { style: "info", text: "» scanning repository…" },
      { style: "muted", text: "  1,284 files · 12,847 symbols · 3,204 edges" },
    ],
  },
  {
    id: "arch",
    label: "03 · architecture detected",
    dur: 2600,
    lines: [
      { style: "user", text: QUERY },
      { style: "sep", text: "" },
      { style: "info", text: "» detecting architecture…" },
      { style: "ok",   text: "✓ layered pattern · confidence 0.87" },
      { style: "muted",text: "  3 layers · 7 subsystems" },
    ],
  },
  {
    id: "files",
    label: "04 · relevant files identified",
    dur: 2800,
    lines: [
      { style: "user", text: QUERY },
      { style: "sep", text: "" },
      { style: "info", text: "» locating relevant modules…" },
      { style: "label", text: "highlighted" },
      { style: "file",  text: "  src/auth/middleware.ts" },
      { style: "file",  text: "  src/auth/session.ts" },
      { style: "file",  text: "  src/routes/auth.ts" },
    ],
  },
  {
    id: "pkg",
    label: "05 · context package assembled",
    dur: 2600,
    lines: [
      { style: "user", text: QUERY },
      { style: "sep", text: "" },
      { style: "info", text: "» assembling context package…" },
      { style: "ok",   text: "✓ ranked by evidence · token budget respected" },
      { style: "muted",text: "  3 files · dependencies · architecture summary" },
    ],
  },
  {
    id: "reco",
    label: "06 · recommendation",
    dur: 2800,
    lines: [
      { style: "user", text: QUERY },
      { style: "sep", text: "" },
      { style: "label", text: "recommendation" },
      { style: "ai",    text: "Extend middleware.ts with session guard." },
      { style: "ai",    text: "Reuse existing auth/session.ts helpers." },
      { style: "ai",    text: "Add route /auth/callback in routes/auth.ts." },
    ],
  },
  {
    id: "why",
    label: "07 · explanation & evidence",
    dur: 2800,
    lines: [
      { style: "user", text: QUERY },
      { style: "sep", text: "" },
      { style: "label", text: "why" },
      { style: "muted", text: "  matches the existing layered architecture." },
      { style: "muted", text: "  reuses session helpers already in the repo." },
      { style: "label", text: "evidence" },
      { style: "muted", text: "  imports · call graph · architecture report attached." },
    ],
  },
  {
    id: "review",
    label: "08 · ready for review",
    dur: 3000,
    lines: [
      { style: "user", text: QUERY },
      { style: "sep", text: "" },
      { style: "label", text: "status" },
      { style: "ok",    text: "✓ context handed to Claude" },
      { style: "ok",    text: "✓ every claim grounded in the repository" },
      { style: "amber", text: "⧗ you review · you decide" },
    ],
  },
];

function LineColor(s) {
  switch (s) {
    case "user":  return "text-[#f4f4f4]";
    case "info":  return "text-[#a1a1aa]";
    case "ok":    return "text-[#10b981]";
    case "amber": return "text-[#ffb000]";
    case "muted": return "text-[#52525b]";
    case "label": return "text-[#ffb000] text-[10px] uppercase tracking-[0.22em]";
    case "file":  return "text-[#f4f4f4]";
    case "ai":    return "text-[#f4f4f4]";
    case "sep":   return "text-[#27272a]";
    default: return "text-[#a1a1aa]";
  }
}

// typewriter — types up to `text` characters
function useType(text, speed, resetKey) {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    if (!text) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, resetKey]);
  return out;
}

export default function Hero() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const scene = SCENES[sceneIdx];

  // auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => {
      setSceneIdx((s) => (s + 1) % SCENES.length);
    }, scene.dur);
    return () => clearTimeout(timerRef.current);
  }, [sceneIdx, paused, scene.dur]);

  // typed user prompt (only appears once on scene 0 & persists)
  const typedQuery = useType(sceneIdx >= 0 ? QUERY : "", 32, sceneIdx === 0 ? "typing" : "static");

  const progress = useMemo(() => ((sceneIdx + 1) / SCENES.length) * 100, [sceneIdx]);

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden"
    >
      <div className="absolute inset-0 ortho-grid-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#ffb000]/[0.04] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* left */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[10px] uppercase tracking-[0.28em] text-[#ffb000]"
              data-testid="hero-eyebrow"
            >
              the engineering intelligence layer for AI
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight mt-6"
              data-testid="hero-headline"
            >
              AI shouldn't guess.
              <br />
              It should <span className="italic text-[#ffb000]">understand.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-8 text-[#a1a1aa] text-lg sm:text-xl leading-snug max-w-xl"
              data-testid="hero-subheadline"
            >
              Ortho helps AI understand your software before it writes code. It
              reads your repository, understands its architecture, and hands
              the model precise context &mdash;{" "}
              <span className="text-[#f4f4f4]">
                so every change is an engineering decision
              </span>
              .
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-10 grid grid-cols-2 gap-x-8 gap-y-2 max-w-lg text-xs uppercase tracking-[0.14em] text-[#a1a1aa]"
              data-testid="hero-differentiators"
            >
              {[
                "understands the repository",
                "explains the architecture",
                "analyzes change impact",
                "assembles precise context",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#ffb000]" />
                  {t}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#waitlist"
                data-testid="hero-cta-request-access"
                className="inline-flex items-center gap-2 h-11 px-6 bg-[#f4f4f4] text-[#0a0a0a] text-xs uppercase tracking-[0.2em] hover:bg-[#ffb000] transition-colors"
              >
                Request early access
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/AdithyaK3106/Ortho-Community"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-cta-view-github"
                className="inline-flex items-center gap-2 h-11 px-6 border border-[#27272a] text-[#f4f4f4] text-xs uppercase tracking-[0.2em] hover:border-[#ffb000] hover:text-[#ffb000] transition-colors"
              >
                <Github className="w-4 h-4" />
                View GitHub
              </a>
            </motion.div>
          </div>

          {/* right — auto-playing demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-6"
            data-testid="hero-terminal"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* scene tabs — progress track + labels */}
            <div className="border border-[#27272a] border-b-0 bg-[#0a0a0a]">
              <div className="h-1 bg-[#141414]">
                <motion.div
                  className="h-full bg-[#ffb000]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#ffb000]">
                  {scene.label}
                </span>
                <button
                  type="button"
                  data-testid="hero-terminal-toggle"
                  onClick={() => setPaused((p) => !p)}
                  className="text-[10px] uppercase tracking-[0.2em] text-[#52525b] hover:text-[#ffb000] transition-colors"
                >
                  {paused ? "▶ play" : "❚❚ pause"}
                </button>
              </div>
            </div>

            {/* terminal */}
            <div className="border border-[#27272a] bg-[#0a0a0a]">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#27272a] bg-[#141414]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3f3f46]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3f3f46]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3f3f46]" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#52525b]">
                  ~/repo &mdash; ortho
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#10b981]">
                  &bull; live
                </span>
              </div>

              <div
                className="p-5 sm:p-6 font-mono text-[13px] sm:text-sm leading-relaxed min-h-[420px]"
                data-testid={`hero-terminal-body-${scene.id}`}
              >
                {/* first line is the persistent typed user query */}
                <div>
                  <span className="text-[#10b981]">you&gt;&nbsp;</span>
                  <span className="text-[#f4f4f4]">
                    {sceneIdx === 0 ? typedQuery : QUERY}
                    {sceneIdx === 0 && typedQuery.length < QUERY.length && (
                      <span className="caret" />
                    )}
                  </span>
                </div>

                {/* rest of the scene */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={scene.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="mt-3 space-y-1"
                  >
                    {scene.lines.slice(1).map((line, i) => (
                      <motion.div
                        key={`${scene.id}-${i}`}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.28, delay: 0.08 + i * 0.09 }}
                        className={`${LineColor(line.style)} whitespace-pre-wrap`}
                      >
                        {line.text || "\u00A0"}
                      </motion.div>
                    ))}

                    {/* prompt caret at the end */}
                    <div className="pt-2 text-[#52525b]">
                      ortho&gt; <span className="caret" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <p className="text-[10px] uppercase tracking-[0.2em] text-[#52525b] mt-3">
              engineering intelligence &middot; not autocomplete
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
