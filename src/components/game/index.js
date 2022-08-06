import React, { useState } from "react";

import { Container } from "@mui/system";
import FilesView from "../filesView";
import StepTwo from "../stepTwo";
import { GameModel } from "../../models/game.model";
import GameBoard from "../gameBoard";

const Game = () => {
  const [game, setGame] = useState(new GameModel());
  const [images, setImages] = useState([]);
  return (
    <Container>
      <FilesView files={images} setFiles={setImages} />
      <StepTwo />
      <GameBoard game={game} setGame={setGame} images={images} />
    </Container>
  );
};
export default Game;
