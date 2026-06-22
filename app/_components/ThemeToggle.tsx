"use client";

import { FiMoon, FiSun } from "react-icons/fi";

import useThemeMode from "../_hooks/useThemeMode";

export default function ThemeToggle() {
  const { isDark, mounted, toggleTheme } = useThemeMode();

  if (!mounted) return null;

  const Icon = isDark ? FiSun : FiMoon;

  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 99999,
      }}
    >
      <button
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="group relative grid h-11 w-11 place-items-center rounded-full transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] active:translate-y-0 active:scale-95 focus:outline-none"
        style={{
          border: "0.5px solid var(--line)",
          background: "var(--card)",
          color: "var(--muted)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <span
          className="pointer-events-none absolute inset-[4px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            border: "0.5px solid var(--accent)",
            background: "color-mix(in srgb, var(--accent) 7%, transparent)",
          }}
        />

        <Icon className="relative h-[17px] w-[17px] transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:text-[var(--accent)]" />
      </button>
    </div>
  );
}