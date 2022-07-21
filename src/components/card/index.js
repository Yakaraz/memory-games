import React from "react";
// import PropTypes from "prop-types";

/**
 * Component Card that display a card from a data card model
 */
const CardView = ({ url, title, uuid, flipCard }) => (
  <div onClick={() => flipCard(uuid)}>
    <img src={url} alt={title} />
  </div>
);

// CardView.propTypes = {
//   uuid: PropTypes.string.isRequired,
//   url: PropTypes.string.isRequired,
//   title: PropTypes.string,
// };

export default CardView;
