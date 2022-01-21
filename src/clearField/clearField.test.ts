import { clearField } from "./clearField";

describe("Function clearField()", () => {
  it("return correct value", () => {
    expect(
      clearField([
        [1, 0, 1],
        [1, 1, 1],
        [0, 1, 0],
      ])
    ).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });
});
