import React, { useState } from "react";
import {
  Container,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
} from "@mui/material";

const StepTwoDescription = () => (
  <Container ml="1em" sx={{ marginBottom: "1em" }}>
    <Typography
      component="h3"
      color="primary"
      fontFamily="Inter"
      fontStyle="normal"
      fontSize="24px"
      fontWeight="500"
      lineHeight="29px"
      mt="2em"
      mb="0.5em"
    >
      <Typography
        component="div"
        fontFamily="Inter"
        fontStyle="normal"
        fontSize="24px"
        fontWeight="700"
        lineHeight="36px"
        textAlign="center"
        mr="1em"
        sx={{
          display: "inline-block",
          borderRadius: "50%",
          height: "36px",
          width: "36px",
          color: "white",
          backgroundColor: "#003986",
        }}
      >
        2
      </Typography>
      Choisissez le nombre de photos à reconnaître.
    </Typography>
    <Typography
      component="span"
      color="secondary"
      fontFamily="Inter"
      fontStyle="normal"
      fontSize="16px"
      fontWeight="400"
      lineHeight="26px"
    >
      <Typography
        component="span"
        fontFamily="Inter"
        fontStyle="normal"
        fontSize="16px"
        fontWeight="700"
        lineHeight="26px"
        sx={{ margin: "0.5ch" }}
      >
        Par défaut, nous choisirons le nombre maximal d’images.
      </Typography>
    </Typography>
  </Container>
);
const SizeSelector = () => {
  const [boardSize, setBoardSize] = useState("3");
  return (
    <Container ml="1em" sx={{ width: "100%", textAlign: "center" }}>
      <ToggleButtonGroup
        color="primary"
        value={boardSize}
        exclusive
        onChange={(e, newSize) => setBoardSize(newSize)}
      >
        <ToggleButton value="3">6 images</ToggleButton>
        <ToggleButton value="6">12 images</ToggleButton>
        <ToggleButton value="8">16 images</ToggleButton>
        <ToggleButton value="10">20 images</ToggleButton>
      </ToggleButtonGroup>
    </Container>
  );
};

const StepTwo = () => (
  <Container>
    <StepTwoDescription />
    <SizeSelector />
  </Container>
);

export default StepTwo;
