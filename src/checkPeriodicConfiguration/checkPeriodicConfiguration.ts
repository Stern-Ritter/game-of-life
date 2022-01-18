export function checkPeriodicConfiguration(): (field: number[][]) => boolean {
  const cash = new Set();
  return function innerFunction(field: number[][]): boolean {
    const argument = JSON.stringify(field);
    const contains = cash.has(argument);
    if(!contains) cash.add(argument);
    return contains;
  }
}
