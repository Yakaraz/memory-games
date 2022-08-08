import React, { useContext, useEffect } from "react";
import { shuffle, concat, cloneDeep, take } from "lodash";
// import PropTypes from "prop-types";
import CardListView from "../cardList";
import Card from "../../models/card.model";
import { GameState, GameMode } from "../../models/game.model";
import { v4 as uuidv4 } from "uuid";

import { Button, Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { GameContext } from "../game";
import CountDown from "../countDown";
import CountUp from "../countUp";
import { db } from "../../db";

/**
 * Component GameView that show a board of cards
 */
const GAME_LENGTH = 100;

const GameBoard = () => {
  const { game, setGame, images, boardSize, setBoardSize, setScores } =
    useContext(GameContext);
  const flipCard = (uuid) => setGame((oldGame) => oldGame.flipCard(uuid));
  const validateHand = () => setGame((oldGame) => oldGame.validateHand());
  const emptyHand = () => setGame((oldGame) => oldGame.emptyHand());
  const unflip = () => setGame((oldGame) => oldGame.unflip());
  const hasWon = () => setGame((oldGame) => oldGame.hasWon());
  const setDeck = (deck) => setGame((oldGame) => oldGame.setDeck(deck));
  const startCount = () => setGame((oldGame) => oldGame.startCount());
  const oneSecond = () => setGame((oldGame) => oldGame.addASecond());

  const resetGame = () => {
    setBoardSize(0);
    setGame((oldGame) => oldGame.resetGame());
  };

  const overtime = () => setGame((oldGame) => oldGame.gameOver());
  useEffect(() => {
    let imagesClone = cloneDeep(images);
    imagesClone = shuffle(imagesClone);
    const pool = take(imagesClone, boardSize / 2);
    const newImages = concat(pool, pool);
    const deck = shuffle(newImages.map((img) => new Card(img)));
    setDeck(deck);
  }, [boardSize]);

  useEffect(() => {
    let timeout;
    if (
      [GameState.VALIDATE_LEFT, GameState.VALIDATE_RIGHT].includes(game.state)
    ) {
      validateHand();
    } else if (game.state === GameState.EMPTY) {
      emptyHand();
    } else if (game.state === GameState.UNFLIP) {
      timeout = setTimeout(() => {
        unflip();
      }, 1000);
    } else if (game.state === GameState.WON) {
      hasWon();
    }

    return () => timeout && window.clearTimeout(timeout);
  }, [game.state]);

  useEffect(() => {
    const addScore = async () => {
      let score = {
        id: uuidv4(),
        date: new Date(),
        value: game.progress,
        boardSize: boardSize,
      };
      await db.scores.add(score);
      const newScores = await db.scores.toArray();
      setScores(newScores);
    };
    game.won && addScore();
  }, [game.won]);

  useEffect(() => {
    if (game.started) {
      if (game.mode === GameMode.COUNT_DOWN) {
        game.progress < GAME_LENGTH && setTimeout(() => oneSecond(), 1000);
        game.progress >= GAME_LENGTH && overtime();
      } else {
        setTimeout(() => oneSecond(), 1000);
      }
    }
  }, [game.started, game.progress]);

  const timerSelect = (mode, won) => {
    if (!won) {
      switch (mode) {
        case GameMode.COUNT_UP:
          return <CountUp />;
        case GameMode.COUNT_DOWN:
          return <CountDown />;
        default:
          return <CountUp />;
      }
    } else {
      return (
        <Typography
          component="h3"
          color="primary"
          fontFamily="Inter"
          fontStyle="normal"
          fontSize="24px"
          fontWeight="700"
          lineHeight="29px"
          mb="0.5em"
        >
          Bravo !
        </Typography>
      );
    }
  };

  return (
    <Box>
      <Container sx={{ textAlign: "center", padding: "1em" }}>
        {game.started ? (
          timerSelect(game.mode, game.won)
        ) : (
          <Button
            onClick={(e) => {
              e.preventDefault();
              boardSize > 0 && startCount();
            }}
            variant="contained"
            size="large"
            disabled={boardSize === 0 || images.length < 3}
          >
            Start Game
          </Button>
        )}
      </Container>
      {game.started && (
        <>
          <CardListView
            deck={game.deck}
            flipCard={!game.animating ? flipCard : () => {}}
          />
          <Container sx={{ textAlign: "center", marginTop: "2em" }}>
            <Button
              onClick={() => resetGame()}
              variant="contained"
              size="large"
            >
              {game.won ? "Retour" : "Arrêter"}
            </Button>
          </Container>
        </>
      )}
    </Box>
  );
};

// GameView.propTypes = {
//   cards: PropTypes.arrayOf(Card.propTypes).isRequired,
// };

export default GameBoard;
