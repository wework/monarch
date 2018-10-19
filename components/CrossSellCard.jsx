import PropTypes from 'prop-types';
import React from 'react';

const CrossSellCard = ({ headerText, bodyText, crossSellCards, centered, imageAspectRatio }) => {
  return (
    <div />
  );
};

CrossSellCard.propTypes = {
  title: PropTypes.string,
  copy: PropTypes.string,
  /** @asset */
  image: PropTypes.object,
  url: PropTypes.string,
  linkText: PropTypes.string,
  /** @ignore-content-type */
  __id: PropTypes.string,
};

export default CrossSellCard;