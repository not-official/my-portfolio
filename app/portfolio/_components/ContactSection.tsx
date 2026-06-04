"use client";

import { motion } from "framer-motion";

import SectionHeader from "./SectionHeader";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./SocialIcons";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-10 px-4 pb-8 pt-16 sm:px-6 md:px-12 md:pt-20"
    >
      <div className="mx-auto w-full max-w-6xl border-t border-black/20 pt-12 md:pt-14">
        <SectionHeader label="Contact" title="Let's Connect" />

        <div className="relative border-b border-black/30 pb-24 md:min-h-[270px] md:pb-0">
          <div className="flex flex-col items-end gap-4 md:block">
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="md:absolute md:right-24 md:top-0"
            >
              <motion.a
                href="https://github.com/not-official"
                target="_blank"
                rel="noopener noreferrer"
                animate={{ rotate: -7, y: 0, scale: 1 }}
                whileHover={{ y: -8, rotate: -4, scale: 1.025 }}
                whileTap={{ scale: 0.985, y: -3 }}
                transition={{
                  type: "spring",
                  stiffness: 190,
                  damping: 24,
                  mass: 0.8,
                }}
                className="group relative inline-flex rotate-[-2deg] items-center gap-3 border border-black/70 bg-[#faf9f4] px-6 py-3 font-mono text-lg lowercase tracking-[-0.04em] will-change-transform transition-colors hover:border-[#2563eb] hover:text-[#2563eb] focus:border-[#2563eb] focus:text-[#2563eb] md:rotate-[-7deg] md:px-8 md:text-xl"
              >
                <GitHubIcon />
                github

                <span className="pointer-events-none absolute bottom-full right-0 mb-3 translate-y-1 whitespace-nowrap border border-[#2563eb]/40 bg-[#faf9f4] px-3 py-2 font-mono text-[10px] font-semibold lowercase tracking-[0.08em] text-[#2563eb] opacity-0 shadow-[5px_6px_0_rgba(0,0,0,0.06)] transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 md:right-auto md:left-1/2 md:-translate-x-1/2 md:group-hover:-translate-x-1/2 md:group-focus:-translate-x-1/2">
                  not-official
                </span>
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="md:absolute md:right-0 md:top-16"
            >
              <motion.a
                href="https://www.linkedin.com/in/aman-ck-1655bb410/"
                target="_blank"
                rel="noopener noreferrer"
                animate={{ rotate: 3, y: 0, scale: 1 }}
                whileHover={{ y: -8, rotate: 1, scale: 1.025 }}
                whileTap={{ scale: 0.985, y: -3 }}
                transition={{
                  type: "spring",
                  stiffness: 190,
                  damping: 24,
                  mass: 0.8,
                }}
                className="group relative inline-flex rotate-[2deg] items-center gap-3 border border-black/70 bg-[#faf9f4] px-6 py-3 font-mono text-lg lowercase tracking-[-0.04em] will-change-transform transition-colors hover:border-[#2563eb] hover:text-[#2563eb] focus:border-[#2563eb] focus:text-[#2563eb] md:rotate-[3deg] md:px-8 md:text-xl"
              >
                <LinkedInIcon />
                linkedin

                <span className="pointer-events-none absolute right-0 top-full mt-3 translate-y-1 whitespace-nowrap border border-[#2563eb]/40 bg-[#faf9f4] px-3 py-2 font-mono text-[10px] font-semibold tracking-[0.08em] text-[#2563eb] opacity-0 shadow-[5px_6px_0_rgba(0,0,0,0.06)] transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 md:right-auto md:left-1/2 md:-translate-x-1/2 md:group-hover:-translate-x-1/2 md:group-focus:-translate-x-1/2">
                  Aman CK
                </span>
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: 0.16,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="md:absolute md:right-44 md:top-24"
            >
              <motion.a
                href="mailto:ckaman108@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                animate={{ rotate: -4, y: 0, scale: 1 }}
                whileHover={{ y: -8, rotate: -2, scale: 1.025 }}
                whileTap={{ scale: 0.985, y: -3 }}
                transition={{
                  type: "spring",
                  stiffness: 190,
                  damping: 24,
                  mass: 0.8,
                }}
                className="group relative inline-flex rotate-[-2deg] items-center gap-3 border border-black/70 bg-[#faf9f4] px-6 py-3 font-mono text-lg lowercase tracking-[-0.04em] will-change-transform transition-colors hover:border-[#2563eb] hover:text-[#2563eb] focus:border-[#2563eb] focus:text-[#2563eb] md:rotate-[-4deg] md:px-8 md:text-xl"
              >
                <MailIcon />
                email

                <span className="pointer-events-none absolute right-0 top-full mt-3 translate-y-1 whitespace-nowrap border border-[#2563eb]/40 bg-[#faf9f4] px-3 py-2 font-mono text-[10px] font-semibold lowercase tracking-[0.08em] text-[#2563eb] opacity-0 shadow-[5px_6px_0_rgba(0,0,0,0.06)] transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 md:right-auto md:left-1/2 md:-translate-x-1/2 md:group-hover:-translate-x-1/2 md:group-focus:-translate-x-1/2">
                  ckaman108@gmail.com
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.45,
            delay: 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#777] md:text-[11px] md:tracking-[0.22em]"
        >
          © Aman CK
        </motion.p>
      </div>
    </section>
  );
}