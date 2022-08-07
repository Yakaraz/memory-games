import React, { useContext } from "react";
// import PropTypes from "prop-types";
import { ImageList, ImageListItem } from "@mui/material";
import { GameContext } from "../game";
import CardView from "../card";

/**
 * Component CardList that display a set of cards from an array of data card model.
 */
const CardListView = ({ deck, flipCard }) => {
  const { boardSize } = useContext(GameContext);
  const SIZE_TO_COLUMNS = { 6: 3, 12: 4, 16: 4, 20: 5 };
  return (
    <ImageList
      sx={{
        width: "fit-content",
        height: "fit-content",
        overflow: "hidden",
        margin: "auto",
      }}
      cols={SIZE_TO_COLUMNS[boardSize]}
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
