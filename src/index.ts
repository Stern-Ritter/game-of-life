import { createGameOfLife } from "./createGameOfLife";
import "./index.css";

const parentElement = document.querySelector('.game') as HTMLElement;
createGameOfLife(10, 10, parentElement);
