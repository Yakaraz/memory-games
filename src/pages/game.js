import { Box, Icon, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Game from "../components/game";

const Header = () => (
  <Container
    sx={{
      backgroundColor: `rgba(0, 57, 134, 0.05)`,
      borderRadius: "40px",
      height: "413px",
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
    <Container
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "40px",
        margin: "2em 0",
        padding: "2em 0",
        height: "287px",
      }}
    >
      <Typography
        component="h4"
        fontFamily="Inter"
        fontStyle="normal"
        fontSize="24px"
        fontWeight="400"
        lineHeight="29px"
        sx={{ textDecoration: "underline", marginBottom: "1em" }}
      >
        Règles du jeu :
      </Typography>
      <Typography
        component="h5"
        fontFamily="Inter"
        fontStyle="normal"
        fontSize="24px"
        fontWeight="400"
        maxWidth="67ch"
      >
        Retrouvez toutes les{" "}
        <Typography
          component="span"
          fontFamily="Inter"
          fontStyle="normal"
          fontSize="24px"
          fontWeight="700"
        >
          paires de cartes identiques{" "}
        </Typography>
        le plus rapidement possible. À chaque tour, retournez 2 cartes. Si elles
        sont identiques, elles restent affichées. Si les deux cartes sont
        différentes, elles dispairaissent.
        <br />À vous de retrouver les paires.
      </Typography>
    </Container>
    <Container>
      <Typography
        component="h3"
        color="primary"
        fontFamily="Inter"
        fontStyle="normal"
        fontSize="24px"
        fontWeight="500"
        lineHeight="29px"
      >
        Sélectionnez vos photos sur votre ordinateur ou votre tablette.
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
          Vous n’avez pas de photo ?
        </Typography>
        Pas de panique, nous allons en ajouter
        <Typography
          component="span"
          fontFamily="Inter"
          fontStyle="normal"
          fontSize="16px"
          fontWeight="700"
          lineHeight="26px"
          sx={{ margin: "0.5ch" }}
        >
          automatiquement
        </Typography>
        pour vous.
      </Typography>
    </Container>
    <Container
      sx={{
        height: "150px",
        backgroundColor: "rgba(95, 153, 231, 0.05)",
        border: "1.5px dashed #5F99E7",
        borderRadius: "3px",
        display: "grid",
      }}
    >
      <Icon>
        <img src="./img/upload.png" alt="c" />
      </Icon>
      <Typography>
        Faites glissez vos photos depuis votre appareils ou chargez-les.
      </Typography>
    </Container>
  </Container>
);

const GamePage = () => (
  <Box>
    <Header />
    <Game />
  </Box>
);

export default GamePage;
