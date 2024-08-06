import {
  CELL_SIZE,
  CLICKED_CELL_COLOR,
  DEFAULT_BACKGROUND_CONFIG,
  DEFAULT_CELL_CONFIG,
  HEIGHT,
  NO_CLICKED_CELL_COLOR,
  RADIO_CELL_SIZE,
  WIDTH,
  ZOOM_MAX_SCALE,
  ZOOM_MIN_SCALE,
} from "./data/constants";
import {
  IBackgroundConfig,
  ICell,
  ICellConfig,
  IGrid,
  IPoint,
} from "./data/type";
import React, { useCallback, useState } from "react";

interface AppContextState {
  setScale: React.Dispatch<React.SetStateAction<number>>;
  scale: number;
  generation: number;
  population: number;
  coordinates: string | null;
  center: IPoint;
  cellClickedEvent: ICell;
  setCellClickedEvent: React.Dispatch<React.SetStateAction<ICell>>;
  setCenter: React.Dispatch<React.SetStateAction<IPoint>>;
  handleClickedEvent: (index: number, x: number, y: number) => void;
  selectedCell: string | null;
  unsetCell: () => void;
  Grid: IGrid;
  zoomIn: () => void;
  zoomOut: () => void;
  zoom: (factor: number) => void;
  onRunInteration: () => void;
  onPauseIteration: () => void;
  onNextStepIteration: () => void;
  onResetInitialGrid: () => void;
  onIncreaseDecreaseGridSize: (size: number) => void;
  runIteration: () => void;
  makeCellsGrid: () => void;
  makeEmpltyBoard: () => void;
  defaultCellConfig: ICellConfig;
  backgorundConfig: IBackgroundConfig;
  isRunningGame: boolean | null;
  setIsRunningGame: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = React.createContext<AppContextState>({} as AppContextState);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [grid, setGrid] = useState<IGrid>({
    cells: [],
    board: [],
    boardRef: null,
    timeoutHandler: null,
    defaultCellConfig: DEFAULT_CELL_CONFIG,
    backgroundConfig: DEFAULT_BACKGROUND_CONFIG,
    cellConfig: {},
  });
  const [scale, setScale] = useState<number>(1);
  const [generation, setGeneration] = useState<number>(0);
  const [population, setPopulation] = useState<number>(0);
  const [width, setWidth] = useState<number>(WIDTH);
  const [height, setHeight] = useState<number>(HEIGHT);

  const [coordinates, setCoordinates] = useState<string | null>("");
  const [isRunningGame, setIsRunningGame] = useState<boolean>(false);
  const [center, setCenter] = useState<IPoint>({ x: 500, y: 300 });
  const [cellClickedEvent, setCellClickedEvent] = useState<ICell>({
    x: 0,
    y: 0,
    color: "",
    backgroundColor: "",
  });
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const { defaultCellConfig, backgroundConfig } = grid;
  const [timeoutHandler, settimeoutHandler] = useState<number | null>(null);
  const [initialGrid, setInitialGrid] = useState<ICell[][]>(() => []);
  const [initialGridWasSeted, setInitialGridWasSeted] =
    useState<boolean>(false);

  const unsetCell = useCallback(() => {
    setSelectedCell(null);
  }, [setSelectedCell]);

  const makeEmptyBoard = useCallback(() => {
    makeGridCells();
  }, [grid]);

  const makeNewEmptyBoardForInteration = () => {
    let boardCells: ICell[][] = [];
    for (let y = 0; y < height / CELL_SIZE; y++) {
      boardCells[y] = [];
      for (let x = 0; x < width / CELL_SIZE; x++) {
        const cell: ICell = {
          x,
          y,
          backgroundColor: "",
          color: "#ccc",
        };
        cell.x = x;
        cell.y = y;
        boardCells[y][x] = cell;
      }
    }
    return boardCells;
  };

