import PropTypes from 'prop-types';
import React from 'react';
import CrossSellCard from './CrossSellCard.jsx';

const CrossSellGroup = ({ headerText, bodyText, crossSellCards, centered, imageAspectRatio }) => {
  return (
    <CrossSellCard />
  );
};

// CrossSellGroup.defaultProps = {
//   imageAspectRatio: {
//     tiny: 7 / 5,
//     md: 16 / 9,
//   },
// };

CrossSellGroup.propTypes = {
  headerText: PropTypes.string,
  bodyText: PropTypes.string,
  centered: PropTypes.bool,
  crossSellCards: PropTypes.arrayOf(
    PropTypes.instanceOf(CrossSellCard)
  ),
  // __id: PropTypes.string,
  /*
  imageAspectRatio: PropTypes.shape({
    tiny: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
  }),
  */
};

export default CrossSellGroup;
