import { drawField } from "./drawField";
import { getNextFieldState } from "./getNextFieldState";
import { checkLivingCells } from "./checkLivingCells";
import { checkPeriodicConfiguration } from "./checkPeriodicConfiguration";

export function createGameOfLife(sizeX: number, sizeY: number, parentElement: HTMLElement): void {
  let timer: number;
  let checkFieldConfiguration: (field: number[][]) => boolean;
  let isRunning = false;

  const fieldContainer = document.createElement('div');
  const button = document.createElement('button');
  const speedInput = document.createElement('input') as HTMLInputElement;
  const speedInputDescription = document.createElement('span') as HTMLSpanElement;

  let field = Array.from(Array(sizeY), () => Array(sizeX).fill(0));

  function clickHandler(x: number, y: number): void {
    field[y][x] = field[y][x] === 1 ? 0 : 1;
    drawField(fieldContainer, field, clickHandler);
  }

  function stop(): void {
    clearInterval(timer);
    isRunning = false;
    button.textContent = 'Start';
  }

  function setGameSpeed(speed: string) {
    clearInterval(timer);
    timer = window.setInterval(() => {
      field = getNextFieldState(field);
      if(checkLivingCells(field) || checkFieldConfiguration(field)) stop();
      drawField(fieldContainer, field, clickHandler);
    }, Number(speed));
  }

  function start(): void {
    isRunning = true;
    button.textContent = 'Stop';
    checkFieldConfiguration = checkPeriodicConfiguration();
    checkFieldConfiguration(field);
    setGameSpeed(speedInput.value);
  }

  fieldContainer.classList.add('game__container');
  button.classList.add('game__button');
  button.textContent = 'Start';

  speedInput.classList.add('game__input_speed');
  speedInput.type = "range";
  speedInput.min = "500";
  speedInput.max = "3000";
  speedInput.value = "1000";
  speedInput.step = "500";
  speedInputDescription.textContent =
    `Speed: ${(1000 / Number(speedInput.value)).toFixed(2)} generation/sec`;

  button.addEventListener('click', () => isRunning ? stop() : start());
  speedInput.addEventListener('change', () => {
    if(isRunning) { setGameSpeed(speedInput.value) }
    speedInputDescription.textContent =
    `Speed: ${(1000 / Number(speedInput.value)).toFixed(2)} generation/sec`;
  });

  drawField(fieldContainer, field, clickHandler);
  parentElement.append(fieldContainer, speedInput, speedInputDescription, button);
}
