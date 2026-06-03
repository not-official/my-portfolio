import { EMPTY_TILE, GRID_SIZE, TILE_COUNT } from "../_data/gateData";
import type { Tile } from "../_types/gateTypes";

export function getSolvedTiles(): Tile[] {
  return Array.from({ length: TILE_COUNT }, (_, index) => index);
}

export function getRow(index: number) {
  return Math.floor(index / GRID_SIZE);
}

export function getCol(index: number) {
  return index % GRID_SIZE;
}

export function canMove(tileIndex: number, emptyIndex: number) {
  const tileRow = getRow(tileIndex);
  const tileCol = getCol(tileIndex);
  const emptyRow = getRow(emptyIndex);
  const emptyCol = getCol(emptyIndex);

  return Math.abs(tileRow - emptyRow) + Math.abs(tileCol - emptyCol) === 1;
}

export function isSolved(tiles: Tile[]) {
  return tiles.every((tile, index) => tile === index);
}

export function shuffleTiles() {
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