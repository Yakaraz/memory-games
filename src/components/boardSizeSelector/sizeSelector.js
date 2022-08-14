import React, { useContext } from "react";
import { GameContext } from "../../components/game";
import { Container, ToggleButtonGroup, ToggleButton } from "@mui/material";

const SizeSelector = () => {
  const { boardSize, setBoardSize, images, useDefaultImages } =
    useContext(GameContext);
  const setSize = (selectedSize) =>
    selectedSize &&
    (selectedSize <= images.length * 2 || useDefaultImages) &&
    setBoardSize(selectedSize);
  return (
    <Container sx={{ width: "100%", textAlign: "center" }}>
      <ToggleButtonGroup
        color="primary"
        value={`${boardSize}`}
        exclusive
        onChange={(_, selectedSize) => setSize(+selectedSize)}
      >
        <ToggleButton value="6">6 images</ToggleButton>
        <ToggleButton
          value="12"
          disabled={images.length < 6 && !useDefaultImages}
        >
          12 images
        </ToggleButton>
        <ToggleButton
          value="16"
          disabled={images.length < 8 && !useDefaultImages}
        >
          16 images
        </ToggleButton>
        <ToggleButton
          value="20"
          disabled={images.length < 10 && !useDefaultImages}
        >
          20 images
        </ToggleButton>
      </ToggleButtonGroup>
    </Container>
  );
};

export default SizeSelector;
