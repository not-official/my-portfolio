"use client";

import Link from "next/link";

import { navItems } from "../_data/portfolioData";

type PortfolioHeaderProps = {
  handleNavigation: (href: string) => void;
};

export default function PortfolioHeader({
  handleNavigation,
}: PortfolioHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4">
      <Link
        href="/portfolio"
        rel="noopener noreferrer"
        className="group relative font-mono text-[10px] font-semibold uppercase leading-[1.9] tracking-[0.24em] sm:text-[11px] sm:tracking-[0.28em] md:text-[12px] md:leading-[2.05] md:tracking-[0.32em]"
      >
        <span className="block">Aman CK</span>
        <span className="block text-[#6f6f6f]">Portfolio Page</span>
        <span className="block text-[#6f6f6f]">Computer Engineering</span>
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

      <nav className="grid grid-cols-2 gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] md:hidden">
        {navItems.map(([label, href], index) => (
          <a
            key={label}
            href={href}
            onClick={(event) => {
              event.preventDefault();
              handleNavigation(href);
            }}
            className="border border-black/20 bg-[#faf9f4]/70 px-2.5 py-2 text-center text-[#777] backdrop-blur transition hover:border-[#2563eb] hover:text-[#2563eb]"
          >
            0{index + 1}
          </a>
        ))}
      </nav>
    </header>
  );
}