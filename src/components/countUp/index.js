import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { GameContext } from "../game";

const CountUp = () => {
  const { game } = useContext(GameContext);
  return (
    <Typography variant="h6" component="div" color="text.primary">
      {`${Math.floor(game.progress / 60)} m ${game.progress % 60}s`}
    </Typography>
  );
};
export default CountUp;
