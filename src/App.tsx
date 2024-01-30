import "./App.css";
import "./App.scss";

import { Box, CssBaseline, Paper, SxProps, Theme } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import ApplicationContainer from "./App/components/ApplicationContainer";
import Header from "./App/components/Header/Header";
import React from "react";
import { getDesignTokens } from "./LifeMaze/theme";
import { useAppSelector } from "./LifeMaze/hooks";
import useMediaQuery from "@mui/material/useMediaQuery";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const themeMode = useAppSelector((state) => state.appSettings.currentTheme);

  const themePalette = React.useMemo(() => {
    const colors = getDesignTokens(
      themeMode === "auto" ? (prefersDarkMode ? "dark" : "light") : themeMode
    );

    // Change the app's "color-theme" meta tag
    document
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", colors.palette?.background?.paper || "#fffdf7");

    // Return the created theme
    return createTheme(colors);
  }, [themeMode, prefersDarkMode]);

  return (
    <ThemeProvider theme={themePalette}>
      <CssBaseline></CssBaseline>
      <Box sx={rootContainerSx}>
        <Header />
        {/* <Drawer
          className="editor-drawer"
          // container={container}
          variant="temporary"
          open={false}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
        </Drawer> */}

        <Paper elevation={0} sx={{ flexGrow: 1 }} className="graph-viz">
          <ApplicationContainer />
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default App;

const rootContainerSx: SxProps<Theme> = {
  display: "flex",
  height: "100vh",
  widht: "100vw",
};
