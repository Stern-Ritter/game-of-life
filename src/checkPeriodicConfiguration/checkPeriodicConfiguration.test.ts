import { checkPeriodicConfiguration } from "./checkPeriodicConfiguration";

const sequentiallyStates = [
  { field: [[1, 0, 0],[1, 1, 1], [0, 0, 1]], result: false },
  { field: [[1, 0, 0],[0, 1, 1], [0, 0, 1]], result: false },
  { field: [[1, 0, 0],[0, 0, 1], [0, 0, 1]], result: false },
  { field: [[1, 0, 0],[0, 0, 0], [0, 0, 1]], result: false },
  { field: [[1, 0, 0],[0, 0, 0], [0, 0, 1]], result: true }
];

const inconsistentlyStates = [
  { field: [[1, 0, 0],[1, 1, 1], [0, 0, 1]], result: false },
  { field: [[1, 0, 0],[0, 1, 1], [0, 0, 1]], result: false },
  { field: [[1, 0, 0],[0, 0, 1], [0, 0, 1]], result: false },
  { field: [[1, 0, 0],[0, 0, 0], [0, 0, 1]], result: false },
  { field: [[1, 0, 0],[1, 1, 1], [0, 0, 1]], result: true }
];

let checkFieldConfiguration: (field: number[][]) => boolean;

describe("Function checkPeriodicConfiguration()", () => {
  beforeEach(() => {
    checkFieldConfiguration = checkPeriodicConfiguration();
  });
  it("returns correct value with sequentially repeated state", () => {
    sequentiallyStates.forEach((test) => {
      expect(checkFieldConfiguration(test.field)).toBe(test.result);
    });
  });
  it("returns correct value with inconsistently repeated state", () => {
    inconsistentlyStates.forEach((test) => {
      expect(checkFieldConfiguration(test.field)).toBe(test.result);
    });
  });
});
