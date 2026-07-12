import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowUpRight, Mail } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ROLES = [
  { value: "engineer", label: "Individual engineer" },
  { value: "architect", label: "Architect" },
  { value: "manager", label: "Engineering manager" },
  { value: "founder", label: "Founder / CTO" },
  { value: "other", label: "Other" },
];
// hot reload test 2

export default function Footer() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const clean = email.trim();
    if (!clean || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/waitlist`, {
        email: clean,
        role: role || null,
        referrer:
          typeof window !== "undefined" ? window.location.href : null,
      });
      setDone(true);
      if (data.duplicate) {
        toast("You're already on the list.", {
          description: "We'll be in touch when the next release lands.",
        });
      } else {
        toast.success("You're on the Ortho beta waitlist.", {
          description: "You'll hear from us when the next release lands.",
        });
      }
    } catch (err) {
      const detail =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.detail ||
        "Could not join the waitlist. Please try again.";
      toast.error(String(detail));
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      id="waitlist"
      data-testid="footer-section"
      className="relative border-t border-[#27272a] bg-[#0a0a0a]/70 ortho-grain"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        {/* Waitlist form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#ffb000]">
              &sect; 08 &mdash; beta access
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight mt-4">
              Get early access.
              <br />
              <span className="italic text-[#ffb000]">Shape the roadmap.</span>
            </h2>
            <p className="mt-6 text-[#a1a1aa] max-w-lg">
              Ortho is in private beta. Join the waitlist to get access when
              the next release lands &mdash; and to help decide what comes
              next.
            </p>
            <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#52525b]">
              <Mail className="w-3.5 h-3.5" />
              urbrain369@gmail.com · direct contact
            </div>
          </div>

          <div className="lg:col-span-6">
            {!done ? (
              <form
                data-testid="waitlist-form"
                onSubmit={submit}
                noValidate
                className="border border-[#27272a] bg-[#141414] p-6 sm:p-8"
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#52525b]">
                  join the beta
                </div>

                <label
                  htmlFor="waitlist-email"
                  className="block mt-6 text-[10px] uppercase tracking-[0.2em] text-[#a1a1aa]"
                >
                  email
                </label>
                <input
                  id="waitlist-email"
                  data-testid="waitlist-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.dev"
                  className="mt-2 w-full bg-transparent border-b border-[#27272a] focus:border-[#ffb000] outline-none py-2 text-[#f4f4f4] placeholder:text-[#3f3f46] transition-colors"
                />

                <label
                  htmlFor="waitlist-role"
                  className="block mt-6 text-[10px] uppercase tracking-[0.2em] text-[#a1a1aa]"
                >
                  role · optional
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ROLES.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      data-testid={`waitlist-role-${r.value}`}
                      onClick={() =>
                        setRole((cur) => (cur === r.value ? "" : r.value))
                      }
                      className={`text-[10px] uppercase tracking-[0.18em] px-3 py-2 border transition-colors ${
                        role === r.value
                          ? "border-[#ffb000] text-[#ffb000] bg-[#ffb000]/[0.06]"
                          : "border-[#27272a] text-[#a1a1aa] hover:border-[#52525b]"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  data-testid="waitlist-submit-button"
                  disabled={loading}
                  className="mt-8 inline-flex items-center gap-2 h-11 px-6 bg-[#f4f4f4] text-[#0a0a0a] text-xs uppercase tracking-[0.2em] hover:bg-[#ffb000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting…" : "Request early access"}
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <p className="mt-6 text-[10px] uppercase tracking-[0.18em] text-[#52525b]">
                  no spam · no cloud · unsubscribe anytime
                </p>
              </form>
            ) : (
              <div
                data-testid="waitlist-success"
                className="border border-[#10b981]/40 bg-[#10b981]/[0.05] p-8"
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#10b981]">
                  ✓ confirmed
                </div>
                <h3 className="font-serif text-3xl mt-3 text-[#f4f4f4]">
                  You&apos;re on the list.
                </h3>
                <p className="mt-4 text-sm text-[#a1a1aa]">
                  We&apos;ll email <span className="text-[#f4f4f4]">{email}</span>{" "}
                  when the next release lands.
                </p>
                <button
                  type="button"
                  data-testid="waitlist-reset"
                  onClick={() => {
                    setDone(false);
                    setEmail("");
                    setRole("");
                  }}
                  className="mt-6 text-[10px] uppercase tracking-[0.2em] text-[#a1a1aa] hover:text-[#ffb000]"
                >
                  ← add another
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Massive brand */}
        <div className="mt-24 border-t border-[#27272a] pt-10">
          <div
            aria-hidden
            className="font-serif text-[22vw] sm:text-[16vw] lg:text-[14vw] leading-[0.85] tracking-tight text-[#141414] select-none"
          >
            ortho<span className="text-[#ffb000]">.</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-[11px] uppercase tracking-[0.18em] text-[#52525b] border-t border-[#27272a] pt-8">
          <div>
            © 2026 ortho
            <br />
            local-first · no cloud
          </div>
          <div className="space-y-1.5">
            <div className="text-[#a1a1aa]">product</div>
            <a href="#problem" className="block hover:text-[#ffb000]">
              problem
            </a>
            <a href="#flow" className="block hover:text-[#ffb000]">
              how it works
            </a>
            <a href="#cli" className="block hover:text-[#ffb000]">
              demo
            </a>
          </div>
          <div className="space-y-1.5">
            <div className="text-[#a1a1aa]">docs</div>
            <a href="#pillars" className="block hover:text-[#ffb000]">
              features
            </a>
            <a
              href="https://github.com/AdithyaK3106/Ortho-Community"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-[#ffb000]"
            >
              roadmap ·{" "}
              <span className="text-[#ffb000]">on github</span>
            </a>
          </div>
          <div className="space-y-1.5">
            <div className="text-[#a1a1aa]">community</div>
            <a
              href="https://github.com/AdithyaK3106/Ortho-Community"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-[#ffb000]"
            >
              github ·{" "}
              <span className="text-[#ffb000]">discussions</span>
            </a>
            <a
              href="mailto:urbrain369@gmail.com"
              className="block hover:text-[#ffb000]"
              data-testid="footer-contact-email"
            >
              contact →
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
