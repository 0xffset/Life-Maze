import "./Header.scss";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  Paper,
  SvgIcon,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  rotateTheme,
  selectCurrentTheme,
  toggleOpenEditor,
} from "../../../LifeMaze/AppSettings.store";
import { useAppDispatch, useAppSelector } from "../../../LifeMaze/hooks";

import About from "./About/About";
import BrightIcon from "@mui/icons-material/Brightness7";
import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto";
import DarkIcon from "@mui/icons-material/Brightness4";
import { Info } from "@mui/icons-material";
import Logo from "../../../Logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(selectCurrentTheme);
  const [sharePopupIsOpen, setSharePopupIsOpen] =
    React.useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = React.useState<boolean>(false);

  const shareLinkAnchorEl = React.useRef(null);
  const themeIcon =
    currentTheme === "light" ? (
      <BrightIcon />
    ) : currentTheme === "auto" ? (
      <BrightnessAutoIcon />
    ) : (
      <DarkIcon />
    );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        color="transparent"
        className="app-bar"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Paper
          variant="outlined"
          elevation={0}
          sx={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0 }}
          className="lifeMaze"
        >
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => dispatch(toggleOpenEditor())}
              className="menu-icon"
            >
              <MenuIcon />
            </IconButton>

            <img src={Logo} alt="Logo" className="logo" />

            <Typography
              variant="h6"
              component={"div"}
              sx={{ flexGrow: 1 }}
              className="app-name"
            >
              LifeMaze
            </Typography>
            <Box
              className="right-buttons"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {/* <IconButton
                                color="primary"
                                className=""
                                onClick={() => setSharePopupIsOpen(true)}
                                ref={shareLinkAnchorEl}
                            >
                                <ShareIcon />
                            </IconButton> */}
              <IconButton color="primary" className="" href="https://github.com/0xffset/Life-Maze" target="_blank">
                <SvgIcon id="icon-github" viewBox="0 0 16 16">
                  <path d="M8 0.198c-4.418 0-8 3.582-8 8 0 3.535 2.292 6.533 5.471 7.591 0.4 0.074 0.547-0.174 0.547-0.385 0-0.191-0.008-0.821-0.011-1.489-2.226 0.484-2.695-0.944-2.695-0.944-0.364-0.925-0.888-1.171-0.888-1.171-0.726-0.497 0.055-0.486 0.055-0.486 0.803 0.056 1.226 0.824 1.226 0.824 0.714 1.223 1.872 0.869 2.328 0.665 0.072-0.517 0.279-0.87 0.508-1.070-1.777-0.202-3.645-0.888-3.645-3.954 0-0.873 0.313-1.587 0.824-2.147-0.083-0.202-0.357-1.015 0.077-2.117 0 0 0.672-0.215 2.201 0.82 0.638-0.177 1.322-0.266 2.002-0.269 0.68 0.003 1.365 0.092 2.004 0.269 1.527-1.035 2.198-0.82 2.198-0.82 0.435 1.102 0.162 1.916 0.079 2.117 0.513 0.56 0.823 1.274 0.823 2.147 0 3.073-1.872 3.749-3.653 3.947 0.287 0.248 0.543 0.735 0.543 1.481 0 1.070-0.009 1.932-0.009 2.195 0 0.213 0.144 0.462 0.55 0.384 3.177-1.059 5.466-4.057 5.466-7.59 0-4.418-3.582-8-8-8z"></path>
                </SvgIcon>
              </IconButton>
              <IconButton color="primary" onClick={() => setIsAboutOpen(true)}>
                <Info />
              </IconButton>

              <Button
                size="small"
                variant="contained"
                disableElevation
                className="rounded no-mobile"
                startIcon={themeIcon}
                onClick={() => dispatch(rotateTheme())}
              >
                {currentTheme}
                <IconButton
                  className="no-desktop"
                  color="primary"
                  onClick={() => dispatch(rotateTheme())}
                >
                  {themeIcon}
                </IconButton>
              </Button>
            </Box>
          </Toolbar>
        </Paper>
        <Menu
          anchorEl={shareLinkAnchorEl.current}
          open={sharePopupIsOpen}
          onClose={() => setSharePopupIsOpen(false)}
          className="share-box"
          PaperProps={{
            elevation: 5,
            sx: {
              width: "90%",
              maxWidth: 400,
              paddingX: "16px",
              paddingY: "8px",
              "& input": {
                height: "unset",
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Typography variant="h6" component="p">
            Share this pattern
          </Typography>

          <TextField
            id="share-link-input-el"
            label="Pattern URL"
            variant="filled"
            value={"composeSharableURL(graphData)"}
            className="select-link-input"
            fullWidth
            onFocus={(e) => e.target.select()}
            margin="normal"
          />

          <Typography
            variant="caption"
            component="p"
            sx={{ lineHeight: 1.3, mt: "8px" }}
          >
            Copy the above link to share this pattern.
          </Typography>
        </Menu>
      </AppBar>
      {/* The "About" Side Bar */}
      <About isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)}></About>
    </>
  );
};

export default Header;
