import React from "react";
import { Container, Typography } from "@mui/material";

const Title = () => (
  <Container
    sx={{
      backgroundColor: `rgba(0, 57, 134, 0.05)`,
      borderRadius: "40px",
      height: "413px",
      position: "absolute",
      zIndex: "-1",
      top: "-20em",
      left: "0",
    }}
  >
    <Typography
      component="h1"
      color="primary"
      fontFamily="Inter"
      fontStyle="normal"
      fontSize="48px"
      fontWeight="700"
      align="center"
      lineHeight="58px"
      sx={{ flex: 1, paddingTop: "66px" }}
    >
      Jeu des cartes mémoire
    </Typography>
    <Typography
      component="h2"
      color="primary"
      fontFamily="Inter"
      fontStyle="normal"
      fontSize="36px"
      fontWeight="500"
      align="center"
      noWrap
      sx={{ flex: 1 }}
    >
      Retrouvez les paires.
    </Typography>
  </Container>
);

export default Title;
