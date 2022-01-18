export function getNewCellState(currentState: number, aliveNeighboursCount: number): number {
  let newState = currentState;
  if(currentState === 0 && aliveNeighboursCount === 3)  {
    newState = 1;
  }
  if(currentState === 1 && (aliveNeighboursCount < 2 || aliveNeighboursCount > 3)) {
    newState = 0;
  }
  return newState;
}
