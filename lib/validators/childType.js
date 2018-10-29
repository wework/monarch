import React from 'react';
import PropTypes from 'prop-types';
import wrapValidator from './wrapValidator';
import { curry } from 'lodash';

function childrenTypeValidator(childComponentExpected, propType, props, propName, componentName, ...rest) {
  if (propName !== 'children') {
    return new TypeError(`${componentName} is using the childrenType validator on a non-children prop`);
  }

  const { children } = props;
  const displayName = childComponentExpected.displayName || childComponentExpected.name;

  let error = null;

  React.Children.forEach(children, child => {
    const childDisplayName = child.type.displayName || child.type.name;

    if(childDisplayName !== displayName) {
      error = `Each child element should be of type '${displayName}' for component '${componentName}'.`;
    }
  });

  return error ? new Error(error) : propType(props, propName, componentName, ...rest);
}

// Custom prop type validation requiring the children to be a certain component type
export const childType = (childComponentExpected, propType = PropTypes.node) => {
  const validator = curry(childrenTypeValidator)(childComponentExpected, propType);
  validator.isRequired = validator;

  return wrapValidator(validator, `childType:${childComponentExpected}`, childComponentExpected);
};
