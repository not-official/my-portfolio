"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Project = {
  number: string;
  name: string;
  type: string;
  description: string;
  stack: string[];
  image: string;
  liveUrl?: string;
  githubUrl: string;
};

const projects: Project[] = [
  {
    number: "01",
    name: "BinaryPot",
    type: "SSH Honeypot",
    description:
      "LLM-powered honeypot for attacker interaction and session logging.",
    stack: ["React", "FastAPI", "Python", "Security"],
    image: "/projects/binarypot.png",
    liveUrl: "https://bpot-frontend.vercel.app/",
    githubUrl: "https://github.com/not-official/BinaryPot",
  },
  {
    number: "02",
    name: "Not-Chess",
    type: "C++ Chess",
    description: "Chess logic, movement rules, and C++ structure.",
    stack: ["C++", "OOP", "Game Logic"],
    image: "/projects/notchess.png",
    githubUrl: "https://github.com/not-official/Not-Chess",
  },
  {
    number: "03",
    name: "SavorNepal",
    type: "Food / Culture",
    description: "A web project around Nepali food and culture.",
    stack: ["React", "Next.js", "CSS"],
    image: "/projects/savornepal.png",
    liveUrl: "https://sn-frontend-mocha.vercel.app/",
    githubUrl: "https://github.com/samrat-dotel/SavorNepal",
  },
];

const skills = [
  {
    name: "C++",
    rotate: "-7deg",
    y: "top-0",
    x: "left-1/2 -translate-x-1/2",
    z: "z-[10]",
  },
  {
    name: "HTML",
    rotate: "4deg",
    y: "top-[42px]",
    x: "left-1/2 -translate-x-[42%]",
    z: "z-[9]",
  },
  {
    name: "CSS",
    rotate: "-3deg",
    y: "top-[84px]",
    x: "left-1/2 -translate-x-[58%]",
    z: "z-[8]",
  },
  {
    name: "JavaScript",
    rotate: "5deg",
    y: "top-[126px]",
    x: "left-1/2 -translate-x-[44%]",
    z: "z-[7]",
  },
  {
    name: "React",
    rotate: "-5deg",
    y: "top-[168px]",
    x: "left-1/2 -translate-x-[56%]",
    z: "z-[6]",
  },
  {
    name: "Next.js",
    rotate: "3deg",
    y: "top-[210px]",
    x: "left-1/2 -translate-x-[43%]",
    z: "z-[5]",
  },
  {
    name: "Node.js",
    rotate: "-4deg",
    y: "top-[252px]",
    x: "left-1/2 -translate-x-[55%]",
    z: "z-[4]",
  },
  {
    name: "Express",
    rotate: "4deg",
    y: "top-[294px]",
    x: "left-1/2 -translate-x-[45%]",
    z: "z-[3]",
  },
  {
    name: "Python",
    rotate: "-3deg",
    y: "top-[336px]",
    x: "left-1/2 -translate-x-[57%]",
    z: "z-[2]",
  },
  {
    name: "FastAPI",
    rotate: "5deg",
    y: "top-[378px]",
    x: "left-1/2 -translate-x-[43%]",
    z: "z-[1]",
  },
];

const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const phrases: Record<string, string> = {
  A: "Aman builds systems with intent.",
  B: "BinaryPot studies attacker behavior.",
  C: "C++ teaches structure and control.",
  D: "Design makes software feel clear.",
  E: "Every project begins with curiosity.",
  F: "Frontend turns ideas into interfaces.",
  G: "Good systems hide their complexity.",
  H: "Human details make websites memorable.",
  I: "Interfaces should feel simple.",
  J: "JavaScript connects the experience.",
  K: "Knowledge grows through building.",
  L: "Logic becomes stronger through practice.",
  M: "Minimal design needs strong decisions.",
  N: "Not-Chess sharpens C++ thinking.",
  O: "Objects, rules, and systems matter.",
  P: "Projects show how I learn.",
  Q: "Quality comes from refinement.",
  R: "React helps shape interactive ideas.",
  S: "SavorNepal explores food and culture.",
  T: "Tools are only useful when applied.",
  U: "Users remember how things feel.",
  V: "Visual rhythm guides attention.",
  W: "Web interfaces are my playground.",
  X: "X marks the next experiment.",
  Y: "You entered through a puzzle.",
  Z: "Zero templates. Just built work.",
};

