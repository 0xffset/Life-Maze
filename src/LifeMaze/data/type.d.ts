/**
 * Interface representing a point with x and y coordinates.
 */
export interface IPoint {
  /**
   * The x-coordinate of the point.
   */
  x: number;

  /**
   * The y-coordinate of the point.
   */
  y: number;
}

/**
 * Interface representing a cell with configuration and position.
 * Extends CellConfig interface.
 */
export interface ICell extends ICellConfig {
  /**
   * The x-coordinate of the cell.
   */
  x: number;

  /**
   * The y-coordinate of the cell.
   */
  y: number;
}
/**
 * Interface representing the configuration options for a cell.
 */
export interface ICellConfig {
  /**
   * The foreground color of the cell.
   */
  color: string;

  /**
   * The background color of the cell.
   */
  backgroundColor: string;
}

/**
 * Interface representing a grid containing cells.
 */
export interface IGrid {
  /**
   * A two-dimensional array representing the cells in the grid.
   */
  cells: ICell[][];

  /**
   * A two-dimensional array representing the board layout in the grid.
   */
  board: boolean[][];

  /**
   * Reference to the HTML div element representing the grid board.
   */
  boardRef: HTMLDivElement | null;

  /**
   * Handler for timeout operations related to the grid.
   */
  timeoutHandler: number | null;

  /**
   * Default configuration options for cells in the grid.
   */
  defaultCellConfig: ICellConfig;

  /**
   * Configuration options for the background of the grid.
   */
  backgroundConfig: IBackgroundConfig;

  /**
   * Configuration options for individual cell types in the grid.
   * Each key represents a label for a cell type, and its value contains
   * optional configuration properties such as color.
   */
  cellConfig: {
    [label: string]: {
      color?: string;
    };
  };
}
/**
 * Interface representing the configuration options for the background of a grid.
 */
export interface IBackgroundConfig {
  /**
   * The background color of the grid.
   */
  color: string;

  /**
   * The URL of the background image for the grid.
   */
  imageUrl: string;

  /**
   * The positioning of the background image within the grid.
   */
  position: string;

  /**
   * The repeat behavior of the background image within the grid.
   */
  repeat: string;

  /**
   * The size of the background image within the grid.
   */
  size: string;
}

/**
 * Interface representing an event object related to mouse touch events.
 */
interface IMouseTouchEvent {
  /**
   * The horizontal coordinate (relative to the viewport) at which the event occurred.
   */
  clientX: number;

  /**
   * The vertical coordinate (relative to the viewport) at which the event occurred.
   */
  clientY: number;

  /**
   * The button that was pressed or released during the event (if applicable).
   */
  button?: number;

  /**
   * The event target that the mouse touch event was dispatched to.
   */
  target: EventTarget;
}
