import PropTypes from 'prop-types';
import React from 'react';
import CrossSellCard from './CrossSellCard.jsx';

import { componentWithName, childrenOfType } from 'airbnb-types';

const OtherComponentWithoutPropTypes = props => <div {...props} />;

/** @ignore-content-type */
const OtherComponentToBeIgnored = ({ someProp, ...props }) => <div {...props} />;
OtherComponentToBeIgnored.propTypes = {
  someProp: PropTypes.node
};

/**
 * Grid of Cross Sell Cards
 */
const CrossSellGroup = ({ headerText, bodyText, crossSellCards, centered, imageAspectRatio }) => {
  return <CrossSellCard />;
};

CrossSellGroup.defaultProps = {
  imageAspectRatio: {
    tiny: 7 / 5,
    md: 16 / 9
  }
};

CrossSellGroup.propTypes = {
  headerText: PropTypes.string,
  bodyText: PropTypes.node,
  centered: PropTypes.bool,
  /** @ignore-content-type */
  ignoreThisProp: PropTypes.string,
  __id: PropTypes.string,
  /** @ignore-content-type */
  imageAspectRatio: PropTypes.shape({
    tiny: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number
  }),
  someFunction: PropTypes.func,
  /** @array */
  crossSellCards: componentWithName('CrossSellCard').isRequired,
  children: childrenOfType(CrossSellCard),
  crossSellCard: componentWithName('CrossSellCard'),
  someShape: PropTypes.shape({
    key: PropTypes.string
  }),
  someObject: PropTypes.object,
  yesNo: PropTypes.oneOf(['yes', 'no'])
};

export default CrossSellGroup;
