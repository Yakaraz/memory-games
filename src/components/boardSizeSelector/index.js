import React, { useContext } from "react";
import { Box, Container, Switch, Typography } from "@mui/material";
import Description from "./description";
import SizeSelector from "./sizeSelector";
import { GameContext } from "../../components/game";

const BoardSizeSelector = () => {
  const { images, setBoardSize, useDefaultImages, setUseDefaultImages } =
    useContext(GameContext);
  return (
    <Container>
      <Description />
      <Box>
        <Typography
          component="span"
          color="primary"
          fontFamily="Inter"
          fontStyle="normal"
          fontSize="15px"
          fontWeight="500"
          lineHeight="24px"
          sx={{ margin: "0.5ch" }}
        >
          Images par défaut :
        </Typography>
        <Switch
          color="primary"
          checked={useDefaultImages}
          onChange={() => {
            setUseDefaultImages(!useDefaultImages);
            setBoardSize(0);
          }}
        />
      </Box>
      {(images.length >= 3 || useDefaultImages) && <SizeSelector />}
    </Container>
  );
};

export default BoardSizeSelector;
