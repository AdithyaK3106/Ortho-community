import React from "react";
import { motion } from "framer-motion";
import { PROBLEMS } from "@/components/landing/data";

export default function ProblemSolution() {
  return (
    <section
      id="problem"
      data-testid="problem-section"
      className="relative py-24 sm:py-32 border-t border-[#27272a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#ffb000]">
              &sect; 01 &mdash; the problem
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl leading-[1.05] tracking-tight mt-4">
              AI can generate anything.
              <br />
              <span className="italic text-[#a1a1aa]">
                It just doesn&apos;t understand you.
              </span>
            </h2>
            <p className="mt-6 text-[#a1a1aa] text-base leading-relaxed max-w-md">
              Four things break the loop between you and your AI. Ortho fixes
              each of them at the source &mdash; before the model is called.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#27272a]">
              {PROBLEMS.map((p, i) => (
                <motion.article
                  key={p.title}
                  data-testid={`problem-card-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="p-6 sm:p-7 border-r border-b border-[#27272a] group hover:bg-[#141414] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#52525b]">
                      0{i + 1}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#ef4444]/60 group-hover:text-[#ef4444]">
                      today
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-[26px] mt-4 text-[#f4f4f4] leading-tight">
                    {p.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#a1a1aa] leading-relaxed">
                    {p.problem}
                  </p>

                  <div className="mt-5 h-px bg-[#27272a]" />

                  <div className="mt-4 flex items-start gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#10b981] mt-1">
                      with ortho
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#f4f4f4] leading-relaxed">
                    {p.solution}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
