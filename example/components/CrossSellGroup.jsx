import PropTypes from 'prop-types';
import React from 'react';
import CrossSellCard from './CrossSellCard.jsx';
import { childType, customPropType, validateAll } from '../lib/validators';

/**
 * Grid of Cross Sell Cards
 */
const CrossSellGroup = ({ headerText, bodyText, crossSellCards, centered, imageAspectRatio }) => {
  return (
    <CrossSellCard />
  );
};

CrossSellGroup.defaultProps = {
  imageAspectRatio: {
    tiny: 7 / 5,
    md: 16 / 9,
  },
};

CrossSellGroup.propTypes = {
  headerText: PropTypes.string,
  bodyText: PropTypes.node,
  centered: PropTypes.bool,
  /** @ignore-content-prop */
  __id: PropTypes.string,
  /** @ignore-content-prop */
  imageAspectRatio: PropTypes.shape({
    tiny: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
  }),
  someFunction: PropTypes.func,
  crossSellCards: validateAll(customPropType(CrossSellCard)).isRequired,
  children: childType(CrossSellCard),
  crossSellCard: customPropType(CrossSellCard),
  someShape: PropTypes.shape({
    key: PropTypes.string,
  }),
  someObject: PropTypes.object,
};

export default CrossSellGroup;
