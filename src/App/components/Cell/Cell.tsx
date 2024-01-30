import {
  ICell as CellType,
  ICellConfig,
  IMouseTouchEvent,
  IPoint
} from "../../../LifeMaze/data/type";
import React, { ReactNode, useCallback, useContext } from "react";

import AppContext from "../../../LifeMaze/AppContext";

/**
 * Interface representing a handle for interacting with a cell.
 */
interface ICellHandle {
  /**
   * Function to handle mouse down event.
   * @param e The mouse event.
   */
  handleMouseDown: (e: IMouseTouchEvent) => void;

  /**
   * Function to handle mouse move event.
   * @param e The mouse event.
   */
  handleMouseMove: (e: IMouseTouchEvent) => void;

  /**
   * Function to handle mouse up event.
   * @param e The mouse event.
   */
  handleMouseUp: (e: IMouseTouchEvent) => void;

  /**
   * Function to flip the cell horizontally.
   */
  flipX: () => void;

  /**
   * Function to flip the cell vertically.
   */
  flipY: () => void;

  /**
   * Function to rotate the cell counter-clockwise.
   */
  rotateLeft: () => void;

  /**
   * Function to rotate the cell clockwise.
   */
  rotateRight: () => void;

  /**
   * Function to transpose the cell.
   */
  transpose: () => void;

  /**
   * Function to set the center point of the cell.
   * @param point The new center point.
   */
  setCenter: React.Dispatch<React.SetStateAction<IPoint>>;

  /**
   * The type of cell.
   */
  cell: CellType;
}

/**
 * Interface representing the properties of a cell component.
 */
interface ICellProps {
  /**
   * The index of the cell.
   */
  index: number;

  /**
   * The x-coordinate of the cell.
   */
  x: number;

  /**
   * The y-coordinate of the cell.
   */
  y: number;

  /**
   * The color of the cell.
   */
  color: string | undefined;
}

/**
 * Interface representing the properties of a memoized cell component.
 * Extends ICellProps interface.
 */

interface IMemoCellProps extends ICellProps {
  /**
   * Reference to the forwarded ref of the cell handle.
   */
  forwardedRef: React.ForwardedRef<ICellHandle>;

  /**
   * Default configuration for the cell.
   */
  defaultCellConfig: ICellConfig;

  /**
   * Callback function triggered when the cell is clicked.
   * @param index The index of the clicked cell.
   * @param x The x-coordinate of the clicked cell.
   * @param y The y-coordinate of the clicked cell.
   */
  clickedCell: (index: number, x: number, y: number) => void;
}

class Cell extends React.Component<ICellProps> {
  render(): ReactNode {
    const { x, y, color } = this.props;
    const CELL_SIZE = 20; // Assuming CELL_SIZE is a constant
    return (
      <div
        className="Cell"
        style={{
          color: `${color}`,
          left: `${CELL_SIZE * x + 1}px`,
          top: `${CELL_SIZE * y + 1}px`,
          width: `${CELL_SIZE - 1}px`,
          height: `${CELL_SIZE - 1}px`,
        }}
      />
    );
  }
}

const MemoCell = ({
  defaultCellConfig,
  x,
  y,
  index,
  clickedCell: getClickCell,
  color,
}: IMemoCellProps) => {
  return (
    <rect
      onClick={() => getClickCell(index, x, y)}
      fill={
        color !== "" ? color?.toString() : defaultCellConfig.backgroundColor
      }
      x={x}
      y={y}
      width={`50px`}
      height={`50px`}
    ></rect>
  );
};

const CellSvg = React.forwardRef<ICellHandle, ICellProps>((props, ref) => {
  const { defaultCellConfig, handleClickedEvent: handleClickEventCellContext } =
    useContext(AppContext);

  const handleTouchMove = useCallback(
    (index: number, x: number, y: number) => {
      handleClickEventCellContext(index, x, y);
    },
    [handleClickEventCellContext]
  );

  return (
    <MemoCell
      {...props}
      clickedCell={(index, x, y) => handleTouchMove(index, x, y)}
      forwardedRef={ref}
      defaultCellConfig={defaultCellConfig}
    />
  );
});


export { Cell, CellSvg };
export type { ICellHandle as CellHandle };
