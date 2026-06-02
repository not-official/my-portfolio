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
    <main className="relative min-h-screen overflow-hidden bg-[#faf9f4] text-[#171717]">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[size:76px_76px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.16)_1.5px,transparent_2px)] bg-[size:76px_76px]" />
      </div>

      <section className="relative z-10 flex min-h-screen flex-col px-6 py-7 md:px-12">
        <header className="flex items-start justify-between">
          <Link
            href="/"
            className="group relative font-mono text-[12px] font-semibold uppercase leading-[2.05] tracking-[0.32em]"
          >
            <span className="block">Aman CK</span>
            <span className="block text-[#6f6f6f]">Portfolio Gate</span>
            <span className="block text-[#6f6f6f]">3 × 3 Puzzle</span>
            <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#2563eb] transition-all duration-300 group-hover:w-full" />
          </Link>

          <div className="flex flex-col items-end">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6f6f6f] md:text-[12px] md:tracking-[0.36em]">
              {isComplete ? "Open" : "Locked"}
            </span>

            {!isComplete && (
              <Link
                href="/portfolio"
                className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9a9a9a] underline underline-offset-4 transition hover:text-[#2563eb]"
              >
                Give up and skip?
              </Link>
            )}
          </div>
        </header>

        <section className="flex flex-1 items-center justify-center py-10 text-center md:py-12">
          <div className="w-full max-w-[500px]">
            <div className="mb-8">
              <div className="mb-4 h-[56px] overflow-hidden md:h-[72px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={PHRASES[phraseIndex]}
                    initial={{ opacity: 0, y: 18, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -14, filter: "blur(5px)" }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="text-5xl font-semibold leading-none tracking-[-0.06em] text-[#171717] md:text-7xl"
                  >
                    {PHRASES[phraseIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <p className="mx-auto max-w-xs font-mono text-[11px] font-semibold uppercase leading-5 tracking-[0.18em] text-[#777]">
                Complete a gate to continue .
              </p>
            </div>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {PUZZLES.map((puzzle, index) => {
                const isActive = selectedPuzzleIndex === index;

                return (
                  <button
                    key={puzzle.name}
                    onClick={() => choosePuzzle(index)}
                    className={[
                      "border px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] transition",
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
              className="relative"
            >
              <div className="absolute -left-3 -top-3 z-0 h-full w-full border border-black/20 bg-[#ece7dc]" />

              <div className="relative z-10 border border-black/25 bg-[#faf9f4]/85 p-3 backdrop-blur">
                <div className="mb-3 flex items-center justify-between border-b border-black/15 pb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#777]">
                  <button
                    onClick={resetPuzzle}
                    className="transition hover:text-[#2563eb]"
                  >
                    Shuffle
                  </button>

                  <span>{moves} Moves</span>
                </div>

                <div className="relative aspect-square bg-[#171717] p-2">
                  <motion.div
                    initial={false}
                    animate={
                      isComplete
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.985 }
                    }
                    transition={{ duration: 0.75, ease: "easeOut" }}
                    className="absolute inset-2 bg-cover bg-center"
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
                    className="grid h-full grid-cols-3 gap-2"
                  >
                    {tiles.map((tile, index) => {
                      const isEmpty = tile === EMPTY_TILE;

                      const originalRow = getRow(tile);
                      const originalCol = getCol(tile);

                      const isMovable =
                        canMove(index, emptyIndex) && !isEmpty && !isComplete;

                      return (
                        <motion.button
                          layout
                          key={tile}
                          onClick={() => handleTileClick(index)}
                          disabled={isEmpty}
                          whileHover={
                            isMovable
                              ? {
                                  y: -3,
                                  boxShadow:
                                    "0 10px 18px rgba(0,0,0,0.18)",
                                }
                              : {}
                          }
                          whileTap={isMovable ? { scale: 0.985 } : {}}
                          transition={{
                            layout: {
                              type: "spring",
                              stiffness: 420,
                              damping: 32,
                            },
                          }}
                          className={[
                            "relative overflow-hidden border transition",
                            isEmpty
                              ? "border-black/10 bg-[#faf9f4]"
                              : "border-black/25 bg-[#171717]",
                            isMovable
                              ? "cursor-pointer hover:border-[#2563eb]"
                              : "cursor-default",
                          ].join(" ")}
                          aria-label={
                            isEmpty ? "Empty tile" : `Puzzle tile ${tile + 1}`
                          }
                        >
                          {!isEmpty && (
                            <>
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

                              <span className="pointer-events-none absolute left-2 top-2 font-mono text-[10px] font-semibold leading-none text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)] md:text-[11px]">
                                {tile + 1}
                              </span>
                            </>
                          )}
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
                  className="mt-8 text-center"
                >
                  <Link
                    href="/portfolio"
                    className="inline-flex border border-[#171717] bg-[#171717] px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#faf9f4] transition hover:bg-[#2563eb] hover:text-white"
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