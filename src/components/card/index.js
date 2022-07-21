import React from "react";
// import PropTypes from "prop-types";

/**
 * Component Card that display a card from a data card model
 */
const Card = ({ url, title, uuid }) => (
  <div>
    <img src={url} alt={title} />
  </div>
);

// Card.propTypes = {
//   uuid: PropTypes.string.isRequired,
//   url: PropTypes.string.isRequired,
//   title: PropTypes.string,
// };

export default Card;
