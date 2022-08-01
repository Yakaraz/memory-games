import React, { useState, useEffect } from "react";
import { shuffle, concat, cloneDeep } from "lodash";
import { db } from "../../db";
// import PropTypes from "prop-types";
import CardListView from "../cardList";
import Card from "../../models/card.model";
import { Game, GameState } from "../../models/game.model";

import { Button, Backdrop, Box } from "@mui/material";
import { Container } from "@mui/system";
import CountDown from "../countDown";

/**
 * Component GameView that show a board of cards
 */
const GAME_LENGTH = 200;

const GameView = () => {
  const [game, setGame] = useState(new Game());

  const flipCard = (uuid) => setGame((oldGame) => oldGame.flipCard(uuid));
  const validateHand = () => setGame((oldGame) => oldGame.validateHand());
  const emptyHand = () => setGame((oldGame) => oldGame.emptyHand());

  const hasWon = () => setGame((oldGame) => oldGame.hasWon());
  const setDeck = (deck) => setGame((oldGame) => oldGame.setDeck(deck));

  const startCountDown = () => setGame((oldGame) => oldGame.start());

  const overtime = () => setGame((oldGame) => oldGame.gameOver());

  // On mount (once), we load the cards from the store
  useEffect(() => {
    const initialImages = [
      {
        url: "https://picsum.photos/201",
        title: "bip",
        uuid: "51d48348-1990-4f91-8432-1e4aeeed6fc2",
      },
      {
        url: "https://picsum.photos/202",
        title: "bipBIP",
        uuid: "a3233fa2-07fa-439d-9f47-2d98df6c7e26",
      },
      {
        url: "https://picsum.photos/200",
        title: "bipBIP",
        uuid: "e5933fa2-07fa-439d-9f47-2d98df6c7e26",
      },
      {
        url: "https://picsum.photos/210",
        title: "bipBIP",
        uuid: "eza33fa2-07fa-439d-9f47-2d98df6c7e26",
      },
      {
        url: "https://picsum.photos/204",
        title: "bipBIP",
        uuid: "a59fda2-07fa-439d-9f47-2d98df6c7e26",
      },
      {
        url: "https://picsum.photos/205",
        title: "bipBIP",
        uuid: "a593vsa2-07fa-439d-9f47-2d98df6c7e26",
      },
      {
        url: "https://picsum.photos/206",
        title: "bipBIP",
        uuid: "a593qga2-07fa-439d-9f47-2d98df6c7e26",
      },
      {
        url: "https://picsum.photos/207",
        title: "bipBIP",
        uuid: "th333fa2-07fa-439d-9f47-2d98df6c7e26",
      },
    ];
    const loadImages = async () => {
      let images = await db.images.toArray();
      if (images.length === 0) {
        const imagesIds = await db.images.bulkAdd(initialImages, {
          allKeys: "true",
        });
        images = await db.images.bulkGet(imagesIds);
      }
      const imagesClone = cloneDeep(images);
      const newImages = concat(images, imagesClone);
      const deck = shuffle(newImages.map((img) => new Card(img)));
      setDeck(deck);
    };
    loadImages().catch((e) => console.error(e));

    return () => setDeck([]);
  }, []);

  useEffect(() => {
    let timeout;
    if (game.state === GameState.VALIDATE) {
      timeout = setTimeout(() => {
        validateHand();
      }, 800);
    } else if (game.state === GameState.EMPTY) {
      emptyHand();
    } else if (game.state === GameState.WON) {
      hasWon();
    }

    return () => window.clearTimeout(timeout);
  }, [game]);
  ////////////////////:
  const oneSecond = () => setGame((oldGame) => oldGame.addASecond());

  useEffect(() => {
    game.started &&
      game.progress <= GAME_LENGTH &&
      setTimeout(() => oneSecond(), 1000);
    game.progress > GAME_LENGTH && overtime();
  }, [game.started, game.progress]);

  return (
    <Box>
      <Container sx={{ textAlign: "center", padding: "1em" }}>
        {game.started ? (
          <CountDown progress={game.progress} max={GAME_LENGTH} />
        ) : (
          <Button
            onClick={(e) => {
              e.preventDefault();
              startCountDown();
            }}
            variant="contained"
            size="large"
          >
            Start Game
          </Button>
        )}
      </Container>
      <Backdrop
        open={game.won}
        sx={{
          zIndex: "1",
          backgroundColor: `rgba(142, 12, 142, 0.6)`,
          padding: "3em",
          "& h1": {
            backgroundColor: `rebeccapurple`,
            color: "white",
            padding: "1.25rem 2.5rem",
            borderRadius: "1rem",
            boxShadow: "inset 0 0 0 0.2em #f4f4f4",
          },
        }}
      >
        <h1>Bravo, tu as gagné !</h1>
      </Backdrop>
      <CardListView deck={game.deck} flipCard={flipCard} />
    </Box>
  );
};

// GameView.propTypes = {
//   cards: PropTypes.arrayOf(Card.propTypes).isRequired,
// };

export default GameView;
