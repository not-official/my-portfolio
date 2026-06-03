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
              "min-w-[86px] border px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] transition sm:min-w-[96px] sm:px-4 sm:text-[10px] sm:tracking-[0.16em]",
              isActive
                ? "border-[#171717] bg-[#171717] text-[#faf9f4]"
                : "border-black/20 bg-[#faf9f4]/80 text-[#777] hover:border-[#2563eb] hover:text-[#2563eb]",
            ].join(" ")}
          >
            {puzzle.name}
          </button>
        );
      })}
    </div>
  );
}