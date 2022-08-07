import React, { useState, useEffect } from "react";
import { Container } from "@mui/system";
import FilesView from "../filesView";
import BoardSizeSelector from "../boardSizeSelector";
import { GameModel } from "../../models/game.model";
import GameBoard from "../gameBoard";
import { db } from "../../db";

export const GameContext = React.createContext();

const Game = () => {
  const [game, setGame] = useState(new GameModel());
  const [images, setImages] = useState([]);
  const [boardSize, setBoardSize] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      const storedImages = await db.images.toArray();
      if (storedImages && storedImages.length > 0) {
        setImages(
          storedImages.map((image) => ({
            uuid: image.uuid,
            name: image.file.name,
            url: URL.createObjectURL(image.file),
          }))
        );
      }
    };
    fetchData();
  }, []);

  return (
    <GameContext.Provider
      value={{ game, setGame, images, setImages, boardSize, setBoardSize }}
    >
      <Container>
        {!game.started && (
          <>
            <FilesView />
            <BoardSizeSelector />
          </>
        )}
        <GameBoard />
      </Container>
    </GameContext.Provider>
  );
};
export default Game;
