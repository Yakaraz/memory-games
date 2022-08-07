import React from "react";
import { Box } from "@mui/material";
import Header from "../components/header";
import Game from "../components/game";
import { Container } from "@mui/system";

const Footer = () => (
  <Container sx={{ width: "100vw", height: "12rem" }}></Container>
);

const GamePage = () => (
  <Box>
    <Header />
    <Game />
    <Footer />
  </Box>
);

export default GamePage;
