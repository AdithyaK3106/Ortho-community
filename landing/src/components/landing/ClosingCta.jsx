import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

export default function ClosingCta() {
  return (
    <section
      id="closing"
      data-testid="closing-section"
      className="relative py-32 sm:py-48 border-t border-[#27272a] overflow-hidden"
    >
      <div className="absolute inset-0 ortho-grid-bg opacity-25 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#ffb000]/[0.03] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl"
        >
          <div className="text-[10px] uppercase tracking-[0.28em] text-[#ffb000]">
            &sect; final &mdash; early access
          </div>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-8xl leading-[0.95] tracking-tight mt-6">
            AI is powerful.
            <br />
            <span className="italic text-[#ffb000]">
              Understanding makes it reliable.
            </span>
          </h2>
          <p className="mt-10 text-[#a1a1aa] text-lg sm:text-xl leading-snug max-w-2xl">
            Ortho is the engineering brain for AI &mdash; the missing context
            layer between your codebase and the model. Join the private beta
            and give your AI the context it deserves.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <a
              href="#waitlist"
              data-testid="closing-request-access"
              className="inline-flex items-center gap-2 h-12 px-7 bg-[#f4f4f4] text-[#0a0a0a] text-xs uppercase tracking-[0.22em] hover:bg-[#ffb000] transition-colors"
            >
              Request early access
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/AdithyaK3106/Ortho-Community"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="closing-view-github"
              className="inline-flex items-center gap-2 h-12 px-7 border border-[#27272a] text-[#f4f4f4] text-xs uppercase tracking-[0.22em] hover:border-[#ffb000] hover:text-[#ffb000] transition-colors"
            >
              <Github className="w-4 h-4" />
              View GitHub
            </a>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl text-[11px] uppercase tracking-[0.2em] text-[#52525b] border-t border-[#27272a] pt-8">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#10b981]" /> private beta
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#ffb000]" /> local-first &middot; no cloud
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#a1a1aa]" /> model-agnostic
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
