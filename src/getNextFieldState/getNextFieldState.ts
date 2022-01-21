import { getCurrentCellState } from "../getCurrentCellState/getCurrentCellState";
import { getAliveNeighboursCount } from "../getAliveNeighboursCount/getAliveNeighboursCount";
import { getNewCellState } from "../getNewCellState/getNewCellState";

export function getNextFieldState(field: number[][]): number[][] {
  const nextStateField = field.map((arr) => arr.slice());
  field.forEach((row, y) => row.forEach((column, x) => {
    const aliveNeighboursCount = getAliveNeighboursCount(field, x, y);
    const currentState = getCurrentCellState(field, x, y);
    nextStateField[y][x] = getNewCellState(currentState, aliveNeighboursCount);
  }));
  return nextStateField;
}
