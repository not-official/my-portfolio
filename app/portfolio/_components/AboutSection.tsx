"use client";

import Image from "next/image";

import { RESUME_URL } from "../_data/portfolioData";
import SectionHeader from "./SectionHeader";

type AboutSectionProps = {
  scrollToSection: (sectionId: string) => void;
};

export default function AboutSection({ scrollToSection }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="relative z-10 px-4 py-16 sm:px-6 md:px-12 md:py-20"
    >
      <div className="mx-auto max-w-6xl border-t border-black/20 pt-12 md:pt-14">
        <SectionHeader label="About" title="Profile" />

        <div className="grid gap-10 md:grid-cols-[0.42fr_0.58fr] md:items-start">
          <div className="relative mx-auto w-full max-w-[360px] md:max-w-none">
            <div className="absolute -left-2 -top-2 z-0 h-full w-full border border-black/20 bg-[#ece7dc] md:-left-3 md:-top-3" />

            <div className="relative z-10 overflow-hidden border border-black/25 bg-[#faf9f4]/80 p-2 backdrop-blur md:p-3">
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
            <p className="max-w-2xl text-3xl font-semibold leading-[1.18] tracking-[-0.04em] text-[#171717] md:text-4xl md:leading-[1.25]">
              Jack of all trades, master of figuring it out.
            </p>

            <div className="mt-6 space-y-5 text-sm leading-7 text-[#444] sm:text-base sm:leading-8 md:mt-7">
              <p>
                I am Aman CK, a Computer Engineering graduate from Paschimanchal
                Campus. I am still growing as a developer, but I enjoy the
                process of learning, building, and improving. I work across C++
                logic, frontend interfaces, and backend systems because I like
                understanding how different parts of software come together.
              </p>

              <p>
                Over the years, I have grown more confident in my decision to
                choose this field. I have explored different areas of technology,
                from web development and clean interface design to backend
                systems and cybersecurity. Through that journey, I have learned
                how to work with code, Git, GitHub, and the different tools and
                stacks I have used across my projects. I am still growing, still
                learning, and still figuring out where I can become truly great.
                And I believe every skill I build, every mistake I fix, and
                every project I complete will connect in some way and help me
                become a better developer.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 md:mt-8">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#171717] bg-[#171717] px-4 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#faf9f4] transition hover:bg-[#2563eb] hover:text-white md:px-5 md:text-[11px] md:tracking-[0.2em]"
              >
                Resume
              </a>

              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("#contact");
                }}
                className="border border-[#171717] px-4 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] transition hover:bg-[#171717] hover:text-[#faf9f4] md:px-5 md:text-[11px] md:tracking-[0.2em]"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}