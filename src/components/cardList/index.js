import React from "react";
// import PropTypes from "prop-types";
import { ImageList, ImageListItem } from "@mui/material";

import CardView from "../card";

/**
 * Component CardList that display a set of cards from an array of data card model.
 */
const CardListView = ({ deck, flipCard }) => {
  return (
    <ImageList
      sx={{
        width: "fit-content",
        height: "fit-content",
        overflow: "hidden",
        margin: "auto",
      }}
      cols={4}
    >
      {deck.map((card, index) => (
        <ImageListItem key={`${card.uuid}-${index}`}>
          <CardView {...card} flipCard={flipCard} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

// CardListView.propTypes = {
//   cards: PropTypes.arrayOf(Card.propTypes).isRequired,
// };

export default CardListView;
