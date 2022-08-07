import React, { useContext } from "react";
import { Container } from "@mui/material";
import Description from "./description";
import SizeSelector from "./sizeSelector";
import { GameContext } from "../../components/game";

const BoardSizeSelector = () => {
  const { images } = useContext(GameContext);
  return (
    <Container>
      <Description />
      {images.length >= 3 && <SizeSelector />}
    </Container>
  );
};

export default BoardSizeSelector;
