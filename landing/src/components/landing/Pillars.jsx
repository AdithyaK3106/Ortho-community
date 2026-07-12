import React from "react";
import { motion } from "framer-motion";
import { PILLARS } from "@/components/landing/data";

function StatusBadge({ status, phase }) {
  if (status === "live") {
    return (
      <span
        data-testid="pillar-badge-live"
        className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-[#10b981] border border-[#10b981]/30 px-2 py-1 bg-[#10b981]/[0.06]"
      >
        <span className="w-1.5 h-1.5 bg-[#10b981]" />
        live
      </span>
    );
  }
  return (
    <span
      data-testid="pillar-badge-planned"
      className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-[#f59e0b] border border-[#f59e0b]/30 px-2 py-1 bg-[#f59e0b]/[0.06]"
    >
      <span className="w-1.5 h-1.5 bg-[#f59e0b]" />
      {phase || "planned"}
    </span>
  );
}

export default function Pillars() {
  return (
    <section
      id="pillars"
      data-testid="pillars-section"
      className="relative py-24 sm:py-32 border-t border-[#27272a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#ffb000]">
              &sect; 03 &mdash; what ortho does
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl leading-[1.05] tracking-tight mt-4">
              Five capabilities.{" "}
              <span className="italic text-[#a1a1aa]">One outcome.</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-[#a1a1aa] text-sm max-w-md">
            Each one does a single job. Together, they let your AI work with
            <span className="text-[#f4f4f4]"> your project</span>, not against it.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-4">
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.n}
              data-testid={`pillar-card-${p.n}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`${p.span} border border-[#27272a] bg-[#0a0a0a] hover:border-[#52525b] transition-colors p-6 sm:p-8 flex flex-col`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-serif text-6xl leading-none text-[#27272a]">
                    {p.n}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl mt-4 text-[#f4f4f4]">
                    {p.title}
                  </h3>
                </div>
                <StatusBadge status={p.status} phase={p.phase} />
              </div>

              <p className="mt-6 text-base text-[#a1a1aa] leading-relaxed max-w-xl">
                {p.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
