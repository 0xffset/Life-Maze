import "./GridControls.scss";

import * as React from "react";

import {
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";

import AppContext from "../../../../LifeMaze/AppContext";
import { Box } from "@mui/system";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import MoreIcon from "@mui/icons-material/MoreVert";
import NextIcon from "@mui/icons-material/NextPlan";
import PauseIcon from "@mui/icons-material/Pause";
import PlayIcon from "@mui/icons-material/PlayArrow";
import RefreshIcon from "@mui/icons-material/SettingsBackupRestore";
import RestartIcon from "@mui/icons-material/RestartAlt";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { useContext } from "react";

/**
 * Interface representing the Grid configuration options globally.
 */
interface GridControlsProps {
  /**
   * Reset the grid layout (remove all fill up cells with non-clicked cells).
   */
  onRestartGrid: () => void;
  /**
   * Start the simulation.
   */
  onRunInteration: () => void;
  /**
   * Pause the simulation.
   */
  onPauseIteration: () => void;
  /**
   * Run a next step of the simulation.
   */
  onNextStepIteration: () => void;
  /**
   * Zoom in the grid layout.
   */
  onZoomIn: () => void;
  /**
   * Zoom out the grid layout.
   */
  onZoomOut: () => void;
  /**
   * Reset the simulation to the initial pattern.
   */
  onResetInitialGrid: () => void;
}

const GridControls: React.FC<GridControlsProps> = (
  props: GridControlsProps
) => {
  const open = Boolean(false);

  const { isRunningGame } = useContext(AppContext);

  return (
    <Box
      className="grid-controls"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingX: "16px",
      }}
    >
      <Box className="power-icons">
        <Tooltip
          title="Reset Grid Layout To The Initial Pattern"
          className="reset-grid-layout-main-button"
        >
          <IconButton
            aria-label="Reset Grid Layout"
            color="primary"
            onClick={() =>
              isRunningGame ? () => {} : props.onResetInitialGrid()
            }
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Clean Grid">
          <IconButton
            disabled={isRunningGame ? true : false}
            aria-label="Clean"
            onClick={() => (isRunningGame ? () => {} : props.onRestartGrid())}
            color="primary"
          >
            <RestartIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title={`${isRunningGame ? "Pause" : "Play"} Iteration`}>
          <IconButton
            aria-label="Start/Pause Iteration"
            onClick={() =>
              isRunningGame ? props.onPauseIteration() : props.onRunInteration()
            }
            color="primary"
          >
            {isRunningGame ? <PauseIcon /> : <PlayIcon />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Next Iteration" className="no-xs-screen">
          <Button
            size="small"
            variant="contained"
            disableElevation
            className="rounded next-step-button"
            aria-label="start/pause"
            startIcon={<NextIcon />}
            onClick={() => props.onNextStepIteration()}
          >
            Next Iteration
          </Button>
        </Tooltip>

        <Tooltip title="Next Iteration" className="no-desktop">
          <IconButton aria-label="next iteration" color="primary">
            <NextIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box className="view-icons">
        <div className="full-buttons">
          <Tooltip title="Zoom In">
            <IconButton
              aria-label="zoom in"
              color="primary"
              onClick={() => props.onZoomIn()}
            >
              <ZoomInIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Zoom Out">
            <IconButton
              aria-label="zoom out"
              color="primary"
              onClick={() => props.onZoomOut()}
            >
              <ZoomOutIcon />
            </IconButton>
          </Tooltip>
        </div>

        <div className="menu-buttons">
          <IconButton
            id="graph-view-controls"
            aria-controls="graph-view-controls-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            color="primary"
          >
            <MoreIcon />
          </IconButton>
          <Menu
            id="graph-view-controls-menu"
            open={open}
            MenuListProps={{
              "aria-labelledby": "graph-view-controls",
            }}
          >
            <MenuItem>
              <ListItemIcon>
                <RefreshIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Reset Graph Layout</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <FitScreenIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Fit Graph</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ZoomInIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Zoom In</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ZoomOutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Zoom Out</ListItemText>
            </MenuItem>
            <MenuItem></MenuItem>
          </Menu>
        </div>
      </Box>
    </Box>
  );
};

export default GridControls;
