"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { keyboardRows } from "../_data/portfolioData";

type PortfolioHeroProps = {
  activeLetter: string;
  activePhrase: string;
  typedText: string;
  soundEnabled: boolean;
  typingRun: number;
  selectLetter: (letter: string) => void;
  toggleSound: () => void;
  scrollToSection: (sectionId: string) => void;
};

export default function PortfolioHero({
  activeLetter,
  activePhrase,
  typedText,
  soundEnabled,
  typingRun,
  selectLetter,
  toggleSound,
  scrollToSection,
}: PortfolioHeroProps) {
  return (
    <section className="flex min-h-[calc(100vh-118px)] flex-col items-center justify-center py-8 text-center md:min-h-[calc(100vh-140px)] md:py-0">
      <div className="mb-6 flex items-center justify-center md:mb-10">
        <div className="h-6 w-14 border-t-[3px] border-[var(--ink)] transition-colors duration-300 md:h-8 md:w-20" />
        <div className="mx-3 h-6 w-14 border-t-[3px] border-[var(--ink)] transition-colors duration-300 md:mx-4 md:h-8 md:w-20" />
      </div>

      <motion.h1
        key={`${activePhrase}-${typingRun}`}
        initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative mx-auto min-h-[88px] max-w-[92vw] font-mono text-[clamp(1.45rem,7.4vw,2.45rem)] font-semibold leading-[1.25] tracking-[0.07em] text-[var(--ink-soft)] transition-colors duration-300 sm:min-h-[104px] sm:text-[clamp(1.8rem,6vw,3.2rem)] md:min-h-[124px] md:max-w-5xl md:text-[clamp(1.9rem,4.7vw,4.5rem)] md:tracking-[0.11em]"
      >
        <span className="text-[var(--muted)]">|</span>
        {typedText}

        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.9 }}
          className="ml-1.5 text-[var(--muted)] md:ml-2"
        >
          |
        </motion.span>
      </motion.h1>

      <div className="mt-8 flex w-full flex-col items-center gap-3 sm:gap-4 md:mt-12 md:gap-5">
        {keyboardRows.map((row, rowIndex) => (
          <div
            key={row.join("")}
            className={[
              "flex justify-center gap-1.5 sm:gap-2 md:gap-5",
              rowIndex === 1
                ? "translate-x-3 sm:translate-x-4 md:translate-x-8"
                : "",
              rowIndex === 2 ? "translate-x-0" : "",
            ].join(" ")}
          >
            {row.map((letter) => {
              const isActive = activeLetter === letter;

              return (
                <motion.button
                  key={letter}
                  onClick={() => selectLetter(letter)}
                  whileHover={{ y: -5 }}
                  whileTap={{ y: 5, scale: 0.94 }}
                  animate={
                    isActive
                      ? {
                          y: -4,
                          rotate: -1,
                          boxShadow:
                            "0 6px 0 rgba(0,0,0,0.68), 0 16px 22px rgba(0,0,0,0.22)",
                        }
                      : {
                          y: 0,
                          rotate: 0,
                          boxShadow:
                            "0 5px 0 rgba(0,0,0,0.62), 0 14px 18px rgba(0,0,0,0.2)",
                        }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 24,
                  }}
                  className={[
                    "relative h-[32px] w-[32px] rounded-full bg-[var(--key-shell)] p-[3px] transition-colors duration-300",
                    "border-2 border-[var(--key-shell-border)]",
                    "before:pointer-events-none before:absolute before:inset-[3px] before:rounded-full before:border before:border-white/15 before:content-['']",
                    "after:pointer-events-none after:absolute after:inset-[-4px] after:-z-10 after:rounded-full after:bg-black/10 after:blur-[2px] after:content-['']",
                    "sm:h-[42px] sm:w-[42px] sm:p-[4px]",
                    "md:h-[68px] md:w-[68px] md:border-[3px] md:p-[5px]",
                  ].join(" ")}
                  aria-label={`Typewriter key ${letter}`}
                >
                  <span
                    className={[
                      "relative z-10 flex h-full w-full items-center justify-center rounded-full",
                      "border border-[var(--key-face-border)] bg-[var(--key-face)]",
                      "font-serif text-[14px] font-semibold leading-none sm:text-[18px] md:text-[26px]",
                      "shadow-[inset_2px_2px_4px_var(--key-highlight),inset_-3px_-4px_7px_var(--key-shadow)]",
                      "md:shadow-[inset_3px_3px_6px_var(--key-highlight),inset_-4px_-5px_8px_var(--key-shadow)]",
                      "transition-colors duration-300",
                      isActive
                        ? "text-[var(--accent)]"
                        : "text-[var(--key-text)] hover:text-[var(--accent)]",
                    ].join(" ")}
                  >
                    <span className="relative">
                      {letter}
                      <span className="absolute -bottom-1 left-1/2 h-px w-2 -translate-x-1/2 bg-[var(--line)] md:w-3" />
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>

      <button
        onClick={toggleSound}
        aria-pressed={soundEnabled}
        className={[
          "group mt-6 inline-flex items-center gap-3 border px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] shadow-[5px_6px_0_rgba(0,0,0,0.06)] transition-colors duration-300 hover:-translate-y-0.5",
          soundEnabled
            ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
            : "border-[var(--line)] bg-[var(--card)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
        ].join(" ")}
      >
        <span className="text-[9px] tracking-[0.2em]">Type Sound</span>

        <span
          className={[
            "relative h-[18px] w-[38px] border transition-colors duration-300",
            soundEnabled
              ? "border-[var(--paper)]/70 bg-[var(--paper)]/10"
              : "border-[var(--line)] bg-black/[0.03] group-hover:border-[var(--accent)]/50",
          ].join(" ")}
        >
          <span
            className={[
              "absolute top-1/2 h-[10px] w-[10px] -translate-y-1/2 transition-all duration-300",
              soundEnabled
                ? "left-[22px] bg-[var(--paper)]"
                : "left-[4px] bg-[var(--muted)] group-hover:bg-[var(--accent)]",
            ].join(" ")}
          />
        </span>

        <span className="min-w-[24px] text-left">
          {soundEnabled ? "On" : "Off"}
        </span>
      </button>

      <div className="mt-10 flex flex-wrap justify-center gap-3 md:mt-14">
        <a
          href="#work"
          onClick={(event) => {
            event.preventDefault();
            scrollToSection("#work");
          }}
          className="border border-[var(--ink)] bg-[var(--ink)] px-4 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--paper)] transition-colors duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white md:px-5 md:text-[11px] md:tracking-[0.22em]"
        >
          View Work
        </a>

        <Link
          href="/"
          rel="noopener noreferrer"
          className="border border-[var(--ink)] px-4 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--ink)] hover:text-[var(--paper)] md:px-5 md:text-[11px] md:tracking-[0.22em]"
        >
          Back to Gate
        </Link>
      </div>
    </section>
  );
}