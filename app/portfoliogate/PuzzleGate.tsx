"use client";

import { useEffect, useMemo, useState } from "react";

import GateHeader from "./_components/GateHeader";
import GatePuzzleBoard from "./_components/GatePuzzleBoard";
import GatePuzzlePicker from "./_components/GatePuzzlePicker";
import GateTitle from "./_components/GateTitle";

import { EMPTY_TILE, PHRASES, PUZZLES } from "./_data/gateData";
import type { Tile } from "./_types/gateTypes";
import { canMove, isSolved, shuffleTiles } from "./_utils/puzzleUtils";

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
      <main className="flex min-h-screen items-center justify-center bg-[var(--paper)] text-[var(--ink)] transition-colors duration-300">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)] transition-colors duration-300">
          Loading
        </p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--paper)] text-[var(--ink)] transition-colors duration-300">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] bg-[size:52px_52px] md:bg-[size:76px_76px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle,var(--grid-dot)_1.2px,transparent_2px)] bg-[size:52px_52px] md:bg-[size:76px_76px]" />
      </div>

      <section className="relative z-10 flex min-h-screen flex-col px-4 py-5 sm:px-6 sm:py-6 md:px-12 md:py-7">
        <GateHeader isComplete={isComplete} />

        <section className="flex flex-1 items-center justify-center py-7 text-center sm:py-9 md:py-12">
          <div className="w-full max-w-[500px]">
            <GateTitle phraseIndex={phraseIndex} />

            <GatePuzzlePicker
              selectedPuzzleIndex={selectedPuzzleIndex}
              choosePuzzle={choosePuzzle}
            />

            <GatePuzzleBoard
              tiles={tiles}
              moves={moves}
              isComplete={isComplete}
              emptyIndex={emptyIndex}
              selectedPuzzle={selectedPuzzle}
              handleTileClick={handleTileClick}
              resetPuzzle={resetPuzzle}
            />
          </div>
        </section>
      </section>
    </main>
  );
}