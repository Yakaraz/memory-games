import React from "react";
// import PropTypes from "prop-types";
import Card from "../card";

/**
 * Component CardList that display a set of cards from an array of data card model.
 */
const CardList = ({ cards }) => {
  return (
    <div>
      {cards.map((card) => (
        <Card key={card.uuid} {...card} />
      ))}
    </div>
  );
};

// CardList.propTypes = {
//   cards: PropTypes.arrayOf(Card.propTypes).isRequired,
// };

export default CardList;
