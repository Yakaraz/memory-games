import React from "react";
import { Container, Typography } from "@mui/material";

const Rules = () => (
  <Container
    sx={{
      backgroundColor: "#FFFFFF",
      borderRadius: "40px",
      paddingY: "3em",
      marginTop: "22em",
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
      différentes, elles disparaissent.
      <br />À vous de retrouver les paires.
    </Typography>
  </Container>
);

export default Rules;