const navItems = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Resume", "/Aman-CK-CV.pdf"],
  ["Contact", "#contact"],
];

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 6h18v12H3z" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.05A9.28 9.28 0 0 1 12 6.95c.85 0 1.7.12 2.5.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.07 10.07 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.32 8.02h4.34V23H.32V8.02ZM8.1 8.02h4.16v2.05h.06c.58-1.1 2-2.26 4.11-2.26 4.4 0 5.21 2.9 5.21 6.67V23h-4.33v-7.56c0-1.8-.03-4.12-2.51-4.12-2.52 0-2.9 1.97-2.9 4V23H8.1V8.02Z" />
    </svg>
  );
}

function SectionHeader({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div className="mb-10 border-b border-black/20 pb-5">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[#777]">
        {label}
      </p>

      <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#171717] md:text-6xl">
        {title}
      </h2>
    </div>
  );
}

export default function PortfolioPage() {
  const [activeLetter, setActiveLetter] = useState("A");
  const [typedText, setTypedText] = useState("");

  const activePhrase = useMemo(() => phrases[activeLetter], [activeLetter]);

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleNavigation = (href: string) => {
    if (href.startsWith("#")) {
      scrollToSection(href);
      return;
    }

    window.open(href, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    setTypedText("");

    let index = 0;

    const interval = window.setInterval(() => {
      setTypedText(activePhrase.slice(0, index + 1));
      index += 1;

      if (index >= activePhrase.length) {
        window.clearInterval(interval);
      }
    }, 34);

    return () => window.clearInterval(interval);
  }, [activePhrase]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();

      if (phrases[key]) {
        setActiveLetter(key);
        return;
      }

      if (event.key === "1") {
        scrollToSection("#work");
      }

      if (event.key === "2") {
        scrollToSection("#about");
      }

      if (event.key === "3") {
        window.open("/Aman-CK-CV.pdf", "_blank", "noopener,noreferrer");
      }

      if (event.key === "4") {
        scrollToSection("#contact");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="min-h-screen bg-[#faf9f4] text-[#171717]">
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[size:76px_76px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.16)_1.5px,transparent_2px)] bg-[size:76px_76px]" />
      </div>

      <section className="relative z-10 min-h-screen px-6 py-7 md:px-12">
        <header className="flex items-start justify-between">
          <Link
            href="/portfolio"
            rel="noopener noreferrer"
            className="group relative font-mono text-[12px] font-semibold uppercase leading-[2.05] tracking-[0.32em]"
          >
            <span className="block">Aman CK</span>
            <span className="block text-[#6f6f6f]">Computer Engineering</span>
            <span className="block text-[#6f6f6f]">Paschimanchal Campus</span>
            <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#2563eb] transition-all duration-300 group-hover:w-full" />
          </Link>

          <div className="hidden items-start gap-8 md:flex">
            <div className="mt-1 h-16 w-px bg-black/20" />

            <nav className="flex flex-col items-end gap-1 font-mono text-[12px] font-semibold uppercase tracking-[0.32em]">
              {navItems.map(([label, href], index) => (
                <a
                  key={label}
                  href={href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavigation(href);
                  }}
                  className="group flex items-center gap-3 transition hover:text-[#2563eb]"
                >
                  <span className="text-[10px] text-[#9a9a9a] transition group-hover:text-[#2563eb]">
                    0{index + 1}
                  </span>
                  <span>{label}</span>
                  <span className="h-px w-0 bg-[#2563eb] transition-all duration-300 group-hover:w-8" />
                </a>
              ))}
            </nav>
          </div>

          <button className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] md:hidden">
            Menu
          </button>
        </header>

        <section className="flex min-h-[calc(100vh-140px)] flex-col items-center justify-center text-center">
          <div className="mb-10 flex items-center justify-center">
            <div className="h-8 w-20 border-t-[3px] border-[#171717]" />
            <div className="mx-4 h-8 w-20 border-t-[3px] border-[#171717]" />
          </div>

          <motion.h1
            key={activePhrase}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative mx-auto min-h-[124px] max-w-5xl font-mono text-[clamp(1.9rem,4.7vw,4.5rem)] font-semibold leading-[1.22] tracking-[0.11em] text-[#2a2a2a]"
          >
            <span className="text-[#7a7a7a]">|</span>
            {typedText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.9 }}
              className="ml-2 text-[#7a7a7a]"
            >
              |
            </motion.span>
          </motion.h1>

          <div className="mt-12 flex flex-col items-center gap-5">
            {keyboardRows.map((row, rowIndex) => (
              <div
                key={row.join("")}
                className={[
                  "flex gap-4 md:gap-5",
                  rowIndex === 1 ? "translate-x-6 md:translate-x-8" : "",
                  rowIndex === 2 ? "translate-x-0" : "",
                ].join(" ")}
              >
                {row.map((letter) => {
                  const isActive = activeLetter === letter;

                  return (
                    <motion.button
                      key={letter}
                      onClick={() => setActiveLetter(letter)}
                      whileHover={{ y: -5 }}
                      whileTap={{ y: 6, scale: 0.94 }}
                      animate={
                        isActive
                          ? {
                              y: -5,
                              rotate: -1,
                              boxShadow:
                                "0 9px 0 #1f1f1f, 0 24px 34px rgba(0,0,0,0.24)",
                            }
                          : {
                              y: 0,
                              rotate: 0,
                              boxShadow:
                                "0 7px 0 #1f1f1f, 0 20px 28px rgba(0,0,0,0.22)",
                            }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 24,
                      }}
                      className={[
                        "relative h-[56px] w-[56px] rounded-full bg-[#202020] p-[5px] transition md:h-[68px] md:w-[68px]",
                        "border-[3px] border-[#1a1a1a]",
                        "before:pointer-events-none before:absolute before:inset-[4px] before:rounded-full before:border before:border-white/15 before:content-['']",
                        "after:pointer-events-none after:absolute after:inset-[-6px] after:-z-10 after:rounded-full after:bg-black/10 after:blur-[2px] after:content-['']",
                      ].join(" ")}
                      aria-label={`Typewriter key ${letter}`}
                    >
                      <span
                        className={[
                          "relative z-10 flex h-full w-full items-center justify-center rounded-full",
                          "border border-[#9f9688] bg-[#eee7d9]",
                          "font-serif text-[22px] font-semibold leading-none md:text-[26px]",
                          "shadow-[inset_3px_3px_6px_rgba(255,255,255,0.95),inset_-4px_-5px_8px_rgba(0,0,0,0.2)]",
                          isActive
                            ? "text-[#2563eb]"
                            : "text-[#2f2f2f] hover:text-[#2563eb]",
                        ].join(" ")}
                      >
                        <span className="relative">
                          {letter}
                          <span className="absolute -bottom-1 left-1/2 h-px w-3 -translate-x-1/2 bg-black/20" />
                        </span>
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap justify-center gap-3">
            <a
              href="#work"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("#work");
              }}
              className="border border-[#171717] bg-[#171717] px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#faf9f4] transition hover:bg-[#2563eb] hover:text-white"
            >
              View Work
            </a>

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#171717] px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:bg-[#171717] hover:text-[#faf9f4]"
            >
              Back to Gate
            </Link>
          </div>
        </section>
      </section>

      <section id="work" className="relative z-10 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl border-t border-black/20 pt-14">
          <SectionHeader label="Work" title="Featured projects" />

          <div className="grid gap-7">
            {projects.map((project) => (
              <article
                key={project.name}
                className="grid overflow-hidden border border-black/20 bg-[#faf9f4]/80 backdrop-blur transition hover:border-[#2563eb] md:grid-cols-[0.55fr_0.45fr]"
              >
                <div className="relative min-h-[260px] border-b border-black/20 bg-black md:min-h-[360px] md:border-b-0 md:border-r">
                  <Image
                    src={project.image}
                    alt={`${project.name} screenshot`}
                    fill
                    className="object-cover object-left-top grayscale transition duration-700 hover:grayscale-0"
                  />
                </div>

                <div className="p-6 md:p-8">
                  <div className="mb-12 flex items-center justify-between font-mono text-xs uppercase tracking-[0.22em] text-[#777]">
                    <span>{project.number}</span>
                    <span>{project.type}</span>
                  </div>

                  <h3 className="text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
                    {project.name}
                  </h3>

                  <p className="mt-5 max-w-md text-sm leading-7 text-[#555]">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="border border-black/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#555]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs uppercase tracking-[0.2em] underline underline-offset-4 hover:text-[#2563eb]"
                      >
                        Live
                      </a>
                    )}

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs uppercase tracking-[0.2em] underline underline-offset-4 hover:text-[#2563eb]"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative z-10 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl border-t border-black/20 pt-14">
          <SectionHeader label="About" title="Profile" />

          <div className="grid gap-10 md:grid-cols-[0.42fr_0.58fr] md:items-start">
            <div className="relative">
              <div className="absolute -left-3 -top-3 z-0 h-full w-full border border-black/20 bg-[#ece7dc]" />

              <div className="relative z-10 overflow-hidden border border-black/25 bg-[#faf9f4]/80 p-3 backdrop-blur">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e4d8]">
                  <Image
                    src="/profile/aman-portrait.png"
                    alt="Stylized portrait of Aman CK"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="max-w-2xl text-2xl font-semibold leading-[1.25] tracking-[-0.04em] text-[#171717] md:text-4xl">
                I like building things that make ideas feel real.
              </p>

              <div className="mt-7 space-y-5 text-base leading-8 text-[#444]">
                <p>
                  I am Aman CK, a Computer Engineering graduate from
                  Paschimanchal Campus. I am passionate about turning ideas into
                  working software — whether that means writing C++ logic,
                  designing clean interfaces, or connecting frontend experiences
                  with backend systems.
                </p>

                <p>
                  My projects are how I learn best. Not-Chess helps me think
                  deeper about structure and problem solving, BinaryPot pushes me
                  toward cybersecurity and backend systems, and SavorNepal lets
                  me explore culture through web design. I care about building
                  with intention, patience, and a clear eye for detail.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/Aman-CK-CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#171717] bg-[#171717] px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#faf9f4] transition hover:bg-[#2563eb] hover:text-white"
                >
                  Resume
                </a>

                <a
                  href="#contact"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection("#contact");
                  }}
                  className="border border-[#171717] px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:bg-[#171717] hover:text-[#faf9f4]"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="stack" className="relative z-10 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl border-t border-black/20 pt-14">
          <SectionHeader label="Stack" title="Tools" />

          <div className="relative min-h-[470px] md:min-h-[460px]">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 24, rotate: 0 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: Number(skill.rotate.replace("deg", "")),
                }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.055,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -12,
                  rotate: Number(skill.rotate.replace("deg", "")) * 0.35,
                  scale: 1.035,
                  zIndex: 20,
                }}
                whileTap={{ scale: 0.97 }}
                className={[
                  "absolute top-0 inline-flex w-[250px] items-center justify-between border border-black/70 bg-[#faf9f4] px-7 py-4 font-mono text-lg lowercase tracking-[-0.03em] shadow-[8px_10px_0_rgba(0,0,0,0.08)] transition hover:border-[#2563eb] hover:text-[#2563eb] md:w-[315px] md:text-xl",
                  skill.x,
                  skill.y,
                  skill.z,
                ].join(" ")}
                style={{ rotate: skill.rotate }}
              >
                <span>{skill.name}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#777]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 px-6 pb-8 pt-20 md:px-12">
        <div className="mx-auto w-full max-w-6xl border-t border-black/20 pt-14">
          <SectionHeader label="Contact" title="Let's Connect" />

          <div className="relative min-h-[270px] border-b border-black/30">
            <a
              href="https://github.com/not-official"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-24 top-0 inline-flex rotate-[-7deg] items-center gap-3 border border-black/70 bg-[#faf9f4] px-8 py-3 font-mono text-xl lowercase tracking-[-0.04em] transition hover:-translate-y-1 hover:border-[#2563eb] hover:text-[#2563eb]"
            >
              <GitHubIcon />
              github
            </a>

            <a
              href="https://www.linkedin.com/in/aman-ck-1655bb410/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-0 top-16 inline-flex rotate-[3deg] items-center gap-3 border border-black/70 bg-[#faf9f4] px-8 py-3 font-mono text-xl lowercase tracking-[-0.04em] transition hover:-translate-y-1 hover:border-[#2563eb] hover:text-[#2563eb]"
            >
              <LinkedInIcon />
              linkedin
            </a>

            <a
              href="mailto:ckaman108@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-44 top-24 inline-flex rotate-[-4deg] items-center gap-3 border border-black/70 bg-[#faf9f4] px-8 py-3 font-mono text-xl lowercase tracking-[-0.04em] transition hover:-translate-y-1 hover:border-[#2563eb] hover:text-[#2563eb]"
            >
              <MailIcon />
              email
            </a>

            <p className="absolute bottom-8 left-0 font-mono text-[11px] uppercase tracking-[0.22em] text-[#777]">
              © Aman CK
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}