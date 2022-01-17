export function drawField(parentElement: HTMLElement,
  field: number[][], clickHandler?: (x: number, y:number) => void): void {
    parentElement.innerHTML = '';
    const fieldElement = field.reduce((fieldContainer, row, y) => {
      const tr = row.reduce((trContainer, state, x) => {
        const cell = document.createElement('td');
        cell.classList.add('cell', state === 1 ? 'cell_alive' : 'cell_dead');
        cell.dataset.x = String(x);
        cell.dataset.y = String(y);
        if(clickHandler) {
          cell.addEventListener('click',
          (evt) => clickHandler(
            Number((evt.target as HTMLElement).dataset.x),
            Number((evt.target as HTMLElement).dataset.y)
          ))
        }
        trContainer.append(cell);
        return trContainer;
      }, document.createElement('tr'));
      fieldContainer.append(tr);
      return fieldContainer;
    }, document.createElement('table'));
    fieldElement.classList.add('game__field');
    parentElement.append(fieldElement);
}
