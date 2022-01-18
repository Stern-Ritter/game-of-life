export function getCurrentCellState(field: number[][], x: number, y: number): number {
  const state = field[y]?.[x];
  return state ? state : 0;
}
