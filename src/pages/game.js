import React from "react";
import { Box } from "@mui/material";
import { Container } from "@mui/system";
import FilesView from "../components/filesView";
import StepTwo from "../components/stepTwo";
import Game from "../components/game";
import Header from "../components/header";

const Main = () => (
  <Container>
    <FilesView />
    <StepTwo />
  </Container>
);

const GamePage = () => (
  <Box>
    <Header />
    <Main />
    <Game />
  </Box>
);

export default GamePage;
