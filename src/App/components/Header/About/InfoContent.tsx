import * as React from "react";

import { Box, Divider, Typography } from "@mui/material";

interface InfoContentProps {}

const InfoContent: React.FunctionComponent<InfoContentProps> = () => {
  return (
    <Box sx={{ a: { color: "inherit", fontWeight: "bold" } }}>
      <Typography variant="h5">Conway's Game of Life </Typography>
      <br />

      <Typography variant="body2" component="p">
        Conway's Game of Life is a classic cellular automaton devised by the
        British mathematician John Conway in 1970. Despite its simplicity, it
        has captivated mathematicians, computer scientists, and enthusiasts for
        decades due to its emergent complexity and ability to simulate various
        biological and computational processes.
      </Typography>
      <br />

      <Typography variant="h6">Basics of Conway's Game of Life</Typography>
      <br />

      <Typography variant="body2" component="p">
        <ul>
          <li>
            {" "}
            <strong>Grid:</strong> The game is played on a two-dimensional grid
            of cells, each of which can be either alive or dead.
          </li>
          <li>
            <strong>Rules:</strong> The state of each cell evolves over time
            according to a set of rules:
          </li>
          <ul>
            <li>
              Underpopulation: A live cell with fewer than two live neighbors
              dies.
            </li>
            <li>
              Stasis: A live cell with two or three live neighbors remains
              alive.
            </li>
            <li>
              Overcrowding: A live cell with more than three live neighbors
              dies.
            </li>
            <li>
              Reproduction: A dead cell with exactly three live neighbors
              becomes alive.
            </li>
          </ul>
          <li>
            <strong>Initial Configuration:</strong> Players or algorithms set
            the initial configuration of live and dead cells on the grid.
          </li>
          <li>
            <strong>Iterative Process: </strong>The state of the grid evolves
            from one generation to the next based on the rules, creating
            patterns of live and dead cells.
          </li>
        </ul>
      </Typography>
      <br />

      <Typography variant="h6">Patterns and Behaviors:</Typography>
      <br />

      <Typography variant="body2" component="p">
        <ul>
          <li>
            Still Lifes: Configurations that remain static throughout the game.
          </li>
          <li>
            Oscillators: Patterns that oscillate between two or more states.
          </li>
          <li>
            Spaceships: Patterns that move across the grid as they evolve.
          </li>
          <li>
            Glider: A well-known spaceship that moves diagonally across the
            grid.
          </li>
        </ul>
      </Typography>

      <Typography variant="h6">Emergent Complexity:</Typography>
      <Typography variant="body2" component="p">
        Conway's Game of Life is Turing complete, meaning it can simulate a
        universal Turing machine. This implies that it is capable, in principle,
        of performing any computation or simulating any algorithm. Despite its
        simple rules, the game exhibits remarkable complexity, with patterns and
        behaviors that emerge from the interactions of individual cells.
      </Typography>
      <br />

      <Divider></Divider>
      <br />
      <Typography variant="caption" component="p">
        This tool was created by{" "}
        <a href="https://github.com/0xffset" target="_blank" rel="noreferrer">
          0xffset
        </a>{" "}
      </Typography>
    </Box>
  );
};

export default InfoContent;
