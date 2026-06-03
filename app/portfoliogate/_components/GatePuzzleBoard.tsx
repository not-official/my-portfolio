"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { EMPTY_TILE, GRID_SIZE } from "../_data/gateData";
import type { PuzzleOption, Tile } from "../_types/gateTypes";
import { canMove, getCol, getRow } from "../_utils/puzzleUtils";

type GatePuzzleBoardProps = {
  tiles: Tile[];
  moves: number;
  isComplete: boolean;
  emptyIndex: number;
  selectedPuzzle: PuzzleOption;
  handleTileClick: (index: number) => void;
  resetPuzzle: () => void;
};

export default function GatePuzzleBoard({
  tiles,
  moves,
  isComplete,
  emptyIndex,
  selectedPuzzle,
  handleTileClick,
  resetPuzzle,
}: GatePuzzleBoardProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-[min(100%,420px)] sm:max-w-[460px] md:max-w-[500px]"
      >
        <div className="absolute -left-2 -top-2 z-0 h-full w-full border border-black/20 bg-[#ece7dc] sm:-left-3 sm:-top-3" />

        <div className="relative z-10 border border-black/25 bg-[#faf9f4]/85 p-2 backdrop-blur sm:p-3">
          <div className="mb-2 flex items-center justify-between border-b border-black/15 pb-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#777] sm:mb-3 sm:pb-3 sm:text-[10px] sm:tracking-[0.16em]">
            <button
              onClick={resetPuzzle}
              className="transition hover:text-[#2563eb]"
            >
              Shuffle
            </button>

            <span>{moves} Moves</span>
          </div>

          <div className="relative aspect-square bg-[#171717] p-1.5 sm:p-2">
            <motion.div
              initial={false}
              animate={
                isComplete
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.985 }
              }
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="absolute inset-1.5 bg-cover bg-center sm:inset-2"
              style={{
                backgroundImage: `url(${selectedPuzzle.imageUrl})`,
              }}
            />

            <motion.div
              initial={false}
              animate={
                isComplete
                  ? {
                      opacity: 0,
                      scale: 1.018,
                      pointerEvents: "none",
                    }
                  : {
                      opacity: 1,
                      scale: 1,
                      pointerEvents: "auto",
                    }
              }
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="absolute inset-1.5 overflow-hidden sm:inset-2"
            >
              {tiles.map((tile, index) => {
                const isEmpty = tile === EMPTY_TILE;

                const currentRow = getRow(index);
                const currentCol = getCol(index);
                const originalRow = getRow(tile);
                const originalCol = getCol(tile);

                const isMovable =
                  canMove(index, emptyIndex) && !isEmpty && !isComplete;

                if (isEmpty) {
                  return null;
                }

                return (
                  <motion.button
                    key={tile}
                    onClick={() => handleTileClick(index)}
                    disabled={!isMovable}
                    initial={false}
                    animate={{
                      x: `${currentCol * 100}%`,
                      y: `${currentRow * 100}%`,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 32,
                      mass: 0.85,
                    }}
                    whileHover={
                      isMovable
                        ? {
                            scale: 1.015,
                            boxShadow: "0 12px 22px rgba(0,0,0,0.18)",
                          }
                        : {}
                    }
                    whileTap={isMovable ? { scale: 0.985 } : {}}
                    className={[
                      "absolute left-0 top-0 h-1/3 w-1/3 p-[3px] outline-none",
                      "will-change-transform transform-gpu",
                      isMovable ? "cursor-pointer" : "cursor-default",
                    ].join(" ")}
                    aria-label={`Puzzle tile ${tile + 1}`}
                  >
                    <div
                      className={[
                        "relative h-full w-full overflow-hidden border bg-[#171717] transition",
                        isMovable
                          ? "border-black/25 hover:border-[#2563eb]"
                          : "border-black/20",
                      ].join(" ")}
                    >
                      <div
                        className="absolute inset-0 bg-cover"
                        style={{
                          backgroundImage: `url(${selectedPuzzle.imageUrl})`,
                          backgroundSize: `${GRID_SIZE * 100}% ${
                            GRID_SIZE * 100
                          }%`,
                          backgroundPosition: `${originalCol * 50}% ${
                            originalRow * 50
                          }%`,
                        }}
                      />

                      <span className="pointer-events-none absolute left-1.5 top-1.5 font-mono text-[9px] font-semibold leading-none text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)] sm:left-2 sm:top-2 sm:text-[10px] md:text-[11px]">
                        {tile + 1}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35 }}
            className="mt-6 text-center sm:mt-8"
          >
            <Link
              href="/portfolio"
              className="inline-flex border border-[#171717] bg-[#171717] px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#faf9f4] transition hover:bg-[#2563eb] hover:text-white sm:px-6 sm:text-[11px] sm:tracking-[0.22em]"
            >
              Enter Portfolio
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}