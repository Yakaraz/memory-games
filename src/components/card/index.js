import React from "react";
// import PropTypes from "prop-types";
import FlippedBox from "../design-system/flippedBox";
/**
 * Component Card that display a card from a data card model
 */

const CardView = ({ url, title, uuid, flipped, flipCard }) => (
  <FlippedBox flipped={flipped} onClick={() => flipCard(uuid)}>
    <div className="flip-card-inner">
      <div className="flip-card-front">
        <img src={`${url}?w=90&fit=crop&auto=format`} alt={title} />
      </div>
      <div className="flip-card-back" />
    </div>
  </FlippedBox>
);

// CardView.propTypes = {
//   uuid: PropTypes.string.isRequired,
//   url: PropTypes.string.isRequired,
//   title: PropTypes.string,
// };

export default CardView;
