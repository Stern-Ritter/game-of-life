import { getNextFieldState } from "./getNextFieldState";

const data = [
  [
    [1, 0, 1, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 1],
    [1, 0, 0, 1],
  ],
  [
    [1, 0, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 1, 0, 1],
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
]

describe("Function getNextFieldState()", () => {
  it("returns correct values", () => {
    data.forEach((el, idx) => {
      if(idx !== data.length - 1) {
        expect(getNextFieldState(el)).toEqual(data[idx + 1]);
      }
    });
  });
});
