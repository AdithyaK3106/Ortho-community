import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CLI_COMMANDS } from "@/components/landing/data";

const COLOR = {
  cmd: "text-[#f4f4f4]",
  ok: "text-[#10b981]",
  warn: "text-[#f59e0b]",
  info: "text-[#a1a1aa]",
  muted: "text-[#52525b]",
};

export default function CliShowcase() {
  const [active, setActive] = useState(CLI_COMMANDS[1].id);
  const cmd = CLI_COMMANDS.find((c) => c.id === active) || CLI_COMMANDS[0];

  return (
    <section
      id="cli"
      data-testid="cli-section"
      className="relative py-24 sm:py-32 border-t border-[#27272a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#ffb000]">
              § 05 — the CLI
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl leading-[1.05] tracking-tight mt-4">
              A thin wrapper.{" "}
              <span className="italic text-[#a1a1aa]">
                Rigorous underneath.
              </span>
            </h2>
          </div>
          <p className="lg:col-span-4 text-[#a1a1aa] text-sm">
            The CLI is your entry point. Everything runs locally, in{" "}
            <span className="text-[#f4f4f4]">.ortho/</span> inside your project.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#27272a]">
          {/* left – command list */}
          <aside className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#27272a] bg-[#0a0a0a]">
            <div className="px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-[#52525b] border-b border-[#27272a]">
              commands
            </div>
            <ul>
              {CLI_COMMANDS.map((c) => {
                const isActive = c.id === active;
                return (
                  <li key={c.id} className="border-b border-[#27272a] last:border-b-0">
                    <button
                      data-testid={`cli-command-${c.id}`}
                      onClick={() => setActive(c.id)}
                      className={`w-full text-left px-5 py-4 transition-colors ${
                        isActive
                          ? "bg-[#141414]"
                          : "hover:bg-[#141414]/60"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 ${
                            isActive ? "bg-[#ffb000]" : "bg-[#3f3f46]"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            isActive ? "text-[#ffb000]" : "text-[#f4f4f4]"
                          }`}
                        >
                          $ {c.label}
                        </span>
                      </div>
                      <div className="mt-1 pl-4 text-[11px] text-[#52525b]">
                        {c.description}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="px-5 py-4 text-[10px] uppercase tracking-[0.2em] text-[#52525b] border-t border-[#27272a]">
              storage · .ortho/ortho.db  ·  local sqlite
            </div>
          </aside>

          {/* right – output */}
          <div className="lg:col-span-8 bg-[#0a0a0a]" data-testid="cli-output-pane">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#27272a]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3f3f46]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#3f3f46]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#3f3f46]" />
                <span className="ml-3 text-[10px] uppercase tracking-[0.18em] text-[#52525b]">
                  ~/repo — {cmd.label}
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#10b981]">
                exit 0
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={cmd.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 font-mono text-sm leading-relaxed min-h-[380px]"
              >
                {cmd.output.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    className={`${COLOR[line.type] || "text-[#a1a1aa]"} whitespace-pre-wrap`}
                  >
                    {line.type === "cmd" ? (
                      <>
                        <span className="text-[#10b981]">ortho&gt;&nbsp;</span>
                        <span className="text-[#f4f4f4]">
                          {line.text.replace(/^ortho\s/, "")}
                        </span>
                      </>
                    ) : (
                      line.text
                    )}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 text-[#10b981]"
                >
                  ortho&gt;&nbsp;<span className="caret" />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
