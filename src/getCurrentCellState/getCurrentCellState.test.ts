import { getCurrentCellState } from "./getCurrentCellState";

const data = [
[0, 1, 0, 1],
[0, 0, 0, 1],
[1, 0, 0, 1],
[1, 0, 1, 0]
];

describe("Function getCellCurrentState() ", () => {

  it("returns `1` for => ([[1]], 0, 0)", () => {
    expect(getCurrentCellState([[1]], 0, 0)).toBe(1);
  });

  it("returns correct values", () => {
    data.forEach((row, y) => row.forEach((el, x) => {
      expect(getCurrentCellState(data, x, y)).toBe(data[y][x]);
    }));
  });

  it("returns `0` for indexes out of array range", () => {
    expect(getCurrentCellState([[1]], 0, 1)).toBe(0);
    expect(getCurrentCellState([[1]], 1, 0)).toBe(0);
    expect(getCurrentCellState([[1]], 1, 1)).toBe(0);
    expect(getCurrentCellState([[1]], -1, -1)).toBe(0);
  });
});
