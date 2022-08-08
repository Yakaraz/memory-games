import React, { useContext } from "react";
import { Box, Container, Typography, Stack, Grid } from "@mui/material";
import { sortBy, reverse } from "lodash";
import { GameContext } from "../game";

const GameScores = () => {
  const { scores } = useContext(GameContext);

  return (
    <Container sx={{ marginBottom: "10rem" }}>
      <Typography
        component="h3"
        color="primary"
        fontFamily="Inter"
        fontStyle="normal"
        fontSize="24px"
        fontWeight="500"
        lineHeight="29px"
        mt="2em"
      >
        Mes Scores
      </Typography>
      {scores && scores.length > 0 && (
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={1}
          my="1em"
        >
          {reverse(sortBy(scores, "date")).map((score) => (
            <Box key={score.id}>
              <Grid container>
                <Grid item>
                  <Typography
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="400"
                    fontSize="24px"
                    lineHeight="29px"
                  >
                    {score.date.toLocaleDateString("fr-FR", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    à {score.date.getHours()}h
                    {score.date.getMinutes().toString().padStart(2, "0")}
                  </Typography>
                </Grid>
                <Grid item mx="auto">
                  <Typography
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="400"
                    fontSize="24px"
                    lineHeight="29px"
                  >
                    {Math.floor(score.value / 60)}m{" "}
                    {(score.value % 60).toString().padStart(2, "0")}s
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="500"
                    fontSize="16px"
                    lineHeight="19px"
                  >
                    {score.boardSize} images
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default GameScores;
