import React from "react";
// import PropTypes from "prop-types";
import CardView from "../card";

/**
 * Component CardList that display a set of cards from an array of data card model.
 */
const CardListView = ({ deck, flipCard }) => {
  return (
    <div>
      {deck.map((card, index) => (
        <CardView key={`${card.uuid}-${index}`} {...card} flipCard={flipCard} />
      ))}
    </div>
  );
};

// CardListView.propTypes = {
//   cards: PropTypes.arrayOf(Card.propTypes).isRequired,
// };

export default CardListView;
