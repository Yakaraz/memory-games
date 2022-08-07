import React from "react";
import { Container, ToggleButtonGroup, ToggleButton } from "@mui/material";

const SizeSelector = ({ boardSize, setBoardSize, images }) => {
  const setSize = (selectedSize) =>
    selectedSize &&
    selectedSize <= images.length * 2 &&
    setBoardSize(selectedSize);
  return (
    <Container ml="1em" sx={{ width: "100%", textAlign: "center" }}>
      <ToggleButtonGroup
        color="primary"
        value={`${boardSize}`}
        exclusive
        onChange={(_, selectedSize) => {
          console.warn(typeof +selectedSize + " " + selectedSize);
          setSize(+selectedSize);
        }}
      >
        <ToggleButton value="6">6 images</ToggleButton>
        <ToggleButton value="12" disabled={images.length < 6}>
          12 images
        </ToggleButton>
        <ToggleButton value="16" disabled={images.length < 8}>
          16 images
        </ToggleButton>
        <ToggleButton value="20" disabled={images.length < 10}>
          20 images
        </ToggleButton>
      </ToggleButtonGroup>
    </Container>
  );
};

export default SizeSelector;