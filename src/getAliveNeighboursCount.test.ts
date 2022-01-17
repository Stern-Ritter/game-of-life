import { getAliveNeighboursCount } from "./getAliveNeighboursCount";

const data = [
  [0, 1, 0, 1, 0],
  [0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1],
  [0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1]
]

describe("Function getAliveNeighboursCount()", () => {
  it("returns correct values", () => {
    expect(getAliveNeighboursCount(data, 0, 0)).toBe(1);
    expect(getAliveNeighboursCount(data, 0, 1)).toBe(2);
    expect(getAliveNeighboursCount(data, 0, 2)).toBe(0);
    expect(getAliveNeighboursCount(data, 0, 3)).toBe(3);
    expect(getAliveNeighboursCount(data, 0, 4)).toBe(1);

    expect(getAliveNeighboursCount(data, 1, 0)).toBe(0);
    expect(getAliveNeighboursCount(data, 1, 1)).toBe(2);
    expect(getAliveNeighboursCount(data, 1, 2)).toBe(2);
    expect(getAliveNeighboursCount(data, 1, 3)).toBe(5);
    expect(getAliveNeighboursCount(data, 1, 4)).toBe(3);

    expect(getAliveNeighboursCount(data, 2, 0)).toBe(2);
    expect(getAliveNeighboursCount(data, 2, 1)).toBe(3);
    expect(getAliveNeighboursCount(data, 2, 2)).toBe(2);
    expect(getAliveNeighboursCount(data, 2, 3)).toBe(4);
    expect(getAliveNeighboursCount(data, 2, 4)).toBe(3);

    expect(getAliveNeighboursCount(data, 3, 0)).toBe(1);
    expect(getAliveNeighboursCount(data, 3, 1)).toBe(4);
    expect(getAliveNeighboursCount(data, 3, 2)).toBe(4);
    expect(getAliveNeighboursCount(data, 3, 3)).toBe(7);
    expect(getAliveNeighboursCount(data, 3, 4)).toBe(4);

    expect(getAliveNeighboursCount(data, 4, 0)).toBe(2);
    expect(getAliveNeighboursCount(data, 4, 1)).toBe(3);
    expect(getAliveNeighboursCount(data, 4, 2)).toBe(3);
    expect(getAliveNeighboursCount(data, 4, 3)).toBe(4);
    expect(getAliveNeighboursCount(data, 4, 4)).toBe(2);
  });
});
