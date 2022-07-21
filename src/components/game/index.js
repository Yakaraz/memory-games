import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { shuffle, concat, cloneDeep } from "lodash";
import { db } from "../../db";
import CardListView from "../cardList";
import Card from "../../models/card.model";
import Game from "../../models/game.model";

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
  // const [cards, setCards] = useState([]);
  const [game, setGame] = useState(new Game());
  const flipCard = (uuid) => setGame((oldGame) => oldGame.flipCard(uuid));
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