  const makeGridCells = () => {
    let boardCells: ICell[][] = [];
    for (let y = 0; y < height / CELL_SIZE; y++) {
      boardCells[y] = [];
      for (let x = 0; x < width / CELL_SIZE; x++) {
        const cell: ICell = {
          x,
          y,
          backgroundColor: "",
          color: "#ccc",
        };
        cell.x = x;
        cell.y = y;
        boardCells[y][x] = cell;
      }
    }
    calculateCoordinates(boardCells);
    setGrid((prev) => ({
      ...prev,
      cells: boardCells,
    }));
  };

  const zoomIn = useCallback(() => {
    setScale((prev) =>
      Number(
        Math.min(
          ZOOM_MAX_SCALE,
          Math.max(ZOOM_MIN_SCALE, prev + 0.1)
        ).toPrecision(2)
      )
    );
  }, [setScale]);

  const zoomOut = useCallback(() => {
    setScale((prev) =>
      Number(
        Math.min(
          ZOOM_MAX_SCALE,
          Math.max(ZOOM_MIN_SCALE, prev - 0.1)
        ).toPrecision(2)
      )
    );
  }, [scale]);

  const zoom = useCallback(
    (factor: number) => {
      if (Number.isNaN(factor)) return;
      setScale((prev) =>
        Number(
          Math.min(
            ZOOM_MAX_SCALE,
            Math.max(ZOOM_MIN_SCALE, prev * factor)
          ).toPrecision(2)
        )
      );
    },
    [setScale]
  );

  const onRunIteration = useCallback(() => {
    setIsRunningGame(true);
    runIteration();
  }, [grid]);

  const onNextStepIteration = useCallback(() => {
    setIsRunningGame(false);
    runIteration();
  }, [grid]);

  const onPauseIteration = useCallback(() => {
    setIsRunningGame(false);
    if (timeoutHandler) {
      window.clearTimeout(timeoutHandler);
      settimeoutHandler(null);
    }
  }, [grid]);

  const onResetInitialGrid = useCallback(() => {
    setGrid((prev) => ({
      ...prev,
      cells: initialGrid,
    }));
  }, [grid]);

  const onIncreaseDecreaseGridSize = useCallback((size: number) => {
    setWidth(size);
    setHeight(size);

    let boardCells: ICell[][] = [];
    for (let y = 0; y < size / CELL_SIZE; y++) {
      boardCells[y] = [];
      for (let x = 0; x < size / CELL_SIZE; x++) {
        const cell: ICell = {
          x,
          y,
          backgroundColor: "",
          color: "#ccc",
        };
        cell.x = x;
        cell.y = y;
        boardCells[y][x] = cell;
      }
    }
    setGrid((prev) => ({
      ...prev,
      cells: boardCells,
    }));
  }, []);

  const countPopulation = () => {
    setPopulation(0);
    for (let y = 0; y < height / CELL_SIZE; y++) {
      for (let x = 0; x < width / CELL_SIZE; x++) {
        if (grid.cells[y][x].color === CLICKED_CELL_COLOR) {
          setPopulation((prev) => ++prev);
        }
      }
    }
  };

  const runIteration = () => {
    if (!initialGridWasSeted) {
      setInitialGrid(grid.cells);
      setInitialGridWasSeted(true);
    }

    let newBoard = makeNewEmptyBoardForInteration();
    for (let y = 0; y < height / CELL_SIZE; y++) {
      for (let x = 0; x < width / CELL_SIZE; x++) {
        let neighbors = calculateNeighbors(grid.cells, x, y);
        if (grid.cells[y][x].color === CLICKED_CELL_COLOR) {
          if (neighbors === 2 || neighbors === 3) {
            newBoard[y][x].color = CLICKED_CELL_COLOR;
          } else {
            newBoard[y][x].color = NO_CLICKED_CELL_COLOR;
          }
        } else {
          if (
            grid.cells[y][x].color === NO_CLICKED_CELL_COLOR &&
            neighbors === 3
          ) {
            newBoard[y][x].color = CLICKED_CELL_COLOR;
          }
        }
      }
    }
    setGeneration((prev) => ++prev);

    countPopulation();

    setGrid((prev) => ({
      ...prev,
      cells: newBoard,
    }));
  };

