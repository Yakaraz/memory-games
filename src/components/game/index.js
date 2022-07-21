import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import CardList from "../cardList";

/**
 * Component
 */
const Game = () => {
  const [cards, setCards] = useState([]);
  const loadFromIndexDB = () =>
    Promise.resolve([
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
    ]);
  // On mount (once), we load the cards from the store
  useEffect(() => {
    loadFromIndexDB().then((data) => console.warn(data) || setCards(data));
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
