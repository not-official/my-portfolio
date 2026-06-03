import type { PuzzleOption } from "../_types/gateTypes";

export const GRID_SIZE = 3;
export const TILE_COUNT = GRID_SIZE * GRID_SIZE;
export const EMPTY_TILE = TILE_COUNT - 1;

export const PUZZLES: PuzzleOption[] = [
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

export const PHRASES = ["Solve.", "Unlock.", "Enter."];