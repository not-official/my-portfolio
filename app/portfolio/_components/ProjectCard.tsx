"use client";

import Image from "next/image";

import type { Project } from "../_types/portfolioTypes";

type ProjectCardProps = {
  project: Project;
  isActive: boolean;
  setActiveProject: (projectName: string | null) => void;
};

export default function ProjectCard({
  project,
  isActive,
  setActiveProject,
}: ProjectCardProps) {
  return (
    <article
      onMouseEnter={() => setActiveProject(project.name)}
      onMouseLeave={() => setActiveProject(null)}
      onFocus={() => setActiveProject(project.name)}
      onBlur={() => setActiveProject(null)}
      onTouchStart={() => setActiveProject(project.name)}
      className={[
        "grid overflow-hidden border bg-[#faf9f4]/80 backdrop-blur transition duration-300 md:grid-cols-[0.55fr_0.45fr]",
        isActive ? "border-[#2563eb]" : "border-black/20 hover:border-[#2563eb]",
      ].join(" ")}
    >
      <div className="relative min-h-[220px] border-b border-black/20 bg-black sm:min-h-[280px] md:min-h-[360px] md:border-b-0 md:border-r">
        <Image
          src={project.image}
          alt={`${project.name} screenshot`}
          fill
          className={[
            "object-cover object-left-top transition duration-700",
            isActive ? "grayscale-0" : "grayscale",
          ].join(" ")}
        />
      </div>

      <div className="p-5 sm:p-6 md:p-8">
        <div className="mb-8 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#777] md:mb-12 md:text-xs md:tracking-[0.22em]">
          <span>{project.number}</span>
          <span className="text-right">{project.type}</span>
        </div>

        <h3
          className={[
            "text-4xl font-semibold tracking-[-0.05em] transition md:text-5xl",
            isActive ? "text-[#2563eb]" : "text-[#171717]",
          ].join(" ")}
        >
          {project.name}
        </h3>

        <p className="mt-4 max-w-md text-sm leading-7 text-[#555] md:mt-5">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2 md:mt-6">
          {project.stack.map((item) => (
            <span
              key={item}
              className={[
                "border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] transition md:text-[10px] md:tracking-[0.16em]",
                isActive
                  ? "border-[#2563eb]/45 text-[#2563eb]"
                  : "border-black/20 text-[#555]",
              ].join(" ")}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-7 flex gap-4 md:mt-8 md:gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.18em] underline underline-offset-4 hover:text-[#2563eb] md:text-xs md:tracking-[0.2em]"
            >
              Live
            </a>
          )}

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.18em] underline underline-offset-4 hover:text-[#2563eb] md:text-xs md:tracking-[0.2em]"
          >
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}