  const calculateNeighbors = (gridBoard: ICell[][], x: number, y: number) => {
    let neighbors = 0;
    const dirs = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ];

    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      let y1 = y + dir[0];
      let x1 = x + dir[1];
      if (
        x1 >= 0 &&
        x1 < width / CELL_SIZE &&
        y1 >= 0 &&
        y1 < height / CELL_SIZE &&
        gridBoard[y1][x1].color === CLICKED_CELL_COLOR
      ) {
        neighbors++;
      }
    }
    return neighbors;
  };

  const calculateCoordinates = (grid: ICell[][]) => {
    let map_coordinates = {
      left: [{ XY: {}, cartesian: {} }],
      right: [{ XY: {}, cartesian: {} }],
      upper: [{ XY: {}, cartesian: {} }],
      down: [{ XY: {}, cartesian: {} }],
    };
    // Center
    const x_center: number = Math.floor((grid.length - 1) / 2);
    const y_center: number = Math.floor(grid.length / 2);
    const center: ICell = grid[x_center][y_center];

    // Left
    for (let index = 1; index < x_center; index++) {
      map_coordinates["left"].push({
        XY: [index, x_center],
        cartesian: [-index, 0],
      });
    }
    // Right
    for (let index = x_center; index > 1; index--) {
      map_coordinates["right"].push({
        XY: [index, x_center],
        cartesian: [index, 0],
      });
    }
    // Upper
    for (let index = 1; index < y_center; index++) {
      map_coordinates["upper"].push({
        XY: [y_center, index],
        cartesian: [0, index],
      });
    }
    // Down
    for (let index = y_center; index > 1; index--) {
      map_coordinates["down"].push({
        XY: [y_center, index],
        cartesian: [0, -index],
      });
    }
    console.log(map_coordinates);
  };
  const clickedCell = useCallback(
    (index: number, x: number, y: number) => {
      setCoordinates(`${x / RADIO_CELL_SIZE} ${y / RADIO_CELL_SIZE}`);
      setGrid((prev) => ({
        ...prev,
        cells: prev.cells.map((item, i) => {
          if (
            item[index].x === x / RADIO_CELL_SIZE &&
            item[index].y === y / RADIO_CELL_SIZE
          ) {
            if (item[index].color === NO_CLICKED_CELL_COLOR) {
              item[index].color = CLICKED_CELL_COLOR;
            } else {
              item[index].color = NO_CLICKED_CELL_COLOR;
            }
          }
          return item;
        }),
      }));
    },
    [setGrid]
  );

  return (
    <AppContext.Provider
      value={{
        Grid: grid,
        makeCellsGrid: makeGridCells,
        makeEmpltyBoard: makeEmptyBoard,
        center: center,
        selectedCell: selectedCell,
        cellClickedEvent: cellClickedEvent,
        setCellClickedEvent: setCellClickedEvent,
        handleClickedEvent: clickedCell,
        unsetCell: unsetCell,
        setCenter: setCenter,
        scale: scale,
        generation: generation,
        population: population,
        coordinates: coordinates,
        setScale: setScale,
        zoom: zoom,
        zoomIn: zoomIn,
        zoomOut: zoomOut,
        onRunInteration: onRunIteration,
        onNextStepIteration: onNextStepIteration,
        onResetInitialGrid: onResetInitialGrid,
        onIncreaseDecreaseGridSize: onIncreaseDecreaseGridSize,
        runIteration: runIteration,
        onPauseIteration: onPauseIteration,
        defaultCellConfig: defaultCellConfig,
        backgorundConfig: backgroundConfig,
        isRunningGame: isRunningGame,
        setIsRunningGame: setIsRunningGame,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
