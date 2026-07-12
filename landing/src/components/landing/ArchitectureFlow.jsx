import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FLOW_STEPS } from "@/components/landing/data";

function FlowNode({ step, index, total }) {
  return (
    <motion.div
      data-testid={`flow-step-${step.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-30% 0px -30% 0px", amount: 0.6 }}
      transition={{ duration: 0.5 }}
      className="relative grid grid-cols-12 items-center py-8 sm:py-10"
    >
      {/* left number */}
      <div className="col-span-2 sm:col-span-2 pl-2 sm:pl-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#52525b]">
          {String(step.id).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>

      {/* node dot on center line */}
      <div className="col-span-1 flex justify-center">
        <motion.span
          initial={{ scale: 0.4, opacity: 0.5 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.7 }}
          transition={{ duration: 0.4 }}
          className="relative block w-3 h-3 bg-[#ffb000]"
        >
          <span className="absolute inset-0 bg-[#ffb000]/40 blur-md" />
        </motion.span>
      </div>

      {/* content */}
      <div className="col-span-9 pr-2 sm:pr-6">
        <motion.h3
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.7 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#f4f4f4]"
        >
          {step.label}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.7 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-2 text-sm sm:text-base text-[#a1a1aa]"
        >
          {step.detail}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function ArchitectureFlow() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  return (
    <section
      id="flow"
      data-testid="flow-section"
      ref={ref}
      className="relative py-24 sm:py-32 border-t border-[#27272a] bg-[#0a0a0a]/70 overflow-hidden"
    >
      <div className="absolute inset-0 ortho-grid-bg opacity-25 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#ffb000]">
            &sect; 02 &mdash; how it works
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight mt-4">
            From a question
            <br />
            to shipped code.
          </h2>
          <p className="mt-6 text-[#a1a1aa] max-w-xl">
            One flow. Deterministic. Evidence at every step. No LLM guessing
            in the dark.
          </p>
        </div>

        {/* Flow */}
        <div className="relative mt-20 border-y border-[#27272a]">
          {/* center vertical rail — full height, static (dim) */}
          <div
            aria-hidden
            className="absolute left-[calc(2/12*100%+2rem)] sm:left-[calc(2/12*100%+2rem)] top-0 bottom-0 w-px bg-[#27272a] pointer-events-none"
            style={{ left: "calc(25% - 0.5px)" }}
          />
          {/* animated amber progress line */}
          <motion.div
            aria-hidden
            style={{ height: lineHeight, left: "calc(25% - 0.5px)" }}
            className="absolute top-0 w-px bg-gradient-to-b from-[#ffb000] via-[#ffb000] to-[#ffb000]/0 pointer-events-none"
          />

          {FLOW_STEPS.map((step, i) => (
            <div
              key={step.id}
              className="border-b border-[#27272a] last:border-b-0"
            >
              <FlowNode step={step} index={i} total={FLOW_STEPS.length} />
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-[#52525b] max-w-2xl">
          <span className="text-[#ffb000]">note</span> &mdash; steps 1&ndash;4
          use no LLM. Routing, understanding and context assembly are pure
          engineering. The model is only called once &mdash; after everything
          is ready.
        </p>
      </div>
    </section>
  );
}
