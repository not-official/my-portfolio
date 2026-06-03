"use client";

import { useState } from "react";

import { projects } from "../_data/portfolioData";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./SectionHeader";

export default function WorkSection() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  return (
    <section
      id="work"
      className="relative z-10 px-4 py-16 sm:px-6 md:px-12 md:py-20"
    >
      <div className="mx-auto max-w-6xl border-t border-black/20 pt-12 md:pt-14">
        <SectionHeader label="Work" title="Featured projects" />

        <div className="grid gap-6 md:gap-7">
          {projects.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              isActive={activeProject === project.name}
              setActiveProject={setActiveProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
}