import "./ApplicationContainer.scss";

import { Box, Paper } from "@mui/material";
import { CellHandle, CellSvg } from "./Cell/Cell";
import {
  RADIO_CELL_SIZE,
  __MOUSE_LEFT_KEY_BUTTON__,
} from "../../LifeMaze/data/constants";
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import AppContext from "../../LifeMaze/AppContext";
import GridControls from "./GridView/GridControls/GridControls";
import { IMouseTouchEvent } from "../../LifeMaze/data/type";
import { IPoint } from "../../LifeMaze/data/type";
import IterationInfo from "./IterationInfo/IterationInfo";
import { getDistance } from "./utils";
import { throttle } from "lodash";

const ApplicationContainer = () => {
  const containerRef = useRef<SVGSVGElement | null>(null);
  const selectedNodeRef = useRef<CellHandle | null>(null);
  const isDragging = useRef<boolean>(false);
  const prevClickPoint = useRef<IPoint>({ x: 0, y: 0 });
  const prevTouchesDist = useRef<number>(0);
  const {
    Grid,
    scale,
    center,
    zoomIn,
    zoomOut,
    zoom,
    setCenter,
    makeCellsGrid,
    onRunInteration,
    onResetInitialGrid,
    runIteration,
    onNextStepIteration,
    onPauseIteration,
    onIncreaseDecreaseGridSize,
    isRunningGame,
    backgorundConfig,
    unsetCell,
  } = useContext(AppContext);
  let timeoutHandler: number | null;
  const [{ viewHeight, viewWidth }, setViewSize] = useState({
    viewWidth: window.innerWidth * scale,
    viewHeight: window.innerHeight * scale,
  });

  const handleResize = useCallback(() => {
    setViewSize({
      viewWidth: window.innerWidth * scale,
      viewHeight: window.innerHeight * scale,
    });
  }, [setViewSize, scale]);

  React.useEffect(() => {
    makeCellsGrid();
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  React.useEffect(() => {
    handleResize();
  }, [scale, handleResize]);

  if (isRunningGame) {
    timeoutHandler = window.setTimeout(() => {
      runIteration();
    }, 100);
  } else {
    window.clearTimeout(timeoutHandler!);
    timeoutHandler = null;
  }

  const handleMouseMove = useCallback(
    (e: IMouseTouchEvent) => {
      if (selectedNodeRef.current) {
        selectedNodeRef.current.handleMouseMove(e);
        return;
      }

      const { clientX, clientY, target } = e;
      if (target !== containerRef.current) return;
      if (isDragging.current) {
        setCenter((prev) => {
          const ret = {
            x: prev.x - (clientX - prevClickPoint.current.x) * scale,
            y: prev.y - (clientY - prevClickPoint.current.y) * scale,
          };
          prevClickPoint.current.x = clientX;
          prevClickPoint.current.y = clientY;
          return ret;
        });
      }
    },
    [setCenter, scale]
  );

  const handleCLick = useCallback(
    (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {},
    []
  );

  const handleMouseUp = useCallback((e: IMouseTouchEvent) => {
    isDragging.current = false;
    if (selectedNodeRef.current) {
      selectedNodeRef.current.handleMouseUp(e);
      selectedNodeRef.current = null;
      return;
    }
    if (e.target !== containerRef.current) return;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<SVGSVGElement>) => {
      if (e.touches.length === 1) {
        handleMouseUp(e.touches[0]);
      }
    },
    [handleMouseUp]
  );

  const handleMouseDown = useCallback(
    ({ clientX, clientY, button, target }: IMouseTouchEvent) => {
      if (button !== undefined && button !== __MOUSE_LEFT_KEY_BUTTON__) return;
      if (target !== containerRef.current) return;
      prevClickPoint.current = { x: clientX, y: clientY };
      isDragging.current = true;
    },
    []
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<SVGSVGElement>) => {
      if (e.touches.length === 1) {
        handleMouseDown(e.touches[0]);
      } else if (e.touches.length === 2) {
        prevTouchesDist.current = getDistance(
          { x: e.touches[0].clientX, y: e.touches[0].clientY },
          { x: e.touches[1].clientX, y: e.touches[1].clientY }
        );
      }
    },
    [handleMouseDown]
  );

  const handleDoubleTouches = useMemo(
    () =>
      throttle((t1: React.Touch, t2: React.Touch) => {
        let dist = getDistance(
          { x: t1.clientX, y: t1.clientY },
          { x: t2.clientX, y: t2.clientY }
        );

        zoom(prevTouchesDist.current / dist);
        prevTouchesDist.current = dist;
      }, 50),
    [zoom]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<SVGSVGElement>) => {
      if (e.touches.length === 1) {
        handleMouseMove(e.touches[0]);
      } else if (e.touches.length === 2) {
        handleDoubleTouches(e.touches[0], e.touches[1]);
      }
    },
    [handleMouseMove, handleDoubleTouches]
  );

  const handleDoubleClick = useCallback(
    ({ target }: IMouseTouchEvent) => {
      if (target === containerRef.current) {
        unsetCell();
      }
    },
    [unsetCell]
  );
  const handleWheel = useMemo(
    () =>
      throttle(({ deltaY }: React.WheelEvent<SVGSVGElement>) => {
        if (selectedNodeRef.current) {
          return;
        }
        if (!isDragging.current) {
          if (deltaY > 0) zoomIn();
          else zoomOut();
        }
      }, 50),
    [zoomIn, zoomOut]
  );
  const containerStyle: React.CSSProperties = useMemo(() => {
    return {
      backgroundColor: backgorundConfig.color,
      backgroundImage: `url(${backgorundConfig.imageUrl})`,
      backgroundPosition: backgorundConfig.position,
      backgroundRepeat: backgorundConfig.repeat,
      backgroundSize: backgorundConfig.size,
    };
  }, [backgorundConfig]);

  return (
    <>
      <Box
        className="gridView"
        height="100%"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ p: 2 }} />
        <Box sx={{ p: 2 }} />

        <Box className="grid-controls-bar">
          <GridControls
            onResetInitialGrid={onResetInitialGrid}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onNextStepIteration={onNextStepIteration}
            onPauseIteration={onPauseIteration}
            onRestartGrid={makeCellsGrid}
            onRunInteration={onRunInteration}
            onIncreaseDecreaseGridSize={onIncreaseDecreaseGridSize}
          />
        </Box>
        <Paper variant="outlined" elevation={0} className="grid-info-bar">
          <IterationInfo />
        </Paper>

        <Box className="main-view">
          <Paper
            elevation={0}
            sx={{ boxShadow: "none" }}
            className={"grid-container"}
          >
            <svg
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
              onWheel={handleWheel}
              onDoubleClick={handleDoubleClick}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={(e) => handleCLick(e)}
              ref={containerRef}
              id="life-maze"
              width={"100%"}
              height={"100%"}
              viewBox={`${center.x - viewWidth / 2},${
                center.y - viewHeight / 2
              },${viewWidth}, ${viewHeight}`}
              preserveAspectRatio="xMinYMin slice"
              style={containerStyle}
            >
              <g strokeWidth="1" fillRule="evenodd">
                {Grid.cells.map((cell, index) =>
                  cell.map((item, index) => (
                    <CellSvg
                      index={index}
                      color={cell[index].color}
                      key={`cell-${index}`}
                      x={item.x * RADIO_CELL_SIZE}
                      y={item.y * RADIO_CELL_SIZE}
                    />
                  ))
                )}
              </g>
            </svg>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ApplicationContainer;
