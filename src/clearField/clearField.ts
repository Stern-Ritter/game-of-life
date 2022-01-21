export function clearField(field: number[][]): number[][] {
  return field.map((arr) => arr.map(() => 0));
}
