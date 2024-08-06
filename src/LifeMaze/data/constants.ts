import { IBackgroundConfig, ICellConfig } from "./type";

export const __MOUSE_LEFT_KEY_BUTTON__ = 0;

export const ZOOM_MAX_SCALE = 10;
export const ZOOM_MIN_SCALE = 0.1;

export const CELL_SIZE = 5;
export const WIDTH = 80;
export const HEIGHT = 80;
export const CLICKED_CELL_COLOR = "black";
export const NO_CLICKED_CELL_COLOR = "#ccc";
export const RADIO_CELL_SIZE = 60;

export const DEFAULT_CELL_CONFIG: ICellConfig = {
  color: "",
  backgroundColor: "#ccc",
};

export const DEFAULT_BACKGROUND_CONFIG: IBackgroundConfig = {
  color: "",
  imageUrl: "",
  repeat: "no-repeat",
  position: "center",
  size: "contain",
};
