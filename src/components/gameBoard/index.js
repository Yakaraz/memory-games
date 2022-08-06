import React, { useContext, useEffect } from "react";
import { shuffle, concat, cloneDeep } from "lodash";
// import PropTypes from "prop-types";
import CardListView from "../cardList";
import Card from "../../models/card.model";
import { GameState } from "../../models/game.model";

import { Button, Backdrop, Box } from "@mui/material";
import { Container } from "@mui/system";
import CountDown from "../countDown";
import { GameContext } from "../game";

/**
 * Component GameView that show a board of cards
 */
const GAME_LENGTH = 100;

const GameBoard = () => {
  const { game, setGame, images } = useContext(GameContext);
  const flipCard = (uuid) => setGame((oldGame) => oldGame.flipCard(uuid));
  const validateHand = () => setGame((oldGame) => oldGame.validateHand());
  const emptyHand = () => setGame((oldGame) => oldGame.emptyHand());

  const hasWon = () => setGame((oldGame) => oldGame.hasWon());
  const setDeck = (deck) => setGame((oldGame) => oldGame.setDeck(deck));

  const startCountDown = () => setGame((oldGame) => oldGame.start());

  const overtime = () => setGame((oldGame) => oldGame.gameOver());

  // On mount (once), we load the cards from the store
  useEffect(() => {
    if (images.length > 0) {
      const imagesClone = cloneDeep(images);
      const newImages = concat(images, imagesClone);
      const deck = shuffle(newImages.map((img) => new Card(img)));
      setDeck(deck);
    } else {
      setDeck([]);
    }
  }, [images]);

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
      {images.length > 0 ? (
        <>
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
        </>
      ) : (
        <p>aucune image</p>
      )}
    </Box>
  );
};

// GameView.propTypes = {
//   cards: PropTypes.arrayOf(Card.propTypes).isRequired,
// };

export default GameBoard;
