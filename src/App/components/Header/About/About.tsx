import "./About.scss";

import * as React from "react";

import {
  Backdrop,
  Box,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import InfoContent from "./InfoContent";

interface AboutProps {
  isOpen: boolean;
  onClose: () => void;
}

const About: React.FunctionComponent<AboutProps> = ({ isOpen, onClose }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isOpen}
      onClick={onClose}
    >
      <Paper
        className="about-container"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Paper
          variant="outlined"
          elevation={0}
          sx={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0 }}
        >
          <Toolbar variant="dense">
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              className="app-name"
            >
              About LifeMaze
            </Typography>

            <Box
              className="right-buttons"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <IconButton color="primary" onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Paper>

        <Box className="content">
          <InfoContent></InfoContent>
        </Box>
      </Paper>
    </Backdrop>
  );
};

export default About;
