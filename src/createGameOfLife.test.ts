import { createGameOfLife } from "./createGameOfLife";
import * as module from "./drawField";

jest.useFakeTimers();

let parentElement: HTMLElement;
const mockDrawField = jest.spyOn(module, "drawField");

function onCellClick(x: number, y: number): void {
  const cell = parentElement.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`) as HTMLElement;
  cell.dispatchEvent(new Event('click'));
}

function getCellState(x: number, y: number): number {
  const cell = parentElement.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`) as HTMLElement;
  return cell.classList.contains('cell_alive') ? 1 : 0;
}

beforeEach(() => {
  parentElement = document.createElement('div');
});

describe("Function createGameOfLife", () => {
  it("creates field and 'Start' button", () => {
    const sizeX = 10;
    const sizeY = 10;
    createGameOfLife(10, 10, parentElement);
    const button = parentElement.querySelector('.game__button') as HTMLButtonElement;
    const field = parentElement.querySelector('.game__field') as HTMLElement;
    const cells = parentElement.querySelectorAll('.cell') as NodeList;

    expect(button).not.toBeNull();
    expect(button.textContent).toBe('Start');
    expect(field).not.toBeNull();
    expect(cells).toHaveLength(sizeX * sizeY);
  });

  it("toggle button text on click event", () => {
    createGameOfLife(10, 10, parentElement);
    const button = parentElement.querySelector('.game__button') as HTMLButtonElement;
    expect(button.textContent).toBe('Start');
    button.dispatchEvent(new Event('click'));
    expect(button.textContent).toBe('Stop');
    button.dispatchEvent(new Event('click'));
    expect(button.textContent).toBe('Start');
    button.dispatchEvent(new Event('click'));
    button.dispatchEvent(new Event('click'));
    expect(button.textContent).toBe('Start');
  });

  it('redraws field markup with each click on the cell', async() => {
    const sizeX = 3;
    const sizeY = 3;
    createGameOfLife(sizeX, sizeY, parentElement);
    const field = parentElement.querySelectorAll('.game__field') as NodeList;
    let aliveCells = parentElement.querySelectorAll('.cell_alive') as NodeList;
    let deadCells = parentElement.querySelectorAll('.cell_dead') as NodeList;

    expect(field).toHaveLength(1);
    expect(aliveCells).toHaveLength(0);
    expect(deadCells).toHaveLength(sizeX * sizeY);
    expect(mockDrawField).toHaveBeenCalledTimes(1);

    onCellClick(0, 0);
    expect(getCellState(0, 0)).toBe(1);
    aliveCells = parentElement.querySelectorAll('.cell_alive') as NodeList;
    deadCells = parentElement.querySelectorAll('.cell_dead') as NodeList;
    expect(aliveCells).toHaveLength(1);
    expect(deadCells).toHaveLength(sizeX * sizeY - 1);
    expect(mockDrawField).toHaveBeenCalledTimes(2);


    onCellClick(2, 1);
    expect(getCellState(2, 1)).toBe(1);
    aliveCells = parentElement.querySelectorAll('.cell_alive') as NodeList;
    deadCells = parentElement.querySelectorAll('.cell_dead') as NodeList;
    expect(aliveCells).toHaveLength(2);
    expect(deadCells).toHaveLength(sizeX * sizeY - 2);
    expect(mockDrawField).toHaveBeenCalledTimes(3);

    onCellClick(1, 2);
    expect(getCellState(1, 2)).toBe(1);
    aliveCells = parentElement.querySelectorAll('.cell_alive') as NodeList;
    deadCells = parentElement.querySelectorAll('.cell_dead') as NodeList;
    expect(aliveCells).toHaveLength(3);
    expect(deadCells).toHaveLength(sizeX * sizeY - 3);
    expect(mockDrawField).toHaveBeenCalledTimes(4);

    onCellClick(0, 0);
    onCellClick(2, 1);
    expect(getCellState(0, 0)).toBe(0);
    expect(getCellState(2, 1)).toBe(0);
    expect(getCellState(1, 2)).toBe(1);
    aliveCells = parentElement.querySelectorAll('.cell_alive') as NodeList;
    deadCells = parentElement.querySelectorAll('.cell_dead') as NodeList;
    expect(aliveCells).toHaveLength(1);
    expect(deadCells).toHaveLength(sizeX * sizeY - 1);
    expect(mockDrawField).toHaveBeenCalledTimes(6);
  });

  it(`redraws field markup whith specified interval when started
  and stops redrawing when stopped`, async () => {
    const sizeX = 3;
    const sizeY = 3;
    createGameOfLife(sizeX, sizeY, parentElement);
    const button = parentElement.querySelector('.game__button') as HTMLButtonElement;

    expect(mockDrawField).toHaveBeenCalledTimes(1);
    onCellClick(0, 1);
    onCellClick(1, 0);
    onCellClick(1, 2);
    onCellClick(2, 2);

    /*
      [0, 1, 0],
      [1, 0, 0],
      [0, 1, 1]
    */
    let aliveCells = parentElement.querySelectorAll('.cell_alive') as NodeList;
    let deadCells = parentElement.querySelectorAll('.cell_dead') as NodeList;
    expect(aliveCells).toHaveLength(4);
    expect(deadCells).toHaveLength(sizeX * sizeY - 4);
    expect(getCellState(0, 1)).toBe(1);
    expect(getCellState(1, 0)).toBe(1);
    expect(getCellState(1, 2)).toBe(1);
    expect(getCellState(2, 2)).toBe(1);
    expect(mockDrawField).toHaveBeenCalledTimes(5);

    button.dispatchEvent(new Event('click'));
    jest.runOnlyPendingTimers();
    /*
      [0, 0, 0],
      [1, 0, 1],
      [0, 1, 0]
    */
    aliveCells = parentElement.querySelectorAll('.cell_alive') as NodeList;
    deadCells = parentElement.querySelectorAll('.cell_dead') as NodeList;
    expect(aliveCells).toHaveLength(3);
    expect(deadCells).toHaveLength(sizeX * sizeY - 3);
    expect(getCellState(0, 1)).toBe(1);
    expect(getCellState(1, 2)).toBe(1);
    expect(getCellState(2, 1)).toBe(1);
    expect(mockDrawField).toHaveBeenCalledTimes(6);

    jest.runOnlyPendingTimers();
    /*
      [0, 0, 0],
      [0, 1, 0],
      [0, 1, 0]
    */
    aliveCells = parentElement.querySelectorAll('.cell_alive') as NodeList;
    deadCells = parentElement.querySelectorAll('.cell_dead') as NodeList;
    expect(aliveCells).toHaveLength(2);
    expect(deadCells).toHaveLength(sizeX * sizeY - 2);
    expect(getCellState(1, 1)).toBe(1);
    expect(getCellState(1, 2)).toBe(1);
    expect(mockDrawField).toHaveBeenCalledTimes(7);

    jest.runOnlyPendingTimers();
    /*
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    */
    aliveCells = parentElement.querySelectorAll('.cell_alive') as NodeList;
    deadCells = parentElement.querySelectorAll('.cell_dead') as NodeList;
    expect(aliveCells).toHaveLength(0);
    expect(deadCells).toHaveLength(sizeX * sizeY);
    expect(mockDrawField).toHaveBeenCalledTimes(8);

    jest.runAllTimers();
    expect(mockDrawField).toHaveBeenCalledTimes(8);
    expect(button.textContent).toBe('Start');
  });
});
