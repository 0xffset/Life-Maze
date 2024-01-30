import { Button, PaletteMode } from "@mui/material";
import { ThemeOptions, styled } from "@mui/material/styles";

export type ThemeType = PaletteMode | "auto";

// Define the light application theme.
export const lightTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      // main: "#2a928f",
      main: "#222222",
    },
    secondary: {
      // main: "#19d2d2",
      main: "#7069cc",
    },
    background: {
      paper: "#fffdf7",
    },
  },
};

// Define the dark application theme.
export const darkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      // main: "#2a928f",
      main: "#fffdf7",
    },
    secondary: {
      // main: "#19d2d2",
      main: "#7069cc",
    },
    background: {
      default: "#101213",
      paper: "#202226",
    },
  },
};

export const getDesignTokens = (mode: PaletteMode) =>
  mode === "light" ? lightTheme : darkTheme;

export const ColorButton = styled(Button)(() => ({
  color: "#ffffff",
  backgroundColor: "#4AAF61",
  "&:hover": {
    color: "#ffffff",
    backgroundColor: "#006428",
  },
}));
