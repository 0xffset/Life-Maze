"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.AppContextProvider = void 0;
var constants_1 = require("./data/constants");
var react_1 = require("react");
var AppContext = react_1["default"].createContext({});
exports.AppContextProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState({
        cells: [],
        board: [],
        boardRef: null,
        timeoutHandler: null,
        defaultCellConfig: constants_1.DEFAULT_CELL_CONFIG,
        backgroundConfig: constants_1.DEFAULT_BACKGROUND_CONFIG,
        cellConfig: {}
    }), grid = _b[0], setGrid = _b[1];
    var _c = react_1.useState(1), scale = _c[0], setScale = _c[1];
    var _d = react_1.useState(0), generation = _d[0], setGeneration = _d[1];
    var _e = react_1.useState(0), population = _e[0], setPopulation = _e[1];
    var _f = react_1.useState(""), coordinates = _f[0], setCoordinates = _f[1];
    var _g = react_1.useState(false), isRunningGame = _g[0], setIsRunningGame = _g[1];
    var _h = react_1.useState({ x: 500, y: 300 }), center = _h[0], setCenter = _h[1];
    var _j = react_1.useState({ x: 0, y: 0, color: "", backgroundColor: "" }), cellClickedEvent = _j[0], setCellClickedEvent = _j[1];
    var _k = react_1.useState(null), selectedCell = _k[0], setSelectedCell = _k[1];
    var defaultCellConfig = grid.defaultCellConfig, backgroundConfig = grid.backgroundConfig;
    var _l = react_1.useState(null), timeoutHandler = _l[0], settimeoutHandler = _l[1];
    var _m = react_1.useState(function () { return []; }), initialGrid = _m[0], setInitialGrid = _m[1];
    var _o = react_1.useState(false), initialGridWasSeted = _o[0], setInitialGridWasSeted = _o[1];
    var unsetCell = react_1.useCallback(function () {
        setSelectedCell(null);
    }, [setSelectedCell]);
    var makeEmptyBoard = react_1.useCallback(function () {
        makeGridCells();
    }, [grid]);
    var makeNewEmptyBoardForInteration = function () {
        var boardCells = [];
        for (var y = 0; y < (constants_1.HEIGHT / constants_1.CELL_SIZE); y++) {
            boardCells[y] = [];
            for (var x = 0; x < (constants_1.WIDTH / constants_1.CELL_SIZE); x++) {
                var cell = {
                    x: x,
                    y: y,
                    backgroundColor: "",
                    color: "#ccc"
                };
                cell.x = x;
                cell.y = y;
                boardCells[y][x] = cell;
            }
        }
        return boardCells;
    };
    var makeGridCells = function () {
        var boardCells = [];
        for (var y = 0; y < (constants_1.HEIGHT / constants_1.CELL_SIZE); y++) {
            boardCells[y] = [];
            for (var x = 0; x < (constants_1.WIDTH / constants_1.CELL_SIZE); x++) {
                var cell = {
                    x: x,
                    y: y,
                    backgroundColor: "",
                    color: "#ccc"
                };
                cell.x = x;
                cell.y = y;
                boardCells[y][x] = cell;
            }
        }
        setGrid(function (prev) { return (__assign(__assign({}, prev), { cells: boardCells })); });
    };
    var zoomIn = react_1.useCallback(function () {
        setScale(function (prev) {
            return Number(Math.min(constants_1.ZOOM_MAX_SCALE, Math.max(constants_1.ZOOM_MIN_SCALE, prev + 0.1)).toPrecision(2));
        });
    }, [setScale]);
    var zoomOut = react_1.useCallback(function () {
        console.log(scale);
        setScale(function (prev) {
            return Number(Math.min(constants_1.ZOOM_MAX_SCALE, Math.max(constants_1.ZOOM_MIN_SCALE, prev - 0.1)).toPrecision(2));
        });
    }, [scale]);
    var zoom = react_1.useCallback(function (factor) {
        if (Number.isNaN(factor))
            return;
        setScale(function (prev) {
            return Number(Math.min(constants_1.ZOOM_MAX_SCALE, Math.max(constants_1.ZOOM_MIN_SCALE, prev * factor)).toPrecision(2));
        });
    }, [setScale]);
    var onRunIteration = react_1.useCallback(function () {
        setIsRunningGame(true);
        runIteration();
    }, [grid]);
    var onNextStepIteration = react_1.useCallback(function () {
        setIsRunningGame(false);
        runIteration();
    }, [grid]);
    var onPauseIteration = react_1.useCallback(function () {
        setIsRunningGame(false);
        if (timeoutHandler) {
            window.clearTimeout(timeoutHandler);
            settimeoutHandler(null);
        }
    }, [grid]);
    var onResetInitialGrid = react_1.useCallback(function () {
        setGrid(function (prev) { return (__assign(__assign({}, prev), { cells: initialGrid })); });
    }, [grid]);
    var countPopulation = function () {
        setPopulation(0);
        for (var y = 0; y < (constants_1.HEIGHT / constants_1.CELL_SIZE); y++) {
            for (var x = 0; x < (constants_1.WIDTH / constants_1.CELL_SIZE); x++) {
                if (grid.cells[y][x].color === constants_1.CLICKED_CELL_COLOR) {
                    setPopulation(function (prev) { return ++prev; });
                }
            }
        }
    };
    var runIteration = function () {
        if (!initialGridWasSeted) {
            setInitialGrid(grid.cells);
            setInitialGridWasSeted(true);
        }
        var newBoard = makeNewEmptyBoardForInteration();
        for (var y = 0; y < (constants_1.HEIGHT / constants_1.CELL_SIZE); y++) {
            for (var x = 0; x < (constants_1.WIDTH / constants_1.CELL_SIZE); x++) {
                var neighbors = calculateNeighbors(grid.cells, x, y);
                if (grid.cells[y][x].color === constants_1.CLICKED_CELL_COLOR) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x].color = constants_1.CLICKED_CELL_COLOR;
                    }
                    else {
                        newBoard[y][x].color = constants_1.NO_CLICKED_CELL_COLOR;
                    }
                }
                else {
                    if (grid.cells[y][x].color === constants_1.NO_CLICKED_CELL_COLOR && neighbors === 3) {
                        newBoard[y][x].color = constants_1.CLICKED_CELL_COLOR;
                    }
                }
            }
        }
        setGeneration(function (prev) { return ++prev; });
        countPopulation();
        setGrid(function (prev) { return (__assign(__assign({}, prev), { cells: newBoard })); });
    };
    var calculateNeighbors = function (gridBoard, x, y) {
        var neighbors = 0;
        var dirs = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1],
        ];
        for (var i = 0; i < dirs.length; i++) {
            var dir = dirs[i];
            var y1 = y + dir[0];
            var x1 = x + dir[1];
            if (x1 >= 0 &&
                x1 < (constants_1.WIDTH / constants_1.CELL_SIZE) &&
                y1 >= 0 &&
                y1 < (constants_1.HEIGHT / constants_1.CELL_SIZE) &&
                gridBoard[y1][x1].color === constants_1.CLICKED_CELL_COLOR) {
                neighbors++;
            }
        }
        return neighbors;
    };
    var clickedCell = react_1.useCallback(function (index, x, y) {
        setCoordinates(x / constants_1.RADIO_CELL_SIZE + " " + y / constants_1.RADIO_CELL_SIZE);
        setGrid(function (prev) { return (__assign(__assign({}, prev), { cells: prev.cells.map(function (item, i) {
                if (item[index].x === x / constants_1.RADIO_CELL_SIZE && item[index].y === y / constants_1.RADIO_CELL_SIZE) {
                    if (item[index].color === constants_1.NO_CLICKED_CELL_COLOR) {
                        item[index].color = constants_1.CLICKED_CELL_COLOR;
                    }
                    else {
                        item[index].color = constants_1.NO_CLICKED_CELL_COLOR;
                    }
                }
                return item;
            }) })); });
    }, [setGrid]);
    return (react_1["default"].createElement(AppContext.Provider, { value: {
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
            runIteration: runIteration,
            onPauseIteration: onPauseIteration,
            defaultCellConfig: defaultCellConfig,
            backgorundConfig: backgroundConfig,
            isRunningGame: isRunningGame,
            setIsRunningGame: setIsRunningGame
        } }, children));
};
exports["default"] = AppContext;
