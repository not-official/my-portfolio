"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const GRID_SIZE = 3;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;
const EMPTY_TILE = TILE_COUNT - 1;

const PUZZLES = [
  {
    name: "Gate X",
    imageUrl: "/puzzles/ben10.jpg",
  },
  {
    name: "Gate Y",
    imageUrl: "/puzzles/spiderman.jpg",
  },
  {
    name: "Gate Z",
    imageUrl: "/puzzles/harrypotter.jpg",
  },
];

const PHRASES = ["Solve.", "Unlock.", "Enter."];

type Tile = number;

function getSolvedTiles(): Tile[] {
  return Array.from({ length: TILE_COUNT }, (_, index) => index);
}

function getRow(index: number) {
  return Math.floor(index / GRID_SIZE);
}

function getCol(index: number) {
  return index % GRID_SIZE;
}

function canMove(tileIndex: number, emptyIndex: number) {
  const tileRow = getRow(tileIndex);
  const tileCol = getCol(tileIndex);
  const emptyRow = getRow(emptyIndex);
  const emptyCol = getCol(emptyIndex);

  return Math.abs(tileRow - emptyRow) + Math.abs(tileCol - emptyCol) === 1;
}

function isSolved(tiles: Tile[]) {
  return tiles.every((tile, index) => tile === index);
}

function shuffleTiles() {
  const tiles = getSolvedTiles();

  let emptyIndex = EMPTY_TILE;
  let lastEmptyIndex = -1;

  for (let i = 0; i < 160; i++) {
    const possibleMoves = tiles
      .map((tile, index) => ({ tile, index }))
      .filter(({ index }) => {
        return canMove(index, emptyIndex) && index !== lastEmptyIndex;
      });

    const selectedMove =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    lastEmptyIndex = emptyIndex;

    [tiles[emptyIndex], tiles[selectedMove.index]] = [
      tiles[selectedMove.index],
      tiles[emptyIndex],
    ];

    emptyIndex = selectedMove.index;
  }

  if (isSolved(tiles)) {
    return shuffleTiles();
  }

  return tiles;
}

export default function PuzzleGate() {
  const [mounted, setMounted] = useState(false);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [selectedPuzzleIndex, setSelectedPuzzleIndex] = useState(0);

  const selectedPuzzle = PUZZLES[selectedPuzzleIndex];

  useEffect(() => {
    setMounted(true);
    setTiles(shuffleTiles());
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPhraseIndex((currentIndex) => (currentIndex + 1) % PHRASES.length);
    }, 1500);

    return () => window.clearInterval(interval);
  }, []);

  const emptyIndex = useMemo(() => tiles.indexOf(EMPTY_TILE), [tiles]);

  function handleTileClick(index: number) {
    if (isComplete || emptyIndex === -1 || !canMove(index, emptyIndex)) return;

    setTiles((currentTiles) => {
      const currentEmptyIndex = currentTiles.indexOf(EMPTY_TILE);

      if (currentEmptyIndex === -1 || !canMove(index, currentEmptyIndex)) {
        return currentTiles;
      }

      const nextTiles = [...currentTiles];

      [nextTiles[index], nextTiles[currentEmptyIndex]] = [
        nextTiles[currentEmptyIndex],
        nextTiles[index],
      ];

      if (isSolved(nextTiles)) {
        setIsComplete(true);
      }

      return nextTiles;
    });

    setMoves((currentMoves) => currentMoves + 1);
  }

  function resetPuzzle() {
    setTiles(shuffleTiles());
    setMoves(0);
    setIsComplete(false);
  }

  function choosePuzzle(index: number) {
    setSelectedPuzzleIndex(index);
    setTiles(shuffleTiles());
    setMoves(0);
    setIsComplete(false);
  }

  if (!mounted || tiles.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f4] text-[#171717]">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#777]">
          Loading
        </p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#faf9f4] text-[#171717]">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[size:52px_52px] md:bg-[size:76px_76px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.16)_1.2px,transparent_2px)] bg-[size:52px_52px] md:bg-[size:76px_76px]" />
      </div>

      <section className="relative z-10 flex min-h-screen flex-col px-4 py-5 sm:px-6 sm:py-6 md:px-12 md:py-7">
        <header className="flex items-start justify-between gap-4">
          <Link
            href="/"
            className="group relative font-mono text-[10px] font-semibold uppercase leading-[1.9] tracking-[0.24em] sm:text-[11px] sm:tracking-[0.28em] md:text-[12px] md:leading-[2.05] md:tracking-[0.32em]"
          >
            <span className="block">Aman CK</span>
            <span className="block text-[#6f6f6f]">Portfolio Gate</span>
            <span className="block text-[#6f6f6f]">3 × 3 Puzzle</span>
            <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#2563eb] transition-all duration-300 group-hover:w-full" />
          </Link>

          <div className="flex shrink-0 flex-col items-end text-right">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6f6f6f] sm:text-[11px] sm:tracking-[0.28em] md:text-[12px] md:tracking-[0.36em]">
              {isComplete ? "Open" : "Locked"}
            </span>

            {!isComplete && (
              <Link
                href="/portfolio"
                className="mt-2 max-w-[130px] font-mono text-[9px] font-semibold uppercase leading-4 tracking-[0.14em] text-[#9a9a9a] underline underline-offset-4 transition hover:text-[#2563eb] sm:max-w-none sm:text-[10px] sm:tracking-[0.18em]"
              >
                Give up & skip?
              </Link>
            )}
          </div>
        </header>

        <section className="flex flex-1 items-center justify-center py-7 text-center sm:py-9 md:py-12">
          <div className="w-full max-w-[500px]">
            <div className="mb-5 sm:mb-7 md:mb-8">
              <div className="mb-3 h-[44px] overflow-hidden sm:h-[56px] md:h-[72px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={PHRASES[phraseIndex]}
                    initial={{ opacity: 0, y: 18, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -14, filter: "blur(5px)" }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="text-[44px] font-semibold leading-none tracking-[-0.06em] text-[#171717] sm:text-5xl md:text-7xl"
                  >
                    {PHRASES[phraseIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <p className="mx-auto max-w-[260px] font-mono text-[10px] font-semibold uppercase leading-5 tracking-[0.15em] text-[#777] sm:max-w-xs sm:text-[11px] sm:tracking-[0.18em]">
                Complete a gate to continue.
              </p>
            </div>

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
                                  boxShadow:
                                    "0 12px 22px rgba(0,0,0,0.18)",
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
          </div>
        </section>
      </section>
    </main>
  );
}