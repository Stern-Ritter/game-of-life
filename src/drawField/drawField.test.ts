import { drawField } from "./drawField";

let parentElement: HTMLElement;
let clickHandler: (x: number, y:number) => void;
const data = [
  { array: [[]], length: 0, alive: 0, dead: 0 },
  { array: [[1]], length: 1, alive: 1, dead: 0 },
  { array: [[0]], length: 1, alive: 0, dead: 1 },
  { array: [[0, 0], [0, 1], [0, 0]], length: 6, alive: 1, dead: 5 },
  { array: [[0, 0, 1], [1, 0, 1], [1, 1, 1]], length: 9, alive: 6, dead: 3 },
];

describe("Function drawField()", () => {

  beforeAll(() => {
    parentElement = document.createElement('div');
    clickHandler = jest.fn();
  });

  it("renders correct field", () => {
    data.forEach((test) => {
      drawField(parentElement, test.array);
      expect(parentElement.querySelectorAll('.cell')).toHaveLength(test.length);
      expect(parentElement.querySelectorAll('.cell_alive')).toHaveLength(test.alive);
      expect(parentElement.querySelectorAll('.cell_dead')).toHaveLength(test.dead);
    });
  });

  it("correct set event handler clickHandler() on click event", () => {
    drawField(parentElement, [[1, 0, 1], [1, 0, 1], [1, 0, 1]], clickHandler);
    drawField(parentElement, [[1, 0, 1], [1, 0, 1], [1, 0, 1]], clickHandler);

    let cell = parentElement.querySelector('.cell[data-x="0"][data-y="1"]') as HTMLElement;
    cell.dispatchEvent(new Event('click'));
    expect(clickHandler).toHaveBeenCalledTimes(1);
    expect(clickHandler).toHaveBeenCalledWith(0, 1);

    cell = parentElement.querySelector('.cell[data-x="2"][data-y="0"]') as HTMLElement;
    cell.dispatchEvent(new Event('click'));
    cell.dispatchEvent(new Event('click'));
    expect(clickHandler).toHaveBeenCalledTimes(3);
    expect(clickHandler).toHaveBeenCalledWith(2, 0);
  });
});
