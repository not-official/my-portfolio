"use client";

import { PUZZLES } from "../_data/gateData";

type GatePuzzlePickerProps = {
  selectedPuzzleIndex: number;
  choosePuzzle: (index: number) => void;
};

export default function GatePuzzlePicker({
  selectedPuzzleIndex,
  choosePuzzle,
}: GatePuzzlePickerProps) {
  return (
    <div className="mb-4 flex flex-wrap justify-center gap-2 sm:mb-6">
      {PUZZLES.map((puzzle, index) => {
        const isActive = selectedPuzzleIndex === index;

        return (
          <button
            key={puzzle.name}
            onClick={() => choosePuzzle(index)}
            className={[
              "min-w-[86px] border px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 sm:min-w-[96px] sm:px-4 sm:text-[10px] sm:tracking-[0.16em]",
              isActive
                ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                : "border-[var(--line)] bg-[var(--card)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
            ].join(" ")}
          >
            {puzzle.name}
          </button>
        );
      })}
    </div>
  );
}