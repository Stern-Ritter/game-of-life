import { drawField } from "../drawField/drawField";
import { getNextFieldState } from "../getNextFieldState/getNextFieldState";
import { checkLivingCells } from "../checkLivingCells/checkLivingCells";
import { checkPeriodicConfiguration }
from "../checkPeriodicConfiguration/checkPeriodicConfiguration";
import { clearField } from "../clearField/clearField";

export function createGameOfLife(sizeX: number, sizeY: number, parentElement: HTMLElement): void {
  let timer: number;
  let checkFieldConfiguration: (field: number[][]) => boolean;
  let isRunning = false;
  let field = Array.from(Array(sizeY), () => Array(sizeX).fill(0));
  let nextStateField: number[][];

  const header = document.createElement('h1');
  const fieldContainer = document.createElement('div');
  const buttonHandler = document.createElement('div');
  const startButton = document.createElement('button');
  const clearButton = document.createElement('button');
  const speedInput = document.createElement('input') as HTMLInputElement;
  const speedInputDescription = document.createElement('span') as HTMLSpanElement;

  function clickHandler(x: number, y: number): void {
    field[y][x] = field[y][x] === 1 ? 0 : 1;
    drawField(fieldContainer, field, field, clickHandler);
  }

  function stop(): void {
    clearInterval(timer);
    isRunning = false;
    startButton.textContent = 'Start';
  }

  function setGameSpeed(speed: string) {
    clearInterval(timer);
    timer = window.setInterval(() => {
      field = getNextFieldState(field);
      nextStateField = getNextFieldState(field);
      if(checkLivingCells(field) || checkFieldConfiguration(field)) { stop(); }
      setTimeout(drawField, Number(speed) / 2, fieldContainer, field, nextStateField, clickHandler);
      drawField(fieldContainer, field, field, clickHandler);
    }, Number(speed));
  }

  function start(): void {
    isRunning = true;
    startButton.textContent = 'Stop';
    checkFieldConfiguration = checkPeriodicConfiguration();
    checkFieldConfiguration(field);
    setGameSpeed(speedInput.value);
  }

  header.textContent = "Game of life";
  header.classList.add('game__title');
  fieldContainer.classList.add('game__container');
  buttonHandler.classList.add("button-handler");
  startButton.classList.add('game__button', 'game__start-btn');
  clearButton.classList.add('game__button','game__clear-btn');
  startButton.type = "button";
  startButton.textContent = 'Start';
  clearButton.type = "button";
  clearButton.textContent = 'Clear';

  speedInput.classList.add('game__input_speed');
  speedInput.type = "range";
  speedInput.min = "500";
  speedInput.max = "3000";
  speedInput.value = "1000";
  speedInput.step = "500";
  speedInputDescription.textContent =
    `Speed: ${(1000 / Number(speedInput.value)).toFixed(2)} generation/sec`;

  startButton.addEventListener('click', () => isRunning ? stop() : start());
  clearButton.addEventListener('click', () => {
    field = clearField(field);
    drawField(fieldContainer, field, field, clickHandler);
  });
  speedInput.addEventListener('change', () => {
    if(isRunning) { setGameSpeed(speedInput.value) }
    speedInputDescription.textContent =
    `Speed: ${(1000 / Number(speedInput.value)).toFixed(2)} generation/sec`;
  });

  drawField(fieldContainer, field, field, clickHandler);
  buttonHandler.append(startButton, clearButton);
  parentElement.append(header, fieldContainer, buttonHandler, speedInput, speedInputDescription);
}
