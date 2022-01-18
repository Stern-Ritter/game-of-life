export function checkLivingCells(field: number[][]): boolean {
  return !field.some((row) => row.some((cell) => cell === 1));
}
