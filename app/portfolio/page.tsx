"use client";

import { useEffect } from "react";

import ThemeToggle from "../_components/ThemeToggle";
import AboutSection from "./_components/AboutSection";
import ContactSection from "./_components/ContactSection";
import PortfolioHeader from "./_components/PortfolioHeader";
import PortfolioHero from "./_components/PortfolioHero";
import StackSection from "./_components/StackSection";
import WorkSection from "./_components/WorkSection";

import { phrases, RESUME_URL } from "./_data/portfolioData";
import useTypewriterSound from "./_hooks/useTypewriterSound";

export default function PortfolioPage() {
  const {
    activeLetter,
    activePhrase,
    typedText,
    soundEnabled,
    typingRun,
    selectLetter,
    toggleSound,
  } = useTypewriterSound(phrases);

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
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();

      if (phrases[key]) {
        selectLetter(key);
        return;
      }

      if (event.key === "1") {
        scrollToSection("#work");
      }

      if (event.key === "2") {
        scrollToSection("#about");
      }

      if (event.key === "3") {
        window.open(RESUME_URL, "_blank", "noopener,noreferrer");
      }

      if (event.key === "4") {
        scrollToSection("#contact");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLetter, selectLetter]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--paper)] text-[var(--ink)] transition-colors duration-300">
      <ThemeToggle />

      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute inset-0 bg-[linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] bg-[size:52px_52px] md:bg-[size:76px_76px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,var(--grid-dot)_1.2px,transparent_2px)] bg-[size:52px_52px] md:bg-[size:76px_76px]" />
      </div>

      <section className="relative z-10 min-h-screen px-4 py-5 sm:px-6 sm:py-6 md:px-12 md:py-7">
        <PortfolioHeader handleNavigation={handleNavigation} />

        <PortfolioHero
          activeLetter={activeLetter}
          activePhrase={activePhrase}
          typedText={typedText}
          soundEnabled={soundEnabled}
          typingRun={typingRun}
          selectLetter={selectLetter}
          toggleSound={toggleSound}
          scrollToSection={scrollToSection}
        />
      </section>

      <WorkSection />

      <AboutSection scrollToSection={scrollToSection} />

      <StackSection />

      <ContactSection />
    </main>
  );
}