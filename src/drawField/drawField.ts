export function drawField(
  parentElement: HTMLElement,
  field: number[][],
  nextStateField: number[][],
  clickHandler?: (x: number, y: number) => void
): void {
  parentElement.innerHTML = "";
  const fieldElement = field.reduce((fieldContainer, row, y) => {
    const tr = row.reduce((trContainer, state, x) => {
      const cell = document.createElement("td");
      const nextState = nextStateField[y][x];
      let stateClass: string;
      if(state === 1 && nextState === 1) {
        stateClass = "cell_alive";
      } else if (state === 1 && nextState === 0) {
        stateClass = "cell_dying";
      }else {
        stateClass = "cell_dead";
      }
      cell.classList.add("cell", stateClass);
      cell.dataset.x = String(x);
      cell.dataset.y = String(y);
      if (clickHandler) {
        cell.addEventListener("click", (evt) =>
          clickHandler(
            Number((evt.target as HTMLElement).dataset.x),
            Number((evt.target as HTMLElement).dataset.y)
          )
        );
      }
      trContainer.append(cell);
      return trContainer;
    }, document.createElement("tr"));
    fieldContainer.append(tr);
    return fieldContainer;
  }, document.createElement("table"));
  fieldElement.classList.add("game__field");
  parentElement.append(fieldElement);
}
