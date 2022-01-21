import { getCurrentCellState } from "../getCurrentCellState/getCurrentCellState";

export function getAliveNeighboursCount(field: number[][], x: number, y: number) : number {
  let count = 0;
  for(let row = y - 1; row <= y + 1; row += 1){
    for(let column = x - 1; column <= x + 1; column += 1) {
      count += getCurrentCellState(field, column, row);
    }
  }
  return count - getCurrentCellState(field, x, y);
}
