import { createGameOfLife } from "./createGameOfLife";
import * as module from "../drawField/drawField";

jest.useFakeTimers();

let parentElement: HTMLElement;
const mockDrawField = jest.spyOn(module, "drawField");

function onCellClick(x: number, y: number): void {
  const cell = parentElement.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`) as HTMLElement;
  cell.dispatchEvent(new Event('click'));
}

function getCellState(x: number, y: number): number {
  const cell = parentElement.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`) as HTMLElement;
  return (cell.classList.contains('cell_alive') || cell.classList.contains('cell_dying')) ? 1 : 0;
}

describe("Function createGameOfLife", () => {
  beforeEach(() => {
    parentElement = document.createElement('div');
  });

  it("creates field, 'Start' and 'Clear' buttons", () => {
    const sizeX = 10;
    const sizeY = 10;
    createGameOfLife(10, 10, parentElement);
    const startButton = parentElement.querySelector('.game__start-btn') as HTMLButtonElement;
    const clearButton = parentElement.querySelector('.game__clear-btn') as HTMLButtonElement;
    const field = parentElement.querySelector('.game__field') as HTMLElement;
    const cells = parentElement.querySelectorAll('.cell') as NodeList;

    expect(startButton).not.toBeNull();
    expect(startButton.textContent).toBe('Start');
    expect(clearButton).not.toBeNull();
    expect(clearButton.textContent).toBe('Clear');
    expect(field).not.toBeNull();
    expect(cells).toHaveLength(sizeX * sizeY);
  });

  it("toggle button text on click event", () => {
    createGameOfLife(10, 10, parentElement);
    const startButton = parentElement.querySelector('.game__start-btn') as HTMLButtonElement;
    expect(startButton.textContent).toBe('Start');
    startButton.dispatchEvent(new Event('click'));
    expect(startButton.textContent).toBe('Stop');
    startButton.dispatchEvent(new Event('click'));
    expect(startButton.textContent).toBe('Start');
    startButton.dispatchEvent(new Event('click'));
    startButton.dispatchEvent(new Event('click'));
    expect(startButton.textContent).toBe('Start');
  });

  it('redraws field markup with each click on the cell', async() => {
    const sizeX = 3;
    const sizeY = 3;
    createGameOfLife(sizeX, sizeY, parentElement);
    const field = parentElement.querySelectorAll('.game__field') as NodeList;
    let aliveCells = parentElement.querySelectorAll('.cell_alive') as NodeList;
    let dyingCells = parentElement.querySelectorAll('.cell_dying') as NodeList;
    let deadCells = parentElement.querySelectorAll('.cell_dead') as NodeList;

    expect(field).toHaveLength(1);
    expect(aliveCells).toHaveLength(0);
    expect(dyingCells).toHaveLength(0);
    expect(deadCells).toHaveLength(sizeX * sizeY);
    expect(mockDrawField).toHaveBeenCalledTimes(1);

    onCellClick(0, 0);
    expect(getCellState(0, 0)).toBe(1);
    aliveCells = parentElement.querySelectorAll('.cell_alive') as NodeList;
    dyingCells = parentElement.querySelectorAll('.cell_dying') as NodeList;
    deadCells = parentElement.querySelectorAll('.cell_dead') as NodeList;
    expect(aliveCells).toHaveLength(1);
    expect(dyingCells).toHaveLength(0);
    expect(deadCells).toHaveLength(sizeX * sizeY - 1);
    expect(mockDrawField).toHaveBeenCalledTimes(2);


    onCellClick(2, 1);
    expect(getCellState(2, 1)).toBe(1);
    aliveCells = parentElement.querySelectorAll('.cell_alive') as NodeList;
    dyingCells = parentElement.querySelectorAll('.cell_dying') as NodeList;
    deadCells = parentElement.querySelectorAll('.cell_dead') as NodeList;
    expect(aliveCells).toHaveLength(2);
    expect(dyingCells).toHaveLength(0);
    expect(deadCells).toHaveLength(sizeX * sizeY - 2);
    expect(mockDrawField).toHaveBeenCalledTimes(3);

    onCellClick(1, 2);
    expect(getCellState(1, 2)).toBe(1);
    aliveCells = parentElement.querySelectorAll('.cell_alive') as NodeList;
    dyingCells = parentElement.querySelectorAll('.cell_dying') as NodeList;
    deadCells = parentElement.querySelectorAll('.cell_dead') as NodeList;
    expect(aliveCells).toHaveLength(3);
    expect(dyingCells).toHaveLength(0);
    expect(deadCells).toHaveLength(sizeX * sizeY - 3);
    expect(mockDrawField).toHaveBeenCalledTimes(4);

    onCellClick(0, 0);
    onCellClick(2, 1);
    expect(getCellState(0, 0)).toBe(0);
    expect(getCellState(2, 1)).toBe(0);
    expect(getCellState(1, 2)).toBe(1);
    aliveCells = parentElement.querySelectorAll('.cell_alive') as NodeList;
    dyingCells = parentElement.querySelectorAll('.cell_dying') as NodeList;
    deadCells = parentElement.querySelectorAll('.cell_dead') as NodeList;
    expect(aliveCells).toHaveLength(1);
    expect(dyingCells).toHaveLength(0);
    expect(deadCells).toHaveLength(sizeX * sizeY - 1);
    expect(mockDrawField).toHaveBeenCalledTimes(6);
  });

  it(`redraws field markup whith specified interval when started
  and stops redrawing when stopped`, async () => {
    const sizeX = 3;
    const sizeY = 3;
    createGameOfLife(sizeX, sizeY, parentElement);
    const startButton = parentElement.querySelector('.game__start-btn') as HTMLButtonElement;

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
    let dyingCells = parentElement.querySelectorAll('.cell_dying') as NodeList;
    let deadCells = parentElement.querySelectorAll('.cell_dead') as NodeList;
    expect(aliveCells).toHaveLength(4);
    expect(dyingCells).toHaveLength(0);
    expect(deadCells).toHaveLength(sizeX * sizeY - 4);
    expect(getCellState(0, 1)).toBe(1);
    expect(getCellState(1, 0)).toBe(1);
    expect(getCellState(1, 2)).toBe(1);
    expect(getCellState(2, 2)).toBe(1);
    expect(mockDrawField).toHaveBeenCalledTimes(5);

    startButton.dispatchEvent(new Event('click'));
    jest.advanceTimersByTime(1000);
    jest.advanceTimersByTime(500);
    /*
      [0, 0, 0],
      [1, 0, 1],
      [0, 1, 0]
    */
    aliveCells = parentElement.querySelectorAll('.cell_alive') as NodeList;
    dyingCells = parentElement.querySelectorAll('.cell_dying') as NodeList;
    deadCells = parentElement.querySelectorAll('.cell_dead') as NodeList;
    expect(aliveCells).toHaveLength(1);
    expect(dyingCells).toHaveLength(2);
    expect(deadCells).toHaveLength(sizeX * sizeY - 3);
    expect(getCellState(0, 1)).toBe(1);
    expect(getCellState(1, 2)).toBe(1);
    expect(getCellState(2, 1)).toBe(1);
    expect(mockDrawField).toHaveBeenCalledTimes(7);

    jest.advanceTimersByTime(500);
    jest.advanceTimersByTime(500);
    /*
      [0, 0, 0],
      [0, 1, 0],
      [0, 1, 0]
    */
    aliveCells = parentElement.querySelectorAll('.cell_alive') as NodeList;
    dyingCells = parentElement.querySelectorAll('.cell_dying') as NodeList;
    deadCells = parentElement.querySelectorAll('.cell_dead') as NodeList;
    expect(aliveCells).toHaveLength(0);
    expect(dyingCells).toHaveLength(2);
    expect(deadCells).toHaveLength(sizeX * sizeY - 2);
    expect(getCellState(1, 1)).toBe(1);
    expect(getCellState(1, 2)).toBe(1);
    expect(mockDrawField).toHaveBeenCalledTimes(9);

    jest.advanceTimersByTime(500);
    jest.advanceTimersByTime(500);
    /*
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    */
    aliveCells = parentElement.querySelectorAll('.cell_alive') as NodeList;
    dyingCells = parentElement.querySelectorAll('.cell_dying') as NodeList;
    deadCells = parentElement.querySelectorAll('.cell_dead') as NodeList;
    expect(aliveCells).toHaveLength(0);
    expect(dyingCells).toHaveLength(0);
    expect(deadCells).toHaveLength(sizeX * sizeY);
    expect(mockDrawField).toHaveBeenCalledTimes(11);

    jest.runAllTimers();
    expect(mockDrawField).toHaveBeenCalledTimes(11);
    expect(startButton.textContent).toBe('Start');
  });
});
