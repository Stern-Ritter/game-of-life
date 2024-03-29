# "Игра Жизнь" на языке Typescript

![Jest coverage workflow](https://github.com/Stern-Ritter/game-of-life/actions/workflows/coverage.yml/badge.svg)
![Sanity check workflow](https://github.com/Stern-Ritter/game-of-life/actions/workflows/sanity-check.yml/badge.svg)
![Deploy workflow](https://github.com/Stern-Ritter/game-of-life/actions/workflows/deploy.yml/badge.svg)

## Описание проекта

Игра «Жизнь» (англ. Conway's Game of Life) — клеточный автомат, придуманный английским математиком Джоном Конвеем в 1970 году.

- Место действия этой игры — «вселенная» — это размеченная на клетки поверхность или плоскость — безграничная, ограниченная, или замкнутая (в пределе — бесконечная плоскость).
- Каждая клетка на этой поверхности может находиться в двух состояниях: быть «живой» (заполненной) или быть «мёртвой» (пустой). Клетка имеет восемь соседей, окружающих её.
- Распределение живых клеток в начале игры называется первым поколением. Каждое следующее поколение рассчитывается на основе предыдущего по таким правилам:
  - в пустой (мёртвой) клетке, рядом с которой ровно три живые клетки, зарождается жизнь;
  - если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить; в противном случае, если соседей меньше двух или больше трёх, клетка умирает («от одиночества» или «от перенаселённости»)
- Игра прекращается, если
  - на поле не останется ни одной «живой» клетки
  - конфигурация на очередном шаге в точности (без сдвигов и поворотов) повторит себя же на одном из более ранних шагов (складывается периодическая конфигурация)
  - при очередном шаге ни одна из клеток не меняет своего состояния (складывается стабильная конфигурация; предыдущее правило, вырожденное до одного шага назад)

## Функциональность проекта

1. реализовано приложение "Игра Жизнь" ;
2. реализовано взаимодействие с полем (клик по ячейке меняет ее состояние);
3. реализован автостоп игры, когда все клетки умерли или складывается периодическая конфигурация;
4. реализован механизм изменения скорости игры;
5. реализована подсветка клеток, которые являясь живыми должны умереть в следующем поколении.

## Использованные технологии

- TypeScript,
- HTML,
- CSS,
- Jest.

**Github-pages**

- [Ссылка на github-pages.](https://stern-ritter.github.io/game-of-life/)
