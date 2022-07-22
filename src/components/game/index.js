import React, { useState, useEffect, useCallback } from "react";
// import PropTypes from "prop-types";
import { shuffle, concat, cloneDeep } from "lodash";
import { db } from "../../db";
import CardListView from "../cardList";
import Card from "../../models/card.model";
import { Game, GameState } from "../../models/game.model";

/**
 * Component GameView that show a board of cards
 */
const GameView = () => {
  const initialImages = [
    {
      url: "https://picsum.photos/201",
      title: "bip",
      uuid: "51d48348-1990-4f91-8432-1e4aeeed6fc2",
    },
    {
      url: "https://picsum.photos/200",
      title: "bipBIP",
      uuid: "a5933fa2-07fa-439d-9f47-2d98df6c7e26",
    },
  ];

  const [game, setGame] = useState(new Game());
  const flipCard = (uuid) => setGame((oldGame) => oldGame.flipCard(uuid));
  const validateHand = () => setGame((oldGame) => oldGame.validateHand());
  const emptyHand = () => setGame((oldGame) => oldGame.emptyHand());

  const hasWon = () => setGame((oldGame) => oldGame.hasWon());

  const setDeck = (deck) => setGame((oldGame) => oldGame.setDeck(deck));

  // On mount (once), we load the cards from the store
  useEffect(() => {
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

  return (
    <div>
      <CardListView deck={game.deck} flipCard={flipCard} />
    </div>
  );
};

// GameView.propTypes = {
//   cards: PropTypes.arrayOf(Card.propTypes).isRequired,
// };

export default GameView;
