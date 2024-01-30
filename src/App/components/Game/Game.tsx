import "./Game.scss"

import { Box, Paper } from "@mui/material";
import React, { useCallback, useEffect } from "react";

import { Cell } from "../Cell/Cell"
import GridControls from "../GridView/GridControls/GridControls";

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

interface GameState {
    cells: { x: number; y: number }[];
    isRunning: boolean;
    interval: number;
}

class Game extends React.Component<{}, GameState> {
    rows: number;
    cols: number;
    board: boolean[][];
    boardRef: HTMLDivElement | null;
    timeoutHandler: number | null;

    constructor(props: any) {
        super(props);
        this.rows = HEIGHT / CELL_SIZE;
        this.cols = WIDTH / CELL_SIZE;

        this.board = this.makeEmptyBoard();
        this.boardRef = null;
        this.timeoutHandler = null;
    }

    state: GameState = {
        cells: [],
        isRunning: false,
        interval: 100,
    };

    makeEmptyBoard() {
        let board: boolean[][] = [];
        for (let y = 0; y < this.rows; y++) {
            board[y] = [];
            for (let x = 0; x < this.cols; x++) {
                board[y][x] = false;
            }
        }

        return board;
    }

    getElementOffset() {
        if (this.boardRef) {
            const rect = this.boardRef.getBoundingClientRect();
            const doc = document.documentElement;

            return {
                x: (rect.left + window.pageXOffset) - doc.clientLeft,
                y: (rect.top + window.pageYOffset) - doc.clientTop,
            };
        }

        return { x: 0, y: 0 };
    }

    makeCells() {
        let cells: { x: number; y: number }[] = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.board[y][x]) {
                    cells.push({ x, y });
                }
            }
        }

        return cells;
    }

    handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;

        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);

        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            this.board[y][x] = !this.board[y][x];
        }

        this.setState({ cells: this.makeCells() });
    };

    runGame = () => {
        this.setState({ isRunning: true });
        this.runIteration();
    };

    stopGame = () => {
        this.setState({ isRunning: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    };

    runIteration() {
        let newBoard = this.makeEmptyBoard();

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let neighbors = this.calculateNeighbors(this.board, x, y);
                if (this.board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!this.board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        this.board = newBoard;
        this.setState({ cells: this.makeCells() });

        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration();
        }, this.state.interval);
    }

    calculateNeighbors(board: boolean[][], x: number, y: number) {
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
                x1 < this.cols &&
                y1 >= 0 &&
                y1 < this.rows &&
                board[y1][x1]
            ) {
                neighbors++;
            }
        }

        return neighbors;
    }

    handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ interval: Number(event.target.value) });
    };

    handleClear = () => {
        this.board = this.makeEmptyBoard();
        this.setState({ cells: this.makeCells() });
    };

    handleRandom = () => {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.board[y][x] = Math.random() >= 0.5;
            }
        }

        this.setState({ cells: this.makeCells() });
    };

    render() {
        const { cells, interval, isRunning } = this.state;
        return (
            <>

                <div>
                    <div
                        className="Board"
                        style={{
                            width: WIDTH,
                            height: HEIGHT,
                            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
                        }}
                        onClick={this.handleClick}
                        ref={(n) => {
                            this.boardRef = n;
                        }}
                    >
                        {cells.map((cell) => (
                            <Cell index={0} color="" x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
                        ))}
                    </div>
                </div>
            </>
        );
    }
}

export default Game;