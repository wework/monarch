/**
 * Takes in a list of PropType validation functions as arguments and returns an error if any of the
 * validations return an error.
 */
export const validateAll = (...types) => (...args) => {
  const errors = types.map(type => type(...args)).filter(Boolean);

  // no errors? cool!
  if (errors.length === 0) return undefined;

  // collect the messages and join them together
  const message = errors.map(err => err.message).join('\n');
  return new Error(message);
};

/**
 * Takes in a list of PropType validation functions as arguments and returns an error if all but one
 */
export const validateOneOfAll = (...types) => (...args) => {
  const errors = types.map(type => type(...args)).filter(Boolean);

  // no errors or one thing did not return an error
  if (errors.length === 0 || errors.length === types.length - 1) return undefined;

  // collect the messages and join them together
  const message = errors.map(err => err.message).join('\n');
  return new Error(message);
};
