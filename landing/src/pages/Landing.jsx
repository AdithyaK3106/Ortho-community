import React from "react";
import ThreeBackground from "@/components/landing/ThreeBackground";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ProblemSolution from "@/components/landing/ProblemSolution";
import ArchitectureFlow from "@/components/landing/ArchitectureFlow";
import Pillars from "@/components/landing/Pillars";
import CliShowcase from "@/components/landing/CliShowcase";
import ClosingCta from "@/components/landing/ClosingCta";
import Footer from "@/components/landing/Footer";

export default function Landing() {
  return (
    <div
      data-testid="landing-root"
      className="relative min-h-screen bg-[#0a0a0a] text-[#f4f4f4] antialiased selection:bg-[#ffb000] selection:text-[#0a0a0a] overflow-hidden"
    >
      <ThreeBackground />
      <div className="relative z-10">
        <Navbar />
        {/* Hero → Problem → Solution → Demo → Features → CTA */}
        <main>
          <Hero />
          <ProblemSolution />
          <ArchitectureFlow />
          <CliShowcase />
          <Pillars />
          <ClosingCta />
        </main>
        <Footer />
      </div>
    </div>
  );
}
