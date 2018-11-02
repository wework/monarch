import React from 'react';
import PropTypes from 'prop-types';
import wrapValidator from './wrapValidator';
import { curry } from 'lodash';

function customPropTypeValidator(expectedComponent, propType, props, propName, componentName, ...rest) {
  const prop = props[propName];
  const displayName = prop && prop.type && (prop.type.displayName || prop.type.name);
  const expectedDisplayName = expectedComponent.displayName || expectedComponent.name;

  let error = null;

  if (displayName !== expectedDisplayName) {
    error = `Failed prop type: Invalid prop '${propName}' of type '${displayName}' supplied to '${componentName}', expected instance of '${expectedDisplayName}'.`;
  }

  return error ? new Error(error) : propType(props, propName, componentName, ...rest);
}

// Custom prop type validation requiring props to be a certain component type
export const customPropType = (expectedComponent, propType = PropTypes.node) => {
  const validator = curry(customPropTypeValidator)(expectedComponent, propType);
  validator.isRequired = validator;

  return wrapValidator(validator, `customPropType:${expectedComponent}`, expectedComponent);
};
