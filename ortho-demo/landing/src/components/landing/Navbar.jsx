import React, { useEffect, useState } from "react";
import { Github, Menu, X } from "lucide-react";

const LINKS = [
  { href: "#problem", label: "Problem" },
  { href: "#flow", label: "How it works" },
  { href: "#cli", label: "Demo" },
  { href: "#pillars", label: "Features" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors ${
        scrolled
          ? "bg-[#0a0a0a]/85 border-[#27272a] backdrop-blur-xl"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          data-testid="navbar-logo"
          href="#top"
          className="flex items-center gap-2 group"
        >
          <span className="w-2 h-2 bg-[#ffb000] group-hover:bg-[#f4f4f4] transition-colors" />
          <span className="font-serif text-2xl leading-none tracking-tight">
            ortho<span className="text-[#ffb000]">.</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              data-testid={`navbar-link-${l.label.toLowerCase()}`}
              href={l.href}
              className="text-xs uppercase tracking-[0.18em] text-[#a1a1aa] hover:text-[#ffb000] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            data-testid="navbar-dashboard-link"
            href="../dashboard/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center h-9 px-4 bg-[#27272a] text-[#f4f4f4] text-xs uppercase tracking-[0.18em] hover:bg-[#52525b] transition-colors border border-[#52525b]"
          >
            Dashboard
          </a>
          <a
            data-testid="navbar-github-link"
            href="#"
            onClick={(e) => e.preventDefault()}
            className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#a1a1aa] hover:text-[#f4f4f4] transition-colors border border-[#27272a] hover:border-[#52525b] px-3 h-9"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
            <span
              data-testid="navbar-github-coming-soon"
              className="ml-1 text-[9px] tracking-[0.15em] text-[#0a0a0a] bg-[#ffb000] px-1.5 py-0.5"
            >
              SOON
            </span>
          </a>
          <a
            data-testid="navbar-join-beta-button"
            href="#waitlist"
            className="inline-flex items-center h-9 px-4 bg-[#f4f4f4] text-[#0a0a0a] text-xs uppercase tracking-[0.18em] hover:bg-[#ffb000] transition-colors"
          >
            Request access →
          </a>
          <button
            data-testid="navbar-mobile-toggle"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-9 h-9 grid place-items-center border border-[#27272a]"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          data-testid="navbar-mobile-menu"
          className="lg:hidden border-t border-[#27272a] bg-[#0a0a0a]"
        >
          <nav className="px-6 py-4 grid gap-3">
            {LINKS.map((l) => (
              <a
                key={l.href}
                data-testid={`navbar-mobile-link-${l.label.toLowerCase()}`}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-[#a1a1aa] hover:text-[#ffb000]"
              >
                {l.label}
              </a>
            ))}
            <a
              data-testid="navbar-mobile-dashboard-link"
              href="../dashboard/index.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="text-sm text-[#a1a1aa] hover:text-[#ffb000]"
            >
              Dashboard
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
