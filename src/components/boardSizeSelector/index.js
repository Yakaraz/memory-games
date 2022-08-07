import React, { useContext } from "react";
import { Container } from "@mui/material";
import Description from "./description";
import SizeSelector from "./sizeSelector";
import { GameContext } from "../../components/game";

const BoardSizeSelector = () => {
  const context = useContext(GameContext);
  return (
    <Container>
      <Description />
      {context.images.length >= 3 && <SizeSelector context={context} />}
    </Container>
  );
};

export default BoardSizeSelector;
