"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { skills } from "../_data/portfolioData";
import SectionHeader from "./SectionHeader";

export default function StackSection() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  return (
    <section
      id="stack"
      className="relative z-10 px-4 py-16 sm:px-6 md:px-12 md:py-20"
    >
      <div className="mx-auto max-w-6xl border-t border-black/20 pt-12 md:pt-14">
        <SectionHeader label="Stack" title="Tools" />

        <div className="relative min-h-[470px] md:min-h-[460px]">
          {skills.map((skill, index) => {
            const isActive = activeSkill === skill.name;

            return (
              <motion.div
                key={skill.name}
                onTouchStart={() => setActiveSkill(skill.name)}
                onMouseEnter={() => setActiveSkill(skill.name)}
                onMouseLeave={() => setActiveSkill(null)}
                initial={{ opacity: 0, y: 24, rotate: 0 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: Number(skill.rotate.replace("deg", "")),
                }}
                viewport={{ once: true, margin: "-80px" }}
                animate={
                  isActive
                    ? {
                        y: -12,
                        rotate:
                          Number(skill.rotate.replace("deg", "")) * 0.35,
                        scale: 1.035,
                        zIndex: 20,
                      }
                    : {
                        y: 0,
                        rotate: Number(skill.rotate.replace("deg", "")),
                        scale: 1,
                        zIndex: Number(skill.z.match(/\d+/)?.[0] ?? 1),
                      }
                }
                transition={{
                  duration: 0.45,
                  delay: index * 0.055,
                  ease: "easeOut",
                }}
                whileTap={{ scale: 0.97 }}
                className={[
                  "absolute top-0 inline-flex w-[220px] items-center justify-between border bg-[#faf9f4] px-5 py-3.5 font-mono text-base lowercase tracking-[-0.03em] shadow-[7px_9px_0_rgba(0,0,0,0.08)] transition hover:border-[#2563eb] hover:text-[#2563eb]",
                  "sm:w-[260px] sm:px-6 sm:text-lg",
                  "md:w-[315px] md:px-7 md:py-4 md:text-xl md:shadow-[8px_10px_0_rgba(0,0,0,0.08)]",
                  isActive
                    ? "border-[#2563eb] text-[#2563eb]"
                    : "border-black/70 text-[#171717]",
                  skill.x,
                  skill.y,
                  skill.z,
                ].join(" ")}
                style={{ rotate: skill.rotate }}
              >
                <span>{skill.name}</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#777] md:text-xs md:tracking-[0.2em]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}