import "./IterationInfo.scss";

import React, { useContext } from "react";

import AppContext from "../../../LifeMaze/AppContext";
import { Box } from "@mui/system";

interface IterationInfoProps {}

const IterationInfo: React.FC<IterationInfoProps> = (props) => {
  const { generation, population, scale, coordinates } = useContext(AppContext);

  return (
    <Box
      className="node-info"
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingX: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div className="node-detail rank">
          Generation: <span>{generation}</span>
        </div>
        <div className="node-detail parents">
          Population: <span>{population}</span>
        </div>
        <div className="node-detail children">
          Scale: <span>{scale}</span>
        </div>

        <div className="node-detail children">
          XY: <span>{coordinates}</span>
        </div>
      </Box>
    </Box>
  );
};

export default React.memo(IterationInfo);
