import React from 'react';
import PropTypes from 'prop-types';
import wrapValidator from './wrapValidator';
import { curry } from 'lodash';

function nChildrenValidator(numRequired, propType, props, propName, componentName, ...rest) {
  if (propName !== 'children') {
    return new TypeError(`${componentName} is using the nChildren validator on a non-children prop`);
  }

  const { children } = props;
  const childrenCount = React.Children.count(children);

  if (childrenCount !== numRequired) {
    return new RangeError(
      `${componentName} expects to receive ${numRequired} children, but received ${childrenCount} children.`
    );
  }

  return propType(props, propName, componentName, ...rest);
}

// Custom prop type validation requiring a specific number of children
export const nChildren = (numRequired, propType = PropTypes.node) => {
  if (typeof numRequired !== 'number' || isNaN(numRequired) || numRequired < 0) {
    throw new TypeError('a non-negative number is required');
  }

  const validator = curry(nChildrenValidator)(numRequired)(propType);
  validator.isRequired = validator;

  return wrapValidator(validator, `nChildren:${numRequired}`, numRequired);
};

function nMaxChildrenValidator(maxNumRequired, propType, props, propName, componentName, ...rest) {
  if (propName !== 'children') {
    return new TypeError(`${componentName} is using the nMaxChildren validator on a non-children prop`);
  }

  const { children } = props;
  const childrenCount = React.Children.count(children);

  if (childrenCount > maxNumRequired) {
    return new RangeError(
      `${componentName} expects to receive a maximum of ${maxNumRequired} children, but received ${childrenCount} children.`
    );
  }

  return propType(props, propName, componentName, ...rest);
}

// Custom prop type validation requiring a specific maximum number of children
export const nMaxChildren = (maxNumRequired, propType = PropTypes.node) => {
  if (typeof maxNumRequired !== 'number' || isNaN(maxNumRequired) || maxNumRequired < 0) {
    throw new TypeError('a non-negative number is required');
  }

  const validator = curry(nMaxChildrenValidator)(maxNumRequired)(propType);
  validator.isRequired = validator;

  return wrapValidator(validator, `nMaxChildren:${maxNumRequired}`, maxNumRequired);
};
