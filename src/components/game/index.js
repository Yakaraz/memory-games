import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import CardList from "../cardList";
import { db } from "../../db";

/**
 * Component
 */
const Game = () => {
  const initialCards = [
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
  const [cards, setCards] = useState([]);

  // On mount (once), we load the cards from the store
  useEffect(() => {
    const loadFromIndexDB = async () => {
      let cards = await db.cards.toArray();
      if (cards.length === 0) {
        const cardsIds = await db.cards.bulkAdd(initialCards, {
          allKeys: "true",
        });
        cards = await db.cards.bulkGet(cardsIds);
      }
      setCards(cards);
    };
    loadFromIndexDB().catch((e) => console.error(e));

    return () => setCards([]);
  }, []);

  return (
    <div>
      <CardList cards={cards} />
    </div>
  );
};

// Game.propTypes = {
//   cards: PropTypes.arrayOf(Card.propTypes).isRequired,
// };

export default Game;
