import { checkLivingCells } from "./checkLivingCells";

const data = [
  { array: [[1]], result: false },
  { array: [[0, 0, 0], [0, 0, 0], [0, 0, 1]], result: false },
  { array: [[1, 0, 0], [0, 0, 0], [0, 0, 1]], result: false },
  { array: [], result: true },
  { array: [[]], result: true },
  { array: [[0]], result: true },
  { array: [[0, 0, 0], [0, 0, 0], [0, 0, 0]], result: true}
];

describe("Function checkLivingCells()", () => {
  it("returns correct value", () => {
    data.forEach((test) => {
      expect(checkLivingCells(test.array)).toBe(test.result);
    });
  });
});
